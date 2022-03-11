import { Button, Divider, TextField, Typography } from '@mui/material'
import { createAction, createReducer } from '@reduxjs/toolkit'

import React, { useEffect, useReducer } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks'
import { toggleLogin, toggleSignup } from '../redux/auth'
import { handleSignup } from '../redux/auth'
import { fetchUserData, setUid } from '../redux/userData'
import AuthModal from './authModal'
import MyGoogleLoginButton from './googleButton'

interface signupFormState {
    firstName: string
    lastName: string
    email: string
    password: string
    isButtonDisabled: boolean
}

const initialState: signupFormState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    isButtonDisabled: true,
}

const setFirstName = createAction<string>('signupForm/setFirstName')
const setLastName = createAction<string>('signupForm/setLastName')
const setEmail = createAction<string>('signupForm/setEmail')
const setPassword = createAction<string>('signupForm/setPassword')
const setIsButtonDisabled = createAction<boolean>(
    'signupForm/setIsButtonDisabled'
)

const signupReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(setFirstName, (state, action) => {
            state.firstName = action.payload
        })
        .addCase(setLastName, (state, action) => {
            state.lastName = action.payload
        })
        .addCase(setEmail, (state, action) => {
            state.email = action.payload
        })
        .addCase(setPassword, (state, action) => {
            state.password = action.payload
        })
        .addCase(setIsButtonDisabled, (state, action) => {
            state.isButtonDisabled = action.payload
        })
})

const SignupModal = () => {
    const [state, dispatchSignup] = useReducer(signupReducer, initialState)

    const signupError = useAppSelector((state) => state.auth.signupError)
    const dispatch = useAppDispatch()

    const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatchSignup(setFirstName(e.target.value))
    }

    const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatchSignup(setLastName(e.target.value))
    }

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatchSignup(setEmail(e.target.value))
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatchSignup(setPassword(e.target.value))
    }

    //refactor maybe?
    const signup = async () => {
        const { firstName, lastName, email, password } = state
        try {
            const uid = await dispatch(
                handleSignup({ firstName, lastName, email, password })
            ).unwrap()
            dispatch(setUid(uid))
            dispatch(fetchUserData(uid))
        } catch (e: any) {
            console.log(e.message)
        }
    }

    const goToLogin = () => {
        dispatch(toggleLogin(true))
        dispatch(toggleSignup(false))
    }

    useEffect(() => {
        if (
            state.firstName.trim() &&
            state.lastName.trim() &&
            state.email.trim() &&
            state.password.trim()
        ) {
            dispatchSignup(setIsButtonDisabled(false))
        } else {
            dispatchSignup(setIsButtonDisabled(true))
        }
    }, [state.firstName, state.lastName, state.email, state.password])

    return (
        <AuthModal type="signup">
            <form noValidate autoComplete="off">
                <TextField
                    label="First Name"
                    variant="outlined"
                    color="secondary"
                    margin="normal"
                    error={!!signupError}
                    onChange={handleFirstNameChange}
                    fullWidth
                    required
                />

                <TextField
                    label="Last Name"
                    variant="outlined"
                    color="secondary"
                    margin="normal"
                    error={!!signupError}
                    onChange={handleLastNameChange}
                    fullWidth
                    required
                />

                <TextField
                    label="Email"
                    variant="outlined"
                    color="secondary"
                    margin="normal"
                    error={!!signupError}
                    onChange={handleEmailChange}
                    fullWidth
                    required
                />

                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    color="secondary"
                    margin="normal"
                    error={!!signupError}
                    onChange={handlePasswordChange}
                    fullWidth
                    required
                />

                <Typography color="error">{signupError}</Typography>

                <Button
                    variant="contained"
                    size="large"
                    disabled={state.isButtonDisabled}
                    onClick={signup}
                    fullWidth
                    sx={{ my: 2, p: 2 }}
                >
                    <Typography variant="body1">Sign Up</Typography>
                </Button>
            </form>

            <Typography align="center">
                Already have an account?
                <Button onClick={goToLogin}>Log in</Button>
            </Typography>

            <Divider sx={{ mb: 2 }}>or</Divider>
            <MyGoogleLoginButton />
        </AuthModal>
    )
}

export default SignupModal
