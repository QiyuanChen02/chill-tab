import { Box } from '@mui/material'
import React from 'react'
import { Rnd } from 'react-rnd'
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks'
import { Item, Sound } from '../redux/projectData/projectTypes'
import { Naturesounds } from './canvaselements'
import Embeds from './canvaselements/embeds'

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

    const isSound = (item: Item): item is Sound => {
        return item.metadata.component === "sound"
    }

    const renderItem = (item: Item) => {
        if (isSound(item)) {
            return <Naturesounds
                key={item.id}
                {...item}
            />
        } else {
            return <Embeds key={item.id} {...item} />
        }
    }

    return (
        <Box sx={styles}>
            {projectData.items.map(item => (
                <Box sx={{
                    position: 'absolute',
                    width: item.dimensions[0] * scaleX,
                    height: item.dimensions[1] * scaleY,
                    marginLeft: `${item.position[0] * scaleX}px`,
                    marginTop: `${item.position[1] * scaleY}px`,
                }}>
                    {renderItem(item)}
                </Box>
            ))}
        </Box>
    )
}

export default ProjectDisplay