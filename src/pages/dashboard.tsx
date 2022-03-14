import { Link } from 'react-router-dom'
import { nanoid } from 'nanoid'
import { Box, Button, Typography, Card, CardMedia, CardContent, CardActions, CardActionArea } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks'
import { addNewProject, deleteProject } from '../redux/projectData/projectData'
import { addProjectToUser, removeProjectFromUser, setDefaultProject } from '../redux/userData/userData'
import { ProjectInfo } from '../redux/userData/userTypes'

const Dashboard = () => {

    const userData = useAppSelector((state) => state.userData)
    const dispatch = useAppDispatch()

    const createNewDesign = async () => {
        const uid = userData.uid
        if (uid) {
            const projectId = nanoid()
            await dispatch(addProjectToUser({ uid, projectId }))
            await dispatch(addNewProject(projectId))
            console.log("Project created");
        }
    }

    const projects = [...userData.data.projects].reverse()

    return (
        <>
            <Button onClick={createNewDesign}>New +</Button>
            <Box sx={{ display: "flex", gap: 5, flexWrap: "wrap", justifyContent: "center", alignItems: "center" }}>
                {projects && projects.map(project => (
                    <ProjectPreview key={project.id} {...project} />
                ))}
            </Box>
        </>
    );
}

// const Test = () => {
//     const ref = useRef<HTMLDivElement>(null);
//     const [url, setUrl] = useState<undefined | string>(undefined);
//     const onButtonClick = useCallback(() => {
//         if (ref.current === null) return

//         toSvg(ref.current)
//             .then((dataUrl) => {
//                 setUrl(dataUrl);
//             })
//             .catch((err) => {
//                 console.log(err);
//             });
//     }, [ref]);

//     return (
//         <>
//             <div ref={ref} style={{ padding: "1px" }}>
//                 <ProjectDisplay />
//             </div>
//             <button onClick={onButtonClick}>Click me</button>
//             <img src={url} alt="im" />
//         </>
//     );
// }

const ProjectPreview = ({ id, name, image }: any) => {

    const userData = useAppSelector((state) => state.userData)
    const dispatch = useAppDispatch()

    const projects = [...userData.data.projects]

    const findProject = (projectId: string): ProjectInfo => {
        return projects.find(project => project.id === projectId)!
    }

    const deleteDesign = async (projectId: string) => {
        const uid = userData.uid
        if (uid) {
            await dispatch(deleteProject(projectId))
            await dispatch(removeProjectFromUser({ uid, project: findProject(projectId) }))
            console.log("Project deleted");
        }
    }

    const setAsDefault = async (projectId: string) => {
        const uid = userData.uid
        if (uid) {
            await dispatch(setDefaultProject({ uid, projectId}))
        }
    }

    return (
        <Card sx={{ width: 300 }}>

            <CardActionArea component={Link} to={`/dashboard/${id}`}>
                <CardMedia
                    component="img"
                    height="140"
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
