import React, { useRef, useEffect, useState } from 'react';
import './Chart.css';

const Chart = ({ 
  type = 'line', 
  data, 
  options = {}, 
  title = '', 
  height = 300,
  className = '',
  onChartClick = null 
}) => {
  const canvasRef = useRef(null);
  const [chart, setChart] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadChart = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Verificar que tenemos datos válidos
        if (!data || !data.labels || !data.datasets) {
          console.log('Chart data:', data);
          setError('Datos del gráfico no válidos');
          setIsLoading(false);
          return;
        }
        
        // Importar Chart.js dinámicamente
        const { Chart: ChartJS, registerables } = await import('chart.js/auto');
        ChartJS.register(...registerables);
        
        if (canvasRef.current) {
          const ctx = canvasRef.current.getContext('2d');
          
          // Destruir gráfico existente
          if (chart) {
            chart.destroy();
          }
          
          // Configuración por defecto
          const defaultOptions = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: true,
                position: 'top',
                labels: {
                  usePointStyle: true,
                  padding: 15,
                  font: {
                    size: 12
                  }
                }
              },
              tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                titleColor: 'white',
                bodyColor: 'white',
                borderColor: 'rgba(255, 255, 255, 0.1)',
                borderWidth: 1,
                cornerRadius: 8,
                displayColors: true,
                padding: 12
              }
            },
            scales: {
              x: {
                grid: {
                  display: false
                },
                ticks: {
                  font: {
                    size: 11
                  }
                }
              },
              y: {
                grid: {
                  color: 'rgba(0, 0, 0, 0.05)'
                },
                ticks: {
                  font: {
                    size: 11
                  }
                }
              }
            },
            elements: {
              point: {
                radius: 4,
                hoverRadius: 6
              },
              line: {
                tension: 0.4
              }
            },
            interaction: {
              intersect: false,
              mode: 'index'
            }
          };
          
          // Crear nuevo gráfico
          const newChart = new ChartJS(ctx, {
            type,
            data,
            options: {
              ...defaultOptions,
              ...options,
              onClick: onChartClick
            }
          });
          
          setChart(newChart);
          setIsLoading(false);
          console.log('Chart created successfully:', type, data);
        }
      } catch (error) {
        console.error('Error loading chart:', error);
        setError(error.message);
        setIsLoading(false);
      }
    };

    loadChart();
  }, [type, data, options, onChartClick]);

  // Limpiar al desmontar
  useEffect(() => {
    return () => {
      if (chart) {
        chart.destroy();
      }
    };
  }, [chart]);

  if (isLoading) {
    return (
      <div className={`chart-container ${className}`} style={{ height }}>
        <div className="chart-loading">
          <div className="loading-spinner"></div>
          <p>Cargando gráfico...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`chart-container ${className}`} style={{ height }}>
        <div className="chart-error">
          <div className="error-icon">⚠️</div>
          <p>Error al cargar el gráfico</p>
          <small>{error}</small>
        </div>
      </div>
    );
  }

  return (
    <div className={`chart-container ${className}`} style={{ height }}>
      {title && <h3 className="chart-title">{title}</h3>}
      <div className="chart-wrapper">
        <canvas ref={canvasRef}></canvas>
      </div>
    </div>
  );
};

export default Chart;
