import React from 'react';
import { useAppContext } from '../context/AppContext';
import { formatCurrency, formatShortDate } from '../utils/formatters';
import './Dashboard.css';

const Dashboard = () => {
  const { transactions, budgets, goals, getTotalIncome, getTotalExpenses, getTotalSavings } = useAppContext();

  const totalIncome = getTotalIncome();
  const totalExpenses = getTotalExpenses();
  const totalSavings = getTotalSavings();
  const balance = totalIncome - totalExpenses;

  // Ordenar transacciones por fecha (más recientes primero)
  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="dashboard-title">
          <h1>Dashboard</h1>
          <p>Bienvenido a Planifi - Tu gestor de finanzas personales</p>
        </div>
      </div>

      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-icon income">📈</div>
          <div className="metric-content">
            <h3>Ingresos Totales</h3>
            <p className="metric-value">{formatCurrency(totalIncome)}</p>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon expense">📉</div>
          <div className="metric-content">
            <h3>Gastos Totales</h3>
            <p className="metric-value">{formatCurrency(totalExpenses)}</p>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon savings">🎯</div>
          <div className="metric-content">
            <h3>Ahorros Totales</h3>
            <p className="metric-value">{formatCurrency(totalSavings)}</p>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon balance">💰</div>
          <div className="metric-content">
            <h3>Balance Neto</h3>
            <p className="metric-value">{formatCurrency(balance)}</p>
          </div>
        </div>
      </div>

      <div className="content-grid">
        <div className="recent-transactions-card">
          <h3>Transacciones Recientes</h3>
          <div className="transactions-list">
            {recentTransactions.length === 0 ? (
              <div className="empty-state">
                <p>No hay transacciones recientes</p>
              </div>
            ) : (
              recentTransactions.map((transaction) => (
                <div key={transaction.id} className="transaction-item">
                  <div className="transaction-info">
                    <div className="transaction-main">
                      <span className="transaction-title">{transaction.title}</span>
                      <span className="transaction-date">{formatShortDate(transaction.date)}</span>
                    </div>
                    <span className="transaction-category">{transaction.category}</span>
                  </div>
                  <span className={`transaction-amount ${transaction.type}`}>
                    {transaction.type === 'income' ? '+' : '-'}{formatCurrency(Math.abs(transaction.amount))}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="budget-progress-card">
          <h3>Presupuestos</h3>
          <div className="budgets-list">
            {budgets.length === 0 ? (
              <div className="empty-state">
                <p>No hay presupuestos configurados</p>
              </div>
            ) : (
              budgets.slice(0, 3).map((budget) => {
                const percentage = budget.limit > 0 ? (budget.spent / budget.limit) * 100 : 0;
                return (
                  <div key={budget.id} className="budget-item">
                    <div className="budget-header">
                      <span className="budget-category">{budget.category}</span>
                      <span className="budget-amount">
                        {formatCurrency(budget.spent)} / {formatCurrency(budget.limit)}
                      </span>
                    </div>
                    <div className="budget-progress">
                      <div 
                        className="budget-progress-fill" 
                        style={{ width: `${Math.min(percentage, 100)}%` }}
                      ></div>
                    </div>
                    <span className="budget-percentage">{percentage.toFixed(1)}%</span>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
