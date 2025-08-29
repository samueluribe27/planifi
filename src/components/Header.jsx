import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import SearchBar from './SearchBar';
import ThemeToggle from './ThemeToggle';
import './Header.css';

const Header = ({ searchRef }) => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="header">
      <div className="header-content">
        {/* Sección del Logo */}
        <div className="logo">
          <Link to="/dashboard">
            <h1>Planifi Finanzas Personales</h1>
          </Link>
        </div>
        
        {/* Sección de la Barra de Búsqueda */}
        <div className="header-search">
          <SearchBar ref={searchRef} />
        </div>
        
        {/* Menú de Navegación */}
        <nav className="nav-menu">
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
          <ThemeToggle />
          <div className="user-info">
            <span className="user-name">Juan Pérez</span>
            <span className="user-email">juan@example.com</span>
          </div>
          <div className="user-avatar">
            <img src="https://via.placeholder.com/40x40/3B82F6/FFFFFF?text=JP" alt="Usuario" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

