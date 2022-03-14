import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { db } from '../../config/firebase'
import { ProjectInfo, UserData, UserDataState } from './userTypes'

const initialState: UserDataState = {
    uid: null,
    loadingUser: false,
    loadingData: false,
    error: undefined,

    data: {
        email: '',
        projects: [],
        selectedProject: null,
        settings: {
            mode: 'light',
        },
    },
}

export const addProjectToUser = createAsyncThunk(
    'userData/addProject',
    async ({ uid, projectId }: { uid: string; projectId: string }) => {
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
    }
)

export const removeProjectFromUser = createAsyncThunk(
    'userData/removeProject',
    async ({ uid, project }: { uid: string; project: ProjectInfo }) => {
        const userDataRef = doc(db, 'users', uid)
        await updateDoc(userDataRef, {
            projects: arrayRemove(project),
        })
        return project
    }
)

export const changeColourMode = createAsyncThunk(
    'userData/changeColour',
    async (_, { getState }: any) => {
        const uid = getState().userData.uid
        const userDataRef = doc(db, 'users', uid)
        await updateDoc(userDataRef, {
            settings: {
                mode: getState().userData.data.settings.mode === 'light' ? 'dark' : 'light',
            },
        })
        return
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
                    data: {
                        ...state.data,
                        ...action.payload,
                    },
                }
            } else {
                return initialState
            }
        },
    },
})

export const { setUid, setUserLoading, setUserDataLoading, setUserData } = userDataSlice.actions
export default userDataSlice.reducer
