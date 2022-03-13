import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { isExtension } from './helpers/helperfunctions'
import Index from './pages/index'
import Dashboard from './pages/dashboard'
import Edit from './pages/edit'
import { useAuthUser } from './hooks/authUserChange'
import { Typography } from '@mui/material'
import { useAppSelector } from './hooks/reduxHooks'

function App() {

    useAuthUser()
    return isExtension() ? <Index /> : <Webpage />
}

function Webpage() {

    const uid = useAppSelector((state) => state.userData.uid)
    return (
        <Routes>
            <Route path="/" element={<Index />} />
            <Route path="dashboard">
                {uid ?
                    <>
                        <Route index element={<Dashboard />} />
                        <Route path=":projectId" element={<Edit />} />
                    </>
                    :
                    <>
                        <Route index element={<Navigate to="/" replace />} />
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </>}
            </Route>
            <Route path="*" element={<Typography>404 not found</Typography>} />
        </Routes>
    )
}

export default App
