import { doc, onSnapshot } from 'firebase/firestore'
import { useEffect } from 'react'
import { db } from '../../firebase'
import { setUserData, setUserDataLoading } from '../../redux/userData/userData'
import { UserData } from '../../redux/userData/userTypes'
import { useAppDispatch, useAppSelector } from '../reduxHooks'

export const useUserDataChange = () => {
    const uid = useAppSelector((state) => state.userData.uid)
    const loadingUser = useAppSelector((state) => state.userData.loadingUser)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!loadingUser) {
            if (uid) {
                dispatch(setUserDataLoading(true))
                const docRef = doc(db, 'users', uid)
                const unsubscribe = onSnapshot(docRef, (doc) => {
                    const data = doc.data() as Partial<UserData>
                    dispatch(setUserData(data))
                    dispatch(setUserDataLoading(false))
                    console.log("user reads +1")
                })
                return () => unsubscribe()
            } else {
                dispatch(setUserData(null))
            }
        }
    }, [dispatch, uid, loadingUser])
}
