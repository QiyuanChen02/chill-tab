import React from 'react'
import Loginscreen from '../auth/loginModal'
import Signupscreen from '../auth/signupModal'
import { Link } from 'react-router-dom'
import { Button, Typography } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks'
import { toggleLogin, toggleSignup } from '../redux/auth'

const Index = () => {
    const userData = useAppSelector((state) => state.userData)
    if (userData.loadingUser || userData.loadingData)
        return <h1>Loading user auth</h1>

    return userData.uid ? <IndexLoggedIn /> : <IndexLoggedOut />
}

const IndexLoggedIn = () => {
    return (
        <>
            {/* <Canvas projectId={userData.selectedProject} editable={false} /> */}
            <Link to="/dashboard">Go to dashboard</Link>
        </>
    )
}

const IndexLoggedOut = () => {
    const dispatch = useAppDispatch()
    return (
        <>
            <Button
                onClick={() => dispatch(toggleLogin(true))}
                color="primary"
                variant="text"
            >
                Toggle Login
            </Button>
            <Button
                onClick={() => dispatch(toggleSignup(true))}
                color="secondary"
                variant="text"
            >
                Toggle Signup
            </Button>
            <Signupscreen />
            <Loginscreen />
        </>
    )
}

export default Index
