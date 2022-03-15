import { doc, onSnapshot } from 'firebase/firestore'
import { useEffect } from 'react'
import { db } from '../../config/firebase'
import { setProjectData, setProjectLoading } from '../../redux/projectData/projectData'
import { ProjectData } from '../../redux/projectData/projectTypes'

import { useAppDispatch, useAppSelector } from '../reduxHooks'

export const useProjectDataChange = () => {
    const projectId = useAppSelector((state) => state.projectData.projectId)
    const dispatch = useAppDispatch()

    // Set state of project in redux to the data of the project in the database when database changes
    useEffect(() => {
        if (projectId) {
            dispatch(setProjectLoading(true))
            const docRef = doc(db, 'projects', projectId)
            const unsubscribe = onSnapshot(docRef, (doc) => {
                const data = doc.data() as Partial<ProjectData>
                dispatch(setProjectData(data))
                dispatch(setProjectLoading(false))
                console.log('project reads +1')
            })
            return () => unsubscribe()
        } else {
            dispatch(setProjectData(null))
        }
    }, [dispatch, projectId])
}
