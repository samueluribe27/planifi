import React, { useState } from 'react';
import { formatCurrency, formatDate, getCategoryIcon } from '../utils/formatters';
import './Transactions.css';

const Transactions = () => {
  const [transactions, setTransactions] = useState([
    { id: 1, description: 'Salario', amount: 8500.00, type: 'income', date: '2024-01-15', category: 'Trabajo' },
    { id: 2, description: 'Supermercado', amount: -120.50, type: 'expense', date: '2024-01-14', category: 'Alimentación' },
    { id: 3, description: 'Gasolina', amount: -45.00, type: 'expense', date: '2024-01-13', category: 'Transporte' },
    { id: 4, description: 'Freelance', amount: 1200.00, type: 'income', date: '2024-01-12', category: 'Trabajo' },
    { id: 5, description: 'Restaurante', amount: -85.00, type: 'expense', date: '2024-01-11', category: 'Entretenimiento' },
    { id: 6, description: 'Netflix', amount: -15.99, type: 'expense', date: '2024-01-10', category: 'Entretenimiento' },
    { id: 7, description: 'Inversión', amount: 500.00, type: 'income', date: '2024-01-09', category: 'Inversiones' },
    { id: 8, description: 'Ropa', amount: -75.00, type: 'expense', date: '2024-01-08', category: 'Ropa' }
  ]);

  const [filters, setFilters] = useState({
    type: 'all',
    category: 'all',
    dateRange: 'all'
  });

  const [showAddForm, setShowAddForm] = useState(false);
  const [newTransaction, setNewTransaction] = useState({
    description: '',
    amount: '',
    type: 'expense',
    category: 'Otros',
    date: new Date().toISOString().split('T')[0]
  });

  const categories = [
    'Trabajo', 'Alimentación', 'Transporte', 'Entretenimiento', 
    'Salud', 'Educación', 'Vivienda', 'Servicios', 'Ropa', 
    'Viajes', 'Inversiones', 'Otros'
  ];

  const filteredTransactions = transactions.filter(transaction => {
    if (filters.type !== 'all' && transaction.type !== filters.type) return false;
    if (filters.category !== 'all' && transaction.category !== filters.category) return false;
    return true;
  });

  const handleAddTransaction = (e) => {
    e.preventDefault();
    const transaction = {
      id: Date.now(),
      ...newTransaction,
      amount: newTransaction.type === 'expense' ? -Math.abs(newTransaction.amount) : Math.abs(newTransaction.amount)
    };
    
    setTransactions([transaction, ...transactions]);
    setNewTransaction({
      description: '',
      amount: '',
      type: 'expense',
      category: 'Otros',
      date: new Date().toISOString().split('T')[0]
    });
    setShowAddForm(false);
  };

  const handleDeleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  return (
    <div className="transactions-page">
      <div className="transactions-header">
        <div className="page-title">
          <h1>Transacciones</h1>
          <p>Gestiona tus ingresos y gastos</p>
        </div>
        
        <div className="header-actions">
          <button 
            className="btn btn-primary"
            onClick={() => setShowAddForm(true)}
          >
            + Nueva Transacción
          </button>
        </div>
      </div>

      <div className="transactions-summary">
        <div className="summary-card income">
          <h3>Total Ingresos</h3>
          <p>{formatCurrency(totalIncome)}</p>
        </div>
        <div className="summary-card expenses">
          <h3>Total Gastos</h3>
          <p>{formatCurrency(totalExpenses)}</p>
        </div>
        <div className="summary-card balance">
          <h3>Balance</h3>
          <p>{formatCurrency(totalIncome - totalExpenses)}</p>
        </div>
      </div>

      <div className="filters-section">
        <div className="filters-grid">
          <div className="filter-group">
            <label>Tipo</label>
            <select 
              value={filters.type} 
              onChange={(e) => setFilters({...filters, type: e.target.value})}
            >
              <option value="all">Todos</option>
              <option value="income">Ingresos</option>
              <option value="expense">Gastos</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label>Categoría</label>
            <select 
              value={filters.category} 
              onChange={(e) => setFilters({...filters, category: e.target.value})}
            >
              <option value="all">Todas</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <label>Período</label>
            <select 
              value={filters.dateRange} 
              onChange={(e) => setFilters({...filters, dateRange: e.target.value})}
            >
              <option value="all">Todo</option>
              <option value="week">Esta semana</option>
              <option value="month">Este mes</option>
              <option value="quarter">Este trimestre</option>
            </select>
          </div>
        </div>
      </div>

      <div className="transactions-list">
        <div className="list-header">
          <h3>Lista de Transacciones ({filteredTransactions.length})</h3>
        </div>
        
        <div className="transactions-table">
          {filteredTransactions.map(transaction => (
            <div key={transaction.id} className="transaction-row">
              <div className="transaction-icon">
                {getCategoryIcon(transaction.category)}
              </div>
              
              <div className="transaction-info">
                <h4>{transaction.description}</h4>
                <p>{transaction.category} • {formatDate(transaction.date)}</p>
              </div>
              
              <div className={`transaction-amount ${transaction.type}`}>
                {transaction.type === 'income' ? '+' : ''}{formatCurrency(transaction.amount)}
              </div>
              
              <div className="transaction-actions">
                <button 
                  className="btn-icon"
                  onClick={() => handleDeleteTransaction(transaction.id)}
                  title="Eliminar"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal para agregar transacción */}
      {showAddForm && (
        <div className="modal-overlay" onClick={() => setShowAddForm(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Nueva Transacción</h3>
              <button 
                className="btn-icon"
                onClick={() => setShowAddForm(false)}
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={handleAddTransaction} className="transaction-form">
              <div className="form-group">
                <label>Descripción</label>
                <input
                  type="text"
                  value={newTransaction.description}
                  onChange={(e) => setNewTransaction({...newTransaction, description: e.target.value})}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Monto</label>
                <input
                  type="number"
                  value={newTransaction.amount}
                  onChange={(e) => setNewTransaction({...newTransaction, amount: e.target.value})}
                  required
                  min="0"
                  step="0.01"
                />
              </div>
              
              <div className="form-group">
                <label>Tipo</label>
                <select
                  value={newTransaction.type}
                  onChange={(e) => setNewTransaction({...newTransaction, type: e.target.value})}
                >
                  <option value="expense">Gasto</option>
                  <option value="income">Ingreso</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Categoría</label>
                <select
                  value={newTransaction.category}
                  onChange={(e) => setNewTransaction({...newTransaction, category: e.target.value})}
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              <div className="form-group">
                <label>Fecha</label>
                <input
                  type="date"
                  value={newTransaction.date}
                  onChange={(e) => setNewTransaction({...newTransaction, date: e.target.value})}
                  required
                />
              </div>
              
              <div className="form-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setShowAddForm(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                  Agregar Transacción
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Transactions;
