
import React from 'react';
import { Link } from 'react-router-dom';
import { GetUserContext } from '../auth/authcontext';
import Authproviders from '../auth/authproviders';
import Signout from '../auth/signout';
import Naturesounds from '../components/naturesounds';
import Spotify from '../components/spotify';
import { isExtension } from '../helpers/helperfunctions';


const Index = () => {
    const user = GetUserContext();

    return (
        <div className="index">
            <Naturesounds />
            <Spotify />
            {user ? <Signout /> : <Authproviders />}
            {isExtension() ? <a href="https://chill-tab.web.app/dashboard">Dashboard (tab)</a> : <Link to="/dashboard">Dashboard</Link>}
        </div>
    );
}

export default Index;
