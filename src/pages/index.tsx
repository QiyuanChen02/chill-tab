import React from 'react'
import Loginscreen from '../auth/loginModal'
import Signupscreen from '../auth/signupModal'
import { Link } from 'react-router-dom'
import { Button, Typography } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks'
import { toggleLogin, toggleSignup } from '../redux/auth'
import { getAuth } from 'firebase/auth'
import ProjectDisplay from '../components/projectDisplay'

const Index = () => {
    const userData = useAppSelector((state) => state.userData)
    if (userData.loadingUser || userData.loadingData)
        return <Typography>Loading user auth</Typography>

    return userData.uid ? <IndexLoggedIn /> : <IndexLoggedOut />
}

const IndexLoggedIn = () => {

    const auth = getAuth()
    return (
        <>
            <ProjectDisplay />
            <Link to="/dashboard">Go to dashboard</Link>
            <Button
                onClick={() => auth.signOut()}
                color="primary"
                variant="text"
            >
                Signout
            </Button>
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
