import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { isExtension } from './helpers/helperfunctions'
import Index from './pages/index'
import Dashboard from './pages/dashboard'
import Edit from './pages/edit'
import { useAuthUser } from './hooks/authUserChange'
import { CircularProgress, Typography } from '@mui/material'
import { useAppSelector } from './hooks/reduxHooks'
import { useUserDataChange } from './hooks/userDataChange'
import { useProjectDataChange } from './hooks/projectDataChange'

function App() {

    useAuthUser()
    useUserDataChange()
    useProjectDataChange()
    return isExtension() ? <Index /> : <Webpage />
}

function Webpage() {

    const userData = useAppSelector((state) => state.userData)

    if (userData.loadingUser) return <CircularProgress sx={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }} />
    return (
        <Routes>
            <Route path="/" element={<Index />} />
            <Route path="dashboard">
                {userData.uid ?
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
