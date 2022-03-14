import { doc, onSnapshot } from 'firebase/firestore'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../config/firebase'
import { setProjectId } from '../redux/projectData/projectData'
import { setUserData, setUserDataLoading } from '../redux/userData/userData'
import { UserData } from '../redux/userData/userTypes'
import { useAppDispatch, useAppSelector } from './reduxHooks'

export const useSetProjectId = () => {
    const userData = useAppSelector((state) => state.userData)
    const dispatch = useAppDispatch()

    const { projectId } = useParams()

    useEffect(() => {
        if (!userData.loadingUser && !userData.loadingData) {
            const requiredId = projectId || userData.data.selectedProject
            dispatch(setProjectId(requiredId))
        }
    }, [dispatch, userData.loadingData, userData.loadingUser, userData.data.selectedProject])
}
