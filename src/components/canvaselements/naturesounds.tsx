import { Button } from '@mui/material'
import React, { useState } from 'react'
import { isEditPage } from '../../helpers/helperfunctions'
import { useAppDispatch } from '../../hooks/reduxHooks'
import { PossibleSounds, Sound } from '../../redux/projectData/projectTypes'

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

const start = (track: PossibleSounds) => {
    sounds[track as keyof Sounds].play()
}

const stop = (track: PossibleSounds) => {
    sounds[track as keyof Sounds].pause()
}

const Naturesounds: React.FC<Sound> = ({ id, styles, metadata }) => {

    const [isPlaying, setIsPlaying] = useState<string[]>([])
    const togglePlay = (item: PossibleSounds) => {
        if (isPlaying.includes(item)) {
            stop(item)
            setIsPlaying((playing) => playing.filter((x) => x !== item))
        } else {
            start(item)
            setIsPlaying((playing) => [...playing, item])
        }
    }

    return (
        <Button sx={{ width: '100%', height: '100%'}} variant="contained" onClick={() => togglePlay(metadata.type)}>
            Toggle {metadata.type}
        </Button>
    )
}

export default Naturesounds
