export interface N8nWorkflowTemplate {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  category: WorkflowCategory;
  subcategory: string;
  tags: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedSetupTime: number; // in minutes
  workflow: N8nWorkflow;
  requiredServices: string[];
  useCase: string;
  businessValue: string;
  targetAudience: string[];
  prerequisites: string[];
  createdAt: string;
  updatedAt: string;
  author: string;
  version: string;
  rating: number;
  downloads: number;
  featured: boolean;
}

export interface N8nWorkflow {
  name: string;
  nodes: N8nNode[];
  connections: Record<string, any>;
  active: boolean;
  settings: Record<string, any>;
  staticData?: Record<string, any>;
}

export interface N8nNode {
  id: string;
  name: string;
  type: string;
  typeVersion: number;
  position: [number, number];
  parameters: Record<string, any>;
  webhookId?: string;
  credentials?: Record<string, string>;
}

export enum WorkflowCategory {
  AUTOMATION = 'automation',
  INTEGRATION = 'integration',
  DATA_PROCESSING = 'data-processing',
  COMMUNICATION = 'communication',
  MARKETING = 'marketing',
  SALES = 'sales',
  CUSTOMER_SERVICE = 'customer-service',
  PROJECT_MANAGEMENT = 'project-management',
  FINANCE = 'finance',
  HR = 'hr',
  ECOMMERCE = 'ecommerce',
  SOCIAL_MEDIA = 'social-media',
  ANALYTICS = 'analytics',
  SECURITY = 'security',
  BACKUP = 'backup',
  MONITORING = 'monitoring',
  AI_ML = 'ai-ml',
  WEB_SCRAPING = 'web-scraping',
  EMAIL = 'email',
  DOCUMENT_PROCESSING = 'document-processing'
}

export interface TemplateSearchParams {
  query?: string;
  category?: WorkflowCategory;
  tags?: string[];
  difficulty?: string;
  requiredServices?: string[];
  featured?: boolean;
  minRating?: number;
}

export interface TemplateRecommendation {
  template: N8nWorkflowTemplate;
  score: number;
  reasoning: string;
  matchedCriteria: string[];
}

export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: string;
  recommendations?: TemplateRecommendation[];
}