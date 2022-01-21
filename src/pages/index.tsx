
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import Loginscreen from '../auth/loginscreen';
import Signout from '../auth/signout';
import Signupscreen from '../auth/signupscreen';
import Canvas from '../components/canvas';
import { auth } from '../config/firebase';
import { isExtension } from '../helpers/helperfunctions';

const Index = () => {

    const [user] = useAuthState(auth);

    const [signupModal, setSignupModal] = useState(false);
    const updateSignupModal = () => {
        setSignupModal(signupModal => !signupModal)
    }

    const [loginModal, setLoginModal] = useState(false);
    const updateLoginModal = () => {
        setLoginModal(loginModal => !loginModal)
    }

    if (user) {
        return (
            <div className="index">
                <Canvas editable={false} />
                <Signout />
                <div className="links">
                    {isExtension() ? <a href="https://chill-tab.web.app/dashboard">Dashboard (tab)</a> : <Link to="/dashboard">Dashboard</Link>}
                </div>
            </div>
        );

    } else {
        return (
            <div className="index">
                <nav>
                    <button onClick={updateLoginModal}>Log In</button>
                    <button onClick={updateSignupModal}>Sign Up</button>
                </nav>
                {signupModal && <Signupscreen updateSignupModal={updateSignupModal} />}
                {loginModal && <Loginscreen updateLoginModal={updateLoginModal} />}
            </div>
        );
    }

}

export default Index;
