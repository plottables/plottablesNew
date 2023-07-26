import {
  Box,
  Typography,
  Link
} from "@mui/material"
import { Project } from "utils/types"
import { parseAspectRatio } from "utils/scriptJSON"
import TokenView from "components/TokenView"
import ReactMarkdown from "react-markdown";
import { CALENDAR } from "../config";
import LineBreak from "./LineBreak";
import ProjectStatusBadge from "./ProjectStatusBadge";

interface Props {
  project: Project
  width?: number
  showDescription?: boolean
}

const ProjectPreview = ({project, width=280, showDescription=false}: Props) => {
  if (!project) {
    return null
  }

  // let releaseDate = project.minterConfiguration?.startTime;
  let releaseDate = null;
  if (!releaseDate) {
    releaseDate = new Date(CALENDAR[project.contract.id.toLowerCase()][Number(project.projectId)])
  }
  const releaseDateFormatted = releaseDate?.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZoneName: "short",
    hour: "numeric",
  });

  const token = project?.tokens[0]
  return (
    <Box>
      <Box sx={{
        display: {tablet: "flex"},
        textAlign: {mobile: "center"},
        marginBottom: {mobile: "25px", tablet: "0px"}
      }}>
        <Link href={`/project/${project.contract.id}/${project.projectId}`} underline="hover" sx={{paddingRight: {mobile: "0px", tablet: "50px"}}}>
          <Typography variant={"h6"}>
            {project.name} by {project.artistName}
          </Typography>
        </Link>
        <Box sx={{textAlign: {mobile: "center"}, maxHeight: "25px"}}>
          <ProjectStatusBadge complete={project.complete} paused={project.paused} startTime={project?.minterConfiguration?.startTime} />
        </Box>
      </Box>
      <Box sx={{
        display: {mobile: "block", tablet: "flex"},
        justifyContent: "space-between",
        flexDirection: "row-reverse"
      }}>
        <Box sx={{
          display: "flex",
          justifyContent: "center",
          marginLeft: {mobile: "0px", tablet: "50px"},
          marginBottom: "25px"
        }}>
          <TokenView
            contractAddress={project.contract.id}
            tokenId={token?.tokenId}
            width={width}
            invocation={token?.invocation}
            aspectRatio={project.aspectRatio || parseAspectRatio(project.scriptJSON)}
          />
        </Box>
        <Box sx={{
          paddingLeft: {mobile: "0px", tablet: "25px"},
          ".markdown > p": {
            lineHeight: "25px",
            fontSize: "20px",
            letterSpacing: "1px",
            wordSpacing: "5px",
            marginTop: "25px",
            marginBottom: "25px"
          }
        }}>
          <Typography><br/></Typography>
          <Typography>Release Date: {releaseDateFormatted}</Typography>
          {
            showDescription && (
              <ReactMarkdown className="markdown">{project.description}</ReactMarkdown>
            )
          }
        </Box>
      </Box>
      <LineBreak/>
    </Box>
  )
}

export default ProjectPreview
