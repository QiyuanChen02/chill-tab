import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { deleteDoc, doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '../../config/firebase'
import { getNewProject } from '../../helpers/defaults'
import { ProjectDataState } from './projectTypes'

const initialState: ProjectDataState = getNewProject()

export const fetchProjectData = createAsyncThunk(
    'projectData/fetch',
    async (projectId: string | null) => {
        if (projectId) {
            const projectDataRef = doc(db, 'projects', projectId)
            const projectDataSnap = await getDoc(projectDataRef)
            if (projectDataSnap.exists()) {
                return projectDataSnap.data()
            } else {
                return null
            }
        }
    }
)

export const addNewProject = createAsyncThunk(
    'projectData/newProject',
    async (projectId: string) => {
        if (projectId) {
            const projectDataRef = doc(db, 'projects', projectId)
            await setDoc(projectDataRef, getNewProject())
        }
    }
)

export const deleteProject = createAsyncThunk(
    'projectData/deleteProject',
    async (projectId: string) => {
        if (projectId) {
            const projectDataRef = doc(db, 'projects', projectId)
            await deleteDoc(projectDataRef)
        }
    }
)

export const projectDataSlice = createSlice({
    name: 'projectData',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProjectData.fulfilled, (state, action) => {
                state.loadingData = false
                state.data = action.payload as any
            })
            .addCase(fetchProjectData.pending, (state) => {
                state.loadingData = true
            })
            .addCase(fetchProjectData.rejected, (state, action) => {
                state.loadingData = false
                state.error = action.error.message as string | null
            })
    },
})

// export const { setUid } = projectDataSlice.actions
export default projectDataSlice.reducer
