import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import { toJpeg } from 'html-to-image'
import React, { useRef } from 'react'
import ProjectEdit from '../components/projectEdit'
import { useSetProjectId } from '../hooks/databaseListeners/setProjectId'
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks'
import { addComponent, addNewProject, saveProjectData } from '../redux/projectData/projectData'
import { changeProjectFromUser } from '../redux/userData/userData'

const Edit = () => {

    const dispatch = useAppDispatch()

    useSetProjectId() // Set the project id based on the user's selected project or the url (on the edit page)

    const uid = useAppSelector(state => state.userData.uid)
    const project = useAppSelector(state => state.projectData)

    const ref = useRef<HTMLDivElement>(null);

    const saveProgress = async () => {
        const dataUrl = await toJpeg(ref.current!, { quality: 0.5 })
        if (uid && project.projectId) {
            const projectToSave = {
                id: project.projectId,
                name: project.data.name,
                image: dataUrl
            }
            dispatch(changeProjectFromUser(projectToSave))
            dispatch(saveProjectData(project))
        }
    }

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '100vh' }}>
                <div ref={ref}>
                    <ProjectEdit />
                </div>
            </Box>
            <AppBar>
                <Toolbar>
                    <Button onClick={() => dispatch(addComponent('birds'))}>Add sound</Button>
                    <Button onClick={saveProgress}>Save</Button>
                    <Typography>{project.data.name}</Typography>
                </Toolbar>
            </AppBar>
        </>
    );
}

export default Edit
