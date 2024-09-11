import React, { useState } from 'react';
import { useLogin } from '../contexts/LoginContext';
import gray from '/gray.jpeg';

export const Login = () => {
  const { login, error } = useLogin();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    login({ email, contraseña: password }); 
  };

  return (
    <div
      className="bg-repeat-y bg-center min-h-screen flex justify-center items-center bg-black"
      style={{ backgroundImage: `url(${gray})`, backgroundSize: 'cover' }}
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
            type="password"
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
