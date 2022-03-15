import { Box } from '@mui/material'
import React from 'react'
import { useAppSelector } from '../hooks/reduxHooks'
import { Sound } from '../redux/projectData/projectTypes'
import { Naturesounds } from './canvaselements'

const ProjectEdit = () => {

    const projectData = useAppSelector((state) => state.projectData.data)

    return (
        <Box sx={{ width: projectData.size[0], height: projectData.size[1], backgroundColor: "#777", position: 'relative' }}>
            {projectData.sounds.map((sound: Sound) => (
                <Naturesounds
                    key={sound.id}
                    scale={[1, 1]}
                    {...sound}
                />
            ))}
        </Box>
    )
}

export default ProjectEdit