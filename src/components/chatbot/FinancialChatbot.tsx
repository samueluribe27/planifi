import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { ScrollArea } from '../ui/scroll-area';
import { Send, Bot, User, TrendingUp, PiggyBank, AlertCircle } from 'lucide-react';
import exampleImage from 'figma:asset/0f2513855b8bdbb1e643ad93bb7299102d3e32f6.png';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

export function FinancialChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: '¡Hola! Soy tu asistente financiero inteligente de PLANIFI. Puedo ayudarte con análisis de gastos, recomendaciones de ahorro y estrategias de inversión. ¿En qué puedo ayudarte hoy?',
      timestamp: new Date(),
      suggestions: ['Analizar mis gastos', 'Crear plan de ahorro', 'Consejos de inversión']
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const quickResponses = {
    'gastos': {
      content: 'He analizado tus gastos del último mes. Noté que gastaste 15% más en entretenimiento que el mes anterior. Te recomiendo establecer un límite de $400.000 COP para esta categoría.',
      suggestions: ['Ver detalles de gastos', 'Establecer límites', 'Crear alertas']
    },
    'ahorro': {
      content: 'Basado en tus ingresos y gastos, puedes ahorrar $350.000 COP adicionales este mes. Te sugiero activar el redondeo automático y crear una regla de ahorro del 20% en tus compras de fin de semana.',
      suggestions: ['Activar redondeo', 'Crear regla IFTTT', 'Ver plan personalizado']
    },
    'inversión': {
      content: 'Tu perfil sugiere una estrategia conservadora-moderada. Con $1.200.000 COP disponibles, te recomiendo 60% en fondos indexados, 30% en bonos y 10% en acciones individuales.',
      suggestions: ['Ver portafolio sugerido', 'Comenzar con $100.000', 'Aprender más']
    }
  };

  const handleSendMessage = (message: string) => {
    if (!message.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: message,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    // Simulate AI response
    setTimeout(() => {
      let botResponse: Message;
      const lowerMessage = message.toLowerCase();
      
      if (lowerMessage.includes('gasto') || lowerMessage.includes('análisis')) {
        botResponse = {
          id: (Date.now() + 1).toString(),
          type: 'bot',
          content: quickResponses.gastos.content,
          timestamp: new Date(),
          suggestions: quickResponses.gastos.suggestions
        };
      } else if (lowerMessage.includes('ahorro') || lowerMessage.includes('ahorrar')) {
        botResponse = {
          id: (Date.now() + 1).toString(),
          type: 'bot',
          content: quickResponses.ahorro.content,
          timestamp: new Date(),
          suggestions: quickResponses.ahorro.suggestions
        };
      } else if (lowerMessage.includes('inversión') || lowerMessage.includes('invertir')) {
        botResponse = {
          id: (Date.now() + 1).toString(),
          type: 'bot',
          content: quickResponses.inversión.content,
          timestamp: new Date(),
          suggestions: quickResponses.inversión.suggestions
        };
      } else {
        botResponse = {
          id: (Date.now() + 1).toString(),
          type: 'bot',
          content: 'Entiendo tu consulta. Basado en tu historial financiero, te puedo ayudar con análisis detallados, estrategias de ahorro personalizadas y recomendaciones de inversión. ¿Sobre cuál de estos temas te gustaría saber más?',
          timestamp: new Date(),
          suggestions: ['Analizar gastos', 'Plan de ahorro', 'Estrategia inversión']
        };
      }

      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  return (
    <div className="flex flex-col h-full pb-24">
      {/* Chat Header */}
      <Card className="p-4 mb-4 planifi-card-shadow">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
            <img 
              src={exampleImage} 
              alt="PLANIFI AI" 
              className="w-6 h-6 object-contain"
            />
          </div>
          <div>
            <h3 className="font-semibold">PLANIFI AI Assistant</h3>
            <p className="text-sm text-muted-foreground">Tu consejero financiero personal</p>
          </div>
        </div>
      </Card>

      {/* Insights Cards */}
      <div className="grid grid-cols-1 gap-3 mb-4">
        <Card className="p-3 bg-green-50 border-green-200">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-800">Oportunidad de ahorro detectada</span>
          </div>
          <p className="text-sm text-green-700 mt-1">Puedes ahorrar $45.000 COP cambiando tu plan de telefonía</p>
        </Card>
        
        <Card className="p-3 bg-blue-50 border-blue-200">
          <div className="flex items-center space-x-2">
            <PiggyBank className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-800">Meta de ahorro en progreso</span>
          </div>
          <p className="text-sm text-blue-700 mt-1">Faltan $320.000 COP para completar tu fondo de emergencia</p>
        </Card>
        
        <Card className="p-3 bg-orange-50 border-orange-200">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-orange-600" />
            <span className="text-sm font-medium text-orange-800">Alerta de gasto inusual</span>
          </div>
          <p className="text-sm text-orange-700 mt-1">Gastos en restaurants 40% más altos que el promedio</p>
        </Card>
      </div>

      {/* Chat Messages */}
      <Card className="flex-1 flex flex-col planifi-card-shadow">
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex items-start space-x-2 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.type === 'user' ? 'bg-primary' : 'bg-gray-100'
                  }`}>
                    {message.type === 'user' ? 
                      <User className="w-4 h-4 text-white" /> : 
                      <img 
                        src={exampleImage} 
                        alt="PLANIFI" 
                        className="w-4 h-4 object-contain"
                      />
                    }
                  </div>
                  <div className={`p-3 rounded-lg ${
                    message.type === 'user' 
                      ? 'bg-primary text-white' 
                      : 'bg-gray-100 text-foreground'
                  }`}>
                    <p className="text-sm">{message.content}</p>
                    {message.suggestions && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {message.suggestions.map((suggestion, index) => (
                          <button
                            key={index}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="px-2 py-1 text-xs bg-white/20 rounded-md hover:bg-white/30 transition-colors"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        
        {/* Chat Input */}
        <div className="p-4 border-t">
          <div className="flex space-x-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Escribe tu consulta financiera..."
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputMessage)}
              className="flex-1"
            />
            <Button
              onClick={() => handleSendMessage(inputMessage)}
              size="icon"
              className="planifi-gradient"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}