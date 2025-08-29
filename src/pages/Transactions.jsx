import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { formatCurrency, formatDate } from '../utils/formatters';
import { showSuccess, showError, showConfirmation } from '../utils/notifications';
import { exportTransactionsToCSV } from '../utils/exportUtils';
import './Transactions.css';

const Transactions = () => {
  const { transactions, categories, addTransaction, deleteTransaction } = useAppContext();
  
  const [showForm, setShowForm] = useState(false);
  const [filters, setFilters] = useState({
    type: 'all',
    category: 'all',
    minAmount: '',
    maxAmount: '',
    searchTerm: ''
  });
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');

  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    type: 'expense',
    category: '',
    date: new Date().toISOString().split('T')[0],
    description: ''
  });

  // Filtrar transacciones
  const filteredTransactions = transactions.filter(transaction => {
    if (filters.type !== 'all' && transaction.type !== filters.type) return false;
    if (filters.category !== 'all' && transaction.category !== filters.category) return false;
    if (filters.minAmount && Math.abs(transaction.amount) < parseFloat(filters.minAmount)) return false;
    if (filters.maxAmount && Math.abs(transaction.amount) > parseFloat(filters.maxAmount)) return false;
    if (filters.searchTerm && !transaction.title.toLowerCase().includes(filters.searchTerm.toLowerCase())) return false;
    return true;
  });

  // Ordenar transacciones
  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    let aValue, bValue;
    
    switch (sortBy) {
      case 'amount':
        aValue = Math.abs(a.amount);
        bValue = Math.abs(b.amount);
        break;
      case 'title':
        aValue = a.title.toLowerCase();
        bValue = b.title.toLowerCase();
        break;
      case 'category':
        aValue = a.category.toLowerCase();
        bValue = b.category.toLowerCase();
        break;
      default:
        aValue = new Date(a.date);
        bValue = new Date(b.date);
    }

    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.amount || !formData.category) {
      showError('Por favor completa todos los campos requeridos');
      return;
    }

    const transaction = {
      ...formData,
      amount: formData.type === 'expense' ? -Math.abs(parseFloat(formData.amount)) : Math.abs(parseFloat(formData.amount))
    };

    addTransaction(transaction);
    setFormData({
      title: '',
      amount: '',
      type: 'expense',
      category: '',
      date: new Date().toISOString().split('T')[0],
      description: ''
    });
    setShowForm(false);
    showSuccess('Transacción agregada exitosamente');
  };

  const handleDelete = async (id) => {
    const confirmed = await showConfirmation('¿Estás seguro de que quieres eliminar esta transacción?');
    if (confirmed) {
      deleteTransaction(id);
      showSuccess('Transacción eliminada exitosamente');
    }
  };

  const handleExport = () => {
    exportTransactionsToCSV(transactions);
    showSuccess('Transacciones exportadas exitosamente');
  };

  const incomeCategories = categories.filter(cat => cat.type === 'income');
  const expenseCategories = categories.filter(cat => cat.type === 'expense');

  return (
    <div className="transactions">
      <div className="transactions-header">
        <div className="transactions-title">
          <h1>Transacciones</h1>
          <p>Gestiona tus ingresos y gastos</p>
        </div>
        
        <div className="transactions-actions">
          <button 
            className="btn btn-secondary"
            onClick={handleExport}
          >
            📊 Exportar
          </button>
          <button 
            className="btn btn-primary"
            onClick={() => setShowForm(true)}
          >
            ➕ Nueva Transacción
          </button>
        </div>
      </div>

      {/* Filtros */}
      <div className="filters-section">
        <div className="filters-grid">
          <div className="filter-group">
            <label>Tipo:</label>
            <select 
              value={filters.type} 
              onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
            >
              <option value="all">Todos</option>
              <option value="income">Ingresos</option>
              <option value="expense">Gastos</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Categoría:</label>
            <select 
              value={filters.category} 
              onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
            >
              <option value="all">Todas</option>
              {filters.type === 'income' || filters.type === 'all' ? 
                incomeCategories.map((category, index) => (
                  <option key={`income-${index}`} value={category.name}>{category.name}</option>
                )) : null
              }
              {filters.type === 'expense' || filters.type === 'all' ? 
                expenseCategories.map((category, index) => (
                  <option key={`expense-${index}`} value={category.name}>{category.name}</option>
                )) : null
              }
            </select>
          </div>

          <div className="filter-group">
            <label>Monto mínimo:</label>
            <input 
              type="number" 
              placeholder="0"
              value={filters.minAmount}
              onChange={(e) => setFilters(prev => ({ ...prev, minAmount: e.target.value }))}
            />
          </div>

          <div className="filter-group">
            <label>Monto máximo:</label>
            <input 
              type="number" 
              placeholder="Sin límite"
              value={filters.maxAmount}
              onChange={(e) => setFilters(prev => ({ ...prev, maxAmount: e.target.value }))}
            />
          </div>

          <div className="filter-group">
            <label>Buscar:</label>
            <input 
              type="text" 
              placeholder="Buscar transacciones..."
              value={filters.searchTerm}
              onChange={(e) => setFilters(prev => ({ ...prev, searchTerm: e.target.value }))}
            />
          </div>

          <div className="filter-group">
            <label>Ordenar por:</label>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="date">Fecha</option>
              <option value="amount">Monto</option>
              <option value="title">Título</option>
              <option value="category">Categoría</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Orden:</label>
            <select 
              value={sortOrder} 
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="desc">Descendente</option>
              <option value="asc">Ascendente</option>
            </select>
          </div>
        </div>
      </div>

      {/* Formulario de nueva transacción */}
      {showForm && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Nueva Transacción</h2>
              <button 
                className="modal-close"
                onClick={() => setShowForm(false)}
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="transaction-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Título *</label>
                  <input 
                    type="text" 
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Ej: Salario, Supermercado..."
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Monto *</label>
                  <input 
                    type="number" 
                    value={formData.amount}
                    onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                    placeholder="0"
                    min="0"
                    step="1000"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Tipo *</label>
                  <select 
                    value={formData.type}
                    onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                    required
                  >
                    <option value="income">Ingreso</option>
                    <option value="expense">Gasto</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Categoría *</label>
                  <select 
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    required
                  >
                    <option value="">Seleccionar categoría</option>
                    {formData.type === 'income' ? 
                      incomeCategories.map((category, index) => (
                        <option key={`income-${index}`} value={category.name}>{category.name}</option>
                      )) : 
                      expenseCategories.map((category, index) => (
                        <option key={`expense-${index}`} value={category.name}>{category.name}</option>
                      ))
                    }
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Fecha</label>
                  <input 
                    type="date" 
                    value={formData.date}
                    onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                  />
                </div>
                
                <div className="form-group">
                  <label>Descripción</label>
                  <input 
                    type="text" 
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Descripción opcional..."
                  />
                </div>
              </div>

              <div className="form-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                  Guardar Transacción
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Lista de transacciones */}
      <div className="transactions-list">
        {sortedTransactions.length === 0 ? (
          <div className="empty-state">
            <p>No se encontraron transacciones</p>
          </div>
        ) : (
          sortedTransactions.map((transaction) => (
            <div key={transaction.id} className="transaction-item">
              <div className="transaction-info">
                <div className="transaction-main">
                  <h3>{transaction.title}</h3>
                  <span className="transaction-category">{transaction.category}</span>
                </div>
                <div className="transaction-details">
                  <span className="transaction-date">{formatDate(transaction.date)}</span>
                  {transaction.description && (
                    <span className="transaction-description">{transaction.description}</span>
                  )}
                </div>
              </div>
              
              <div className="transaction-actions">
                <span className={`transaction-amount ${transaction.type}`}>
                  {transaction.type === 'income' ? '+' : '-'}{formatCurrency(Math.abs(transaction.amount))}
                </span>
                <button 
                  className="btn-delete"
                  onClick={() => handleDelete(transaction.id)}
                  title="Eliminar transacción"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Transactions;
