import { doc } from 'firebase/firestore'
import { db } from '../config/firebase'
import store from '../redux/store'

// Checks if page loaded is an extension
export const isExtension = () => window.location.href.includes('chrome-extension://')

// Checks if current page is edit screen
export const isEditPage = () => window.location.href.includes('edit')

//Gives the error message when the user is logging in
export const errorMessage = (err: string) => {
    switch (err) {
        case 'auth/invalid-email':
            return 'Invalid email format'
        case 'auth/weak-password':
            return 'The password must be at least 6 digits'
        case 'auth/email-already-in-use':
            return 'This email is already in use'
        case 'auth/wrong-password':
            return 'Incorrect email or password'
        case 'auth/user-not-found':
            return 'Incorrect email or password'
        default:
            return err
    }
}

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