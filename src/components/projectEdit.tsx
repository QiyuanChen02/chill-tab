import { Box } from '@mui/material'
import React from 'react'
import { useAppSelector } from '../hooks/reduxHooks'
import { Sound } from '../redux/projectData/projectTypes'
import { Naturesounds } from './canvaselements'

const ProjectDisplay = () => {

    const projectData = useAppSelector((state) => state.projectData.data)

    return (

        // <Box sx={{ position: "static", width: "100vw", height: "100vh", zIndex: -100 }}> {/*This line is needed to make html-to-image work*/}
        //     <Box sx={{ position: "fixed", top: 0, left: 0, width: "40vw", height: "30vh", zIndex: -100, border: '1px solid black' }}>
        //         {projectData.sounds.map((sound: Sound) => (
        //             <Naturesounds
        //                 key={sound.id}
        //                 {...sound}
        //             />
        //         ))}
        //     </Box>
        // </Box>
        null
    )
}

export default ProjectDisplay