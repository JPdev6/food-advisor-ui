import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import DiceGamePage from "./pages/DiceGamePage";
import { useAuth } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  if (!user) {
    toast.error("Please log in to access this page.");
    return <Navigate to="/" replace />;
  }
  return children;
}

function App() {
  return (
    <Router>
      <Navbar />
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dice"
          element={
            <ProtectedRoute>
              <DiceGamePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
