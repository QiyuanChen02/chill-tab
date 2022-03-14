import { doc, onSnapshot } from 'firebase/firestore'
import { useEffect } from 'react'
import { db } from '../config/firebase'
import { setUserData, setUserDataLoading } from '../redux/userData/userData'
import { UserData } from '../redux/userData/userTypes'
import { useAppDispatch, useAppSelector } from './reduxHooks'

export const useUserDataChange = () => {
    const userData = useAppSelector((state) => state.userData)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!userData.loadingUser) {
            dispatch(setUserDataLoading())
            if (userData.uid) {
                const docRef = doc(db, 'users', userData.uid)
                const unsubscribe = onSnapshot(docRef, (doc) => {
                    const data = doc.data() as Partial<UserData>
                    dispatch(setUserData(data))
                })
                return () => unsubscribe()
            } else {
                dispatch(setUserData(null))
            }
        }
    }, [dispatch, userData.uid, userData.loadingUser])
}
