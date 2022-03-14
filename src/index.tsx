import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { CssBaseline } from '@mui/material'
import { DefaultThemeProvider } from './defaultThemeProvider'
import store from './redux/store'
import { FullScreenProvider } from './fullscreen'

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <DefaultThemeProvider>
                    <FullScreenProvider>
                        <CssBaseline />
                        <App />
                    </FullScreenProvider>
                </DefaultThemeProvider>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
)
