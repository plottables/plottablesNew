import moment from "moment"
import { parseAspectRatio } from "utils/scriptJSON"
import {
  Box,
  Typography,
  Link,
  Grid,
  Alert,
  Button,
  Breadcrumbs
} from "@mui/material"
import VisibilityIcon from "@mui/icons-material/Visibility"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import ImageIcon from "@mui/icons-material/Image"
import useTheme from "@mui/material/styles/useTheme"
import TokenTraits from "components/TokenTraits"
import Address from "components/Address"
import Loading from "components/Loading"
import TokenView from "components/TokenView"
import useToken from "hooks/useToken"
import useWindowSize from "hooks/useWindowSize"
import { getContractConfigByAddress } from "utils/contractInfoHelper";

interface Props {
  contractAddress: string
  id: string
}

const TokenDetails = ({ contractAddress, id }: Props) => {
  const theme = useTheme()
  const windowSize = useWindowSize()
  const { loading, error, data } = useToken(`${contractAddress.toLowerCase()}-${id}`)
  const token = data?.token
  const contractConfig = getContractConfigByAddress(contractAddress)

  if (loading) {
    return <Loading/>
  }

  if (error) {
    return (
      <Box>
        <Alert severity="error">
          Error loading token
        </Alert>
      </Box>
    )
  }

  const width = windowSize.width > theme.breakpoints.values.md
    ? (Math.min(windowSize.width, 1200)- 48)*0.666666
      : windowSize.width > theme.breakpoints.values.sm
        ? windowSize.width - 48
        : windowSize.width - 32

  return token && contractConfig && (
    <Box>

      <Box sx={{display: "flex", justifyContent: "center"}}>
        <Link href={`/project/${contractAddress}/${token.project.projectId}`} underline={"hover"}>
          <Typography variant={"h6"}>{token.project.name} Gallery</Typography>
        </Link>
      </Box>

      <Typography><br/></Typography>

      <Box sx={{display: "flex", justifyContent: "space-around"}}>

        <Box sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>

          <Box sx={{display: "flex", justifyContent: "space-around"}}>
            <Link href={`https://media.plottables.io/api/plot?contractAddress=${contractAddress}&tokenId=${id}&uri=${encodeURI(`${contractConfig.GENERATOR_URL}`)}`} sx={{paddingX: "25px"}} target={"_blank"} underline={"hover"}>
              <Typography variant={"h6"}>plot</Typography>
            </Link>
            <Link href={`https://media.plottables.io/api/svg?contractAddress=${contractAddress}&tokenId=${id}&uri=${encodeURI(`${contractConfig.GENERATOR_URL}`)}`} sx={{paddingX: "25px"}} target={"_blank"} underline={"hover"}>
              <Typography variant={"h6"}>svg</Typography>
            </Link>
            <Link href={`${contractConfig.MEDIA_URL}/${token.tokenId}.png`} sx={{paddingX: "25px"}} target={"_blank"} underline={"hover"}>
              <Typography variant={"h6"}>image</Typography>
            </Link>
            <Link href={`${contractConfig.GENERATOR_URL}/${contractAddress?.toLowerCase()}/${token.tokenId}`} sx={{paddingX: "25px"}} target={"_blank"} underline={"hover"}>
              <Typography variant={"h6"}>live</Typography>
            </Link>
          </Box>
          <TokenView
            contractAddress={contractAddress}
            tokenId={token.tokenId}
            width={600}
            aspectRatio={token.project.aspectRatio || parseAspectRatio(token.project.scriptJSON)}
            live
          />
        </Box>

        <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", minWidth: "40%"}}>
          <Typography>
            {token.project.name} #{token.invocation} by {token.project.artistName}
          </Typography>
          <Typography><br/></Typography>
          <Typography>
            Minted {moment.unix(token.createdAt).format("LL")}
          </Typography>
          <Typography>
            Owned by <Address address={token.owner.id}></Address>
          </Typography>
          <Typography><br/></Typography>

          <Link href={`https://etherscan.io/token/${contractAddress?.toLowerCase()}?a=${token.tokenId}`} target={"_blank"} underline={"hover"}>
            <Typography variant={"h6"}>
              View on Etherscan
            </Typography>
          </Link>
          <Link href={`https://opensea.io/assets/ethereum/${contractAddress?.toLowerCase()}/${token.tokenId}`} target={"_blank"} underline={"hover"}>
            <Typography variant={"h6"}>
              View on OpenSea
            </Typography>
          </Link>

          <Typography><br/></Typography>
          <TokenTraits contractAddress={contractAddress} tokenId={token.tokenId}/>

        </Box>

      </Box>
      <Typography><br/></Typography>
    </Box>
  )
}

export default TokenDetails
