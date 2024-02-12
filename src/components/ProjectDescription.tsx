import {Box, Link, Typography} from "@mui/material";
import ReactMarkdown from "react-markdown";

interface Props {
  projectId: string,
  projectDescription: string
}

const ProjectDescription = ({ projectId, projectDescription }: Props) => {

  let customMarkdownStyle
  if (projectId.toLowerCase() === "0xa319c382a702682129fcbf55d514e61a16f97f9c-24") {
    customMarkdownStyle = {
      ".markdown > p, .markdown > h4, .markdown > ul": {
        lineHeight: "25px",
        fontSize: "20px",
        letterSpacing: "1px",
        wordSpacing: "5px",
        marginTop: "0px",
        marginBottom: "0px"
      },
      ".markdown > p + p, .markdown > h4": { marginTop: "25px" },
      ".markdown > ul, .markdown > ul ~ p, .markdown > h4 ~ p": { marginLeft: "25px" },
      ".markdown > h4": { marginBottom: "25px" },
      ".markdown > p:last-child": { marginTop: "0px" },
      ".markdown > h4:last-of-type": { marginBottom: "0px" }
    }
  } else {
    customMarkdownStyle = {
      ".markdown > p": {
        lineHeight: "25px",
        fontSize: "20px",
        letterSpacing: "1px",
        wordSpacing: "5px",
        marginTop: "0px",
        marginBottom: "25px"
      }
    }
  }

  return (
    <Box sx={{...customMarkdownStyle}}>
      <ReactMarkdown className={`markdown`}>{projectDescription}</ReactMarkdown>
    </Box>
  )

}

export default ProjectDescription
