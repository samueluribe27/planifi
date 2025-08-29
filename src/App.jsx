import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Budget from './pages/Budget';
import Goals from './pages/Goals';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import { 
  initKeyboardShortcuts, 
  cleanupKeyboardShortcuts, 
  registerShortcuts,
  showShortcutsHelp,
  showShortcutNotification 
} from './utils/keyboardShortcuts';
import { initTheme } from './utils/theme';
import './App.css';

// Componente interno para manejar atajos de teclado
const AppContent = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const searchInputRef = useRef(null);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Inicializar tema
  useEffect(() => {
    initTheme();
  }, []);

  // Configurar atajos de teclado
  useEffect(() => {
    const shortcuts = {
      navigate: (path) => {
        navigate(path);
        showShortcutNotification('Navegación', `Navegando a ${path}`);
      },
      quickAction: (action) => {
        switch (action) {
          case 'newTransaction':
            navigate('/transactions');
            showShortcutNotification('Acción Rápida', 'Nueva Transacción');
            break;
          case 'newBudget':
            navigate('/budget');
            showShortcutNotification('Acción Rápida', 'Nuevo Presupuesto');
            break;
          case 'newGoal':
            navigate('/goals');
            showShortcutNotification('Acción Rápida', 'Nueva Meta');
            break;
          case 'export':
            showShortcutNotification('Acción Rápida', 'Exportar Datos');
            break;
        }
      },
      focus: (target) => {
        if (target === 'search' && searchInputRef.current) {
          searchInputRef.current.focus();
          showShortcutNotification('Búsqueda', 'Campo de búsqueda enfocado');
        }
      },
      system: (action) => {
        switch (action) {
          case 'closeModals':
            // Cerrar modales abiertos
            const modals = document.querySelectorAll('.modal-overlay');
            modals.forEach(modal => modal.click());
            showShortcutNotification('Sistema', 'Modales cerrados');
            break;
          case 'showHelp':
          case 'showShortcuts':
            showShortcutsHelp();
            break;
        }
      }
    };

    registerShortcuts(shortcuts);
    initKeyboardShortcuts();

    return () => {
      cleanupKeyboardShortcuts();
    };
  }, [navigate]);

  return (
    <div className="app">
      <Header searchRef={searchInputRef} />
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
  );
};

function App() {
  return (
    <AppProvider>
      <Router>
        <AppContent />
      </Router>
    </AppProvider>
  );
}

export default App;
