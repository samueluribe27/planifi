import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();

  const menuItems = [
    {
      path: '/',
      label: 'Dashboard',
      icon: '📊',
      exact: true
    },
    {
      path: '/transactions',
      label: 'Transacciones',
      icon: '💰'
    },
    {
      path: '/budget',
      label: 'Presupuesto',
      icon: '📋'
    },
    {
      path: '/goals',
      label: 'Metas',
      icon: '🎯'
    },
    {
      path: '/reports',
      label: 'Reportes',
      icon: '📈'
    },
    {
      path: '/settings',
      label: 'Configuración',
      icon: '⚙️'
    }
  ];

  const quickActions = [
    {
      label: 'Nueva Transacción',
      icon: '➕',
      action: () => {
        // Navegar a transacciones
        window.location.href = '/transactions';
      }
    }
  ];

  const isActive = (path, exact = false) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Overlay para cerrar sidebar en móvil */}
      {isOpen && (
        <div 
          className="sidebar-overlay" 
          onClick={onClose}
        />
      )}
      
      {/* Sidebar principal */}
      <aside className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-content">
          {/* Encabezado del sidebar */}
          <div className="sidebar-header">
            <h2>Planifi Finanzas Personales</h2>
          </div>

          {/* Navegación principal */}
          <nav className="sidebar-nav">
            <h3 className="nav-section-title">Menú Principal</h3>
            <ul className="nav-list">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`nav-item ${isActive(item.path, item.exact) ? 'active' : ''}`}
                    onClick={onClose}
                  >
                    <span className="nav-icon">{item.icon}</span>
                    <span className="nav-label">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Acciones rápidas */}
          <div className="sidebar-actions">
            <h3 className="nav-section-title">ACCIONES RÁPIDAS</h3>
            <ul className="nav-list">
              {quickActions.map((action, index) => (
                <li key={index}>
                  <button
                    className="nav-item nav-action"
                    onClick={action.action}
                  >
                    <span className="nav-icon">{action.icon}</span>
                    <span className="nav-label">{action.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
