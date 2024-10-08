import {
  Box,
  Typography,
  LinearProgress
} from "@mui/material"

interface Props {
  invocations: number,
  maxInvocations: number,
  maxHasBeenInvoked: boolean
}

const MintingProgress = ({invocations, maxInvocations, maxHasBeenInvoked}: Props) => {
  if (maxInvocations === 1000000) {
    return ( <Box sx={{marginBottom: 3}}><Box><Typography>Open Edition</Typography></Box></Box> )
  }
  return (
    <Box sx={{marginBottom: 3}}>
      <Box>
        <Typography>
          {invocations.toString()} / {maxInvocations.toString()} minted
        </Typography>
      </Box>
      {/*<Box>*/}
      {/*  <LinearProgress*/}
      {/*    sx={{width: "50%", height: "15px", borderRadius: 1, marginY: "5px"}}*/}
      {/*    color={maxHasBeenInvoked ? "secondary" : "primary"}*/}
      {/*    value={(invocations/maxInvocations)*100}*/}
      {/*    variant="determinate"*/}
      {/*  />*/}
      {/*</Box>*/}
    </Box>
  )
}

export default MintingProgress
