import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { isExtension } from './helpers/helperfunctions'
import Index from './pages/index'
import Dashboard from './pages/dashboard'
import Edit from './pages/edit'
import { useAuthUser } from './hooks/databaseListeners/authUserChange'
import { CircularProgress, Typography } from '@mui/material'
import { useAppSelector } from './hooks/reduxHooks'
import { useUserDataChange } from './hooks/databaseListeners/userDataChange'
import { useProjectDataChange } from './hooks/databaseListeners/projectDataChange'
import { center } from './helpers/commonstyles'

function App() {

    useAuthUser() // To change user to always match auth state
    useUserDataChange() // Set the user data based on the user id (always matching database data)
    useProjectDataChange() // Set the project data based on the project id (always matching database data)

    return isExtension() ? <Index /> : <Webpage />
}

function Webpage() {

    const userData = useAppSelector((state) => state.userData)

    if (userData.loadingUser) return <CircularProgress sx={center} />
    return (
        <Routes>
            <Route path="/" element={<Index />} />
            <Route path="dashboard" element={userData.uid ? <Dashboard /> : <Navigate to="/" replace />} />
            <Route path="edit/:projectId" element={userData.uid ? <Edit /> : <Navigate to="/" replace />} />
            <Route path="*" element={<Typography>404 not found</Typography>} />
        </Routes>
    )
}

export default App
