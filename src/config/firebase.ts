import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebase = initializeApp({
	apiKey: "AIzaSyAEKGC1aNYz_-K9H4sOZbRMnEUQnu3-y90",
	authDomain: "chill-tab.firebaseapp.com",
	projectId: "chill-tab",
	storageBucket: "chill-tab.appspot.com",
	messagingSenderId: "711358596872",
	appId: "1:711358596872:web:acd24cd5eb1b0a95d08ebd",
	measurementId: "G-RSGEZQKTLR",
});

const auth = getAuth();
const db = getFirestore();

export { firebase, auth, db };
