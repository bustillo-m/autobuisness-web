import React from 'react';
import { Check, Zap, Crown, Building } from 'lucide-react';

interface PricingPlan {
  name: string;
  price: number;
  icon: React.ReactNode;
  description: string;
  features: string[];
  highlighted?: boolean;
  consultations: number;
  basicAgents: number;
  advancedAgents: number;
  automations: number;
}

interface PricingSectionProps {
  onSelectPlan: (plan: string) => void;
}

export default function PricingSection({ onSelectPlan }: PricingSectionProps) {
  const plans: PricingPlan[] = [
    {
      name: 'Freemium',
      price: 0,
      icon: <Zap className="h-6 w-6" />,
      description: 'Perfecto para empezar',
      consultations: 1,
      basicAgents: 0,
      advancedAgents: 0,
      automations: 0,
      features: [
        '1 consulta gratuita',
        'Plan de propuestas personalizado',
        'Acceso a plantillas básicas',
        'Soporte por email'
      ]
    },
    {
      name: 'Starter',
      price: 29,
      icon: <Crown className="h-6 w-6" />,
      description: 'Para pequeñas empresas',
      consultations: 3,
      basicAgents: 2,
      advancedAgents: 0,
      automations: 2,
      highlighted: true,
      features: [
        '3 consultas mensuales',
        '2 agentes IA básicos o automatizaciones',
        'Plantillas premium',
        'Soporte prioritario',
        'Dashboard personalizado'
      ]
    },
    {
      name: 'Pro',
      price: 49,
      icon: <Building className="h-6 w-6" />,
      description: 'Para empresas en crecimiento',
      consultations: 6,
      basicAgents: 2,
      advancedAgents: 1,
      automations: 2,
      features: [
        '6 consultas mensuales',
        '2 agentes IA básicos o automatizaciones',
        '1 agente IA avanzado',
        'Plantillas exclusivas',
        'Soporte 24/7',
        'Análisis avanzado'
      ]
    },
    {
      name: 'Empresa',
      price: 78,
      icon: <Building className="h-6 w-6" />,
      description: 'Para grandes organizaciones',
      consultations: 15,
      basicAgents: 3,
      advancedAgents: 0,
      automations: 3,
      features: [
        '15 consultas mensuales',
        '3 agentes básicos o automatizaciones',
        'Acceso completo a plantillas',
        'Gestor de cuenta dedicado',
        'Integración personalizada',
        'Reportes ejecutivos'
      ]
    }
  ];

  const additionalServices = [
    { name: 'Consultoría adicional', price: '9€', description: 'Por consulta extra' },
    { name: 'Automatización', price: '11€', description: 'Por automatización' },
    { name: 'Agente IA básico', price: '21€', description: 'Por agente básico' },
    { name: 'Agente IA avanzado', price: '32€', description: 'Por agente avanzado' },
    { name: 'Implementación inmediata', price: '+6€', description: 'Por agente/automatización' }
  ];

  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Planes y Precios
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Escoge el plan perfecto para tu negocio. Todos incluyen acceso a nuestra IA especializaday biblioteca de plantillas
          </p>
        </div>

        {/* Main Plans */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative bg-white rounded-2xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 ${
                plan.highlighted ? 'ring-2 ring-blue-500 scale-105' : ''
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Más Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <div className={`inline-flex p-3 rounded-full mb-4 ${
                  plan.highlighted 
                    ? 'bg-gradient-to-r from-blue-100 to-purple-100 text-blue-600' 
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {plan.icon}
                </div>
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-4">{plan.description}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold">{plan.price}€</span>
                  <span className="text-gray-600">/mes</span>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => onSelectPlan(plan.name)}
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
                  plan.highlighted
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transform hover:scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {plan.price === 0 ? 'Comenzar Gratis' : 'Suscribirse'}
              </button>
            </div>
          ))}
        </div>

        {/* Additional Services */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-center mb-8">Servicios Adicionales</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {additionalServices.map((service, index) => (
              <div key={index} className="text-center p-4 border border-gray-200 rounded-lg">
                <div className="text-lg font-bold text-blue-600 mb-2">{service.price}</div>
                <div className="font-semibold mb-1">{service.name}</div>
                <div className="text-sm text-gray-600">{service.description}</div>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-center text-blue-800">
              <strong>💡 Implementación inmediata:</strong> Agrega +6€ por agente o automatización para implementación al momento
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}