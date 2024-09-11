import React from 'react';
import { Route, Switch, Redirect } from 'wouter';
import { useLogin } from './contexts/LoginContext';
import { Login } from './components/Login';
import { Nav } from './components/Nav';

function App() {
  const { user, loading } = useLogin();

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <>
      <Switch>
        <Route path="/login" component={Login} />

        {user ? (
          <>
            <Nav />
          </>
        ) : (
          <Redirect to="/login" />
        )}
      </Switch>
    </>
  );
}

export default App;
