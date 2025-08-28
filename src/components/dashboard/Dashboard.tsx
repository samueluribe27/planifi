import React from 'react';
import { Card } from '../ui/card';
import { Progress } from '../ui/progress';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Target, CreditCard, Wallet } from 'lucide-react';
import exampleImage from 'figma:asset/0f2513855b8bdbb1e643ad93bb7299102d3e32f6.png';

const expenseData = [
  { name: 'Alimentación', value: 35, color: '#22c55e' },
  { name: 'Transporte', value: 25, color: '#3b82f6' },
  { name: 'Entretenimiento', value: 20, color: '#f59e0b' },
  { name: 'Servicios', value: 20, color: '#ef4444' },
];

const savingsData = [
  { month: 'Ene', amount: 800000 },
  { month: 'Feb', amount: 1200000 },
  { month: 'Mar', amount: 900000 },
  { month: 'Abr', amount: 1500000 },
  { month: 'May', amount: 1800000 },
  { month: 'Jun', amount: 2100000 },
];

export function Dashboard() {
  return (
    <div className="space-y-6 pb-24">
      {/* Balance Cards */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4 planifi-card-shadow">
          <div className="flex items-center space-x-2">
            <Wallet className="w-5 h-5 text-primary" />
            <span className="text-sm text-muted-foreground">Balance Total</span>
          </div>
          <p className="text-2xl font-bold text-foreground mt-1">$5.840.500</p>
          <div className="flex items-center space-x-1 mt-2">
            <TrendingUp className="w-4 h-4 text-green-500" />
            <span className="text-xs text-green-500">+12.5%</span>
          </div>
        </Card>
        
        <Card className="p-4 planifi-card-shadow">
          <div className="flex items-center space-x-2">
            <Target className="w-5 h-5 text-blue-500" />
            <span className="text-sm text-muted-foreground">Meta Ahorro</span>
          </div>
          <p className="text-2xl font-bold text-foreground mt-1">$3.200.000</p>
          <div className="flex items-center space-x-1 mt-2">
            <span className="text-xs text-muted-foreground">64% completado</span>
          </div>
        </Card>
      </div>

      {/* PLANIFI Branding */}
      <Card className="p-4 planifi-card-shadow bg-gradient-to-r from-green-50 to-emerald-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img 
              src={exampleImage} 
              alt="PLANIFI" 
              className="w-10 h-10 object-contain"
            />
            <div>
              <h3 className="font-semibold text-green-800">PLANIFI Analytics</h3>
              <p className="text-sm text-green-600">Análisis inteligente de tus finanzas</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-green-600">Última actualización</p>
            <p className="text-xs text-muted-foreground">Hace 2 minutos</p>
          </div>
        </div>
      </Card>

      {/* Savings Progress */}
      <Card className="p-4 planifi-card-shadow">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Progreso de Ahorro</h3>
          <span className="text-sm text-muted-foreground">Este mes</span>
        </div>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm">Vacaciones 2024</span>
              <span className="text-sm font-medium">$1.280.000 / $2.000.000</span>
            </div>
            <Progress value={64} className="h-2" />
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm">Fondo Emergencia</span>
              <span className="text-sm font-medium">$3.500.000 / $5.000.000</span>
            </div>
            <Progress value={70} className="h-2" />
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm">Nuevo Auto</span>
              <span className="text-sm font-medium">$8.200.000 / $15.000.000</span>
            </div>
            <Progress value={55} className="h-2" />
          </div>
        </div>
      </Card>

      {/* Expenses Chart */}
      <Card className="p-4 planifi-card-shadow">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Distribución de Gastos</h3>
          <img 
            src={exampleImage} 
            alt="PLANIFI" 
            className="w-6 h-6 opacity-60 object-contain"
          />
        </div>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={expenseData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {expenseData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-4">
          {expenseData.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: item.color }}
              />
              <span className="text-xs text-muted-foreground">{item.name}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Savings Trend */}
      <Card className="p-4 planifi-card-shadow">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Tendencia de Ahorros</h3>
          <span className="text-sm text-primary font-medium">COP</span>
        </div>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={savingsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => `$${(value/1000)}k`} />
              <Line 
                type="monotone" 
                dataKey="amount" 
                stroke="#22c55e" 
                strokeWidth={3}
                dot={{ fill: '#22c55e', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Monthly Summary */}
      <Card className="p-4 planifi-card-shadow">
        <h3 className="font-semibold mb-4">Resumen Mensual</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Ingresos</span>
              <span className="font-medium text-green-600">$4.200.000</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Gastos</span>
              <span className="font-medium text-red-600">$2.800.000</span>
            </div>
            <div className="flex items-center justify-between border-t pt-2">
              <span className="text-sm font-medium">Balance</span>
              <span className="font-bold text-primary">$1.400.000</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Ahorrado</span>
              <span className="font-medium text-blue-600">$350.000</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Invertido</span>
              <span className="font-medium text-purple-600">$180.000</span>
            </div>
            <div className="flex items-center justify-between border-t pt-2">
              <span className="text-sm font-medium">Crecimiento</span>
              <span className="font-bold text-green-600">+8.3%</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Quick Actions */}
      <Card className="p-4 planifi-card-shadow">
        <h3 className="font-semibold mb-4">Acciones Rápidas</h3>
        <div className="grid grid-cols-2 gap-3">
          <button className="flex items-center space-x-2 p-3 bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors">
            <DollarSign className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium">Agregar Gasto</span>
          </button>
          <button className="flex items-center space-x-2 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
            <Target className="w-5 h-5 text-blue-500" />
            <span className="text-sm font-medium">Nueva Meta</span>
          </button>
          <button className="flex items-center space-x-2 p-3 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
            <CreditCard className="w-5 h-5 text-orange-500" />
            <span className="text-sm font-medium">Vincular Cuenta</span>
          </button>
          <button className="flex items-center space-x-2 p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
            <Wallet className="w-5 h-5 text-purple-500" />
            <span className="text-sm font-medium">Transferir</span>
          </button>
        </div>
      </Card>
    </div>
  );
}