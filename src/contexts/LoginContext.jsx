import React, { createContext, useState, useEffect } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useLocation } from 'wouter';

import { login as loginService, getMe as getMeService } from '../services/authServices.jsx';

const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [, setLocation] = useLocation(); 

  const mutation = useMutation({
    mutationFn: ({ email, contraseña }) => loginService(email, contraseña),
    onSuccess: (data) => {
      setUser(data);
      localStorage.setItem('token', data.token);
      setLocation('/home'); 
    },
    onError: (error) => {
      setError(error.response?.data?.message || 'Error al iniciar sesión');
    },
  });

  const { isLoading, error: queryError } = useQuery({
    queryKey: ['me'],
    queryFn: getMeService,
    enabled: !!localStorage.getItem('token'),
    onSuccess: (data) => {
      setUser(data);
    },
    onError: () => {
      setUser(null);
      localStorage.removeItem('token');
      setLocation('/login');
    },
  });

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  useEffect(() => {
    if (queryError) {
      console.error('Error en la consulta de usuario:', queryError);
    }
  }, [queryError]);

  return (
    <LoginContext.Provider
      value={{
        user,
        loading,
        error,
        login: mutation.mutate,
        logout: () => {
          localStorage.removeItem('token');
          setUser(null);
          setLocation('/login');
        },
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export const useLogin = () => React.useContext(LoginContext);