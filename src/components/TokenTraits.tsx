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
  const traits = data?.traits?.filter((t:Trait) => t.value.indexOf('All') === -1)

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

  return traits && traits.length > 0 && (
    <Box sx={{display: "flex", alignItems: "center", flexDirection: "column"}}>
      <Typography>Features</Typography>
      {traits.map((trait:Trait) => {
        const p = trait.value.split(":")
        return (
          <Typography key={trait.value} variant={"h2"}>{p[0]}: {p[1]}</Typography>
        )
      })}
    </Box>
  )
}

export default TokenTraits
