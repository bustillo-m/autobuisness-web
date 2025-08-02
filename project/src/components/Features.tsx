import React from 'react';
import { Brain, Code, Clock, Shield, Zap, Users } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: <Brain className="h-8 w-8" />,
      title: 'IA Especializada',
      description: 'Consultor entrenado específicamente en estrategias empresariales, automatizaciones y agentes IA'
    },
    {
      icon: <Code className="h-8 w-8" />,
      title: '3000+ Plantillas',
      description: 'Biblioteca masiva de códigos y plantillas listas para implementar en cualquier sector'
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: 'Implementación Rápida',
      description: 'Despliega agentes y automatizaciones en minutos, no semanas'
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: 'Seguridad Empresarial',
      description: 'Todas las implementaciones cumplen con estándares de seguridad corporativa'
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: 'ROI Medible',
      description: 'Métricas claras del retorno de inversión y optimización de procesos'
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: 'Soporte Experto',
      description: 'Equipo de especialistas para acompañarte en todo el proceso'
    }
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Características Únicas
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Descubre por qué miles de empresas confían en AutoBusiness AI para sus automatizaciones
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
            >
              <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-full w-16 h-16 flex items-center justify-center mb-6 text-blue-600">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}