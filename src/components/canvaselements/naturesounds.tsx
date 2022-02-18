import React, { useEffect, useState } from 'react';
import { Rnd } from 'react-rnd';
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
    rain: audio("/sounds/rain.wav"),
    birds: audio("/sounds/birds.mp3"),
    thunder: audio("/sounds/thunder.mp3"),
    volcano: audio("/sounds/volcano.wav"),
    wind: audio("/sounds/wind.wav"),
    beach: audio("/sounds/beach.mp3")
}

const start = (track: PossibleTracks) => {
    sounds[track as keyof Sounds].play();
}

const stop = (track: PossibleTracks) => {
    sounds[track as keyof Sounds].pause();
}

type Props = SoundsInfo & {
    setEditedSounds: any
}

const Naturesounds: React.FC<Props> = ({ id, styles, metadata, setEditedSounds }) => {

    const [currentStyles, setCurrentStyles] = useState(styles);
    const [currentData, setCurrentData] = useState(metadata);

    useEffect(() => {

        if (currentData && currentStyles) {
            setEditedSounds((sounds: SoundsInfo[]) => {
                const matchingSounds = sounds.filter((sound: SoundsInfo) => sound.id === id);
                if (matchingSounds.length === 0) {
                    return [...sounds, { id, styles: currentStyles, metadata: currentData }]
                } else if (matchingSounds.length === 1) {
                    return [...sounds].map((sound: SoundsInfo) => sound.id === id ? { id, styles: currentStyles, metadata: currentData } : sound)
                } else {
                    console.log("Error: shouldn't have more than 1 array with same id");
                    return [];
                }
            });
        }

    }, [currentStyles, currentData, id, setEditedSounds])

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
        <Rnd
            size={{ width: currentStyles.dimensions[0], height: currentStyles.dimensions[1] }}
            position={{ x: currentStyles.position[0], y: currentStyles.position[1] }}
            onDragStop={(e, d) => {
                setCurrentStyles((currentStyles: any) => {
                    return {
                        ...currentStyles,
                        position: [d.x, d.y]
                    }
                });
            }}
            onResizeStop={(e, direction, ref, delta, position) => {
                setCurrentStyles((currentStyles: any) => {
                    return {
                        ...currentStyles,
                        dimensions: [ref.style.width, ref.style.height],
                        position: [position.x, position.y] //possibly needs rounding
                    }
                });
            }}
            minWidth={"50px"}
        >
            <button onClick={() => togglePlay(currentData.type)}>Toggle {currentData.type}</button>
        </Rnd>
    );
};

export default Naturesounds;
