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

  useEffect(() => {
    const loadChart = async () => {
      try {
        // Importar Chart.js dinámicamente
        const { Chart: ChartJS, registerables } = await import('chart.js/auto');
        ChartJS.register(...registerables);
        
        if (canvasRef.current) {
          const ctx = canvasRef.current.getContext('2d');
          
          // Destruir gráfico anterior si existe
          if (chart) {
            chart.destroy();
          }
          
          // Crear nuevo gráfico
          const newChart = new ChartJS(ctx, {
            type,
            data,
            options: {
              ...options,
              onClick: onChartClick
            }
          });
          
          setChart(newChart);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error loading chart:', error);
        setIsLoading(false);
      }
    };

    loadChart();
  }, [type, data, options, onChartClick]);

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
