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
