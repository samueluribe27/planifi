import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { formatCurrency, formatPercentage, formatDate, getCategoryIcon } from '../utils/formatters';
import { showSuccess, showError, showConfirmation } from '../utils/notifications';
import './Goals.css';

const Goals = () => {
  const { goals, addGoal, deleteGoal, updateGoal, categories } = useAppContext();

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    target: '',
    saved: '0',
    deadline: '',
    category: '',
    priority: 'medium'
  });

  // Estado para manejar las actualizaciones de progreso
  const [progressUpdates, setProgressUpdates] = useState({});

  const priorities = [
    { value: 'low', label: 'Baja', color: 'success' },
    { value: 'medium', label: 'Media', color: 'warning' },
    { value: 'high', label: 'Alta', color: 'danger' }
  ];

  const getPriorityInfo = (priority) => {
    return priorities.find(p => p.value === priority) || priorities[1];
  };

  const calculateProgress = (current, target) => {
    return target > 0 ? Math.min((current / target) * 100, 100) : 0;
  };

  const calculateDaysRemaining = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getStatusColor = (progress, daysRemaining) => {
    if (progress >= 100) return 'success';
    if (daysRemaining < 30) return 'danger';
    if (daysRemaining < 90) return 'warning';
    return 'info';
  };

  const getStatusText = (progress, daysRemaining) => {
    if (progress >= 100) return '¡Completada!';
    if (daysRemaining < 0) return 'Vencida';
    if (daysRemaining < 30) return 'Urgente';
    if (daysRemaining < 90) return 'Próxima';
    return 'En progreso';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.target || !formData.category || !formData.deadline) {
      showError('Por favor completa todos los campos requeridos');
      return;
    }

    const goal = {
      ...formData,
      target: parseFloat(formData.target),
      saved: parseFloat(formData.saved) || 0
    };

    addGoal(goal);
    setFormData({
      title: '',
      description: '',
      target: '',
      saved: '0',
      deadline: '',
      category: '',
      priority: 'medium'
    });
    setShowForm(false);
    showSuccess('Meta agregada exitosamente');
  };

  const handleDelete = async (id) => {
    const confirmed = await showConfirmation('¿Estás seguro de que quieres eliminar esta meta?');
    if (confirmed) {
      deleteGoal(id);
      showSuccess('Meta eliminada exitosamente');
    }
  };

  const handleUpdateProgress = (id, newAmount) => {
    const goal = goals.find(g => g.id === id);
    if (goal) {
      const updatedAmount = Math.min(newAmount, goal.target);
      updateGoal(id, { saved: updatedAmount });
      showSuccess('Progreso actualizado');
    }
  };

  const handleProgressInputChange = (goalId, value) => {
    setProgressUpdates(prev => ({
      ...prev,
      [goalId]: value
    }));
  };

  const handleProgressSubmit = (goalId) => {
    const value = progressUpdates[goalId];
    if (value !== undefined && value !== '') {
      handleUpdateProgress(goalId, parseFloat(value) || 0);
      setProgressUpdates(prev => {
        const newUpdates = { ...prev };
        delete newUpdates[goalId];
        return newUpdates;
      });
    }
  };

  const totalGoals = goals.length;
  const completedGoals = goals.filter(g => calculateProgress(g.saved, g.target) >= 100).length;
  const totalTargetAmount = goals.reduce((sum, goal) => sum + goal.target, 0);
  const totalCurrentAmount = goals.reduce((sum, goal) => sum + goal.saved, 0);
  const overallProgress = totalTargetAmount > 0 ? (totalCurrentAmount / totalTargetAmount) * 100 : 0;

  return (
    <div className="goals">
      <div className="goals-header">
        <div className="goals-title">
          <h1>Metas Financieras</h1>
          <p>Define y alcanza tus objetivos financieros</p>
        </div>
        
        <div className="goals-actions">
          <button 
            className="btn btn-primary"
            onClick={() => setShowForm(true)}
          >
            ➕ Nueva Meta
          </button>
        </div>
      </div>

      {/* Resumen de metas */}
      <div className="goals-summary">
        <div className="summary-card">
          <h3>Total Metas</h3>
          <p>{totalGoals}</p>
        </div>
        <div className="summary-card">
          <h3>Completadas</h3>
          <p>{completedGoals}</p>
        </div>
        <div className="summary-card">
          <h3>Meta Total</h3>
          <p>{formatCurrency(totalTargetAmount)}</p>
        </div>
        <div className="summary-card">
          <h3>Ahorrado</h3>
          <p>{formatCurrency(totalCurrentAmount)}</p>
        </div>
      </div>

      {/* Progreso general */}
      <div className="overall-progress-card">
        <h3>Progreso General</h3>
        <p className="progress-percentage">{formatPercentage(overallProgress)}</p>
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${overallProgress}%` }}
          ></div>
        </div>
      </div>

      {/* Formulario de nueva meta */}
      {showForm && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Nueva Meta Financiera</h2>
              <button 
                className="modal-close"
                onClick={() => setShowForm(false)}
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="goal-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Título *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    required
                    placeholder="Ej: Fondo de Emergencia"
                  />
                </div>
                
                <div className="form-group">
                  <label>Categoría *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    required
                  >
                    <option value="">Seleccionar categoría</option>
                    {categories.map((category, index) => (
                      <option key={`category-${index}`} value={category.name}>{category.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Descripción</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe tu meta..."
                  rows="3"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Meta de Ahorro *</label>
                  <input
                    type="number"
                    value={formData.target}
                    onChange={(e) => setFormData(prev => ({ ...prev, target: e.target.value }))}
                    required
                    min="0"
                    step="10000"
                    placeholder="Ej: 5000000"
                  />
                </div>
                
                <div className="form-group">
                  <label>Ahorrado Actual</label>
                  <input
                    type="number"
                    value={formData.saved}
                    onChange={(e) => setFormData(prev => ({ ...prev, saved: e.target.value }))}
                    min="0"
                    step="10000"
                    placeholder="Ej: 1000000"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Fecha Límite *</label>
                  <input
                    type="date"
                    value={formData.deadline}
                    onChange={(e) => setFormData(prev => ({ ...prev, deadline: e.target.value }))}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Prioridad</label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value }))}
                  >
                    {priorities.map(priority => (
                      <option key={priority.value} value={priority.value}>
                        {priority.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                  Crear Meta
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Lista de metas */}
      <div className="goals-list">
        {goals.length === 0 ? (
          <div className="empty-state">
            <p>No hay metas configuradas</p>
            <button 
              className="btn btn-primary"
              onClick={() => setShowForm(true)}
            >
              Crear primera meta
            </button>
          </div>
        ) : (
          goals.map((goal) => {
            const progress = calculateProgress(goal.saved, goal.target);
            const daysRemaining = calculateDaysRemaining(goal.deadline);
            const statusColor = getStatusColor(progress, daysRemaining);
            const statusText = getStatusText(progress, daysRemaining);
            const priorityInfo = getPriorityInfo(goal.priority);
            const currentProgressValue = progressUpdates[goal.id] || '';
            
            return (
              <div key={goal.id} className="goal-item">
                <div className="goal-header">
                  <div className="goal-info">
                    <span className="goal-icon">{getCategoryIcon(goal.category)}</span>
                    <div>
                      <h3>{goal.title}</h3>
                      {goal.description && <p>{goal.description}</p>}
                    </div>
                  </div>
                  <div className="goal-actions">
                    <span className={`priority-badge ${priorityInfo.color}`}>
                      {priorityInfo.label}
                    </span>
                    <button 
                      className="btn-delete"
                      onClick={() => handleDelete(goal.id)}
                      title="Eliminar meta"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
                
                <div className="goal-progress">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <span className="progress-text">{formatPercentage(progress)}</span>
                </div>

                <div className="goal-details">
                  <div className="goal-amounts">
                    <div className="amount-item">
                      <span className="amount-label">Meta:</span>
                      <span className="amount-value">{formatCurrency(goal.target)}</span>
                    </div>
                    <div className="amount-item">
                      <span className="amount-label">Ahorrado:</span>
                      <span className="amount-value">{formatCurrency(goal.saved)}</span>
                    </div>
                    <div className="amount-item">
                      <span className="amount-label">Faltante:</span>
                      <span className="amount-value">{formatCurrency(goal.target - goal.saved)}</span>
                    </div>
                  </div>
                  
                  <div className="goal-status">
                    <span className={`status-badge ${statusColor}`}>
                      {statusText}
                    </span>
                    <span className="deadline-info">
                      {formatDate(goal.deadline)} • {daysRemaining >= 0 ? `${daysRemaining} días` : `${Math.abs(daysRemaining)} días vencida`}
                    </span>
                  </div>
                </div>

                <div className="goal-update">
                  <input
                    type="number"
                    placeholder="Actualizar progreso"
                    min="0"
                    max={goal.target}
                    step="10000"
                    value={currentProgressValue}
                    onChange={(e) => handleProgressInputChange(goal.id, e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleProgressSubmit(goal.id);
                      }
                    }}
                  />
                  <button 
                    className="btn btn-secondary"
                    onClick={() => handleProgressSubmit(goal.id)}
                  >
                    Actualizar
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Goals;
