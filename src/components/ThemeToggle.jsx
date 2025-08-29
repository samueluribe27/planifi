import React, { useState, useRef, useEffect } from 'react';

// Estilos CSS del componente, integrados para una funcionalidad autónoma
const style = `
  .theme-toggle {
    position: relative;
    display: inline-block;
  }

  .theme-toggle-button {
    background: none;
    border: none;
    padding: 8px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-secondary);
  }

  .theme-toggle-button:hover {
    background: var(--bg-secondary);
    color: var(--text-primary);
  }

  .theme-icon {
    font-size: 18px;
    line-height: 1;
  }

  .theme-dropdown {
    position: absolute;
    top: 100%;
    right: 0;
    background: var(--bg-primary);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    box-shadow: var(--shadow-xl);
    z-index: 1000;
    min-width: 280px;
    margin-top: 8px;
    overflow: hidden;
  }

  .theme-dropdown-header {
    padding: 16px 20px;
    border-bottom: 1px solid var(--border-color);
    background: var(--bg-secondary);
  }

  .theme-dropdown-header h3 {
    margin: 0 0 4px 0;
    font-size: 16px;
    font-weight: 600;
    color: var(--text-primary);
  }

  .theme-dropdown-header p {
    margin: 0;
    font-size: 14px;
    color: var(--text-secondary);
  }

  .theme-options {
    padding: 8px;
  }

  .theme-option {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 12px 16px;
    border: none;
    background: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
    text-align: left;
    color: var(--text-primary);
  }

  .theme-option:hover {
    background: var(--bg-secondary);
  }

  .theme-option.active {
    background: var(--primary-color);
    color: white;
  }

  .theme-option.active .theme-option-description {
    color: rgba(255, 255, 255, 0.8);
  }

  .theme-option-icon {
    font-size: 20px;
    margin-right: 12px;
    flex-shrink: 0;
  }

  .theme-option-content {
    flex: 1;
    min-width: 0;
  }

  .theme-option-name {
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 2px;
  }

  .theme-option-description {
    font-size: 12px;
    color: var(--text-secondary);
    line-height: 1.4;
  }

  .theme-option-check {
    font-size: 16px;
    font-weight: bold;
    margin-left: 8px;
    flex-shrink: 0;
  }

  @media (max-width: 768px) {
    .theme-dropdown {
      position: fixed;
      top: 80px;
      right: 16px;
      left: 16px;
      min-width: auto;
    }
    
    .theme-option {
      padding: 16px;
    }
    
    .theme-option-icon {
      font-size: 24px;
      margin-right: 16px;
    }
    
    .theme-option-name {
      font-size: 16px;
    }
    
    .theme-option-description {
      font-size: 14px;
    }
  }
`;

// Definiciones de utilidades de tema (simuladas) para que el componente funcione de forma autónoma.
const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  AUTO: 'auto',
};

const getThemeIcon = (theme) => {
  switch (theme) {
    case THEMES.LIGHT: return '☀️';
    case THEMES.DARK: return '🌙';
    case THEMES.AUTO: return '💻';
    default: return '☀️';
  }
};

const getThemeName = (theme) => {
  switch (theme) {
    case THEMES.LIGHT: return 'Claro';
    case THEMES.DARK: return 'Oscuro';
    case THEMES.AUTO: return 'Automático';
    default: return 'Claro';
  }
};

const getThemeDescription = (theme) => {
  switch (theme) {
    case THEMES.LIGHT: return 'Un tema brillante y claro para el día.';
    case THEMES.DARK: return 'Un tema oscuro y relajante para la noche.';
    case THEMES.AUTO: return 'Sincronizar con la configuración del sistema operativo.';
    default: return 'Un tema brillante y claro para el día.';
  }
};

const setTheme = (theme) => {
  document.body.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  window.dispatchEvent(new Event('themechange'));
};

// El componente ThemeToggle gestiona la selección del tema de la aplicación (claro, oscuro, automático).
const ThemeToggle = () => {
  // `useState` se utiliza para gestionar el estado de si el menú desplegable está abierto o no, y para
  // almacenar el tema actual seleccionado por el usuario.
  const [isOpen, setIsOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState(localStorage.getItem('theme') || THEMES.LIGHT);
  
  // `useRef` se utiliza para obtener una referencia al elemento del menú desplegable, lo que permite
  // detectar clics fuera del menú para cerrarlo automáticamente.
  const dropdownRef = useRef(null);

  // Este `useEffect` se encarga de añadir y eliminar un listener de eventos para cerrar el menú
  // desplegable cuando el usuario hace clic en cualquier lugar fuera de él.
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Este `useEffect` se utiliza para escuchar los cambios de tema, ya sea que se realicen
  // a través del propio componente o por cambios en el almacenamiento local (por ejemplo, si
  // otra pestaña del navegador cambia el tema).
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

  // Esta función se llama cuando el usuario selecciona una opción de tema. Actualiza el tema
  // a través de la función `setTheme` y cierra el menú desplegable.
  const handleThemeSelect = (theme) => {
    setTheme(theme);
    setCurrentTheme(theme);
    setIsOpen(false);
  };

  // El array `themes` contiene los datos para cada opción de tema.
  const themes = [
    { value: THEMES.LIGHT, icon: getThemeIcon(THEMES.LIGHT), name: getThemeName(THEMES.LIGHT), description: getThemeDescription(THEMES.LIGHT) },
    { value: THEMES.DARK, icon: getThemeIcon(THEMES.DARK), name: getThemeName(THEMES.DARK), description: getThemeDescription(THEMES.DARK) },
    { value: THEMES.AUTO, icon: getThemeIcon(THEMES.AUTO), name: getThemeName(THEMES.AUTO), description: getThemeDescription(THEMES.AUTO) }
  ];

  // El componente renderiza el botón de alternancia y el menú desplegable,
  // mostrando el menú solo si `isOpen` es verdadero.
  return (
    <>
      <style>{style}</style>
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
    </>
  );
};

export default ThemeToggle;
