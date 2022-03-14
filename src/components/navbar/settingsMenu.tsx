import { Divider, Menu, MenuItem } from '@mui/material'
import React from 'react'
import { auth } from '../../config/firebase'

const border = {
    borderStyle: 'solid',
    borderWidth: '1px',
    borderColor: 'text.primary',
}

const styles = {
    my: 2,
    "& .MuiMenu-paper": {
        borderRadius: 2,
        opacity: 0.75,
        "& .MuiDivider-root": {
            m: 0
        },
        ...border
    },
    "& .MuiMenu-list": {
        p: 0
    }
}

type Props = { 
    anchorEl: null | HTMLElement, 
    handleClose: () => void 
}

const SettingsMenu = ({ anchorEl, handleClose }: Props) => {

    const open = !!anchorEl
    return (
        <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            sx={styles}
            elevation={0}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
        >
            <MenuItem sx={{ py: 1.5 }} onClick={handleClose}>My Account</MenuItem>
            <Divider sx={{ bgcolor: 'grey.300' }} />
            <MenuItem sx={{ py: 1.5 }} onClick={handleClose}>Terms + Privacy</MenuItem>
            <Divider sx={{ bgcolor: 'grey.300' }} />
            <MenuItem sx={{ py: 1.5 }} onClick={handleClose}>About Us</MenuItem>
            <Divider sx={{ bgcolor: 'grey.300' }} />
            <MenuItem sx={{ py: 1.5 }} onClick={() => auth.signOut()}>Logout</MenuItem>
        </Menu>
    )
}

export default SettingsMenu