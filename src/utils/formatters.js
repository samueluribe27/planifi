/**
 * Utilidades para formateo de datos financieros
 */

/**
 * Formatea un número como moneda colombiana
 * @param {number} amount - Cantidad a formatear
 * @param {string} currency - Código de moneda (por defecto 'COP')
 * @returns {string} Cantidad formateada como moneda
 */
export const formatCurrency = (amount, currency = 'COP') => {
  if (amount === null || amount === undefined) return '$0';
  
  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  
  if (isNaN(numAmount)) return '$0';
  
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(numAmount);
};

/**
 * Formatea un número como porcentaje
 * @param {number} value - Valor a formatear
 * @param {number} decimals - Número de decimales (por defecto 1)
 * @returns {string} Valor formateado como porcentaje
 */
export const formatPercentage = (value, decimals = 1) => {
  if (value === null || value === undefined) return '0%';
  
  const numValue = typeof value === 'string' ? parseFloat(value) : value;
  
  if (isNaN(numValue)) return '0%';
  
  return `${numValue.toFixed(decimals)}%`;
};

/**
 * Formatea una fecha en formato legible
 * @param {string|Date} date - Fecha a formatear
 * @param {string} locale - Locale para formateo (por defecto 'es-CO')
 * @returns {string} Fecha formateada
 */
export const formatDate = (date) => {
  if (!date) return '';
  
  const dateObj = new Date(date);
  
  if (isNaN(dateObj.getTime())) return '';
  
  return new Intl.DateTimeFormat('es-CO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(dateObj);
};

/**
 * Formatea una fecha en formato corto
 * @param {string|Date} date - Fecha a formatear
 * @param {string} locale - Locale para formateo (por defecto 'es-CO')
 * @returns {string} Fecha formateada en formato corto
 */
export const formatShortDate = (date) => {
  if (!date) return '';
  
  const dateObj = new Date(date);
  
  if (isNaN(dateObj.getTime())) return '';
  
  return new Intl.DateTimeFormat('es-CO', {
    month: 'short',
    day: 'numeric'
  }).format(dateObj);
};

/**
 * Formatea un número con separadores de miles
 * @param {number} number - Número a formatear
 * @returns {string} Número formateado
 */
export const formatNumber = (number) => {
  if (number === null || number === undefined) return '0';
  
  const numValue = typeof number === 'string' ? parseFloat(number) : number;
  
  if (isNaN(numValue)) return '0';
  
  return new Intl.NumberFormat('es-CO').format(numValue);
};

// Función para crear fechas en formato local sin problemas de zona horaria
export const createLocalDate = (dateString = null) => {
  if (dateString) {
    // Si se proporciona una fecha, convertirla a formato local
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  } else {
    // Si no se proporciona fecha, usar la fecha actual en formato local
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
};

// Función para convertir fecha local a ISO string preservando la fecha local
export const localDateToISO = (dateString) => {
  if (!dateString) return new Date().toISOString();
  
  // Crear fecha en zona horaria local
  const [year, month, day] = dateString.split('-').map(Number);
  const date = new Date(year, month - 1, day, 12, 0, 0); // Usar mediodía para evitar problemas de zona horaria
  
  return date.toISOString();
};

/**
 * Obtiene el color apropiado para un tipo de transacción
 * @param {string} type - Tipo de transacción ('income' o 'expense')
 * @returns {string} Clase CSS para el color
 */
export const getTransactionColor = (type) => {
  switch (type) {
    case 'income':
      return '#22c55e'; // Verde para ingresos
    case 'expense':
      return '#ef4444'; // Rojo para gastos
    default:
      return '#6b7280'; // Gris por defecto
  }
};

/**
 * Obtiene el icono apropiado para una categoría
 * @param {string} category - Categoría de la transacción
 * @returns {string} Emoji del icono
 */
export const getCategoryIcon = (category) => {
  const categoryIcons = {
    'Trabajo': '💼',
    'Freelance': '💻',
    'Inversiones': '📈',
    'Alimentación': '🍽️',
    'Transporte': '🚗',
    'Entretenimiento': '🎬',
    'Servicios': '🏠',
    'Salud': '🏥',
    'Educación': '📚',
    'Ropa': '👕',
    'Viajes': '✈️',
    'Ahorros': '💰',
    'Tecnología': '💻',
    'Otros': '📦'
  };
  
  return categoryIcons[category] || '📦';
};
