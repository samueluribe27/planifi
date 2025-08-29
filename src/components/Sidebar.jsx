import React from 'react';
import { Link, useLocation } from 'react-router-dom';

// Estilos CSS del componente, integrados para una funcionalidad autónoma
const style = `
  /* Estilos del Contenedor Principal de la Barra Lateral */
  .sidebar {
    position: fixed;
    top: 70px;
    left: 0;
    width: 280px;
    height: calc(100vh - 70px);
    background: var(--bg-primary);
    border-right: 1px solid var(--border-color);
    overflow-y: auto;
    z-index: 90;
    transition: transform 0.3s ease;
  }
  
  /* Estilos del Contenido Interno de la Barra Lateral */
  .sidebar-content {
    padding: 1.5rem;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  
  /* Estilos del Encabezado de la Barra Lateral */
  .sidebar-header {
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid var(--border-color);
  }
  
  .sidebar-header h2 {
    margin: 0;
    font-size: 1.125rem;
    color: var(--text-primary);
    font-weight: 600;
  }
  
  /* Estilos de la Navegación Principal */
  .sidebar-nav {
    flex: 1;
  }
  
  .nav-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  /* Estilos de los Elementos de Navegación */
  .nav-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1rem;
    border-radius: 8px;
    text-decoration: none;
    color: var(--text-secondary);
    font-weight: 500;
    transition: all 0.2s ease;
    position: relative;
  }
  
  .nav-item:hover {
    background: var(--bg-secondary);
    color: var(--text-primary);
    transform: translateX(4px);
  }
  
  .nav-item.active {
    background: var(--primary-color);
    color: white;
    box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
  }
  
  .nav-item.active::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 4px;
    height: 20px;
    background: white;
    border-radius: 0 2px 2px 0;
  }
  
  .nav-icon {
    font-size: 1.25rem;
    width: 20px;
    text-align: center;
  }
  
  .nav-label {
    font-size: 0.875rem;
  }
  
  /* Estilos para las Secciones de Acciones Rápidas y Pie de Página */
  .quick-actions {
    margin-top: 2rem;
    padding-top: 1.5rem;
    border-top: 1px solid var(--border-color);
  }
  
  .quick-actions h3 {
    margin: 0 0 1rem 0;
    font-size: 0.875rem;
    color: var(--text-secondary);
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  .quick-actions-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .quick-action-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.5rem 0.75rem;
    border-radius: 6px;
    text-decoration: none;
    color: var(--text-secondary);
    font-size: 0.875rem;
    font-weight: 500;
    transition: all 0.2s ease;
  }
  
  .quick-action-item:hover {
    background: var(--bg-secondary);
    color: var(--text-primary);
    transform: translateX(2px);
  }
  
  .action-icon {
    font-size: 1rem;
    width: 16px;
    text-align: center;
  }
  
  .action-label {
    font-size: 0.875rem;
  }
  
  .sidebar-footer {
    margin-top: auto;
    padding-top: 1.5rem;
    border-top: 1px solid var(--border-color);
  }
  
  /* Estilos de la Sección de Información del Usuario */
  .user-info {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem;
    background: var(--bg-secondary);
    border-radius: 8px;
  }
  
  .user-avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    overflow: hidden;
    border: 2px solid var(--border-color);
  }
  
  .user-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .user-details {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }
  
  .user-name {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--text-primary);
    margin: 0;
  }
  
  .user-role {
    font-size: 0.75rem;
    color: var(--text-secondary);
    margin: 0;
  }
  
  /* Diseño Responsivo para Dispositivos Móviles y Tabletas */
  .sidebar.open {
    transform: translateX(0);
  }
  
  @media (max-width: 1024px) {
    .sidebar {
      transform: translateX(-100%);
      width: 280px;
    }
    
    .sidebar.open {
      transform: translateX(0);
    }
  }
  
  @media (max-width: 768px) {
    .sidebar {
      top: 60px;
      height: calc(100vh - 60px);
      width: 100%;
      max-width: 320px;
    }
    
    .sidebar-content {
      padding: 1rem;
    }
    
    .nav-item {
      padding: 1rem;
    }
    
    .quick-action-item {
      padding: 0.75rem;
    }
    
    .user-info {
      padding: 1rem;
    }
  }
`;

// El componente Sidebar actúa como la barra de navegación principal de la aplicación.
// Recibe una clase `className` para permitir un manejo de estado (abierto/cerrado) desde el componente padre.
const Sidebar = ({ className = '' }) => {
  // `useLocation` se usa para obtener la URL actual y determinar qué enlace de navegación está activo.
  const location = useLocation();

  // Función para verificar si la ruta actual coincide con la ruta de un elemento del menú.
  const isActive = (path) => {
    return location.pathname === path;
  };

  // Definición de los elementos del menú principal.
  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/transactions', label: 'Transacciones', icon: '💰' },
    { path: '/budget', label: 'Presupuesto', icon: '📋' },
    { path: '/goals', label: 'Metas', icon: '🎯' },
    { path: '/reports', label: 'Reportes', icon: '📈' },
    { path: '/settings', label: 'Configuración', icon: '⚙️' }
  ];

  // Definición de los elementos de acciones rápidas.
  const quickActions = [
    { path: '/transactions', label: 'Nueva Transacción', icon: '➕' },
    { path: '/goals', label: 'Nueva Meta', icon: '🎯' }
  ];

  // El componente renderiza la estructura de la barra lateral, incluyendo el menú principal,
  // las acciones rápidas y una sección de información del usuario.
  return (
    <>
      <style>{style}</style>
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
    </>
  );
};

export default Sidebar;
