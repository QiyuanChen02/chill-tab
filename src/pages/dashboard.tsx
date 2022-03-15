import { Link } from 'react-router-dom'
import { nanoid } from 'nanoid'
import { Box, Button, Typography, Card, CardMedia, CardContent, CardActions, CardActionArea } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks'
import { addNewProject, deleteProject } from '../redux/projectData/projectData'
import { addProjectToUser, removeProjectFromUser, setDefaultProject } from '../redux/userData/userData'
import { ProjectInfo } from '../redux/userData/userTypes'

const styles = {
    '.MuiCardMedia-img': {
        objectFit: 'fill',
        width: 400
    }
}

const Dashboard = () => {

    const projects = useAppSelector((state) => state.userData.data.projects)
    const dispatch = useAppDispatch()

    const createNewDesign = async () => {
        const projectId = nanoid()
        await dispatch(addProjectToUser({ projectId }))
        await dispatch(addNewProject(projectId))
        console.log("Project created");
    }

    const orderedProjects = [...projects].reverse()

    return (
        <>
            <Button onClick={createNewDesign}>New +</Button>
            <Box sx={{ display: "flex", gap: 5, flexWrap: "wrap", justifyContent: "center", alignItems: "center" }}>
                {orderedProjects && orderedProjects.map(project => (
                    <ProjectPreview key={project.id} {...project} />
                ))}
            </Box>
        </>
    );
}

const ProjectPreview = ({ id, name, image }: any) => {

    const projects = useAppSelector((state) => state.userData.data.projects)
    const dispatch = useAppDispatch()

    const findProject = (projectId: string): ProjectInfo => {
        return projects.find(project => project.id === projectId)!
    }

    const deleteDesign = async (projectId: string) => {
        await dispatch(deleteProject(projectId))
        await dispatch(removeProjectFromUser({ project: findProject(projectId) }))
        console.log("Project deleted");
    }

    const setAsDefault = async (projectId: string) => {
        await dispatch(setDefaultProject({ projectId }))
    }

    return (
        <Card sx={styles}>

            <CardActionArea component={Link} to={`/edit/${id}`}>
                <CardMedia
                    component="img"
                    height="250"
                    image={image || "/img/blank.jpg"}
                    alt="preview image"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {name}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button onClick={() => deleteDesign(id)}>Delete</Button>
                <Button onClick={() => setAsDefault(id)}>Set as default</Button>
            </CardActions>
        </Card>
    )
}

export default Dashboard
