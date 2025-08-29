// Funciones de utilidad para manejo de temas

// Tipos de tema disponibles
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  AUTO: 'auto'
};

// Variables CSS para tema claro
const LIGHT_THEME = {
  '--bg-primary': '#ffffff',
  '--bg-secondary': '#f8fafc',
  '--bg-tertiary': '#f1f5f9',
  '--text-primary': '#1e293b',
  '--text-secondary': '#64748b',
  '--text-muted': '#94a3b8',
  '--border-color': '#e2e8f0',
  '--border-light': '#f1f5f9',
  '--primary-color': '#3b82f6',
  '--primary-hover': '#2563eb',
  '--success-color': '#10b981',
  '--warning-color': '#f59e0b',
  '--danger-color': '#ef4444',
  '--info-color': '#06b6d4',
  '--shadow-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  '--shadow-md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  '--shadow-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  '--shadow-xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
};

// Variables CSS para tema oscuro
const DARK_THEME = {
  '--bg-primary': '#0f172a',
  '--bg-secondary': '#1e293b',
  '--bg-tertiary': '#334155',
  '--text-primary': '#f8fafc',
  '--text-secondary': '#cbd5e1',
  '--text-muted': '#94a3b8',
  '--border-color': '#334155',
  '--border-light': '#475569',
  '--primary-color': '#60a5fa',
  '--primary-hover': '#3b82f6',
  '--success-color': '#34d399',
  '--warning-color': '#fbbf24',
  '--danger-color': '#f87171',
  '--info-color': '#22d3ee',
  '--shadow-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
  '--shadow-md': '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.3)',
  '--shadow-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.3)',
  '--shadow-xl': '0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.3)'
};

// Función para obtener el tema actual del sistema
const getSystemTheme = () => {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? THEMES.DARK : THEMES.LIGHT;
};

// Función para aplicar variables CSS al documento
const applyThemeVariables = (theme) => {
  const root = document.documentElement;
  const variables = theme === THEMES.DARK ? DARK_THEME : LIGHT_THEME;
  
  Object.entries(variables).forEach(([property, value]) => {
    root.style.setProperty(property, value);
  });
};

// Función para obtener el tema actual
export const getCurrentTheme = () => {
  const savedTheme = localStorage.getItem('theme');
  
  if (savedTheme === THEMES.AUTO) {
    return getSystemTheme();
  }
  
  return savedTheme || THEMES.LIGHT;
};

// Función para establecer el tema
export const setTheme = (theme) => {
  // Guardar preferencia en localStorage
  localStorage.setItem('theme', theme);
  
  // Aplicar el tema
  const actualTheme = theme === THEMES.AUTO ? getSystemTheme() : theme;
  applyThemeVariables(actualTheme);
  
  // Actualizar atributo data-theme en el documento
  document.documentElement.setAttribute('data-theme', actualTheme);
  
  // Disparar evento personalizado para notificar cambios
  window.dispatchEvent(new CustomEvent('themechange', { detail: { theme: actualTheme } }));
};

// Función para inicializar el tema
export const initTheme = () => {
  const currentTheme = getCurrentTheme();
  setTheme(currentTheme);
  
  // Escuchar cambios en la preferencia del sistema
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  mediaQuery.addEventListener('change', (e) => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === THEMES.AUTO) {
      setTheme(THEMES.AUTO);
    }
  });
};

// Función para alternar entre temas
export const toggleTheme = () => {
  const currentTheme = getCurrentTheme();
  const nextTheme = currentTheme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT;
  setTheme(nextTheme);
  return nextTheme;
};

// Función para obtener el tema siguiente en el ciclo
export const getNextTheme = () => {
  const currentTheme = localStorage.getItem('theme') || THEMES.LIGHT;
  
  switch (currentTheme) {
    case THEMES.LIGHT:
      return THEMES.DARK;
    case THEMES.DARK:
      return THEMES.AUTO;
    case THEMES.AUTO:
      return THEMES.LIGHT;
    default:
      return THEMES.LIGHT;
  }
};

// Función para obtener el icono del tema
export const getThemeIcon = (theme) => {
  switch (theme) {
    case THEMES.LIGHT:
      return '☀️';
    case THEMES.DARK:
      return '🌙';
    case THEMES.AUTO:
      return '🖥️';
    default:
      return '☀️';
  }
};

// Función para obtener el nombre del tema
export const getThemeName = (theme) => {
  switch (theme) {
    case THEMES.LIGHT:
      return 'Claro';
    case THEMES.DARK:
      return 'Oscuro';
    case THEMES.AUTO:
      return 'Automático';
    default:
      return 'Claro';
  }
};

// Función para obtener la descripción del tema
export const getThemeDescription = (theme) => {
  switch (theme) {
    case THEMES.LIGHT:
      return 'Tema claro para uso diurno';
    case THEMES.DARK:
      return 'Tema oscuro para uso nocturno';
    case THEMES.AUTO:
      return 'Se adapta automáticamente al sistema';
    default:
      return 'Tema claro para uso diurno';
  }
};

// Hook personalizado para usar el tema en componentes React
export const useTheme = () => {
  const [currentTheme, setCurrentThemeState] = React.useState(getCurrentTheme());
  const [savedTheme, setSavedThemeState] = React.useState(localStorage.getItem('theme') || THEMES.LIGHT);

  React.useEffect(() => {
    const handleThemeChange = (event) => {
      setCurrentThemeState(event.detail.theme);
    };

    const handleStorageChange = () => {
      setSavedThemeState(localStorage.getItem('theme') || THEMES.LIGHT);
    };

    window.addEventListener('themechange', handleThemeChange);
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('themechange', handleThemeChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return {
    currentTheme,
    savedTheme,
    setTheme,
    toggleTheme,
    getNextTheme,
    getThemeIcon,
    getThemeName,
    getThemeDescription
  };
};
