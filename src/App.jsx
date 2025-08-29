import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import './App.css';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="app">
      <Header />
      <div className="app-layout">
        <Sidebar className={sidebarOpen ? 'open' : ''} />
        <main className="main-content">
          <Dashboard />
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
  );
}

export default App;
