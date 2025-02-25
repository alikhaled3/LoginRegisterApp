import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Dashboard from './pages/Dashboard';
import Login from './pages/login';
import Register from './pages/register';
import ProtectedRoute from './component/ProtectedRoute';
import './App.css';
const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;