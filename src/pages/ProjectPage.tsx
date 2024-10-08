import { useParams } from "react-router-dom"
import Page from "components/Page"
import ProjectDetails from "components/ProjectDetails"
import ScribblePartyProjectDetails from "components/ScribblePartyProjectDetails"

const ProjectPage = () => {
  const { contractAddress, projectId } = useParams()

  if (contractAddress === '0x9f22b52702e1c00b1318e1dacd543c17ad00774d' && projectId === '4') {
    return (
      <Page>
        <ScribblePartyProjectDetails contractAddress={contractAddress} id={projectId} proceedsManagerAddress={'0xCAcA2839Cc0c58295AD50e37A47226A1cB0fDc14'}/>
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
