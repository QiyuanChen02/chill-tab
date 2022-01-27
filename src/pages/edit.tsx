import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Canvas from '../components/canvas';

const Edit = () => {

    const params = useParams();
    return (
        <div className="index">
            <h1>EDIT PAGE:</h1>
            <button>Add stuff</button>
            <button>Save</button>
            <Link to="../">Back to dashboard</Link>
            <Canvas projectId={params.projectId!} editable={true} />
        </div>
    )
}

export default Edit;
