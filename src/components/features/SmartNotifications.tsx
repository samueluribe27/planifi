import React, { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { X, TrendingUp, AlertTriangle, Target, Gift, Bell, Check } from 'lucide-react';

interface Notification {
  id: string;
  type: 'success' | 'warning' | 'info' | 'achievement';
  title: string;
  message: string;
  timestamp: Date;
  actions?: Array<{
    label: string;
    action: () => void;
    variant?: 'primary' | 'secondary';
  }>;
}

export function SmartNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'achievement',
      title: '¡Meta Alcanzada! 🎉',
      message: 'Completaste tu meta de ahorro mensual de $500.000 COP',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      actions: [
        { label: 'Ver Detalles', action: () => console.log('View details'), variant: 'primary' },
        { label: 'Siguiente Meta', action: () => console.log('Next goal'), variant: 'secondary' }
      ]
    },
    {
      id: '2',
      type: 'warning',
      title: 'Gasto Inusual Detectado',
      message: 'Has gastado 40% más de lo normal en entretenimiento esta semana',
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      actions: [
        { label: 'Revisar Gastos', action: () => console.log('Review expenses'), variant: 'primary' }
      ]
    },
    {
      id: '3',
      type: 'info',
      title: 'Oportunidad de Ahorro',
      message: 'Puedes ahorrar $15.000 COP este mes activando el redondeo automático',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      actions: [
        { label: 'Activar', action: () => console.log('Activate'), variant: 'primary' },
        { label: 'Más Tarde', action: () => console.log('Later'), variant: 'secondary' }
      ]
    },
    {
      id: '4',
      type: 'success',
      title: 'Inversión Rentable',
      message: 'Tu inversión en el fondo ABC generó +12.5% este mes',
      timestamp: new Date(Date.now() - 60 * 60 * 1000),
      actions: [
        { label: 'Ver Portafolio', action: () => console.log('View portfolio'), variant: 'primary' }
      ]
    }
  ]);

  const [showNotifications, setShowNotifications] = useState(false);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success': return <TrendingUp className="w-5 h-5 text-green-600" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-orange-600" />;
      case 'info': return <Bell className="w-5 h-5 text-blue-600" />;
      case 'achievement': return <Gift className="w-5 h-5 text-purple-600" />;
      default: return <Bell className="w-5 h-5 text-gray-600" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success': return 'bg-green-50 border-green-200';
      case 'warning': return 'bg-orange-50 border-orange-200';
      case 'info': return 'bg-blue-50 border-blue-200';
      case 'achievement': return 'bg-purple-50 border-purple-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    
    if (minutes < 1) return 'Ahora';
    if (minutes < 60) return `${minutes}m`;
    if (minutes < 1440) return `${Math.floor(minutes / 60)}h`;
    return `${Math.floor(minutes / 1440)}d`;
  };

  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications([]);
  };

  // Simular notificaciones en tiempo real
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.3) { // 30% chance every 30 seconds
        const newNotification: Notification = {
          id: Date.now().toString(),
          type: 'info',
          title: 'Recordatorio Inteligente',
          message: 'Es un buen momento para revisar tus metas de ahorro',
          timestamp: new Date(),
          actions: [
            { label: 'Ver Metas', action: () => console.log('View goals'), variant: 'primary' }
          ]
        };
        setNotifications(prev => [newNotification, ...prev.slice(0, 4)]);
      }
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Notification Bell with Counter */}
      <div className="fixed top-4 right-16 z-40">
        <button
          onClick={() => setShowNotifications(!showNotifications)}
          className="relative p-2 bg-white rounded-full shadow-lg border hover:shadow-xl transition-shadow"
        >
          <Bell className="w-5 h-5 text-muted-foreground" />
          {notifications.length > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 w-5 h-5 text-xs flex items-center justify-center p-0"
            >
              {notifications.length}
            </Badge>
          )}
        </button>
      </div>

      {/* Notifications Panel */}
      {showNotifications && (
        <>
          <div 
            className="fixed inset-0 z-45" 
            onClick={() => setShowNotifications(false)}
          />
          <Card className="fixed top-16 right-4 w-96 max-h-[70vh] z-50 p-0 overflow-hidden shadow-xl">
            <div className="p-4 bg-gray-50 border-b">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Notificaciones</h3>
                <div className="flex items-center space-x-2">
                  <Button size="sm" variant="ghost" onClick={markAllAsRead}>
                    <Check className="w-4 h-4 mr-1" />
                    Marcar todo
                  </Button>
                  <button onClick={() => setShowNotifications(false)}>
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-8 text-center">
                  <Bell className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No hay notificaciones nuevas</p>
                </div>
              ) : (
                <div className="space-y-1 p-2">
                  {notifications.map((notification) => (
                    <Card 
                      key={notification.id} 
                      className={`p-3 ${getNotificationColor(notification.type)} hover:shadow-md transition-shadow`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3 flex-1">
                          {getNotificationIcon(notification.type)}
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium text-sm">{notification.title}</h4>
                              <div className="flex items-center space-x-2">
                                <span className="text-xs text-muted-foreground">
                                  {formatTimeAgo(notification.timestamp)}
                                </span>
                                <button
                                  onClick={() => dismissNotification(notification.id)}
                                  className="text-gray-400 hover:text-gray-600"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              {notification.message}
                            </p>
                            
                            {notification.actions && (
                              <div className="flex space-x-2 mt-3">
                                {notification.actions.map((action, index) => (
                                  <Button
                                    key={index}
                                    size="sm"
                                    variant={action.variant === 'primary' ? 'default' : 'outline'}
                                    onClick={action.action}
                                    className={action.variant === 'primary' ? 'planifi-gradient' : ''}
                                  >
                                    {action.label}
                                  </Button>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </Card>
        </>
      )}
    </>
  );
}