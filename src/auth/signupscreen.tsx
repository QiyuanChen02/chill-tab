import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { auth } from '../config/firebase';
import { errorMessage } from '../helpers/helperfunctions';
import Authproviders from './authproviders';

type Props = {
    updateSignupModal: () => void
}

const Signupscreen: React.FC<Props> = ({ updateSignupModal }) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const signUp = async (email: string, password: string) => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            updateSignupModal();
        } catch (e: any) {
            setError(errorMessage(e.code));
        }
    }

    const signupFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (confirmPassword !== password) {
            setError("The passwords entered do not match");
        } else {
            signUp(email, password);
        }
    }

    return (
        <>
            <section className="signupModal">
                <button className="close-modal" onClick={updateSignupModal}>&times;</button>
                <div className="form-header">
                    <h2>Sign Up</h2>
                </div>
                <form onSubmit={signupFormSubmit}>
                    <label htmlFor="username">Username:</label>
                    <input type="text" name="username" id="username" value={username} onChange={e => setUsername(e.target.value)} />
                    <label htmlFor="email">Email:</label>
                    <input type="text" name="email" id="email" value={email} onChange={e => setEmail(e.target.value)} />
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" id="password" value={password} onChange={e => setPassword(e.target.value)} />
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input type="password" name="confirmPassword" id="confirmPassword" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                    <p>{error ? error : '\u00A0'}</p>
                    <div>
                        <button type="submit">Submit</button>
                    </div>
                </form>
                <Authproviders />
            </section>
            <div className="overlay" onClick={updateSignupModal} />
        </>
    )
};

export default Signupscreen;
