import React from 'react';
import { auth } from '../config/firebase';
import { signOut } from 'firebase/auth';

const Signout = () => {

    const logOut = () => {
        signOut(auth);
    }

    return (
        <button onClick={logOut}>Sign out</button>
    );
};

export default Signout;

