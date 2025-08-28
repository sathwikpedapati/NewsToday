import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ViewPage from './pages/ViewPage';
import EditPage from './pages/EditPage';
import PrivateRoute from "./Components/PrivateRoute";

const RootApp = () => {
  // Load theme from localStorage or default to dark
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    // Apply theme to body
    document.body.setAttribute('data-bs-theme', theme);
    document.body.style.backgroundColor = theme === 'dark' ? '#121212' : '#f8f9fa';
    document.body.style.color = theme === 'dark' ? '#ffffff' : '#000000';

    // Store theme preference
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={Login}/>
        <Route path="/signup" element={Signup}/>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <App theme={theme} setTheme={setTheme} />
            </PrivateRoute>
          }
        />
        <Route
          path="/view"
          element={
            <PrivateRoute>
              <ViewPage theme={theme} setTheme={setTheme} />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit"
          element={
            <PrivateRoute>
              <EditPage theme={theme} setTheme={setTheme} />
            </PrivateRoute>
          }
        />
        <Route
          path="*"
          element={
            <PrivateRoute>
              <App theme={theme} setTheme={setTheme} />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RootApp />
  </React.StrictMode>
);

reportWebVitals();
