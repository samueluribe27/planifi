import React, { useState } from 'react';
import { Bell, Menu, User, LogOut, Settings, CreditCard, HelpCircle, Shield, Smartphone, ChevronDown } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Separator } from '../ui/separator';
import exampleImage from 'figma:asset/0f2513855b8bdbb1e643ad93bb7299102d3e32f6.png';

interface AppHeaderProps {
  title: string;
  subtitle?: string;
  showNotifications?: boolean;
  notificationCount?: number;
}

export function AppHeader({ 
  title, 
  subtitle, 
  showNotifications = true, 
  notificationCount = 3 
}: AppHeaderProps) {
  const [showUserMenu, setShowUserMenu] = useState(false);

  const userMenuItems = [
    {
      id: 'profile',
      label: 'Mi Perfil',
      icon: <User className="w-4 h-4" />,
      action: () => console.log('Profile')
    },
    {
      id: 'accounts',
      label: 'Mis Cuentas',
      icon: <CreditCard className="w-4 h-4" />,
      action: () => console.log('Accounts')
    },
    {
      id: 'security',
      label: 'Seguridad',
      icon: <Shield className="w-4 h-4" />,
      action: () => console.log('Security')
    },
    {
      id: 'settings',
      label: 'Configuración',
      icon: <Settings className="w-4 h-4" />,
      action: () => console.log('Settings')
    },
    {
      id: 'help',
      label: 'Ayuda',
      icon: <HelpCircle className="w-4 h-4" />,
      action: () => console.log('Help')
    }
  ];

  return (
    <>
      <div className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-40">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img 
              src={exampleImage} 
              alt="PLANIFI Logo" 
              className="w-8 h-8 object-contain"
            />
            <div>
              <h1 className="text-lg font-semibold text-foreground">{title}</h1>
              {subtitle && (
                <p className="text-sm text-muted-foreground">{subtitle}</p>
              )}
            </div>
          </div>
          
          {showNotifications && (
            <div className="flex items-center space-x-2">
              <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <Bell className="w-5 h-5 text-muted-foreground" />
                {notificationCount > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-1 -right-1 w-5 h-5 text-xs flex items-center justify-center p-0"
                  >
                    {notificationCount}
                  </Badge>
                )}
              </button>
              <button 
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                <Menu className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* User Menu Overlay */}
      {showUserMenu && (
        <>
          <div 
            className="fixed inset-0 z-50 bg-black/20"
            onClick={() => setShowUserMenu(false)}
          />
          <Card className="fixed top-20 right-4 w-80 z-50 p-0 overflow-hidden shadow-xl">
            {/* User Profile Section */}
            <div className="p-4 planifi-gradient text-white">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">Juan Quintero</h3>
                  <p className="text-white/80 text-sm">juan.quintero@email.com</p>
                  <div className="flex items-center space-x-1 mt-1">
                    <Badge className="bg-white/20 text-white text-xs">
                      Premium
                    </Badge>
                    <span className="text-white/60 text-xs">• Miembro desde 2023</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 flex items-center justify-between">
                <div className="text-center">
                  <p className="text-white/80 text-xs">Balance Total</p>
                  <p className="font-bold">$5.840.500</p>
                </div>
                <div className="text-center">
                  <p className="text-white/80 text-xs">Ahorros</p>
                  <p className="font-bold">$2.450.000</p>
                </div>
                <div className="text-center">
                  <p className="text-white/80 text-xs">Nivel</p>
                  <p className="font-bold">Experto</p>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="p-2">
              {userMenuItems.map((item, index) => (
                <React.Fragment key={item.id}>
                  <button
                    onClick={item.action}
                    className="flex items-center space-x-3 w-full p-3 hover:bg-gray-50 rounded-lg transition-colors text-left"
                  >
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                      {item.icon}
                    </div>
                    <span className="font-medium">{item.label}</span>
                  </button>
                  {index === 1 && <Separator className="my-1" />}
                  {index === 3 && <Separator className="my-1" />}
                </React.Fragment>
              ))}
              
              <Separator className="my-1" />
              
              {/* Quick Actions */}
              <div className="p-2">
                <p className="text-xs text-muted-foreground mb-2 px-2">Acceso Rápido</p>
                <div className="grid grid-cols-2 gap-2">
                  <Button size="sm" variant="outline" className="text-xs h-8">
                    <Smartphone className="w-3 h-3 mr-1" />
                    App Móvil
                  </Button>
                  <Button size="sm" variant="outline" className="text-xs h-8">
                    <Settings className="w-3 h-3 mr-1" />
                    Preferencias
                  </Button>
                </div>
              </div>
              
              <Separator className="my-1" />
              
              {/* Logout */}
              <button
                onClick={() => {
                  console.log('Logout');
                  setShowUserMenu(false);
                }}
                className="flex items-center space-x-3 w-full p-3 hover:bg-red-50 rounded-lg transition-colors text-red-600 text-left"
              >
                <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                  <LogOut className="w-4 h-4" />
                </div>
                <span className="font-medium">Cerrar Sesión</span>
              </button>
            </div>

            {/* Footer */}
            <div className="p-3 bg-gray-50 border-t">
              <div className="flex items-center justify-center space-x-2">
                <img 
                  src={exampleImage} 
                  alt="PLANIFI" 
                  className="w-5 h-5 object-contain"
                />
                <span className="text-xs text-muted-foreground">PLANIFI v2.1.0</span>
              </div>
            </div>
          </Card>
        </>
      )}
    </>
  );
}