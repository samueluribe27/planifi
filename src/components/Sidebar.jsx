import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/transactions', label: 'Transacciones', icon: '💰' },
    { path: '/budget', label: 'Presupuesto', icon: '📋' },
    { path: '/goals', label: 'Metas', icon: '🎯' },
    { path: '/reports', label: 'Reportes', icon: '📈' },
    { path: '/settings', label: 'Configuración', icon: '⚙️' }
  ];

  const quickActions = [
    { path: '/transactions', label: 'Nueva Transacción', icon: '➕' }
  ];

  return (
    <>
      {/* Overlay para móviles */}
      {isOpen && <div className="sidebar-overlay" onClick={onClose}></div>}
      
      <aside className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <h2>🌱 Planifi</h2>
            <p>Finanzas Personales</p>
          </div>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section">
            <h3>MENÚ PRINCIPAL</h3>
            <ul>
              {menuItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={location.pathname === item.path ? 'active' : ''}
                    onClick={onClose}
                  >
                    <span className="nav-icon">{item.icon}</span>
                    <span className="nav-label">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="nav-section">
            <h3>ACCIONES RÁPIDAS</h3>
            <ul>
              {quickActions.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={location.pathname === item.path ? 'active' : ''}
                    onClick={onClose}
                  >
                    <span className="nav-icon">{item.icon}</span>
                    <span className="nav-label">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
