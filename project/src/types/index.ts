export interface User {
  id: string;
  name: string;
  email: string;
  plan: 'Freemium' | 'Starter' | 'Pro' | 'Empresa';
  credits: number;
  createdAt: Date;
}

export interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

export interface PricingPlan {
  name: string;
  price: number;
  description: string;
  features: string[];
  consultations: number;
  basicAgents: number;
  advancedAgents: number;
  automations: number;
  highlighted?: boolean;
}

// New types for enhanced features
export interface Template {
  id: string;
  name: string;
  description: string;
  category: 'E-commerce' | 'CRM' | 'Finanzas' | 'Marketing' | 'RRHH' | 'Operaciones' | 'Ventas' | 'Soporte';
  industry: string[];
  businessSize: 'startup' | 'pequeña' | 'mediana' | 'enterprise';
  complexity: 'básico' | 'intermedio' | 'avanzado';
  estimatedROI: number;
  implementationTime: string;
  price: number;
  features: string[];
  tags: string[];
  codePreview: string;
  fullImplementation: string;
  requirements: string[];
  isPremium: boolean;
}

export interface ChatSession {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
  messageCount: number;
}

export interface BusinessAnalysis {
  industry: string;
  businessType: string;
  size: string;
  goals: string[];
  currentPainPoints: string[];
  budget: string;
  timeframe: string;
  techStack: string[];
}

export interface TemplateRecommendation {
  template: Template;
  matchScore: number;
  reasoning: string;
  expectedBenefits: string[];
  implementationPlan: ImplementationStep[];
  estimatedCost: number;
  estimatedTimeframe: string;
}

export interface ImplementationStep {
  id: string;
  title: string;
  description: string;
  estimatedHours: number;
  dependencies: string[];
  deliverables: string[];
  milestone: boolean;
}