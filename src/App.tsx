import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthForm from './components/auth/AuthForm';
import Browse from './components/Browse';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-netflix-black text-white">
        <Routes>
          <Route path="/auth" element={<AuthForm />} />
          <Route
            path="/browse"
            element={
              <PrivateRoute>
                <Browse />
              </PrivateRoute>
            }
          />
          <Route path="/" element={<Navigate to="/auth" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;