# Planifi - Aplicación de Finanzas Personales

Una aplicación web moderna y completa para la gestión de finanzas personales, construida con React y diseñada para ser intuitiva, funcional y escalable.

## 🚀 Características Principales

### 📊 Dashboard Inteligente
- **Vista general financiera** con métricas clave en tiempo real
- **Gráficos interactivos** para visualizar ingresos, gastos y ahorros
- **Progreso de metas** con indicadores visuales
- **Tendencias financieras** con análisis comparativo

### 💰 Gestión de Transacciones
- **Registro completo** de ingresos y gastos
- **Categorización automática** con iconos intuitivos
- **Filtros avanzados** por fecha, categoría, tipo y monto
- **Búsqueda en tiempo real** con resultados instantáneos
- **Exportación de datos** en formato CSV

### 📈 Presupuesto Inteligente
- **Configuración de límites** por categoría
- **Seguimiento en tiempo real** del gasto vs presupuesto
- **Alertas visuales** cuando se acerca al límite
- **Análisis de tendencias** de gastos

### 🎯 Metas Financieras
- **Definición de objetivos** con fechas límite
- **Seguimiento de progreso** con barras visuales
- **Actualización flexible** de ahorros
- **Motivación visual** con colores y porcentajes

### 📋 Reportes Detallados
- **Análisis por períodos** (semana, mes, trimestre, año)
- **Gráficos interactivos** con Chart.js
- **Exportación de reportes** completos
- **Visualizaciones personalizables**

### 🔍 Búsqueda Global
- **Búsqueda unificada** en transacciones, presupuestos y metas
- **Resultados categorizados** con navegación rápida
- **Búsqueda por atajos** de teclado (Ctrl+K)

### 🎨 Temas Personalizables
- **Modo claro y oscuro** con transiciones suaves
- **Detección automática** de preferencias del sistema
- **Persistencia de preferencias** en localStorage

### ⌨️ Atajos de Teclado
- **Navegación rápida** entre secciones (Ctrl+1-6)
- **Acciones rápidas** para crear elementos (Ctrl+N, Ctrl+B, Ctrl+G)
- **Búsqueda instantánea** (Ctrl+K, Ctrl+F)
- **Ayuda integrada** (F1, Ctrl+/)

### 📱 Diseño Responsivo
- **Interfaz adaptativa** para todos los dispositivos
- **Navegación móvil** optimizada
- **Touch-friendly** para tablets y smartphones

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React 19.1.1** - Biblioteca principal para la interfaz
- **React Router DOM** - Navegación entre páginas
- **Chart.js** - Gráficos interactivos
- **CSS Modules** - Estilos modulares y organizados

### Estado y Datos
- **Context API** - Gestión de estado global
- **LocalStorage** - Persistencia de datos local
- **Hooks personalizados** - Lógica reutilizable

### Utilidades
- **Vite** - Build tool y desarrollo
- **ESLint** - Linting de código
- **Funciones de optimización** - Rendimiento mejorado

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── Header.jsx      # Encabezado principal
│   ├── Sidebar.jsx     # Barra lateral de navegación
│   ├── SearchBar.jsx   # Búsqueda global
│   ├── ThemeToggle.jsx # Selector de tema
│   └── Chart.jsx       # Componente de gráficos
├── pages/              # Páginas principales
│   ├── Dashboard.jsx   # Panel principal
│   ├── Transactions.jsx # Gestión de transacciones
│   ├── Budget.jsx      # Presupuestos
│   ├── Goals.jsx       # Metas financieras
│   ├── Reports.jsx     # Reportes y análisis
│   └── Settings.jsx    # Configuraciones
├── context/            # Contexto global
│   └── AppContext.jsx  # Proveedor de estado
├── hooks/              # Hooks personalizados
│   └── useAppState.js  # Gestión de estado
├── utils/              # Funciones de utilidad
│   ├── formatters.js   # Formateo de datos
│   ├── exportUtils.js  # Exportación de datos
│   ├── notifications.js # Sistema de notificaciones
│   ├── keyboardShortcuts.js # Atajos de teclado
│   ├── theme.js        # Gestión de temas
│   ├── chartUtils.js   # Utilidades de gráficos
│   └── performance.js  # Optimizaciones
└── styles/             # Estilos globales
    └── global.css      # Variables CSS y estilos base
```

## 🚀 Instalación y Uso

### Prerrequisitos
- Node.js (versión 16 o superior)
- npm o yarn

### Instalación
```bash
# Clonar el repositorio
git clone [url-del-repositorio]
cd planifi

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build
```

### Scripts Disponibles
- `npm run dev` - Servidor de desarrollo
- `npm run build` - Construcción para producción
- `npm run preview` - Vista previa de producción
- `npm run lint` - Verificación de código

## 🎯 Funcionalidades Destacadas

### Gestión de Estado
- **Estado global centralizado** con Context API
- **Persistencia automática** en localStorage
- **Sincronización en tiempo real** entre componentes

### Optimización de Rendimiento
- **Memoización** de cálculos costosos
- **Lazy loading** de componentes
- **Debounce y throttle** para eventos
- **Virtualización** para listas grandes

### Experiencia de Usuario
- **Notificaciones en tiempo real** para acciones
- **Confirmaciones** para operaciones críticas
- **Feedback visual** inmediato
- **Navegación intuitiva** con breadcrumbs

### Accesibilidad
- **Navegación por teclado** completa
- **Etiquetas ARIA** apropiadas
- **Contraste de colores** optimizado
- **Estructura semántica** correcta

## 📊 Características Técnicas

### Gestión de Datos
- **CRUD completo** para todas las entidades
- **Validación de datos** en tiempo real
- **Backup automático** en localStorage
- **Exportación** en múltiples formatos

### Seguridad
- **Validación de entrada** robusta
- **Sanitización de datos** automática
- **Prevención de XSS** en formularios
- **Manejo seguro** de localStorage

### Escalabilidad
- **Arquitectura modular** y extensible
- **Componentes reutilizables** bien definidos
- **Separación de responsabilidades** clara
- **Código mantenible** y documentado

## 🎨 Personalización

### Temas
- **Variables CSS** centralizadas
- **Sistema de colores** coherente
- **Transiciones suaves** entre temas
- **Detección automática** de preferencias

### Componentes
- **Props flexibles** para personalización
- **Estilos modulares** y reutilizables
- **Responsive design** nativo
- **Accesibilidad** integrada

## 🔧 Configuración Avanzada

### Variables de Entorno
```env
VITE_APP_TITLE=Planifi Finanzas
VITE_APP_VERSION=1.0.0
VITE_API_URL=http://localhost:3000
```

### Configuración de Vite
```javascript
// vite.config.js
export default {
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
}
```

## 📈 Métricas de Rendimiento

- **Tiempo de carga inicial**: < 2 segundos
- **Tiempo de respuesta**: < 100ms
- **Tamaño del bundle**: < 500KB
- **Lighthouse Score**: 95+ en todas las categorías

## 🤝 Contribución

### Guías de Desarrollo
1. **Fork** el repositorio
2. **Crea** una rama para tu feature
3. **Desarrolla** siguiendo las convenciones
4. **Testea** exhaustivamente
5. **Envía** un pull request

### Convenciones de Código
- **ESLint** configurado para React
- **Prettier** para formateo automático
- **Commits semánticos** (feat:, fix:, docs:, etc.)
- **Documentación** en JSDoc

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🙏 Agradecimientos

- **React Team** por el framework
- **Vite** por las herramientas de build
- **Chart.js** por las visualizaciones
- **Comunidad open source** por las librerías

## 📞 Soporte

Para soporte técnico o preguntas:
- **Issues**: Crear un issue en GitHub
- **Documentación**: Ver la carpeta `/docs`
- **Ejemplos**: Ver la carpeta `/examples`

---

**Planifi** - Tu compañero inteligente para las finanzas personales 💰✨
