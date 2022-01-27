import { doc } from 'firebase/firestore';
import React from 'react';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { db } from '../config/firebase';
import { useInteract } from '../hooks/interact';
import { EmbedsInfo, SoundsInfo } from '../types/canvascomponents';
import Naturesounds from './canvaselements/naturesounds';
import Spotify from './canvaselements/spotify';
import Loading from './loading';

type Props = {
    projectId: string;
    editable: boolean;
}

const Canvas: React.FC<Props> = ({ projectId, editable }) => {

    useInteract(editable);
    const [projectData, loadingProject] = useDocumentData<any>(doc(db, "projects", projectId));

    //takes the new project data and saves it into firestore
    //const [modifiedProject, setModifiedProject]

    if (loadingProject) {
        return (
            <Loading>
                <h1>Loading project data</h1>
            </Loading>
        )
    } else {
        return (
            <section className={`canvas ${editable && "editable"}`}>
                {projectData.sounds.map((sound: SoundsInfo) => (
                    <Naturesounds key={sound.id} {...sound} />
                ))}
                {projectData.embeds.map((embed: EmbedsInfo) => (
                    <Spotify key={embed.id} {...embed} />
                ))}
            </section>
        );
    }
};

export default Canvas;
