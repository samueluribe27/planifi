import React, { useState, useEffect, useRef } from 'react';
import { useAppContext } from '../context/AppContext';
import { formatCurrency, formatDate } from '../utils/formatters';
import './SearchBar.css';

const SearchBar = () => {
  const { transactions, budgets, goals } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState([]);
  const searchRef = useRef(null);

  // Cerrar resultados al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Realizar búsqueda cuando cambie el término
  useEffect(() => {
    if (searchTerm.trim().length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const searchResults = [];
    const term = searchTerm.toLowerCase();

    // Buscar en transacciones
    transactions.forEach(transaction => {
      if (
        transaction.description.toLowerCase().includes(term) ||
        transaction.category.toLowerCase().includes(term)
      ) {
        searchResults.push({
          type: 'transaction',
          id: transaction.id,
          title: transaction.description,
          subtitle: `${transaction.category} • ${formatDate(transaction.date)}`,
          amount: transaction.amount,
          transactionType: transaction.type,
          icon: '💰'
        });
      }
    });

    // Buscar en presupuestos
    budgets.forEach(budget => {
      if (budget.category.toLowerCase().includes(term)) {
        searchResults.push({
          type: 'budget',
          id: budget.id,
          title: budget.category,
          subtitle: `Presupuesto • ${formatCurrency(budget.limit)}`,
          amount: budget.spent,
          limit: budget.limit,
          icon: '📊'
        });
      }
    });

    // Buscar en metas
    goals.forEach(goal => {
      if (
        goal.title.toLowerCase().includes(term) ||
        goal.description?.toLowerCase().includes(term)
      ) {
        searchResults.push({
          type: 'goal',
          id: goal.id,
          title: goal.title,
          subtitle: goal.description || 'Sin descripción',
          amount: goal.saved,
          target: goal.target,
          icon: '🎯'
        });
      }
    });

    // Limitar resultados a 10
    setResults(searchResults.slice(0, 10));
    setIsOpen(searchResults.length > 0);
  }, [searchTerm, transactions, budgets, goals]);

  const handleResultClick = (result) => {
    // Aquí podrías navegar a la página correspondiente
    console.log('Resultado seleccionado:', result);
    setIsOpen(false);
    setSearchTerm('');
  };

  const getResultIcon = (result) => {
    switch (result.type) {
      case 'transaction':
        return result.transactionType === 'income' ? '📈' : '📉';
      case 'budget':
        return '📊';
      case 'goal':
        return '🎯';
      default:
        return '📄';
    }
  };

  const getResultColor = (result) => {
    switch (result.type) {
      case 'transaction':
        return result.transactionType === 'income' ? 'success' : 'danger';
      case 'budget':
        return result.amount > result.limit * 0.8 ? 'warning' : 'success';
      case 'goal':
        return result.amount >= result.target ? 'success' : 'info';
      default:
        return 'info';
    }
  };

  return (
    <div className="search-container" ref={searchRef}>
      <div className="search-input-wrapper">
        <input
          type="text"
          className="search-input"
          placeholder="Buscar transacciones, presupuestos, metas..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => searchTerm.trim().length >= 2 && setIsOpen(true)}
        />
        <span className="search-icon">🔍</span>
      </div>

      {isOpen && results.length > 0 && (
        <div className="search-results">
          <div className="results-header">
            <span>Resultados ({results.length})</span>
          </div>
          
          {results.map((result, index) => (
            <div
              key={`${result.type}-${result.id}`}
              className={`result-item result-${getResultColor(result)}`}
              onClick={() => handleResultClick(result)}
            >
              <div className="result-icon">
                {getResultIcon(result)}
              </div>
              
              <div className="result-content">
                <div className="result-title">
                  {result.title}
                </div>
                <div className="result-subtitle">
                  {result.subtitle}
                </div>
              </div>
              
              <div className="result-amount">
                {result.type === 'transaction' && (
                  <span className={`amount ${result.transactionType}`}>
                    {result.transactionType === 'income' ? '+' : ''}{formatCurrency(result.amount)}
                  </span>
                )}
                {result.type === 'budget' && (
                  <span className="amount">
                    {formatCurrency(result.amount)} / {formatCurrency(result.limit)}
                  </span>
                )}
                {result.type === 'goal' && (
                  <span className="amount">
                    {formatCurrency(result.amount)} / {formatCurrency(result.target)}
                  </span>
                )}
              </div>
            </div>
          ))}
          
          <div className="results-footer">
            <span>Presiona Enter para buscar más resultados</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
