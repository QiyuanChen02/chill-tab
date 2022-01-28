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

const Naturesounds: React.FC<SoundsInfo & any> = ({ id, styles, metadata, setEditedSounds }) => {

    const [currentStyles, setCurrentStyles] = useState(styles);
    const [currentData, setCurrentData] = useState(metadata);

    useEffect(() => {
        if (currentData && currentStyles) {

            setEditedSounds((editedSounds: any) => {
                console.log(editedSounds);
                const matchingSounds = editedSounds.filter((sound: any) => sound.id === id);
                if (matchingSounds.length === 0) {
                    return [...editedSounds, { id, currentStyles, currentData }]
                } else if (matchingSounds.length === 1) {
                    return [...editedSounds].map((sound: any) => sound.id === id ? { id, currentStyles, currentData } : sound)
                } else {
                    console.log("Error: shouldn't have more than 1 array with same id");
                    return [];
                }
            });
        }
    }, [currentStyles, currentData])

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
        <>
            {/* <Rnd
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
                disableDragging={true}
            >
                <button onClick={() => togglePlay(currentData.type)}>Toggle {currentData.type}</button>
            </Rnd> */}
            <button onClick={() => togglePlay(currentData.type)}>Toggle {currentData.type}</button>
        </>
    );
};

export default Naturesounds;
