import { Box, Button, Divider, Drawer, IconButton, Menu, MenuItem, Paper, Tooltip, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import CoffeeIcon from '@mui/icons-material/Coffee';
import React, { useState } from 'react'
import BrushIcon from '@mui/icons-material/Brush';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import SettingsIcon from '@mui/icons-material/Settings';
import { useFullScreen } from '../../fullscreen';
import { auth } from '../../config/firebase';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { toggleLogin, toggleSignup } from '../../redux/auth';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { changeColourMode } from '../../redux/userData/userData';

const border = {
    borderStyle: 'solid',
    borderWidth: '1px',
    borderColor: 'text.primary',
}

const styles = {
    main: {
        position: 'fixed',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        p: 4,
        top: 0,
        right: 0,
        width: 1,
    },

    logo: {
        width: 80,
        height: 80,
        color: '#fff8dc',
        bgcolor: "#000",
        borderRadius: 30,
        p: 2
    },

    iconButton: {
        color: 'text.primary',
        bgcolor: 'background.default',
        p: 2,
        "&.MuiButtonBase-root:hover, &.MuiButtonBase-root:active": {
            bgcolor: 'background.default',
            opacity: 0.75,
        },
        ...border
    },

    authButton: {
        transformOrigin: 'top right',
        transform: 'scale(1.5)',
        color: 'text.primary',
        bgcolor: 'background.default',
        "&.MuiButtonBase-root:hover, &.MuiButtonBase-root:active": {
            bgcolor: 'background.default',
            opacity: 0.75,
        },
        p: 2,
        borderRadius: 30,
        ...border
    },

    menu: {
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
}

const Navbar = () => {

    const uid = useAppSelector(state => state.userData.uid)
    const mode = useAppSelector(state => state.userData.data.settings.mode)
    const dispatch = useAppDispatch()

    const handle = useFullScreen()!
    const [isFullScreen, setIsFullScreen] = useState<boolean>(false)
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const open = !!anchorEl

    const fullScreen = () => {
        isFullScreen ? handle.exit() : handle.enter()
        setIsFullScreen(isFullScreen => !isFullScreen)
    }

    const toggleColourMode = () => {
        dispatch(changeColourMode())
    }

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(e.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    return (
        <Box sx={styles.main}>
            <Box sx={{ display: 'flex', gap: 1.5 }}>
                <CoffeeIcon sx={styles.logo} />
            </Box>
            {uid ? <Box sx={{ display: 'flex', gap: 2.5 }}>
                <Tooltip title="Customize" arrow>
                    <IconButton disableFocusRipple sx={styles.iconButton} component={Link} to="/dashboard">
                        <BrushIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title={`${mode === "light" ? "Dark" : "Light"} Mode`} arrow>
                    <IconButton sx={styles.iconButton} onClick={toggleColourMode}>
                        {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
                    </IconButton>
                </Tooltip>
                <Tooltip title="Full Screen" arrow>
                    <IconButton sx={styles.iconButton} onClick={fullScreen}>
                        {!isFullScreen ? <FullscreenIcon /> : <FullscreenExitIcon />}
                    </IconButton>
                </Tooltip>
                <Tooltip title="Settings" arrow>
                    <IconButton sx={styles.iconButton} onClick={handleClick}>
                        <SettingsIcon />
                    </IconButton>
                </Tooltip>


            </Box> : <Box sx={{ display: 'flex', gap: 8 }} >
                <Button
                    onClick={() => dispatch(toggleLogin(true))}
                    sx={styles.authButton}
                >
                    Login
                </Button>
                <Button
                    onClick={() => dispatch(toggleSignup(true))}
                    sx={styles.authButton}
                >
                    Signup
                </Button>
            </Box>}

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                sx={styles.menu}
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
        </Box>
    )
}

export default Navbar