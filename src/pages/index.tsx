import React from 'react';
import Loginscreen from '../auth/loginscreen';
import { Signout, Signin } from '../auth/authbuttons';
import Signupscreen from '../auth/signupscreen';
import Canvas from '../components/canvas';
import { db } from '../config/firebase';
import { useAuthModals } from '../hooks/auth';
import { doc } from 'firebase/firestore';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { User } from 'firebase/auth';
import { Link } from 'react-router-dom';
import Loading from '../components/loading';
import { GetUserContext } from '../auth/authcontext';

const Index = () => {

    const [user, loading] = GetUserContext();
    if (!loading) {
        return user ? <IndexLoggedIn user={user} /> : <IndexLoggedOut />
    } else {
        return <Loading><h1>Loading user auth</h1></Loading>
    }
}

const IndexLoggedIn = ({ user }: { user: User }) => {

    const [userData, loadingUser] = useDocumentData<any>(doc(db, "users", user.uid));

    if (loadingUser) {
        return <h1>Loading user data</h1>
    } else {
        return (
            <>
                <Canvas projectId={userData.selectedProject} editable={false} />
                <nav className="index-nav">
                    <Link to="/dashboard">Go to dashboard</Link>
                    <Signout />
                </nav>
            </>
        )
    }
    
}

const IndexLoggedOut = () => {

    const authModals = useAuthModals();
    const { updateLoginModal, updateSignupModal, loginModal, signupModal } = authModals;
    return (
        <>
            <Canvas projectId={"default"} editable={false} />
            <nav className="index-nav">
                <Signin {...authModals} />
            </nav>
            {signupModal && <Signupscreen updateSignupModal={updateSignupModal} />}
            {loginModal && <Loginscreen updateLoginModal={updateLoginModal} />}
        </>
    )
}

export default Index;
