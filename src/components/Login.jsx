import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import gray from '/gray.jpeg';

export const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    
    const validEmail = 'mauro@example.com';
    const validPassword = 'mauro123';

    if (email === validEmail && password === validPassword) {
      login();
    } else {
      setError('Credenciales incorrectas. Por favor, intente de nuevo.');
    }
  };

  return (
    <div
      className="bg-cover bg-center h-[100vh] flex justify-center items-center"
      style={{ backgroundImage: `url(${gray})` }}
    >
      <div className="border-[2px] border-green-600 w-[40vw] h-[80vh] rounded-2xl flex flex-col gap-5 bg-black bg-opacity-50">
        <h1 className="text-center text-[50px] text-white mt-[40px]">Login</h1>
        <div className="flex flex-col justify-center items-center gap-8">
          <input
            type="text"
            placeholder="email"
            className="h-[8vh] w-[30vw] px-4 rounded-xl"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="password"
            className="h-[8vh] w-[30vw] px-4 rounded-xl"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-500">{error}</p>}
          <button
            className="bg-green-600 w-[25vw] h-[8vh] rounded-2xl hover:bg-green-500"
            onClick={handleLogin}
          >
            Iniciar Sesión
          </button>
        </div>
      </div>
    </div>
  );
};
