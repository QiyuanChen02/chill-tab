import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth'
import userDataReducer from './userData'
import projectDataReducer from './projectData'

const store = configureStore({
    reducer: {
        auth: authReducer,
        userData: userDataReducer,
        projectData: projectDataReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
