import { useState, useEffect } from "react"
import {
  Box,
  Alert,
  Pagination,
  Grid, Typography
} from "@mui/material"
import useTheme from "@mui/material/styles/useTheme"
import { PROJECTS_PER_PAGE } from "config"
import { OrderDirection, Project } from "utils/types"
import ProjectPreview from "components/ProjectPreview"
import Loading from "components/Loading"
import useProjects from "hooks/useProjects"
import useWindowSize from "hooks/useWindowSize"
import useCountProjects from "hooks/useCountProjects"

const Projects = () => {
  const theme = useTheme()
  const windowSize = useWindowSize()
  const [countProjects, setCountProjects] = useState(0)
  const [currentPage, setCurrentPage] = useState(0)
  const skip = currentPage * PROJECTS_PER_PAGE
  const first = PROJECTS_PER_PAGE
  const [orderDirection, setOrderDirection] = useState<OrderDirection>(OrderDirection.DESC)
  const { loading, error, data } = useProjects({skip, first, orderDirection})
  const countProjectsResponse = useCountProjects()

  useEffect(() => {
    if (countProjectsResponse.data?.projects?.length) {
      setCountProjects(countProjectsResponse.data?.projects?.length)
    }
  }, [countProjectsResponse.data?.projects?.length])

  return (
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
          data?.projects?.length > 0 ?
          (
            data?.projects && (
              data.projects?.map((project: Project) => (
                <Box key={`${project.contract.id}-${project.projectId}`} sx={{marginBottom: "25px"}}>
                  <ProjectPreview
                    project={project}
                    width={windowSize.width > theme.breakpoints.values.tablet ? windowSize.width / 3 : 0.8 * windowSize.width}
                    showDescription
                  />
                </Box>
              ))
            )
          ) :
          data?.projects?.length === 0 ? (
            <Box marginTop={10}>
              <Alert severity="info">
                No projects found
              </Alert>
            </Box>
          ) :
          null
        }
        {
          !error && !loading && data?.projects?.length > 0 && (
            <Box sx={{display: "flex", justifyContent: "center", marginTop: "25px"}}>
              <Pagination
                count={Math.ceil(countProjects/PROJECTS_PER_PAGE)}
                page={currentPage + 1}
                onChange={(event, page) => {
                  window.scrollTo(0, 0)
                  setCurrentPage(page - 1)
                }}
              />
            </Box>
          )
        }
    </Box>
  )
}

export default Projects
