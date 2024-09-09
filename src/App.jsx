import React from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Login } from './components/Login';
import { Nav } from './components/Nav';
import { Route } from 'wouter';
import { Home } from './components/Home';
import { Crear } from './components/Crear';
import { Incidencias } from './components/Incidencias';
import { VerIncidencias } from './components/VerIncidencias';

function App() {
  const { isAuthenticated } = useAuth();

  return (
   <>
      {!isAuthenticated ? (
        <Login />
      ) : (
        <>
          <Nav/>
        </>
      )}
    </>
  );
}

export default App;