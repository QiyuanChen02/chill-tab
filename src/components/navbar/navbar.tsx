import { Box, Button, IconButton, Tooltip } from '@mui/material'
import { Link } from 'react-router-dom'
import CoffeeIcon from '@mui/icons-material/Coffee';
import React, { useState } from 'react'
import BrushIcon from '@mui/icons-material/Brush';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import SettingsIcon from '@mui/icons-material/Settings';
import { useFullScreen } from '../../fullscreen';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { toggleLogin, toggleSignup } from '../../redux/auth';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { changeColourMode } from '../../redux/userData/userData';
import SettingsMenu from './settingsMenu';

export const border = {
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
        pointerEvents: 'none',
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
        pointerEvents: 'auto' as const,
        "&.MuiButtonBase-root:hover, &.MuiButtonBase-root:active": {
            bgcolor: 'background.default',

        },
        ...border
    },

    authButton: {
        transformOrigin: 'top right',
        transform: 'scale(1.25)',
        color: 'text.primary',
        bgcolor: 'background.default',
        "&.MuiButtonBase-root:hover, &.MuiButtonBase-root:active": {
            bgcolor: 'background.default',
            opacity: 0.75,
        },
        p: 2,
        pointerEvents: 'auto' as const,
        borderRadius: 30,
        ...border
    },
}

const Navbar = () => {

    const uid = useAppSelector(state => state.userData.uid)
    const mode = useAppSelector(state => state.userData.data.settings.mode)
    const dispatch = useAppDispatch()

    const handle = useFullScreen()!
    const [isFullScreen, setIsFullScreen] = useState<boolean>(false)
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

    const fullScreen = () => {
        isFullScreen ? handle.exit() : handle.enter()
        setIsFullScreen(isFullScreen => !isFullScreen)
    }

    const toggleColourMode = () => {
        dispatch(changeColourMode(mode))
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
            {uid ? <Box sx={{ display: 'flex', gap: 2.5, pointerEvents: 'none' }}>
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


            </Box> : <Box sx={{ display: 'flex', gap: 5 }} >
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

            <SettingsMenu anchorEl={anchorEl} handleClose={handleClose} />
        </Box>
    )
}

export default Navbar