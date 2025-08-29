import React from 'react';
import './Sidebar.css';

const Sidebar = () => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'transactions', label: 'Transacciones', icon: '💰' },
    { id: 'budget', label: 'Presupuesto', icon: '📋' },
    { id: 'goals', label: 'Metas', icon: '🎯' },
    { id: 'reports', label: 'Reportes', icon: '📈' },
    { id: 'settings', label: 'Configuración', icon: '⚙️' }
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-content">
        <div className="sidebar-header">
          <h3>Menú Principal</h3>
        </div>
        
        <nav className="sidebar-nav">
          <ul className="sidebar-menu">
            {menuItems.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className="sidebar-link">
                  <span className="sidebar-icon">{item.icon}</span>
                  <span className="sidebar-label">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="sidebar-footer">
          <div className="quick-actions">
            <h4>Acciones Rápidas</h4>
            <button className="btn btn-primary btn-sm">
              + Nueva Transacción
            </button>
            <button className="btn btn-secondary btn-sm">
              + Nueva Meta
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
