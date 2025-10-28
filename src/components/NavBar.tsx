import React, { useState, useEffect, useRef } from 'react';
import { NavbarProps } from '../types';

const Navbar: React.FC<NavbarProps> = ({ userRole, currentPage, onSignOut, onNavigate }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSignOut = () => {
    onSignOut();
  };

  const handleNavigation = (page: string) => {
    onNavigate(page);
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <nav className="bg-white/90 backdrop-blur sticky top-0 z-40 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={isOpen ? "true" : "false"}
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0">
              <button onClick={() => handleNavigation('home')} className="text-gray-900 text-xl sm:text-2xl font-extrabold tracking-tight">Pelican Point East</button>
            </div>
            <div className="hidden sm:block sm:ml-auto">
              <div className="flex items-center gap-1">
                <button onClick={() => handleNavigation('home')} className={`px-3 py-2 rounded-md text-sm font-medium ${currentPage==='home' ? 'text-gray-900 bg-gray-100' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'}`}>Home</button>
                {userRole !== 'Guest' && (
                  <button onClick={() => handleNavigation('owners-area')} className={`px-3 py-2 rounded-md text-sm font-medium ${currentPage==='owners-area' ? 'text-gray-900 bg-gray-100' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'}`}>Owners' Area</button>
                )}
                {userRole === 'manager' && (
                  <>
                    <button onClick={() => handleNavigation('upload')} className={`px-3 py-2 rounded-md text-sm font-medium ${currentPage==='upload' ? 'text-gray-900 bg-gray-100' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'}`}>Upload File</button>
                    <button onClick={() => handleNavigation('resident-directory')} className={`px-3 py-2 rounded-md text-sm font-medium ${currentPage==='resident-directory' ? 'text-gray-900 bg-gray-100' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'}`}>User List</button>
                    <button onClick={() => handleNavigation('add-user')} className={`px-3 py-2 rounded-md text-sm font-medium ${currentPage==='add-user' ? 'text-gray-900 bg-gray-100' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'}`}>Add User</button>
                  </>
                )}
                <button onClick={() => handleNavigation('contact')} className={`px-3 py-2 rounded-md text-sm font-medium ${currentPage==='contact' ? 'text-gray-900 bg-gray-100' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'}`}>Contact Us</button>
                {userRole === 'Guest' ? (
                  <button onClick={() => handleNavigation('login')} className="ml-2 inline-flex items-center px-3 py-2 rounded-md text-sm font-semibold text-white bg-gray-900 hover:bg-black">Login</button>
                ) : (
                  <button
                    onClick={handleSignOut}
                    className="ml-2 inline-flex items-center px-3 py-2 rounded-md text-sm font-semibold text-white bg-gray-900 hover:bg-black"
                  >
                    Sign Out
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`sm:hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-screen' : 'max-h-0 overflow-hidden'}`}
        id="mobile-menu"
        ref={mobileMenuRef}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white/90 backdrop-blur border-t border-gray-200">
          <button onClick={() => handleNavigation('home')} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100">Home</button>
          {userRole !== 'Guest' && (
            <button onClick={() => handleNavigation('owners-area')} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100">Owners' Area</button>
          )}
          {userRole === 'manager' && (
            <>
              <button onClick={() => handleNavigation('upload')} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100">Upload File</button>
              <button onClick={() => handleNavigation('resident-directory')} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100">User List</button>
              <button onClick={() => handleNavigation('add-user')} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100">Add User</button>
            </>
          )}
          <button onClick={() => handleNavigation('contact')} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100">Contact Us</button>
          {userRole === 'Guest' ? (
            <button onClick={() => handleNavigation('login')} className="block w-full text-left px-3 py-2 rounded-md text-base font-semibold text-white bg-gray-900 hover:bg-black">Login</button>
          ) : (
            <button
              onClick={handleSignOut}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-semibold text-white bg-gray-900 hover:bg-black"
            >
              Sign Out
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
