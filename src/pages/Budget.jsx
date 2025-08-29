import React, { useState } from 'react';

// Estilos CSS del componente, integrados para una funcionalidad autónoma
const style = `
  :root {
    --bg-primary: #ffffff;
    --bg-secondary: #f3f4f6;
    --border-color: #e5e7eb;
    --text-primary: #111827;
    --text-secondary: #6b7280;
    --primary-color: #3b82f6;
    --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }

  [data-theme="dark"] {
    --bg-primary: #1f2937;
    --bg-secondary: #374151;
    --border-color: #4b5563;
    --text-primary: #f3f4f6;
    --text-secondary: #d1d5db;
    --primary-color: #60a5fa;
  }

  /* Estilos Generales de la Página */
  .budget-page {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
    color: var(--text-primary);
  }

  /* Estilos del Encabezado */
  .budget-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .page-title h1 {
    font-size: 2rem;
    font-weight: 700;
    margin: 0;
  }

  .page-title p {
    font-size: 1rem;
    color: var(--text-secondary);
    margin: 0;
  }

  .btn {
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    border: 1px solid transparent;
  }

  .btn-primary {
    background-color: var(--primary-color);
    color: white;
  }

  .btn-primary:hover {
    background-color: #2563eb;
  }

  .btn-secondary {
    background: var(--bg-secondary);
    color: var(--text-primary);
    border: 1px solid var(--border-color);
  }

  .btn-secondary:hover {
    background: #e5e7eb;
  }

  /* Estilos de la Vista General del Presupuesto */
  .budget-overview {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
  }

  .overview-card {
    background: var(--bg-primary);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: var(--shadow-sm);
  }

  .overview-card h3 {
    font-size: 1rem;
    color: var(--text-secondary);
    margin: 0 0 0.5rem 0;
  }

  .overview-card p {
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0;
  }

  .progress-overall .progress-bar {
    margin-top: 1rem;
  }

  /* Estilos de la Lista de Categorías de Presupuesto */
  .budget-categories {
    background: var(--bg-primary);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: var(--shadow-sm);
  }

  .categories-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    border-bottom: 1px solid var(--border-color);
    padding-bottom: 1rem;
  }

  .categories-header h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin: 0;
  }

  .categories-header p {
    color: var(--text-secondary);
    font-size: 0.875rem;
    margin: 0;
  }

  .categories-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
  }

  .budget-card {
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    padding: 1.5rem;
    transition: all 0.2s ease;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .budget-card:hover {
    box-shadow: var(--shadow-md);
  }

  .budget-card .budget-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 0;
  }

  .category-info {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .category-icon {
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background: #e0e7ff;
    border-radius: 50%;
  }
  
  .status {
    font-size: 0.875rem;
    font-weight: 600;
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
  }

  .status.success {
    color: #059669;
    background: rgba(16, 185, 129, 0.1);
  }

  .status.warning {
    color: #d97706;
    background: rgba(245, 158, 11, 0.1);
  }

  .status.danger {
    color: #dc2626;
    background: rgba(239, 68, 68, 0.1);
  }

  .budget-card h4 {
    margin: 0;
    font-size: 1rem;
    font-weight: 600;
    color: var(--text-primary);
  }

  .budget-card .btn-icon {
    background: none;
    border: none;
    font-size: 1.25rem;
    cursor: pointer;
    color: var(--text-secondary);
    transition: color 0.2s ease;
  }

  .budget-card .btn-icon:hover {
    color: var(--text-primary);
  }

  .budget-amounts {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    font-size: 0.875rem;
    color: var(--text-secondary);
  }

  .amount-row {
    display: flex;
    justify-content: space-between;
  }

  .amount-row span:last-child {
    font-weight: 600;
    color: var(--text-primary);
  }

  .amount-row .negative {
    color: #ef4444;
  }

  /* Estilos de la Barra de Progreso */
  .progress-bar {
    width: 100%;
    height: 8px;
    background: var(--border-color);
    border-radius: 9999px;
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    transition: width 0.3s ease;
  }

  .progress-fill.success {
    background: #10b981;
  }

  .progress-fill.warning {
    background: #f59e0b;
  }

  .progress-fill.danger {
    background: #ef4444;
  }
  
  .progress-info {
    display: flex;
    justify-content: space-between;
    font-size: 0.75rem;
    color: var(--text-secondary);
    margin-bottom: 0.5rem;
  }

  .progress-info span:last-child {
    font-weight: 600;
    color: var(--text-primary);
  }

  /* Estilos del Modal */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }

  .modal-content {
    background: var(--bg-primary);
    padding: 2rem;
    border-radius: 12px;
    width: 100%;
    max-width: 500px;
    box-shadow: var(--shadow-md);
    position: relative;
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
  }

  .modal-header h3 {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 600;
  }
  
  .budget-form .form-group {
    margin-bottom: 1rem;
  }

  .budget-form label {
    display: block;
    margin-bottom: 0.5rem;
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--text-secondary);
  }

  .budget-form input,
  .budget-form select {
    width: 100%;
    padding: 10px;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    background: var(--bg-secondary);
    color: var(--text-primary);
  }

  .budget-form input:focus,
  .budget-form select:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
  }

  .form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 2rem;
  }

  /* Responsivo */
  @media (max-width: 768px) {
    .budget-page {
      padding: 1rem;
    }

    .budget-header {
      flex-direction: column;
      align-items: flex-start;
    }

    .page-title h1 {
      font-size: 1.75rem;
    }

    .budget-overview {
      grid-template-columns: 1fr;
    }

    .modal-content {
      padding: 1.5rem;
      max-width: 90%;
    }
  }
`;

// Simulación de utilidades y contexto para que el componente sea autónomo.
const formatCurrency = (value) => {
  return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(value);
};

const formatPercentage = (value) => {
  return `${Math.round(value)}%`;
};

const getCategoryIcon = (category) => {
  switch (category) {
    case 'Alimentación': return '🍔';
    case 'Transporte': return '🚗';
    case 'Servicios': return '🏠';
    case 'Entretenimiento': return '🎬';
    case 'Compras': return '🛍️';
    case 'Salud': return '💊';
    default: return '💸';
  }
};

const useAppContext = () => {
  const [budgets, setBudgets] = useState([
    { id: 'b1', category: 'Alimentación', limit: 800000, spent: 750000, icon: '🍔' },
    { id: 'b2', category: 'Transporte', limit: 300000, spent: 280000, icon: '🚗' },
    { id: 'b3', category: 'Servicios', limit: 250000, spent: 150000, icon: '🏠' },
    { id: 'b4', category: 'Entretenimiento', limit: 150000, spent: 180000, icon: '🎬' },
  ]);

  const categories = [
    { name: 'Alimentación' },
    { name: 'Transporte' },
    { name: 'Servicios' },
    { name: 'Entretenimiento' },
    { name: 'Compras' },
    { name: 'Salud' },
  ];
  
  const addBudget = (budget) => {
    setBudgets(prevBudgets => [...prevBudgets, { ...budget, id: Date.now().toString() }]);
  };

  const deleteBudget = (id) => {
    setBudgets(prevBudgets => prevBudgets.filter(b => b.id !== id));
  };
  
  return { budgets, addBudget, deleteBudget, categories };
};

// El componente principal `Budget` para la página de gestión de presupuestos.
const Budget = () => {
  // `useAppContext` obtiene los datos y las funciones de gestión de presupuestos del contexto global.
  const { budgets, addBudget, deleteBudget, categories } = useAppContext();

  // Estados locales para controlar la visibilidad del formulario de adición y los datos del nuevo presupuesto.
  const [showAddForm, setShowAddForm] = useState(false);
  const [newBudget, setNewBudget] = useState({
    category: '',
    budget: '',
    spent: 0
  });

  // Cálculos de resumen del presupuesto general.
  const totalBudget = budgets.reduce((sum, budget) => sum + budget.limit, 0);
  const totalSpent = budgets.reduce((sum, budget) => sum + budget.spent, 0);
  const totalRemaining = totalBudget - totalSpent;
  const overallProgress = totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0;

  // Maneja el envío del formulario para agregar un nuevo presupuesto.
  const handleAddBudget = (e) => {
    e.preventDefault();
    const budget = {
      ...newBudget,
      limit: parseFloat(newBudget.budget),
      spent: parseFloat(newBudget.spent) || 0,
      icon: getCategoryIcon(newBudget.category),
      color: '#3B82F6' // Color de ejemplo, podría ser dinámico
    };
    
    addBudget(budget);
    setNewBudget({
      category: '',
      budget: '',
      spent: 0
    });
    setShowAddForm(false);
  };

  // Maneja la eliminación de un presupuesto.
  const handleDeleteBudget = (id) => {
    deleteBudget(id);
  };

  // Determina el color de la barra de progreso en función del porcentaje.
  const getProgressColor = (percentage) => {
    if (percentage >= 90) return 'danger';
    if (percentage >= 75) return 'warning';
    return 'success';
  };

  // Determina el estado del progreso en texto.
  const getProgressStatus = (percentage) => {
    if (percentage >= 90) return '¡Cuidado!';
    if (percentage >= 75) return 'Atención';
    return 'Bien';
  };

  // La función principal de renderizado del componente.
  return (
    <>
      <style>{style}</style>
      <div className="budget-page">
        {/* Sección del encabezado de la página */}
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

        {/* Sección de la vista general del presupuesto */}
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

        {/* Sección de las categorías de presupuesto */}
        <div className="budget-categories">
          <div className="categories-header">
            <h3>Categorías de Presupuesto</h3>
            <p>{budgets.length} categorías configuradas</p>
          </div>
          
          <div className="categories-grid">
            {budgets.map((budget, index) => {
              const percentage = (budget.spent / budget.limit) * 100;
              const remaining = budget.limit - budget.spent;
              
              return (
                <div key={`${budget.id}-${index}`} className="budget-card">
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
                      <span>{formatCurrency(budget.limit)}</span>
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
                      <span>{formatCurrency(budget.spent)} / {formatCurrency(budget.limit)}</span>
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

        {/* Modal para agregar categoría (se muestra condicionalmente) */}
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
                    {categories.map((category, index) => (
                      <option key={`${category.name}-${index}`} value={category.name}>{category.name}</option>
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
    </>
  );
};

export default Budget;
