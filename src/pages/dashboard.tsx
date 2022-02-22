import { addDoc, collection, query, where } from 'firebase/firestore'
import React from 'react'
import { Link } from 'react-router-dom'
import { db } from '../config/firebase'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { User } from 'firebase/auth'
import { nanoid } from 'nanoid'
import { CanvasInfo } from '../types/canvascomponents'

const Dashboard = () => {
    // //This canvas is displayed to the user when they are not logged in/have not picked a canvas
    // const emptyProject = {
    //     name: "Basic canvas",
    //     creator: "qiyuan.chen2002@gmail.com",
    //     size: [800, 500],
    //     sounds: [
    //         {
    //             id: nanoid(),
    //             metadata: {
    //                 type: "rain",
    //             },
    //             styles: {
    //                 position: [100, 100],
    //                 dimensions: [100, 100],
    //                 colour: "#FF0000",
    //             },
    //         },
    //         {
    //             id: nanoid(),
    //             metadata: {
    //                 type: "volcano",
    //             },
    //             styles: {
    //                 position: [500, 100],
    //                 dimensions: [200, 200],
    //                 colour: "#FFFF00",
    //             },
    //         },
    //     ],
    //     embeds: [
    //         {
    //             id: nanoid(),
    //             metadata: {
    //                 type: "spotify",
    //             },

    //             styles: {
    //                 position: [500, 400],
    //                 dimensions: [200, 100],
    //                 colour: null,
    //             },
    //         },
    //     ],
    // };

    // const createNewDesign = async () => {
    //     await addDoc(collection(db, "projects"), emptyProject)
    //     console.log("Project created");
    // }

    // const projectsRef = collection(db, "projects");
    // const q = query(projectsRef, where("creator", "==", user.email));
    // const [projects, loading] = useCollectionData(q, { idField: "id" });

    // if (loading) {
    //     return <h1>Loading projects</h1>
    // } else {
    //     return (
    //         <section className="dashboard">
    //             <h1>This is a dashboard</h1>
    //             <button onClick={createNewDesign}>New +</button>
    //             {projects && projects.map(project => (
    //                 <ProjectPreview key={project.id} id={project.id} />
    //             ))}
    //         </section>
    //     );
    // }
    return null
}

const ProjectPreview = ({ id }: any) => {
    return <Link to={id}>Project: {id}</Link>
}

export default Dashboard
