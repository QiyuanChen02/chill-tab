import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../config/firebase'

interface DataState {
    data: {
        email: string
        projects: string[]
        selectedProject: string | null
    }
}

interface UserDataState extends DataState {
    uid: string | null
    loadingUser: boolean
    loadingData: boolean
    error: string | null
}

const initialState: UserDataState = {
    uid: null,
    loadingUser: false,
    loadingData: false,
    error: null,
    data: {
        email: '',
        projects: [],
        selectedProject: null,
    },
}

export const fetchUserData = createAsyncThunk(
    'userData/fetch',
    async (uid: string) => {
        const userDataRef = doc(db, 'users', uid)
        const userDataSnap = await getDoc(userDataRef)
        if (userDataSnap.exists()) {
            return userDataSnap.data()
        } else {
            return null
        }
    }
)

export const userDataSlice = createSlice({
    name: 'userData',
    initialState,
    reducers: {
        setUid: (state: UserDataState, action: any) => {
            state.uid = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserData.fulfilled, (state, action: any) => {
                state.data = action.payload
            })
            .addCase(fetchUserData.rejected, (state, action: any) => {
                state.error = action.error.message
            })
    },
})

export const { setUid } = userDataSlice.actions
export default userDataSlice.reducer
