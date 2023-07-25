import { Button, Typography } from "@mui/material"

interface Props {
  disabled: boolean,
  message: string,
  contractPurchase: any
}

const MintingButton = ({disabled, message, contractPurchase}: Props) => {
  return (
    <Button
      disabled={disabled}
      onClick={() => contractPurchase?.()}
      sx={{
        boxShadow: "none",
        textTransform: "none"
      }}>
        <Typography variant={"h2"}>
          {message}
        </Typography>
    </Button>
  )
}

export default MintingButton
