import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
} from 'firebase/auth'
import { auth } from '../firebase'

interface AuthState {
    loginModal: boolean
    signupModal: boolean
    loginError: string
    signupError: string
    popupError: string
    authPending: boolean
}

const initialState: AuthState = {
    loginModal: false,
    signupModal: false,
    loginError: '',
    signupError: '',
    popupError: '',
    authPending: false,
}

const getError = (errorCode: string) => {
    switch (errorCode) {
        case 'auth/invalid-email':
            return 'Invalid email format'
        case 'auth/weak-password':
            return 'The password must be at least 6 digits'
        case 'auth/email-already-in-use':
            return 'This email is already in use'
        case 'auth/wrong-password':
            return 'Incorrect email or password'
        case 'auth/user-not-found':
            return 'Incorrect email or password'
        case 'auth/popup-closed-by-user':
            return 'Popup closed'
        default:
            return errorCode
    }
}

interface LoginInfo {
    email: string
    password: string
}

interface SignupInfo extends LoginInfo {
    firstName: string
    lastName: string
}

export const handleLogin = createAsyncThunk('auth/login', async (loginInfo: LoginInfo) => {
    const userCredential = await signInWithEmailAndPassword(
        auth,
        loginInfo.email,
        loginInfo.password
    )
    return userCredential.user.uid
})

export const handleSignup = createAsyncThunk('auth/signup', async (signupInfo: SignupInfo) => {
    const userCredential = await createUserWithEmailAndPassword(
        auth,
        signupInfo.email,
        signupInfo.password
    )
    return userCredential.user.uid
})

export const googleSignup = createAsyncThunk('auth/googleSignup', async () => {
    const provider = new GoogleAuthProvider()
    const result = await signInWithPopup(auth, provider)
    return result.user.uid
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        toggleLogin: (state, action: PayloadAction<boolean>) => {
            state.loginModal = action.payload
            state.loginError = ''
        },
        toggleSignup: (state, action: PayloadAction<boolean>) => {
            state.signupModal = action.payload
            state.signupError = ''
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(handleLogin.pending, (state) => {
                state.authPending = true
            })
            .addCase(handleLogin.fulfilled, () => {
                return initialState
            })
            .addCase(handleLogin.rejected, (state, action: any) => {
                state.authPending = false
                state.loginError = getError(action.error.code)
            })
            .addCase(handleSignup.pending, (state) => {
                state.authPending = true
            })
            .addCase(handleSignup.fulfilled, (state) => {
                state.authPending = false
            })
            .addCase(handleSignup.rejected, (state, action: any) => {
                state.authPending = false
                state.signupError = getError(action.error.code)
            })
            .addCase(googleSignup.pending, (state) => {
                state.authPending = true
            })
            .addCase(googleSignup.fulfilled, (state) => {
                return initialState
            })
            .addCase(googleSignup.rejected, (state, action: any) => {
                state.authPending = false
                state.popupError = getError(action.error.code)
            })
    },
})

export const { toggleLogin, toggleSignup } = authSlice.actions
export default authSlice.reducer
