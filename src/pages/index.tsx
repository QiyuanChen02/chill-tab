import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import Loginscreen from '../auth/loginscreen';
import { Signout, Signin } from '../auth/authbuttons';
import Signupscreen from '../auth/signupscreen';
import Canvas from '../components/canvas';
import { auth, db } from '../config/firebase';
import { useAuthModals } from '../hooks/auth';
import { doc } from 'firebase/firestore';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { User } from 'firebase/auth';
import { Link } from 'react-router-dom';
import Loading from '../components/loading';

const Index = () => {

    const [user, loading] = useAuthState(auth);
    if (!loading) {
        return user ? <IndexLoggedIn user={user} /> : <IndexLoggedOut />
    } else {
        return <Loading><h1>Loading user auth</h1></Loading>
    }
}

const IndexLoggedIn = ({ user }: { user: User }) => {

    const [userData, loadingUser] = useDocumentData<any>(doc(db, "users", user.uid));

    return (
        <>
            {!loadingUser ? <Canvas projectId={userData.selectedProject} editable={false} /> : <Loading>
                <h1>Loading User data</h1>
            </Loading>}
            <nav className="index-nav">
                <Link to="/dashboard">Go to dashboard</Link>
                <Signout />
            </nav>
        </>
    )
}

const IndexLoggedOut = () => {

    const authModals = useAuthModals();
    return (
        <>
            <Canvas projectId={"default"} editable={false} />
            <nav className="index-nav">
                <Signin {...authModals} />
            </nav>
            <AuthModals {...authModals} />
        </>
    )
}

const AuthModals = ({ updateLoginModal, updateSignupModal, loginModal, signupModal }: any) => {

    return (
        <>
            {signupModal && <Signupscreen updateSignupModal={updateSignupModal} />}
            {loginModal && <Loginscreen updateLoginModal={updateLoginModal} />}
        </>
    )
}

export default Index;
