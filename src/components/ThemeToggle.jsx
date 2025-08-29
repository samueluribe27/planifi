import React, { useState, useRef, useEffect } from 'react';
import { setTheme, getCurrentTheme, THEMES } from '../utils/theme';
import './ThemeToggle.css';

const ThemeToggle = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState(getCurrentTheme());
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  const themes = [
    {
      id: THEMES.LIGHT,
      name: 'Claro',
      icon: '☀️',
      description: 'Tema claro para uso diurno'
    },
    {
      id: THEMES.DARK,
      name: 'Oscuro',
      icon: '🌙',
      description: 'Tema oscuro para uso nocturno'
    },
    {
      id: THEMES.AUTO,
      name: 'Automático',
      icon: '🔄',
      description: 'Se adapta automáticamente al sistema'
    }
  ];

  const handleThemeChange = (themeId) => {
    setTheme(themeId);
    setCurrentTheme(themeId);
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      !buttonRef.current?.contains(event.target)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getCurrentThemeInfo = () => {
    return themes.find(theme => theme.id === currentTheme) || themes[0];
  };

  return (
    <div className="theme-toggle">
      <button
        ref={buttonRef}
        className="theme-toggle-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Cambiar tema"
      >
        <span className="theme-icon">{getCurrentThemeInfo().icon}</span>
      </button>

      {isOpen && (
        <div ref={dropdownRef} className="theme-dropdown">
          <div className="theme-dropdown-header">
            <h3>Seleccionar Tema</h3>
            <p>Elige el tema que mejor se adapte a tus preferencias</p>
          </div>
          
          <div className="theme-options">
            {themes.map((theme) => (
              <button
                key={theme.id}
                className={`theme-option ${currentTheme === theme.id ? 'active' : ''}`}
                onClick={() => handleThemeChange(theme.id)}
              >
                <span className="theme-option-icon">{theme.icon}</span>
                <div className="theme-option-content">
                  <div className="theme-option-name">{theme.name}</div>
                  <div className="theme-option-description">{theme.description}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeToggle;
