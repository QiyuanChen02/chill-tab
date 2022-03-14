import { Box } from '@mui/material'
import React from 'react'
import { useAppSelector } from '../hooks/reduxHooks'
import { Sound } from '../redux/projectData/projectTypes'
import { Naturesounds } from './canvaselements'

const ProjectDisplay = () => {

    const projectData = useAppSelector((state) => state.projectData.data)

    return (

        <Box sx={{ width: "100vw", height: "100vh", backgroundColor: "#777" }}>
            {projectData.sounds.map((sound: Sound) => (
                <Naturesounds
                    key={sound.id}
                    {...sound}
                />
            ))}
        </Box>
    )
}

export default ProjectDisplay