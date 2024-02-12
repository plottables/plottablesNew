import {
    Button,
    Typography
} from "@mui/material"

interface Props {
    contractAddress: string,
    projectId: string,
    editProjectUrl: string
}

const EditProjectButton = ({contractAddress, projectId, editProjectUrl}: Props) => {
    return (
        <Button onClick={() => window.open(`${editProjectUrl}/${contractAddress}-${projectId}`, '_blank') }>
            <Typography variant={"h2"}>
                {"Edit Project"}
            </Typography>
        </Button>
    )
}

export default EditProjectButton
