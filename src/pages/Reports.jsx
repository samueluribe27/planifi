import React, { useState } from 'react';
import { formatCurrency, formatPercentage, formatDate } from '../utils/formatters';
import './Reports.css';

const Reports = () => {
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

  // Datos de ejemplo para los reportes
  const reportData = {
    overview: {
      totalIncome: 8500000,
      totalExpenses: 6200000,
      totalSavings: 2300000,
      savingsRate: 27.1,
      avgDailyExpense: 206667,
      topCategories: [
        { name: 'Vivienda', amount: 1800000, percentage: 29.0 },
        { name: 'Alimentación', amount: 1200000, percentage: 19.4 },
        { name: 'Transporte', amount: 800000, percentage: 12.9 },
        { name: 'Entretenimiento', amount: 600000, percentage: 9.7 },
        { name: 'Salud', amount: 500000, percentage: 8.1 }
      ]
    },
    income: {
      total: 8500000,
      sources: [
        { name: 'Salario Principal', amount: 7000000, percentage: 82.4 },
        { name: 'Freelance', amount: 1000000, percentage: 11.8 },
        { name: 'Inversiones', amount: 300000, percentage: 3.5 },
        { name: 'Otros', amount: 200000, percentage: 2.4 }
      ],
      trend: [
        { month: 'Ene', amount: 7500000 },
        { month: 'Feb', amount: 7800000 },
        { month: 'Mar', amount: 8200000 },
        { month: 'Abr', amount: 8000000 },
        { month: 'May', amount: 8500000 },
        { month: 'Jun', amount: 8500000 }
      ]
    },
    expenses: {
      total: 6200000,
      categories: [
        { name: 'Vivienda', amount: 1800000, percentage: 29.0, trend: 'up' },
        { name: 'Alimentación', amount: 1200000, percentage: 19.4, trend: 'stable' },
        { name: 'Transporte', amount: 800000, percentage: 12.9, trend: 'down' },
        { name: 'Entretenimiento', amount: 600000, percentage: 9.7, trend: 'up' },
        { name: 'Salud', amount: 500000, percentage: 8.1, trend: 'stable' },
        { name: 'Educación', amount: 400000, percentage: 6.5, trend: 'up' },
        { name: 'Ropa', amount: 300000, percentage: 4.8, trend: 'down' },
        { name: 'Otros', amount: 600000, percentage: 9.7, trend: 'stable' }
      ]
    },
    savings: {
      total: 2300000,
      goal: 3000000,
      percentage: 76.7,
      monthlyAverage: 383333,
      history: [
        { month: 'Ene', saved: 1800000 },
        { month: 'Feb', saved: 2000000 },
        { month: 'Mar', saved: 2100000 },
        { month: 'Abr', saved: 2200000 },
        { month: 'May', saved: 2250000 },
        { month: 'Jun', saved: 2300000 }
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
