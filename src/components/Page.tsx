import {
  Container,
  Box
} from "@mui/material"

import Header from "components/Header"
import Footer from "./Footer";

interface Props {
  children: React.ReactNode
}

const Page = ({ children }: Props) => {
  return (
    <Box sx={{display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
      <Header/>
      <main>
        <Container sx={{paddingTop: "25px"}} maxWidth={false}>
          {children}
        </Container>
      </main>
      <Footer/>
    </Box>
  )
}

export default Page
