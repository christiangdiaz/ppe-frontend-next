import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { UserListProps, User } from '../types';

const UserList: React.FC<UserListProps> = ({ token, role }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get<User[]>('https://lit-sea-66725-e16b11feba54.herokuapp.com/users', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUsers(response.data);
        setLoading(false);
      } catch (error: any) {
        setError(error.response ? error.response.data.message : error.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, [token]);

  const handleDeleteUser = async (username: string) => {
    try {
      await axios.delete(`https://lit-sea-66725-e16b11feba54.herokuapp.com/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(users.filter(user => user.username !== username));
    } catch (error: any) {
      setError(error.response ? error.response.data.message : error.message);
    }
  };

  if (role !== 'manager') {
    return <div className="flex items-center justify-center min-h-[60vh] bg-gray-50"><div className="rounded-md bg-red-50 text-red-700 px-4 py-3">Access denied: Managers only</div></div>;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-200 border-t-blue-600 mx-auto mb-3"></div>
          <p className="text-gray-600 text-sm">Loading users…</p>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="flex items-center justify-center min-h-[60vh] bg-gray-50"><div className="rounded-md bg-red-50 text-red-700 px-4 py-3">Error: {error}</div></div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-4 md:p-6">
        <div className="mb-4">
          <h2 className="text-left text-gray-900 text-2xl md:text-3xl font-extrabold tracking-tight">Resident Directory</h2>
          <p className="text-gray-600 text-sm">Manage resident accounts.</p>
        </div>

        <div className="rounded-xl bg-white ring-1 ring-gray-200 p-4 md:p-6">
          <ul className="divide-y divide-gray-200">
            {users.map(user => (
              <li key={user.username} className="py-3 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="font-medium text-gray-900 truncate">{user.username}</div>
                  <div className="text-xs text-gray-500">Role: {user.role}</div>
                </div>
                <button
                  onClick={() => handleDeleteUser(user.username)}
                  className="inline-flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white py-1.5 px-3 rounded"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18"/><path d="M8 6v14"/><path d="M16 6v14"/><path d="M5 6l1-3h12l1 3"/></svg>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserList;
