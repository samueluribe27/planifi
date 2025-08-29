import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';

// --- Funciones de utilidad y datos simulados para que el componente sea autónomo ---

// Formatea un número como moneda.
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0
  }).format(amount);
};

// Formatea una fecha en formato corto.
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('es-CO', options);
};

// Datos simulados para simular el contexto de la aplicación.
const mockData = {
  transactions: [
    { id: 't1', description: 'Compra en el supermercado', category: 'Alimentos', amount: 50000, type: 'expense', date: '2025-08-25' },
    { id: 't2', description: 'Pago de nómina', category: 'Ingresos', amount: 3500000, type: 'income', date: '2025-08-20' },
    { id: 't3', description: 'Gasolina', category: 'Transporte', amount: 150000, type: 'expense', date: '2025-08-24' },
    { id: 't4', description: 'Factura de internet', category: 'Servicios', amount: 80000, type: 'expense', date: '2025-08-22' },
    { id: 't5', description: 'Venta de artículo en línea', category: 'Ingresos extra', amount: 200000, type: 'income', date: '2025-08-21' },
  ],
  budgets: [
    { id: 'b1', category: 'Alimentos', limit: 800000, spent: 650000 },
    { id: 'b2', category: 'Transporte', limit: 200000, spent: 180000 },
    { id: 'b3', category: 'Servicios', limit: 150000, spent: 100000 },
  ],
  goals: [
    { id: 'g1', title: 'Viaje a la playa', description: 'Ahorro para vacaciones', target: 2000000, saved: 1500000 },
    { id: 'g2', title: 'Comprar un nuevo portátil', target: 3000000, saved: 3000000 },
  ],
};

// Componente simulado de `AppContext`
const useAppContext = () => mockData;

// --- Fin de las funciones de utilidad y datos simulados ---

// El componente SearchBar permite buscar transacciones, presupuestos y metas.
// Se envuelve en `forwardRef` para que un componente padre pueda acceder y controlar el foco del input.
const SearchBar = forwardRef((props, ref) => {
  // Se obtienen los datos globales de la aplicación a través del contexto simulado.
  const { transactions, budgets, goals } = useAppContext();
  
  // Se define el estado del componente para manejar el término de búsqueda,
  // la visibilidad de los resultados y la lista de resultados.
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState([]);
  
  // Se crean referencias para acceder a los elementos del DOM.
  // `searchRef` apunta al contenedor principal y `inputRef` al campo de entrada.
  const searchRef = useRef(null);
  const inputRef = useRef(null);

  // Expone el método `focus` al componente padre a través de la referencia `ref`.
  // Esto permite que el componente padre pueda enfocar el campo de búsqueda programáticamente.
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current?.focus();
    }
  }));

  // Efecto para manejar el cierre de los resultados cuando se hace clic fuera del componente.
  // Se añade un `event listener` al documento y se limpia al desmontar el componente.
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Efecto principal para realizar la búsqueda. Se activa cada vez que el término de búsqueda,
  // las transacciones, los presupuestos o las metas cambian.
  useEffect(() => {
    // Si el término de búsqueda es muy corto, no se muestran resultados.
    if (searchTerm.trim().length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const searchResults = [];
    const term = searchTerm.toLowerCase();

    // Se busca en el array de transacciones por descripción y categoría.
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

    // Se busca en el array de presupuestos por categoría.
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

    // Se busca en el array de metas por título y descripción.
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

    // Se limita el número de resultados para mantener la interfaz de usuario limpia.
    setResults(searchResults.slice(0, 10));
    setIsOpen(searchResults.length > 0);
  }, [searchTerm, transactions, budgets, goals]);

  // Manejador de clics en los elementos de resultado.
  const handleResultClick = (result) => {
    console.log('Resultado seleccionado:', result);
    setIsOpen(false);
    setSearchTerm('');
  };

  // Funciones auxiliares para determinar los iconos y colores de los resultados.
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

  // Renderiza el componente.
  return (
    <>
      <style>
        {`
        .search-container {
          position: relative;
          width: 100%;
          max-width: 400px;
        }
        
        .search-input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }
        
        .search-input {
          width: 100%;
          padding: 12px 40px 12px 16px;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          font-size: 14px;
          background: white;
          transition: all 0.2s ease;
        }
        
        .search-input:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
        
        .search-icon {
          position: absolute;
          right: 12px;
          font-size: 16px;
          color: #6b7280;
          pointer-events: none;
        }
        
        .search-results {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          z-index: 1000;
          max-height: 400px;
          overflow-y: auto;
          margin-top: 4px;
        }
        
        .results-header {
          padding: 12px 16px;
          border-bottom: 1px solid #e5e7eb;
          background: #f3f4f6;
          font-size: 12px;
          font-weight: 600;
          color: #6b7280;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .result-item {
          display: flex;
          align-items: center;
          padding: 12px 16px;
          cursor: pointer;
          transition: background-color 0.2s ease;
          border-bottom: 1px solid #e5e7eb;
        }
        
        .result-item:last-child {
          border-bottom: none;
        }
        
        .result-item:hover {
          background: #f3f4f6;
        }
        
        .result-item.result-success {
          border-left: 3px solid #10b981;
        }
        
        .result-item.result-danger {
          border-left: 3px solid #ef4444;
        }
        
        .result-item.result-warning {
          border-left: 3px solid #f59e0b;
        }
        
        .result-item.result-info {
          border-left: 3px solid #3b82f6;
        }
        
        .result-icon {
          font-size: 20px;
          margin-right: 12px;
          flex-shrink: 0;
        }
        
        .result-content {
          flex: 1;
          min-width: 0;
        }
        
        .result-title {
          font-size: 14px;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 2px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        
        .result-subtitle {
          font-size: 12px;
          color: #6b7280;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        
        .result-amount {
          margin-left: 12px;
          flex-shrink: 0;
        }
        
        .result-amount .amount {
          font-size: 12px;
          font-weight: 600;
          padding: 4px 8px;
          border-radius: 4px;
          background: #f3f4f6;
        }
        
        .result-amount .amount.income {
          color: #10b981;
          background: rgba(16, 185, 129, 0.1);
        }
        
        .result-amount .amount.expense {
          color: #ef4444;
          background: rgba(239, 68, 68, 0.1);
        }
        
        .results-footer {
          padding: 8px 16px;
          background: #f3f4f6;
          font-size: 11px;
          color: #6b7280;
          text-align: center;
          border-top: 1px solid #e5e7eb;
        }
        
        /* Responsive */
        @media (max-width: 768px) {
          .search-container {
            max-width: 100%;
          }
          
          .search-results {
            position: fixed;
            top: 80px;
            left: 16px;
            right: 16px;
            max-height: 60vh;
          }
          
          .result-item {
            padding: 16px;
          }
          
          .result-icon {
            font-size: 24px;
            margin-right: 16px;
          }
          
          .result-title {
            font-size: 16px;
          }
          
          .result-subtitle {
            font-size: 14px;
          }
        }
      `}
      </style>
      <div className="search-container" ref={searchRef}>
        <div className="search-input-wrapper">
          <input
            ref={inputRef}
            type="text"
            className="search-input"
            placeholder="Buscar transacciones, presupuestos, metas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => searchTerm.trim().length >= 2 && setIsOpen(true)}
          />
          <span className="search-icon">🔍</span>
        </div>

        {/* Renderiza los resultados solo si el menú está abierto y hay resultados. */}
        {isOpen && results.length > 0 && (
          <div className="search-results">
            <div className="results-header">
              <span>Resultados ({results.length})</span>
            </div>
            
            {/* Mapea los resultados para crear los elementos de la lista. */}
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
    </>
  );
});

export default SearchBar;
