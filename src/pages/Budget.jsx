import React, { useState } from 'react';
import { formatCurrency, formatPercentage, getCategoryIcon } from '../utils/formatters';
import './Budget.css';

const Budget = () => {
  const [budgets, setBudgets] = useState([
    {
      id: 1,
      category: 'Alimentación',
      budget: 800000,
      spent: 650000,
      icon: '🛒'
    },
    {
      id: 2,
      category: 'Transporte',
      budget: 300000,
      spent: 280000,
      icon: '🚗'
    },
    {
      id: 3,
      category: 'Entretenimiento',
      budget: 200000,
      spent: 150000,
      icon: '🎮'
    },
    {
      id: 4,
      category: 'Vivienda',
      budget: 1200000,
      spent: 1200000,
      icon: '🏠'
    },
    {
      id: 5,
      category: 'Salud',
      budget: 150000,
      spent: 80000,
      icon: '🏥'
    },
    {
      id: 6,
      category: 'Educación',
      budget: 500000,
      spent: 300000,
      icon: '📚'
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newBudget, setNewBudget] = useState({
    category: '',
    budget: '',
    spent: 0
  });

  const categories = [
    'Trabajo', 'Alimentación', 'Transporte', 'Entretenimiento', 
    'Salud', 'Educación', 'Vivienda', 'Servicios', 'Ropa', 
    'Viajes', 'Inversiones', 'Otros'
  ];

  const totalBudget = budgets.reduce((sum, budget) => sum + budget.budget, 0);
  const totalSpent = budgets.reduce((sum, budget) => sum + budget.spent, 0);
  const totalRemaining = totalBudget - totalSpent;
  const overallProgress = (totalSpent / totalBudget) * 100;

  const handleAddBudget = (e) => {
    e.preventDefault();
    const budget = {
      id: Date.now(),
      ...newBudget,
      budget: parseFloat(newBudget.budget),
      spent: parseFloat(newBudget.spent),
      icon: getCategoryIcon(newBudget.category)
    };
    
    setBudgets([...budgets, budget]);
    setNewBudget({
      category: '',
      budget: '',
      spent: 0
    });
    setShowAddForm(false);
  };

  const handleDeleteBudget = (id) => {
    setBudgets(budgets.filter(b => b.id !== id));
  };

  const getProgressColor = (percentage) => {
    if (percentage >= 90) return 'danger';
    if (percentage >= 75) return 'warning';
    return 'success';
  };

  const getProgressStatus = (percentage) => {
    if (percentage >= 90) return '¡Cuidado!';
    if (percentage >= 75) return 'Atención';
    return 'Bien';
  };

  return (
    <div className="budget-page">
      <div className="budget-header">
        <div className="page-title">
          <h1>Presupuesto</h1>
          <p>Gestiona y controla tus gastos por categoría</p>
        </div>
        
        <div className="header-actions">
          <button 
            className="btn btn-primary"
            onClick={() => setShowAddForm(true)}
          >
            + Nueva Categoría
          </button>
        </div>
      </div>

      <div className="budget-overview">
        <div className="overview-card total-budget">
          <h3>Presupuesto Total</h3>
          <p>{formatCurrency(totalBudget)}</p>
        </div>
        <div className="overview-card total-spent">
          <h3>Gastado</h3>
          <p>{formatCurrency(totalSpent)}</p>
        </div>
        <div className="overview-card total-remaining">
          <h3>Restante</h3>
          <p>{formatCurrency(totalRemaining)}</p>
        </div>
        <div className="overview-card progress-overall">
          <h3>Progreso General</h3>
          <p>{formatPercentage(overallProgress)}</p>
          <div className="progress-bar">
            <div 
              className={`progress-fill ${getProgressColor(overallProgress)}`}
              style={{ width: `${Math.min(overallProgress, 100)}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="budget-categories">
        <div className="categories-header">
          <h3>Categorías de Presupuesto</h3>
          <p>{budgets.length} categorías configuradas</p>
        </div>
        
        <div className="categories-grid">
          {budgets.map(budget => {
            const percentage = (budget.spent / budget.budget) * 100;
            const remaining = budget.budget - budget.spent;
            
            return (
              <div key={budget.id} className="budget-card">
                <div className="budget-header">
                  <div className="category-info">
                    <span className="category-icon">{budget.icon}</span>
                    <div>
                      <h4>{budget.category}</h4>
                      <span className={`status ${getProgressColor(percentage)}`}>
                        {getProgressStatus(percentage)}
                      </span>
                    </div>
                  </div>
                  <button 
                    className="btn-icon"
                    onClick={() => handleDeleteBudget(budget.id)}
                    title="Eliminar categoría"
                  >
                    🗑️
                  </button>
                </div>
                
                <div className="budget-amounts">
                  <div className="amount-row">
                    <span>Presupuesto:</span>
                    <span>{formatCurrency(budget.budget)}</span>
                  </div>
                  <div className="amount-row">
                    <span>Gastado:</span>
                    <span>{formatCurrency(budget.spent)}</span>
                  </div>
                  <div className="amount-row">
                    <span>Restante:</span>
                    <span className={remaining < 0 ? 'negative' : ''}>
                      {formatCurrency(remaining)}
                    </span>
                  </div>
                </div>
                
                <div className="budget-progress">
                  <div className="progress-info">
                    <span>{formatPercentage(percentage)}</span>
                    <span>{formatCurrency(budget.spent)} / {formatCurrency(budget.budget)}</span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className={`progress-fill ${getProgressColor(percentage)}`}
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal para agregar categoría */}
      {showAddForm && (
        <div className="modal-overlay" onClick={() => setShowAddForm(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Nueva Categoría de Presupuesto</h3>
              <button 
                className="btn-icon"
                onClick={() => setShowAddForm(false)}
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={handleAddBudget} className="budget-form">
              <div className="form-group">
                <label>Categoría</label>
                <select
                  value={newBudget.category}
                  onChange={(e) => setNewBudget({...newBudget, category: e.target.value})}
                  required
                >
                  <option value="">Selecciona una categoría</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              <div className="form-group">
                <label>Presupuesto Mensual</label>
                <input
                  type="number"
                  value={newBudget.budget}
                  onChange={(e) => setNewBudget({...newBudget, budget: e.target.value})}
                  required
                  min="0"
                  step="1000"
                  placeholder="Ej: 500000"
                />
              </div>
              
              <div className="form-group">
                <label>Gastado hasta ahora</label>
                <input
                  type="number"
                  value={newBudget.spent}
                  onChange={(e) => setNewBudget({...newBudget, spent: e.target.value})}
                  min="0"
                  step="1000"
                  placeholder="Ej: 150000"
                />
              </div>
              
              <div className="form-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setShowAddForm(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                  Agregar Categoría
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Budget;
