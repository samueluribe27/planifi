import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { formatCurrency, formatPercentage, formatDate } from '../utils/formatters';
import './Reports.css';

const Reports = () => {
  const { transactions, budgets, goals } = useAppContext();
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedReport, setSelectedReport] = useState('overview');

  const periods = [
    { value: 'week', label: 'Esta Semana' },
    { value: 'month', label: 'Este Mes' },
    { value: 'quarter', label: 'Este Trimestre' },
    { value: 'year', label: 'Este Año' }
  ];

  const reports = [
    { value: 'overview', label: 'Resumen General' },
    { value: 'income', label: 'Análisis de Ingresos' },
    { value: 'expenses', label: 'Análisis de Gastos' },
    { value: 'savings', label: 'Análisis de Ahorros' }
  ];

  // Calcular datos reales desde el estado global
  const getTotalIncome = (period) => {
    return transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
  };

  const getTotalExpenses = (period) => {
    return transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);
  };

  const getTotalSavings = () => {
    return goals.reduce((sum, goal) => sum + goal.saved, 0);
  };

  const getTopExpenseCategories = () => {
    const categoryTotals = {};
    transactions
      .filter(t => t.type === 'expense')
      .forEach(t => {
        categoryTotals[t.category] = (categoryTotals[t.category] || 0) + Math.abs(t.amount);
      });
    
    return Object.entries(categoryTotals)
      .map(([name, amount]) => ({ name, amount }))
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 5)
      .map(item => ({
        ...item,
        percentage: getTotalExpenses() > 0 ? (item.amount / getTotalExpenses()) * 100 : 0
      }));
  };

  const totalIncome = getTotalIncome(selectedPeriod);
  const totalExpenses = getTotalExpenses(selectedPeriod);
  const totalSavings = getTotalSavings();
  const savingsRate = totalIncome > 0 ? (totalSavings / totalIncome) * 100 : 0;
  const topCategories = getTopExpenseCategories();

  const reportData = {
    overview: {
      totalIncome,
      totalExpenses,
      totalSavings,
      savingsRate,
      avgDailyExpense: totalExpenses / 30,
      topCategories
    },
    income: {
      total: totalIncome,
      sources: [
        { name: 'Salario Principal', amount: totalIncome * 0.8, percentage: 80 },
        { name: 'Freelance', amount: totalIncome * 0.15, percentage: 15 },
        { name: 'Inversiones', amount: totalIncome * 0.05, percentage: 5 }
      ],
      trend: [
        { month: 'Ene', amount: totalIncome * 0.9 },
        { month: 'Feb', amount: totalIncome * 0.95 },
        { month: 'Mar', amount: totalIncome },
        { month: 'Abr', amount: totalIncome * 0.98 },
        { month: 'May', amount: totalIncome },
        { month: 'Jun', amount: totalIncome }
      ]
    },
    expenses: {
      total: totalExpenses,
      categories: topCategories.map(cat => ({
        ...cat,
        trend: 'stable'
      }))
    },
    savings: {
      total: totalSavings,
      goal: goals.reduce((sum, goal) => sum + goal.target, 0),
      percentage: goals.reduce((sum, goal) => sum + goal.target, 0) > 0 ? 
        (totalSavings / goals.reduce((sum, goal) => sum + goal.target, 0)) * 100 : 0,
      monthlyAverage: totalSavings / 6,
      history: [
        { month: 'Ene', saved: totalSavings * 0.8 },
        { month: 'Feb', saved: totalSavings * 0.85 },
        { month: 'Mar', saved: totalSavings * 0.9 },
        { month: 'Abr', saved: totalSavings * 0.95 },
        { month: 'May', saved: totalSavings * 0.98 },
        { month: 'Jun', saved: totalSavings }
      ]
    }
  };

  const currentData = reportData[selectedReport];

  const renderOverview = () => (
    <div className="overview-section">
      <div className="metrics-grid">
        <div className="metric-card income">
          <h3>Ingresos Totales</h3>
          <p>{formatCurrency(currentData.totalIncome)}</p>
          <span className="trend positive">+5.2% vs mes anterior</span>
        </div>
        <div className="metric-card expenses">
          <h3>Gastos Totales</h3>
          <p>{formatCurrency(currentData.totalExpenses)}</p>
          <span className="trend negative">+2.1% vs mes anterior</span>
        </div>
        <div className="metric-card savings">
          <h3>Ahorros</h3>
          <p>{formatCurrency(currentData.totalSavings)}</p>
          <span className="trend positive">+12.5% vs mes anterior</span>
        </div>
        <div className="metric-card rate">
          <h3>Tasa de Ahorro</h3>
          <p>{formatPercentage(currentData.savingsRate)}</p>
          <span className="trend positive">+1.8% vs mes anterior</span>
        </div>
      </div>

      <div className="charts-section">
        <div className="chart-container">
          <h3>Distribución de Gastos</h3>
          <div className="pie-chart">
            {currentData.topCategories.map((category, index) => (
              <div key={category.name} className="pie-segment">
                <div 
                  className="segment"
                  style={{
                    transform: `rotate(${index * 72}deg)`,
                    background: `hsl(${index * 60}, 70%, 60%)`
                  }}
                ></div>
                <div className="segment-label">
                  <span className="category-name">{category.name}</span>
                  <span className="category-amount">{formatCurrency(category.amount)}</span>
                  <span className="category-percentage">{formatPercentage(category.percentage)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="chart-container">
          <h3>Gastos por Categoría</h3>
          <div className="bar-chart">
            {currentData.topCategories.map((category, index) => (
              <div key={category.name} className="bar-item">
                <div className="bar-label">{category.name}</div>
                <div className="bar-container">
                  <div 
                    className="bar-fill"
                    style={{ 
                      width: `${category.percentage}%`,
                      background: `hsl(${index * 60}, 70%, 60%)`
                    }}
                  ></div>
                  <span className="bar-value">{formatCurrency(category.amount)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderIncomeAnalysis = () => (
    <div className="income-analysis">
      <div className="income-sources">
        <h3>Fuentes de Ingresos</h3>
        <div className="sources-list">
          {currentData.sources.map((source, index) => (
            <div key={source.name} className="source-item">
              <div className="source-info">
                <span className="source-name">{source.name}</span>
                <span className="source-amount">{formatCurrency(source.amount)}</span>
              </div>
              <div className="source-bar">
                <div 
                  className="source-fill"
                  style={{ 
                    width: `${source.percentage}%`,
                    background: `hsl(${index * 90}, 70%, 60%)`
                  }}
                ></div>
                <span className="source-percentage">{formatPercentage(source.percentage)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="income-trend">
        <h3>Tendencia de Ingresos</h3>
        <div className="trend-chart">
          {currentData.trend.map((item, index) => (
            <div key={item.month} className="trend-point">
              <div className="point" style={{ height: `${(item.amount / 8500000) * 100}%` }}></div>
              <span className="point-label">{item.month}</span>
              <span className="point-value">{formatCurrency(item.amount)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderExpenseAnalysis = () => (
    <div className="expense-analysis">
      <div className="expense-categories">
        <h3>Análisis por Categoría</h3>
        <div className="categories-list">
          {currentData.categories.map((category, index) => (
            <div key={category.name} className="category-item">
              <div className="category-header">
                <span className="category-name">{category.name}</span>
                <span className={`trend-indicator ${category.trend}`}>
                  {category.trend === 'up' ? '↗' : category.trend === 'down' ? '↘' : '→'}
                </span>
              </div>
              <div className="category-details">
                <span className="category-amount">{formatCurrency(category.amount)}</span>
                <span className="category-percentage">{formatPercentage(category.percentage)}</span>
              </div>
              <div className="category-bar">
                <div 
                  className="category-fill"
                  style={{ 
                    width: `${category.percentage}%`,
                    background: `hsl(${index * 45}, 70%, 60%)`
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSavingsAnalysis = () => (
    <div className="savings-analysis">
      <div className="savings-overview">
        <div className="savings-card">
          <h3>Ahorros Actuales</h3>
          <p className="savings-amount">{formatCurrency(currentData.total)}</p>
          <div className="savings-progress">
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${currentData.percentage}%` }}
              ></div>
            </div>
            <span className="progress-text">{formatPercentage(currentData.percentage)} de la meta</span>
          </div>
        </div>

        <div className="savings-stats">
          <div className="stat-item">
            <span className="stat-label">Meta de Ahorro</span>
            <span className="stat-value">{formatCurrency(currentData.goal)}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Promedio Mensual</span>
            <span className="stat-value">{formatCurrency(currentData.monthlyAverage)}</span>
          </div>
        </div>
      </div>

      <div className="savings-history">
        <h3>Historial de Ahorros</h3>
        <div className="history-chart">
          {currentData.history.map((item, index) => (
            <div key={item.month} className="history-point">
              <div className="point" style={{ height: `${(item.saved / 2300000) * 100}%` }}></div>
              <span className="point-label">{item.month}</span>
              <span className="point-value">{formatCurrency(item.saved)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderReportContent = () => {
    switch (selectedReport) {
      case 'overview':
        return renderOverview();
      case 'income':
        return renderIncomeAnalysis();
      case 'expenses':
        return renderExpenseAnalysis();
      case 'savings':
        return renderSavingsAnalysis();
      default:
        return renderOverview();
    }
  };

  return (
    <div className="reports-page">
      <div className="reports-header">
        <div className="page-title">
          <h1>Reportes Financieros</h1>
          <p>Análisis detallado de tus finanzas personales</p>
        </div>
        
        <div className="header-controls">
          <div className="period-selector">
            <label>Período:</label>
            <select 
              value={selectedPeriod} 
              onChange={(e) => setSelectedPeriod(e.target.value)}
            >
              {periods.map(period => (
                <option key={period.value} value={period.value}>
                  {period.label}
                </option>
              ))}
            </select>
          </div>
          
          <div className="report-selector">
            <label>Tipo de Reporte:</label>
            <select 
              value={selectedReport} 
              onChange={(e) => setSelectedReport(e.target.value)}
            >
              {reports.map(report => (
                <option key={report.value} value={report.value}>
                  {report.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="reports-content">
        {renderReportContent()}
      </div>
    </div>
  );
};

export default Reports;
