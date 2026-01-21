import React, { useState, useEffect, useRef } from 'react';
import { NavbarProps } from '../types';
import { db } from '../lib/firebase';
import { doc, setDoc, onSnapshot, serverTimestamp } from 'firebase/firestore';

const Navbar: React.FC<NavbarProps> = ({ userRole, username, currentPage, onSignOut, onNavigate }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [residentInResidence, setResidentInResidence] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!username || userRole === 'Guest') {
      setLoading(false);
      return;
    }

    const userDocRef = doc(db, 'users', username);
    
    const unsubscribe = onSnapshot(userDocRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        setResidentInResidence(data.inResidence ?? false);
      } else {
        setDoc(userDocRef, { inResidence: false }, { merge: true });
        setResidentInResidence(false);
      }
      setLoading(false);
    }, (error) => {
      console.error('Error loading inResidence status:', error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [username, userRole]);

  const handleResidentInResidenceChange = async (checked: boolean) => {
    if (!username || userRole === 'Guest') return;
    
    setResidentInResidence(checked);
    
    try {
      const userDocRef = doc(db, 'users', username);
      await setDoc(userDocRef, { 
        inResidence: checked,
        lastChanged: serverTimestamp()
      }, { merge: true });
    } catch (error) {
      console.error('Error saving inResidence status:', error);
      setResidentInResidence(!checked);
    }
  };

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
              <button onClick={() => handleNavigation('home')} className="text-gray-900 text-xl sm:text-2xl font-extrabold tracking-tight cursor-pointer">Pelican Point East</button>
            </div>
            <div className="hidden sm:block sm:ml-auto">
              <div className="flex items-center gap-1">
                {userRole !== 'Guest' && !loading && (
                  <label className={`flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer transition-colors ${
                    residentInResidence 
                      ? 'bg-green-50 hover:bg-green-100' 
                      : 'bg-red-50 hover:bg-red-100'
                  }`} title="Toggle to indicate if you are currently in residence">
                    <input
                      type="checkbox"
                      checked={residentInResidence}
                      onChange={(e) => handleResidentInResidenceChange(e.target.checked)}
                      className={`w-4 h-4 rounded border-2 focus:ring-2 focus:ring-offset-2 cursor-pointer ${
                        residentInResidence
                          ? 'accent-green-600 border-green-400 focus:ring-green-500'
                          : 'accent-red-600 border-red-400 focus:ring-red-500'
                      }`}
                    />
                    <span className={`text-sm font-medium ${
                      residentInResidence ? 'text-green-700' : 'text-red-700'
                    }`}>
                      {residentInResidence ? 'In Residence' : 'Away'}
                    </span>
                  </label>
                )}
                <button onClick={() => handleNavigation('home')} className={`px-3 py-2 rounded-md text-sm font-medium ${currentPage==='home' ? 'text-gray-900 bg-gray-100 cursor-pointer' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'}`}>Home</button>
                {userRole !== 'Guest' && (
                  <button onClick={() => handleNavigation('owners-area')} className={`px-3 py-2 cursor-pointer rounded-md text-sm font-medium ${currentPage==='owners-area' ? 'text-gray-900 bg-gray-100' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'}`}>Owners' Area</button>
                )}
                {userRole === 'manager' && (
                  <>
                    <button onClick={() => handleNavigation('upload')} className={`px-3 py-2 rounded-md text-sm cursor-pointer font-medium ${currentPage==='upload' ? 'text-gray-900 bg-gray-100' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'}`}>Upload File</button>
                    <button onClick={() => handleNavigation('resident-directory')} className={`px-3 py-2 rounded-md text-sm cursor-pointer font-medium ${currentPage==='resident-directory' ? 'text-gray-900 bg-gray-100' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'}`}>User List</button>
                    <button onClick={() => handleNavigation('add-user')} className={`px-3 py-2 rounded-md text-sm cursor-pointer font-medium ${currentPage==='add-user' ? 'text-gray-900 bg-gray-100' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'}`}>Add User</button>
                  </>
                )}
                <button onClick={() => handleNavigation('contact')} className={`px-3 py-2 rounded-md text-sm cursor-pointer font-medium ${currentPage==='contact' ? 'text-gray-900 bg-gray-100' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'}`}>Contact Us</button>
                {userRole === 'Guest' ? (
                  <button onClick={() => handleNavigation('login')} className="ml-2 inline-flex items-center px-3 py-2 rounded-md text-sm cursor-pointer font-semibold text-white bg-gray-900 hover:bg-black">Login</button>
                ) : (
                  <button
                    onClick={handleSignOut}
                    className="ml-2 inline-flex items-center px-3 py-2 rounded-md text-sm cursor-pointer font-semibold text-white bg-gray-900 hover:bg-black"
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
          {userRole !== 'Guest' && !loading && (
            <label className={`flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer transition-colors ${
              residentInResidence 
                ? 'bg-green-50 hover:bg-green-100' 
                : 'bg-red-50 hover:bg-red-100'
            }`} title="Toggle to indicate if you are currently in residence">
              <input
                type="checkbox"
                checked={residentInResidence}
                onChange={(e) => handleResidentInResidenceChange(e.target.checked)}
                className={`w-4 h-4 rounded border-2 focus:ring-2 focus:ring-offset-2 cursor-pointer ${
                  residentInResidence
                    ? 'accent-green-600 border-green-400 focus:ring-green-500'
                    : 'accent-red-600 border-red-400 focus:ring-red-500'
                }`}
              />
              <span className={`text-base font-medium ${
                residentInResidence ? 'text-green-700' : 'text-red-700'
              }`}>
                {residentInResidence ? 'In Residence' : 'Away'}
              </span>
            </label>
          )}
          <button onClick={() => handleNavigation('home')} className="block cursor-pointer w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100">Home</button>
          {userRole !== 'Guest' && (
            <button onClick={() => handleNavigation('owners-area')} className="block cursor-pointer w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100">Owners' Area</button>
          )}
          {userRole === 'manager' && (
            <>
              <button onClick={() => handleNavigation('upload')} className="block w-full cursor-pointer text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100">Upload File</button>
              <button onClick={() => handleNavigation('resident-directory')} className="block w-full cursor-pointer text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100">User List</button>
              <button onClick={() => handleNavigation('add-user')} className="block w-full cursor-pointer text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100">Add User</button>
            </>
          )}
          <button onClick={() => handleNavigation('contact')} className="block w-full cursor-pointer text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100">Contact Us</button>
          {userRole === 'Guest' ? (
            <button onClick={() => handleNavigation('login')} className="block w-full text-left px-3 cursor-pointer py-2 rounded-md text-base font-semibold text-white bg-gray-900 hover:bg-black">Login</button>
          ) : (
            <button
              onClick={handleSignOut}
              className="block w-full text-left px-3 cursor-pointer py-2 rounded-md text-base font-semibold text-white bg-gray-900 hover:bg-black"
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
