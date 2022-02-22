import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { isExtension } from './helpers/helperfunctions'
import Index from './pages/index'
import Dashboard from './pages/dashboard'
import Edit from './pages/edit'

function App() {
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
