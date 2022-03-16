import { initializeApp } from 'firebase/app'
import { connectAuthEmulator, getAuth } from 'firebase/auth'
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore'

let config = {
    apiKey: 'AIzaSyAEKGC1aNYz_-K9H4sOZbRMnEUQnu3-y90',
    authDomain: 'chill-tab.firebaseapp.com',
    projectId: 'chill-tab',
    storageBucket: 'chill-tab.appspot.com',
    messagingSenderId: '711358596872',
    appId: '1:711358596872:web:acd24cd5eb1b0a95d08ebd',
    measurementId: 'G-RSGEZQKTLR',
}

const firebase = initializeApp(config)

const auth = getAuth()
const db = getFirestore()

if (window.location.hostname === 'localhost') {
    connectAuthEmulator(auth, 'http://localhost:9099')
    connectFirestoreEmulator(db, 'localhost', 8080)
}

export { firebase, auth, db }
