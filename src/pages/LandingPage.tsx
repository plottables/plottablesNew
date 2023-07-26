import {
  Box, Link,
  Typography
} from "@mui/material"
import Page from "components/Page"
import Logo from "components/Logo"

const LandingPage = () => {
  return (
    <Page>
      <Box>

        <Box sx={{display: "flex", width: "100%", justifyContent: "space-around", marginY: {mobile: "0px", tablet: "50px", laptop: "100px"}}}>
          <Logo/>
        </Box>

        <Typography align={"center"}><br/></Typography>

        <Box sx={{display: "flex", justifyContent: "center"}}>
          <Typography variant={"h2"} component={"span"}>What is it?</Typography>
        </Box>
        <Typography align={"center"}>A curated on-chain generative art platform powered by ArtBlocks</Typography>

        <Typography align={"center"}><br/></Typography>

        <Box sx={{display: "flex", justifyContent: "center"}}>
          <Typography variant={"h2"} component={"span"}>Who is it for?</Typography>
        </Box>
        <Typography align={"center"}>This is a place for generative artists working with pen plotters to share their work with a larger community.</Typography>

        <Typography align={"center"}><br/></Typography>

        <Box sx={{display: "flex", justifyContent: "center"}}>
          <Typography variant={"h2"} component={"span"}>Do I need to own a pen plotter?</Typography>
        </Box>
        <Typography align={"center"}>Nope! All works minted here exists just like any other NFT.</Typography>

        <Typography align={"center"}><br/></Typography>
      </Box>
    </Page>
  )
}

export default LandingPage
