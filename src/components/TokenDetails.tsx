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
import {ARTFORA_CONFIG} from "../config";
import {useAccount} from "wagmi";

interface Props {
  contractAddress: string
  id: string
}

const TokenDetails = ({ contractAddress, id }: Props) => {
  const theme = useTheme()
  const windowSize = useWindowSize()
  const account = useAccount();
  const { loading, error, data } = useToken(`${contractAddress.toLowerCase()}-${id}`)
  const contractConfig = getContractConfigByAddress(contractAddress)

  if (loading) { return <Loading/> }

  if (error) {
    return (
      <Box>
        <Alert severity="error">
          Error loading token
        </Alert>
      </Box>
    )
  }

  const projectId = data?.token.project.projectId
  const projectName = data?.token.project.name
  const tokenId = data?.token.tokenId
  const artistAddress = data?.token.project.artistAddress
  const aspectRatio = data?.token.project.aspectRatio || parseAspectRatio(data?.token.project.scriptJSON)
  const invocation = data?.token.invocation
  const artistName = data?.token.project.artistName
  const mintDate = moment.unix(data?.token.createdAt).format("LL")
  const ownerId = data?.token.owner.id
  const projectIdCode = data?.token.project.id

  return data?.token && contractConfig && (
    <Box>

      <Box sx={{display: "flex", justifyContent: "center"}}>
        <Link href={`/project/${contractAddress}/${projectId}`} underline={"hover"}>
          <Typography variant={"h6"}>{projectName} Gallery</Typography>
        </Link>
      </Box>

      <Typography><br/></Typography>

      <Box sx={{display: {mobile: "block", tablet: "flex"}, justifyContent: "space-around"}}>

        <Box sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
          <Box sx={{display: "flex", justifyContent: "space-around"}}>
            <Link href={`https://media.plottables.io/api/plot?contractAddress=${contractAddress}&tokenId=${id}&uri=${encodeURI(`${contractConfig.GENERATOR_URL}`)}`} sx={{marginX: {mobile: "10px", tablet: "25px"}}} target={"_blank"} underline={"hover"}>
              <Typography variant={"h6"}>plot</Typography>
            </Link>
            <Link href={`https://media.plottables.io/api/svg?contractAddress=${contractAddress}&tokenId=${id}&uri=${encodeURI(`${contractConfig.GENERATOR_URL}`)}`} sx={{marginX: {mobile: "10px", tablet: "25px"}}} target={"_blank"} underline={"hover"}>
              <Typography variant={"h6"}>svg</Typography>
            </Link>
            <Link href={`${contractConfig.MEDIA_URL}/${tokenId}.png`} sx={{marginX: {mobile: "10px", tablet: "25px"}}} target={"_blank"} underline={"hover"}>
              <Typography variant={"h6"}>image</Typography>
            </Link>
            <Link href={`${contractConfig.GENERATOR_URL}/${contractAddress?.toLowerCase()}/${tokenId}`} sx={{marginX: {mobile: "10px", tablet: "25px"}}} target={"_blank"} underline={"hover"}>
              <Typography variant={"h6"}>live</Typography>
            </Link>
            {
              account.address?.toLowerCase() === artistAddress && (
                <Link href={`https://media.plottables.io/api/signArtist?url=${encodeURI(`${contractConfig.MEDIA_URL}/${tokenId}.png`)}`} sx={{marginX: {mobile: "10px", tablet: "25px"}}} target={"_blank"} underline={"hover"}>
                  <Typography variant={"h6"}>sign</Typography>
                </Link>
              )
            }
          </Box>
          <TokenView
            contractAddress={contractAddress}
            tokenId={tokenId}
            width={windowSize.width > theme.breakpoints.values.tablet ? Math.min(windowSize.width / 3, 600) : 0.8 * windowSize.width}
            aspectRatio={aspectRatio}
            live
          />
        </Box>

        <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", minWidth: "40%", marginTop: {mobile: "25px", tablet: "0px"}}}>
          <Typography>{projectName} #{invocation} by {artistName}</Typography>
          <Typography><br/></Typography>
          <Typography>Minted {mintDate}</Typography>
          <Typography>Owned by <Address address={ownerId}></Address></Typography>
          <Typography><br/></Typography>
          {
            Object.keys(ARTFORA_CONFIG.projects).includes(projectIdCode) && (
              <Box sx={{maxHeight: "25px", marginBottom: "25px"}}>
                <Link href={`${ARTFORA_CONFIG.collection_base_url}/${ARTFORA_CONFIG.projects[projectIdCode]}`} target={"_blank"} underline={"hover"}>
                  <Typography component={"span"} variant={"h3"} color={"blue"}>
                    Purchase Plot on Artfora
                  </Typography>
                </Link>
              </Box>
            )
          }
          <Link href={`https://etherscan.io/token/${contractAddress?.toLowerCase()}?a=${tokenId}`} target={"_blank"} underline={"hover"}>
            <Typography variant={"h6"}>
              View on Etherscan
            </Typography>
          </Link>
          <Link href={`https://opensea.io/assets/ethereum/${contractAddress?.toLowerCase()}/${tokenId}`} target={"_blank"} underline={"hover"}>
            <Typography variant={"h6"}>
              View on OpenSea
            </Typography>
          </Link>

          <Typography><br/></Typography>
          <TokenTraits contractAddress={contractAddress} tokenId={tokenId}/>

        </Box>

      </Box>
      <Typography><br/></Typography>
    </Box>
  )
}

export default TokenDetails
