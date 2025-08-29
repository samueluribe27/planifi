import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Budget from './pages/Budget';
import Goals from './pages/Goals';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import './App.css';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Router>
      <div className="app">
        <Header />
        <div className="app-layout">
          <Sidebar className={sidebarOpen ? 'open' : ''} />
          <main className="main-content">
                               <Routes>
                     <Route path="/" element={<Navigate to="/dashboard" replace />} />
                     <Route path="/dashboard" element={<Dashboard />} />
                     <Route path="/transactions" element={<Transactions />} />
                     <Route path="/budget" element={<Budget />} />
                     <Route path="/goals" element={<Goals />} />
                     <Route path="/reports" element={<Reports />} />
                     <Route path="/settings" element={<Settings />} />
                     <Route path="*" element={<Navigate to="/dashboard" replace />} />
                   </Routes>
          </main>
        </div>

        {/* Botón móvil para abrir sidebar */}
        <button
          className="mobile-menu-toggle"
          onClick={toggleSidebar}
          aria-label="Toggle menu"
        >
          <span className="hamburger"></span>
        </button>
      </div>
    </Router>
  );
}

export default App;
