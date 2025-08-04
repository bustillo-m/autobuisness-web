import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Star, Clock, Tag, Download } from 'lucide-react';
import { ChatMessage, TemplateRecommendation } from '../types/template';
import { openaiService } from '../services/openaiService';
import { templateService } from '../services/templateService';

interface TemplateRecommendationChatProps {
  onTemplateSelect?: (templateId: string) => void;
}

export const TemplateRecommendationChat: React.FC<TemplateRecommendationChatProps> = ({
  onTemplateSelect
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initialize = async () => {
      await Promise.all([
        templateService.initialize(),
        openaiService.initialize()
      ]);
      setIsInitialized(true);
      
      // Mensaje de bienvenida
      const welcomeMessage: ChatMessage = {
        id: 'welcome',
        content: '¡Hola! Soy tu asistente de automatización de procesos. Puedo ayudarte a encontrar la plantilla de workflow perfecta para tu negocio. ¿Qué proceso te gustaría automatizar?',
        role: 'assistant',
        timestamp: new Date().toISOString()
      };
      setMessages([welcomeMessage]);
    };

    initialize();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: inputValue,
      role: 'user',
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Obtener respuesta del chat
      const chatResponse = await openaiService.getChatResponse(inputValue);
      
      // Obtener recomendaciones de plantillas
      const recommendations = await openaiService.recommendTemplates(inputValue, 3);

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: chatResponse,
        role: 'assistant',
        timestamp: new Date().toISOString(),
        recommendations: recommendations.length > 0 ? recommendations : undefined
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error getting response:', error);
      
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: 'Lo siento, hubo un error al procesar tu consulta. ¿Podrías intentar reformular tu pregunta?',
        role: 'assistant',
        timestamp: new Date().toISOString()
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleTemplateClick = (templateId: string) => {
    if (onTemplateSelect) {
      onTemplateSelect(templateId);
    }
  };

  const renderMessage = (message: ChatMessage) => (
    <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-3xl flex items-start gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          message.role === 'user' 
            ? 'bg-blue-500 text-white' 
            : 'bg-gray-200 text-gray-600'
        }`}>
          {message.role === 'user' ? <User size={16} /> : <Bot size={16} />}
        </div>
        
        <div className={`rounded-lg px-4 py-3 ${
          message.role === 'user'
            ? 'bg-blue-500 text-white'
            : 'bg-gray-100 text-gray-800'
        }`}>
          <p className="whitespace-pre-wrap">{message.content}</p>
          
          {message.recommendations && message.recommendations.length > 0 && (
            <div className="mt-4 space-y-3">
              <h4 className="font-semibold text-gray-700 border-b pb-2">
                Plantillas Recomendadas:
              </h4>
              {message.recommendations.map((rec, index) => (
                <TemplateRecommendationCard
                  key={rec.template.id}
                  recommendation={rec}
                  onClick={() => handleTemplateClick(rec.template.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
          <p className="text-gray-600">Inicializando asistente...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full max-h-[600px] bg-white rounded-lg shadow-lg">
      {/* Header */}
      <div className="bg-blue-500 text-white p-4 rounded-t-lg">
        <h3 className="font-semibold flex items-center gap-2">
          <Bot size={20} />
          Asistente de Plantillas n8n
        </h3>
        <p className="text-blue-100 text-sm">
          Encuentra la plantilla perfecta para automatizar tu negocio
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(renderMessage)}
        {isLoading && (
          <div className="flex justify-start mb-4">
            <div className="max-w-3xl flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center">
                <Bot size={16} />
              </div>
              <div className="bg-gray-100 rounded-lg px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                  <span className="text-gray-600">Pensando...</span>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t p-4">
        <div className="flex gap-2">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Describe qué proceso quieres automatizar..."
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            rows={2}
            disabled={isLoading}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading}
            className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

interface TemplateRecommendationCardProps {
  recommendation: TemplateRecommendation;
  onClick: () => void;
}

const TemplateRecommendationCard: React.FC<TemplateRecommendationCardProps> = ({
  recommendation,
  onClick
}) => {
  const { template, score, reasoning } = recommendation;

  return (
    <div 
      className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-2">
        <h5 className="font-semibold text-gray-800 flex-1">{template.name}</h5>
        <div className="flex items-center gap-1 text-sm text-gray-600">
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
            {score}% match
          </span>
        </div>
      </div>
      
      <p className="text-gray-600 text-sm mb-3">{template.description}</p>
      
      <div className="flex flex-wrap gap-2 mb-3">
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <Star size={12} />
          {template.rating}/5
        </div>
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <Clock size={12} />
          {template.estimatedSetupTime}min
        </div>
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <Download size={12} />
          {template.downloads}
        </div>
      </div>
      
      <div className="flex flex-wrap gap-1 mb-3">
        {template.tags.slice(0, 3).map(tag => (
          <span key={tag} className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
            <Tag size={10} />
            {tag}
          </span>
        ))}
      </div>
      
      <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
        <strong>Por qué es recomendada:</strong> {reasoning}
      </div>
    </div>
  );
};