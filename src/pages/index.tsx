import React, { useEffect } from 'react'
import Loginscreen from '../auth/loginModal'
import Signupscreen from '../auth/signupModal'
import { useAppSelector } from '../hooks/reduxHooks'
import ProjectDisplay from '../components/projectDisplay'
import Navbar from '../components/navbar/navbar'
import { useParams } from 'react-router-dom'

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
