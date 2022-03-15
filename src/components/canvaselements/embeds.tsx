// import React from 'react'
// import { Rnd } from 'react-rnd'
// import { isEditPage } from '../../helpers/helperfunctions'
// import { useAppDispatch } from '../../hooks/reduxHooks'
// import { Embed } from '../../redux/projectData/projectTypes'

// const Spotify: React.FC<Embed & { scale: [number, number] }> = ({ id, metadata, styles, scale }) => {

//     const dispatch = useAppDispatch()

//     return (
//         <Rnd
//             size={{
//                 width: styles.dimensions[0] * scale[0],
//                 height: styles.dimensions[1] * scale[1],
//             }}
//             position={{
//                 x: styles.position[0] * scale[0],
//                 y: styles.position[1] * scale[1],
//             }}
//             onDragStop={(e, d) => {
//                 dispatch(moveNatureSounds({
//                     id, newPosition: [d.x, d.y]
//                 }))
//             }}
//             onResizeStop={(e, direction, ref, delta, position) => {
//                 dispatch(resizeNatureSounds({
//                     id,
//                     newPosition: [position.x, position.y],
//                     newDimensions: [parseInt(ref.style.width), parseInt(ref.style.height)]
//                 }))
//             }}
//             disableDragging={!isEditPage()}
//             enableResizing={isEditPage()}
//             bounds="parent"
//         >
//             <iframe src="https://open.spotify.com/embed/playlist/37i9dQZF1DWWQRwui0ExPn?utm_source=generator" width="100%" height="380" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>
//         </Rnd>
//     )
// }

// export default Spotify

export default {}
