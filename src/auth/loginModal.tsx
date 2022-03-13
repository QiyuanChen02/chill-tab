import { Box, Button, Divider, TextField, Typography } from '@mui/material'
import { createAction, createReducer } from '@reduxjs/toolkit'

import React, { useEffect, useReducer } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks'
import { toggleLogin, toggleSignup } from '../redux/auth'
import { handleLogin } from '../redux/auth'
import { fetchUserData, setUid } from '../redux/userData/userData'
import AuthModal from './authModal'
import MyGoogleLoginButton from './googleButton'

interface loginFormState {
    email: string
    password: string
    isButtonDisabled: boolean
}

const initialState: loginFormState = {
    email: '',
    password: '',
    isButtonDisabled: true,
}

const setEmail = createAction<string>('loginForm/setEmail')
const setPassword = createAction<string>('loginForm/setPassword')
const setIsButtonDisabled = createAction<boolean>(
    'loginForm/setIsButtonDisabled'
)

const loginReducer = createReducer(initialState, (builder) => {
    builder
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

const LoginModal = () => {
    const [state, dispatchLogin] = useReducer(loginReducer, initialState)

    const loginError = useAppSelector((state) => state.auth.loginError)
    const dispatch = useAppDispatch()

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatchLogin(setEmail(e.target.value))
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatchLogin(setPassword(e.target.value))
    }

    //refactor maybe?
    const login = () => {
        const { email, password } = state
        try {
            dispatch(handleLogin({ email, password }))
        } catch (e: any) {
            console.log(e.message)
        }
    }

    const goToSignup = () => {
        dispatch(toggleLogin(false))
        dispatch(toggleSignup(true))
    }

    useEffect(() => {
        if (state.email.trim() && state.password.trim()) {
            dispatchLogin(setIsButtonDisabled(false))
        } else {
            dispatchLogin(setIsButtonDisabled(true))
        }
    }, [state.email, state.password])

    return (
        <AuthModal type="login">
            <form noValidate autoComplete="off">
                <TextField
                    label="Email"
                    type="email"
                    variant="outlined"
                    color="secondary"
                    margin="normal"
                    error={!!loginError}
                    onChange={handleEmailChange}
                    fullWidth
                    required
                />

                <TextField
                    label="Password"
                    variant="outlined"
                    type="password"
                    color="secondary"
                    margin="normal"
                    error={!!loginError}
                    onChange={handlePasswordChange}
                    fullWidth
                    required
                />

                <Typography color="error">{loginError}</Typography>

                <Button
                    variant="contained"
                    size="large"
                    disabled={state.isButtonDisabled}
                    onClick={login}
                    fullWidth
                    sx={{ my: 2, p: 2 }}
                >
                    <Typography variant="body1">Log In</Typography>
                </Button>
            </form>

            <Typography align="center">
                Don't have an account?
                <Button onClick={goToSignup}>Sign up</Button>
            </Typography>
            <Typography align="center">
                <Button sx={{ pt: 0 }}>Forgot password?</Button>
            </Typography>

            <Divider sx={{ mb: 2 }}>or</Divider>
            <MyGoogleLoginButton />
        </AuthModal>
    )
}

export default LoginModal
