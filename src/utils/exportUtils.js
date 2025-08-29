// Funciones de utilidad para exportar datos
import { formatCurrency, formatDate } from './formatters';

export const exportToCSV = (data, filename) => {
  if (!data || data.length === 0) {
    alert('No hay datos para exportar');
    return;
  }

  // Obtener las columnas del primer objeto
  const columns = Object.keys(data[0]);
  
  // Crear el encabezado CSV
  const header = columns.join(',');
  
  // Crear las filas de datos
  const rows = data.map(item => 
    columns.map(column => {
      const value = item[column];
      // Escapar comillas y envolver en comillas si contiene comas
      const escapedValue = String(value).replace(/"/g, '""');
      return `"${escapedValue}"`;
    }).join(',')
  );
  
  // Combinar encabezado y filas
  const csvContent = [header, ...rows].join('\n');
  
  // Crear y descargar el archivo
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportTransactionsToCSV = (transactions) => {
  const formattedData = transactions.map(t => ({
    Fecha: formatDate(t.date),
    Descripción: t.description,
    Categoría: t.category,
    Tipo: t.type === 'income' ? 'Ingreso' : 'Gasto',
    Monto: formatCurrency(t.amount),
    ID: t.id
  }));
  
  exportToCSV(formattedData, 'transacciones');
};

export const exportBudgetsToCSV = (budgets) => {
  const formattedData = budgets.map(b => ({
    Categoría: b.category,
    Límite: formatCurrency(b.limit),
    Gastado: formatCurrency(b.spent),
    Restante: formatCurrency(b.limit - b.spent),
    Porcentaje: `${Math.round((b.spent / b.limit) * 100)}%`
  }));
  
  exportToCSV(formattedData, 'presupuestos');
};

export const exportGoalsToCSV = (goals) => {
  const formattedData = goals.map(g => ({
    Título: g.title,
    Descripción: g.description || '',
    Meta: formatCurrency(g.target),
    Ahorrado: formatCurrency(g.saved),
    Progreso: `${Math.round((g.saved / g.target) * 100)}%`,
    Fecha_Límite: formatDate(g.deadline),
    Prioridad: g.priority,
    Estado: g.saved >= g.target ? 'Completada' : 'En progreso'
  }));
  
  exportToCSV(formattedData, 'metas');
};

export const exportFinancialReport = (transactions, budgets, goals) => {
  const report = {
    Resumen: {
      'Total Transacciones': transactions.length,
      'Total Ingresos': formatCurrency(transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0)),
      'Total Gastos': formatCurrency(transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + Math.abs(t.amount), 0)),
      'Total Presupuestos': budgets.length,
      'Total Metas': goals.length,
      'Fecha de Exportación': new Date().toLocaleDateString('es-CO')
    }
  };
  
  // Convertir el reporte a formato CSV
  const reportData = Object.entries(report.Resumen).map(([key, value]) => ({
    Métrica: key,
    Valor: value
  }));
  
  exportToCSV(reportData, 'reporte_financiero');
};
