import React from 'react';
import { useInteract } from '../hooks/interact';
import Naturesounds, { PossibleTracks } from './naturesounds';
import Spotify from './spotify';

export type SoundsInfo = {
    type: PossibleTracks,
    position: [number, number],
    dimensions: [number, number],
    colour: string,
    editable?: boolean
}

export type EmbedsInfo = {
    type: string,
    position: [number, number],
    dimensions: [number, number],
}

type CanvasInfo = {
    size: [number, number],
    sounds: SoundsInfo[],
    embeds: EmbedsInfo[]
}

const canvasInfo: CanvasInfo = {
    size: [500, 500],
    sounds: [
        {
            type: "rain",
            position: [100, 100],
            dimensions: [100, 100],
            colour: "#FF0000"
        },
        {
            type: "volcano",
            position: [800, 800],
            dimensions: [200, 200],
            colour: "#FFFF00"
        },
        {
            type: "volcano",
            position: [500, 100],
            dimensions: [200, 200],
            colour: "#FFFF00"
        }
    ],
    embeds: [
        {
            type: "spotify",
            position: [500, 500],
            dimensions: [200, 300]
        }
    ]
}

const Canvas = ({ editable }: any) => {

    //Get data
    

    useInteract()
    return (
        <section className="canvas" style={{ width: "500px", height: "500px" }}>
            {canvasInfo.sounds.map(sound => (
                <Naturesounds editable={editable} {...sound} />
            ))}
            {canvasInfo.embeds.map(embed => (
                <Spotify editable={editable} {...embed} />
            ))}
        </section>
    );
};

export default Canvas;
