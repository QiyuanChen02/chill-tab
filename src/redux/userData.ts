import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../config/firebase'

interface DataState {
    email: string
    projects: string[]
    selectedProject: string | null
}

interface UserDataState {
    data: DataState
    uid: string | null
    loadingUser: boolean
    loadingData: boolean
    error: string | null
}

const initialState: UserDataState = {
    uid: null,
    loadingUser: true,
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
        setUid: (
            state: UserDataState,
            action: PayloadAction<string | null>
        ) => {
            state.loadingUser = false
            state.uid = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserData.fulfilled, (state, action) => {
                state.loadingData = false
                state.data = action.payload as DataState
            })
            .addCase(fetchUserData.pending, (state) => {
                state.loadingData = true
            })
            .addCase(fetchUserData.rejected, (state, action) => {
                state.loadingData = false
                state.error = action.error.message as string | null
            })
    },
})

export const { setUid } = userDataSlice.actions
export default userDataSlice.reducer
