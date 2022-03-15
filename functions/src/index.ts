import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
admin.initializeApp()

// auth trigger (new user signup)
export const newUserSignUp = functions.auth.user().onCreate((user) => {
    return admin
        .firestore()
        .collection('users')
        .doc(user.uid)
        .set({
            email: user.email,
            displayName: user.displayName,
            selectedProject: null,
            projects: [],
            settings: {
                mode: 'dark',
            },
        })
})

// auth trigger (user deleted)
export const userDeleted = functions.auth.user().onDelete((user) => {
    const doc = admin.firestore().collection('users').doc(user.uid)
    return doc.delete()
    // Also delete all projects related to user...
})
