import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { formatCurrency, formatPercentage } from '../utils/formatters';
import { showSuccess, showError, showConfirmation } from '../utils/notifications';
import './Budget.css';

const Budget = () => {
  const { budgets, categories, addBudget, deleteBudget } = useAppContext();
  
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    category: '',
    limit: '',
    period: 'month'
  });

  const expenseCategories = categories.filter(cat => cat.type === 'expense');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.category || !formData.limit) {
      showError('Por favor completa todos los campos requeridos');
      return;
    }

    const budget = {
      ...formData,
      limit: parseFloat(formData.limit),
      spent: 0
    };

    addBudget(budget);
    setFormData({
      category: '',
      limit: '',
      period: 'month'
    });
    setShowForm(false);
    showSuccess('Presupuesto agregado exitosamente');
  };

  const handleDelete = async (id) => {
    const confirmed = await showConfirmation('¿Estás seguro de que quieres eliminar este presupuesto?');
    if (confirmed) {
      deleteBudget(id);
      showSuccess('Presupuesto eliminado exitosamente');
    }
  };

  const getProgressColor = (percentage) => {
    if (percentage >= 90) return '#ef4444'; // Rojo
    if (percentage >= 75) return '#f59e0b'; // Amarillo
    return '#22c55e'; // Verde
  };

  const getProgressStatus = (percentage) => {
    if (percentage >= 100) return 'Excedido';
    if (percentage >= 90) return 'Crítico';
    if (percentage >= 75) return 'Atención';
    return 'Bien';
  };

  return (
    <div className="budget">
      <div className="budget-header">
        <div className="budget-title">
          <h1>Presupuesto</h1>
          <p>Gestiona tus límites de gasto por categoría</p>
        </div>
        
        <div className="budget-actions">
          <button 
            className="btn btn-primary"
            onClick={() => setShowForm(true)}
          >
            ➕ Nuevo Presupuesto
          </button>
        </div>
      </div>

      {/* Resumen de presupuestos */}
      <div className="budget-summary">
        <div className="summary-card">
          <h3>Total Presupuestado</h3>
          <p>{formatCurrency(budgets.reduce((sum, b) => sum + b.limit, 0))}</p>
        </div>
        <div className="summary-card">
          <h3>Total Gastado</h3>
          <p>{formatCurrency(budgets.reduce((sum, b) => sum + b.spent, 0))}</p>
        </div>
        <div className="summary-card">
          <h3>Restante</h3>
          <p>{formatCurrency(budgets.reduce((sum, b) => sum + (b.limit - b.spent), 0))}</p>
        </div>
      </div>

      {/* Formulario de nuevo presupuesto */}
      {showForm && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Nuevo Presupuesto</h2>
              <button 
                className="modal-close"
                onClick={() => setShowForm(false)}
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="budget-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Categoría *</label>
                  <select 
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    required
                  >
                    <option value="">Seleccionar categoría</option>
                    {expenseCategories.map((category, index) => (
                      <option key={`expense-${index}`} value={category.name}>{category.name}</option>
                    ))}
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Límite *</label>
                  <input 
                    type="number" 
                    value={formData.limit}
                    onChange={(e) => setFormData(prev => ({ ...prev, limit: e.target.value }))}
                    placeholder="0"
                    min="0"
                    step="10000"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Período</label>
                  <select 
                    value={formData.period}
                    onChange={(e) => setFormData(prev => ({ ...prev, period: e.target.value }))}
                  >
                    <option value="week">Semanal</option>
                    <option value="month">Mensual</option>
                    <option value="quarter">Trimestral</option>
                    <option value="year">Anual</option>
                  </select>
                </div>
              </div>

              <div className="form-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                  Guardar Presupuesto
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Lista de presupuestos */}
      <div className="budgets-list">
        {budgets.length === 0 ? (
          <div className="empty-state">
            <p>No hay presupuestos configurados</p>
            <button 
              className="btn btn-primary"
              onClick={() => setShowForm(true)}
            >
              Crear primer presupuesto
            </button>
          </div>
        ) : (
          budgets.map((budget) => {
            const percentage = budget.limit > 0 ? (budget.spent / budget.limit) * 100 : 0;
            const remaining = budget.limit - budget.spent;
            
            return (
              <div key={budget.id} className="budget-item">
                <div className="budget-header">
                  <div className="budget-info">
                    <h3>{budget.category}</h3>
                    <span className="budget-period">{budget.period === 'month' ? 'Mensual' : budget.period}</span>
                  </div>
                  <div className="budget-status">
                    <span 
                      className="status-badge"
                      style={{ backgroundColor: getProgressColor(percentage) }}
                    >
                      {getProgressStatus(percentage)}
                    </span>
                  </div>
                </div>

                <div className="budget-progress">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill"
                      style={{ 
                        width: `${Math.min(percentage, 100)}%`,
                        backgroundColor: getProgressColor(percentage)
                      }}
                    ></div>
                  </div>
                  <span className="progress-text">{formatPercentage(percentage)}</span>
                </div>

                <div className="budget-details">
                  <div className="budget-amounts">
                    <div className="amount-item">
                      <span className="amount-label">Gastado:</span>
                      <span className="amount-value">{formatCurrency(budget.spent)}</span>
                    </div>
                    <div className="amount-item">
                      <span className="amount-label">Límite:</span>
                      <span className="amount-value">{formatCurrency(budget.limit)}</span>
                    </div>
                    <div className="amount-item">
                      <span className="amount-label">Restante:</span>
                      <span className={`amount-value ${remaining < 0 ? 'negative' : ''}`}>
                        {formatCurrency(remaining)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="budget-actions">
                    <button 
                      className="btn-delete"
                      onClick={() => handleDelete(budget.id)}
                      title="Eliminar presupuesto"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Budget;
