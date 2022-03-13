import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { arrayRemove, arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '../../config/firebase'
import { DataState, UserDataState } from './userTypes'

const initialState: UserDataState = {
    uid: null,
    loadingUser: true,
    loadingData: false,
    error: undefined,
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

export const addProjectToUser = createAsyncThunk(
    'userData/addProject',
    async (ids: { uid: string; projectId: string }) => {
        const userDataRef = doc(db, 'users', ids.uid)
        const projectToAdd = {
            id: ids.projectId,
            name: 'Untitled',
            image: null,
        }
        await updateDoc(userDataRef, {
            projects: arrayUnion(projectToAdd),
        })
        return projectToAdd
    }
)

// export const removeProjectFromUser = createAsyncThunk(
//     'userData/removeProject',
//     async (ids: { uid: string; projectId: string }) => {
//         const userDataRef = doc(db, 'users', ids.uid)
        
//         await updateDoc(userDataRef, {
//             projects: arrayRemoveWithId(id),
//         })
//         return
//     }
// )

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
                state.error = action.error.message
            })
            .addCase(addProjectToUser.fulfilled, (state, action) => {
                state.data.projects.push(action.payload) // maybe add loading too?
            })
            .addCase(addProjectToUser.rejected, (state, action) => {
                console.log(action.error.message)
            })
    },
})

export const { setUid } = userDataSlice.actions
export default userDataSlice.reducer
