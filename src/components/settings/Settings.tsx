import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Switch } from '../ui/switch';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { 
  CreditCard, 
  Bell, 
  Shield, 
  Smartphone, 
  Coins, 
  Settings as SettingsIcon,
  Plus,
  Edit,
  Trash2,
  ChevronRight,
  Landmark
} from 'lucide-react';
import exampleImage from 'figma:asset/logo_planifi.png';

interface BankAccount {
  id: string;
  name: string;
  bank: string;
  type: string;
  balance: number;
  connected: boolean;
  lastSync: string;
}

interface SavingRule {
  id: string;
  name: string;
  type: 'roundup' | 'percentage' | 'fixed' | 'conditional';
  description: string;
  active: boolean;
  amount: string;
}

export function Settings() {
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([
    {
      id: '1',
      name: '**** 1234',
      bank: 'Banco de Bogotá',
      type: 'Cuenta Corriente',
      balance: 3420500,
      connected: true,
      lastSync: '2 min ago'
    },
    {
      id: '2',
      name: '**** 5678',
      bank: 'Bancolombia',
      type: 'Cuenta Ahorro',
      balance: 1680000,
      connected: true,
      lastSync: '5 min ago'
    },
    {
      id: '3',
      name: '**** 9012',
      bank: 'Banco Popular',
      type: 'Tarjeta Crédito',
      balance: -450750,
      connected: false,
      lastSync: '2 días ago'
    }
  ]);

  const [savingRules, setSavingRules] = useState<SavingRule[]>([
    {
      id: '1',
      name: 'Redondeo Automático',
      type: 'roundup',
      description: 'Redondea todas las compras al peso más cercano',
      active: true,
      amount: '$500 promedio'
    },
    {
      id: '2',
      name: 'Ahorro del 20%',
      type: 'percentage',
      description: 'Ahorra 20% de ingresos extraordinarios',
      active: true,
      amount: '20%'
    },
    {
      id: '3',
      name: 'Café vs Ahorro',
      type: 'conditional',
      description: 'Si gastas en café, ahorra la misma cantidad',
      active: false,
      amount: '1:1'
    },
    {
      id: '4',
      name: 'Viernes de Ahorro',
      type: 'fixed',
      description: 'Transfiere $50.000 COP cada viernes a ahorros',
      active: true,
      amount: '$50.000'
    }
  ]);

  const [notifications, setNotifications] = useState({
    push: true,
    email: true,
    sms: false,
    goalReminders: true,
    spendingAlerts: true,
    savingTips: true
  });

  const toggleRule = (ruleId: string) => {
    setSavingRules(rules => 
      rules.map(rule => 
        rule.id === ruleId 
          ? { ...rule, active: !rule.active }
          : rule
      )
    );
  };

  const toggleAccount = (accountId: string) => {
    setBankAccounts(accounts => 
      accounts.map(account => 
        account.id === accountId 
          ? { ...account, connected: !account.connected }
          : account
      )
    );
  };

  return (
    <div className="space-y-6 pb-24">
      {/* PLANIFI Header */}
      <Card className="p-4 planifi-gradient text-white">
        <div className="flex items-center space-x-3">
          <img 
            src={exampleImage} 
            alt="PLANIFI" 
            className="w-10 h-10 object-contain"
          />
          <div>
            <h2 className="font-bold text-lg">PLANIFI Settings</h2>
            <p className="text-white/80">Configura tu experiencia financiera</p>
          </div>
        </div>
      </Card>

      {/* Bank Accounts */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Landmark className="w-5 h-5 text-primary" />
            <h3 className="font-semibold">Cuentas Bancarias</h3>
          </div>
          <Button size="sm" className="planifi-gradient">
            <Plus className="w-4 h-4 mr-2" />
            Agregar
          </Button>
        </div>
        
        <div className="space-y-3">
          {bankAccounts.map((account) => (
            <div key={account.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{account.name}</span>
                    <Badge variant={account.connected ? "default" : "secondary"}>
                      {account.connected ? 'Conectada' : 'Desconectada'}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{account.bank} • {account.type}</p>
                  <p className="text-sm font-medium">
                    ${Math.abs(account.balance).toLocaleString()} COP
                    {account.balance < 0 && ' (Deuda)'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  checked={account.connected}
                  onCheckedChange={() => toggleAccount(account.id)}
                />
                <Button size="icon" variant="ghost">
                  <Edit className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Saving Rules */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Coins className="w-5 h-5 text-primary" />
            <h3 className="font-semibold">Reglas de Ahorro</h3>
          </div>
          <Button size="sm" variant="outline">
            <Plus className="w-4 h-4 mr-2" />
            Nueva Regla
          </Button>
        </div>
        
        <div className="space-y-3">
          {savingRules.map((rule) => (
            <div key={rule.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-medium">{rule.name}</span>
                  <Badge variant="outline">{rule.amount}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{rule.description}</p>
              </div>
              
              <Switch
                checked={rule.active}
                onCheckedChange={() => toggleRule(rule.id)}
              />
            </div>
          ))}
        </div>
      </Card>

      {/* Notifications */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Bell className="w-5 h-5 text-primary" />
            <h3 className="font-semibold">Notificaciones</h3>
          </div>
          <img 
            src={exampleImage} 
            alt="PLANIFI" 
            className="w-6 h-6 opacity-60 object-contain"
          />
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Notificaciones Push</p>
              <p className="text-sm text-muted-foreground">Recibe alertas en tiempo real</p>
            </div>
            <Switch
              checked={notifications.push}
              onCheckedChange={(checked) => 
                setNotifications(prev => ({ ...prev, push: checked }))
              }
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Recordatorios de Metas</p>
              <p className="text-sm text-muted-foreground">Progreso hacia tus objetivos</p>
            </div>
            <Switch
              checked={notifications.goalReminders}
              onCheckedChange={(checked) => 
                setNotifications(prev => ({ ...prev, goalReminders: checked }))
              }
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Alertas de Gastos</p>
              <p className="text-sm text-muted-foreground">Avisos de gastos inusuales</p>
            </div>
            <Switch
              checked={notifications.spendingAlerts}
              onCheckedChange={(checked) => 
                setNotifications(prev => ({ ...prev, spendingAlerts: checked }))
              }
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Consejos de Ahorro</p>
              <p className="text-sm text-muted-foreground">Tips personalizados semanalmente</p>
            </div>
            <Switch
              checked={notifications.savingTips}
              onCheckedChange={(checked) => 
                setNotifications(prev => ({ ...prev, savingTips: checked }))
              }
            />
          </div>
        </div>
      </Card>

      {/* Security & Privacy */}
      <Card className="p-4">
        <div className="flex items-center space-x-2 mb-4">
          <Shield className="w-5 h-5 text-primary" />
          <h3 className="font-semibold">Seguridad y Privacidad</h3>
        </div>
        
        <div className="space-y-3">
          <button className="flex items-center justify-between w-full p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <div className="text-left">
              <p className="font-medium">Autenticación Biométrica</p>
              <p className="text-sm text-muted-foreground">Usa tu huella o Face ID</p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>
          
          <button className="flex items-center justify-between w-full p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <div className="text-left">
              <p className="font-medium">Cambiar PIN</p>
              <p className="text-sm text-muted-foreground">Actualiza tu código de seguridad</p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>
          
          <button className="flex items-center justify-between w-full p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <div className="text-left">
              <p className="font-medium">Privacidad de Datos</p>
              <p className="text-sm text-muted-foreground">Controla qué información compartir</p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
      </Card>

      {/* App Settings */}
      <Card className="p-4">
        <div className="flex items-center space-x-2 mb-4">
          <SettingsIcon className="w-5 h-5 text-primary" />
          <h3 className="font-semibold">Configuración de la App</h3>
        </div>
        
        <div className="space-y-3">
          <button className="flex items-center justify-between w-full p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <div className="text-left">
              <p className="font-medium">Tema de la Aplicación</p>
              <p className="text-sm text-muted-foreground">Claro • Oscuro • Automático</p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>
          
          <button className="flex items-center justify-between w-full p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <div className="text-left">
              <p className="font-medium">Moneda Principal</p>
              <p className="text-sm text-muted-foreground">Peso Colombiano (COP)</p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>
          
          <button className="flex items-center justify-between w-full p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <div className="text-left">
              <p className="font-medium">Idioma</p>
              <p className="text-sm text-muted-foreground">Español (Colombia)</p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
      </Card>
    </div>
  );
}