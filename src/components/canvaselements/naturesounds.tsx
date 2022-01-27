import React, { useState } from 'react';
import { PossibleTracks, SoundsInfo } from '../../types/canvascomponents';

const audio = (track: string) => {
    const sound = new Audio(track)
    sound.loop = true;
    sound.volume = 0.6;
    return sound;
}

type Sounds = {
    rain: HTMLAudioElement,
    birds: HTMLAudioElement,
    thunder: HTMLAudioElement,
    volcano: HTMLAudioElement,
    wind: HTMLAudioElement,
    beach: HTMLAudioElement,
}

const sounds: Sounds = {
    rain: audio("chillsounds/rain.wav"),
    birds: audio("chillsounds/birds.mp3"),
    thunder: audio("chillsounds/thunder.mp3"),
    volcano: audio("chillsounds/volcano.wav"),
    wind: audio("chillsounds/wind.wav"),
    beach: audio("chillsounds/beach.mp3")
}

const start = (track: PossibleTracks) => {
    sounds[track as keyof Sounds].play();
}

const stop = (track: PossibleTracks) => {
    sounds[track as keyof Sounds].pause();
}

const parseStyles = ({ position, dimensions, colour }: any) => {
    return {
        marginLeft: position[0].toString() + "px",
        marginTop: position[1].toString() + "px",
        width: dimensions[0].toString() + "px",
        height: dimensions[1].toString() + "px",
        backgroundColor: colour
    }
}

const Naturesounds: React.FC<SoundsInfo & {i: number}> = ({ i, type, styles }) => {

    const [isPlaying, setIsPlaying] = useState<string[]>([]);
    const togglePlay = (item: PossibleTracks) => {
        if (isPlaying.includes(item)) {
            stop(item);
            setIsPlaying(playing => playing.filter(x => x !== item))
        } else {
            start(item);
            setIsPlaying(playing => [...playing, item])
        }
    }

    return (
        <div className="naturesounds resize-drag" style={parseStyles(styles)}>
            <button className="resize-drag" onClick={() => togglePlay(type)}>Toggle {type}</button>
        </div>

    );
};

export default Naturesounds;
