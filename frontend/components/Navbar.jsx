import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showWelcome, setShowWelcome] = useState(true);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  useEffect(() => {
    if (user) {
      const timer = setTimeout(() => setShowWelcome(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [user]);

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
  <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center relative">
    <motion.h1
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="text-2xl font-bold text-green-600"
    >
    🥗 Food Advisor
    </motion.h1>
       <div className="space-x-2 sm:space-x-4 text-sm sm:text-base flex flex-wrap justify-end items-center">
          {!user && (
            <>
              <Link to="/" className="text-gray-700 hover:text-green-600 font-medium transition-colors">
                Login
              </Link>
              <Link to="/register" className="text-gray-700 hover:text-green-600 font-medium transition-colors">
                Register
              </Link>
            </>
          )}
          {user && (
            <>
              <span className="text-green-700 font-semibold">👋 {user.username}</span>
              <Link to="/dashboard" className="text-gray-700 hover:text-green-600 font-medium transition-colors">
                Dashboard
              </Link>
              <Link to="/dice" className="text-gray-700 hover:text-green-600 font-medium transition-colors">
                Dice Game
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-100 text-red-700 px-3 py-1 rounded hover:bg-red-200 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
        <AnimatePresence>
          {user && showWelcome && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 text-green-700 italic text-lg font-serif bg-white px-4 py-2 rounded shadow-lg"
            >
              Welcome back, {user.username}!
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
