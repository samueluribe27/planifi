import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { formatCurrency, formatPercentage, formatDate } from '../utils/formatters';
import './Goals.css';

const Goals = () => {
  const { goals, addGoal, deleteGoal } = useAppContext();

  const [showAddForm, setShowAddForm] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    targetAmount: '',
    currentAmount: '0',
    deadline: '',
    category: 'Ahorro',
    priority: 'medium'
  });



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

  const handleAddGoal = (e) => {
    e.preventDefault();
    const goal = {
      ...newGoal,
      target: parseFloat(newGoal.targetAmount),
      saved: parseFloat(newGoal.currentAmount) || 0,
      icon: getGoalIcon(newGoal.category),
      color: '#3B82F6'
    };
    
    addGoal(goal);
    setNewGoal({
      title: '',
      description: '',
      targetAmount: '',
      currentAmount: '0',
      deadline: '',
      category: 'Ahorro',
      priority: 'medium'
    });
    setShowAddForm(false);
  };

  const handleDeleteGoal = (id) => {
    deleteGoal(id);
  };

  const handleUpdateProgress = (id, newAmount) => {
    setGoals(goals.map(goal => 
      goal.id === id 
        ? { ...goal, currentAmount: Math.min(newAmount, goal.targetAmount) }
        : goal
    ));
  };

  const getGoalIcon = (category) => {
    const icons = {
      'Ahorro': '💰',
      'Viajes': '✈️',
      'Vivienda': '🏠',
      'Educación': '📚',
      'Inversiones': '📈',
      'Negocio': '💼',
      'Salud': '🏥',
      'Entretenimiento': '🎮',
      'Otros': '🎯'
    };
    return icons[category] || '🎯';
  };

  const totalGoals = goals.length;
  const completedGoals = goals.filter(g => calculateProgress(g.currentAmount, g.targetAmount) >= 100).length;
  const totalTargetAmount = goals.reduce((sum, goal) => sum + goal.target, 0);
  const totalCurrentAmount = goals.reduce((sum, goal) => sum + goal.saved, 0);
  const overallProgress = totalTargetAmount > 0 ? (totalCurrentAmount / totalTargetAmount) * 100 : 0;

  return (
    <div className="goals-page">
      <div className="goals-header">
        <div className="page-title">
          <h1>Metas Financieras</h1>
          <p>Define y alcanza tus objetivos financieros</p>
        </div>
        
        <div className="header-actions">
          <button 
            className="btn btn-primary"
            onClick={() => setShowAddForm(true)}
          >
            + Nueva Meta
          </button>
        </div>
      </div>

      <div className="goals-overview">
        <div className="overview-card total-goals">
          <h3>Total Metas</h3>
          <p>{totalGoals}</p>
        </div>
        <div className="overview-card completed-goals">
          <h3>Completadas</h3>
          <p>{completedGoals}</p>
        </div>
        <div className="overview-card total-target">
          <h3>Meta Total</h3>
          <p>{formatCurrency(totalTargetAmount)}</p>
        </div>
        <div className="overview-card total-saved">
          <h3>Ahorrado</h3>
          <p>{formatCurrency(totalCurrentAmount)}</p>
        </div>
        <div className="overview-card overall-progress">
          <h3>Progreso General</h3>
          <p>{formatPercentage(overallProgress)}</p>
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${overallProgress}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="goals-list">
        <div className="list-header">
          <h3>Mis Metas ({goals.length})</h3>
        </div>
        
        <div className="goals-grid">
          {goals.map(goal => {
            const progress = calculateProgress(goal.saved, goal.target);
            const daysRemaining = calculateDaysRemaining(goal.deadline);
            const statusColor = getStatusColor(progress, daysRemaining);
            const statusText = getStatusText(progress, daysRemaining);
            const priorityInfo = getPriorityInfo(goal.priority);
            
            return (
              <div key={goal.id} className="goal-card">
                <div className="goal-header">
                  <div className="goal-info">
                    <span className="goal-icon">{goal.icon}</span>
                    <div>
                      <h4>{goal.title}</h4>
                      <p>{goal.description}</p>
                    </div>
                  </div>
                  <div className="goal-actions">
                    <span className={`priority-badge ${priorityInfo.color}`}>
                      {priorityInfo.label}
                    </span>
                    <button 
                      className="btn-icon"
                      onClick={() => handleDeleteGoal(goal.id)}
                      title="Eliminar meta"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
                
                <div className="goal-details">
                  <div className="amount-info">
                    <div className="amount-row">
                      <span>Meta:</span>
                      <span>{formatCurrency(goal.target)}</span>
                    </div>
                    <div className="amount-row">
                      <span>Ahorrado:</span>
                      <span>{formatCurrency(goal.saved)}</span>
                    </div>
                    <div className="amount-row">
                      <span>Faltante:</span>
                      <span>{formatCurrency(goal.target - goal.saved)}</span>
                    </div>
                  </div>
                  
                  <div className="progress-section">
                    <div className="progress-info">
                      <span>{formatPercentage(progress)}</span>
                      <span className={`status ${statusColor}`}>
                        {statusText}
                      </span>
                    </div>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="deadline-info">
                    <span>Fecha límite: {formatDate(goal.deadline)}</span>
                    <span className={daysRemaining < 30 ? 'urgent' : ''}>
                      {daysRemaining >= 0 ? `${daysRemaining} días restantes` : `${Math.abs(daysRemaining)} días vencida`}
                    </span>
                  </div>
                  
                  <div className="update-progress">
                    <input
                      type="number"
                      placeholder="Actualizar progreso"
                      min="0"
                      max={goal.target}
                      step="1000"
                      onChange={(e) => handleUpdateProgress(goal.id, parseFloat(e.target.value) || 0)}
                    />
                    <button className="btn btn-secondary btn-sm">
                      Actualizar
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal para agregar meta */}
      {showAddForm && (
        <div className="modal-overlay" onClick={() => setShowAddForm(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Nueva Meta Financiera</h3>
              <button 
                className="btn-icon"
                onClick={() => setShowAddForm(false)}
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={handleAddGoal} className="goal-form">
              <div className="form-group">
                <label>Título de la Meta</label>
                <input
                  type="text"
                  value={newGoal.title}
                  onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
                  required
                  placeholder="Ej: Fondo de Emergencia"
                />
              </div>
              
              <div className="form-group">
                <label>Descripción</label>
                <textarea
                  value={newGoal.description}
                  onChange={(e) => setNewGoal({...newGoal, description: e.target.value})}
                  required
                  placeholder="Describe tu meta..."
                  rows="3"
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Meta de Ahorro</label>
                  <input
                    type="number"
                    value={newGoal.targetAmount}
                    onChange={(e) => setNewGoal({...newGoal, targetAmount: e.target.value})}
                    required
                    min="0"
                    step="1000"
                    placeholder="Ej: 5000000"
                  />
                </div>
                
                <div className="form-group">
                  <label>Ahorrado Actual</label>
                  <input
                    type="number"
                    value={newGoal.currentAmount}
                    onChange={(e) => setNewGoal({...newGoal, currentAmount: e.target.value})}
                    min="0"
                    step="1000"
                    placeholder="Ej: 1000000"
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Categoría</label>
                  <select
                    value={newGoal.category}
                    onChange={(e) => setNewGoal({...newGoal, category: e.target.value})}
                    required
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Prioridad</label>
                  <select
                    value={newGoal.priority}
                    onChange={(e) => setNewGoal({...newGoal, priority: e.target.value})}
                    required
                  >
                    {priorities.map(priority => (
                      <option key={priority.value} value={priority.value}>
                        {priority.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="form-group">
                <label>Fecha Límite</label>
                <input
                  type="date"
                  value={newGoal.deadline}
                  onChange={(e) => setNewGoal({...newGoal, deadline: e.target.value})}
                  required
                />
              </div>
              
              <div className="form-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setShowAddForm(false)}>
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
    </div>
  );
};

export default Goals;
