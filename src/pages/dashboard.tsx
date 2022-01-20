import React from 'react';

const Dashboard = () => {

    const createNewDesign = () => {
        alert("Creating new design")
    }

    return (
        <div>
            <h1>This is a dashboard</h1>
            <button onClick={createNewDesign}></button>
        </div>
    );
};

export default Dashboard;
