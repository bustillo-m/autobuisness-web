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