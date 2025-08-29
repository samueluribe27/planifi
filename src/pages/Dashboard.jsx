import React, { useState } from 'react';
import './Dashboard.css';

const Dashboard = () => {
  const [currentPeriod, setCurrentPeriod] = useState('month');

  // Datos de ejemplo para las métricas
  const financialData = {
    balance: 15420.50,
    income: 8500.00,
    expenses: 3200.75,
    savings: 5300.00,
    budgetProgress: 68,
    recentTransactions: [
      { id: 1, description: 'Salario', amount: 8500.00, type: 'income', date: '2024-01-15', category: 'Trabajo' },
      { id: 2, description: 'Supermercado', amount: -120.50, type: 'expense', date: '2024-01-14', category: 'Alimentación' },
      { id: 3, description: 'Gasolina', amount: -45.00, type: 'expense', date: '2024-01-13', category: 'Transporte' },
      { id: 4, description: 'Freelance', amount: 1200.00, type: 'income', date: '2024-01-12', category: 'Trabajo' },
      { id: 5, description: 'Restaurante', amount: -85.00, type: 'expense', date: '2024-01-11', category: 'Entretenimiento' }
    ]
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getTransactionIcon = (category) => {
    const icons = {
      'Trabajo': '💼',
      'Alimentación': '🛒',
      'Transporte': '🚗',
      'Entretenimiento': '🎮',
      'Salud': '🏥',
      'Educación': '📚'
    };
    return icons[category] || '💰';
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="dashboard-title">
          <h1>Dashboard</h1>
          <p>Resumen de tus finanzas personales</p>
        </div>
        
        <div className="period-selector">
          <select 
            value={currentPeriod} 
            onChange={(e) => setCurrentPeriod(e.target.value)}
            className="period-select"
          >
            <option value="week">Esta semana</option>
            <option value="month">Este mes</option>
            <option value="quarter">Este trimestre</option>
            <option value="year">Este año</option>
          </select>
        </div>
      </div>

      <div className="metrics-grid">
        <div className="metric-card balance">
          <div className="metric-icon">💰</div>
          <div className="metric-content">
            <h3>Balance Total</h3>
            <p className="metric-value">{formatCurrency(financialData.balance)}</p>
            <span className="metric-change positive">+12.5% vs mes anterior</span>
          </div>
        </div>

        <div className="metric-card income">
          <div className="metric-icon">📈</div>
          <div className="metric-content">
            <h3>Ingresos</h3>
            <p className="metric-value">{formatCurrency(financialData.income)}</p>
            <span className="metric-change positive">+8.2% vs mes anterior</span>
          </div>
        </div>

        <div className="metric-card expenses">
          <div className="metric-icon">📉</div>
          <div className="metric-content">
            <h3>Gastos</h3>
            <p className="metric-value">{formatCurrency(financialData.expenses)}</p>
            <span className="metric-change negative">+5.1% vs mes anterior</span>
          </div>
        </div>

        <div className="metric-card savings">
          <div className="metric-icon">🎯</div>
          <div className="metric-content">
            <h3>Ahorros</h3>
            <p className="metric-value">{formatCurrency(financialData.savings)}</p>
            <span className="metric-change positive">+15.3% vs mes anterior</span>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="content-grid">
          <div className="budget-progress-card">
            <h3>Progreso del Presupuesto</h3>
            <div className="progress-container">
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${financialData.budgetProgress}%` }}
                ></div>
              </div>
              <span className="progress-text">{financialData.budgetProgress}% utilizado</span>
            </div>
            <div className="budget-details">
              <div className="budget-item">
                <span>Presupuesto mensual:</span>
                <span>{formatCurrency(50000)}</span>
              </div>
              <div className="budget-item">
                <span>Gastado:</span>
                <span>{formatCurrency(34000)}</span>
              </div>
              <div className="budget-item">
                <span>Restante:</span>
                <span>{formatCurrency(16000)}</span>
              </div>
            </div>
          </div>

          <div className="recent-transactions-card">
            <div className="card-header">
              <h3>Transacciones Recientes</h3>
              <button className="btn btn-secondary btn-sm">Ver todas</button>
            </div>
            
            <div className="transactions-list">
              {financialData.recentTransactions.map((transaction) => (
                <div key={transaction.id} className="transaction-item">
                  <div className="transaction-icon">
                    {getTransactionIcon(transaction.category)}
                  </div>
                  <div className="transaction-details">
                    <h4>{transaction.description}</h4>
                    <p>{transaction.category} • {new Date(transaction.date).toLocaleDateString('es-CO')}</p>
                  </div>
                  <div className={`transaction-amount ${transaction.type}`}>
                    {transaction.type === 'income' ? '+' : ''}{formatCurrency(transaction.amount)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
