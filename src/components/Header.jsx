import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { switchRole, toggleDarkMode } from '../redux/slices/roleSlice';
import RoleToggle from './RoleToggle';

export default function Header() {
  const role = useSelector(s => s.role.currentRole);
  const currentUser = useSelector(s => s.role.currentUser);
  const darkMode = useSelector(s => s.role.darkMode);
  const dispatch = useDispatch();

  // apply dark mode class on <html>
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <header className="flex items-center justify-between px-6 py-3 border-b 
                       bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
      {/* Left section */}
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-bold text-gray-800 dark:text-gray-200">
          Team Pulse Dashboard
        </h1>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Role: <span className="font-semibold capitalize">{role}</span>
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center space-x-4">
        {/* Role Toggle */}
        <RoleToggle />

        {/* Dark Mode Toggle */}
        <button
          onClick={() => dispatch(toggleDarkMode())}
          className="px-3 py-1 rounded-lg border text-sm
                     bg-gray-200 dark:bg-gray-800
                     text-gray-800 dark:text-gray-200
                     hover:bg-gray-300 dark:hover:bg-gray-700 transition"
        >
          {darkMode ? '🌙 Dark' : '☀️ Light'}
        </button>

        {/* Current User */}
        <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {currentUser?.name || 'Guest'}
        </div>
      </div>
    </header>
  );
}
