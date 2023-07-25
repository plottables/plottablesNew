import {
  Box,
  Link,
  Typography
} from "@mui/material"
import Connect from "components/Connect"
import { useAccount } from "wagmi"

let items = [
  {
    label: "Plottables",
    url: "/",
    enabled: true
  },
  {
    label: "Projects",
    url: "/projects",
    enabled: true
  }
]

const Header = () => {
  const { address, isConnected } = useAccount()

  let userItem = items.find((item) => {
    return item.label === "Owned"
  })
  if (isConnected) {
    if (userItem) {
      userItem.enabled = true
      userItem.url = `/user/${address}`
    }
  } else {
    if (userItem) {
      userItem.enabled = false
      userItem.url = `/user`
    }
  }

  return (
    <Box sx={{display: {xs: "none", sm: "flex"}, justifyContent: "space-between"}}>
      <Box sx={{display: "flex"}}>
        {items.map((item) => (
          <Link
            key={item.label}
            href={item.url}
            underline="hover"
            sx={{paddingRight: "25px"}}>
            <Typography variant={"h6"}>{item.label}</Typography>
          </Link>
        ))}
      </Box>
      <Typography component={'span'} >
        <Connect/>
      </Typography>
    </Box>
  )
}

export default Header
