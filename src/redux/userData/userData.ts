import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { arrayRemove, arrayUnion, updateDoc } from 'firebase/firestore'
import { getUserRef } from '../../helpers/helperfunctions'
import { RootState } from '../store'
import { ProjectInfo, UserData, UserDataState } from './userTypes'

const initialState: UserDataState = {
    uid: null,
    loadingUser: true,
    loadingUserData: false,
    error: undefined,

    data: {
        email: null,
        projects: [],
        selectedProject: null,
        settings: {
            mode: 'dark',
        },
    },
}

export const addProjectToUser = createAsyncThunk(
    'userData/addProject',
    async ({ projectId }: { projectId: string }) => {
        try {
            const userDataRef = getUserRef()
            const projectToAdd = {
                id: projectId,
                name: 'Untitled',
                image: null,
            }
            await updateDoc(userDataRef, {
                projects: arrayUnion(projectToAdd),
            })
            return projectToAdd
        } catch (e) {
            alert('Error, see console for more details...')
            console.error(e)
        }
    }
)

export const removeProjectFromUser = createAsyncThunk(
    'userData/removeProject',
    async ({ project }: { project: ProjectInfo }) => {
        try {
            const userDataRef = getUserRef()
            await updateDoc(userDataRef, {
                projects: arrayRemove(project),
            })
        } catch (e) {
            alert('Error, see console for more details...')
            console.error(e)
        }
        return project
    }
)

export const changeProjectFromUser = createAsyncThunk<
    ProjectInfo,
    { uid: string; project: ProjectInfo },
    { state: RootState }
>('userData/changeProject', async ({ project }, ThunkAPI) => {
    try {
        const userDataRef = getUserRef()
        const currentProjects = ThunkAPI.getState().userData.data.projects
        const newProjects = currentProjects.map((currentProject) =>
            currentProject.id === project.id ? project : currentProject
        )
        await updateDoc(userDataRef, {
            projects: newProjects,
        })
    } catch (e) {
        alert('Error, see console for more details...')
        console.error(e)
    }
    return project
})

export const setDefaultProject = createAsyncThunk(
    'userData/setAsDefault',
    async ({ projectId }: { projectId: string }) => {
        try {
                const userDataRef = getUserRef()
                await updateDoc(userDataRef, {
                    selectedProject: projectId,
                })
        } catch (e) {
            alert('Error, see console for more details...')
            console.error(e)
        }
        return projectId
    }
)

export const changeColourMode = createAsyncThunk(
    'userData/changeColour',
    async (colourMode: 'light' | 'dark') => {
        const userDataRef = getUserRef()
        await updateDoc(userDataRef, {
            settings: {
                mode: colourMode === 'light' ? 'dark' : 'light',
            },
        })
    }
)

export const userDataSlice = createSlice({
    name: 'userData',
    initialState,
    reducers: {
        setUid: (state: UserDataState, action: PayloadAction<string | null>) => {
            state.uid = action.payload
        },
        setUserLoading: (state: UserDataState, action: PayloadAction<boolean>) => {
            state.loadingUser = action.payload
        },
        setUserDataLoading: (state: UserDataState, action: PayloadAction<boolean>) => {
            state.loadingUserData = action.payload
        },
        setUserData: (state: UserDataState, action: PayloadAction<Partial<UserData> | null>) => {
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
    },
    extraReducers: (builder) => {
        
        // Deselect selected project if deleted
        builder.addCase(removeProjectFromUser.fulfilled, (state, action) => {
            if (action.payload!.id === state.data.selectedProject) {
                state.data.selectedProject = null
            }
        })
    },
})

export const { setUid, setUserLoading, setUserDataLoading, setUserData } = userDataSlice.actions
export default userDataSlice.reducer
