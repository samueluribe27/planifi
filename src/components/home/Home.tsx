import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  Plus, 
  ArrowUpRight, 
  ArrowDownRight, 
  Target, 
  CreditCard, 
  PiggyBank, 
  TrendingUp,
  Calendar,
  Bell,
  Zap,
  Gift,
  Users,
  Eye,
  EyeOff,
  Settings
} from 'lucide-react';
import exampleImage from 'figma:asset/0f2513855b8bdbb1e643ad93bb7299102d3e32f6.png';

export function Home() {
  const [showBalance, setShowBalance] = useState(true);

  const quickActions = [
    {
      id: 'add-expense',
      title: 'Agregar Gasto',
      description: 'Registra un nuevo gasto',
      icon: <ArrowDownRight className="w-6 h-6 text-red-500" />,
      color: 'bg-red-50 hover:bg-red-100 border-red-200',
      action: () => console.log('Add expense')
    },
    {
      id: 'add-income',
      title: 'Agregar Ingreso', 
      description: 'Registra un nuevo ingreso',
      icon: <ArrowUpRight className="w-6 h-6 text-green-500" />,
      color: 'bg-green-50 hover:bg-green-100 border-green-200',
      action: () => console.log('Add income')
    },
    {
      id: 'new-goal',
      title: 'Nueva Meta',
      description: 'Crear objetivo de ahorro',
      icon: <Target className="w-6 h-6 text-blue-500" />,
      color: 'bg-blue-50 hover:bg-blue-100 border-blue-200',
      action: () => console.log('New goal')
    },
    {
      id: 'link-account',
      title: 'Vincular Cuenta',
      description: 'Conectar cuenta bancaria',
      icon: <CreditCard className="w-6 h-6 text-purple-500" />,
      color: 'bg-purple-50 hover:bg-purple-100 border-purple-200',
      action: () => console.log('Link account')
    }
  ];

  const shortcuts = [
    {
      id: 'savings',
      title: 'Mis Ahorros',
      value: '$2.450.000',
      change: '+8.5%',
      icon: <PiggyBank className="w-5 h-5 text-primary" />,
      trend: 'up'
    },
    {
      id: 'investments',
      title: 'Inversiones',
      value: '$890.000',
      change: '+12.3%',
      icon: <TrendingUp className="w-5 h-5 text-blue-500" />,
      trend: 'up'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'expense',
      description: 'Compra supermercado',
      amount: '-$85.500',
      category: 'Alimentación',
      time: '2h ago'
    },
    {
      id: 2,
      type: 'income',
      description: 'Salario mensual',
      amount: '+$3.200.000',
      category: 'Trabajo',
      time: '1 día ago'
    },
    {
      id: 3,
      type: 'saving',
      description: 'Redondeo automático',
      amount: '+$4.500',
      category: 'Ahorro',
      time: '2 días ago'
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: 'Pago Tarjeta de Crédito',
      amount: '$450.000',
      date: 'Mañana',
      type: 'payment'
    },
    {
      id: 2,
      title: 'Meta: Vacaciones 2024',
      amount: '$120.000 restantes',
      date: 'En 15 días',
      type: 'goal'
    }
  ];

  return (
    <div className="space-y-6 pb-24">
      {/* Welcome Section with Logo */}
      <Card className="p-6 planifi-gradient text-white overflow-hidden relative">
        <div className="absolute top-4 right-4 opacity-20">
          <img 
            src={exampleImage} 
            alt="PLANIFI" 
            className="w-16 h-16 object-contain"
          />
        </div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold">¡Hola, Juan! 👋</h2>
            <p className="text-white/80">Aquí tienes tu resumen financiero</p>
          </div>
          <button
            onClick={() => setShowBalance(!showBalance)}
            className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
          >
            {showBalance ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
          </button>
        </div>
        
        <div className="space-y-2">
          <p className="text-white/80 text-sm">Balance Total</p>
          <p className="text-3xl font-bold">
            {showBalance ? '$5.840.500' : '•••••••'}
          </p>
          <div className="flex items-center space-x-2">
            <Badge className="bg-white/20 text-white hover:bg-white/30">
              <TrendingUp className="w-3 h-3 mr-1" />
              +12.5% este mes
            </Badge>
          </div>
        </div>
      </Card>

      {/* Quick Actions */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Acciones Rápidas</h3>
          <div className="flex items-center space-x-2">
            <img 
              src={exampleImage} 
              alt="PLANIFI" 
              className="w-6 h-6 opacity-60 object-contain"
            />
            <span className="text-xs text-primary font-medium">PLANIFI</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((action) => (
            <button
              key={action.id}
              onClick={action.action}
              className={`flex flex-col items-center justify-center p-4 border rounded-xl transition-colors ${action.color}`}
            >
              {action.icon}
              <span className="font-medium text-sm mt-2">{action.title}</span>
              <span className="text-xs text-muted-foreground text-center">{action.description}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Financial Shortcuts */}
      <div>
        <h3 className="font-semibold mb-4">Resumen Rápido</h3>
        <div className="grid gap-3">
          {shortcuts.map((shortcut) => (
            <Card key={shortcut.id} className="p-4 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gray-50 rounded-lg">
                    {shortcut.icon}
                  </div>
                  <div>
                    <p className="font-medium">{shortcut.title}</p>
                    <p className="text-2xl font-bold text-foreground">{shortcut.value}</p>
                  </div>
                </div>
                <div className={`text-sm font-medium ${
                  shortcut.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {shortcut.change}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Smart Features */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Funciones Inteligentes</h3>
          <div className="flex items-center space-x-1">
            <Zap className="w-4 h-4 text-yellow-500" />
            <img 
              src={exampleImage} 
              alt="PLANIFI" 
              className="w-4 h-4 opacity-60 object-contain"
            />
          </div>
        </div>
        <div className="space-y-3">
          <button className="flex items-center justify-between w-full p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg hover:from-yellow-100 hover:to-orange-100 transition-colors">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                <Zap className="w-4 h-4 text-yellow-600" />
              </div>
              <div className="text-left">
                <p className="font-medium">Redondeo Automático</p>
                <p className="text-sm text-muted-foreground">Ahorraste $15.500 este mes</p>
              </div>
            </div>
            <Settings className="w-5 h-5 text-muted-foreground" />
          </button>
          
          <button className="flex items-center justify-between w-full p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg hover:from-blue-100 hover:to-purple-100 transition-colors">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Target className="w-4 h-4 text-blue-600" />
              </div>
              <div className="text-left">
                <p className="font-medium">Metas Inteligentes</p>
                <p className="text-sm text-muted-foreground">2 metas en progreso</p>
              </div>
            </div>
            <Settings className="w-5 h-5 text-muted-foreground" />
          </button>
          
          <button className="flex items-center justify-between w-full p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg hover:from-green-100 hover:to-emerald-100 transition-colors">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Gift className="w-4 h-4 text-green-600" />
              </div>
              <div className="text-left">
                <p className="font-medium">Retos Activos</p>
                <p className="text-sm text-muted-foreground">Participa en 3 desafíos</p>
              </div>
            </div>
            <Badge className="bg-green-100 text-green-800">¡Nuevo!</Badge>
          </button>
        </div>
      </Card>

      {/* Recent Activity */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Actividad Reciente</h3>
          <button className="text-sm text-primary hover:underline">Ver todo</button>
        </div>
        <div className="space-y-3">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  activity.type === 'expense' ? 'bg-red-100' :
                  activity.type === 'income' ? 'bg-green-100' : 'bg-blue-100'
                }`}>
                  {activity.type === 'expense' ? (
                    <ArrowDownRight className="w-4 h-4 text-red-600" />
                  ) : activity.type === 'income' ? (
                    <ArrowUpRight className="w-4 h-4 text-green-600" />
                  ) : (
                    <PiggyBank className="w-4 h-4 text-blue-600" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-sm">{activity.description}</p>
                  <p className="text-xs text-muted-foreground">{activity.category} • {activity.time}</p>
                </div>
              </div>
              <p className={`font-bold text-sm ${
                activity.type === 'expense' ? 'text-red-600' : 'text-green-600'
              }`}>
                {activity.amount}
              </p>
            </div>
          ))}
        </div>
      </Card>

      {/* Upcoming Events */}
      <Card className="p-4">
        <div className="flex items-center space-x-2 mb-4">
          <Calendar className="w-5 h-5 text-primary" />
          <h3 className="font-semibold">Próximos Eventos</h3>
        </div>
        <div className="space-y-3">
          {upcomingEvents.map((event) => (
            <div key={event.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  event.type === 'payment' ? 'bg-orange-100' : 'bg-green-100'
                }`}>
                  {event.type === 'payment' ? (
                    <CreditCard className="w-4 h-4 text-orange-600" />
                  ) : (
                    <Target className="w-4 h-4 text-green-600" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-sm">{event.title}</p>
                  <p className="text-xs text-muted-foreground">{event.date}</p>
                </div>
              </div>
              <p className="font-bold text-sm">{event.amount}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Quick Links */}
      <div className="grid grid-cols-2 gap-3">
        <Button variant="outline" className="flex items-center justify-center space-x-2 h-12">
          <Users className="w-5 h-5" />
          <span>Invitar Amigos</span>
        </Button>
        <Button variant="outline" className="flex items-center justify-center space-x-2 h-12">
          <Bell className="w-5 h-5" />
          <span>Notificaciones</span>
        </Button>
      </div>
    </div>
  );
}