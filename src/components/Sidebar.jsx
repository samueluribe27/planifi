import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ className = '' }) => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/transactions', label: 'Transacciones', icon: '💰' },
    { path: '/budget', label: 'Presupuesto', icon: '📋' },
    { path: '/goals', label: 'Metas', icon: '🎯' },
    { path: '/reports', label: 'Reportes', icon: '📈' },
    { path: '/settings', label: 'Configuración', icon: '⚙️' }
  ];

  const quickActions = [
    { path: '/transactions', label: 'Nueva Transacción', icon: '➕' },
    { path: '/goals', label: 'Nueva Meta', icon: '🎯' }
  ];

  return (
    <aside className={`sidebar ${className}`}>
      <div className="sidebar-content">
        <div className="sidebar-header">
          <h2>Menú Principal</h2>
        </div>
        
        <nav className="sidebar-nav">
          <ul className="nav-list">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link 
                  to={item.path} 
                  className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-label">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="quick-actions">
          <h3>Acciones Rápidas</h3>
          <ul className="quick-actions-list">
            {quickActions.map((action) => (
              <li key={action.path}>
                <Link 
                  to={action.path} 
                  className="quick-action-item"
                >
                  <span className="action-icon">{action.icon}</span>
                  <span className="action-label">{action.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="sidebar-footer">
          <div className="user-info">
            <div className="user-avatar">
              <img src="https://via.placeholder.com/32x32/3B82F6/FFFFFF?text=JP" alt="Usuario" />
            </div>
            <div className="user-details">
              <span className="user-name">Juan Pérez</span>
              <span className="user-role">Usuario Premium</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
