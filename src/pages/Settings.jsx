import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { showSuccess, showError } from '../utils/notifications';
import './Settings.css';

const Settings = () => {
  const { user, updateUser } = useAppContext();
  
  const [formData, setFormData] = useState({
    name: user.name || '',
    email: user.email || '',
    currency: user.currency || 'COP',
    language: user.language || 'es'
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email) {
      showError('Por favor completa todos los campos requeridos');
      return;
    }

    updateUser(formData);
    showSuccess('Configuración actualizada exitosamente');
  };

  const handleReset = () => {
    if (confirm('¿Estás seguro de que quieres restablecer todos los datos? Esta acción no se puede deshacer.')) {
      localStorage.removeItem('planifi-state');
      window.location.reload();
    }
  };

  const handleExport = () => {
    const data = localStorage.getItem('planifi-state');
    if (data) {
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `planifi-backup-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showSuccess('Datos exportados exitosamente');
    }
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target.result);
          localStorage.setItem('planifi-state', JSON.stringify(data));
          showSuccess('Datos importados exitosamente');
          window.location.reload();
        } catch (error) {
          showError('Error al importar los datos. Verifica que el archivo sea válido.');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="settings">
      <div className="settings-header">
        <div className="settings-title">
          <h1>Configuración</h1>
          <p>Personaliza tu experiencia en Planifi</p>
        </div>
      </div>

      <div className="settings-content">
        {/* Perfil de Usuario */}
        <div className="settings-section">
          <h2>Perfil de Usuario</h2>
          <form onSubmit={handleSubmit} className="settings-form">
            <div className="form-row">
              <div className="form-group">
                <label>Nombre *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  required
                  placeholder="Tu nombre"
                />
              </div>
              
              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  required
                  placeholder="tu@email.com"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Divisa</label>
                <select
                  value={formData.currency}
                  onChange={(e) => setFormData(prev => ({ ...prev, currency: e.target.value }))}
                >
                  {currencies.map(currency => (
                    <option key={currency.code} value={currency.code}>
                      {currency.symbol} {currency.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="form-group">
                <label>Idioma</label>
                <select
                  value={formData.language}
                  onChange={(e) => setFormData(prev => ({ ...prev, language: e.target.value }))}
                >
                  {languages.map(language => (
                    <option key={language.code} value={language.code}>
                      {language.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                Guardar Cambios
              </button>
            </div>
          </form>
        </div>

        {/* Datos y Respaldo */}
        <div className="settings-section">
          <h2>Datos y Respaldo</h2>
          <div className="backup-actions">
            <div className="backup-item">
              <div className="backup-info">
                <h3>Exportar Datos</h3>
                <p>Descarga una copia de todos tus datos financieros</p>
              </div>
              <button onClick={handleExport} className="btn btn-secondary">
                📤 Exportar
              </button>
            </div>

            <div className="backup-item">
              <div className="backup-info">
                <h3>Importar Datos</h3>
                <p>Restaura tus datos desde un archivo de respaldo</p>
              </div>
              <label className="btn btn-secondary">
                📥 Importar
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImport}
                  style={{ display: 'none' }}
                />
              </label>
            </div>

            <div className="backup-item">
              <div className="backup-info">
                <h3>Restablecer Datos</h3>
                <p>Elimina todos los datos y vuelve al estado inicial</p>
              </div>
              <button onClick={handleReset} className="btn btn-danger">
                🔄 Restablecer
              </button>
            </div>
          </div>
        </div>

        {/* Información de la Aplicación */}
        <div className="settings-section">
          <h2>Información</h2>
          <div className="app-info">
            <div className="info-item">
              <span className="info-label">Versión:</span>
              <span className="info-value">1.0.0</span>
            </div>
            <div className="info-item">
              <span className="info-label">Desarrollado por:</span>
              <span className="info-value">Planifi Team</span>
            </div>
            <div className="info-item">
              <span className="info-label">Tecnologías:</span>
              <span className="info-value">React, Vite, Chart.js</span>
            </div>
            <div className="info-item">
              <span className="info-label">Licencia:</span>
              <span className="info-value">MIT</span>
            </div>
          </div>
        </div>

        {/* Enlaces Útiles */}
        <div className="settings-section">
          <h2>Enlaces Útiles</h2>
          <div className="useful-links">
            <a href="#" className="link-item">
              <span className="link-icon">📖</span>
              <div className="link-content">
                <h3>Guía de Uso</h3>
                <p>Aprende a usar Planifi de manera efectiva</p>
              </div>
            </a>
            
            <a href="#" className="link-item">
              <span className="link-icon">❓</span>
              <div className="link-content">
                <h3>Preguntas Frecuentes</h3>
                <p>Resuelve tus dudas sobre la aplicación</p>
              </div>
            </a>
            
            <a href="#" className="link-item">
              <span className="link-icon">📧</span>
              <div className="link-content">
                <h3>Contacto</h3>
                <p>Envíanos tus comentarios y sugerencias</p>
              </div>
            </a>
            
            <a href="#" className="link-item">
              <span className="link-icon">🔒</span>
              <div className="link-content">
                <h3>Política de Privacidad</h3>
                <p>Conoce cómo protegemos tus datos</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
