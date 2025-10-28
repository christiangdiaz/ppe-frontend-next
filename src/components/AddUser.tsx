import React, { useState } from 'react';
import axios from 'axios';
import { AddUserProps } from '../types';

const AddUser: React.FC<AddUserProps> = ({ token, role, onAdd, onLogout }) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [roleInput, setRoleInput] = useState<'user' | 'manager'>('user');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      const response = await axios.post('https://lit-sea-66725-e16b11feba54.herokuapp.com/users', {
        username,
        password,
        role: roleInput
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.status === 201) {
        setUsername('');
        setPassword('');
        setRoleInput('user');
        setSuccess(true);
        onAdd?.();
      }
    } catch (error: any) {
      const errorMessage = error.response ? error.response.data.message : error.message;
      if (errorMessage === 'Failed to authenticate token') {
        if (window.confirm('Your session has expired. Please log in again.')) {
          onLogout();
        }
      } else if (errorMessage === 'Error creating user') {
        setError(null);
      } else if (errorMessage === 'onAdd is not a function') {
        setError(null);
      } else if (errorMessage === 'r is not a function') {
        setError(null);
      } else {
        setError(errorMessage);
      }
    }
  };

  if (role !== 'manager') {
    return <div className="text-red-500 text-center mt-4">Access denied: Managers only</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-4 md:p-8"> 
        <div className="mb-6">
          <h2 className="text-left text-gray-900 text-3xl md:text-4xl font-extrabold tracking-tight">Add User</h2>
          <p className="text-gray-600 text-sm">Create a resident or manager account.</p>
        </div>

        <div className="rounded-2xl bg-white ring-1 ring-gray-200 p-6 md:p-8 max-w-xl mx-auto">
          <form onSubmit={handleAddUser} className="space-y-5">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-800" htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-800" htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-800" htmlFor="role">Role</label>
              <select
                id="role"
                value={roleInput}
                onChange={(e) => setRoleInput(e.target.value as 'user' | 'manager')}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              >
                <option value="user">User</option>
                <option value="manager">Manager</option>
              </select>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="submit"
                className="inline-flex items-center gap-2 bg-gray-900 hover:bg-black text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14"/><path d="M5 12h14"/></svg>
                Add User
              </button>
              {success && <span className='text-green-600 text-sm'>User successfully created.</span>}
              {error && <span className="text-red-600 text-sm">{`Error: ${error}`}</span>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
