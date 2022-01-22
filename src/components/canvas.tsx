import { doc } from 'firebase/firestore';
import React from 'react';
import { useDocumentDataOnce } from 'react-firebase-hooks/firestore';
import { useParams } from 'react-router-dom';
import { db } from '../config/firebase';
import { useInteract } from '../hooks/interact';
import { EmbedsInfo, SoundsInfo } from '../types/canvascomponents';
import Naturesounds from './naturesounds';
import Spotify from './spotify';


type Props = {
    editable: boolean;
}

const Canvas: React.FC<Props> = ({ editable }) => {

    useInteract();

    //Get data
    const params = useParams();
    const projectRef = doc(db, "projects", params.projectId || "0JZCMQSuG6me4rpF8ABU");
    const [canvasInfo, loading] = useDocumentDataOnce(projectRef);

    if (loading) {
        return <h1>Loading...</h1>
    }
    else if (!canvasInfo) {
        return <h1>No data...</h1>
    } else {
        return (
            <section className="canvas" style={{ width: "500px", height: "500px" }}>
                {canvasInfo.sounds.map((sound: SoundsInfo) => (
                    <Naturesounds key={sound.id} editable={editable} {...sound} />
                ))}
                {canvasInfo.embeds.map((embed: EmbedsInfo) => (
                    <Spotify key={embed.id} editable={editable} {...embed} />
                ))}
            </section>
        );
    }
};

export default Canvas;
