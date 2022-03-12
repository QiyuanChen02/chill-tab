import { addDoc, collection, query, where } from 'firebase/firestore'
import React from 'react'
import { Link } from 'react-router-dom'
import { db } from '../config/firebase'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { User } from 'firebase/auth'
import { nanoid } from 'nanoid'
import { CanvasInfo } from '../types/canvascomponents'

const Dashboard = () => {

    const createNewDesign = async () => {
        await addDoc(collection(db, "projects"), emptyProject)
        console.log("Project created");
    }

    const projectsRef = collection(db, "projects");
    const q = query(projectsRef, where("creator", "==", user.uid));
    const [projects, loading] = useCollectionData(q, { idField: "id" });

        return (
            <section className="dashboard">
                <h1>This is a dashboard</h1>
                <Button onClick={createNewDesign}>New +</Button>
                {projects && projects.map(project => (
                    <ProjectPreview key={project.id} id={project.id} />
                ))}
            </section>
        );
}

const ProjectPreview = ({ id }: any) => {
    return <Link to={id}>Project: {id}</Link>
}

export default Dashboard
