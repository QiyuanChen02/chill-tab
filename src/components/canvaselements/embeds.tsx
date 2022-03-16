import { Box } from '@mui/material'
import React from 'react'
import { center } from '../../helpers/commonstyles'
import { isEditPage } from '../../helpers/helperfunctions'
import { useAppDispatch } from '../../hooks/reduxHooks'
import { Embed } from '../../redux/projectData/projectTypes'

const Embeds: React.FC<Embed> = ({ id, metadata, styles }) => {

    return (
        <>
            <Box sx={{ position: 'absolute', width: '100%', height: '100%', backgroundColor: 'black' }}>
                <Box sx={center}>
                    <img width="100%" height="100%" src="/img/spotify.png" alt="spotify"></img>
                </Box>
            </Box>
            <iframe style={{ position: 'absolute' }} title="spotify" src="https://open.spotify.com/embed/playlist/37i9dQZF1DWWQRwui0ExPn?utm_source=generator" width="100%" height="100%" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>

        </>
    )
}

export default Embeds


