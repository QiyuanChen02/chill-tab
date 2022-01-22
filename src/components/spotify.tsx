import React from 'react';
import { EmbedsInfo } from '../types/canvascomponents';

const parseStyles = ({ position, dimensions }: any) => {
    return {
        marginLeft: position[0].toString() + "px",
        marginTop: position[1].toString() + "px",
        width: dimensions[0].toString() + "px",
        height: dimensions[1].toString() + "px",
    }
}

const Spotify: React.FC<EmbedsInfo> = ({ type, editable, ...styles }) => {
    return (
        <div className={editable ? "resize-drag" : ""} style={parseStyles(styles)}>
            <iframe title="spotify" src="https://open.spotify.com/embed/playlist/471N195f5jAVs086lzYglw?utm_source=generator" width="100%" height="100%" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>
        </div>
    );
};

export default Spotify;
