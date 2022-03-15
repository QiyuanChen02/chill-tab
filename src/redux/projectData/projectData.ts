import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { deleteDoc, doc, setDoc, updateDoc } from 'firebase/firestore'
import { db } from '../../config/firebase'
import { getNewProject } from '../../helpers/newProject'
import { Move, ProjectData, ProjectDataState, Resize } from './projectTypes'

const initialState: ProjectDataState = {
    projectId: null,
    loadingProjectData: false,
    error: null,
    data: {
        name: 'Untitled',
        createdBy: null,
        size: [800, 500],
        sounds: [],
        embeds: [],
    },
}

export const addNewProject = createAsyncThunk(
    'projectData/newProject',
    async (projectId: string) => {
        try {
            if (projectId) {
                const projectDataRef = doc(db, 'projects', projectId)
                await setDoc(projectDataRef, getNewProject())
            }
        } catch (e) {
            console.error(e)
        }
    }
)

export const deleteProject = createAsyncThunk(
    'projectData/deleteProject',
    async (projectId: string) => {
        try {
            if (projectId) {
                const projectDataRef = doc(db, 'projects', projectId)
                await deleteDoc(projectDataRef)
            }
        } catch (e) {
            console.error(e)
        }
    }
)

export const saveProjectData = createAsyncThunk(
    'projectData/saveProject',
    async (project: ProjectDataState) => {
        try {
            if (project.projectId) {
                const projectDataRef = doc(db, 'projects', project.projectId)
                await updateDoc(projectDataRef, {
                    ...project.data,
                })
            }
        } catch (e) {
            console.error(e)
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
        setProjectLoading: (state: ProjectDataState, action: PayloadAction<boolean>) => {
            state.loadingProjectData = action.payload
        },
        setProjectData: (
            state: ProjectDataState,
            action: PayloadAction<Partial<ProjectData> | null>
        ) => {
            if (action.payload) {
                return {
                    ...state,
                    data: {
                        ...state.data,
                        ...action.payload,
                    },
                }
            } else {
                return {
                    ...state,
                    data: {
                        ...initialState.data,
                    },
                }
            }
        },

        moveNatureSounds: (state: ProjectDataState, action: PayloadAction<Move>) => {
            const changedSound = state.data.sounds.find((sound) => sound.id === action.payload.id)
            if (changedSound) {
                changedSound.styles.position = action.payload.newPosition
            } else alert('Error sound not found')
        },
        resizeNatureSounds: (state: ProjectDataState, action: PayloadAction<Resize>) => {
            const changedSound = state.data.sounds.find((sound) => sound.id === action.payload.id)
            if (changedSound) {
                changedSound.styles.position = action.payload.newPosition
                changedSound.styles.dimensions = action.payload.newDimensions
            } else alert('Error sound not found')
        },
    },
})

export const {
    setProjectId,
    setProjectLoading,
    setProjectData,
    moveNatureSounds,
    resizeNatureSounds,
} = projectDataSlice.actions
export default projectDataSlice.reducer
