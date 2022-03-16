import { doc, onSnapshot } from 'firebase/firestore'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../../firebase'
import { setProjectId } from '../../redux/projectData/projectData'
import { setUserData, setUserDataLoading } from '../../redux/userData/userData'
import { UserData } from '../../redux/userData/userTypes'
import { useAppDispatch, useAppSelector } from '../reduxHooks'

export const useSetProjectId = () => {
    const loadingUser = useAppSelector((state) => state.userData.loadingUser)
    const uid = useAppSelector((state) => state.userData.uid)
    const loadingUserData = useAppSelector((state) => state.userData.loadingUserData)
    const selectedProject = useAppSelector((state) => state.userData.data.selectedProject)
    const dispatch = useAppDispatch()

    const { projectId } = useParams()
    useEffect(() => {
        if (!loadingUser && !loadingUserData && uid) {
            const requiredProject = projectId || selectedProject
            dispatch(setProjectId(requiredProject))
        }
    }, [dispatch, loadingUser, loadingUserData, uid, selectedProject, projectId])
}
