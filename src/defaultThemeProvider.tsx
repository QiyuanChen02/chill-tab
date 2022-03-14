import React, { useMemo } from 'react'
import { createTheme } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { green, purple } from '@mui/material/colors'
import { useAppSelector } from './hooks/reduxHooks'

export type Children = {
    children: React.ReactNode
}

export const DefaultThemeProvider: React.FC<Children> = ({ children }) => {
    const mode = useAppSelector(state => state.userData.data.settings.mode)

    const theme = useMemo(() => {
        return createTheme({
            palette: {
                mode,
                ...(mode === 'light'
                    ? {
                        background: {
                            default: "#FEFEFE"
                        },
                        primary: {
                            main: green[500],
                        },
                        secondary: {
                            main: purple[500],
                        },
                    }
                    : {
                        background: {
                            default: "#121212"
                        },
                        primary: {
                            main: green[200],
                        },
                        secondary: {
                            main: purple[200],
                        },
                    }),
            },
            typography: {
                button: {
                    fontSize: '1rem',
                    textTransform: 'none',
                    lineHeight: 1.5,
                },
            },
        })
    }, [mode])

    return (
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
    )
}
