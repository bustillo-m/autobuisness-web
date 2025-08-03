import { Template, BusinessAnalysis, TemplateRecommendation, ImplementationStep } from '../types';

// Base de datos real de plantillas n8n
const TEMPLATES: Template[] = [
  // Integración y Automatización de CRM y Ventas
  {
    id: 'n8n-001',
    name: 'Integración CRM con HubSpot y Slack',
    description: 'Sincroniza automáticamente contactos y deals entre HubSpot y Slack, enviando notificaciones en tiempo real sobre oportunidades de venta.',
    category: 'CRM',
    industry: ['SaaS', 'B2B', 'Servicios', 'Ventas'],
    businessSize: 'pequeña',
    complexity: 'básico',
    estimatedROI: 180,
    implementationTime: '2-3 semanas',
    price: 899,
    features: [
      'Sincronización automática de contactos',
      'Notificaciones en Slack',
      'Actualización de deals en tiempo real',
      'Integración bidireccional'
    ],
    tags: ['crm', 'hubspot', 'slack', 'ventas'],
    codePreview: `// Nodos: 15
// Automatización de sincronización CRM
{
  "webhook": "trigger_new_contact",
  "hubspot": "get_contact_data",
  "slack": "send_notification",
  "conditions": "validate_deal_stage"
}`,
    fullImplementation: 'Workflow completo de n8n disponible después del pago',
    requirements: ['Cuenta HubSpot', 'Workspace Slack', 'n8n instalado', 'API keys'],
    isPremium: true
  },
  {
    id: 'n8n-002',
    name: 'Automatización de Leads en Pipedrive',
    description: 'Automatiza la gestión de leads en Pipedrive con scoring automático, asignación inteligente y seguimiento de actividades.',
    category: 'CRM',
    industry: ['B2B', 'Inmobiliaria', 'Servicios', 'Ventas'],
    businessSize: 'mediana',
    complexity: 'intermedio',
    estimatedROI: 250,
    implementationTime: '3-4 semanas',
    price: 1299,
    features: [
      'Scoring automático de leads',
      'Asignación inteligente de vendedores',
      'Seguimiento automatizado',
      'Reportes de actividad'
    ],
    tags: ['pipedrive', 'leads', 'scoring', 'automation'],
    codePreview: `// Nodos: 22
// Sistema de scoring de leads
{
  "trigger": "new_lead_webhook",
  "scoring_logic": "calculate_lead_score",
  "assignment": "assign_to_salesperson",
  "followup": "schedule_activities"
}`,
    fullImplementation: 'Workflow completo de n8n disponible después del pago',
    requirements: ['Cuenta Pipedrive', 'n8n instalado', 'Base de datos', 'API access'],
    isPremium: true
  },
  {
    id: 'n8n-003',
    name: 'Integración Salesforce Multi-canal',
    description: 'Conecta Salesforce con múltiples canales (email, SMS, WhatsApp) para campañas automatizadas y seguimiento unificado.',
    category: 'CRM',
    industry: ['Enterprise', 'B2B', 'SaaS', 'Servicios'],
    businessSize: 'enterprise',
    complexity: 'avanzado',
    estimatedROI: 320,
    implementationTime: '6-8 semanas',
    price: 2499,
    features: [
      'Integración multi-canal',
      'Campañas automatizadas',
      'Seguimiento unificado',
      'Analytics avanzados'
    ],
    tags: ['salesforce', 'multicanal', 'email', 'sms', 'whatsapp'],
    codePreview: `// Nodos: 35
// Orquestador de campañas multi-canal
{
  "salesforce_trigger": "opportunity_update",
  "channel_router": "determine_best_channel",
  "email_service": "send_personalized_email",
  "sms_service": "send_sms_followup",
  "whatsapp": "send_whatsapp_message"
}`,
    fullImplementation: 'Workflow completo de n8n disponible después del pago',
    requirements: ['Salesforce Enterprise', 'SendGrid/Mailgun', 'Twilio', 'WhatsApp Business API'],
    isPremium: true
  },

  // Notificaciones y Alertas
  {
    id: 'n8n-004',
    name: 'Sistema de Alertas Multi-canal',
    description: 'Sistema robusto de notificaciones que envía alertas críticas a través de email, Slack, Teams y SMS basado en prioridades.',
    category: 'Operaciones',
    industry: ['Tecnología', 'DevOps', 'SaaS', 'Servicios'],
    businessSize: 'mediana',
    complexity: 'intermedio',
    estimatedROI: 200,
    implementationTime: '2-3 semanas',
    price: 1099,
    features: [
      'Alertas multi-canal',
      'Priorización automática',
      'Escalado inteligente',
      'Dashboard de monitoreo'
    ],
    tags: ['alertas', 'notificaciones', 'slack', 'teams', 'sms'],
    codePreview: `// Nodos: 18
// Sistema de alertas escalonadas
{
  "monitoring_webhook": "receive_alert",
  "priority_logic": "determine_severity",
  "channel_selector": "choose_notification_method",
  "escalation": "escalate_if_no_response"
}`,
    fullImplementation: 'Workflow completo de n8n disponible después del pago',
    requirements: ['Slack/Teams', 'Email service', 'SMS provider', 'Monitoring tools'],
    isPremium: true
  },
  {
    id: 'n8n-005',
    name: 'Monitor de Redes Sociales con IA',
    description: 'Monitorea menciones de marca en redes sociales, analiza sentiment con IA y envía alertas automatizadas al equipo de marketing.',
    category: 'Marketing',
    industry: ['Marketing', 'E-commerce', 'Retail', 'SaaS'],
    businessSize: 'pequeña',
    complexity: 'intermedio',
    estimatedROI: 180,
    implementationTime: '3-4 semanas',
    price: 1399,
    features: [
      'Monitoreo de menciones',
      'Análisis de sentiment con IA',
      'Alertas automatizadas',
      'Reportes de reputación'
    ],
    tags: ['social-media', 'ia', 'sentiment', 'monitoreo', 'brand'],
    codePreview: `// Nodos: 25
// Monitor inteligente de marca
{
  "social_scraper": "monitor_mentions",
  "ai_sentiment": "analyze_sentiment",
  "alert_logic": "determine_response_urgency",
  "team_notification": "notify_marketing_team"
}`,
    fullImplementation: 'Workflow completo de n8n disponible después del pago',
    requirements: ['API de redes sociales', 'OpenAI/Claude API', 'Base de datos', 'Herramientas de comunicación'],
    isPremium: true
  },

  // Sincronización de Datos y Archivos
  {
    id: 'n8n-006',
    name: 'Sincronización Google Drive - Dropbox Enterprise',
    description: 'Sincronización bidireccional automática entre Google Drive y Dropbox con versionado, backup y gestión de conflictos.',
    category: 'Operaciones',
    industry: ['Servicios', 'Consultora', 'Tecnología', 'Educación'],
    businessSize: 'mediana',
    complexity: 'avanzado',
    estimatedROI: 150,
    implementationTime: '4-5 semanas',
    price: 1699,
    features: [
      'Sincronización bidireccional',
      'Control de versiones',
      'Backup automático',
      'Resolución de conflictos'
    ],
    tags: ['google-drive', 'dropbox', 'sync', 'backup', 'files'],
    codePreview: `// Nodos: 28
// Sincronizador inteligente de archivos
{
  "drive_monitor": "watch_file_changes",
  "conflict_resolver": "handle_version_conflicts",
  "dropbox_sync": "sync_to_dropbox",
  "backup_manager": "create_versioned_backup"
}`,
    fullImplementation: 'Workflow completo de n8n disponible después del pago',
    requirements: ['Google Drive API', 'Dropbox Business API', 'Base de datos', 'Almacenamiento adicional'],
    isPremium: true
  },
  {
    id: 'n8n-007',
    name: 'ETL para Data Warehouse',
    description: 'Pipeline ETL automatizado que extrae datos de múltiples fuentes, los transforma y carga en data warehouse con validación y logging.',
    category: 'Finanzas',
    industry: ['Fintech', 'E-commerce', 'SaaS', 'Analytics'],
    businessSize: 'enterprise',
    complexity: 'avanzado',
    estimatedROI: 280,
    implementationTime: '8-10 semanas',
    price: 3499,
    features: [
      'Extracción multi-fuente',
      'Transformación de datos',
      'Validación automática',
      'Logging y monitoreo'
    ],
    tags: ['etl', 'data-warehouse', 'analytics', 'big-data'],
    codePreview: `// Nodos: 42
// Pipeline ETL empresarial
{
  "data_extractors": "multiple_source_extraction",
  "transformation_engine": "clean_and_transform",
  "validation_layer": "data_quality_checks",
  "warehouse_loader": "load_to_warehouse"
}`,
    fullImplementation: 'Workflow completo de n8n disponible después del pago',
    requirements: ['Data Warehouse', 'APIs de fuentes de datos', 'Base de datos', 'Herramientas de BI'],
    isPremium: true
  },

  // Herramientas de Productividad y Colaboración
  {
    id: 'n8n-008',
    name: 'Automatización de Reuniones con IA',
    description: 'Gestiona automáticamente calendarios, envía invitaciones, graba reuniones, genera resúmenes con IA y distribuye actas.',
    category: 'RRHH',
    industry: ['Servicios', 'Consultora', 'SaaS', 'Tecnología'],
    businessSize: 'pequeña',
    complexity: 'intermedio',
    estimatedROI: 220,
    implementationTime: '3-4 semanas',
    price: 1599,
    features: [
      'Gestión automática de calendarios',
      'Grabación de reuniones',
      'Resúmenes con IA',
      'Distribución de actas'
    ],
    tags: ['meetings', 'calendar', 'ia', 'productivity', 'automation'],
    codePreview: `// Nodos: 30
// Asistente inteligente de reuniones
{
  "calendar_manager": "schedule_meetings",
  "recording_service": "auto_record_meeting",
  "ai_summarizer": "generate_meeting_summary",
  "distribution": "send_meeting_notes"
}`,
    fullImplementation: 'Workflow completo de n8n disponible después del pago',
    requirements: ['Google Calendar/Outlook', 'Zoom/Teams', 'OpenAI API', 'Email service'],
    isPremium: true
  },
  {
    id: 'n8n-009',
    name: 'Sistema de Tickets Inteligente',
    description: 'Sistema avanzado de gestión de tickets con clasificación automática por IA, asignación inteligente y escalado predictivo.',
    category: 'Soporte',
    industry: ['SaaS', 'Tecnología', 'Servicios', 'E-commerce'],
    businessSize: 'mediana',
    complexity: 'avanzado',
    estimatedROI: 300,
    implementationTime: '5-6 semanas',
    price: 2199,
    features: [
      'Clasificación automática con IA',
      'Asignación inteligente',
      'Escalado predictivo',
      'Analytics de soporte'
    ],
    tags: ['tickets', 'support', 'ia', 'classification', 'automation'],
    codePreview: `// Nodos: 35
// Sistema inteligente de soporte
{
  "ticket_classifier": "ai_categorize_ticket",
  "smart_assignment": "assign_to_best_agent",
  "escalation_predictor": "predict_escalation_need",
  "analytics_engine": "generate_support_metrics"
}`,
    fullImplementation: 'Workflow completo de n8n disponible después del pago',
    requirements: ['Sistema de tickets', 'IA/ML APIs', 'Base de datos', 'Analytics tools'],
    isPremium: true
  },

  // Gestión de Contenido y Redes Sociales
  {
    id: 'n8n-010',
    name: 'Publicación Multi-red Social con IA',
    description: 'Automatiza la creación y publicación de contenido en múltiples redes sociales con optimización por IA y análisis de engagement.',
    category: 'Marketing',
    industry: ['Marketing', 'E-commerce', 'Influencers', 'Agencias'],
    businessSize: 'pequeña',
    complexity: 'intermedio',
    estimatedROI: 250,
    implementationTime: '4-5 semanas',
    price: 1799,
    features: [
      'Creación de contenido con IA',
      'Publicación multi-red',
      'Optimización automática',
      'Analytics de engagement'
    ],
    tags: ['social-media', 'ia', 'content', 'automation', 'analytics'],
    codePreview: `// Nodos: 26
// Gestor inteligente de redes sociales
{
  "content_generator": "ai_create_content",
  "platform_optimizer": "optimize_for_platform",
  "scheduler": "schedule_posts",
  "analytics": "track_engagement"
}`,
    fullImplementation: 'Workflow completo de n8n disponible después del pago',
    requirements: ['APIs de redes sociales', 'OpenAI/Claude', 'Base de datos', 'Herramientas de analytics'],
    isPremium: true
  },
  {
    id: 'n8n-011',
    name: 'Curación de Contenido Automatizada',
    description: 'Sistema que busca, filtra y curea contenido relevante automáticamente, generando newsletters y posts con IA.',
    category: 'Marketing',
    industry: ['Marketing', 'Media', 'Consultora', 'Educación'],
    businessSize: 'pequeña',
    complexity: 'intermedio',
    estimatedROI: 180,
    implementationTime: '3-4 semanas',
    price: 1299,
    features: [
      'Búsqueda automática de contenido',
      'Filtrado inteligente',
      'Generación de newsletters',
      'Curación con IA'
    ],
    tags: ['content', 'curation', 'newsletter', 'ia', 'automation'],
    codePreview: `// Nodos: 22
// Curador inteligente de contenido
{
  "content_scraper": "find_relevant_content",
  "ai_filter": "filter_quality_content",
  "newsletter_generator": "create_newsletter",
  "distribution": "send_to_subscribers"
}`,
    fullImplementation: 'Workflow completo de n8n disponible después del pago',
    requirements: ['Web scraping tools', 'IA APIs', 'Email service', 'Base de datos'],
    isPremium: true
  },

  // Inteligencia Artificial y NLP
  {
    id: 'n8n-012',
    name: 'Análisis de Sentiment Empresarial',
    description: 'Analiza automáticamente el sentiment de reviews, comentarios y feedback usando múltiples modelos de IA con reportes ejecutivos.',
    category: 'Marketing',
    industry: ['E-commerce', 'SaaS', 'Servicios', 'Retail'],
    businessSize: 'mediana',
    complexity: 'avanzado',
    estimatedROI: 200,
    implementationTime: '4-6 semanas',
    price: 2099,
    features: [
      'Análisis multi-modelo de IA',
      'Procesamiento de múltiples fuentes',
      'Reportes ejecutivos automáticos',
      'Alertas de sentiment negativo'
    ],
    tags: ['sentiment', 'ia', 'nlp', 'analytics', 'reviews'],
    codePreview: `// Nodos: 31
// Analizador empresarial de sentiment
{
  "data_collector": "gather_feedback_sources",
  "ai_analyzer": "multi_model_sentiment",
  "report_generator": "create_executive_reports",
  "alert_system": "negative_sentiment_alerts"
}`,
    fullImplementation: 'Workflow completo de n8n disponible después del pago',
    requirements: ['APIs de IA/NLP', 'Fuentes de datos', 'Base de datos', 'Herramientas de reporting'],
    isPremium: true
  },
  {
    id: 'n8n-013',
    name: 'Chatbot Multiidioma Avanzado',
    description: 'Chatbot empresarial con IA que maneja múltiples idiomas, integra con CRM y bases de conocimiento para soporte 24/7.',
    category: 'Soporte',
    industry: ['SaaS', 'E-commerce', 'Servicios', 'Tecnología'],
    businessSize: 'mediana',
    complexity: 'avanzado',
    estimatedROI: 350,
    implementationTime: '6-8 semanas',
    price: 2899,
    features: [
      'Soporte multiidioma',
      'Integración con CRM',
      'Base de conocimiento',
      'Escalado inteligente'
    ],
    tags: ['chatbot', 'ia', 'multiidioma', 'crm', '24/7'],
    codePreview: `// Nodos: 38
// Chatbot empresarial inteligente
{
  "language_detector": "detect_user_language",
  "ai_processor": "process_multilingual_query",
  "crm_integration": "check_customer_context",
  "knowledge_base": "search_relevant_info"
}`,
    fullImplementation: 'Workflow completo de n8n disponible después del pago',
    requirements: ['IA/NLP APIs', 'CRM system', 'Base de conocimiento', 'Chat platform'],
    isPremium: true
  },

  // Web Scraping y Extracción de Datos
  {
    id: 'n8n-014',
    name: 'Monitor de Competencia Automatizado',
    description: 'Sistema que monitorea automáticamente precios, productos y estrategias de competidores con alertas y reportes de inteligencia competitiva.',
    category: 'Marketing',
    industry: ['E-commerce', 'Retail', 'SaaS', 'Servicios'],
    businessSize: 'mediana',
    complexity: 'avanzado',
    estimatedROI: 280,
    implementationTime: '5-7 semanas',
    price: 2399,
    features: [
      'Monitoreo de precios automático',
      'Análisis de productos competidores',
      'Inteligencia competitiva',
      'Alertas de cambios importantes'
    ],
    tags: ['competitive-intelligence', 'scraping', 'monitoring', 'analytics'],
    codePreview: `// Nodos: 33
// Monitor inteligente de competencia
{
  "web_scraper": "scrape_competitor_data",
  "price_analyzer": "analyze_pricing_changes",
  "product_tracker": "track_new_products",
  "intelligence_reporter": "generate_competitive_reports"
}`,
    fullImplementation: 'Workflow completo de n8n disponible después del pago',
    requirements: ['Web scraping tools', 'Proxy services', 'Base de datos', 'Analytics platform'],
    isPremium: true
  },
  {
    id: 'n8n-015',
    name: 'Extractor de Leads B2B Avanzado',
    description: 'Extrae y valida automáticamente leads B2B de múltiples fuentes, enriquece con datos adicionales y los integra en CRM.',
    category: 'Ventas',
    industry: ['B2B', 'SaaS', 'Servicios', 'Consultora'],
    businessSize: 'pequeña',
    complexity: 'intermedio',
    estimatedROI: 320,
    implementationTime: '4-5 semanas',
    price: 1899,
    features: [
      'Extracción multi-fuente',
      'Validación automática',
      'Enriquecimiento de datos',
      'Integración directa con CRM'
    ],
    tags: ['lead-generation', 'b2b', 'scraping', 'crm', 'validation'],
    codePreview: `// Nodos: 27
// Generador automático de leads B2B
{
  "multi_scraper": "extract_from_sources",
  "lead_validator": "validate_contact_info",
  "data_enricher": "enrich_with_company_data",
  "crm_integration": "add_to_sales_pipeline"
}`,
    fullImplementation: 'Workflow completo de n8n disponible después del pago',
    requirements: ['Web scraping APIs', 'Data enrichment services', 'CRM APIs', 'Validation tools'],
    isPremium: true
  },

  // Agentes Autónomos y Lógica Dinámica
  {
    id: 'n8n-016',
    name: 'Agente Autónomo de Trading',
    description: 'Agente de IA que opera automáticamente en mercados financieros con análisis técnico, gestión de riesgo y reportes en tiempo real.',
    category: 'Finanzas',
    industry: ['Fintech', 'Trading', 'Inversiones', 'Crypto'],
    businessSize: 'enterprise',
    complexity: 'avanzado',
    estimatedROI: 400,
    implementationTime: '8-12 semanas',
    price: 4999,
    features: [
      'Trading automático con IA',
      'Análisis técnico avanzado',
      'Gestión de riesgo',
      'Reportes en tiempo real'
    ],
    tags: ['trading', 'ia', 'finanzas', 'autonomous', 'risk-management'],
    codePreview: `// Nodos: 45
// Agente autónomo de trading
{
  "market_analyzer": "analyze_market_conditions",
  "ai_decision_engine": "make_trading_decisions",
  "risk_manager": "calculate_position_sizing",
  "execution_engine": "execute_trades"
}`,
    fullImplementation: 'Workflow completo de n8n disponible después del pago',
    requirements: ['Trading APIs', 'Market data feeds', 'AI/ML services', 'Risk management tools'],
    isPremium: true
  },
  {
    id: 'n8n-017',
    name: 'Optimizador de Inventario con ML',
    description: 'Sistema de ML que predice demanda, optimiza niveles de inventario automáticamente y gestiona reabastecimiento inteligente.',
    category: 'Operaciones',
    industry: ['E-commerce', 'Retail', 'Manufacturing', 'Logística'],
    businessSize: 'mediana',
    complexity: 'avanzado',
    estimatedROI: 250,
    implementationTime: '6-8 semanas',
    price: 2799,
    features: [
      'Predicción de demanda con ML',
      'Optimización automática de stock',
      'Reabastecimiento inteligente',
      'Analytics predictivos'
    ],
    tags: ['inventory', 'ml', 'prediction', 'optimization', 'automation'],
    codePreview: `// Nodos: 36
// Optimizador inteligente de inventario
{
  "demand_predictor": "ml_demand_forecast",
  "inventory_optimizer": "optimize_stock_levels",
  "auto_reorder": "intelligent_reordering",
  "analytics": "predictive_inventory_analytics"
}`,
    fullImplementation: 'Workflow completo de n8n disponible después del pago',
    requirements: ['ML/AI services', 'Inventory management system', 'Historical data', 'ERP integration'],
    isPremium: true
  },

  // E-commerce y Automatización de Ventas
  {
    id: 'n8n-018',
    name: 'Suite E-commerce Completa',
    description: 'Automatización integral para e-commerce: gestión de pedidos, inventario, atención al cliente, marketing y analytics.',
    category: 'E-commerce',
    industry: ['E-commerce', 'Retail', 'Fashion', 'Electronics'],
    businessSize: 'mediana',
    complexity: 'avanzado',
    estimatedROI: 380,
    implementationTime: '8-10 semanas',
    price: 3299,
    features: [
      'Gestión automática de pedidos',
      'Control de inventario en tiempo real',
      'Atención al cliente automatizada',
      'Marketing automation integrado'
    ],
    tags: ['ecommerce', 'orders', 'inventory', 'customer-service', 'marketing'],
    codePreview: `// Nodos: 42
// Suite completa e-commerce
{
  "order_processor": "automate_order_fulfillment",
  "inventory_sync": "real_time_stock_updates",
  "customer_service": "automated_support_bot",
  "marketing_engine": "personalized_campaigns"
}`,
    fullImplementation: 'Workflow completo de n8n disponible después del pago',
    requirements: ['E-commerce platform', 'Payment gateways', 'Shipping APIs', 'Marketing tools'],
    isPremium: true
  },
  {
    id: 'n8n-019',
    name: 'Recuperación de Carritos Abandonados con IA',
    description: 'Sistema inteligente que detecta carritos abandonados y ejecuta campañas personalizadas de recuperación usando IA.',
    category: 'E-commerce',
    industry: ['E-commerce', 'Retail', 'SaaS', 'Subscription'],
    businessSize: 'pequeña',
    complexity: 'intermedio',
    estimatedROI: 280,
    implementationTime: '3-4 semanas',
    price: 1599,
    features: [
      'Detección automática de abandonos',
      'Campañas personalizadas con IA',
      'Múltiples canales de contacto',
      'A/B testing automático'
    ],
    tags: ['cart-abandonment', 'ia', 'personalization', 'recovery', 'ecommerce'],
    codePreview: `// Nodos: 24
// Recuperador inteligente de carritos
{
  "abandonment_detector": "detect_cart_abandonment",
  "ai_personalizer": "create_personalized_message",
  "channel_selector": "choose_best_channel",
  "ab_tester": "optimize_recovery_rate"
}`,
    fullImplementation: 'Workflow completo de n8n disponible después del pago',
    requirements: ['E-commerce platform', 'Email/SMS services', 'AI APIs', 'Analytics tools'],
    isPremium: true
  },

  // Automatización de Procesos de RRHH
  {
    id: 'n8n-020',
    name: 'Reclutamiento Automatizado con IA',
    description: 'Automatiza el proceso de reclutamiento: screening de CVs, evaluaciones, programación de entrevistas y seguimiento de candidatos.',
    category: 'RRHH',
    industry: ['RRHH', 'Consultora', 'Tecnología', 'Servicios'],
    businessSize: 'mediana',
    complexity: 'avanzado',
    estimatedROI: 300,
    implementationTime: '6-8 semanas',
    price: 2599,
    features: [
      'Screening automático de CVs',
      'Evaluaciones con IA',
      'Programación automática',
      'Seguimiento de candidatos'
    ],
    tags: ['rrhh', 'recruitment', 'ia', 'screening', 'automation'],
    codePreview: `// Nodos: 34
// Sistema de reclutamiento inteligente
{
  "cv_screener": "ai_cv_analysis",
  "skill_evaluator": "automated_skill_tests",
  "scheduler": "auto_schedule_interviews",
  "candidate_tracker": "track_recruitment_pipeline"
}`,
    fullImplementation: 'Workflow completo de n8n disponible después del pago',
    requirements: ['ATS system', 'AI/NLP APIs', 'Calendar APIs', 'Email services'],
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

    // Análisis mejorado de industria basado en los nuevos workflows n8n
    let industry = 'General';
    if (allText.includes('tienda') || allText.includes('e-commerce') || allText.includes('producto') || allText.includes('carrito') || allText.includes('inventario')) {
      industry = 'E-commerce';
    } else if (allText.includes('cliente') || allText.includes('crm') || allText.includes('leads') || allText.includes('hubspot') || allText.includes('salesforce') || allText.includes('pipedrive')) {
      industry = 'CRM';
    } else if (allText.includes('marketing') || allText.includes('campaña') || allText.includes('redes sociales') || allText.includes('contenido') || allText.includes('publicidad')) {
      industry = 'Marketing';
    } else if (allText.includes('finanzas') || allText.includes('contabilidad') || allText.includes('factura') || allText.includes('trading') || allText.includes('analytics')) {
      industry = 'Fintech';
    } else if (allText.includes('empleados') || allText.includes('rrhh') || allText.includes('recursos humanos') || allText.includes('reclutamiento') || allText.includes('nomina')) {
      industry = 'RRHH';
    } else if (allText.includes('soporte') || allText.includes('tickets') || allText.includes('atención al cliente') || allText.includes('chatbot') || allText.includes('help desk')) {
      industry = 'Soporte';
    } else if (allText.includes('operaciones') || allText.includes('proceso') || allText.includes('automatización') || allText.includes('workflow') || allText.includes('sincronización')) {
      industry = 'Operaciones';
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

    // Extracción de objetivos específicos para workflows n8n
    const goals = [];
    if (allText.includes('automatizar') || allText.includes('automático') || allText.includes('workflow') || allText.includes('n8n')) {
      goals.push('Automatización de procesos con n8n');
    }
    if (allText.includes('ventas') || allText.includes('ingresos') || allText.includes('conversión') || allText.includes('leads')) {
      goals.push('Incrementar ventas y conversiones');
    }
    if (allText.includes('eficiencia') || allText.includes('productividad') || allText.includes('optimizar')) {
      goals.push('Mejorar eficiencia operacional');
    }
    if (allText.includes('clientes') || allText.includes('atención') || allText.includes('soporte') || allText.includes('experiencia')) {
      goals.push('Mejorar experiencia del cliente');
    }
    if (allText.includes('integrar') || allText.includes('conectar') || allText.includes('sincronizar') || allText.includes('unificar')) {
      goals.push('Integrar sistemas y herramientas');
    }
    if (allText.includes('datos') || allText.includes('analytics') || allText.includes('reportes') || allText.includes('insights')) {
      goals.push('Mejorar análisis de datos');
    }
    if (allText.includes('monitorear') || allText.includes('alertas') || allText.includes('notificaciones')) {
      goals.push('Implementar monitoreo y alertas');
    }

    // Identificación de pain points específicos para automatización
    const painPoints = [];
    if (allText.includes('manual') || allText.includes('repetitivo') || allText.includes('tedioso')) {
      painPoints.push('Procesos manuales y repetitivos');
    }
    if (allText.includes('tiempo') || allText.includes('lento') || allText.includes('demora') || allText.includes('bottleneck')) {
      painPoints.push('Procesos lentos y cuellos de botella');
    }
    if (allText.includes('error') || allText.includes('inconsistencia') || allText.includes('problema')) {
      painPoints.push('Errores e inconsistencias en procesos');
    }
    if (allText.includes('comunicación') || allText.includes('coordinación') || allText.includes('silos') || allText.includes('desconectado')) {
      painPoints.push('Falta de integración entre sistemas');
    }
    if (allText.includes('visibilidad') || allText.includes('seguimiento') || allText.includes('control')) {
      painPoints.push('Falta de visibilidad en procesos');
    }
    if (allText.includes('escalabilidad') || allText.includes('crecimiento') || allText.includes('volumen')) {
      painPoints.push('Problemas de escalabilidad');
    }

    return {
      industry,
      businessType: industry,
      size: businessSize,
      goals: goals.length > 0 ? goals : ['Automatización de procesos con n8n'],
      currentPainPoints: painPoints.length > 0 ? painPoints : ['Procesos manuales ineficientes'],
      budget: 'No especificado',
      timeframe: 'No especificado',
      techStack: ['n8n']
    };
  }

  // Genera recomendaciones de plantillas basadas en el análisis del negocio
  generateRecommendations(businessAnalysis: BusinessAnalysis): TemplateRecommendation[] {
    const recommendations: TemplateRecommendation[] = [];

    // Filtrar plantillas relevantes con lógica mejorada
    const relevantTemplates = this.templates.filter(template => {
      // Coincidencia exacta de categoría con industria detectada
      const categoryMatch = template.category.toLowerCase() === businessAnalysis.industry.toLowerCase();
      
      // Coincidencia de industria en el array de industrias del template
      const industryMatch = template.industry.some(ind => 
        ind.toLowerCase().includes(businessAnalysis.industry.toLowerCase()) ||
        businessAnalysis.industry.toLowerCase().includes(ind.toLowerCase())
      );
      
      // Coincidencia de tamaño de empresa (más flexible)
      const sizeMatch = template.businessSize === businessAnalysis.size || 
                       (businessAnalysis.size === 'startup' && template.businessSize === 'pequeña') ||
                       (businessAnalysis.size === 'mediana' && template.businessSize === 'pequeña') ||
                       template.businessSize === 'pequeña'; // pequeña como fallback universal

      // Coincidencia por objetivos (buscar en tags y features)
      const goalMatch = businessAnalysis.goals.some(goal => 
        template.tags.some(tag => goal.toLowerCase().includes(tag.toLowerCase())) ||
        template.features.some(feature => goal.toLowerCase().includes(feature.toLowerCase().split(' ')[0]))
      );

      return categoryMatch || industryMatch || (sizeMatch && goalMatch);
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

    // Coincidencia de categoría exacta (50 puntos)
    if (template.category.toLowerCase() === business.industry.toLowerCase()) {
      score += 50;
    }

    // Coincidencia de industria en array (30 puntos)
    const industryMatch = template.industry.some(ind => 
      ind.toLowerCase().includes(business.industry.toLowerCase()) ||
      business.industry.toLowerCase().includes(ind.toLowerCase())
    );
    if (industryMatch) {
      score += 30;
    }

    // Coincidencia de tamaño de empresa (15 puntos)
    if (template.businessSize === business.size) {
      score += 15;
    } else if (business.size === 'startup' && template.businessSize === 'pequeña') {
      score += 10;
    } else if (business.size === 'mediana' && template.businessSize === 'pequeña') {
      score += 8;
    }

    // Coincidencia de objetivos con tags (20 puntos)
    const objectiveWords = business.goals.join(' ').toLowerCase();
    let tagMatches = 0;
    template.tags.forEach(tag => {
      if (objectiveWords.includes(tag.toLowerCase())) {
        tagMatches++;
        score += 4;
      }
    });

    // Coincidencia de pain points con features (15 puntos)
    const painPointWords = business.currentPainPoints.join(' ').toLowerCase();
    template.features.forEach(feature => {
      const featureWords = feature.toLowerCase();
      if (painPointWords.includes('manual') && featureWords.includes('automát')) {
        score += 5;
      }
      if (painPointWords.includes('integración') && featureWords.includes('integra')) {
        score += 5;
      }
      if (painPointWords.includes('tiempo') && (featureWords.includes('rápid') || featureWords.includes('tiempo real'))) {
        score += 3;
      }
    });

    // Bonus por ROI alto (10 puntos)
    if (template.estimatedROI > 300) {
      score += 10;
    } else if (template.estimatedROI > 200) {
      score += 5;
    }

    // Ajuste por complejidad según tamaño de empresa (10 puntos)
    if (business.size === 'startup' && template.complexity === 'básico') {
      score += 10;
    } else if (business.size === 'enterprise' && template.complexity === 'avanzado') {
      score += 10;
    } else if (business.size === 'mediana' && template.complexity === 'intermedio') {
      score += 8;
    } else if (template.complexity === 'intermedio') {
      score += 5;
    }

    return Math.min(score, 100);
  }

  private generateReasoning(template: Template, business: BusinessAnalysis): string {
    const reasons = [];

    // Coincidencia de categoría
    if (template.category.toLowerCase() === business.industry.toLowerCase()) {
      reasons.push(`Workflow n8n especializado en ${business.industry}`);
    } else if (template.industry.some(ind => ind.toLowerCase().includes(business.industry.toLowerCase()))) {
      reasons.push(`Incluye integraciones específicas para ${business.industry}`);
    }

    // Tamaño de empresa
    if (template.businessSize === business.size) {
      reasons.push(`Diseñado para empresas ${business.size}s`);
    } else if (business.size === 'startup' && template.businessSize === 'pequeña') {
      reasons.push('Escalable desde startup hasta pequeña empresa');
    }

    // ROI y beneficios
    if (template.estimatedROI > 300) {
      reasons.push(`Excelente ROI del ${template.estimatedROI}% en el primer año`);
    } else if (template.estimatedROI > 200) {
      reasons.push(`Sólido ROI del ${template.estimatedROI}%`);
    }

    // Tiempo de implementación
    const timeframe = template.implementationTime;
    if (timeframe.includes('2-3') || timeframe.includes('3-4')) {
      reasons.push('Implementación rápida con resultados inmediatos');
    } else if (timeframe.includes('4-6') || timeframe.includes('5-7')) {
      reasons.push('Tiempo de implementación moderado con alto impacto');
    }

    // Complejidad
    if (template.complexity === 'básico') {
      reasons.push('Fácil de implementar y mantener');
    } else if (template.complexity === 'avanzado') {
      reasons.push('Solución robusta con características empresariales');
    }

    // Objetivos específicos
    if (business.goals.some(goal => goal.includes('automatizar') || goal.includes('n8n'))) {
      reasons.push('Automatiza directamente los procesos identificados');
    }

    // Pain points específicos
    if (business.currentPainPoints.some(pain => pain.includes('manual')) && 
        template.features.some(feature => feature.toLowerCase().includes('automát'))) {
      reasons.push('Elimina procesos manuales identificados');
    }

    return reasons.slice(0, 3).join('. ') + '.';
  }

  private generateExpectedBenefits(template: Template, business: BusinessAnalysis): string[] {
    const benefits = [];
    
    // Incluir las características principales del template
    benefits.push(...template.features.slice(0, 2));
    
    // Beneficios financieros específicos
    benefits.push(`ROI proyectado del ${template.estimatedROI}% en el primer año`);
    benefits.push(`Tiempo de implementación: ${template.implementationTime}`);
    
    // Beneficios específicos basados en pain points
    if (business.currentPainPoints.some(pain => pain.includes('manual'))) {
      benefits.push('Reducción del 70-90% en tareas manuales');
    }
    
    if (business.currentPainPoints.some(pain => pain.includes('tiempo') || pain.includes('lento'))) {
      benefits.push('Aceleración de procesos hasta 10x más rápido');
    }
    
    if (business.currentPainPoints.some(pain => pain.includes('error') || pain.includes('inconsistencia'))) {
      benefits.push('Eliminación de errores humanos');
    }
    
    if (business.currentPainPoints.some(pain => pain.includes('integración'))) {
      benefits.push('Unificación de sistemas y herramientas');
    }
    
    // Beneficios específicos de n8n
    benefits.push('Workflow visual fácil de entender y modificar');
    benefits.push('Integración con 400+ aplicaciones y servicios');

    return benefits.slice(0, 6);
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