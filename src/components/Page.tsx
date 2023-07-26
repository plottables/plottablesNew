import {
  Container,
  Box, styled
} from "@mui/material"

import Header from "components/Header"
import Footer from "./Footer";

interface Props {
  children: React.ReactNode
}

const Page = ({ children }: Props) => {
  return (
    <Box sx={{
      position: "relative",
      paddingTop: "40px",
      paddingBottom: "40px",
      backgroundColor: "white",
      height: "100%",
      minHeight: "calc(100vh - 80px)",
      width: "100%",
      '&::before': {
        content: '""',
        width: {mobile: "0px", tablet: "2px"},
        height: "100%",
        position: "absolute",
        top: "0px",
        left: {mobile: "0px", tablet: "40px"},
        backgroundColor: {mobile: "rgba(255, 0, 0, 0)", tablet: "rgba(255, 0, 0, 0.6)"}
      }
    }}>
      <Box sx={{
        minHeight: "calc(100vh - 80px)",
        height: "100%",
        backgroundImage: "repeating-linear-gradient(white 0px, white 24px, teal 25px)",
        paddingTop: "7px",
        paddingLeft: {mobile: "16px", tablet: "56px"},
        paddingRight: "16px"
      }}>
        <Box sx={{display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
          <Header/>
          <main>
            <Container sx={{paddingTop: "25px"}} maxWidth={false}>
              {children}
            </Container>
          </main>
          <Footer/>
        </Box>
      </Box>
    </Box>


  // <Box sx={{display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
  //   <Header/>
  //   <main>
  //     <Container sx={{paddingTop: "25px"}} maxWidth={false}>
  //       {children}
  //     </Container>
  //   </main>
  //   <Footer/>
  // </Box>
  )
}

export default Page
