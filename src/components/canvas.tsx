import { doc, setDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import { db } from '../config/firebase'
import { EmbedsInfo, SoundsInfo } from '../types/canvascomponents'
import Naturesounds from './canvaselements/naturesounds'

type Props = {
    projectId: string
    editable: boolean
    canvasOperations?: any
    setCanvasOperations?: any
}

const Canvas: React.FC<Props> = ({
    projectId,
    editable,
    canvasOperations,
    setCanvasOperations,
}) => {
    const projectsRef = doc(db, 'projects', projectId)
    const [projectData, loadingProject] = useDocumentData<any>(projectsRef)
    const [editedSounds, setEditedSounds] = useState<SoundsInfo[]>([])

    const saveProject = (projectData: any, editedSounds: any) => {
        let newProjectData = projectData
        editedSounds.forEach((editedSound: any) => {
            newProjectData.sounds = newProjectData.sounds.map(
                (savedSound: any) =>
                    savedSound.id === editedSound.id ? editedSound : savedSound
            )
        })
        console.log('Project saved! ')
        return newProjectData
    }

    useEffect(() => {
        if (canvasOperations.save && !loadingProject) {
            const saveData = saveProject(projectData, editedSounds)
            setDoc(projectsRef, saveData)
            setCanvasOperations((operations: any) => {
                return { ...operations, save: false }
            })
        }
    }, [
        loadingProject,
        projectData,
        canvasOperations,
        setCanvasOperations,
        editedSounds,
        projectsRef,
    ])

    if (loadingProject) {
        return <h1>Loading project data</h1>
    } else {
        return (
            <section className={`canvas ${editable && 'editable'}`}>
                {projectData.sounds.map((sound: SoundsInfo) => (
                    <Naturesounds
                        key={sound.id}
                        {...sound}
                        setEditedSounds={setEditedSounds}
                    />
                ))}
            </section>
        )
    }
}

export default Canvas
