import { Box } from '@mui/material'
import React from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks'
import { fetchProjectData } from '../redux/projectData'
import { SoundsInfo } from '../types/canvascomponents'
import { Naturesounds } from './canvaselements'

const ProjectDisplay = () => {

    // fetch project
    const projectData = useAppSelector((state) => state.projectData.data)
    const dispatch = useAppDispatch()

    return (
        <Box sx={{ position: 'absolute', width: 1, height: 1, zIndex: -100 }}>
            {projectData.sounds.map((sound: SoundsInfo) => (
                <Naturesounds
                    key={sound.id}
                    {...sound}
                />
            ))}
        </Box>
    )
}

export default ProjectDisplay