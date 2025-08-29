// Funciones de utilidad para notificaciones y alertas

// Tipos de notificación
export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info'
};

// Configuración de notificaciones
const NOTIFICATION_CONFIG = {
  duration: 5000, // 5 segundos
  position: 'top-right'
};

// Función para mostrar notificaciones
export const showNotification = (message, type = NOTIFICATION_TYPES.INFO, duration = NOTIFICATION_CONFIG.duration) => {
  // Crear elemento de notificación
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  
  // Contenido de la notificación
  notification.innerHTML = `
    <div class="notification-content">
      <div class="notification-icon">
        ${getNotificationIcon(type)}
      </div>
      <div class="notification-message">
        ${message}
      </div>
      <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
        ✕
      </button>
    </div>
  `;
  
  // Agregar estilos
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${getNotificationColor(type)};
    color: white;
    padding: 16px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 10000;
    max-width: 400px;
    animation: slideIn 0.3s ease-out;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  `;
  
  // Agregar al DOM
  document.body.appendChild(notification);
  
  // Auto-remover después del tiempo especificado
  setTimeout(() => {
    if (notification.parentElement) {
      notification.style.animation = 'slideOut 0.3s ease-in';
      setTimeout(() => {
        if (notification.parentElement) {
          notification.remove();
        }
      }, 300);
    }
  }, duration);
  
  // Agregar estilos CSS para animaciones
  if (!document.getElementById('notification-styles')) {
    const style = document.createElement('style');
    style.id = 'notification-styles';
    style.textContent = `
      @keyframes slideIn {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
      
      @keyframes slideOut {
        from {
          transform: translateX(0);
          opacity: 1;
        }
        to {
          transform: translateX(100%);
          opacity: 0;
        }
      }
      
      .notification-content {
        display: flex;
        align-items: center;
        gap: 12px;
      }
      
      .notification-icon {
        font-size: 20px;
        flex-shrink: 0;
      }
      
      .notification-message {
        flex: 1;
        font-size: 14px;
        line-height: 1.4;
      }
      
      .notification-close {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        font-size: 16px;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0.7;
        transition: opacity 0.2s;
      }
      
      .notification-close:hover {
        opacity: 1;
      }
    `;
    document.head.appendChild(style);
  }
};

// Función para obtener el icono según el tipo
const getNotificationIcon = (type) => {
  switch (type) {
    case NOTIFICATION_TYPES.SUCCESS:
      return '✅';
    case NOTIFICATION_TYPES.ERROR:
      return '❌';
    case NOTIFICATION_TYPES.WARNING:
      return '⚠️';
    case NOTIFICATION_TYPES.INFO:
    default:
      return 'ℹ️';
  }
};

// Función para obtener el color según el tipo
const getNotificationColor = (type) => {
  switch (type) {
    case NOTIFICATION_TYPES.SUCCESS:
      return '#10b981';
    case NOTIFICATION_TYPES.ERROR:
      return '#ef4444';
    case NOTIFICATION_TYPES.WARNING:
      return '#f59e0b';
    case NOTIFICATION_TYPES.INFO:
    default:
      return '#3b82f6';
  }
};

// Funciones de conveniencia
export const showSuccess = (message, duration) => showNotification(message, NOTIFICATION_TYPES.SUCCESS, duration);
export const showError = (message, duration) => showNotification(message, NOTIFICATION_TYPES.ERROR, duration);
export const showWarning = (message, duration) => showNotification(message, NOTIFICATION_TYPES.WARNING, duration);
export const showInfo = (message, duration) => showNotification(message, NOTIFICATION_TYPES.INFO, duration);

// Función para mostrar confirmación
export const showConfirmation = (message, onConfirm, onCancel) => {
  const modal = document.createElement('div');
  modal.className = 'confirmation-modal';
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10001;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  `;
  
  modal.innerHTML = `
    <div class="confirmation-content" style="
      background: white;
      padding: 24px;
      border-radius: 12px;
      max-width: 400px;
      width: 90%;
      text-align: center;
      box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1);
    ">
      <div class="confirmation-icon" style="
        font-size: 48px;
        margin-bottom: 16px;
      ">❓</div>
      <h3 style="
        margin: 0 0 16px 0;
        color: #1f2937;
        font-size: 18px;
        font-weight: 600;
      ">Confirmar acción</h3>
      <p style="
        margin: 0 0 24px 0;
        color: #6b7280;
        font-size: 14px;
        line-height: 1.5;
      ">${message}</p>
      <div class="confirmation-actions" style="
        display: flex;
        gap: 12px;
        justify-content: center;
      ">
        <button class="btn-cancel" style="
          padding: 8px 16px;
          border: 1px solid #d1d5db;
          background: white;
          color: #374151;
          border-radius: 6px;
          cursor: pointer;
          font-size: 14px;
          transition: all 0.2s;
        ">Cancelar</button>
        <button class="btn-confirm" style="
          padding: 8px 16px;
          border: none;
          background: #ef4444;
          color: white;
          border-radius: 6px;
          cursor: pointer;
          font-size: 14px;
          transition: all 0.2s;
        ">Confirmar</button>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  // Event listeners
  const cancelBtn = modal.querySelector('.btn-cancel');
  const confirmBtn = modal.querySelector('.btn-confirm');
  
  const closeModal = () => {
    modal.remove();
  };
  
  cancelBtn.addEventListener('click', () => {
    closeModal();
    if (onCancel) onCancel();
  });
  
  confirmBtn.addEventListener('click', () => {
    closeModal();
    if (onConfirm) onConfirm();
  });
  
  // Cerrar al hacer clic fuera del modal
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
      if (onCancel) onCancel();
    }
  });
  
  // Cerrar con Escape
  const handleEscape = (e) => {
    if (e.key === 'Escape') {
      closeModal();
      if (onCancel) onCancel();
      document.removeEventListener('keydown', handleEscape);
    }
  };
  document.addEventListener('keydown', handleEscape);
};
