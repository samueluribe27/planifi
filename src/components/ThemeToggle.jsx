import React, { useState, useRef, useEffect } from 'react';
import { THEMES, setTheme, getThemeIcon, getThemeName, getThemeDescription } from '../utils/theme';
import './ThemeToggle.css';

const ThemeToggle = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState(localStorage.getItem('theme') || THEMES.LIGHT);
  const dropdownRef = useRef(null);

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Escuchar cambios de tema
  useEffect(() => {
    const handleThemeChange = () => {
      setCurrentTheme(localStorage.getItem('theme') || THEMES.LIGHT);
    };

    window.addEventListener('themechange', handleThemeChange);
    window.addEventListener('storage', handleThemeChange);

    return () => {
      window.removeEventListener('themechange', handleThemeChange);
      window.removeEventListener('storage', handleThemeChange);
    };
  }, []);

  const handleThemeSelect = (theme) => {
    setTheme(theme);
    setCurrentTheme(theme);
    setIsOpen(false);
  };

  const themes = [
    { value: THEMES.LIGHT, icon: getThemeIcon(THEMES.LIGHT), name: getThemeName(THEMES.LIGHT), description: getThemeDescription(THEMES.LIGHT) },
    { value: THEMES.DARK, icon: getThemeIcon(THEMES.DARK), name: getThemeName(THEMES.DARK), description: getThemeDescription(THEMES.DARK) },
    { value: THEMES.AUTO, icon: getThemeIcon(THEMES.AUTO), name: getThemeName(THEMES.AUTO), description: getThemeDescription(THEMES.AUTO) }
  ];

  return (
    <div className="theme-toggle" ref={dropdownRef}>
      <button
        className="theme-toggle-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Cambiar tema"
        title="Cambiar tema"
      >
        <span className="theme-icon">{getThemeIcon(currentTheme)}</span>
      </button>

      {isOpen && (
        <div className="theme-dropdown">
          <div className="theme-dropdown-header">
            <h3>Tema</h3>
            <p>Elige tu tema preferido</p>
          </div>
          
          <div className="theme-options">
            {themes.map((theme) => (
              <button
                key={theme.value}
                className={`theme-option ${currentTheme === theme.value ? 'active' : ''}`}
                onClick={() => handleThemeSelect(theme.value)}
              >
                <div className="theme-option-icon">
                  {theme.icon}
                </div>
                <div className="theme-option-content">
                  <div className="theme-option-name">
                    {theme.name}
                  </div>
                  <div className="theme-option-description">
                    {theme.description}
                  </div>
                </div>
                {currentTheme === theme.value && (
                  <div className="theme-option-check">
                    ✓
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeToggle;
