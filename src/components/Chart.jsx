import React, { useRef, useEffect, useState } from 'react';

// Este componente reutilizable utiliza Chart.js para renderizar gráficos dinámicamente.
// Gestiona el estado de carga y el ciclo de vida del gráfico, asegurando que se inicialice, actualice y limpie correctamente.

const Chart = ({ 
  type = 'line', 
  data, 
  options = {}, 
  title = '', 
  height = 300,
  className = '',
  onChartClick = null 
}) => {
  // `useRef` para referenciar el elemento <canvas> del DOM.
  const canvasRef = useRef(null);
  // `useState` para almacenar la instancia de Chart.js y el estado de carga del componente.
  const [chart, setChart] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Este efecto se encarga de la inicialización y actualización del gráfico.
  // Importa Chart.js dinámicamente, destruye cualquier instancia de gráfico anterior y crea una nueva
  // cada vez que las dependencias (type, data, options, etc.) cambian.
  useEffect(() => {
    const loadChart = async () => {
      try {
        // Importación dinámica de Chart.js para optimizar el rendimiento de la carga.
        const { Chart: ChartJS, registerables } = await import('chart.js/auto');
        ChartJS.register(...registerables);
        
        if (canvasRef.current) {
          const ctx = canvasRef.current.getContext('2d');
          
          // Destruye el gráfico existente para evitar fugas de memoria antes de crear uno nuevo.
          if (chart) {
            chart.destroy();
          }
          
          // Crea una nueva instancia del gráfico con las propiedades proporcionadas.
          const newChart = new ChartJS(ctx, {
            type,
            data,
            options: {
              ...options,
              onClick: onChartClick
            }
          });
          
          // Almacena la nueva instancia del gráfico y actualiza el estado de carga.
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

  // Este efecto de limpieza se ejecuta cuando el componente se desmonta.
  // Asegura que la instancia de Chart.js sea destruida para liberar recursos del navegador.
  useEffect(() => {
    return () => {
      if (chart) {
        chart.destroy();
      }
    };
  }, [chart]);

  // Muestra una animación de carga mientras los recursos del gráfico se están cargando.
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

  // Renderiza el título y el elemento <canvas> una vez que el gráfico está listo para ser visualizado.
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
