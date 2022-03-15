import { getAuth, onAuthStateChanged, User } from 'firebase/auth'
import { useEffect } from 'react'
import { setUid, setUserLoading } from '../../redux/userData/userData'
import { useAppDispatch } from '../reduxHooks'

export const useAuthUser = () => {
    const dispatch = useAppDispatch()

    // Sets user id if logged in else sets null
    useEffect(() => {
        dispatch(setUserLoading(true))
        const auth = getAuth()
        const unsubscribe = onAuthStateChanged(
            auth,
            (user: User | null) => {
                if (user) {
                    dispatch(setUid(user.uid))
                } else {
                    dispatch(setUid(null))
                }
                dispatch(setUserLoading(false))
            }
        )
        return () => unsubscribe()
    }, [dispatch])
}
