import React, { useContext } from 'react'
import { FullScreen, FullScreenHandle, useFullScreenHandle } from "react-full-screen";
import { Children } from './defaultThemeProvider';


const HandleContext = React.createContext<FullScreenHandle | null>(null)

//Creates the theme and the colour mode (i.e light or dark)
export const FullScreenProvider: React.FC<Children> = ({ children }) => {
    const handle = useFullScreenHandle();

    return (
        <HandleContext.Provider value={handle}>
            <FullScreen handle={handle}>
                {children}
            </FullScreen>
        </HandleContext.Provider>
    )
}

export const useFullScreen = () => useContext(HandleContext)
