// Funciones de utilidad para gráficos y visualizaciones

// Función para generar datos de gráfico de líneas
export const generateLineChartData = (transactions, period = 'month') => {
  const data = {};
  
  transactions.forEach(transaction => {
    let key;
    const date = new Date(transaction.date);
    
    switch (period) {
      case 'week':
        key = `${date.getFullYear()}-W${Math.ceil((date.getDate() + date.getDay()) / 7)}`;
        break;
      case 'month':
        key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        break;
      case 'year':
        key = date.getFullYear().toString();
        break;
      default:
        key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    }
    
    if (!data[key]) {
      data[key] = { income: 0, expenses: 0 };
    }
    
    if (transaction.type === 'income') {
      data[key].income += transaction.amount;
    } else {
      data[key].expenses += transaction.amount;
    }
  });
  
  return Object.entries(data).map(([period, values]) => ({
    period,
    income: values.income,
    expenses: values.expenses,
    balance: values.income - values.expenses
  }));
};

// Función para generar datos de gráfico de dona
export const generateDoughnutChartData = (transactions, type = 'category') => {
  const data = {};
  
  transactions.forEach(transaction => {
    let key;
    
    if (type === 'category') {
      key = transaction.category;
    } else if (type === 'type') {
      key = transaction.type === 'income' ? 'Ingresos' : 'Gastos';
    }
    
    if (!data[key]) {
      data[key] = 0;
    }
    
    data[key] += transaction.amount;
  });
  
  return Object.entries(data).map(([label, value]) => ({
    label,
    value,
    percentage: 0 // Se calculará después
  }));
};

// Función para generar datos de gráfico de barras
export const generateBarChartData = (transactions, categories) => {
  const data = {};
  
  // Inicializar todas las categorías
  categories.forEach(category => {
    data[category.name] = { budget: category.limit || 0, spent: 0 };
  });
  
  // Agregar gastos por categoría
  transactions.forEach(transaction => {
    if (transaction.type === 'expense' && data[transaction.category]) {
      data[transaction.category].spent += transaction.amount;
    }
  });
  
  return Object.entries(data).map(([category, values]) => ({
    category,
    budget: values.budget,
    spent: values.spent,
    remaining: values.budget - values.spent,
    percentage: values.budget > 0 ? (values.spent / values.budget) * 100 : 0
  }));
};

// Función para generar datos de gráfico de progreso de metas
export const generateGoalsProgressData = (goals) => {
  return goals.map(goal => ({
    title: goal.title,
    saved: goal.saved,
    target: goal.target,
    percentage: goal.target > 0 ? (goal.saved / goal.target) * 100 : 0,
    remaining: goal.target - goal.saved,
    color: goal.color || '#3b82f6'
  }));
};

// Función para generar datos de resumen financiero
export const generateFinancialSummary = (transactions, budgets, goals) => {
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const totalBudget = budgets.reduce((sum, b) => sum + b.limit, 0);
  const totalSpent = budgets.reduce((sum, b) => sum + b.spent, 0);
  const totalGoals = goals.reduce((sum, g) => sum + g.target, 0);
  const totalSaved = goals.reduce((sum, g) => sum + g.saved, 0);
  
  return {
    income: totalIncome,
    expenses: totalExpenses,
    balance: totalIncome - totalExpenses,
    savingsRate: totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome) * 100 : 0,
    budgetUtilization: totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0,
    goalsProgress: totalGoals > 0 ? (totalSaved / totalGoals) * 100 : 0
  };
};

// Función para generar colores para gráficos
export const generateChartColors = (count) => {
  const colors = [
    '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6',
    '#06b6d4', '#84cc16', '#f97316', '#ec4899', '#6366f1',
    '#14b8a6', '#fbbf24', '#f87171', '#a855f7', '#0ea5e9'
  ];
  
  return colors.slice(0, count);
};

// Función para formatear datos para gráficos
export const formatChartData = (data, type) => {
  switch (type) {
    case 'line':
      return {
        labels: data.map(d => d.period),
        datasets: [
          {
            label: 'Ingresos',
            data: data.map(d => d.income),
            borderColor: '#10b981',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            tension: 0.4
          },
          {
            label: 'Gastos',
            data: data.map(d => d.expenses),
            borderColor: '#ef4444',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            tension: 0.4
          }
        ]
      };
      
    case 'doughnut':
      const colors = generateChartColors(data.length);
      return {
        labels: data.map(d => d.label),
        datasets: [{
          data: data.map(d => d.value),
          backgroundColor: colors,
          borderWidth: 2,
          borderColor: '#ffffff'
        }]
      };
      
    case 'bar':
      return {
        labels: data.map(d => d.category),
        datasets: [
          {
            label: 'Presupuesto',
            data: data.map(d => d.budget),
            backgroundColor: 'rgba(59, 130, 246, 0.8)',
            borderColor: '#3b82f6',
            borderWidth: 1
          },
          {
            label: 'Gastado',
            data: data.map(d => d.spent),
            backgroundColor: 'rgba(239, 68, 68, 0.8)',
            borderColor: '#ef4444',
            borderWidth: 1
          }
        ]
      };
      
    default:
      return data;
  }
};

// Función para generar opciones de configuración de gráficos
export const generateChartOptions = (type, title = '') => {
  const baseOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 20,
          color: 'var(--text-primary)'
        }
      },
      title: {
        display: !!title,
        text: title,
        color: 'var(--text-primary)',
        font: {
          size: 16,
          weight: 'bold'
        }
      }
    }
  };
  
  switch (type) {
    case 'line':
      return {
        ...baseOptions,
        scales: {
          x: {
            grid: {
              color: 'var(--border-color)'
            },
            ticks: {
              color: 'var(--text-secondary)'
            }
          },
          y: {
            grid: {
              color: 'var(--border-color)'
            },
            ticks: {
              color: 'var(--text-secondary)',
              callback: function(value) {
                return '$' + value.toLocaleString();
              }
            }
          }
        }
      };
      
    case 'doughnut':
      return {
        ...baseOptions,
        plugins: {
          ...baseOptions.plugins,
          tooltip: {
            callbacks: {
              label: function(context) {
                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                const percentage = ((context.parsed / total) * 100).toFixed(1);
                return `${context.label}: $${context.parsed.toLocaleString()} (${percentage}%)`;
              }
            }
          }
        }
      };
      
    case 'bar':
      return {
        ...baseOptions,
        scales: {
          x: {
            grid: {
              color: 'var(--border-color)'
            },
            ticks: {
              color: 'var(--text-secondary)'
            }
          },
          y: {
            grid: {
              color: 'var(--border-color)'
            },
            ticks: {
              color: 'var(--text-secondary)',
              callback: function(value) {
                return '$' + value.toLocaleString();
              }
            }
          }
        }
      };
      
    default:
      return baseOptions;
  }
};

// Función para generar estadísticas de tendencias
export const generateTrendStats = (transactions, period = 'month') => {
  const data = generateLineChartData(transactions, period);
  
  if (data.length < 2) {
    return {
      incomeTrend: 0,
      expensesTrend: 0,
      balanceTrend: 0
    };
  }
  
  const current = data[data.length - 1];
  const previous = data[data.length - 2];
  
  const calculateTrend = (current, previous) => {
    if (previous === 0) return current > 0 ? 100 : 0;
    return ((current - previous) / previous) * 100;
  };
  
  return {
    incomeTrend: calculateTrend(current.income, previous.income),
    expensesTrend: calculateTrend(current.expenses, previous.expenses),
    balanceTrend: calculateTrend(current.balance, previous.balance)
  };
};
