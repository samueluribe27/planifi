import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import SearchBar from './SearchBar';
import ThemeToggle from './ThemeToggle';
import './Header.css';

const Header = ({ searchRef }) => {
  const location = useLocation();

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <Link to="/dashboard">
            <h1>🌱 Planifi</h1>
          </Link>
        </div>
        
        <div className="header-search">
          <SearchBar ref={searchRef} />
        </div>
        
        <nav className="nav-menu">
          <Link 
            to="/dashboard" 
            className={location.pathname === '/dashboard' ? 'active' : ''}
          >
            Dashboard
          </Link>
          <Link 
            to="/transactions" 
            className={location.pathname === '/transactions' ? 'active' : ''}
          >
            Transacciones
          </Link>
          <Link 
            to="/budget" 
            className={location.pathname === '/budget' ? 'active' : ''}
          >
            Presupuesto
          </Link>
          <Link 
            to="/goals" 
            className={location.pathname === '/goals' ? 'active' : ''}
          >
            Metas
          </Link>
        </nav>
        
        <div className="header-actions">
          <ThemeToggle />
          <div className="user-info">
            <span className="user-name">Usuario</span>
            <span className="user-email">usuario@ejemplo.com</span>
            <div className="user-avatar">👤</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

