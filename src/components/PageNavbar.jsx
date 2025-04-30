import React, { useEffect, useState } from "react";
import { FiMenu, FiX, FiSun, FiMoon } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa"; // Profile Icon
import logo from "../assets/logo.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // Theme preference
    if (localStorage.theme === "dark" || 
        (!localStorage.theme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    }

    // Login Status
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);

      // If you want to display user name, get from localStorage too
      const userData = JSON.parse(localStorage.getItem("user"));
      if (userData) {
        setUserName(userData.firstName || "Profile");
      }
    } else {
      setIsLoggedIn(false);
      setUserName("");
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
      setIsDark(true);
    }
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setShowProfileMenu(false);
    window.location.href = "/login";
  };

  const toggleProfileMenu = () => setShowProfileMenu(!showProfileMenu);

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-white dark:bg-gray-900 shadow-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 relative">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-2">
            <img src={logo} alt="Logo" className="h-10 w-10 object-contain" />
            <span className="text-xl font-bold text-orange-500 dark:text-orange-400">EngraveMaster</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="/" className="text-gray-800 dark:text-gray-200 hover:text-orange-500 font-medium transition-colors">Home</a>
            <a href="/about" className="text-gray-800 dark:text-gray-200 hover:text-orange-500 font-medium transition-colors">About</a>
            <a href="/services" className="text-gray-800 dark:text-gray-200 hover:text-orange-500 font-medium transition-colors">Services</a>
            <a href="/contact" className="text-gray-800 dark:text-gray-200 hover:text-orange-500 font-medium transition-colors">Contact</a>

            {/* Profile or Login/Signup */}
            <div className="relative">
              <button
                onClick={toggleProfileMenu}
                className="text-gray-800 dark:text-gray-200 hover:text-orange-500 text-2xl"
              >
                <FaUserCircle />
              </button>

              {/* Profile Dropdown */}
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-2 z-50">
                  {isLoggedIn ? (
                    <>
                      <div className="block px-4 py-2 text-gray-700 dark:text-gray-200 font-semibold">
                        {userName}
                      </div>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <a
                        href="/login"
                        className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        Login
                      </a>
                      <a
                        href="/signup"
                        className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        Signup
                      </a>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="ml-4 text-gray-700 dark:text-yellow-300 hover:text-orange-500 transition-colors"
              aria-label="Toggle Theme"
            >
              {isDark ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleTheme}
              className="mr-3 text-gray-800 dark:text-yellow-300"
              aria-label="Toggle Theme"
            >
              {isDark ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>
            <button
              onClick={toggleMenu}
              className="text-gray-800 dark:text-gray-200 hover:text-orange-500"
              aria-label="Toggle Menu"
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 pt-2 shadow-md bg-gray-100 dark:bg-gray-800 transition-colors">
          <a href="/" className="block py-2 text-gray-800 dark:text-gray-200 hover:text-orange-500 transition-colors">Home</a>
          <a href="/about" className="block py-2 text-gray-800 dark:text-gray-200 hover:text-orange-500 transition-colors">About</a>
          <a href="/services" className="block py-2 text-gray-800 dark:text-gray-200 hover:text-orange-500 transition-colors">Services</a>
          <a href="/contact" className="block py-2 text-gray-800 dark:text-gray-200 hover:text-orange-500 transition-colors">Contact</a>
          <a href="/login" className="block py-2 text-gray-800 dark:text-gray-200 hover:text-orange-500 transition-colors">Login</a>
          <a href="/signup" className="block py-2 text-gray-800 dark:text-gray-200 hover:text-orange-500 transition-colors">Signup</a>
        </div>
      )}
    </nav>
  );
}
