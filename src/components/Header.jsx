import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <h1>Planifi</h1>
            <span className="logo-subtitle">Finanzas Personales</span>
          </div>
          
          <nav className="nav">
            <ul className="nav-list">
              <li><a href="#dashboard" className="nav-link active">Dashboard</a></li>
              <li><a href="#transactions" className="nav-link">Transacciones</a></li>
              <li><a href="#budget" className="nav-link">Presupuesto</a></li>
              <li><a href="#goals" className="nav-link">Metas</a></li>
            </ul>
          </nav>
          
          <div className="user-menu">
            <button className="user-avatar">
              <span>JS</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
