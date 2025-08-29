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
  
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

/**
 * Formatea un número como porcentaje
 * @param {number} value - Valor a formatear
 * @param {number} decimals - Número de decimales (por defecto 1)
 * @returns {string} Valor formateado como porcentaje
 */
export const formatPercentage = (value, decimals = 1) => {
  if (value === null || value === undefined) return '0%';
  
  return new Intl.NumberFormat('es-CO', {
    style: 'percent',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(value / 100);
};

/**
 * Formatea una fecha en formato legible
 * @param {string|Date} date - Fecha a formatear
 * @param {string} locale - Locale para formateo (por defecto 'es-CO')
 * @returns {string} Fecha formateada
 */
export const formatDate = (date, locale = 'es-CO') => {
  if (!date) return '';
  
  const dateObj = new Date(date);
  
  return new Intl.DateTimeFormat(locale, {
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
export const formatShortDate = (date, locale = 'es-CO') => {
  if (!date) return '';
  
  const dateObj = new Date(date);
  
  return new Intl.DateTimeFormat(locale, {
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
  
  return new Intl.NumberFormat('es-CO').format(number);
};

/**
 * Obtiene el color apropiado para un tipo de transacción
 * @param {string} type - Tipo de transacción ('income' o 'expense')
 * @returns {string} Clase CSS para el color
 */
export const getTransactionColor = (type) => {
  return type === 'income' ? 'positive' : 'negative';
};

/**
 * Obtiene el icono apropiado para una categoría
 * @param {string} category - Categoría de la transacción
 * @returns {string} Emoji del icono
 */
export const getCategoryIcon = (category) => {
  const icons = {
    'Trabajo': '💼',
    'Alimentación': '🛒',
    'Transporte': '🚗',
    'Entretenimiento': '🎮',
    'Salud': '🏥',
    'Educación': '📚',
    'Vivienda': '🏠',
    'Servicios': '⚡',
    'Ropa': '👕',
    'Viajes': '✈️',
    'Inversiones': '📈',
    'Otros': '💰'
  };
  
  return icons[category] || '💰';
};
