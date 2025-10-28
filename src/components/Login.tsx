import React, { useState } from 'react';
import axios from 'axios';
// Removed unused imports
// Using simple SVG icons instead of react-icons-kit
import { LoginProps, LoginResponse } from '../types';

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [type, setType] = useState<'password' | 'text'>('password');
  const [error, setError] = useState<string | null>(null);
  
  const handleToggle = () => {
    if (type === 'password') {
      setType('text');
    } else {
      setType('password');
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post<LoginResponse>('https://lit-sea-66725-e16b11feba54.herokuapp.com/login', {
        username,
        password
      });

      if (response.status === 200) {
        onLogin(response.data.token);

        const userDoc = doc(db, 'users', username);
        await updateDoc(userDoc, {
          lastLogin: new Date()
        });

        router.push('/');
      }
    } catch (error: any) {
      setError(error.response ? error.response.data.message : error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 relative">
      <img src="/PPE.jpg" alt="Background" className="absolute inset-0 w-full h-full object-cover z-0 opacity-50" />
      <div className="bg-white p-8 rounded-lg shadow-lg z-10 max-w-md w-full">
        <h1 className="text-3xl font-bold mb-6 text-center" style={{ color: '#000000' }}>
          Welcome
        </h1>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block mb-2 font-medium" htmlFor="username" style={{ color: '#000000' }}>Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-3 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200 ease-in-out placeholder:text-black"
            />
          </div>
          <div className="relative">
            <label className="block mb-2 font-semibold" htmlFor="password" style={{ color: '#000000' }}>Password:</label>
            <input
              type={type}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full text-black px-4 py-3 pr-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200 ease-in-out"
            />
            <span 
              className="absolute right-3 bottom-1 transform -translate-y-2/4 cursor-pointer flex items-center"
              onClick={handleToggle}
            >
              {type === 'password' ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                </svg>
              )}
            </span>
          </div>
          <button
            type="submit"
            className="w-full bg-gray-800 text-white py-3 rounded-md hover:bg-gray-900 transition-colors duration-200 font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Login
          </button>
        </form>
        {error && <p className="mt-4 text-center text-red-500">{`Error: ${error}`}</p>}
      </div>
    </div>
  );
};

export default Login;