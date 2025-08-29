import { useState, useEffect } from 'react';

const initialState = {
  user: {
    name: 'Usuario',
    email: 'usuario@ejemplo.com',
    currency: 'USD',
    language: 'es'
  },
  transactions: [
    {
      id: 1,
      title: 'Salario',
      amount: 5000,
      type: 'income',
      category: 'Trabajo',
      date: new Date().toISOString(),
      description: 'Salario mensual'
    },
    {
      id: 2,
      title: 'Supermercado',
      amount: -200,
      type: 'expense',
      category: 'Alimentación',
      date: new Date().toISOString(),
      description: 'Compra semanal'
    },
    {
      id: 3,
      title: 'Gasolina',
      amount: -80,
      type: 'expense',
      category: 'Transporte',
      date: new Date().toISOString(),
      description: 'Combustible'
    },
    {
      id: 4,
      title: 'Freelance',
      amount: 800,
      type: 'income',
      category: 'Trabajo',
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      description: 'Proyecto freelance'
    },
    {
      id: 5,
      title: 'Restaurante',
      amount: -120,
      type: 'expense',
      category: 'Entretenimiento',
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      description: 'Cena con amigos'
    }
  ],
  budgets: [
    {
      id: 1,
      category: 'Alimentación',
      limit: 500,
      spent: 200,
      period: 'month'
    },
    {
      id: 2,
      category: 'Transporte',
      limit: 300,
      spent: 80,
      period: 'month'
    },
    {
      id: 3,
      category: 'Entretenimiento',
      limit: 200,
      spent: 120,
      period: 'month'
    },
    {
      id: 4,
      category: 'Servicios',
      limit: 400,
      spent: 150,
      period: 'month'
    }
  ],
  goals: [
    {
      id: 1,
      title: 'Vacaciones',
      target: 5000,
      saved: 2000,
      deadline: new Date(Date.now() + 6 * 30 * 24 * 60 * 60 * 1000).toISOString(),
      category: 'Viajes'
    },
    {
      id: 2,
      title: 'Fondo de Emergencia',
      target: 10000,
      saved: 3500,
      deadline: new Date(Date.now() + 12 * 30 * 24 * 60 * 60 * 1000).toISOString(),
      category: 'Ahorros'
    },
    {
      id: 3,
      title: 'Nuevo Laptop',
      target: 2000,
      saved: 800,
      deadline: new Date(Date.now() + 4 * 30 * 24 * 60 * 60 * 1000).toISOString(),
      category: 'Tecnología'
    }
  ],
  categories: [
    { name: 'Trabajo', icon: '💼', color: '#10b981', type: 'income' },
    { name: 'Freelance', icon: '💻', color: '#3b82f6', type: 'income' },
    { name: 'Inversiones', icon: '📈', color: '#f59e0b', type: 'income' },
    { name: 'Alimentación', icon: '🍽️', color: '#ef4444', type: 'expense' },
    { name: 'Transporte', icon: '🚗', color: '#8b5cf6', type: 'expense' },
    { name: 'Entretenimiento', icon: '🎬', color: '#ec4899', type: 'expense' },
    { name: 'Servicios', icon: '🏠', color: '#06b6d4', type: 'expense' },
    { name: 'Salud', icon: '🏥', color: '#84cc16', type: 'expense' },
    { name: 'Educación', icon: '📚', color: '#f97316', type: 'expense' },
    { name: 'Ropa', icon: '👕', color: '#6366f1', type: 'expense' }
  ]
};

export const useAppState = () => {
  const [state, setState] = useState(() => {
    const savedState = localStorage.getItem('planifi-state');
    return savedState ? JSON.parse(savedState) : initialState;
  });

  // Guardar estado en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem('planifi-state', JSON.stringify(state));
  }, [state]);

  // Funciones para transacciones
  const addTransaction = (transaction) => {
    const newTransaction = {
      ...transaction,
      id: Date.now() + Math.random(),
      date: transaction.date || new Date().toISOString()
    };
    setState(prev => ({
      ...prev,
      transactions: [...prev.transactions, newTransaction]
    }));
  };

  const updateTransaction = (id, updates) => {
    setState(prev => ({
      ...prev,
      transactions: prev.transactions.map(t => 
        t.id === id ? { ...t, ...updates } : t
      )
    }));
  };

  const deleteTransaction = (id) => {
    setState(prev => ({
      ...prev,
      transactions: prev.transactions.filter(t => t.id !== id)
    }));
  };

  // Funciones para presupuestos
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
      budgets: prev.budgets.map(b => 
        b.id === id ? { ...b, ...updates } : b
      )
    }));
  };

  const deleteBudget = (id) => {
    setState(prev => ({
      ...prev,
      budgets: prev.budgets.filter(b => b.id !== id)
    }));
  };

  // Funciones para metas
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
      goals: prev.goals.map(g => 
        g.id === id ? { ...g, ...updates } : g
      )
    }));
  };

  const deleteGoal = (id) => {
    setState(prev => ({
      ...prev,
      goals: prev.goals.filter(g => g.id !== id)
    }));
  };

  // Funciones para usuario
  const updateUser = (updates) => {
    setState(prev => ({
      ...prev,
      user: { ...prev.user, ...updates }
    }));
  };

  // Funciones de utilidad
  const getTotalIncome = () => {
    return state.transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
  };

  const getTotalExpenses = () => {
    return state.transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);
  };

  const getTotalSavings = () => {
    return state.goals.reduce((sum, goal) => sum + goal.saved, 0);
  };

  const getBalance = () => {
    return getTotalIncome() - getTotalExpenses();
  };

  const getSavingsRate = () => {
    const income = getTotalIncome();
    return income > 0 ? (getTotalSavings() / income) * 100 : 0;
  };

  return {
    // Estado
    user: state.user,
    transactions: state.transactions,
    budgets: state.budgets,
    goals: state.goals,
    categories: state.categories,

    // Funciones de transacciones
    addTransaction,
    updateTransaction,
    deleteTransaction,

    // Funciones de presupuestos
    addBudget,
    updateBudget,
    deleteBudget,

    // Funciones de metas
    addGoal,
    updateGoal,
    deleteGoal,

    // Funciones de usuario
    updateUser,

    // Funciones de utilidad
    getTotalIncome,
    getTotalExpenses,
    getTotalSavings,
    getBalance,
    getSavingsRate
  };
};
