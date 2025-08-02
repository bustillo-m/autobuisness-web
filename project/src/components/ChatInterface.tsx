import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, MessageSquare, X, Minimize2 } from 'lucide-react';
import { openAIService } from '../services/openai';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

interface ChatInterfaceProps {
  isOpen: boolean;
  onClose: () => void;
  user: { name: string; plan: string; credits: number };
  onCreditUpdate: (newCredits: number) => void;
}

export default function ChatInterface({ isOpen, onClose, user, onCreditUpdate }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: `¡Hola ${user.name}! Soy tu consultor de AutoBusiness AI. Cuéntame sobre tu empresa, objetivos y en qué tareas pasas más tiempo para crear un plan personalizado de agentes y automatizaciones. Tienes ${user.credits} consultas disponibles.`,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || user.credits <= 0) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      // Llamada real a OpenAI API
      const aiResponse = await openAIService.generateResponse(inputMessage, messages);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponse,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
      onCreditUpdate(user.credits - 1);
    } catch (error) {
      console.error('Error generating AI response:', error);
      setIsTyping(false);
    }
  };

  const generateAIResponse = (userInput: string): string => {
    // Simulación de respuesta inteligente (aquí se conectaría a OpenAI)
    const responses = [
      `Basándome en lo que me comentas sobre tu empresa, he identificado varias oportunidades de automatización. Te recomiendo implementar:

🤖 **Agente de Atención al Cliente**: Para responder consultas frecuentes 24/7
⚡ **Automatización de Facturación**: Para generar y enviar facturas automáticamente
📊 **Análisis de Datos**: Para reportes automáticos de ventas

¿Te gustaría que profundice en alguna de estas soluciones? Puedo proporcionarte el código específico de implementación.`,

      `Excelente información. Para tu tipo de negocio, sugiero esta estrategia:

**Fase 1 - Automatizaciones Básicas:**
- Gestión automática de emails
- Programación de reuniones
- Generación de reportes

**Fase 2 - Agentes IA:**
- Chatbot especializado en tu sector
- Asistente de ventas virtual
- Analizador de sentiment de clientes

El ROI estimado es del 300% en los primeros 6 meses. ¿Comenzamos con la fase 1?`,

      `He analizado tu caso y tengo la solución perfecta de nuestra biblioteca de 3000+ plantillas:

**Template #1247 - E-commerce Automation Suite**
- Gestión automática de inventario
- Respuestas automáticas a reseñas
- Seguimiento de carritos abandonados

**Template #892 - CRM Intelligence Agent**
- Scoring automático de leads
- Predicción de churn de clientes
- Personalización de comunicaciones

¿Quieres que te proporcione el código de implementación para alguna de estas?`
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className={`bg-white rounded-2xl shadow-2xl border border-gray-200 transition-all duration-300 ${
        isMinimized ? 'w-80 h-16' : 'w-96 h-[600px]'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-purple-600 rounded-t-2xl">
          <div className="flex items-center space-x-3">
            <Bot className="h-6 w-6 text-white" />
            <div>
              <h3 className="font-semibold text-white">Consultor IA</h3>
              <p className="text-xs text-blue-100">Créditos: {user.credits}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="text-white hover:text-blue-200 transition-colors"
            >
              <Minimize2 className="h-4 w-4" />
            </button>
            <button
              onClick={onClose}
              className="text-white hover:text-blue-200 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 h-96">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start space-x-3 ${
                    message.type === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {message.type === 'ai' && (
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-full p-2">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                      message.type === 'user'
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                  {message.type === 'user' && (
                    <div className="bg-gray-300 rounded-full p-2">
                      <User className="h-4 w-4 text-gray-600" />
                    </div>
                  )}
                </div>
              ))}
              
              {isTyping && (
                <div className="flex items-start space-x-3">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-full p-2">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                  <div className="bg-gray-100 px-4 py-2 rounded-2xl">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200">
              {user.credits > 0 ? (
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Describe tu empresa y objetivos..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim()}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <MessageSquare className="h-8 w-8 text-red-500 mx-auto mb-2" />
                  <p className="text-red-700 font-medium">Sin créditos disponibles</p>
                  <p className="text-sm text-red-600 mt-1">Actualiza tu plan para continuar</p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}