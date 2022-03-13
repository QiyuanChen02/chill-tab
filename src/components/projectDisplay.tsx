import { Box } from '@mui/material'
import React from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks'
import { Sound } from '../redux/projectData/projectTypes'
import { Naturesounds } from './canvaselements'

const ProjectDisplay = () => {

    // fetch project
    const projectData = useAppSelector((state) => state.projectData.data)
    const dispatch = useAppDispatch()

    return (

        <Box sx={{ position: "static", width: "100vw", height: "100vh", visibility: "none" }}> {/*This line is needed to make html-to-image work*/}
            <Box sx={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh" }}>
                {projectData.sounds.map((sound: Sound) => (
                    <Naturesounds
                        key= { sound.id }
                        { ...sound }
                    />
                ))}
            </Box>
        </Box>
    )
}

export default ProjectDisplay