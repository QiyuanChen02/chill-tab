import { getAuth, onAuthStateChanged, User } from 'firebase/auth'
import { useEffect } from 'react'
import { setUid, setUserLoading } from '../redux/userData/userData'
import { useAppDispatch } from './reduxHooks'

export const useAuthUser = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(setUserLoading())
        const auth = getAuth()
        const unsubscribe = onAuthStateChanged(
            auth,
            async (user: User | null) => {
                if (user) {
                    dispatch(setUid(user.uid))
                } else {
                    dispatch(setUid(null))
                }
            }
        )
        return () => unsubscribe()
    }, [dispatch])
}
