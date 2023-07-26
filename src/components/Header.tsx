import {
  Box, Divider, Drawer, IconButton,
  Link, List, ListItem, ListItemButton, ListItemText,
  Typography
} from "@mui/material"
import Connect from "components/Connect"
import { useAccount } from "wagmi"
import {useState} from "react"
import MenuIcon from "@mui/icons-material/Menu"

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
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{display: "flex", flexDirection: "column", textAlign: "left", paddingLeft: "25px", paddingY: "25px", height: "100%"}}>
      <Box sx={{display: "flex", flexDirection: "column", gap: "10px"}}>
        {items.map((item) => (
          <Link
            key={item.label}
            href={item.url}
            underline="hover"
            sx={{}}>
            <Typography variant={"h6"}>{item.label}</Typography>
          </Link>
        ))}
      </Box>

      <Box sx={{paddingY: "10px"}}>
        <Divider variant={"middle"}/>
      </Box>

      <Box>
        <Typography component={'span'}>
          <Connect isMobile={true}/>
        </Typography>
      </Box>

      <Box sx={{display: "flex", flexDirection: "column", flexGrow: 1, justifyContent: "flex-end", gap: "10px"}}>
        <Link href={"/termsOfUse"} underline={"hover"}>
          <Typography variant={"h6"}>Terms of Use</Typography>
        </Link>
        <Link href={"/privacyPolicy"} underline={"hover"}>
          <Typography variant={"h6"}>Privacy Policy</Typography>
        </Link>
        <Link href={"https://www.artblocksengine.io/"} target={"_blank"} underline={"hover"}>
          <Typography variant={"h6"}>Art Blocks Engine</Typography>
        </Link>
      </Box>

    </Box>
  )

  return (
    <Box>

      <Box sx={{display: "flex", justifyContent: "space-between"}}>

        <IconButton
          aria-label="open drawer"
          onClick={handleDrawerToggle}
          sx={{display: {tablet: "none"}, padding: "0px"}}>
          <Typography variant={"h6"}>Menu</Typography>
        </IconButton>

        <Box sx={{display: {mobile: "none", tablet: "flex"}}}>
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

        <Box sx={{display: {mobile: "none", tablet: "block"}}}>
          <Typography component={'span'}>
            <Connect isMobile={false}/>
          </Typography>
        </Box>
      </Box>

      <Box component="nav">
        <Drawer variant="temporary" open={mobileOpen} onClose={handleDrawerToggle} ModalProps={{keepMounted: true}}
                sx={{
                  display: { mobile: "block", tablet: "none" },
                  "& .MuiDrawer-paper": {
                    boxSizing: "border-box",
                    width: 240
                  }
                }}
        >
          {drawer}
        </Drawer>
      </Box>

    </Box>
  )
}

export default Header
