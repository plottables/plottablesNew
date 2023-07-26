import { useState, useEffect } from "react"
import {
  Box,
  Typography,
  Alert,
  FormControl,
  NativeSelect,
  Pagination,
  Grid,
  Link
} from "@mui/material"
import { PROJECTS_PER_PAGE } from "config"
import { OrderDirection, Project } from "utils/types"
import Loading from "components/Loading"
import OwnedTokens from "components/OwnedTokens"
import useOwnedProjects from "hooks/useOwnedProjects"
import useCountOwnedProjects from "hooks/useCountOwnedProjects"
import { parseAspectRatio } from "utils/scriptJSON"
import LineBreak from "./LineBreak";

interface Props {
  walletAddress: string
}

const OwnedProjects = ({ walletAddress }: Props) => {
  const [countOwnedProjects, setCountOwnedProjects] = useState(0)
  const [currentPage, setCurrentPage] = useState(0)
  const skip = currentPage * PROJECTS_PER_PAGE
  const first = PROJECTS_PER_PAGE
  const [orderDirection, setOrderDirection] = useState<OrderDirection>(OrderDirection.DESC)
  const { loading, error, data } = useOwnedProjects(walletAddress, {skip, first, orderDirection})
  // const [filteredProjects, setFilteredProjects] = useState<any[]>([])
  // const countOwnedProjectsResponse = useCountOwnedProjects(walletAddress)

  useEffect(() => {
    setCountOwnedProjects(data?.length)
  }, [data])

  return (
    <Box>
      <Box>
        {
          loading ?
          (
            <Box marginTop={10}>
              <Loading/>
            </Box>
          ) :
          error ?
          (
            <Box marginTop={10}>
              <Alert severity="error">
                Error loading projects
              </Alert>
            </Box>
          ) :
          data?.length > 0 ?
          (
            <Box>
              {
                data && (
                  data?.slice(currentPage * PROJECTS_PER_PAGE, (currentPage + 1) * PROJECTS_PER_PAGE).map((project: Project) => (
                    <Box key={project.id} sx={{marginBottom: "25px"}}>
                      <Link href={`/project/${project.contract.id}/${project.projectId}`} underline="hover">
                        <Typography variant={"h6"}>{project.name} by {project.artistName}</Typography>
                      </Link>
                      <OwnedTokens contractAddress={project.contract.id} projectId={project.id} walletAddress={walletAddress} aspectRatio={project.aspectRatio || parseAspectRatio(project.scriptJSON)}/>
                      <LineBreak/>
                    </Box>
                  ))
                )
              }
            </Box>
          ) :
          data?.length === 0 ? (
            <Box marginTop={10}>
              <Alert severity="info">
                No projects found
              </Alert>
            </Box>
          ) :
          null
        }
        {
          !error && !loading && data?.length > 0 && (
            <Box sx={{display: "flex", justifyContent: "center", marginY: "25px", height: "25px"}}>
              <Pagination
                count={Math.ceil((countOwnedProjects || 0)/PROJECTS_PER_PAGE)}
                // color="primary"
                page={currentPage + 1}
                onChange={(event, page) => {
                  window.scrollTo(0, 0)
                  setCurrentPage(page - 1)
                }}/>
            </Box>
          )
        }
      </Box>
    </Box>
  )
}

export default OwnedProjects
