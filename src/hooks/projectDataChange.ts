import { doc, onSnapshot } from 'firebase/firestore'
import { useEffect } from 'react'
import { db } from '../config/firebase'
import { getNewProject } from '../helpers/newProject'
import { setProjectData, setProjectLoading } from '../redux/projectData/projectData'
import { ProjectData } from '../redux/projectData/projectTypes'

import { useAppDispatch, useAppSelector } from './reduxHooks'

export const useProjectDataChange = () => {
    const projectId = useAppSelector((state) => state.projectData.projectId)
    const uid = useAppSelector((state) => state.userData.uid)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(setProjectLoading())
        if (uid && projectId) {
            const docRef = doc(db, 'users', projectId)
            const unsubscribe = onSnapshot(docRef, (doc) => {
                const data = doc.data() as ProjectData
                dispatch(setProjectData(data))
            })
            return () => unsubscribe()
        } else {
            dispatch(
                setProjectData(getNewProject().data)
            )
        }
    }, [dispatch, projectId, uid])
}
