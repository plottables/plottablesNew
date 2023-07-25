import Page from "components/Page"
import {Link, Typography} from "@mui/material";

const PrivacyPolicyPage = () => {
  return (
    <Page>
      <Typography align={"center"} variant={"h1"}>Privacy Policy</Typography>
      <Typography><br /></Typography>
      <Typography>
        This privacy policy (“Policy”) describes how Plottables (“we”, “our”, or
        “us”) collects, uses, shares, and stores personal information of users of
        our website, <Link href={"https://plottables.io"} underline={"hover"} color={"blue"}>https://plottables.io</Link> -
        including any subdomains (collectively the “Application”).
      </Typography>
      <Typography><br /></Typography>
      <Typography align={"center"} variant={"h1"}>How do we define personal data?</Typography>
      <Typography><br /></Typography>
      <Typography>
        We consider personal data to be any information that could be used to
        identify an individual.
      </Typography>
      <Typography><br /></Typography>
      <Typography align={"center"} variant={"h1"}>What personal data do we intentionally collect?</Typography>
      <Typography><br /></Typography>
      <Typography>
        We do not intentionally collect any personal data of our users. Our
        Application is a decentralized application that merely facilitates your
        interaction with the Ethereum blockchain. We do not create, manage, or
        store user accounts or user information. We do not record or store your
        Ethereum address or any actions you perform on the blockchain.
      </Typography>
      <Typography><br /></Typography>
      <Typography align={"center"} variant={"h1"}>What information is automatically stored?</Typography>
      <Typography><br /></Typography>
      <Typography>
        We may automatically record certain information about how you use our
        Application including but not limited to your Internet Protocol (IP)
        address, device and browser type, operating system, and other usage
        statistics. These data points are automatically logged by our web hosting
        and service providers.
      </Typography>
      <Typography><br /></Typography>
      <Typography align={"center"} variant={"h1"}>What information might other third parties collect?</Typography>
      <Typography><br /></Typography>
      <Typography>
        You must use MetaMask as your Ethereum provider to use the Application. We
        do not receive, collect, or store, nor are we responsible for any personal
        data or information that MetaMask may collect. You should refer to their
        privacy policy for more information.
      </Typography>
      <Typography><br /></Typography>
      <Typography align={"center"} variant={"h1"}>What personal information is shared?</Typography>
      <Typography><br /></Typography>
      <Typography>
        We do not sell any personal information with third parties.
      </Typography>
      <Typography><br /></Typography>
    </Page>
  )
}

export default PrivacyPolicyPage
