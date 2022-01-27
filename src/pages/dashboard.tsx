import { addDoc, collection, query, where } from 'firebase/firestore';
import React from 'react';
import { Link } from 'react-router-dom';
import { db } from '../config/firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { User } from 'firebase/auth';
import { nanoid } from 'nanoid';

const emptyProject = {
    creator: "qiyuan.chen2002@gmail.com",
    name: "Basic canvas",
    size: [800, 500],
    sounds: [
        {
            id: nanoid(),
            type: "rain",
            styles: {
                position: [100, 100],
                dimensions: [100, 100],
                colour: "#FF0000",
            },
        },
        {
            id: nanoid(),
            type: "volcano",
            styles: {
                position: [500, 100],
                dimensions: [200, 200],
                colour: "#FFFF00",
            },
        },
    ],
    embeds: [
        {
            id: nanoid(),
            type: "spotify",
            styles: {
                position: [500, 400],
                dimensions: [200, 100],
                colour: null,
            },
        },
    ],
}

const Dashboard = ({ user }: { user: User }) => {

    const createNewDesign = async () => {
        await addDoc(collection(db, "projects"), emptyProject)
    }

    const projectsRef = collection(db, "projects");
    const q = query(projectsRef, where("creator", "==", user.email));
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
