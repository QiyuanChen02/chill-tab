import React from 'react';
import { auth } from '../config/firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const Authproviders = () => {

    const signInWithGoogle = () => {
        try {
            const provider = new GoogleAuthProvider();
            signInWithPopup(auth, provider);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <button onClick={signInWithGoogle}>Sign in</button>
    );
};

export default Authproviders;
