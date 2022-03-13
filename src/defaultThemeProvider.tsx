import React, { useContext, useMemo, useState } from 'react'
import { createTheme } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { green, purple } from '@mui/material/colors'

type ColourModeContextType = {
    toggleColourMode: () => void
    mode: 'dark' | 'light'
}

const ColourModeContext = React.createContext<ColourModeContextType>({
    toggleColourMode: () => {},
    mode: 'light',
})

export type Children = {
    children: React.ReactNode
}
//Creates the theme and the colour mode (i.e light or dark)
export const DefaultThemeProvider: React.FC<Children> = ({ children }) => {
    const [mode, setMode] = useState<'light' | 'dark'>('light')

    const colourMode = useMemo(() => {
        return {
            toggleColourMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
            },
            mode,
        }
    }, [mode])

    const theme = useMemo(() => {
        return createTheme({
            palette: {
                mode,
                ...(mode === 'light'
                    ? {
                          primary: {
                              main: green[500],
                          },
                          secondary: {
                              main: purple[500],
                          },
                      }
                    : {
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
        <ColourModeContext.Provider value={colourMode}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </ColourModeContext.Provider>
    )
}

export const useColourMode = () => useContext(ColourModeContext)
