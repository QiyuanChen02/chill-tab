import { Box } from '@mui/material'
import React from 'react'
import { Rnd } from 'react-rnd'
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks'
import { moveComponent, resizeComponent } from '../redux/projectData/projectData'
import { Item, Sound } from '../redux/projectData/projectTypes'
import { Naturesounds } from './canvaselements'
import Embeds from './canvaselements/embeds'

const ProjectEdit = () => {

    const projectData = useAppSelector((state) => state.projectData.data)
    const dispatch = useAppDispatch()

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
        <Box sx={{ width: projectData.size[0], height: projectData.size[1], backgroundColor: "#777", position: 'relative' }}>
            {projectData.items.map(item => (
                <Rnd
                    size={{
                        width: item.dimensions[0],
                        height: item.dimensions[1]
                    }}
                    position={{
                        x: item.position[0],
                        y: item.position[1],
                    }}
                    onDragStop={(e, d) => {
                        dispatch(moveComponent({
                            id: item.id, newPosition: [d.x, d.y]
                        }))
                    }}
                    onResizeStop={(e, direction, ref, delta, position) => {
                        dispatch(resizeComponent({
                            id: item.id,
                            newPosition: [position.x, position.y],
                            newDimensions: [parseInt(ref.style.width), parseInt(ref.style.height)]
                        }))
                    }}
                    bounds="parent"
                >
                    <Box sx={{width: 1, height: 1, pointerEvents: 'none'}}>
                        {renderItem(item)}
                    </Box>
                </Rnd>
            ))}
        </Box>
    )
}

export default ProjectEdit