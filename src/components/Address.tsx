import { useEnsName } from "wagmi"
import {Link, Typography} from "@mui/material";

interface Props {
  address?: any
}

const Address = ({ address }: Props) => {
  const ensName = useEnsName({
    address: address,
    chainId: 1
  })

  const shortAddress = address ? `${address.slice(0, 6)}...${ address.slice(38, 42)}` : null

  return (
    address !== null ?
      <Link href={`/user/${address}`} underline={"hover"}>
        <Typography variant={"h6"} component={"span"}>{ensName.data || shortAddress}</Typography>
      </Link>
    : null
  )
}

export default Address
