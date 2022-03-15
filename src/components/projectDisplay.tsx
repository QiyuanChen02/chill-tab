import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../hooks/reduxHooks'
import { Sound } from '../redux/projectData/projectTypes'
import { Naturesounds } from './canvaselements'

const styles = {
    width: '100vw',
    height: '100vh',
    backgroundColor: "#777",
    transformOrigin: 'top left',
}

const ProjectDisplay = () => {

    const projectData = useAppSelector((state) => state.projectData.data)
    const scaleX = window.innerWidth / projectData.size[0]
    const scaleY = window.innerHeight / projectData.size[1]

    return (
        <Box sx={styles}>
            {projectData.sounds.map((sound: Sound) => (
                <Naturesounds
                    key={sound.id}
                    scale={[scaleX, scaleY]}
                    {...sound}
                />
            ))}
        </Box>
    )
}

export default ProjectDisplay