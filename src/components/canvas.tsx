import { doc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { db } from '../config/firebase';
import { EmbedsInfo, SoundsInfo } from '../types/canvascomponents';
import Naturesounds from './canvaselements/naturesounds';
import Spotify from './canvaselements/spotify';
import Loading from './loading';

type Props = {
    projectId: string;
    editable: boolean;
}

const Canvas: React.FC<Props> = ({ projectId, editable }) => {

    const [projectData, loadingProject] = useDocumentData<any>(doc(db, "projects", projectId));
    const [editedSounds, setEditedSounds] = useState([]);

    if (loadingProject) {
        return (
            <h1>Loading project data</h1>
        )
    } else {
        return (
            <section className={`canvas ${editable && "editable"}`}>
                {projectData.sounds.map((sound: SoundsInfo) => (
                    <Naturesounds key={sound.id} {...sound} setEditedSounds={setEditedSounds}/>
                ))}
            </section>
        );
    }
};

export default Canvas;
