import React, { useState } from 'react';
import { Bot, Search, Settings, MessageCircle, Database, Zap } from 'lucide-react';
import { TemplateRecommendationChat } from './components/TemplateRecommendationChat';
import { TemplateManager } from './components/TemplateManager';
import { N8nWorkflowTemplate } from './types/template';

function App() {
  const [activeTab, setActiveTab] = useState<'chat' | 'browse' | 'manage'>('chat');
  const [selectedTemplate, setSelectedTemplate] = useState<N8nWorkflowTemplate | null>(null);

  const handleTemplateSelect = (template: N8nWorkflowTemplate | string) => {
    if (typeof template === 'string') {
      // If it's just an ID, we'd need to fetch the full template
      console.log('Template selected by ID:', template);
    } else {
      setSelectedTemplate(template);
      console.log('Template selected:', template);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="bg-blue-500 p-2 rounded-lg">
                <Zap className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  n8n Template Advisor
                </h1>
                <p className="text-sm text-gray-600">
                  Encuentra la plantilla perfecta para automatizar tu negocio
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                1000+ Plantillas
              </div>
              <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                AI Powered
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('chat')}
              className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'chat'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <MessageCircle size={16} />
              Asistente IA
            </button>
            
            <button
              onClick={() => setActiveTab('browse')}
              className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'browse'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Search size={16} />
              Explorar Plantillas
            </button>
            
            <button
              onClick={() => setActiveTab('manage')}
              className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'manage'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Database size={16} />
              Gestionar Plantillas
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'chat' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Chat Interface */}
            <div className="lg:col-span-2">
              <TemplateRecommendationChat 
                onTemplateSelect={handleTemplateSelect}
              />
            </div>
            
            {/* Sidebar with Quick Info */}
            <div className="space-y-6">
              {/* Quick Stats */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Estadísticas del Sistema
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Plantillas:</span>
                    <span className="font-semibold">1,000+</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Categorías:</span>
                    <span className="font-semibold">20</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Descargas:</span>
                    <span className="font-semibold">50,000+</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Rating Promedio:</span>
                    <span className="font-semibold">4.7/5</span>
                  </div>
                </div>
              </div>

              {/* Popular Categories */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Categorías Populares
                </h3>
                <div className="space-y-2">
                  {[
                    { name: 'Marketing', count: 150 },
                    { name: 'E-commerce', count: 120 },
                    { name: 'Integración', count: 110 },
                    { name: 'Ventas', count: 95 },
                    { name: 'Soporte', count: 80 }
                  ].map(category => (
                    <div key={category.name} className="flex justify-between items-center">
                      <span className="text-gray-600">{category.name}</span>
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
                        {category.count}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Selected Template Preview */}
              {selectedTemplate && (
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Plantilla Seleccionada
                  </h3>
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-800">
                      {selectedTemplate.name}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {selectedTemplate.description}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                        {selectedTemplate.category}
                      </span>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                        {selectedTemplate.difficulty}
                      </span>
                    </div>
                    <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors">
                      Usar Plantilla
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'browse' && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Explorar Plantillas
              </h2>
              <p className="text-gray-600">
                Navega por nuestra biblioteca completa de plantillas de workflow n8n
              </p>
            </div>
            
            <TemplateManager 
              mode="view"
              onTemplateSelect={handleTemplateSelect}
            />
          </div>
        )}

        {activeTab === 'manage' && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Gestionar Plantillas
              </h2>
              <p className="text-gray-600">
                Administra, edita y organiza las plantillas de workflow
              </p>
            </div>
            
            <TemplateManager 
              mode="manage"
              onTemplateSelect={handleTemplateSelect}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-blue-500 p-2 rounded-lg">
                  <Zap className="text-white" size={20} />
                </div>
                <span className="text-lg font-semibold text-gray-900">
                  n8n Template Advisor
                </span>
              </div>
              <p className="text-gray-600 max-w-md">
                Plataforma inteligente para descubrir y utilizar plantillas de automatización 
                n8n perfectas para tu negocio, potenciada por IA.
              </p>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">
                Características
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Recomendaciones con IA</li>
                <li>1000+ plantillas</li>
                <li>Búsqueda avanzada</li>
                <li>Múltiples categorías</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">
                Soporte
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Documentación</li>
                <li>Centro de ayuda</li>
                <li>Comunidad</li>
                <li>Contacto</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t pt-8 mt-8 flex justify-between items-center">
            <p className="text-sm text-gray-500">
              © 2024 n8n Template Advisor. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">Powered by OpenAI</span>
              <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                Sistema Activo
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;