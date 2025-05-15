import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Music, Menu, X } from 'lucide-react';

interface NavBarProps {
  onHomeClick: () => void;
  onAboutClick: () => void;
  onMenuStateChange?: (isOpen: boolean) => void;
}

const NavBar: React.FC<NavBarProps> = ({ onHomeClick, onAboutClick, onMenuStateChange }) => {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    const newState = !isMenuOpen;
    setIsMenuOpen(newState);
    onMenuStateChange?.(newState);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMenuOpen) {
        setIsMenuOpen(false);
        onMenuStateChange?.(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen, onMenuStateChange]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 shadow-md py-4 transition-colors duration-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div 
            className="flex items-center space-x-2 cursor-pointer group" 
            onClick={onHomeClick}
          >
            <Music className="h-8 w-8 text-blue-600 dark:text-blue-400 transition-colors duration-300" />
            <span className="text-xl font-bold text-blue-700 dark:text-blue-300 group-hover:text-blue-500 dark:group-hover:text-blue-200 transition-colors duration-300">Farsi2English</span>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <button 
              className="relative group px-4 py-2 text-gray-700 dark:text-gray-200 transition-colors duration-300"
              onClick={onAboutClick}
            >
              <span>About</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 dark:bg-blue-400 group-hover:w-full transition-all duration-3000 ease-in-out"></span>
            </button>
            <a 
              href="#contact" 
              className="relative group px-4 py-2 text-gray-700 dark:text-gray-200 transition-colors duration-300"
            >
              <span>Contact</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 dark:bg-blue-400 group-hover:w-full transition-all duration-3000 ease-in-out"></span>
            </a>
            
            <div className="relative w-16 h-8 rounded-full bg-gray-200 dark:bg-gray-700 cursor-pointer transition-colors duration-800"
                 onClick={toggleTheme}>
              <div className={`absolute top-1 w-6 h-6 rounded-full transition-transform duration-800 ${
                theme === 'light' 
                  ? 'left-1 bg-yellow-500 transform translate-x-0' 
                  : 'left-1 bg-blue-600 transform translate-x-8'
              }`}>
                {theme === 'light' ? (
                  <Sun className="h-4 w-4 m-1 text-white" />
                ) : (
                  <Moon className="h-4 w-4 m-1 text-white" />
                )}
              </div>
            </div>
          </div>

          <div className="md:hidden">
            <button 
              className="text-gray-700 dark:text-gray-200 focus:outline-none"
              onClick={toggleMenu}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        <div 
          className={`md:hidden overflow-hidden transition-all duration-800 ease-in-out origin-top-right ${
            isMenuOpen ? 'menu-open' : 'menu-closed'
          }`}
        >
          <div className="mt-4 space-y-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <button 
              className="relative group w-full text-left px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300"
              onClick={() => {
                onAboutClick();
                toggleMenu();
              }}
            >
              <span>About</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 dark:bg-blue-400 group-hover:w-full transition-all duration-3000 ease-in-out"></span>
            </button>
            <a 
              href="#contact"
              className="relative group block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300"
              onClick={() => toggleMenu()}
            >
              <span>Contact</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 dark:bg-blue-400 group-hover:w-full transition-all duration-3000 ease-in-out"></span>
            </a>
            
            <div className="px-4 py-2 flex items-center justify-between border-t border-gray-100 dark:border-gray-700">
              <span className="text-gray-700 dark:text-gray-200">Theme</span>
              <div className="relative w-16 h-8 rounded-full bg-gray-200 dark:bg-gray-700 cursor-pointer transition-colors duration-800"
                   onClick={toggleTheme}>
                <div className={`absolute top-1 w-6 h-6 rounded-full transition-transform duration-800 ${
                  theme === 'light' 
                    ? 'left-1 bg-yellow-500 transform translate-x-0' 
                    : 'left-1 bg-blue-600 transform translate-x-8'
                }`}>
                  {theme === 'light' ? (
                    <Sun className="h-4 w-4 m-1 text-white" />
                  ) : (
                    <Moon className="h-4 w-4 m-1 text-white" />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;