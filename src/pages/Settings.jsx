import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import './Settings.css';

const Settings = () => {
  const { user, updateUser } = useAppContext();
  const [activeTab, setActiveTab] = useState('profile');
  const [userProfile, setUserProfile] = useState({
    name: user.name || 'Juan Pérez',
    email: user.email || 'juan@example.com',
    phone: user.phone || '+57 300 123 4567',
    currency: user.currency || 'COP',
    language: user.language || 'es',
    timezone: user.timezone || 'America/Bogota',
    notifications: {
      email: true,
      push: true,
      sms: false,
      weeklyReport: true,
      monthlyReport: true,
      budgetAlerts: true,
      goalReminders: true
    },
    privacy: {
      shareData: false,
      analytics: true,
      marketing: false
    }
  });

  const [isEditing, setIsEditing] = useState(false);
  const [tempProfile, setTempProfile] = useState({ ...userProfile });

  const tabs = [
    { id: 'profile', label: 'Perfil', icon: '👤' },
    { id: 'preferences', label: 'Preferencias', icon: '⚙️' },
    { id: 'notifications', label: 'Notificaciones', icon: '🔔' },
    { id: 'privacy', label: 'Privacidad', icon: '🔒' },
    { id: 'security', label: 'Seguridad', icon: '🛡️' }
  ];

  const currencies = [
    { code: 'COP', name: 'Peso Colombiano', symbol: '$' },
    { code: 'USD', name: 'Dólar Estadounidense', symbol: '$' },
    { code: 'EUR', name: 'Euro', symbol: '€' },
    { code: 'MXN', name: 'Peso Mexicano', symbol: '$' },
    { code: 'ARS', name: 'Peso Argentino', symbol: '$' }
  ];

  const languages = [
    { code: 'es', name: 'Español' },
    { code: 'en', name: 'English' },
    { code: 'pt', name: 'Português' }
  ];

  const timezones = [
    { value: 'America/Bogota', name: 'Bogotá (UTC-5)' },
    { value: 'America/Mexico_City', name: 'Ciudad de México (UTC-6)' },
    { value: 'America/New_York', name: 'Nueva York (UTC-5)' },
    { value: 'Europe/Madrid', name: 'Madrid (UTC+1)' }
  ];

  const handleSaveProfile = () => {
    setUserProfile(tempProfile);
    updateUser(tempProfile);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setTempProfile({ ...userProfile });
    setIsEditing(false);
  };

  const handleNotificationChange = (key, value) => {
    setUserProfile(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: value
      }
    }));
  };

  const handlePrivacyChange = (key, value) => {
    setUserProfile(prev => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [key]: value
      }
    }));
  };

  const renderProfileTab = () => (
    <div className="settings-section">
      <div className="section-header">
        <h3>Información Personal</h3>
        {!isEditing && (
          <button 
            className="btn btn-primary"
            onClick={() => setIsEditing(true)}
          >
            Editar Perfil
          </button>
        )}
      </div>

      <div className="profile-form">
        <div className="form-row">
          <div className="form-group">
            <label>Nombre Completo</label>
            <input
              type="text"
              value={isEditing ? tempProfile.name : userProfile.name}
              onChange={(e) => isEditing && setTempProfile({...tempProfile, name: e.target.value})}
              disabled={!isEditing}
            />
          </div>
          <div className="form-group">
            <label>Correo Electrónico</label>
            <input
              type="email"
              value={isEditing ? tempProfile.email : userProfile.email}
              onChange={(e) => isEditing && setTempProfile({...tempProfile, email: e.target.value})}
              disabled={!isEditing}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Teléfono</label>
            <input
              type="tel"
              value={isEditing ? tempProfile.phone : userProfile.phone}
              onChange={(e) => isEditing && setTempProfile({...tempProfile, phone: e.target.value})}
              disabled={!isEditing}
            />
          </div>
          <div className="form-group">
            <label>Moneda</label>
            <select
              value={isEditing ? tempProfile.currency : userProfile.currency}
              onChange={(e) => isEditing && setTempProfile({...tempProfile, currency: e.target.value})}
              disabled={!isEditing}
            >
              {currencies.map(currency => (
                <option key={currency.code} value={currency.code}>
                  {currency.symbol} {currency.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Idioma</label>
            <select
              value={isEditing ? tempProfile.language : userProfile.language}
              onChange={(e) => isEditing && setTempProfile({...tempProfile, language: e.target.value})}
              disabled={!isEditing}
            >
              {languages.map(lang => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Zona Horaria</label>
            <select
              value={isEditing ? tempProfile.timezone : userProfile.timezone}
              onChange={(e) => isEditing && setTempProfile({...tempProfile, timezone: e.target.value})}
              disabled={!isEditing}
            >
              {timezones.map(tz => (
                <option key={tz.value} value={tz.value}>
                  {tz.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {isEditing && (
          <div className="form-actions">
            <button className="btn btn-secondary" onClick={handleCancelEdit}>
              Cancelar
            </button>
            <button className="btn btn-primary" onClick={handleSaveProfile}>
              Guardar Cambios
            </button>
          </div>
        )}
      </div>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="settings-section">
      <div className="section-header">
        <h3>Configuración de Notificaciones</h3>
        <p>Gestiona cómo recibes las notificaciones de la aplicación</p>
      </div>

      <div className="notifications-grid">
        <div className="notification-item">
          <div className="notification-info">
            <h4>Notificaciones por Email</h4>
            <p>Recibe actualizaciones importantes por correo electrónico</p>
          </div>
          <label className="toggle">
            <input
              type="checkbox"
              checked={userProfile.notifications.email}
              onChange={(e) => handleNotificationChange('email', e.target.checked)}
            />
            <span className="slider"></span>
          </label>
        </div>

        <div className="notification-item">
          <div className="notification-info">
            <h4>Notificaciones Push</h4>
            <p>Recibe alertas en tiempo real en tu dispositivo</p>
          </div>
          <label className="toggle">
            <input
              type="checkbox"
              checked={userProfile.notifications.push}
              onChange={(e) => handleNotificationChange('push', e.target.checked)}
            />
            <span className="slider"></span>
          </label>
        </div>

        <div className="notification-item">
          <div className="notification-info">
            <h4>Notificaciones SMS</h4>
            <p>Recibe alertas importantes por mensaje de texto</p>
          </div>
          <label className="toggle">
            <input
              type="checkbox"
              checked={userProfile.notifications.sms}
              onChange={(e) => handleNotificationChange('sms', e.target.checked)}
            />
            <span className="slider"></span>
          </label>
        </div>

        <div className="notification-item">
          <div className="notification-info">
            <h4>Reporte Semanal</h4>
            <p>Recibe un resumen semanal de tus finanzas</p>
          </div>
          <label className="toggle">
            <input
              type="checkbox"
              checked={userProfile.notifications.weeklyReport}
              onChange={(e) => handleNotificationChange('weeklyReport', e.target.checked)}
            />
            <span className="slider"></span>
          </label>
        </div>

        <div className="notification-item">
          <div className="notification-info">
            <h4>Reporte Mensual</h4>
            <p>Recibe un análisis mensual detallado</p>
          </div>
          <label className="toggle">
            <input
              type="checkbox"
              checked={userProfile.notifications.monthlyReport}
              onChange={(e) => handleNotificationChange('monthlyReport', e.target.checked)}
            />
            <span className="slider"></span>
          </label>
        </div>

        <div className="notification-item">
          <div className="notification-info">
            <h4>Alertas de Presupuesto</h4>
            <p>Recibe alertas cuando te acerques a tu límite de presupuesto</p>
          </div>
          <label className="toggle">
            <input
              type="checkbox"
              checked={userProfile.notifications.budgetAlerts}
              onChange={(e) => handleNotificationChange('budgetAlerts', e.target.checked)}
            />
            <span className="slider"></span>
          </label>
        </div>

        <div className="notification-item">
          <div className="notification-info">
            <h4>Recordatorios de Metas</h4>
            <p>Recibe recordatorios sobre tus metas financieras</p>
          </div>
          <label className="toggle">
            <input
              type="checkbox"
              checked={userProfile.notifications.goalReminders}
              onChange={(e) => handleNotificationChange('goalReminders', e.target.checked)}
            />
            <span className="slider"></span>
          </label>
        </div>
      </div>
    </div>
  );

  const renderPrivacyTab = () => (
    <div className="settings-section">
      <div className="section-header">
        <h3>Configuración de Privacidad</h3>
        <p>Controla cómo se utilizan y comparten tus datos</p>
      </div>

      <div className="privacy-grid">
        <div className="privacy-item">
          <div className="privacy-info">
            <h4>Compartir Datos Anónimos</h4>
            <p>Permite compartir datos anónimos para mejorar la aplicación</p>
          </div>
          <label className="toggle">
            <input
              type="checkbox"
              checked={userProfile.privacy.shareData}
              onChange={(e) => handlePrivacyChange('shareData', e.target.checked)}
            />
            <span className="slider"></span>
          </label>
        </div>

        <div className="privacy-item">
          <div className="privacy-info">
            <h4>Analytics</h4>
            <p>Permite el uso de analytics para mejorar la experiencia</p>
          </div>
          <label className="toggle">
            <input
              type="checkbox"
              checked={userProfile.privacy.analytics}
              onChange={(e) => handlePrivacyChange('analytics', e.target.checked)}
            />
            <span className="slider"></span>
          </label>
        </div>

        <div className="privacy-item">
          <div className="privacy-info">
            <h4>Marketing</h4>
            <p>Recibe ofertas y promociones personalizadas</p>
          </div>
          <label className="toggle">
            <input
              type="checkbox"
              checked={userProfile.privacy.marketing}
              onChange={(e) => handlePrivacyChange('marketing', e.target.checked)}
            />
            <span className="slider"></span>
          </label>
        </div>
      </div>

      <div className="data-export">
        <h4>Exportar Datos</h4>
        <p>Descarga una copia de todos tus datos financieros</p>
        <button className="btn btn-secondary">
          Exportar Datos
        </button>
      </div>
    </div>
  );

  const renderSecurityTab = () => (
    <div className="settings-section">
      <div className="section-header">
        <h3>Configuración de Seguridad</h3>
        <p>Gestiona la seguridad de tu cuenta</p>
      </div>

      <div className="security-grid">
        <div className="security-item">
          <div className="security-info">
            <h4>Cambiar Contraseña</h4>
            <p>Actualiza tu contraseña para mantener tu cuenta segura</p>
          </div>
          <button className="btn btn-primary">
            Cambiar
          </button>
        </div>

        <div className="security-item">
          <div className="security-info">
            <h4>Autenticación de Dos Factores</h4>
            <p>Añade una capa extra de seguridad a tu cuenta</p>
          </div>
          <button className="btn btn-secondary">
            Configurar
          </button>
        </div>

        <div className="security-item">
          <div className="security-info">
            <h4>Sesión Activa</h4>
            <p>Gestiona las sesiones activas en otros dispositivos</p>
          </div>
          <button className="btn btn-secondary">
            Ver Sesiones
          </button>
        </div>

        <div className="security-item danger">
          <div className="security-info">
            <h4>Eliminar Cuenta</h4>
            <p>Elimina permanentemente tu cuenta y todos los datos</p>
          </div>
          <button className="btn btn-danger">
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return renderProfileTab();
      case 'notifications':
        return renderNotificationsTab();
      case 'privacy':
        return renderPrivacyTab();
      case 'security':
        return renderSecurityTab();
      default:
        return renderProfileTab();
    }
  };

  return (
    <div className="settings-page">
      <div className="settings-header">
        <div className="page-title">
          <h1>Configuración</h1>
          <p>Gestiona tu cuenta y preferencias</p>
        </div>
      </div>

      <div className="settings-content">
        <div className="settings-sidebar">
          <nav className="settings-nav">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className="tab-icon">{tab.icon}</span>
                <span className="tab-label">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="settings-main">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default Settings;
