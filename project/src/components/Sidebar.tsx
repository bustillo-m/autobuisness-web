import React, { useState } from 'react';
import { User, Settings, CreditCard, MessageSquare, Plus, Crown, Zap, Target, Building } from 'lucide-react';
import { User as UserType, ChatSession, PricingPlan } from '../types';

interface SidebarProps {
  user: UserType;
  chatSessions: ChatSession[];
  onNewChat: () => void;
  onSelectChat: (chatId: string) => void;
  currentChatId?: string;
  onUpgradePlan: () => void;
}

const planIcons = {
  'Freemium': Target,
  'Starter': Zap,
  'Pro': Crown,
  'Empresa': Building
};

const planColors = {
  'Freemium': 'text-gray-500 bg-gray-100',
  'Starter': 'text-blue-500 bg-blue-100',
  'Pro': 'text-purple-500 bg-purple-100',
  'Empresa': 'text-green-500 bg-green-100'
};

export default function Sidebar({ 
  user, 
  chatSessions, 
  onNewChat, 
  onSelectChat, 
  currentChatId,
  onUpgradePlan 
}: SidebarProps) {
  const [activeTab, setActiveTab] = useState<'chats' | 'account' | 'plans'>('chats');
  const PlanIcon = planIcons[user.plan];

  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return 'Hoy';
    if (days === 1) return 'Ayer';
    if (days < 7) return `Hace ${days} días`;
    return date.toLocaleDateString();
  };

  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-full p-2">
            <User className="h-6 w-6 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="font-semibold text-gray-900">{user.name}</h2>
            <div className="flex items-center space-x-2">
              <PlanIcon className="h-4 w-4" />
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${planColors[user.plan]}`}>
                {user.plan}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab('chats')}
          className={`flex-1 px-4 py-3 text-sm font-medium ${
            activeTab === 'chats'
              ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <MessageSquare className="h-4 w-4 mx-auto mb-1" />
          Chats
        </button>
        <button
          onClick={() => setActiveTab('account')}
          className={`flex-1 px-4 py-3 text-sm font-medium ${
            activeTab === 'account'
              ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <Settings className="h-4 w-4 mx-auto mb-1" />
          Cuenta
        </button>
        <button
          onClick={() => setActiveTab('plans')}
          className={`flex-1 px-4 py-3 text-sm font-medium ${
            activeTab === 'plans'
              ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <CreditCard className="h-4 w-4 mx-auto mb-1" />
          Planes
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'chats' && (
          <div className="p-4 space-y-4">
            <button
              onClick={onNewChat}
              className="w-full flex items-center space-x-3 p-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200"
            >
              <Plus className="h-5 w-5" />
              <span className="font-medium">Nuevo Chat</span>
            </button>
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-700 px-2">Conversaciones Recientes</h3>
              {chatSessions.length === 0 ? (
                <p className="text-sm text-gray-500 px-2 py-4 text-center">
                  No hay conversaciones aún.
                  <br />¡Inicia tu primer chat!
                </p>
              ) : (
                chatSessions.map((session) => (
                  <button
                    key={session.id}
                    onClick={() => onSelectChat(session.id)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      currentChatId === session.id
                        ? 'bg-blue-50 border border-blue-200'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="font-medium text-sm text-gray-900 mb-1 truncate">
                      {session.title}
                    </div>
                    <div className="text-xs text-gray-500 mb-1 truncate">
                      {session.lastMessage}
                    </div>
                    <div className="flex justify-between items-center text-xs text-gray-400">
                      <span>{formatDate(session.timestamp)}</span>
                      <span>{session.messageCount} mensajes</span>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === 'account' && (
          <div className="p-4 space-y-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-3">Información de la Cuenta</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Email:</span>
                  <span className="text-gray-900">{user.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Plan Actual:</span>
                  <span className="text-gray-900">{user.plan}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Créditos:</span>
                  <span className="text-green-600 font-medium">{user.credits}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Miembro desde:</span>
                  <span className="text-gray-900">{user.createdAt.toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">Estado del Plan</h4>
              <p className="text-sm text-blue-700 mb-3">
                {user.plan === 'Freemium' 
                  ? 'Estás usando el plan gratuito. Mejora para obtener más funciones.'
                  : `Plan ${user.plan} activo. Aprovecha todas las funciones disponibles.`
                }
              </p>
              <button
                onClick={onUpgradePlan}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                {user.plan === 'Freemium' ? 'Mejorar Plan' : 'Cambiar Plan'}
              </button>
            </div>
          </div>
        )}

        {activeTab === 'plans' && (
          <div className="p-4 space-y-4">
            <div className="text-center mb-4">
              <h3 className="font-semibold text-gray-900 mb-2">Planes Disponibles</h3>
              <p className="text-sm text-gray-600">
                Elige el plan que mejor se adapte a tus necesidades
              </p>
            </div>

            <div className="space-y-3">
              {(['Freemium', 'Starter', 'Pro', 'Empresa'] as const).map((planName) => {
                const Icon = planIcons[planName];
                const isCurrentPlan = user.plan === planName;
                
                return (
                  <div
                    key={planName}
                    className={`border rounded-lg p-4 ${
                      isCurrentPlan
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Icon className={`h-5 w-5 ${isCurrentPlan ? 'text-blue-600' : 'text-gray-600'}`} />
                        <span className={`font-medium ${isCurrentPlan ? 'text-blue-900' : 'text-gray-900'}`}>
                          {planName}
                        </span>
                      </div>
                      {isCurrentPlan && (
                        <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded-full">
                          Actual
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      {planName === 'Freemium' && 'Plan básico gratuito con funciones limitadas'}
                      {planName === 'Starter' && 'Ideal para pequeños negocios y startups'}
                      {planName === 'Pro' && 'Para empresas en crecimiento con necesidades avanzadas'}
                      {planName === 'Empresa' && 'Solución completa para grandes organizaciones'}
                    </p>
                    <div className="text-sm text-gray-600 mb-3">
                      Precio: {planName === 'Freemium' ? 'Gratis' : `$${planName === 'Starter' ? '29' : planName === 'Pro' ? '99' : '299'}/mes`}
                    </div>
                    {!isCurrentPlan && (
                      <button
                        onClick={onUpgradePlan}
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 px-4 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200 text-sm"
                      >
                        {planName === 'Freemium' ? 'Cambiar a Freemium' : 'Seleccionar Plan'}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Credits Info */}
      <div className="p-4 border-t border-gray-200">
        <div className="bg-green-50 rounded-lg p-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-900">Créditos Disponibles</p>
              <p className="text-lg font-bold text-green-600">{user.credits}</p>
            </div>
            <div className="text-green-500">
              <Zap className="h-6 w-6" />
            </div>
          </div>
          {user.credits < 5 && (
            <p className="text-xs text-green-700 mt-2">
              Considera mejorar tu plan para más créditos
            </p>
          )}
        </div>
      </div>
    </div>
  );
}