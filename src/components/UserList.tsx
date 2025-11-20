import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { UserListProps, User } from '../types';
import { db } from '../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

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
        
        // Fetch inResidence status and lastChanged from Firestore for each user
        const usersWithStatus = await Promise.all(
          response.data.map(async (user) => {
            try {
              const userDocRef = doc(db, 'users', user.username);
              const userDoc = await getDoc(userDocRef);
              if (userDoc.exists()) {
                const data = userDoc.data();
                let lastChanged: Date | undefined;
                if (data.lastChanged) {
                  // Handle Firestore Timestamp
                  if (data.lastChanged.toDate) {
                    lastChanged = data.lastChanged.toDate();
                  } else if (data.lastChanged.seconds) {
                    lastChanged = new Date(data.lastChanged.seconds * 1000);
                  } else if (data.lastChanged instanceof Date) {
                    lastChanged = data.lastChanged;
                  }
                }
                return { 
                  ...user, 
                  inResidence: data.inResidence ?? false,
                  lastChanged: lastChanged
                };
              }
              return { ...user, inResidence: false };
            } catch (error) {
              console.error(`Error fetching status for ${user.username}:`, error);
              return { ...user, inResidence: false };
            }
          })
        );
        
        setUsers(usersWithStatus);
        setLoading(false);
      } catch (error: any) {
        setError(error.response ? error.response.data.message : error.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, [token]);

  // Format timestamp for display
  const formatTimestamp = (timestamp: Date | { seconds: number; nanoseconds: number } | string): string => {
    let date: Date;
    
    if (timestamp instanceof Date) {
      date = timestamp;
    } else if (typeof timestamp === 'string') {
      date = new Date(timestamp);
    } else if (timestamp && typeof timestamp === 'object' && 'seconds' in timestamp) {
      date = new Date(timestamp.seconds * 1000);
    } else {
      return 'Unknown';
    }
    
    // Format as "MM/DD/YYYY, HH:MM AM/PM"
    return date.toLocaleString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

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
                <div className="min-w-0 flex-1">
                  <div className="font-medium text-gray-900 truncate">{user.username}</div>
                  <div className="text-xs text-gray-500">Role: {user.role}</div>
                  <div className="mt-1 flex flex-wrap items-center gap-2">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${
                      user.inResidence 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      <span className={`w-2 h-2 rounded-full ${
                        user.inResidence ? 'bg-green-600' : 'bg-red-600'
                      }`}></span>
                      {user.inResidence ? 'In Residence' : 'Away'}
                    </span>
                    {user.lastChanged && (
                      <span className="text-xs text-gray-500">
                        Last updated: {formatTimestamp(user.lastChanged)}
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteUser(user.username)}
                  className="inline-flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white py-1.5 px-3 rounded cursor-pointer"
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
