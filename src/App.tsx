import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { isExtension } from './helpers/helperfunctions';
import Index from './pages';
import Dashboard from './pages/dashboard';

function App() {

  return (
    <>
      {isExtension() ? <Index /> : <Webpage />}
    </>
  );
}

function Webpage() {
  return (
    <Routes>
      <Route path="/" element={<Index />}></Route>
      <Route path="/dashboard" element={<Dashboard />}></Route>
    </Routes>
  )
}

export default App;
