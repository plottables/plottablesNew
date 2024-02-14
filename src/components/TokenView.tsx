import {
  Box,
  Card,
  Link, Typography
} from "@mui/material"
import TokenImage from "components/TokenImage"
import TokenLive from "components/TokenLive"

interface Props {
  contractAddress: string
  tokenId: string
  width: number
  retryDelay?: number
  invocation?: BigInt
  aspectRatio?: number
  live?: boolean
}

const TokenView = ({
  contractAddress,
  tokenId,
  width,
  retryDelay=10000,
  invocation,
  aspectRatio=1,
  live=false
}: Props) => {

  const lineCount = Math.floor(width / aspectRatio / 25)
  const height = 25 * lineCount
  const newWidth = height * aspectRatio

  return (
    <Box>
      {
        invocation !== undefined &&
        (
          <Box sx={{width: "100%", display: "flex", justifyContent: "center"}}>
            <Link href={`/token/${contractAddress}/${tokenId}`} sx={{textDecoration: "none"}} underline="hover">
              <Typography variant={"h6"}>#{ invocation?.toString() }</Typography>
            </Link>
          </Box>
        )
      }
      <Box width={String(newWidth)+"px"} height={String(height)+"px"} sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center"
      }}>
        <Link href={`/token/${contractAddress}/${tokenId}`} sx={{textDecoration: "none"}} underline="hover">
          <TokenImage contractAddress={contractAddress} tokenId={tokenId} width={newWidth} height={height} retryDelay={retryDelay}/>
        </Link>
      </Box>
    </Box>
  )
}

export default TokenView
