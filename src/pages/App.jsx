import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";

function App() {
  const [token, setTokenState] = useState(null);

  // Load token from localStorage on startup
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setTokenState(savedToken);
    }
  }, []);

  // Save token to localStorage
  const setToken = (newToken) => {
    setTokenState(newToken);
    if (newToken) {
      localStorage.setItem("token", newToken);
    } else {
      localStorage.removeItem("token");
    }
  };

  return (
    <Router>
      <nav className="p-4 bg-blue-50 flex justify-center gap-4">
        {!token && (
          <>
            <Link to="/" className="text-blue-600 font-semibold">Login</Link>
            <Link to="/register" className="text-blue-600 font-semibold">Register</Link>
          </>
        )}
        {token && (
          <>
            <Link to="/dashboard" className="text-blue-600 font-semibold">Dashboard</Link>
            <button
              onClick={() => setToken(null)}
              className="text-red-600 font-semibold"
            >
              Logout
            </button>
          </>
        )}
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            token ? <Navigate to="/dashboard" /> : <LoginPage setToken={setToken} />
          }
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/dashboard"
          element={
            token ? <Dashboard token={token} /> : <Navigate to="/" />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
