import { Trait } from "utils/types"
import {
  Typography,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow, Box
} from "@mui/material"
import Loading from "components/Loading"
import useTokenTraits from "hooks/useTokenTraits"

interface Props {
  contractAddress: string
  tokenId: string
}

const TokenTraits = ({ contractAddress, tokenId }: Props) => {
  const { loading, error, data } = useTokenTraits(contractAddress, tokenId)
  const traits = data?.features

  if (loading) {
    return <Loading/>
  }

  if (error) {
    return (
      <Alert severity="error">
        Error loading traits
      </Alert>
    )
  }

  return traits && Object.keys(traits).length > 0 && (
    <Box sx={{display: "flex", alignItems: "center", flexDirection: "column"}}>
      <Typography>Features</Typography>
      {Object.entries(traits).map(([k, v]) => {
        return (
          <Typography key={k} component={"span"} variant={"h2"}>{`${k}: ${v}`}</Typography>
        )
      })}
    </Box>
  )
}

export default TokenTraits
