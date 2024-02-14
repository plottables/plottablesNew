import { useState } from "react"
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from "wagmi"
import { BigNumber } from "ethers"
import { Box, Typography, Modal } from "@mui/material"
import { MULTIPLY_GAS_LIMIT } from "config"
import { multiplyBigNumberByFloat, formatEtherFixed } from "utils/numbers"
import MinterSetPriceHolderV5ABI from "abi/V3/MinterSetPriceHolderV5.json"
import TokenView from "components/TokenView"
import useWindowSize from "hooks/useWindowSize"
import MintingButton from "components/MintingButton"

interface Props {
  coreContractAddress: string,
  mintContractAddress: string,
  projectId: string,
  priceWei: BigNumber
  currencySymbol: string,
  isConnected: boolean,
  artistCanMint: boolean,
  anyoneCanMint: boolean,
  scriptAspectRatio: number,
  verifyBalance: boolean,
  isPaused: boolean,
  isSoldOut: boolean,
  holderProofLoading: boolean,
  holderContractAddress: string,
  holderTokenId: string
}

const MinterSetPriceHolderV5Button = (
  {
    coreContractAddress,
    mintContractAddress,
    projectId,
    priceWei,
    currencySymbol,
    isConnected,
    artistCanMint,
    anyoneCanMint,
    scriptAspectRatio,
    verifyBalance,
    isPaused,
    isSoldOut,
    holderProofLoading,
    holderContractAddress,
    holderTokenId
  }: Props
) => {

  const windowSize = useWindowSize()
  const [dialog, setDialog] = useState("")
  const [mintingTokenId, setMintingTokenId] = useState<any | null>(null)
  const [mintingPreview, setMintingPreview] = useState(false)
  const handleMintingPreviewOpen = () => setMintingPreview(true)
  const handleMintingPreviewClose = () => setMintingPreview(false)

  const { config } = usePrepareContractWrite({
    address: mintContractAddress as `0x${string}`,
    abi: MinterSetPriceHolderV5ABI,
    functionName: "purchase",
    overrides: {
      value: priceWei
    },
    enabled: (!isPaused || artistCanMint) && !isSoldOut && verifyBalance && holderContractAddress !== undefined && holderTokenId !== undefined,
    args: [
      BigNumber.from(projectId),
      coreContractAddress,
      holderContractAddress,
      BigNumber.from(holderTokenId || 0)
    ]
  })

  let customRequest = config.request ? {
    data: config.request?.data,
    from: config.request?.from,
    gasLimit: multiplyBigNumberByFloat(config.request?.gasLimit, MULTIPLY_GAS_LIMIT),
    to: config.request?.to,
    value: config.request?.value
  } : undefined

  const { data, write } = useContractWrite({
    ...config,
    request: customRequest,
    onSuccess() {
      setDialog("Transaction pending...")
    }
  })

  useWaitForTransaction({
    hash: data?.hash,
    confirmations: 1,
    onSuccess(data) {
      let tokenId = data?.logs[0]?.topics[3]
      if (tokenId) {
        setMintingTokenId(parseInt(tokenId, 16).toString())
        handleMintingPreviewOpen()
      }
      setDialog("")
    }
  })

  const mintingDisabled = isPaused || isSoldOut || !isConnected || !verifyBalance || holderProofLoading || holderContractAddress === undefined
  let mintingMessage = `${artistCanMint ? "Artist Mint " : "Purchase "} for ${formatEtherFixed(priceWei.toString(), 3)} ${currencySymbol}`
  if (holderProofLoading) mintingMessage = "Checking Holder Proof..."
  else if (holderContractAddress === undefined) mintingMessage = "Holder Proof Not Found"
  if (isPaused && !artistCanMint) mintingMessage = "minting paused"
  else if (isSoldOut) mintingMessage = "sold out"
  else if (!isConnected) mintingMessage = "connect to purchase"
  else if (!verifyBalance) mintingMessage = "insufficient funds"
  else if (holderContractAddress === "") mintingMessage = "no NFTs held"

  return (
    <>
      <Box sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
        <MintingButton
          disabled={mintingDisabled && !artistCanMint}
          message={mintingMessage}
          contractPurchase={write}
        />
        <Box>
          <Typography fontStyle="italic">
            {dialog}
          </Typography>
        </Box>
      </Box>
      <Modal
        open={mintingPreview}
        onClose={handleMintingPreviewClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "white",
          border: "none",
          boxShadow: 10,
          padding: 5
        }}>
          <Box sx={{display: "grid", justifyItems: "center", alignItems: "center" }}>
            <Typography id="modal-modal-title" variant="h1" fontSize="18px">
              Minted #{mintingTokenId}
            </Typography>
            <Box marginTop={1}>
              <TokenView
                contractAddress={coreContractAddress}
                tokenId={mintingTokenId}
                width={0.75 * windowSize.height * scriptAspectRatio}
                retryDelay={10000}
                aspectRatio={scriptAspectRatio}
                live
              />
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  )
}

export default MinterSetPriceHolderV5Button
