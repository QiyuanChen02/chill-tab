import { addDoc, collection, query, where } from 'firebase/firestore';
import React from 'react';
import { Link } from 'react-router-dom';
import { auth, db } from '../config/firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { useAuthState } from 'react-firebase-hooks/auth';


const Dashboard = () => {

    const [user] = useAuthState(auth);
    const emptyProject = {
        size: [500, 500],
        creator: user!.email,
        sounds: [],
        embeds: []
    }


    const createNewDesign = async () => {
        await addDoc(collection(db, "projects"), emptyProject)
    }

    const projectsRef = collection(db, "projects");
    const q = query(projectsRef, where("creator", "==", user!.email))
    const [projects] = useCollectionData(q, { idField: "id" });

    return (
        <section className="dashboard">
            <h1>This is a dashboard</h1>
            <button onClick={createNewDesign}>New +</button>
            {projects && projects.map(project => (
                <Link to={project.id}>Project: {project.id}</Link>
            ))}
        </section>
    );
};

export default Dashboard;
