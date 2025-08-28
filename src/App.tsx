import React, { useState } from 'react';
import { AppHeader } from './components/layout/AppHeader';
import { MobileNavigation } from './components/navigation/MobileNavigation';
import { Home } from './components/home/Home';
import { Dashboard } from './components/dashboard/Dashboard';
import { FinancialChatbot } from './components/chatbot/FinancialChatbot';
import { Gamification } from './components/gamification/Gamification';
import { Settings } from './components/settings/Settings';

import { QuickAddExpense } from './components/features/QuickAddExpense';
import { SmartNotifications } from './components/features/SmartNotifications';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showQuickAddExpense, setShowQuickAddExpense] = useState(false);
  const [showFlowchart, setShowFlowchart] = useState(false);

  const getTabTitle = (tab: string) => {
    switch (tab) {
      case 'dashboard': return 'Inicio';
      case 'analytics': return 'Análisis Financiero';
      case 'chatbot': return 'Asistente IA';
      case 'gamification': return 'Retos y Logros';
      case 'settings': return 'Configuración';
      default: return 'PLANIFI';
    }
  };

  const getTabSubtitle = (tab: string) => {
    switch (tab) {
      case 'dashboard': return 'Tu centro financiero personal';
      case 'analytics': return 'Insights detallados y métricas';
      case 'chatbot': return 'Consultas y recomendaciones IA';
      case 'gamification': return 'Desafíos y recompensas';
      case 'settings': return 'Cuentas y preferencias';
      default: return 'Personal finance';
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Home />;
      case 'analytics':
        return <Dashboard />;
      case 'chatbot':
        return <FinancialChatbot />;
      case 'gamification':
        return <Gamification />;
      case 'settings':
        return <Settings />;
      default:
        return <Home />;
    }
  };

  // Show flowchart if requested
  
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <AppHeader 
        title={getTabTitle(activeTab)}
        subtitle={getTabSubtitle(activeTab)}
        showNotifications={true}
        notificationCount={3}
      />

      {/* Smart Notifications */}
      <SmartNotifications />

      {/* Main Content */}
      <main className="px-4 py-6 max-w-md mx-auto">
        {renderContent()}
      </main>

      {/* Mobile Navigation */}
      <MobileNavigation 
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Floating Action Button for Quick Add */}
      <button
        onClick={() => setShowQuickAddExpense(true)}
        className="fixed bottom-24 right-4 w-14 h-14 planifi-gradient rounded-full shadow-lg hover:shadow-xl transition-shadow z-40 flex items-center justify-center"
      >
        <span className="text-white text-2xl font-bold">+</span>
      </button>

      {/* Flowchart Access Button - Hidden by default, can be shown for presentations */}
      <button
        onClick={() => setShowFlowchart(true)}
        className="fixed bottom-24 left-4 w-14 h-14 bg-blue-600 rounded-full shadow-lg hover:shadow-xl transition-shadow z-40 flex items-center justify-center"
        title="Ver Diagrama de Flujo"
      >
        <span className="text-white text-xl">📊</span>
      </button>

      {/* Quick Add Expense Modal */}
      <QuickAddExpense 
        isOpen={showQuickAddExpense}
        onClose={() => setShowQuickAddExpense(false)}
      />

      {/* Loading States */}
      <div className="hidden">
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
            <div className="flex items-center space-x-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
              <p>Sincronizando cuentas...</p>
            </div>
          </div>
        </div>
      </div>

      {/* Success Toast */}
      <div className="hidden fixed top-4 left-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          </div>
          <span className="text-sm font-medium">¡Transacción guardada exitosamente!</span>
        </div>
      </div>

      {/* Voice Command Indicator */}
      <div className="hidden fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-500 text-white px-6 py-4 rounded-full shadow-xl z-50">
        <div className="flex items-center space-x-3">
          <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
          <span className="font-medium">Escuchando comando de voz...</span>
        </div>
      </div>

      {/* Widget Simulation for Savings */}
      <div className="hidden fixed bottom-32 left-4 bg-white rounded-lg p-3 shadow-lg border border-gray-200 max-w-xs">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 planifi-gradient rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">P</span>
          </div>
          <div>
            <p className="text-xs font-medium">Redondeo automático</p>
            <p className="text-xs text-muted-foreground">Ahorraste $2.500 hoy</p>
          </div>
        </div>
      </div>

      {/* Presentation Mode Instructions */}
      <div className="hidden fixed top-20 left-4 bg-blue-100 border-l-4 border-blue-500 p-3 rounded shadow-lg max-w-xs">
        <h4 className="font-semibold text-blue-800 text-sm mb-1">Modo Presentación</h4>
        <p className="text-xs text-blue-600">Haz clic en el botón 📊 para acceder al diagrama de flujo completo</p>
      </div>
    </div>
  );
}