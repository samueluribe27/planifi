import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { X, DollarSign, Tag, Calendar, Camera, Mic } from 'lucide-react';

interface QuickAddExpenseProps {
  isOpen: boolean;
  onClose: () => void;
}

export function QuickAddExpense({ isOpen, onClose }: QuickAddExpenseProps) {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isListening, setIsListening] = useState(false);

  const categories = [
    { id: 'food', name: 'Alimentación', color: 'bg-green-100 text-green-800' },
    { id: 'transport', name: 'Transporte', color: 'bg-blue-100 text-blue-800' },
    { id: 'entertainment', name: 'Entretenimiento', color: 'bg-purple-100 text-purple-800' },
    { id: 'shopping', name: 'Compras', color: 'bg-orange-100 text-orange-800' },
    { id: 'utilities', name: 'Servicios', color: 'bg-red-100 text-red-800' },
    { id: 'health', name: 'Salud', color: 'bg-pink-100 text-pink-800' }
  ];

  const handleVoiceInput = () => {
    setIsListening(true);
    // Simular entrada por voz
    setTimeout(() => {
      setDescription('Almuerzo en restaurante');
      setAmount('45000');
      setIsListening(false);
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-50" onClick={onClose} />
      <Card className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-md z-50 p-0 overflow-hidden">
        <div className="p-4 planifi-gradient text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <DollarSign className="w-5 h-5" />
              <h3 className="font-semibold">Agregar Gasto Rápido</h3>
            </div>
            <button onClick={onClose} className="p-1 hover:bg-white/20 rounded">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <div className="p-4 space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Monto</label>
            <Input
              type="number"
              placeholder="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="text-2xl font-bold text-center"
            />
          </div>
          
          <div>
            <label className="text-sm font-medium mb-2 block">Descripción</label>
            <div className="flex space-x-2">
              <Input
                placeholder="¿En qué gastaste?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="flex-1"
              />
              <Button
                size="icon"
                variant="outline"
                onClick={handleVoiceInput}
                className={isListening ? 'bg-red-100 text-red-600' : ''}
              >
                <Mic className="w-4 h-4" />
              </Button>
            </div>
            {isListening && (
              <p className="text-sm text-red-600 mt-1">Escuchando...</p>
            )}
          </div>
          
          <div>
            <label className="text-sm font-medium mb-2 block">Categoría</label>
            <div className="grid grid-cols-3 gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`p-2 rounded-lg text-xs font-medium transition-all ${
                    selectedCategory === category.id 
                      ? category.color + ' ring-2 ring-primary' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex space-x-2">
            <Button variant="outline" className="flex-1">
              <Camera className="w-4 h-4 mr-2" />
              Foto Recibo
            </Button>
            <Button variant="outline" className="flex-1">
              <Calendar className="w-4 h-4 mr-2" />
              Programar
            </Button>
          </div>
          
          <div className="flex space-x-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancelar
            </Button>
            <Button className="flex-1 planifi-gradient">
              Guardar Gasto
            </Button>
          </div>
        </div>
      </Card>
    </>
  );
}