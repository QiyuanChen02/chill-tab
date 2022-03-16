import { doc } from 'firebase/firestore'
import { db } from '../firebase'
import store from '../redux/store'

// Checks if page loaded is an extension
export const isExtension = () => window.location.href.includes('chrome-extension://')

// Checks if current page is edit screen
export const isEditPage = () => window.location.href.includes('edit')

export const getUserRef = () => {
    const uid = store.getState().userData.uid
    if (uid) {
        return doc(db, 'users', uid)
    } else {
        throw new Error('user id is null')
    }
}

export const getProjectRef = () => {
    const projectId = store.getState().projectData.projectId
    if (projectId) {
        return doc(db, 'users', projectId)
    } else {
        throw new Error('project id is null')
    }
}