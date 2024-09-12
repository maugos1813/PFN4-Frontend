import React from 'react';
import { Route, Switch, Redirect } from 'wouter';
import { useLogin } from './contexts/LoginContext';
import { Login } from './components/Login';
import { Nav } from './components/Nav';
import Home from './components/Home';
import { Crear } from './components/Crear';
import { VerIncidencias } from './components/VerIncidencias';
import Terminado from './components/Terminado';

function App() {
  const { user, loading } = useLogin();

  if (loading) {
    return <div>Cargando...</div>;
  }

  
  const renderNav = () => {
    if (user?.tipoUsuario === 'administrador') {
      return <Nav admin />;
    } else {
      return <Nav />;
    }
  };

  return (
    <>
      <Switch>
        <Route path="/login" component={Login} />
        {user ? (
          <>
            {renderNav()}
            <Route path="/home" component={Home} />
            <Route path="/crear" component={Crear} />
            <Route path="/verincidencias" component={VerIncidencias} />
            {user.tipoUsuario === 'administrador' && (
              <Route path="/terminado" component={Terminado} />
            )}
            <Redirect to="/home" />
          </>
        ) : (
          <Redirect to="/login" />
        )}
      </Switch>
    </>
  );
}

export default App;
