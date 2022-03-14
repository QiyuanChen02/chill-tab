import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { deleteDoc, doc, setDoc } from 'firebase/firestore'
import { db } from '../../config/firebase'
import { getNewProject } from '../../helpers/newProject'
import { ProjectData, ProjectDataState } from './projectTypes'

const initialState: ProjectDataState = getNewProject()

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
    reducers: {
        setProjectLoading: (state: ProjectDataState) => {
            state.loadingData = true
        },
        setProjectData: (
            state: ProjectDataState,
            action: PayloadAction<ProjectData>
        ) => {
            state.data = action.payload
            state.loadingData = false
        },
    },
})

export const { setProjectLoading, setProjectData } = projectDataSlice.actions
export default projectDataSlice.reducer
