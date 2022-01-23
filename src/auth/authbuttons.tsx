import React from 'react';
import { auth } from '../config/firebase';
import { signOut } from 'firebase/auth';
import { useAuthModals } from '../hooks/auth';

const Signout = () => {

    const logOut = () => {
        signOut(auth);
    }

    return (
        <button onClick={logOut}>Sign out</button>
    );
};

const Signin = ({ updateLoginModal, updateSignupModal }: any) => {

    return (
        <>
            <button onClick={updateLoginModal}>Login In</button>
            <button onClick={updateSignupModal}>Sign Up</button>
        </>
    );
};


export { Signin, Signout };

