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
        setProjectId: (state: ProjectDataState, action: PayloadAction<string | null>) => {
            state.projectId = action.payload
        },
        setProjectLoading: (state: ProjectDataState) => {
            state.loadingData = true
        },
        setProjectData: (state: ProjectDataState, action: PayloadAction<ProjectData>) => {
            state.data = action.payload
            state.loadingData = false
        },
        moveNatureSounds: (state: ProjectDataState, action: PayloadAction<any>) => {
            const changedSound = state.data.sounds.find((sound) => sound.id === action.payload.id)
            if (changedSound) {
                changedSound.styles.position = action.payload.newPosition
            } else alert('Error sound not found')
        },
        resizeNatureSounds: (state: ProjectDataState, action: PayloadAction<any>) => {
            const changedSound = state.data.sounds.find((sound) => sound.id === action.payload.id)
            if (changedSound) {
                changedSound.styles.position = action.payload.newPosition
                changedSound.styles.dimensions = action.payload.newDimensions
            } else alert('Error sound not found')
        },
    },
})

export const { setProjectId, setProjectLoading, setProjectData, moveNatureSounds, resizeNatureSounds } =
    projectDataSlice.actions
export default projectDataSlice.reducer
