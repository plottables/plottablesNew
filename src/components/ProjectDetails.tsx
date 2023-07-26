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
import {CALENDAR, PROJECTS_PER_PAGE, TOKENS_PER_PAGE} from "config"
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
import { useAccount } from "wagmi"
import MintingInterfaceFilter from "components/MintingInterfaceFilter"
import ReactMarkdown from "react-markdown";
import LineBreak from "./LineBreak";

interface Props {
  contractAddress: string
  id: string
}

const ProjectDetails = ({ contractAddress, id }: Props) => {
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

  let releaseDate = null
  let releaseDateFormatted = null
  if (project && !releaseDate) {
    releaseDate = new Date(CALENDAR[project?.contract.id.toLowerCase()][Number(project?.projectId)])
    releaseDateFormatted = releaseDate.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZoneName: "short",
      hour: "numeric",
    })
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

      <Box sx={{display: "flex", justifyContent: "space-around"}}>
        <Box sx={{paddingX: "100px"}}>
          <TokenView
            contractAddress={contractConfig?.CORE_CONTRACT_ADDRESS}
            tokenId={token.tokenId}
            width={600}
            invocation={token.invocation}
            aspectRatio={project.aspectRatio || parseAspectRatio(project.scriptJSON)}
            live
          />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
          <MintingInterfaceFilter
            contractVersion={contractConfig?.CONTRACT_VERSION}
            coreContractAddress={contractAddress}
            mintContractAddress={contractConfig?.MINT_CONTRACT_ADDRESS}
            projectId={project.projectId}
            artistAddress={project.artistAddress}
            scriptAspectRatio={project.aspectRatio || parseAspectRatio(project.scriptJSON)}
          />
          <ReactMarkdown className="markdown">{project.description}</ReactMarkdown>
        </Box>
      </Box>

      <Typography><br/></Typography>
      <Box sx={{display: "flex", justifyContent: "space-around"}}>
        {releaseDateFormatted &&
          <Box>
            <Typography>Release Date: {releaseDateFormatted}</Typography>
          </Box>
        }
        {project?.license &&
          <Box>
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

      <Box sx={{display: "flex", justifyContent: "center", marginTop: "25px"}}>
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

export default ProjectDetails
