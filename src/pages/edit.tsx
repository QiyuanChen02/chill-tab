import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Canvas from '../components/canvas'

const Edit = () => {
    const params = useParams()
    const [canvasOperations, setCanvasOperations] = useState({
        save: false,
        add: false,
    })

    const save = () => {
        setCanvasOperations((operations) => {
            return {
                ...operations,
                save: true,
            }
        })
    }
    return (
        <div className="index">
            <h1>EDIT PAGE:</h1>
            <button>Add stuff</button>
            <button onClick={() => save()}>Save</button>
            <Link to="../">Back to dashboard</Link>
            <Canvas
                projectId={params.projectId!}
                editable={true}
                canvasOperations={canvasOperations}
                setCanvasOperations={setCanvasOperations}
            />
        </div>
    )
}

export default Edit
