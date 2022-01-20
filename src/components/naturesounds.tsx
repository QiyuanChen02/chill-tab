import React, { useState } from 'react';

const audio = (track: string) => {
    const sound = new Audio(track)
    sound.loop = true;
    sound.volume = 0.6;
    return sound;
}

type PossibleTracks = "rain" | "birds" | "thunder" | "volcano" | "wind" | "beach"

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

const Naturesounds = () => {

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
        <div className="rain resize-drag">
            <button onClick={() => togglePlay("rain")}>Toggle rain</button>
            <button onClick={() => togglePlay("birds")}>Toggle birds</button>
            <button onClick={() => togglePlay("beach")}>Toggle beach</button>
            <button onClick={() => togglePlay("thunder")}>Toggle thunder</button>
            <button onClick={() => togglePlay("volcano")}>Toggle volcano</button>
            <button onClick={() => togglePlay("wind")}>Toggle wind</button>
        </div>
    );
};

export default Naturesounds;
