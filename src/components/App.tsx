'use client';

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
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
  const pathname = usePathname();
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string>('Guest');
  const [fileListUpdate, setFileListUpdate] = useState<boolean>(false);
  
  // Get current page from pathname (SSR-safe)
  const getCurrentPage = (path: string | null) => {
    const p = path || '/';
    return p === '/' ? 'home' : p.substring(1);
  };
  
  const [currentPage, setCurrentPage] = useState<string>(() => getCurrentPage(pathname));

  // Update page when pathname changes (e.g., browser back/forward)
  useEffect(() => {
    const page = getCurrentPage(pathname);
    setCurrentPage(page);
  }, [pathname]);

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
    // Update URL using Next.js router
    const url = page === 'home' ? '/' : `/${page}`;
    router.push(url);
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
      <Navbar 
        userRole={userRole} 
        currentPage={currentPage} 
        onSignOut={handleSignOut} 
        onNavigate={handleNavigation} 
      />
      <div className="flex-grow bg-gray-50">
        {renderCurrentPage()}
      </div>
      <Footer />
    </div>
  );
};

export default App;
