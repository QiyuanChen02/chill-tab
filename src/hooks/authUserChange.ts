import { getAuth, onAuthStateChanged, User } from "firebase/auth"
import { useEffect } from "react"
import { fetchUserData, setUid } from "../redux/userData/userData"
import { useAppDispatch } from "./reduxHooks"

export const useAuthUser = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        const auth = getAuth()
        const unsubscribe = onAuthStateChanged(
            auth,
            async (user: User | null) => {
                if (user) {
                    dispatch(setUid(user.uid))
                    dispatch(fetchUserData(user.uid))
                } else {
                    dispatch(setUid(null))
                }
            }
        )
        return () => unsubscribe()
    }, [dispatch])
}