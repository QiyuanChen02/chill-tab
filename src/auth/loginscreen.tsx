import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { auth } from '../config/firebase';
import { errorMessage } from '../helpers/helperfunctions';
import Authproviders from './authproviders';

type Props = {
    updateLoginModal: () => void
}

const Loginscreen: React.FC<Props> = ({ updateLoginModal }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const logIn = async (email: string, password: string) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            updateLoginModal();
        } catch (e: any) {
            setError(errorMessage(e.code));
        }
    }

    const loginFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        logIn(email, password);
    }

    return (
        <>
            <section className="loginModal">
                <button className="close-modal" onClick={updateLoginModal}>&times;</button>
                <div className="form-header">
                    <h2>Log In</h2>
                </div>
                <form onSubmit={loginFormSubmit}>
                    <label htmlFor="loginemail">Email:</label>
                    <input type="text" name="loginemail" id="loginemail" value={email} onChange={e => setEmail(e.target.value)} />
                    <label htmlFor="loginpassword">Password:</label>
                    <input type="password" name="loginpassword" id="loginpassword" value={password} onChange={e => setPassword(e.target.value)} />
                    <p>{error ? error : '\u00A0'}</p>
                    <div>
                        <button type="submit">Submit</button>
                    </div>
                </form>
                <Authproviders />
            </section>
            <div className="overlay" onClick={updateLoginModal} />
        </>
    )
};

export default Loginscreen;
