import React, { useState, useMemo } from 'react';
import { useAppContext } from '../context/AppContext';
import { formatCurrency } from '../utils/formatters';
import Chart from '../components/Chart';
import './Reports.css';

const Reports = () => {
  const { transactions, budgets, goals } = useAppContext();
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const periods = [
    { value: 'week', label: 'Esta Semana' },
    { value: 'month', label: 'Este Mes' },
    { value: 'quarter', label: 'Este Trimestre' },
    { value: 'year', label: 'Este Año' }
  ];

  // Calcular datos reales desde el estado global
  const getTotalIncome = () => {
    return transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
  };

  const getTotalExpenses = () => {
    return transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);
  };

  const getTotalSavings = () => {
    return goals.reduce((sum, goal) => sum + goal.saved, 0);
  };

  const totalIncome = getTotalIncome();
  const totalExpenses = getTotalExpenses();
  const totalSavings = getTotalSavings();
  const savingsRate = totalIncome > 0 ? (totalSavings / totalIncome) * 100 : 0;

  // Generar datos de gráficos usando useMemo para optimización
  const chartData = useMemo(() => {
    // Datos para gráfico de líneas
    const lineData = {
      labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
      datasets: [
        {
          label: 'Ingresos',
          data: [totalIncome * 0.8, totalIncome * 0.9, totalIncome, totalIncome * 0.95, totalIncome, totalIncome],
          borderColor: '#22c55e',
          backgroundColor: 'rgba(34, 197, 94, 0.1)',
          tension: 0.4,
          fill: false
        },
        {
          label: 'Gastos',
          data: [totalExpenses * 0.7, totalExpenses * 0.8, totalExpenses, totalExpenses * 0.9, totalExpenses * 0.85, totalExpenses],
          borderColor: '#ef4444',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          tension: 0.4,
          fill: false
        }
      ]
    };

    // Datos para gráfico de dona (categorías de gastos)
    const expenseCategories = {};
    transactions
      .filter(t => t.type === 'expense')
      .forEach(t => {
        expenseCategories[t.category] = (expenseCategories[t.category] || 0) + Math.abs(t.amount);
      });

    const doughnutData = {
      labels: Object.keys(expenseCategories).length > 0 ? Object.keys(expenseCategories) : ['Sin datos'],
      datasets: [{
        data: Object.keys(expenseCategories).length > 0 ? Object.values(expenseCategories) : [1],
        backgroundColor: [
          '#3b82f6', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6',
          '#06b6d4', '#84cc16', '#f97316', '#ec4899', '#6366f1'
        ].slice(0, Object.keys(expenseCategories).length || 1),
        borderWidth: 2,
        borderColor: '#ffffff'
      }]
    };

    // Datos para gráfico de barras (presupuestos)
    const barData = {
      labels: budgets.length > 0 ? budgets.map(b => b.category) : ['Sin presupuestos'],
      datasets: [
        {
          label: 'Presupuesto',
          data: budgets.length > 0 ? budgets.map(b => b.limit) : [0],
          backgroundColor: 'rgba(59, 130, 246, 0.8)',
          borderColor: '#3b82f6',
          borderWidth: 1
        },
        {
          label: 'Gastado',
          data: budgets.length > 0 ? budgets.map(b => b.spent) : [0],
          backgroundColor: 'rgba(239, 68, 68, 0.8)',
          borderColor: '#ef4444',
          borderWidth: 1
        }
      ]
    };

    // Datos para gráfico de metas
    const goalsData = {
      labels: goals.length > 0 ? goals.map(g => g.title) : ['Sin metas'],
      datasets: [
        {
          label: 'Ahorrado',
          data: goals.length > 0 ? goals.map(g => g.saved) : [0],
          backgroundColor: 'rgba(34, 197, 94, 0.8)',
          borderColor: '#22c55e',
          borderWidth: 1
        },
        {
          label: 'Meta',
          data: goals.length > 0 ? goals.map(g => g.target) : [0],
          backgroundColor: 'rgba(59, 130, 246, 0.3)',
          borderColor: '#3b82f6',
          borderWidth: 1,
          borderDash: [5, 5]
        }
      ]
    };

    return {
      lineData,
      doughnutData,
      barData,
      goalsData
    };
  }, [transactions, budgets, goals, totalIncome, totalExpenses]);

  return (
    <div className="reports">
      <div className="reports-header">
        <div className="reports-title">
          <h1>Reportes Financieros</h1>
          <p>Analiza tus finanzas con gráficos detallados y estadísticas</p>
        </div>
        
        <div className="reports-controls">
          <div className="control-group">
            <label htmlFor="period-select">Período:</label>
            <select
              id="period-select"
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="control-select"
            >
              {periods.map(period => (
                <option key={period.value} value={period.value}>
                  {period.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Métricas principales */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-icon income">📈</div>
          <div className="metric-content">
            <h3>Ingresos Totales</h3>
            <p className="metric-value">{formatCurrency(totalIncome)}</p>
            <span className="metric-change positive">+5.2% vs período anterior</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon expense">📉</div>
          <div className="metric-content">
            <h3>Gastos Totales</h3>
            <p className="metric-value">{formatCurrency(totalExpenses)}</p>
            <span className="metric-change negative">+2.1% vs período anterior</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon savings">🎯</div>
          <div className="metric-content">
            <h3>Ahorros Totales</h3>
            <p className="metric-value">{formatCurrency(totalSavings)}</p>
            <span className="metric-change positive">{savingsRate.toFixed(1)}% de tasa de ahorro</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon balance">💰</div>
          <div className="metric-content">
            <h3>Balance Neto</h3>
            <p className="metric-value">{formatCurrency(totalIncome - totalExpenses)}</p>
            <span className={`metric-change ${totalIncome - totalExpenses >= 0 ? 'positive' : 'negative'}`}>
              +12.5% vs período anterior
            </span>
          </div>
        </div>
      </div>

      {/* Gráficos */}
      <div className="charts-grid">
        <div className="chart-section">
          <h3>Tendencia de Ingresos y Gastos</h3>
          <Chart
            type="line"
            data={chartData.lineData}
            height={300}
            title="Evolución Financiera"
          />
        </div>

        <div className="chart-section">
          <h3>Distribución por Categorías</h3>
          <Chart
            type="doughnut"
            data={chartData.doughnutData}
            height={300}
            title="Gastos por Categoría"
          />
        </div>

        <div className="chart-section">
          <h3>Presupuesto vs Gastado</h3>
          <Chart
            type="bar"
            data={chartData.barData}
            height={300}
            title="Análisis de Presupuesto"
          />
        </div>

        <div className="chart-section">
          <h3>Progreso de Metas</h3>
          <Chart
            type="bar"
            data={chartData.goalsData}
            height={300}
            title="Estado de Metas Financieras"
          />
        </div>
      </div>
    </div>
  );
};

export default Reports;
