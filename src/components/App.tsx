'use client';

import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import Login from './Login';
import UploadFile from './UploadFile';
import FileList from './FileList';
import UserList from './UserList';
import AddUser from './AddUser';
import HomePage from './HomePage';
import Navbar from './NavBar';
import ContactUs from './ContactUs';
import Footer from './Footer';
import { DecodedToken } from '../types';

const App: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string>('Guest');
  const [fileListUpdate, setFileListUpdate] = useState<boolean>(false);
  // Get current page from URL
  const getCurrentPage = () => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      return path === '/' ? 'home' : path.substring(1);
    }
    return 'home';
  };

  const [currentPage, setCurrentPage] = useState<string>(getCurrentPage());
  // Removed loading state for instant navigation

  // Listen for browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      const page = path === '/' ? 'home' : path.substring(1);
      setCurrentPage(page);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      try {
        const decodedToken = jwtDecode<DecodedToken>(storedToken);
        setToken(storedToken);
        setUserRole(decodedToken.role);
      } catch (error) {
        // Invalid token, clear it
        localStorage.removeItem('authToken');
        localStorage.removeItem('userRole');
      }
    }
  }, []);

  const handleLogin = (newToken: string) => {
    try {
      const decodedToken = jwtDecode<DecodedToken>(newToken);
      setToken(newToken);
      setUserRole(decodedToken.role);
      localStorage.setItem('authToken', newToken);
      localStorage.setItem('userRole', decodedToken.role);
      setCurrentPage('home');
    } catch (error) {
      console.error('Invalid token:', error);
    }
  };

  const handleSignOut = () => {
    setToken(null);
    setUserRole('Guest');
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    setCurrentPage('home');
  };

  const handleFileUpload = () => {
    setFileListUpdate(!fileListUpdate);
  };

  const handleNavigation = (page: string) => {
    setCurrentPage(page);
    // Update URL without page reload
    const url = page === 'home' ? '/' : `/${page}`;
    window.history.pushState({}, '', url);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'contact':
        return <ContactUs />;
      case 'login':
        if (!token) {
          return <Login onLogin={handleLogin} />;
        }
        return <HomePage />;
      case 'upload':
        if (token) {
          return <UploadFile token={token} role={userRole} onFileUpload={handleFileUpload} />;
        }
        return <Login onLogin={handleLogin} />;
      case 'owners-area':
        if (token) {
          return <FileList userRole={userRole} />;
        }
        return <Login onLogin={handleLogin} />;
      case 'resident-directory':
        if (token) {
          return <UserList token={token} role={userRole} />;
        }
        return <Login onLogin={handleLogin} />;
      case 'add-user':
        if (token) {
          return <AddUser token={token} role={userRole} onLogout={handleSignOut} />;
        }
        return <Login onLogin={handleLogin} />;
      default:
        return <HomePage />;
    }
  };

  // Remove the conditional rendering that causes flash

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar userRole={userRole} onSignOut={handleSignOut} onNavigate={handleNavigation} />
      <div className="flex-grow bg-gray-50">
        {renderCurrentPage()}
      </div>
      <Footer />
    </div>
  );
};

export default App;
