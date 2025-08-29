import React from 'react';
import { Link, useLocation } from 'react-router-dom';

// Este componente `Header` es la barra de navegación superior de la aplicación.
// Incluye el logo, una barra de búsqueda, el menú de navegación y la sección del usuario.
const Header = () => {
  // `useLocation` de `react-router-dom` para obtener la ruta actual de la URL.
  const location = useLocation();

  // Esta función auxiliar determina si un enlace de navegación está activo
  // comparando la ruta actual con la ruta del enlace.
  const isActive = (path) => {
    return location.pathname === path;
  };

  // El componente renderiza la estructura HTML del encabezado.
  // Utiliza clases CSS para aplicar los estilos de diseño.
  return (
    <header className="header">
      <div className="header-content">
        {/* Sección del Logo */}
        <div className="logo">
          {/* El componente `Link` de `react-router-dom` se utiliza para la navegación. */}
          <Link to="/dashboard">
            <h1>Planifi Finanzas Personales</h1>
          </Link>
        </div>
        
        {/* Sección de la Barra de Búsqueda */}
        <div className="header-search">
          {/* Este es un placeholder para el componente SearchBar. */}
          <input type="text" placeholder="Buscar..." className="search-input" />
        </div>
        
        {/* Menú de Navegación */}
        <nav className="nav-menu">
          {/* Cada enlace de navegación utiliza la función `isActive` para aplicar la clase 'active'
              y mostrar el estado de resaltado cuando la página actual coincide. */}
          <Link 
            to="/dashboard" 
            className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}
          >
            Dashboard
          </Link>
          <Link 
            to="/transactions" 
            className={`nav-link ${isActive('/transactions') ? 'active' : ''}`}
          >
            Transacciones
          </Link>
          <Link 
            to="/budget" 
            className={`nav-link ${isActive('/budget') ? 'active' : ''}`}
          >
            Presupuesto
          </Link>
          <Link 
            to="/goals" 
            className={`nav-link ${isActive('/goals') ? 'active' : ''}`}
          >
            Metas
          </Link>
        </nav>
        
        {/* Sección de Usuario */}
        <div className="user-section">
          {/* Placeholder para el componente ThemeToggle. */}
          <button className="theme-toggle-button">Tema</button>
          <div className="user-info">
            <span className="user-name">Juan Pérez</span>
            <span className="user-email">juan@example.com</span>
          </div>
          <div className="user-avatar">
            {/* El avatar del usuario con una imagen de marcador de posición. */}
            <img src="https://via.placeholder.com/40x40/3B82F6/FFFFFF?text=JP" alt="Usuario" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

