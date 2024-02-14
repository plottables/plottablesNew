import {useEffect, useState} from "react"
import { useAccount, useBalance, useContractReads } from "wagmi"
import { BigNumber, utils } from "ethers"
import {Box, Typography} from "@mui/material"
import GenArt721CoreV3_EngineABI from "abi/V3/GenArt721CoreV3_Engine.json"
import MintingProgress from "components/MintingProgress"
import MintingPrice from "components/MintingPrice"
import { EXPECTED_CHAIN_ID, HOLDER_PROOF_API_URL } from "config"
import MinterSetPriceHolderV5ABI from "../../abi/V3/MinterSetPriceHolderV5.json"
import MinterSetPriceHolderV5Button from "../MinterButtons/MinterSetPriceHolderV5Button"

interface Props {
  coreContractAddress: string,
  mintContractAddress: string,
  projectId: string,
  artistAddress: string,
  scriptAspectRatio: number
}

const MinterSetPriceHolderV5Interface = ({ coreContractAddress, mintContractAddress, projectId, artistAddress, scriptAspectRatio }: Props) => {

  const account = useAccount()
  const balance = useBalance({address: account.address })

  const [projectStateData, setProjectStateData] = useState<any | null>(null)
  const [projectPriceInfo, setProjectPriceInfo] = useState<any | null>(null)
  const [projectMaxHasBeenInvoked, setProjectMaxHasBeenInvoked] = useState<any | null>(null)
  const [holderProof, setHolderProof] = useState<any | null>(null)

  useEffect(() => {
    if (account.isConnected) {
      fetch(`${HOLDER_PROOF_API_URL}?contractAddress=${coreContractAddress}&projectId=${projectId}&walletAddress=${account.address}&chainId=${EXPECTED_CHAIN_ID}`)
        .then(response => response.json())
        .then(data => setHolderProof(data))
        .catch(() => setHolderProof(null))
    }
  }, [account.isConnected, account.address, coreContractAddress, projectId])

  const { data, isError, isLoading } = useContractReads({
    contracts: [
      {
        address: coreContractAddress as `0x${string}`,
        abi: GenArt721CoreV3_EngineABI,
        functionName: "projectStateData",
        args: [BigNumber.from(projectId)]
      },
      {
        address: mintContractAddress as `0x${string}`,
        abi: MinterSetPriceHolderV5ABI,
        functionName: "getPriceInfo",
        args: [BigNumber.from(projectId), coreContractAddress]
      },
      {
        address: mintContractAddress as `0x${string}`,
        abi: MinterSetPriceHolderV5ABI,
        functionName: "projectMaxHasBeenInvoked",
        args: [BigNumber.from(projectId), coreContractAddress]
      }
    ],
    watch: true,
    onSuccess(data) {
      setProjectStateData(data[0])
      setProjectPriceInfo(data[1])
      setProjectMaxHasBeenInvoked(data[2])
    }
  })

  if (!data || !projectStateData || !projectPriceInfo || isLoading || isError) {
    return null
  }

  const isArtist = account.isConnected && account.address?.toLowerCase() === artistAddress?.toLowerCase()
  const isNotArtist = account.isConnected && account.address?.toLowerCase() !== artistAddress?.toLowerCase()
  const invocations = projectStateData.invocations.toNumber()
  const maxInvocations = projectStateData.maxInvocations.toNumber()
  const isPaused = projectStateData.paused
  const currencySymbol = projectPriceInfo.currencySymbol
  const currentPriceWei = projectPriceInfo.tokenPriceInWei
  const priceIsConfigured = projectPriceInfo.isConfigured
  const maxHasBeenInvoked = projectMaxHasBeenInvoked
  const isSoldOut = maxHasBeenInvoked || invocations >= maxInvocations
  const artistCanMint = isArtist && priceIsConfigured && !isSoldOut
  const anyoneCanMint = isNotArtist && priceIsConfigured && !isSoldOut && !isPaused

  return (
    <Box sx={{display: "flex", flexDirection: "column"}}>
      <Box sx={{display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
        <MintingProgress
          invocations={invocations}
          maxInvocations={maxInvocations}
          maxHasBeenInvoked={maxHasBeenInvoked}
        />
        {
          priceIsConfigured &&
          (
            <MintingPrice
              startPriceWei={currentPriceWei}
              currentPriceWei={currentPriceWei}
              endPriceWei={currentPriceWei}
              currencySymbol={currencySymbol}
            />
          )
        }
      </Box>
      <MinterSetPriceHolderV5Button
        coreContractAddress={coreContractAddress}
        mintContractAddress={mintContractAddress}
        projectId={projectId}
        priceWei={currentPriceWei}
        currencySymbol={currencySymbol}
        isConnected={account.isConnected}
        artistCanMint={artistCanMint}
        anyoneCanMint={anyoneCanMint}
        scriptAspectRatio={scriptAspectRatio}
        verifyBalance={balance?.data?.formatted! >= utils.formatEther(projectPriceInfo.tokenPriceInWei.toString())}
        isPaused={isPaused}
        isSoldOut={isSoldOut}
        holderContractAddress={holderProof?.contractAddress}
        holderTokenId={holderProof?.tokenId}
      />
    </Box>
  )
}

export default MinterSetPriceHolderV5Interface
