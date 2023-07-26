import useTheme from "@mui/material/styles/useTheme"
import { OrderDirection, Token } from "utils/types"
import {
  Grid,
  Link,
  Alert,
  Typography,
  Box,
  Pagination
} from "@mui/material"
import Loading from "components/Loading"
import TokenView from "components/TokenView"
import useWindowSize from "hooks/useWindowSize"
import useOwnedTokens from "hooks/useOwnedTokens"
import useCountOwnedTokens from "hooks/useCountOwnedTokens"
import { useEffect, useState } from "react"
import {parseAspectRatio} from "../utils/scriptJSON";

interface Props {
  contractAddress: string
  projectId: string
  walletAddress: string
  aspectRatio: number
}

const OwnedTokens = ({
  contractAddress,
  projectId,
  walletAddress,
  aspectRatio
}: Props) => {
  const OWNED_TOKENS_PER_PAGE = 3
  const theme = useTheme()
  const windowSize = useWindowSize()
  const [currentPage, setCurrentPage] = useState(0)
  const [countOwnedTokens, setCountOwnedTokens] = useState(0)
  const skip = currentPage * OWNED_TOKENS_PER_PAGE
  const first = OWNED_TOKENS_PER_PAGE
  const [orderDirection, setOrderDirection] = useState<OrderDirection>(OrderDirection.ASC)
  const {loading, error, data } = useOwnedTokens(projectId, walletAddress, {
    first,
    skip,
    orderDirection
  })
  const countOwnedTokensResponse = useCountOwnedTokens(projectId, walletAddress)

  useEffect(() => {
    setCountOwnedTokens(countOwnedTokensResponse?.data?.tokens?.length)
  }, [countOwnedTokensResponse])

  if (loading) {
    return <Loading/>
  }

  if (error) {
    return (
      <Alert severity="error">
        Error loading tokens
      </Alert>
    )
  }

  if (!data || !data.tokens) {
    return (
      <Alert severity="info">
        No tokens found for this project.
      </Alert>
    )
  }

  // todo: need to fix this to properly size thumbnails for mobile
  let width = 280
  if (windowSize && !isNaN(windowSize.width)) {
    width = windowSize.width > theme.breakpoints.values.tablet
      ? (Math.min(windowSize.width, 1200)-96) / 3
      : (windowSize.width-60) / 2
  }

  return (
    <Box>
      <Box sx={{display: "flex", justifyContent: "space-around"}}>
        {
          data.tokens.map(((token: Token) => (
            <Box key={token.tokenId} sx={{display: "flex", justifyContent: "space-around"}}>
              <TokenView
                contractAddress={contractAddress}
                tokenId={token.tokenId}
                aspectRatio={aspectRatio}
                width={400}
                invocation={token.invocation}
              />
            </Box>
          )))
        }
      </Box>
      <Typography><br/></Typography>
      {
        !countOwnedTokensResponse.error && !countOwnedTokensResponse.loading && countOwnedTokens && (
          <Box sx={{display: "flex", justifyContent: "center", height: "25px"}}>
            <Pagination
              count={Math.ceil(countOwnedTokens / OWNED_TOKENS_PER_PAGE)}
              page={currentPage + 1}
              onChange={(event, page) => {
                setCurrentPage(page - 1)
              }}/>
          </Box>
        )
      }
    </Box>
  )
}

export default OwnedTokens
