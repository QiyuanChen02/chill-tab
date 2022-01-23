import React from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import './styles/main.css';
import { isExtension } from './helpers/helperfunctions';
import Index from './pages/index';
import Dashboard from './pages/dashboard';
import Edit from './pages/edit'
import { Children } from './types/commontypes';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './config/firebase';

function App() {
  return isExtension() ? <Index /> : <Webpage />
}

function Webpage() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="dashboard" element={
        <PrivateRoute>
          <Outlet />
        </PrivateRoute>
      }>
        <Route index element={<Dashboard />} />
        <Route path=":projectId" element={<Edit />} />
      </Route>
      <Route path="*" element={<h1>404 not found</h1>} />
    </Routes>
  )
}

const PrivateRoute: React.FC<Children> = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  return !loading && user ? <> {children} </> : <Navigate to="/" />;
}

export default App;