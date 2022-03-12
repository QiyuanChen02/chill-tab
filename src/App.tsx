import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { isExtension } from './helpers/helperfunctions'
import Index from './pages/index'
import Dashboard from './pages/dashboard'
import Edit from './pages/edit'
import { getAuth, onAuthStateChanged, User } from 'firebase/auth'
import { useAppDispatch } from './hooks/reduxHooks'
import { fetchUserData, setUid } from './redux/userData'

function App() {

    const dispatch = useAppDispatch()

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, async (user: User | null) => {
            console.log(user)
            if (user) {
                dispatch(setUid(user.uid));
                dispatch(fetchUserData(user.uid));
            } else {
                dispatch(setUid(null));
            }
        });
        return () => unsubscribe()
    }, [dispatch])

    return isExtension() ? <Index /> : <Webpage />
}

function Webpage() {
    return (
        <Routes>
            <Route path="/" element={<Index />} />
            <Route path="dashboard">
                <Route index element={<Dashboard />} />
                <Route path=":projectId" element={<Edit />} />
            </Route>
            <Route path="*" element={<h1>404 not found</h1>} />
        </Routes>
    )
}

export default App
