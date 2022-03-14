import React from 'react'
import Loginscreen from '../auth/loginModal'
import Signupscreen from '../auth/signupModal'
import { Link } from 'react-router-dom'
import { Box, Button, Typography } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks'
import { toggleLogin, toggleSignup } from '../redux/auth'
import { getAuth } from 'firebase/auth'
import ProjectDisplay from '../components/projectDisplay'
import CoffeeIcon from '@mui/icons-material/Coffee';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import Navbar from '../components/navbar/navbar'

const Index = () => {
    const userData = useAppSelector((state) => state.userData)
    return userData.uid ? <IndexLoggedIn /> : <IndexLoggedOut />
}

const IndexLoggedIn = () => {

    return (
        <>
            <ProjectDisplay />
            <Navbar />
        </>
    )
}

const IndexLoggedOut = () => {
    const dispatch = useAppDispatch()
    return (
        <>
            <ProjectDisplay />
            <Navbar />
            <Signupscreen />
            <Loginscreen />
        </>
    )
}

export default Index
