import { addDoc, collection, query, where } from 'firebase/firestore';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { auth, db } from '../config/firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { useAuthState } from 'react-firebase-hooks/auth';
import { nanoid } from 'nanoid'

const emptyProject = {
    creator: "qiyuan.chen2002@gmail.com",
    size: [500, 500],
    sounds: [
        {
            id: nanoid(),
            type: "rain",
            position: [100, 100],
            dimensions: [100, 100],
            colour: "#FF0000"
        },
        {
            id: nanoid(),
            type: "volcano",
            position: [800, 800],
            dimensions: [200, 200],
            colour: "#FFFF00"
        },
        {
            id: nanoid(),
            type: "volcano",
            position: [500, 100],
            dimensions: [200, 200],
            colour: "#FFFF00"
        }
    ],
    embeds: [
        {
            type: "spotify",
            position: [500, 500],
            dimensions: [200, 300]
        }
    ]
}

const Dashboard = () => {

    const [user] = useAuthState(auth);

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
                <ProjectPreview key={project.id} id={project.id} />
            ))}
        </section>
    );
};

const ProjectPreview = ({ id }: any) => {
    return <Link to={id}>Project: {id}</Link>;
};


export default Dashboard;
