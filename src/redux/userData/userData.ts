import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { db } from '../../config/firebase'
import { RootState } from '../store'
import { ProjectInfo, UserData, UserDataState } from './userTypes'

const initialState: UserDataState = {
    uid: null,
    loadingUser: true,
    loadingData: false,
    error: undefined,

    data: {
        email: '',
        projects: [],
        selectedProject: null,
        settings: {
            mode: 'dark',
        },
    },
}

export const addProjectToUser = createAsyncThunk(
    'userData/addProject',
    async ({ uid, projectId }: { uid: string; projectId: string }) => {
        try {
            const userDataRef = doc(db, 'users', uid)
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
            console.log(e)
        }
    }
)

export const removeProjectFromUser = createAsyncThunk(
    'userData/removeProject',
    async ({ uid, project }: { uid: string; project: ProjectInfo }) => {
        try {
            const userDataRef = doc(db, 'users', uid)
            await updateDoc(userDataRef, {
                projects: arrayRemove(project),
            })
            return project
        } catch (e) {
            alert('Error, see console for more details...')
            console.log(e)
        }
    }
)

export const setDefaultProject = createAsyncThunk(
    'userData/setAsDefault',
    async ({ uid, projectId }: { uid: string; projectId: string }) => {
        try {
            const userDataRef = doc(db, 'users', uid)
            await updateDoc(userDataRef, {
                selectedProject: projectId,
            })
            return projectId
        } catch (e) {
            alert('Error, see console for more details...')
            console.log(e)
        }
    }
)

export const changeColourMode = createAsyncThunk<void, void, { state: RootState }>(
    'userData/changeColour',
    async (_, ThunkAPI) => {
        const uid = ThunkAPI.getState().userData.uid!
        const userDataRef = doc(db, 'users', uid)
        await updateDoc(userDataRef, {
            settings: {
                mode:
                    ThunkAPI.getState().userData.data.settings.mode === 'light' ? 'dark' : 'light',
            },
        })
    }
)

export const userDataSlice = createSlice({
    name: 'userData',
    initialState,
    reducers: {
        setUid: (state: UserDataState, action: PayloadAction<string | null>) => {
            state.loadingUser = false
            state.uid = action.payload
        },
        setUserLoading: (state: UserDataState) => {
            state.loadingUser = true
        },
        setUserDataLoading: (state: UserDataState) => {
            state.loadingData = true
        },
        setUserData: (state: UserDataState, action: PayloadAction<Partial<UserData> | null>) => {
            if (action.payload) {
                return {
                    ...state,
                    loadingData: false,
                    data: {
                        ...state.data,
                        ...action.payload,
                    },
                }
            } else {
                return {
                    ...initialState,
                    loadingUser: false,
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
