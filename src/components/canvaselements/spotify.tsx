import React from 'react'
import { Rnd } from 'react-rnd'
import { EmbedsInfo } from '../../types/canvascomponents'

const parseStyles = ({ position, dimensions }: any) => {
    return {
        marginLeft: position[0].toString() + 'px',
        marginTop: position[1].toString() + 'px',
        width: dimensions[0].toString() + 'px',
        height: dimensions[1].toString() + 'px',
    }
}

const Spotify: React.FC<EmbedsInfo & any> = ({ metadata, styles }) => {
    //type = spotify
    return (
        //     <Rnd
        //   size={{ width: width, height: height }}
        //   position={{ x: x, y: y }}
        //   onDragStop={(e, d) => {
        //     setx(d.x);
        //     sety(d.y);
        //   }}
        //   onResize={(e, direction, ref, delta, position) => {
        //     setWidth(ref.style.width);
        //     setHeight(ref.style.height);
        //     setx(x + position.x);
        //     sety(Math.round(y + position.y));
        //   }}
        //   minWidth={"50px"}
        // >
        //   {width} {height} {x} {y}
        // </Rnd>
        <div className="spotify" style={parseStyles(styles)}>
            <iframe
                title="spotify"
                src="https://open.spotify.com/embed/playlist/471N195f5jAVs086lzYglw?utm_source=generator"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            ></iframe>
        </div>
    )
}

export default Spotify
