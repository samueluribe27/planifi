import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { formatCurrency, getCategoryIcon } from '../utils/formatters';
import './Dashboard.css';

const Dashboard = () => {
  const [currentPeriod, setCurrentPeriod] = useState('month');
  const { 
    getTotalIncome, 
    getTotalExpenses, 
    getTotalSavings, 
    getTotalBudgetSpent, 
    getTotalBudgetLimit,
    getRecentTransactions,
    transactions,
    budgets,
    goals
  } = useAppContext();

  // Calcular métricas reales desde el estado global
  const totalIncome = getTotalIncome(currentPeriod);
  const totalExpenses = getTotalExpenses(currentPeriod);
  const totalSavings = getTotalSavings();
  const balance = totalIncome - totalExpenses;
  const budgetProgress = getTotalBudgetLimit() > 0 ? 
    Math.round((getTotalBudgetSpent() / getTotalBudgetLimit()) * 100) : 0;
  const recentTransactions = getRecentTransactions(5);



  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="dashboard-title">
          <h1>Dashboard</h1>
          <p className="welcome-message">
            ¡Bienvenido a Planifi! Tu aplicación de finanzas personales está lista para ayudarte a alcanzar tus metas financieras.
          </p>
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
            <p className="metric-value">{formatCurrency(balance)}</p>
            <span className="metric-change positive">+12.5% vs mes anterior</span>
          </div>
        </div>

        <div className="metric-card income">
          <div className="metric-icon">📈</div>
          <div className="metric-content">
            <h3>Ingresos</h3>
            <p className="metric-value">{formatCurrency(totalIncome)}</p>
            <span className="metric-change positive">+8.2% vs mes anterior</span>
          </div>
        </div>

        <div className="metric-card expenses">
          <div className="metric-icon">📉</div>
          <div className="metric-content">
            <h3>Gastos</h3>
            <p className="metric-value">{formatCurrency(totalExpenses)}</p>
            <span className="metric-change negative">+5.1% vs mes anterior</span>
          </div>
        </div>

        <div className="metric-card savings">
          <div className="metric-icon">🎯</div>
          <div className="metric-content">
            <h3>Ahorros</h3>
            <p className="metric-value">{formatCurrency(totalSavings)}</p>
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
                style={{ width: `${budgetProgress}%` }}
              ></div>
              </div>
              <span className="progress-text">{budgetProgress}% utilizado</span>
            </div>
            <div className="budget-details">
              <div className="budget-item">
                <span>Presupuesto mensual:</span>
                <span>{formatCurrency(getTotalBudgetLimit())}</span>
              </div>
              <div className="budget-item">
                <span>Gastado:</span>
                <span>{formatCurrency(getTotalBudgetSpent())}</span>
              </div>
              <div className="budget-item">
                <span>Restante:</span>
                <span>{formatCurrency(getTotalBudgetLimit() - getTotalBudgetSpent())}</span>
              </div>
            </div>
          </div>

          <div className="recent-transactions-card">
            <div className="card-header">
              <h3>Transacciones Recientes</h3>
              <button className="btn btn-secondary btn-sm">Ver todas</button>
            </div>
            
            <div className="transactions-list">
                             {recentTransactions.map((transaction, index) => (
                                 <div key={`${transaction.id}-${index}`} className="transaction-item">
                  <div className="transaction-icon">
                    {getCategoryIcon(transaction.category)}
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
