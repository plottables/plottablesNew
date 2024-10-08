import useTheme from "@mui/material/styles/useTheme"
import { useState } from "react"
import {
  Box,
  Grid,
  Breadcrumbs,
  Divider,
  Typography,
  Button,
  Stack,
  FormControl,
  InputLabel,
  NativeSelect,
  Pagination,
  Alert,
  Link
} from "@mui/material"
import {CALENDAR, EXPECTED_CHAIN_ID, PROJECTS_PER_PAGE, TOKENS_PER_PAGE} from "config"
import { OrderDirection } from "utils/types"
import { parseScriptType, parseAspectRatio } from "utils/scriptJSON"
import ProjectDate from "components/ProjectDate"
import ProjectExplore from "components/ProjectExplore"
import TokenView from "components/TokenView"
import Tokens from "components/Tokens"
import Loading from "components/Loading"
import Collapsible from "components/Collapsible"
import useProject from "hooks/useProject"
import useWindowSize from "hooks/useWindowSize"
import { getContractConfigByAddress } from "utils/contractInfoHelper"
import EditProjectButton from "components/EditProjectButton"
import {useAccount, useContractRead, useContractReads, useEnsName} from "wagmi"
import MintingInterfaceFilter from "components/MintingInterfaceFilter"
import ReactMarkdown from "react-markdown";
import LineBreak from "./LineBreak";
import ProjectDescription from "./ProjectDescription";
import GenArt721CoreV3_EngineABI from "../abi/V3/GenArt721CoreV3_Engine.json";
import ScribblePartyProceedsManagerABI from "../abi/ScribblePartyProceedsManager.json";
import {BigNumber, utils} from "ethers";
import MinterSetPriceV5ABI from "../abi/V3/MinterSetPriceV5.json";

interface Props {
  contractAddress: string
  id: string,
  proceedsManagerAddress: string,
}

const ScribblePartyProjectDetails = ({ contractAddress, id, proceedsManagerAddress }: Props) => {
  const theme = useTheme()
  const windowSize = useWindowSize()
  const { address } = useAccount()
  const { loading, error, data } = useProject(`${contractAddress}-${id}`)
  const [currentPage, setCurrentPage] = useState(0)
  const [orderDirection, setOrderDirection] = useState(OrderDirection.ASC)
  const project = data?.project
  const token = project?.tokens[0]
  const width = windowSize.width > theme.breakpoints.values.tablet
    ? (Math.min(windowSize.width, 1200)-48)*0.666666
      : windowSize.width > theme.breakpoints.values.mobile
        ? windowSize.width - 48
        : windowSize.width - 32
  const contractConfig = getContractConfigByAddress(contractAddress)

  const [isStatusLoaded, setIsStatusLoaded] = useState<Boolean>(false)
  const [statusStarted, setStatusStarted] = useState<any | null>(null)
  const [statusEndTime, setStatusEndTime] = useState<any | null>(null)
  const [statusFinished, setStatusFinished] = useState<any | null>(null)
  const [statusNextMintPrizePortionBasisPoints, setStatusNextMintPrizePortionBasisPoints] = useState<any | null>(null)
  const [statusNextMintTimeExtensionSeconds, setStatusNextMintTimeExtensionSeconds] = useState<any | null>(null)
  const [statusLatestMintOwner, setStatusLatestMintOwner] = useState<String>("")
  const [statusPrizeAmount, setStatusPrizeAmount] = useState<any | null>(null)
  const [statusPrizeWithdrawn, setStatusPrizeWithdrawn] = useState<any | null>(null)
  useContractRead({
    address: proceedsManagerAddress as `0x${string}`,
    abi: ScribblePartyProceedsManagerABI,
    functionName: "status",
    watch: true,
    onSuccess(statusData: [Boolean, BigNumber, Boolean, BigNumber, BigNumber, String, BigNumber, Boolean]) {
      setIsStatusLoaded(true);
      setStatusStarted(statusData[0])
      setStatusEndTime(statusData[1])
      setStatusFinished(statusData[2])
      setStatusNextMintPrizePortionBasisPoints(statusData[3])
      setStatusNextMintTimeExtensionSeconds(statusData[4])
      setStatusLatestMintOwner(statusData[5])
      setStatusPrizeAmount(statusData[6])
      setStatusPrizeWithdrawn(statusData[7])
    }
  })

  let releaseDateFormatted = "TBD"
  if (EXPECTED_CHAIN_ID === 1 && project) {
    if (Object.hasOwn(CALENDAR, project?.contract.id.toLowerCase())) {
      if (Object.hasOwn(CALENDAR[project?.contract.id.toLowerCase()], Number(project?.projectId))) {
        const releaseDate = new Date(CALENDAR[project?.contract.id.toLowerCase()][Number(project?.projectId)])
        releaseDateFormatted = releaseDate?.toLocaleString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
          timeZoneName: "short",
          hour: "numeric",
        });
      }
    }
  }

  if (error) {
    return (
      <Box>
        <Alert severity="error">
          Error loading project
        </Alert>
      </Box>
    )
  }

  if (loading) {
    return <Loading/>
  }

  return project && contractConfig && (
    <Box>

      {
        contractConfig.EDIT_PROJECT_URL && address?.toLowerCase() === project.artistAddress &&
        (
          <Box sx={{display: "flex", justifyContent: "center", paddingBottom: "25px"}}>
            <EditProjectButton
              contractAddress={contractAddress}
              projectId={project.projectId}
              editProjectUrl={contractConfig?.EDIT_PROJECT_URL}
            />
          </Box>
        )
      }


      <Box sx={{display: "flex", justifyContent: "center"}}>
        <Typography>
          {project.name} by {project.artistName}
        </Typography>
      </Box>
      <Typography><br/></Typography>

      {
        project && isStatusLoaded &&
        (
          <ScribblePartyStatusDetails
            started={statusStarted}
            endTime={statusEndTime}
            finished={statusFinished}
            nextMintPrizePortionBasisPoints={statusNextMintPrizePortionBasisPoints}
            nextMintTimeExtensionSeconds={statusNextMintTimeExtensionSeconds}
            latestMintOwner={statusLatestMintOwner}
            prizeAmount={statusPrizeAmount}
            prizeWithdrawn={statusPrizeWithdrawn}
            mintPrice={project.minterConfiguration.basePrice}
          />
        )
      }

      <Box sx={{
        display: {mobile: "block", tablet: "flex"},
        justifyContent: "space-around"
      }}>
        <Box sx={{paddingX: {mobile: "0px", tablet: "100px"}}}>
          {token && token.tokenId && (
              <TokenView
                contractAddress={contractConfig?.CORE_CONTRACT_ADDRESS}
                tokenId={token.tokenId}
                width={windowSize.width > theme.breakpoints.values.tablet ? Math.min(windowSize.width / 3, 600) : 0.8 * windowSize.width}
                invocation={token.invocation}
                aspectRatio={project.aspectRatio || parseAspectRatio(project.scriptJSON)}
                live
              />
          )}
        </Box>
        <Box sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          paddingTop: "25px",
          ".markdown > p": {
            lineHeight: "25px",
            fontSize: "20px",
            letterSpacing: "1px",
            wordSpacing: "5px",
            marginTop: "25px",
            marginBottom: "25px",
            textAlign: {mobile: "center", tablet: "left"}
          }
        }}>
          <MintingInterfaceFilter
            contractVersion={contractConfig?.CONTRACT_VERSION}
            coreContractAddress={contractAddress}
            mintContractAddress={contractConfig?.MINT_CONTRACT_ADDRESS}
            projectId={project.projectId}
            artistAddress={project.artistAddress}
            scriptAspectRatio={project.aspectRatio || parseAspectRatio(project.scriptJSON)}
          />
          <Typography><br/></Typography>
          <ProjectDescription projectId={project.id} projectDescription={project.description} />
        </Box>
      </Box>

      <Typography><br/></Typography>
      <Box sx={{display: {mobile: "block", tablet: "flex"}, justifyContent: "space-around"}}>
        {releaseDateFormatted &&
          <Box sx={{
            marginBottom: {mobile: "25px", tablet: "0px"}
          }}>
            <Typography>Release Date: {releaseDateFormatted}</Typography>
          </Box>
        }
        {project?.license &&
          <Box sx={{
            marginBottom: {mobile: "25px", tablet: "0px"}
          }}>
            <Typography>License: {project.license}</Typography>
          </Box>
        }
        {project?.scriptJSON &&
          <Box>
            <Typography>Script: {parseScriptType(project.scriptJSON)}</Typography>
          </Box>
        }
      </Box>

      <Typography><br/></Typography>
      <LineBreak/>
      <Tokens
        contractAddress={contractAddress}
        projectId={`${contractAddress.toLowerCase()}-${id}`}
        first={TOKENS_PER_PAGE}
        skip={currentPage*TOKENS_PER_PAGE}
        orderDirection={orderDirection}
        aspectRatio={project.aspectRatio || parseAspectRatio(project.scriptJSON)}
      />

      <Box sx={{display: "flex", justifyContent: "center", marginTop: "50px", marginBottom: "25px"}}>
        <Pagination
          count={Math.ceil(project.invocations/TOKENS_PER_PAGE)}
          page={currentPage + 1}
          onChange={(event, page) => {
            setCurrentPage(page - 1)
          }}
        />
      </Box>

    </Box>
  )
}

interface StatusProps {
  started: boolean,
  endTime: BigNumber,
  finished: boolean,
  nextMintPrizePortionBasisPoints: BigNumber,
  nextMintTimeExtensionSeconds: BigNumber,
  latestMintOwner: String,
  prizeAmount: BigNumber,
  prizeWithdrawn: boolean,
  mintPrice: BigInt
}
const ScribblePartyStatusDetails = (props: StatusProps) => {
  const prizeAmountEth = utils.formatEther(props.prizeAmount.toString())
  const nextMintPrizeContribution = utils.formatEther(props.nextMintPrizePortionBasisPoints.toNumber() / 100000 * Number(props.mintPrice) * 0.85)

  let seconds = props.nextMintTimeExtensionSeconds.toNumber()
  const hours = Math.floor(seconds / 3600);
  seconds %= 3600;
  const minutes = Math.floor(seconds / 60);
  seconds %= 60;
  const hourStr = hours > 0 ? `${hours} hour${hours > 1 ? 's' : ''}` : '';
  const minuteStr = minutes > 0 ? `, ${minutes} minute${minutes > 1 ? 's' : ''}` : '';
  const secondStr = seconds > 0 ? `, ${seconds} second${seconds !== 1 ? 's' : ''}` : '';
  const nextMintExtensionString = hourStr + minuteStr + secondStr

  const ensName = useEnsName({ address: props.latestMintOwner as `0x${string}`, chainId: 1 })
  const shortAddress = props.latestMintOwner ? `${props.latestMintOwner.slice(0, 6)}...${ props.latestMintOwner.slice(38, 42)}` : null
  const currentPrizeWinner = ensName.data || shortAddress

  return (
    <Box sx={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
      <Box sx = {{display: "flex", justifyContent: "center"}}>
        <Typography variant={"h4"} sx={{fontWeight: "normal"}}>
          Game Status: {!props.started ? "Not Started" : props.finished ? "Finished" : "Ends in hh:mm (at mm-dd-hh-mm-ss local time"}
        </Typography>
      </Box>
      <Box sx = {{display: {mobile: "block", tablet: "flex"}, justifyContent: {mobile: "center", tablet: "space-evenly"}}}>
        <Typography variant={"h4"} sx={{fontWeight: "normal"}}>Current Prize Pool: {prizeAmountEth}</Typography>
        <Typography variant={"h4"} sx={{fontWeight: "normal"}}>Current Prize Winner: {currentPrizeWinner}</Typography>
      </Box>
      <Box sx = {{display: "flex", justifyContent: "center"}}>
        <Typography variant={"h4"} sx={{fontWeight: "normal"}}>Next Mint:</Typography>
      </Box>
      <Box sx = {{display: {mobile: "block", tablet: "flex"}, justifyContent: {mobile: "center", tablet: "space-evenly"}}}>
        <Typography variant={"h4"} sx={{fontWeight: "normal"}}>Adds {nextMintPrizeContribution} eth to the prize pool</Typography>
        <Typography variant={"h4"} sx={{fontWeight: "normal"}}>Extends the game by {nextMintExtensionString}</Typography>
      </Box>
      <br/>
    </Box>
  )
}
export default ScribblePartyProjectDetails
