import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { useAppContext } from '../context/AppContext';
import './SearchBar.css';

const SearchBar = forwardRef((props, ref) => {
  const { transactions, budgets, goals } = useAppContext();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState([]);
  
  const searchRef = useRef(null);
  const inputRef = useRef(null);

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current?.focus();
    }
  }));

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
          id: transaction.id,
          type: 'transaction',
          title: transaction.description,
          subtitle: transaction.category,
          amount: transaction.amount,
          date: transaction.date,
          icon: transaction.type === 'income' ? '💰' : '💸'
        });
      }
    });

    // Buscar en presupuestos
    budgets.forEach(budget => {
      if (budget.category.toLowerCase().includes(term)) {
        searchResults.push({
          id: budget.id,
          type: 'budget',
          title: budget.category,
          subtitle: `Presupuesto: $${budget.limit.toLocaleString()}`,
          amount: budget.spent,
          limit: budget.limit,
          icon: '📋'
        });
      }
    });

    // Buscar en metas
    goals.forEach(goal => {
      if (goal.title.toLowerCase().includes(term)) {
        searchResults.push({
          id: goal.id,
          type: 'goal',
          title: goal.title,
          subtitle: goal.description || 'Meta financiera',
          amount: goal.saved,
          target: goal.target,
          icon: '🎯'
        });
      }
    });

    setResults(searchResults.slice(0, 8));
    setIsOpen(searchResults.length > 0);
  }, [searchTerm, transactions, budgets, goals]);

  const handleResultClick = (result) => {
    setIsOpen(false);
    setSearchTerm('');
    
    // Navegar según el tipo de resultado
    switch (result.type) {
      case 'transaction':
        window.location.href = '/transactions';
        break;
      case 'budget':
        window.location.href = '/budget';
        break;
      case 'goal':
        window.location.href = '/goals';
        break;
      default:
        break;
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="search-container" ref={searchRef}>
      <div className="search-input-wrapper">
        <input
          ref={inputRef}
          type="text"
          placeholder="Buscar transacciones, presupuestos, metas..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <span className="search-icon">🔍</span>
      </div>

      {isOpen && results.length > 0 && (
        <div className="search-results">
          <div className="search-results-header">
            <h3>Resultados de búsqueda</h3>
            <span className="results-count">{results.length} encontrados</span>
          </div>
          
          <div className="search-results-list">
            {results.map((result) => (
              <button
                key={`${result.type}-${result.id}`}
                className="search-result-item"
                onClick={() => handleResultClick(result)}
              >
                <div className="result-icon">{result.icon}</div>
                <div className="result-content">
                  <div className="result-title">{result.title}</div>
                  <div className="result-subtitle">{result.subtitle}</div>
                </div>
                <div className="result-amount">
                  {formatCurrency(result.amount)}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
});

SearchBar.displayName = 'SearchBar';

export default SearchBar;
