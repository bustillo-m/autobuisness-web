import { Template, BusinessAnalysis, TemplateRecommendation, ImplementationStep } from '../types';

// Base de datos simulada de plantillas
const TEMPLATES: Template[] = [
  {
    id: 'template-001',
    name: 'E-commerce Automation Suite',
    description: 'Suite completa de automatización para tiendas online con gestión de inventario, seguimiento de carritos abandonados y análisis de comportamiento de clientes.',
    category: 'E-commerce',
    industry: ['Retail', 'E-commerce', 'Moda', 'Tecnología'],
    businessSize: 'mediana',
    complexity: 'avanzado',
    estimatedROI: 350,
    implementationTime: '8-12 semanas',
    price: 2500,
    features: [
      'Gestión automática de inventario',
      'Recuperación de carritos abandonados',
      'Análisis predictivo de demanda',
      'Chatbot de atención al cliente',
      'Integración con múltiples canales de venta'
    ],
    tags: ['e-commerce', 'inventario', 'chatbot', 'analytics'],
    codePreview: `
// Sistema de gestión de inventario automático
class InventoryManager {
  async checkStockLevels() {
    const products = await this.getProducts();
    return products.filter(p => p.stock < p.minimumStock);
  }
  
  async autoReorder(productId, quantity) {
    // Lógica de reorden automático
  }
}`,
    fullImplementation: 'Código completo disponible después del pago',
    requirements: ['Python/Node.js', 'Base de datos', 'API de e-commerce', 'Servidor web'],
    isPremium: true
  },
  {
    id: 'template-002',
    name: 'CRM Intelligence Agent',
    description: 'Agente de IA para CRM que automatiza el scoring de leads, predice churn de clientes y personaliza comunicaciones.',
    category: 'CRM',
    industry: ['SaaS', 'B2B', 'Servicios', 'Consultora'],
    businessSize: 'pequeña',
    complexity: 'intermedio',
    estimatedROI: 280,
    implementationTime: '4-6 semanas',
    price: 1800,
    features: [
      'Scoring automático de leads',
      'Predicción de churn',
      'Personalización de emails',
      'Análisis de sentimientos',
      'Dashboard de métricas'
    ],
    tags: ['crm', 'leads', 'machine-learning', 'analytics'],
    codePreview: `
// Agente de scoring de leads
const leadScoring = {
  calculateScore(leadData) {
    let score = 0;
    // Algoritmo de scoring
    if (leadData.companySize > 100) score += 20;
    if (leadData.budget > 10000) score += 30;
    return score;
  }
};`,
    fullImplementation: 'Código completo disponible después del pago',
    requirements: ['CRM API', 'Machine Learning', 'Base de datos', 'Servidor'],
    isPremium: true
  },
  {
    id: 'template-003',
    name: 'Marketing Automation Hub',
    description: 'Centro de automatización de marketing con segmentación inteligente, campañas automáticas y análisis de ROI.',
    category: 'Marketing',
    industry: ['Marketing', 'E-commerce', 'SaaS', 'Educación'],
    businessSize: 'mediana',
    complexity: 'avanzado',
    estimatedROI: 400,
    implementationTime: '6-10 semanas',
    price: 3200,
    features: [
      'Segmentación automática de audiencias',
      'Campañas multicanal automatizadas',
      'A/B testing automático',
      'Análisis de ROI en tiempo real',
      'Integración con redes sociales'
    ],
    tags: ['marketing', 'automation', 'segmentation', 'analytics'],
    codePreview: `
// Sistema de segmentación automática
class AudienceSegmentation {
  async segmentUsers(criteria) {
    const users = await this.getUsers();
    return this.applyMLSegmentation(users, criteria);
  }
}`,
    fullImplementation: 'Código completo disponible después del pago',
    requirements: ['Marketing APIs', 'ML Framework', 'Analytics', 'Email service'],
    isPremium: true
  },
  {
    id: 'template-004',
    name: 'Financial Analytics Bot',
    description: 'Bot de análisis financiero que genera reportes automáticos, detecta anomalías y predice flujos de caja.',
    category: 'Finanzas',
    industry: ['Fintech', 'Banca', 'Contabilidad', 'E-commerce'],
    businessSize: 'pequeña',
    complexity: 'básico',
    estimatedROI: 220,
    implementationTime: '3-4 semanas',
    price: 1200,
    features: [
      'Reportes financieros automáticos',
      'Detección de anomalías',
      'Predicción de flujo de caja',
      'Alertas de riesgo',
      'Dashboard ejecutivo'
    ],
    tags: ['finanzas', 'reportes', 'analytics', 'prediccion'],
    codePreview: `
// Generador de reportes financieros
function generateFinancialReport(data) {
  const metrics = calculateKPIs(data);
  return {
    revenue: metrics.totalRevenue,
    expenses: metrics.totalExpenses,
    profit: metrics.profit
  };
}`,
    fullImplementation: 'Código completo disponible después del pago',
    requirements: ['Contabilidad API', 'Python/R', 'Base de datos', 'Visualización'],
    isPremium: false
  },
  {
    id: 'template-005',
    name: 'HR Automation Assistant',
    description: 'Asistente de RRHH que automatiza reclutamiento, evaluaciones de desempeño y gestión de nóminas.',
    category: 'RRHH',
    industry: ['Cualquier industria'],
    businessSize: 'mediana',
    complexity: 'intermedio',
    estimatedROI: 300,
    implementationTime: '5-8 semanas',
    price: 2000,
    features: [
      'Filtrado automático de CVs',
      'Programación de entrevistas',
      'Evaluaciones de desempeño',
      'Gestión de nóminas',
      'Portal del empleado'
    ],
    tags: ['rrhh', 'reclutamiento', 'nominas', 'evaluaciones'],
    codePreview: `
// Sistema de filtrado de CVs
class CVParser {
  analyzeCV(cvText) {
    const skills = this.extractSkills(cvText);
    const experience = this.calculateExperience(cvText);
    return { skills, experience, score: this.calculateScore(skills, experience) };
  }
}`,
    fullImplementation: 'Código completo disponible después del pago',
    requirements: ['ATS API', 'NLP', 'Base de datos', 'PDF parser'],
    isPremium: true
  }
];

export class TemplateService {
  private templates: Template[] = TEMPLATES;

  // Analiza el negocio del usuario basado en la conversación
  analyzeBusinessFromConversation(messages: any[]): BusinessAnalysis {
    const allText = messages
      .filter(m => m.type === 'user')
      .map(m => m.content)
      .join(' ')
      .toLowerCase();

    // Análisis básico de industria
    let industry = 'General';
    if (allText.includes('tienda') || allText.includes('venta') || allText.includes('producto')) {
      industry = 'E-commerce';
    } else if (allText.includes('cliente') || allText.includes('crm') || allText.includes('ventas')) {
      industry = 'B2B';
    } else if (allText.includes('marketing') || allText.includes('campaña')) {
      industry = 'Marketing';
    } else if (allText.includes('finanzas') || allText.includes('contabilidad') || allText.includes('factura')) {
      industry = 'Fintech';
    }

    // Análisis de tamaño de empresa
    let businessSize = 'pequeña';
    if (allText.includes('startup') || allText.includes('emprendimiento')) {
      businessSize = 'startup';
    } else if (allText.includes('empresa grande') || allText.includes('corporación')) {
      businessSize = 'enterprise';
    } else if (allText.includes('mediana empresa') || allText.includes('pymes')) {
      businessSize = 'mediana';
    }

    // Extracción de objetivos
    const goals = [];
    if (allText.includes('automatizar') || allText.includes('automático')) {
      goals.push('Automatización de procesos');
    }
    if (allText.includes('ventas') || allText.includes('ingresos')) {
      goals.push('Incrementar ventas');
    }
    if (allText.includes('eficiencia') || allText.includes('productividad')) {
      goals.push('Mejorar eficiencia');
    }
    if (allText.includes('clientes') || allText.includes('atención')) {
      goals.push('Mejorar atención al cliente');
    }

    // Identificación de pain points
    const painPoints = [];
    if (allText.includes('manual') || allText.includes('repetitivo')) {
      painPoints.push('Procesos manuales repetitivos');
    }
    if (allText.includes('tiempo') || allText.includes('lento')) {
      painPoints.push('Procesos lentos');
    }
    if (allText.includes('error') || allText.includes('mistake')) {
      painPoints.push('Errores humanos');
    }

    return {
      industry,
      businessType: industry,
      size: businessSize,
      goals: goals.length > 0 ? goals : ['Automatización general'],
      currentPainPoints: painPoints.length > 0 ? painPoints : ['Procesos ineficientes'],
      budget: 'No especificado',
      timeframe: 'No especificado',
      techStack: []
    };
  }

  // Genera recomendaciones de plantillas basadas en el análisis del negocio
  generateRecommendations(businessAnalysis: BusinessAnalysis): TemplateRecommendation[] {
    const recommendations: TemplateRecommendation[] = [];

    // Filtrar plantillas relevantes
    const relevantTemplates = this.templates.filter(template => {
      // Coincidencia de industria
      const industryMatch = template.industry.includes(businessAnalysis.industry) || 
                           template.industry.includes('Cualquier industria');
      
      // Coincidencia de tamaño de empresa
      const sizeMatch = template.businessSize === businessAnalysis.size || 
                       template.businessSize === 'pequeña'; // default fallback

      return industryMatch || sizeMatch;
    });

    // Generar recomendaciones con scoring
    relevantTemplates.forEach(template => {
      const matchScore = this.calculateMatchScore(template, businessAnalysis);
      
      if (matchScore > 60) { // Solo recomendar si el score es alto
        const recommendation: TemplateRecommendation = {
          template,
          matchScore,
          reasoning: this.generateReasoning(template, businessAnalysis),
          expectedBenefits: this.generateExpectedBenefits(template, businessAnalysis),
          implementationPlan: this.generateImplementationPlan(template),
          estimatedCost: template.price + (template.price * 0.3), // Costo + implementación
          estimatedTimeframe: template.implementationTime
        };
        
        recommendations.push(recommendation);
      }
    });

    // Ordenar por score descendente
    return recommendations.sort((a, b) => b.matchScore - a.matchScore).slice(0, 3);
  }

  private calculateMatchScore(template: Template, business: BusinessAnalysis): number {
    let score = 0;

    // Coincidencia de industria (40 puntos)
    if (template.industry.includes(business.industry)) {
      score += 40;
    } else if (template.industry.includes('Cualquier industria')) {
      score += 20;
    }

    // Coincidencia de tamaño (20 puntos)
    if (template.businessSize === business.size) {
      score += 20;
    }

    // Coincidencia de objetivos (30 puntos)
    const objectiveWords = business.goals.join(' ').toLowerCase();
    template.tags.forEach(tag => {
      if (objectiveWords.includes(tag)) {
        score += 8;
      }
    });

    // Ajuste por complejidad (10 puntos)
    if (business.size === 'startup' && template.complexity === 'básico') {
      score += 10;
    } else if (business.size === 'enterprise' && template.complexity === 'avanzado') {
      score += 10;
    } else if (template.complexity === 'intermedio') {
      score += 5;
    }

    return Math.min(score, 100);
  }

  private generateReasoning(template: Template, business: BusinessAnalysis): string {
    const reasons = [];

    if (template.industry.includes(business.industry)) {
      reasons.push(`Diseñado específicamente para la industria ${business.industry}`);
    }

    if (template.businessSize === business.size) {
      reasons.push(`Optimizado para empresas de tamaño ${business.size}`);
    }

    if (template.estimatedROI > 300) {
      reasons.push(`Alto ROI estimado del ${template.estimatedROI}%`);
    }

    if (business.goals.some(goal => goal.includes('automatizar'))) {
      reasons.push('Automatiza procesos clave identificados en tu análisis');
    }

    return reasons.join('. ') + '.';
  }

  private generateExpectedBenefits(template: Template, business: BusinessAnalysis): string[] {
    const benefits = [...template.features.slice(0, 3)];
    
    benefits.push(`Reducción de costos del ${Math.floor(template.estimatedROI / 10)}%`);
    benefits.push(`ROI proyectado del ${template.estimatedROI}% en el primer año`);
    
    if (business.currentPainPoints.includes('Procesos manuales repetitivos')) {
      benefits.push('Eliminación de tareas manuales repetitivas');
    }

    return benefits;
  }

  private generateImplementationPlan(template: Template): ImplementationStep[] {
    const baseSteps: ImplementationStep[] = [
      {
        id: 'analysis',
        title: 'Análisis y Planificación',
        description: 'Análisis detallado de requisitos y planificación del proyecto',
        estimatedHours: 16,
        dependencies: [],
        deliverables: ['Documento de requisitos', 'Plan de proyecto', 'Arquitectura técnica'],
        milestone: true
      },
      {
        id: 'setup',
        title: 'Configuración del Entorno',
        description: 'Preparación del entorno de desarrollo y configuración inicial',
        estimatedHours: 12,
        dependencies: ['analysis'],
        deliverables: ['Entorno configurado', 'Estructura base del proyecto'],
        milestone: false
      },
      {
        id: 'core-development',
        title: 'Desarrollo del Core',
        description: 'Implementación de las funcionalidades principales',
        estimatedHours: template.complexity === 'básico' ? 40 : template.complexity === 'intermedio' ? 80 : 120,
        dependencies: ['setup'],
        deliverables: ['Módulos principales', 'APIs básicas', 'Tests unitarios'],
        milestone: true
      },
      {
        id: 'integration',
        title: 'Integración y Testing',
        description: 'Integración con sistemas existentes y testing completo',
        estimatedHours: 24,
        dependencies: ['core-development'],
        deliverables: ['Integraciones completadas', 'Test suite', 'Documentación técnica'],
        milestone: false
      },
      {
        id: 'deployment',
        title: 'Despliegue y Go-Live',
        description: 'Despliegue en producción y puesta en marcha',
        estimatedHours: 16,
        dependencies: ['integration'],
        deliverables: ['Sistema en producción', 'Monitoreo configurado', 'Documentación de usuario'],
        milestone: true
      },
      {
        id: 'training',
        title: 'Capacitación y Soporte',
        description: 'Capacitación del equipo y soporte inicial',
        estimatedHours: 8,
        dependencies: ['deployment'],
        deliverables: ['Equipo capacitado', 'Documentación de procesos', 'Plan de soporte'],
        milestone: false
      }
    ];

    return baseSteps;
  }

  // Obtiene plantillas por categoría
  getTemplatesByCategory(category: string): Template[] {
    return this.templates.filter(template => template.category === category);
  }

  // Obtiene una plantilla específica
  getTemplateById(id: string): Template | undefined {
    return this.templates.find(template => template.id === id);
  }

  // Obtiene todas las categorías disponibles
  getCategories(): string[] {
    return [...new Set(this.templates.map(template => template.category))];
  }

  // Simula el proceso de pago
  async processPurchase(templateId: string, userId: string): Promise<{ success: boolean; message: string }> {
    // Aquí se integraría con un gateway de pago real
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simular latencia
    
    const template = this.getTemplateById(templateId);
    if (!template) {
      return { success: false, message: 'Plantilla no encontrada' };
    }

    // Simular éxito del pago
    return { 
      success: true, 
      message: `Compra exitosa de ${template.name}. Recibirás el código completo por email.` 
    };
  }
}

export const templateService = new TemplateService();