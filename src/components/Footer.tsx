import { Box, Link, Typography } from "@mui/material"

const Footer = () => {
  return (
    <Box sx={{position: "absolute", bottom: "0", display: "flex", justifyContent: {mobile: "center", tablet: "space-between"}, width: "calc(100% - 70px)"}}>

      <Box sx={{display: {mobile: "none", tablet: "flex"}, textAlign: "left"}}>
        <Link href={"/termsOfUse"} paddingRight={"25px"} underline={"hover"}>
          <Typography variant={"h6"}>Terms of Use</Typography>
        </Link>
        <Link href={"/privacyPolicy"} underline={"hover"}>
          <Typography variant={"h6"}>Privacy Policy</Typography>
        </Link>
      </Box>

      <Box sx={{display: "flex", textAlign: "center"}}>
        <Link href={"https://www.instagram.com/plottables.io/"} target={"_blank"} marginRight={"15px"}>
          <img src="/icons/instagram.png" height={"20px"}/>
        </Link>
        <Link href={"https://twitter.com/plottablesio"} target={"_blank"} marginRight={"15px"}>
          <img src="/icons/twitter.png" height={"20px"}/>
        </Link>
        <Link href={"https://github.com/plottables"} target={"_blank"} marginRight={"15px"}>
          <img src="/icons/github.png" height={"20px"}/>
        </Link>
        <Link href={"https://discord.gg/umEbqdFxQv"} target={"_blank"}>
          <img src="/icons/discord.png" height={"20px"}/>
        </Link>
      </Box>

      <Box sx={{display: {mobile: "none", tablet: "flex"}, textAlign: "right"}}>
        <Link href={"https://www.artblocksengine.io/"} target={"_blank"} underline={"hover"}>
          <Typography variant={"h6"}>Art Blocks Engine</Typography>
        </Link>
      </Box>

    </Box>
  )
}

export default Footer
