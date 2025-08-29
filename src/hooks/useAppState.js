import { useState, useEffect } from 'react';

// Estado inicial de la aplicación
const initialState = {
  user: {
    name: 'Juan Pérez',
    email: 'juan@example.com',
    avatar: 'https://via.placeholder.com/32x32/3B82F6/FFFFFF?text=JP',
    currency: 'COP',
    language: 'es',
    timezone: 'America/Bogota',
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
  },
  transactions: [
    {
      id: 1,
      type: 'expense',
      category: 'Alimentación',
      description: 'Supermercado',
      amount: 150000,
      date: '2024-01-15',
      tags: ['comida', 'necesario']
    },
    {
      id: 2,
      type: 'income',
      category: 'Salario',
      description: 'Salario mensual',
      amount: 2500000,
      date: '2024-01-01',
      tags: ['ingreso', 'fijo']
    },
    {
      id: 3,
      type: 'expense',
      category: 'Transporte',
      description: 'Gasolina',
      amount: 80000,
      date: '2024-01-14',
      tags: ['transporte', 'necesario']
    },
    {
      id: 4,
      type: 'expense',
      category: 'Entretenimiento',
      description: 'Cine',
      amount: 25000,
      date: '2024-01-13',
      tags: ['entretenimiento', 'ocio']
    },
    {
      id: 5,
      type: 'income',
      category: 'Freelance',
      description: 'Proyecto web',
      amount: 500000,
      date: '2024-01-10',
      tags: ['ingreso', 'variable']
    }
  ],
  budgets: [
    {
      id: 1,
      category: 'Alimentación',
      limit: 300000,
      spent: 150000,
      icon: '🍽️',
      color: '#10B981'
    },
    {
      id: 2,
      category: 'Transporte',
      limit: 200000,
      spent: 80000,
      icon: '🚗',
      color: '#3B82F6'
    },
    {
      id: 3,
      category: 'Entretenimiento',
      limit: 100000,
      spent: 25000,
      icon: '🎬',
      color: '#8B5CF6'
    },
    {
      id: 4,
      category: 'Vivienda',
      limit: 800000,
      spent: 800000,
      icon: '🏠',
      color: '#F59E0B'
    },
    {
      id: 5,
      category: 'Salud',
      limit: 150000,
      spent: 75000,
      icon: '🏥',
      color: '#EF4444'
    },
    {
      id: 6,
      category: 'Educación',
      limit: 200000,
      spent: 120000,
      icon: '📚',
      color: '#06B6D4'
    }
  ],
  goals: [
    {
      id: 1,
      title: 'Vacaciones en Europa',
      target: 5000000,
      saved: 2500000,
      deadline: '2024-12-31',
      priority: 'high',
      icon: '✈️',
      color: '#10B981',
      description: 'Ahorrar para viajar a Europa por 2 semanas'
    },
    {
      id: 2,
      title: 'Fondo de Emergencia',
      target: 3000000,
      saved: 1800000,
      deadline: '2024-06-30',
      priority: 'high',
      icon: '🛡️',
      color: '#3B82F6',
      description: 'Crear un fondo de emergencia de 6 meses de gastos'
    },
    {
      id: 3,
      title: 'Nuevo Laptop',
      target: 2500000,
      saved: 800000,
      deadline: '2024-09-30',
      priority: 'medium',
      icon: '💻',
      color: '#8B5CF6',
      description: 'Comprar un laptop para trabajo y estudio'
    },
    {
      id: 4,
      title: 'Inversión en Criptomonedas',
      target: 1000000,
      saved: 300000,
      deadline: '2024-12-31',
      priority: 'low',
      icon: '₿',
      color: '#F59E0B',
      description: 'Diversificar inversiones con criptomonedas'
    }
  ],
  categories: [
    { name: 'Alimentación', icon: '🍽️', color: '#10B981', type: 'expense' },
    { name: 'Transporte', icon: '🚗', color: '#3B82F6', type: 'expense' },
    { name: 'Entretenimiento', icon: '🎬', color: '#8B5CF6', type: 'expense' },
    { name: 'Vivienda', icon: '🏠', color: '#F59E0B', type: 'expense' },
    { name: 'Salud', icon: '🏥', color: '#EF4444', type: 'expense' },
    { name: 'Educación', icon: '📚', color: '#06B6D4', type: 'expense' },
    { name: 'Salario', icon: '💰', color: '#10B981', type: 'income' },
    { name: 'Freelance', icon: '💼', color: '#3B82F6', type: 'income' },
    { name: 'Inversiones', icon: '📈', color: '#8B5CF6', type: 'income' },
    { name: 'Otros', icon: '📦', color: '#6B7280', type: 'both' }
  ]
};

// Función para cargar datos desde localStorage
const loadFromStorage = (key, defaultValue) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error loading ${key} from localStorage:`, error);
    return defaultValue;
  }
};

// Función para guardar datos en localStorage
const saveToStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
  }
};

export const useAppState = () => {
  const [state, setState] = useState(() => ({
    user: loadFromStorage('user', initialState.user),
    transactions: loadFromStorage('transactions', initialState.transactions),
    budgets: loadFromStorage('budgets', initialState.budgets),
    goals: loadFromStorage('goals', initialState.goals),
    categories: loadFromStorage('categories', initialState.categories)
  }));

  // Guardar cambios en localStorage cuando el estado cambie
  useEffect(() => {
    saveToStorage('user', state.user);
  }, [state.user]);

  useEffect(() => {
    saveToStorage('transactions', state.transactions);
  }, [state.transactions]);

  useEffect(() => {
    saveToStorage('budgets', state.budgets);
  }, [state.budgets]);

  useEffect(() => {
    saveToStorage('goals', state.goals);
  }, [state.goals]);

  useEffect(() => {
    saveToStorage('categories', state.categories);
  }, [state.categories]);

  // Funciones para actualizar el estado
  const updateUser = (updates) => {
    setState(prev => ({
      ...prev,
      user: { ...prev.user, ...updates }
    }));
  };

  const addTransaction = (transaction) => {
    const newTransaction = {
      ...transaction,
      id: Date.now() + Math.random(),
      date: transaction.date || new Date().toISOString().split('T')[0]
    };
    
    setState(prev => ({
      ...prev,
      transactions: [newTransaction, ...prev.transactions]
    }));
  };

  const updateTransaction = (id, updates) => {
    setState(prev => ({
      ...prev,
      transactions: prev.transactions.map(transaction =>
        transaction.id === id ? { ...transaction, ...updates } : transaction
      )
    }));
  };

  const deleteTransaction = (id) => {
    setState(prev => ({
      ...prev,
      transactions: prev.transactions.filter(transaction => transaction.id !== id)
    }));
  };

  const addBudget = (budget) => {
    const newBudget = {
      ...budget,
      id: Date.now() + Math.random(),
      spent: budget.spent || 0
    };
    
    setState(prev => ({
      ...prev,
      budgets: [...prev.budgets, newBudget]
    }));
  };

  const updateBudget = (id, updates) => {
    setState(prev => ({
      ...prev,
      budgets: prev.budgets.map(budget =>
        budget.id === id ? { ...budget, ...updates } : budget
      )
    }));
  };

  const deleteBudget = (id) => {
    setState(prev => ({
      ...prev,
      budgets: prev.budgets.filter(budget => budget.id !== id)
    }));
  };

  const addGoal = (goal) => {
    const newGoal = {
      ...goal,
      id: Date.now() + Math.random(),
      saved: goal.saved || 0
    };
    
    setState(prev => ({
      ...prev,
      goals: [...prev.goals, newGoal]
    }));
  };

  const updateGoal = (id, updates) => {
    setState(prev => ({
      ...prev,
      goals: prev.goals.map(goal =>
        goal.id === id ? { ...goal, ...updates } : goal
      )
    }));
  };

  const deleteGoal = (id) => {
    setState(prev => ({
      ...prev,
      goals: prev.goals.filter(goal => goal.id !== id)
    }));
  };

  const addCategory = (category) => {
    const newCategory = {
      ...category,
      id: Date.now() + Math.random()
    };
    
    setState(prev => ({
      ...prev,
      categories: [...prev.categories, newCategory]
    }));
  };

  // Funciones de utilidad para cálculos
  const getTotalIncome = (period = 'month') => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    
    return state.transactions
      .filter(transaction => {
        const transactionDate = new Date(transaction.date);
        return transaction.type === 'income' && 
               transactionDate.getMonth() === currentMonth &&
               transactionDate.getFullYear() === currentYear;
      })
      .reduce((total, transaction) => total + transaction.amount, 0);
  };

  const getTotalExpenses = (period = 'month') => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    
    return state.transactions
      .filter(transaction => {
        const transactionDate = new Date(transaction.date);
        return transaction.type === 'expense' && 
               transactionDate.getMonth() === currentMonth &&
               transactionDate.getFullYear() === currentYear;
      })
      .reduce((total, transaction) => total + transaction.amount, 0);
  };

  const getTotalSavings = () => {
    return state.goals.reduce((total, goal) => total + goal.saved, 0);
  };

  const getTotalBudgetSpent = () => {
    return state.budgets.reduce((total, budget) => total + budget.spent, 0);
  };

  const getTotalBudgetLimit = () => {
    return state.budgets.reduce((total, budget) => total + budget.limit, 0);
  };

  const getTransactionsByCategory = (category) => {
    return state.transactions.filter(transaction => transaction.category === category);
  };

  const getRecentTransactions = (limit = 5) => {
    return state.transactions
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, limit);
  };

  const resetToDefaults = () => {
    setState(initialState);
    // Limpiar localStorage
    Object.keys(initialState).forEach(key => {
      localStorage.removeItem(key);
    });
  };

  return {
    // Estado
    user: state.user,
    transactions: state.transactions,
    budgets: state.budgets,
    goals: state.goals,
    categories: state.categories,
    
    // Funciones de actualización
    updateUser,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    addBudget,
    updateBudget,
    deleteBudget,
    addGoal,
    updateGoal,
    deleteGoal,
    addCategory,
    
    // Funciones de cálculo
    getTotalIncome,
    getTotalExpenses,
    getTotalSavings,
    getTotalBudgetSpent,
    getTotalBudgetLimit,
    getTransactionsByCategory,
    getRecentTransactions,
    
    // Utilidades
    resetToDefaults
  };
};
