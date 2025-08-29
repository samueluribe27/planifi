import React, { createContext, useContext } from 'react';
import { useAppState } from '../hooks/useAppState';

// Crear el contexto
const AppContext = createContext();

// Hook personalizado para usar el contexto
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext debe ser usado dentro de un AppProvider');
  }
  return context;
};

// Proveedor del contexto
export const AppProvider = ({ children }) => {
  const appState = useAppState();

  return (
    <AppContext.Provider value={appState}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
