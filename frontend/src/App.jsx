import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useAuth } from "./context/AuthContext";

// Redirect to dashboard if user is already logged in
const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  return user ? <Navigate to="/" /> : children;
};
// user exists (logged in)? → show <Navigate to="/" /> which redirects to dashboard
// user is null (not logged in)? → show children which is <Login />

function App() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <Routes>
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />
      <Route
        path="/"
        element={
          <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <h1 className="text-3xl font-bold text-gray-700">Dashboard coming soon</h1>
          </div>
        }
      />
    </Routes>
  );
}

export default App;
