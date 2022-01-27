import React from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import './styles/main.css';
import { isExtension } from './helpers/helperfunctions';
import Index from './pages/index';
import Dashboard from './pages/dashboard';
import Edit from './pages/edit'
import { Children } from './types/commontypes';
import { GetUserContext } from './auth/authcontext';

function App() {
  return isExtension() ? <Index /> : <Webpage />
}

function Webpage() {

  const [user] = GetUserContext();
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="dashboard" element={
        <PrivateRoute>
          <Outlet />
        </PrivateRoute>
      }>
        <Route index element={user ? <Dashboard user={user}/> : null} />
        <Route path=":projectId" element={user ? <Edit /> : null} />
      </Route>
      <Route path="*" element={<h1>404 not found</h1>} />
    </Routes>
  )
}

const PrivateRoute: React.FC<Children> = ({ children }) => {
  const [user, loading] = GetUserContext();
  return !loading && !user ? <Navigate to="/" /> : <> {children} </>;
}

export default App;