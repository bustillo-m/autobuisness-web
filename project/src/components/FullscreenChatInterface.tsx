import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, X, Minimize2, Code, CreditCard, Lock, CheckCircle, Clock, DollarSign, TrendingUp, Star } from 'lucide-react';
import Sidebar from './Sidebar';
import { User as UserType, Message, ChatSession, TemplateRecommendation } from '../types';
import { openAIService } from '../services/openai';
import { templateService } from '../services/templateService';

interface FullscreenChatInterfaceProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserType;
  onCreditUpdate: (newCredits: number) => void;
  onUpgradePlan: () => void;
}

export default function FullscreenChatInterface({ 
  isOpen, 
  onClose, 
  user, 
  onCreditUpdate,
  onUpgradePlan 
}: FullscreenChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: `¡Hola ${user.name}! Soy tu consultor especializado de AutoBusiness AI. 

He analizado nuestra biblioteca de 3000+ plantillas de automatización y estoy listo para recomendarte las soluciones perfectas para tu negocio.

Cuéntame:
🏢 **¿Qué tipo de empresa tienes?** (e-commerce, SaaS, servicios, etc.)
🎯 **¿Cuáles son tus principales objetivos?** (aumentar ventas, automatizar procesos, etc.)
⚡ **¿En qué tareas pasas más tiempo?** (atención al cliente, reportes, gestión, etc.)
💰 **¿Cuál es tu presupuesto aproximado para automatización?**

Con esta información, te proporcionaré un plan de implementación detallado y te mostraré exactamente qué plantillas son las más rentables para tu caso específico.

Tienes **${user.credits} consultas** disponibles para este análisis.`,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [chatSessions] = useState<ChatSession[]>([
    {
      id: '1',
      title: 'Consulta Inicial - Automatización E-commerce',
      lastMessage: 'Análisis de plantillas completado',
      timestamp: new Date(Date.now() - 86400000),
      messageCount: 12
    },
    {
      id: '2', 
      title: 'Plan de Implementación CRM',
      lastMessage: 'Generando roadmap detallado...',
      timestamp: new Date(Date.now() - 172800000),
      messageCount: 8
    }
  ]);
  const [currentChatId, setCurrentChatId] = useState<string>('current');
  const [recommendations, setRecommendations] = useState<TemplateRecommendation[]>([]);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateRecommendation | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  
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
      // Analizar el negocio basado en la conversación
      const businessAnalysis = templateService.analyzeBusinessFromConversation([...messages, userMessage]);
      
      // Generar recomendaciones de plantillas
      const newRecommendations = templateService.generateRecommendations(businessAnalysis);
      setRecommendations(newRecommendations);

      // Generar respuesta con OpenAI
      const aiResponse = await openAIService.generateResponse(inputMessage, messages);
      
      // Crear respuesta mejorada con recomendaciones
      let enhancedResponse = aiResponse;
      
      if (newRecommendations.length > 0 && messages.length >= 2) {
        enhancedResponse += `\n\n🔍 **ANÁLISIS COMPLETADO**\n\nHe analizado tu perfil empresarial y encontré **${newRecommendations.length} plantillas perfectas** para tu negocio:\n\n`;
        
        newRecommendations.forEach((rec, index) => {
          enhancedResponse += `**${index + 1}. ${rec.template.name}** (${rec.matchScore}% de compatibilidad)\n`;
          enhancedResponse += `💰 ROI estimado: ${rec.template.estimatedROI}% | ⏱️ Implementación: ${rec.template.implementationTime}\n`;
          enhancedResponse += `💵 Inversión: $${rec.estimatedCost.toLocaleString()}\n\n`;
        });
        
        enhancedResponse += `📋 Haz clic en "Ver Recomendaciones Detalladas" para ver los planes de implementación completos y códigos de ejemplo.\n\n⚠️ **Nota**: Los planes de implementación avanzados y el código completo están disponibles después de la compra para garantizar la calidad y soporte técnico.`;
        
        setShowRecommendations(true);
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: enhancedResponse,
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

  const handleNewChat = () => {
    setMessages([{
      id: '1',
      type: 'ai',
      content: `¡Bienvenido a una nueva sesión de consultoría! Cuéntame sobre tu nuevo proyecto o necesidad empresarial.`,
      timestamp: new Date()
    }]);
    setRecommendations([]);
    setShowRecommendations(false);
    setCurrentChatId(Date.now().toString());
  };

  const handleSelectChat = (chatId: string) => {
    setCurrentChatId(chatId);
    // Aquí cargarías el historial del chat seleccionado
  };

  const handlePurchaseTemplate = async (recommendation: TemplateRecommendation) => {
    setSelectedTemplate(recommendation);
    setShowPaymentModal(true);
  };

  const processPurchase = async () => {
    if (!selectedTemplate) return;

    try {
      const result = await templateService.processPurchase(selectedTemplate.template.id, user.id);
      
      if (result.success) {
        // Agregar mensaje de confirmación al chat
        const confirmationMessage: Message = {
          id: Date.now().toString(),
          type: 'ai',
          content: `🎉 **¡Compra Exitosa!**\n\nHas adquirido: **${selectedTemplate.template.name}**\n\n✅ Recibirás por email:\n- Código completo de implementación\n- Documentación técnica detallada\n- Videos de capacitación\n- 30 días de soporte técnico\n\n📧 Revisa tu bandeja de entrada en los próximos minutos.\n\n¿Te gustaría que analice otras plantillas para complementar esta solución?`,
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, confirmationMessage]);
        setShowPaymentModal(false);
        setSelectedTemplate(null);
      }
    } catch (error) {
      console.error('Error processing purchase:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white flex">
      {/* Sidebar */}
      <Sidebar
        user={user}
        chatSessions={chatSessions}
        onNewChat={handleNewChat}
        onSelectChat={handleSelectChat}
        currentChatId={currentChatId}
        onUpgradePlan={onUpgradePlan}
      />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Bot className="h-8 w-8" />
              <div>
                <h1 className="text-xl font-bold">Consultor AutoBusiness AI</h1>
                <p className="text-blue-100">Análisis avanzado de plantillas y automatizaciones</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {showRecommendations && (
                <button
                  onClick={() => setShowRecommendations(!showRecommendations)}
                  className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors"
                >
                  {showRecommendations ? 'Ocultar' : 'Mostrar'} Recomendaciones
                </button>
              )}
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-white hover:text-blue-200 transition-colors"
              >
                <Minimize2 className="h-5 w-5" />
              </button>
              <button
                onClick={onClose}
                className="text-white hover:text-blue-200 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {!isMinimized && (
          <div className="flex-1 flex">
            {/* Chat Messages */}
            <div className={`flex-1 flex flex-col ${showRecommendations ? 'w-2/3' : 'w-full'}`}>
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-start space-x-4 ${
                      message.type === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {message.type === 'ai' && (
                      <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-full p-3">
                        <Bot className="h-5 w-5 text-white" />
                      </div>
                    )}
                    <div
                      className={`max-w-4xl px-6 py-4 rounded-2xl ${
                        message.type === 'user'
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                          : 'bg-gray-50 text-gray-800 border border-gray-200'
                      }`}
                    >
                      <div className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</div>
                      <p className="text-xs opacity-70 mt-2">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                    {message.type === 'user' && (
                      <div className="bg-gray-300 rounded-full p-3">
                        <User className="h-5 w-5 text-gray-600" />
                      </div>
                    )}
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex items-start space-x-4">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-full p-3">
                      <Bot className="h-5 w-5 text-white" />
                    </div>
                    <div className="bg-gray-50 px-6 py-4 rounded-2xl border border-gray-200">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="border-t border-gray-200 p-6">
                {user.credits > 0 ? (
                  <div className="flex space-x-4">
                    <input
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Describe tu empresa, objetivos y procesos actuales..."
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm"
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={!inputMessage.trim()}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="h-5 w-5" />
                    </button>
                  </div>
                ) : (
                  <div className="text-center p-6 bg-red-50 rounded-xl">
                    <div className="text-red-500 mb-2">
                      <CreditCard className="h-8 w-8 mx-auto" />
                    </div>
                    <p className="text-red-700 font-medium">Sin créditos disponibles</p>
                    <p className="text-sm text-red-600 mt-1">Actualiza tu plan para continuar el análisis</p>
                    <button
                      onClick={onUpgradePlan}
                      className="mt-3 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Actualizar Plan
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Recommendations Panel */}
            {showRecommendations && recommendations.length > 0 && (
              <div className="w-1/3 border-l border-gray-200 bg-gray-50 p-6 overflow-y-auto">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Plantillas Recomendadas</h3>
                
                <div className="space-y-4">
                  {recommendations.map((recommendation, index) => (
                    <div key={recommendation.template.id} className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-1">{recommendation.template.name}</h4>
                          <div className="flex items-center space-x-2 mb-2">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <span className="text-sm font-medium text-green-600">{recommendation.matchScore}% compatible</span>
                          </div>
                        </div>
                        {recommendation.template.isPremium && (
                          <Lock className="h-4 w-4 text-orange-500" />
                        )}
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-3">{recommendation.template.description}</p>
                      
                      <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
                        <div className="flex items-center space-x-1">
                          <TrendingUp className="h-3 w-3 text-green-500" />
                          <span>ROI: {recommendation.template.estimatedROI}%</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3 text-blue-500" />
                          <span>{recommendation.template.implementationTime}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <DollarSign className="h-3 w-3 text-purple-500" />
                          <span>${recommendation.estimatedCost.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Code className="h-3 w-3 text-gray-500" />
                          <span>{recommendation.template.complexity}</span>
                        </div>
                      </div>

                      <div className="mb-3">
                        <p className="text-xs font-medium text-gray-700 mb-1">Beneficios esperados:</p>
                        <ul className="text-xs text-gray-600 space-y-1">
                          {recommendation.expectedBenefits.slice(0, 3).map((benefit, i) => (
                            <li key={i} className="flex items-start space-x-1">
                              <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-2">
                        <button
                          onClick={() => {
                            const previewMessage: Message = {
                              id: Date.now().toString(),
                              type: 'ai',
                              content: `📋 **Vista previa de ${recommendation.template.name}**\n\n${recommendation.template.codePreview}\n\n⚠️ Esta es solo una vista previa. El código completo incluye:\n${recommendation.template.features.map(f => `• ${f}`).join('\n')}\n\n💡 **¿Por qué es perfecto para ti?**\n${recommendation.reasoning}`,
                              timestamp: new Date()
                            };
                            setMessages(prev => [...prev, previewMessage]);
                          }}
                          className="w-full bg-blue-100 text-blue-700 py-2 px-3 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium"
                        >
                          Ver Vista Previa
                        </button>
                        
                        <button
                          onClick={() => handlePurchaseTemplate(recommendation)}
                          className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-2 px-3 rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-200 text-sm font-medium"
                        >
                          Obtener Plan Completo - ${recommendation.estimatedCost.toLocaleString()}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Payment Modal */}
        {showPaymentModal && selectedTemplate && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Confirmar Compra</h3>
              
              <div className="mb-4">
                <h4 className="font-semibold text-gray-800">{selectedTemplate.template.name}</h4>
                <p className="text-sm text-gray-600 mt-1">{selectedTemplate.template.description}</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Plantilla base:</span>
                    <span>${selectedTemplate.template.price.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Implementación y soporte:</span>
                    <span>${(selectedTemplate.estimatedCost - selectedTemplate.template.price).toLocaleString()}</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-semibold">
                    <span>Total:</span>
                    <span>${selectedTemplate.estimatedCost.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <h5 className="font-medium text-gray-800 mb-2">Incluye:</h5>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>✅ Código fuente completo</li>
                  <li>✅ Plan de implementación detallado</li>
                  <li>✅ Documentación técnica</li>
                  <li>✅ 30 días de soporte técnico</li>
                  <li>✅ Videos de capacitación</li>
                </ul>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={processPurchase}
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white py-2 px-4 rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-200"
                >
                  Confirmar Compra
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}