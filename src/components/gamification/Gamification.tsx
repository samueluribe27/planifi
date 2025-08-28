import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Trophy, Medal, Target, Users, Flame, Star, Crown, Award } from 'lucide-react';
import exampleImage from 'figma:asset/0f2513855b8bdbb1e643ad93bb7299102d3e32f6.png';

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  progress: number;
  maxProgress: number;
  completed: boolean;
  reward: string;
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  participants: number;
  timeLeft: string;
  progress: number;
  reward: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export function Gamification() {
  const [userLevel, setUserLevel] = useState(12);
  const [userXP, setUserXP] = useState(2450);
  const [nextLevelXP, setNextLevelXP] = useState(3000);
  const [streak, setStreak] = useState(15);

  const achievements: Achievement[] = [
    {
      id: '1',
      name: 'Ahorrador Principiante',
      description: 'Ahorra $1.000.000 COP en un mes',
      icon: <Medal className="w-6 h-6 text-bronze" />,
      progress: 850000,
      maxProgress: 1000000,
      completed: false,
      reward: '50 XP'
    },
    {
      id: '2',
      name: 'Disciplina Total',
      description: 'Mantén un presupuesto 30 días seguidos',
      icon: <Trophy className="w-6 h-6 text-gold" />,
      progress: 30,
      maxProgress: 30,
      completed: true,
      reward: '100 XP'
    },
    {
      id: '3',
      name: 'Inversor Novato',
      description: 'Realiza tu primera inversión',
      icon: <Star className="w-6 h-6 text-silver" />,
      progress: 0,
      maxProgress: 1,
      completed: false,
      reward: '75 XP'
    },
    {
      id: '4',
      name: 'Meta Alcanzada',
      description: 'Completa una meta de ahorro',
      icon: <Target className="w-6 h-6 text-primary" />,
      progress: 1,
      maxProgress: 1,
      completed: true,
      reward: '150 XP'
    }
  ];

  const challenges: Challenge[] = [
    {
      id: '1',
      title: 'Desafío Sin Gastos',
      description: 'Pasa 7 días sin gastos innecesarios',
      participants: 1247,
      timeLeft: '3 días',
      progress: 60,
      reward: '200 XP + Insignia',
      difficulty: 'medium'
    },
    {
      id: '2',
      title: 'Ahorro Express',
      description: 'Ahorra $500.000 COP en 2 semanas',
      participants: 892,
      timeLeft: '9 días',
      progress: 35,
      reward: '150 XP',
      difficulty: 'easy'
    },
    {
      id: '3',
      title: 'Maestro del Presupuesto',
      description: 'No excedas tu presupuesto por 30 días',
      participants: 456,
      timeLeft: '18 días',
      progress: 80,
      reward: '500 XP + Título',
      difficulty: 'hard'
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6 pb-24">
      {/* User Level & XP */}
      <Card className="p-4 planifi-gradient text-white relative overflow-hidden">
        <div className="absolute top-2 right-2 opacity-20">
          <img 
            src={exampleImage} 
            alt="PLANIFI" 
            className="w-12 h-12 object-contain"
          />
        </div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <Crown className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Nivel {userLevel}</h3>
              <p className="text-white/80">Ahorrador Experto</p>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-1">
              <Flame className="w-4 h-4" />
              <span className="font-bold">{streak} días</span>
            </div>
            <p className="text-white/80 text-sm">Racha activa</p>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>XP: {userXP.toLocaleString()}</span>
            <span>Siguiente: {nextLevelXP.toLocaleString()}</span>
          </div>
          <Progress 
            value={(userXP / nextLevelXP) * 100} 
            className="bg-white/20"
          />
        </div>
      </Card>

      <Tabs defaultValue="achievements" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="achievements">Logros</TabsTrigger>
          <TabsTrigger value="challenges">Retos</TabsTrigger>
          <TabsTrigger value="leaderboard">Ranking</TabsTrigger>
        </TabsList>

        <TabsContent value="achievements" className="space-y-4 mt-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Tus Logros</h3>
            <img 
              src={exampleImage} 
              alt="PLANIFI" 
              className="w-6 h-6 opacity-60 object-contain"
            />
          </div>
          <div className="grid gap-4">
            {achievements.map((achievement) => (
              <Card key={achievement.id} className={`p-4 ${achievement.completed ? 'bg-green-50 border-green-200' : ''}`}>
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${achievement.completed ? 'bg-green-100' : 'bg-gray-100'}`}>
                    {achievement.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium">{achievement.name}</h4>
                      {achievement.completed && (
                        <Badge variant="default" className="bg-primary">
                          Completado
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                    
                    {!achievement.completed && (
                      <div className="mt-2">
                        <div className="flex justify-between text-sm mb-1">
                          <span>
                            {achievement.id === '1' 
                              ? `$${achievement.progress.toLocaleString()} / $${achievement.maxProgress.toLocaleString()}`
                              : `${achievement.progress} / ${achievement.maxProgress}`
                            }
                          </span>
                          <span className="text-primary">{achievement.reward}</span>
                        </div>
                        <Progress value={(achievement.progress / achievement.maxProgress) * 100} className="h-2" />
                      </div>
                    )}
                    
                    {achievement.completed && (
                      <div className="mt-2 flex items-center space-x-2">
                        <Award className="w-4 h-4 text-primary" />
                        <span className="text-sm text-primary font-medium">Recompensa: {achievement.reward}</span>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="challenges" className="space-y-4 mt-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Retos Activos</h3>
            <img 
              src={exampleImage} 
              alt="PLANIFI" 
              className="w-6 h-6 opacity-60 object-contain"
            />
          </div>
          <div className="grid gap-4">
            {challenges.map((challenge) => (
              <Card key={challenge.id} className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-medium">{challenge.title}</h4>
                    <p className="text-sm text-muted-foreground">{challenge.description}</p>
                  </div>
                  <Badge className={getDifficultyColor(challenge.difficulty)}>
                    {challenge.difficulty === 'easy' ? 'Fácil' : 
                     challenge.difficulty === 'medium' ? 'Medio' : 'Difícil'}
                  </Badge>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span>{challenge.participants.toLocaleString()} participantes</span>
                      </div>
                      <span className="text-muted-foreground">⏰ {challenge.timeLeft}</span>
                    </div>
                    <span className="text-primary font-medium">{challenge.reward}</span>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Tu progreso</span>
                      <span>{challenge.progress}%</span>
                    </div>
                    <Progress value={challenge.progress} className="h-2" />
                  </div>
                  
                  <Button className="w-full planifi-gradient">
                    {challenge.progress > 0 ? 'Continuar Reto' : 'Unirse al Reto'}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="leaderboard" className="space-y-4 mt-4">
          <Card className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Top Ahorradores de la Semana</h3>
              <img 
                src={exampleImage} 
                alt="PLANIFI" 
                className="w-6 h-6 opacity-60 object-contain"
              />
            </div>
            <div className="space-y-3">
              {[
                { rank: 1, name: 'María González', points: 2850, avatar: '👩' },
                { rank: 2, name: 'Carlos Ruiz', points: 2720, avatar: '👨' },
                { rank: 3, name: 'Ana Martín', points: 2650, avatar: '👩‍🦱' },
                { rank: 4, name: 'Tú', points: 2450, avatar: '🏆', isUser: true },
                { rank: 5, name: 'Luis Torres', points: 2340, avatar: '👨‍🦲' }
              ].map((user) => (
                <div 
                  key={user.rank} 
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    user.isUser ? 'bg-primary/10 border border-primary/20' : 'bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      user.rank === 1 ? 'bg-yellow-400 text-yellow-900' :
                      user.rank === 2 ? 'bg-gray-300 text-gray-700' :
                      user.rank === 3 ? 'bg-orange-400 text-orange-900' :
                      'bg-primary text-primary-foreground'
                    }`}>
                      {user.rank}
                    </div>
                    <span className="text-2xl">{user.avatar}</span>
                    <div>
                      <p className={`font-medium ${user.isUser ? 'text-primary' : ''}`}>
                        {user.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {user.points.toLocaleString()} XP
                      </p>
                    </div>
                  </div>
                  {user.rank <= 3 && (
                    <Trophy className={`w-5 h-5 ${
                      user.rank === 1 ? 'text-yellow-500' :
                      user.rank === 2 ? 'text-gray-400' :
                      'text-orange-500'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}