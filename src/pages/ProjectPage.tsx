import { useParams } from "react-router-dom"
import Page from "components/Page"
import ProjectDetails from "components/ProjectDetails"
import ScribblePartyProjectDetails from "components/ScribblePartyProjectDetails"

const ProjectPage = () => {
  const { contractAddress, projectId } = useParams()

  if (contractAddress?.toLowerCase() === '0x9f22b52702e1c00b1318e1dacd543c17ad00774d'.toLowerCase() && projectId === '4' || projectId === '3') {
    return (
      <Page>
        {
          contractAddress && projectId && <ScribblePartyProjectDetails contractAddress={contractAddress} id={projectId} proceedsManagerAddress={'0xa33c59f01bb636a54850e6334A60778D213734CA'}/>
        }
      </Page>
    )
  }
  return (
    <Page>
      {
        contractAddress && projectId && <ProjectDetails contractAddress={contractAddress} id={projectId}/>
      }
    </Page>
  )
}

export default ProjectPage
