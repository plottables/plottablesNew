import useTheme from "@mui/material/styles/useTheme"
import { TOKENS_PER_PAGE } from "config"
import { OrderDirection, Token } from "utils/types"
import {
  Grid,
  Link,
  Alert,
  Typography, Box
} from "@mui/material"
import Loading from "components/Loading"
import TokenView from "components/TokenView"
import useTokens from "hooks/useTokens"
import useWindowSize from "hooks/useWindowSize"
import {parseAspectRatio} from "../utils/scriptJSON";

interface Props {
  contractAddress: string
  projectId: string
  first?: number
  skip?: number
  orderDirection?: OrderDirection
  aspectRatio?: number
}

const Tokens = ({
  contractAddress,
  projectId,
  first=TOKENS_PER_PAGE,
  skip=0,
  orderDirection=OrderDirection.ASC,
  aspectRatio=1
}: Props) => {
  const theme = useTheme()
  const windowSize = useWindowSize()
  const {loading, error, data } = useTokens(projectId, {
    first,
    skip,
    orderDirection
  })

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

  let width = 280
  if (windowSize && !isNaN(windowSize.width)) {
    width = windowSize.width > theme.breakpoints.values.md
      ? (Math.min(windowSize.width, 1200)-96) / 3
      : (windowSize.width-60) / 2
  }

  return (
      <Box sx={{display: "flex", flexWrap: "wrap", justifyContent: "space-around"}}>
        {
          data.tokens.length > 0 ?
          data.tokens.map(((token:Token) => (
            <Box sx={{paddingTop: "25px"}} key={`${token.id}`}>
              <TokenView
                contractAddress={contractAddress}
                tokenId={token.tokenId}
                aspectRatio={aspectRatio}
                width={350}
                invocation={token.invocation}
              />
            </Box>
          )))
            : null
        }
      </Box>
  )
}

export default Tokens
