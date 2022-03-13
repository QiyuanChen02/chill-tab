import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
admin.initializeApp()

// auth trigger (new user signup)
export const newUserSignUp = functions.auth.user().onCreate((user) => {
    return admin.firestore().collection('users').doc(user.uid).set({
        email: user.email,
        displayName: user.displayName,
        selectedProject: null,
        projects: [],
    })
})

// auth trigger (user deleted)
export const userDeleted = functions.auth.user().onDelete((user) => {
    const doc = admin.firestore().collection('users').doc(user.uid)
    return doc.delete()
    // Also delete all projects related to user...
})

// firestore trigger (project created)
export const projectCreated = functions.firestore.document("projects/{projectId}").onCreate((snap) => {
    const newValue = snap.data()
    const createdBy = newValue.data.createdBy
    const projectId = newValue.projectId
    const userDoc = admin.firestore().collection('users').doc(createdBy)

    const projectToAdd = {
        id: projectId,
        name: 'Untitled',
        image: null,
    }
    return userDoc.update({
        projects: admin.firestore.FieldValue.arrayUnion(projectToAdd),
    })
})

// firestore trigger (project deleted)
