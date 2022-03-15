import { Button } from '@mui/material'
import React, { useState } from 'react'
import { Rnd } from 'react-rnd'
import { isEditPage } from '../../helpers/helperfunctions'
import { useAppDispatch } from '../../hooks/reduxHooks'
import { moveNatureSounds, resizeNatureSounds } from '../../redux/projectData/projectData'
import { PossibleTracks, Sound } from '../../redux/projectData/projectTypes'

const audio = (track: string) => {
    const sound = new Audio(track)
    sound.loop = true
    sound.volume = 1
    return sound
}

type Sounds = {
    rain: HTMLAudioElement
    birds: HTMLAudioElement
    thunder: HTMLAudioElement
    volcano: HTMLAudioElement
    wind: HTMLAudioElement
    beach: HTMLAudioElement
}

const sounds: Sounds = {
    rain: audio('/sounds/rain.wav'),
    birds: audio('/sounds/birds.mp3'),
    thunder: audio('/sounds/thunder.mp3'),
    volcano: audio('/sounds/volcano.wav'),
    wind: audio('/sounds/wind.wav'),
    beach: audio('/sounds/beach.mp3'),
}

const start = (track: PossibleTracks) => {
    sounds[track as keyof Sounds].play()
}

const stop = (track: PossibleTracks) => {
    sounds[track as keyof Sounds].pause()
}

const Naturesounds: React.FC<Sound & { scale: [number, number] }> = ({ id, styles, metadata, scale }) => {

    const dispatch = useAppDispatch()

    const [isPlaying, setIsPlaying] = useState<string[]>([])
    const togglePlay = (item: PossibleTracks) => {
        if (isPlaying.includes(item)) {
            stop(item)
            setIsPlaying((playing) => playing.filter((x) => x !== item))
        } else {
            start(item)
            setIsPlaying((playing) => [...playing, item])
        }
    }

    return (
        <Rnd
            size={{
                width: styles.dimensions[0] * scale[0],
                height: styles.dimensions[1] * scale[1],
            }}
            position={{
                x: styles.position[0] * scale[0],
                y: styles.position[1] * scale[1],
            }}
            onDragStop={(e, d) => {
                dispatch(moveNatureSounds({
                    id, newPosition: [d.x, d.y]
                }))
            }}
            onResizeStop={(e, direction, ref, delta, position) => {
                dispatch(resizeNatureSounds({
                    id,
                    newPosition: [position.x, position.y],
                    newDimensions: [parseInt(ref.style.width), parseInt(ref.style.height)]
                }))
            }}
            disableDragging={!isEditPage()}
            enableResizing={isEditPage()}
            bounds="parent"
        >
            <Button sx={{ width: '100%', height: '100%' }} variant="contained" onClick={() => !isEditPage() ? togglePlay(metadata.type) : null}>
                Toggle {metadata.type}
            </Button>
        </Rnd>
    )
}

export default Naturesounds
