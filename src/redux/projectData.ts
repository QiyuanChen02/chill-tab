import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { doc, getDoc } from 'firebase/firestore'
import { nanoid } from 'nanoid'
import { db } from '../config/firebase'

interface ProjectDataState {
    projectId: string | null
    loadingData: boolean
    error: null | string
    data: {
        name: string
        createdBy: null
        size: [number, number]
        sounds: any
        embeds: any
    }
}

const initialState: ProjectDataState = {
    projectId: null,
    loadingData: false,
    error: null,
    data: {
        name: 'Basic canvas',
        createdBy: null,
        size: [800, 500],
        sounds: [
            {
                id: nanoid(),
                metadata: {
                    type: 'rain',
                },
                styles: {
                    position: [100, 100],
                    dimensions: [100, 100],
                    colour: '#FF0000',
                },
            },
            {
                id: nanoid(),
                metadata: {
                    type: 'volcano',
                },
                styles: {
                    position: [500, 100],
                    dimensions: [200, 200],
                    colour: '#FFFF00',
                },
            },
        ],
        embeds: [
            {
                id: nanoid(),
                metadata: {
                    type: 'spotify',
                },

                styles: {
                    position: [500, 400],
                    dimensions: [200, 100],
                    colour: null,
                },
            },
        ],
    },
}

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
