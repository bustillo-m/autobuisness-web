import { Template, BusinessAnalysis, TemplateRecommendation, ImplementationStep } from '../types';

// Base de datos completa de plantillas n8n basada en el README proporcionado
const TEMPLATES: Template[] = [
  // === INTEGRACIÓN Y AUTOMATIZACIÓN DE CRM Y VENTAS ===
  {
    id: 'wf-001',
    name: 'Integración CRM con HubSpot y Slack',
    description: 'Automatiza la integración entre CRM HubSpot y Slack para sincronización de contactos y notificaciones.',
    category: 'CRM',
    industry: ['SaaS', 'B2B', 'Servicios', 'Tecnología'],
    businessSize: 'mediana',
    complexity: 'intermedio',
    estimatedROI: 250,
    implementationTime: '2-3 semanas',
    price: 1200,
    features: ['Sincronización CRM-Slack', 'Notificaciones automáticas', 'Gestión de contactos', 'Integración bidireccional'],
    tags: ['crm', 'hubspot', 'slack', 'integración'],
    codePreview: '// Nodos: 15\n// Workflow de integración CRM-Slack\n{\n  "trigger": "hubspot_webhook",\n  "process": "format_contact_data",\n  "action": "send_slack_notification"\n}',
    fullImplementation: 'Workflow completo disponible después del pago',
    requirements: ['HubSpot API', 'Slack Workspace', 'n8n Cloud/Self-hosted'],
    isPremium: true
  },
  {
    id: 'wf-002',
    name: 'Automatización de Leads en Pipedrive',
    description: 'Sistema automatizado para gestión y calificación de leads en Pipedrive con scoring inteligente.',
    category: 'CRM',
    industry: ['Ventas', 'B2B', 'Inmobiliaria', 'Servicios'],
    businessSize: 'pequeña',
    complexity: 'básico',
    estimatedROI: 180,
    implementationTime: '1-2 semanas',
    price: 899,
    features: ['Lead scoring automático', 'Asignación inteligente', 'Seguimiento automatizado', 'Reportes de conversión'],
    tags: ['pipedrive', 'leads', 'scoring', 'ventas'],
    codePreview: '// Nodos: 12\n// Sistema de scoring de leads\n{\n  "lead_capture": "webhook_form",\n  "scoring": "calculate_lead_score",\n  "assignment": "assign_to_sales_rep"\n}',
    fullImplementation: 'Workflow completo disponible después del pago',
    requirements: ['Pipedrive CRM', 'Formularios web', 'APIs de terceros'],
    isPremium: true
  },
  {
    id: 'wf-003',
    name: 'Sistema de Ventas con Stripe y Email Marketing',
    description: 'Automatización completa del proceso de ventas integrando Stripe para pagos y email marketing.',
    category: 'Ventas',
    industry: ['E-commerce', 'SaaS', 'Servicios Digitales'],
    businessSize: 'mediana',
    complexity: 'avanzado',
    estimatedROI: 350,
    implementationTime: '4-6 semanas',
    price: 2100,
    features: ['Procesamiento de pagos', 'Email sequences', 'Gestión de suscripciones', 'Analytics de ventas'],
    tags: ['stripe', 'email-marketing', 'pagos', 'suscripciones'],
    codePreview: '// Nodos: 25\n// Sistema completo de ventas\n{\n  "payment": "stripe_webhook",\n  "email": "trigger_email_sequence",\n  "analytics": "track_conversion_metrics"\n}',
    fullImplementation: 'Workflow completo disponible después del pago',
    requirements: ['Stripe Account', 'Email Service Provider', 'Database'],
    isPremium: true
  },
  {
    id: 'wf-004',
    name: 'Automatización de Facturas con QuickBooks',
    description: 'Automatiza la creación y envío de facturas usando QuickBooks con seguimiento de pagos.',
    category: 'Finanzas',
    industry: ['Servicios', 'Consultoría', 'Freelance', 'Pequeños Negocios'],
    businessSize: 'pequeña',
    complexity: 'intermedio',
    estimatedROI: 200,
    implementationTime: '2-3 semanas',
    price: 1050,
    features: ['Facturación automática', 'Seguimiento de pagos', 'Recordatorios', 'Reportes financieros'],
    tags: ['quickbooks', 'facturas', 'contabilidad', 'pagos'],
    codePreview: '// Nodos: 18\n// Automatización de facturas\n{\n  "trigger": "invoice_due",\n  "create": "generate_invoice_qb",\n  "send": "email_invoice_client"\n}',
    fullImplementation: 'Workflow completo disponible después del pago',
    requirements: ['QuickBooks Online', 'Email Service', 'Cliente database'],
    isPremium: true
  },

  // === NOTIFICACIONES Y ALERTAS ===
  {
    id: 'wf-005',
    name: 'Monitor de Sitio Web con Alertas Múltiples',
    description: 'Sistema de monitoreo de sitio web con alertas por email, Slack y SMS cuando detecta problemas.',
    category: 'Operaciones',
    industry: ['Tecnología', 'E-commerce', 'SaaS', 'Servicios Digitales'],
    businessSize: 'mediana',
    complexity: 'intermedio',
    estimatedROI: 300,
    implementationTime: '1-2 semanas',
    price: 750,
    features: ['Monitoreo 24/7', 'Alertas multi-canal', 'Tiempo de respuesta', 'Reportes de uptime'],
    tags: ['monitoring', 'alertas', 'uptime', 'notificaciones'],
    codePreview: '// Nodos: 10\n// Monitor de sitio web\n{\n  "check": "http_request_ping",\n  "alert": "send_multi_channel_alert",\n  "log": "store_uptime_data"\n}',
    fullImplementation: 'Workflow completo disponible después del pago',
    requirements: ['URLs a monitorear', 'Slack/Email/SMS APIs', 'Base de datos'],
    isPremium: false
  },
  {
    id: 'wf-006',
    name: 'Alertas de Redes Sociales y Menciones',
    description: 'Monitorea menciones de marca en redes sociales y envía alertas inmediatas al equipo.',
    category: 'Marketing',
    industry: ['Retail', 'B2C', 'Agencias', 'Marcas'],
    businessSize: 'pequeña',
    complexity: 'básico',
    estimatedROI: 150,
    implementationTime: '1 semana',
    price: 650,
    features: ['Monitoreo de menciones', 'Análisis de sentimiento', 'Alertas en tiempo real', 'Dashboard'],
    tags: ['social-media', 'menciones', 'brand-monitoring', 'alertas'],
    codePreview: '// Nodos: 8\n// Monitor de menciones\n{\n  "search": "social_media_api_search",\n  "analyze": "sentiment_analysis",\n  "notify": "send_team_alert"\n}',
    fullImplementation: 'Workflow completo disponible después del pago',
    requirements: ['Social Media APIs', 'Sentiment Analysis API', 'Notification channels'],
    isPremium: false
  },
  {
    id: 'wf-007',
    name: 'Sistema de Alertas Financieras',
    description: 'Monitorea métricas financieras clave y envía alertas cuando se superan umbrales establecidos.',
    category: 'Finanzas',
    industry: ['Fintech', 'SaaS', 'E-commerce', 'Servicios'],
    businessSize: 'mediana',
    complexity: 'avanzado',
    estimatedROI: 280,
    implementationTime: '3-4 semanas',
    price: 1680,
    features: ['Monitoreo de KPIs', 'Umbrales personalizados', 'Predicciones', 'Reportes automáticos'],
    tags: ['finanzas', 'kpis', 'alertas', 'analytics'],
    codePreview: '// Nodos: 22\n// Alertas financieras\n{\n  "data": "fetch_financial_metrics",\n  "analyze": "compare_thresholds",\n  "alert": "send_executive_report"\n}',
    fullImplementation: 'Workflow completo disponible después del pago',
    requirements: ['Financial APIs', 'Database', 'Analytics tools', 'Reporting platform'],
    isPremium: true
  },

  // === SINCRONIZACIÓN DE DATOS Y ARCHIVOS ===
  {
    id: 'wf-008',
    name: 'Sincronización Google Drive con Base de Datos',
    description: 'Sincroniza automáticamente archivos de Google Drive con base de datos para backup y organización.',
    category: 'Operaciones',
    industry: ['Servicios', 'Consultoría', 'Educación', 'Tecnología'],
    businessSize: 'pequeña',
    complexity: 'intermedio',
    estimatedROI: 180,
    implementationTime: '2-3 semanas',
    price: 950,
    features: ['Sync bidireccional', 'Backup automático', 'Organización inteligente', 'Control de versiones'],
    tags: ['google-drive', 'sync', 'backup', 'archivos'],
    codePreview: '// Nodos: 14\n// Sincronización Drive-DB\n{\n  "monitor": "drive_file_changes",\n  "process": "extract_metadata",\n  "store": "update_database_record"\n}',
    fullImplementation: 'Workflow completo disponible después del pago',
    requirements: ['Google Drive API', 'Database', 'Storage solution'],
    isPremium: true
  },
  {
    id: 'wf-009',
    name: 'Migración Automática de Datos Excel a CRM',
    description: 'Automatiza la migración de datos desde archivos Excel hacia sistemas CRM con validación.',
    category: 'CRM',
    industry: ['Ventas', 'B2B', 'Servicios', 'Consultoría'],
    businessSize: 'mediana',
    complexity: 'avanzado',
    estimatedROI: 320,
    implementationTime: '3-5 semanas',
    price: 1850,
    features: ['Parseo automático', 'Validación de datos', 'Mapeo inteligente', 'Reportes de migración'],
    tags: ['excel', 'crm', 'migración', 'datos'],
    codePreview: '// Nodos: 28\n// Migración Excel-CRM\n{\n  "read": "parse_excel_file",\n  "validate": "data_quality_check",\n  "import": "bulk_crm_import"\n}',
    fullImplementation: 'Workflow completo disponible después del pago',
    requirements: ['Excel files', 'CRM API', 'Data validation rules'],
    isPremium: true
  },
  {
    id: 'wf-010',
    name: 'Backup Automático Multi-Plataforma',
    description: 'Sistema de backup que sincroniza datos entre múltiples plataformas cloud automáticamente.',
    category: 'Operaciones',
    industry: ['Tecnología', 'SaaS', 'Agencias', 'Servicios'],
    businessSize: 'mediana',
    complexity: 'avanzado',
    estimatedROI: 250,
    implementationTime: '4-6 semanas',
    price: 2200,
    features: ['Multi-cloud backup', 'Encriptación', 'Programación flexible', 'Monitoreo de integridad'],
    tags: ['backup', 'cloud', 'seguridad', 'sincronización'],
    codePreview: '// Nodos: 35\n// Backup multi-plataforma\n{\n  "source": "collect_from_platforms",\n  "encrypt": "secure_data_encryption",\n  "distribute": "store_multiple_locations"\n}',
    fullImplementation: 'Workflow completo disponible después del pago',
    requirements: ['Multiple cloud APIs', 'Encryption tools', 'Monitoring system'],
    isPremium: true
  },

  // === HERRAMIENTAS DE PRODUCTIVIDAD Y COLABORACIÓN ===
  {
    id: 'wf-011',
    name: 'Automatización de Reuniones con Zoom y Calendar',
    description: 'Automatiza la programación de reuniones integrando Zoom con Google Calendar y envío de recordatorios.',
    category: 'Operaciones',
    industry: ['Servicios', 'Consultoría', 'SaaS', 'Educación'],
    businessSize: 'pequeña',
    complexity: 'básico',
    estimatedROI: 160,
    implementationTime: '1-2 semanas',
    price: 720,
    features: ['Programación automática', 'Links de Zoom', 'Recordatorios', 'Seguimiento de asistencia'],
    tags: ['zoom', 'calendar', 'reuniones', 'automatización'],
    codePreview: '// Nodos: 12\n// Automatización reuniones\n{\n  "schedule": "create_calendar_event",\n  "zoom": "generate_meeting_link",\n  "notify": "send_reminders"\n}',
    fullImplementation: 'Workflow completo disponible después del pago',
    requirements: ['Zoom API', 'Google Calendar API', 'Email service'],
    isPremium: false
  },
  {
    id: 'wf-012',
    name: 'Sistema de Gestión de Tareas con Slack',
    description: 'Integra gestión de tareas con Slack para crear, asignar y hacer seguimiento de tareas del equipo.',
    category: 'Operaciones',
    industry: ['Tecnología', 'Agencias', 'Startups', 'Servicios'],
    businessSize: 'pequeña',
    complexity: 'intermedio',
    estimatedROI: 200,
    implementationTime: '2-3 semanas',
    price: 1100,
    features: ['Creación de tareas', 'Asignación automática', 'Recordatorios', 'Reportes de productividad'],
    tags: ['slack', 'tareas', 'productividad', 'equipo'],
    codePreview: '// Nodos: 16\n// Gestión de tareas\n{\n  "create": "slack_command_task",\n  "assign": "auto_assign_team_member",\n  "track": "monitor_task_progress"\n}',
    fullImplementation: 'Workflow completo disponible después del pago',
    requirements: ['Slack Workspace', 'Task management system', 'Team database'],
    isPremium: true
  },
  {
    id: 'wf-013',
    name: 'Automatización de Informes y Documentación',
    description: 'Genera automáticamente informes y documentación desde múltiples fuentes de datos.',
    category: 'Operaciones',
    industry: ['Consultoría', 'Agencias', 'Servicios', 'Finanzas'],
    businessSize: 'mediana',
    complexity: 'avanzado',
    estimatedROI: 300,
    implementationTime: '4-5 semanas',
    price: 1950,
    features: ['Generación automática', 'Múltiples formatos', 'Plantillas dinámicas', 'Distribución automática'],
    tags: ['informes', 'documentación', 'automatización', 'reportes'],
    codePreview: '// Nodos: 24\n// Generación de informes\n{\n  "collect": "gather_data_sources",\n  "generate": "create_dynamic_report",\n  "distribute": "send_to_stakeholders"\n}',
    fullImplementation: 'Workflow completo disponible después del pago',
    requirements: ['Data sources', 'Template engine', 'Document generation tools'],
    isPremium: true
  },

  // === GESTIÓN DE CONTENIDO Y REDES SOCIALES ===
  {
    id: 'wf-014',
    name: 'Publicación Automática Multi-Redes Sociales',
    description: 'Automatiza la publicación de contenido en múltiples redes sociales con programación inteligente.',
    category: 'Marketing',
    industry: ['Marketing', 'Agencias', 'E-commerce', 'Marcas'],
    businessSize: 'pequeña',
    complexity: 'intermedio',
    estimatedROI: 220,
    implementationTime: '2-3 semanas',
    price: 1250,
    features: ['Multi-plataforma', 'Programación inteligente', 'Optimización de horarios', 'Analytics integrado'],
    tags: ['social-media', 'publicación', 'marketing', 'automatización'],
    codePreview: '// Nodos: 18\n// Publicación multi-redes\n{\n  "content": "prepare_content_format",\n  "schedule": "optimal_posting_time",\n  "publish": "post_all_platforms"\n}',
    fullImplementation: 'Workflow completo disponible después del pago',
    requirements: ['Social Media APIs', 'Content management', 'Analytics tools'],
    isPremium: true
  },
  {
    id: 'wf-015',
    name: 'Curación de Contenido con IA',
    description: 'Sistema de IA que curea automáticamente contenido relevante para tu audiencia desde múltiples fuentes.',
    category: 'Marketing',
    industry: ['Marketing', 'Medios', 'Educación', 'B2B'],
    businessSize: 'mediana',
    complexity: 'avanzado',
    estimatedROI: 280,
    implementationTime: '3-4 semanas',
    price: 1750,
    features: ['IA para curación', 'Filtros inteligentes', 'Categorización automática', 'Sugerencias de contenido'],
    tags: ['ia', 'curación', 'contenido', 'automatización'],
    codePreview: '// Nodos: 26\n// Curación con IA\n{\n  "sources": "monitor_content_sources",\n  "ai": "analyze_content_relevance",\n  "curate": "select_best_content"\n}',
    fullImplementation: 'Workflow completo disponible después del pago',
    requirements: ['AI/ML APIs', 'Content sources', 'Classification system'],
    isPremium: true
  },
  {
    id: 'wf-016',
    name: 'Gestión de Comentarios y Engagement',
    description: 'Automatiza la gestión de comentarios y engagement en redes sociales con respuestas inteligentes.',
    category: 'Marketing',
    industry: ['E-commerce', 'Marcas', 'Servicios', 'B2C'],
    businessSize: 'pequeña',
    complexity: 'intermedio',
    estimatedROI: 190,
    implementationTime: '2-3 semanas',
    price: 980,
    features: ['Monitoreo de comentarios', 'Respuestas automáticas', 'Escalación inteligente', 'Métricas de engagement'],
    tags: ['engagement', 'comentarios', 'social-media', 'atención'],
    codePreview: '// Nodos: 15\n// Gestión de engagement\n{\n  "monitor": "track_comments_mentions",\n  "analyze": "sentiment_priority_analysis",\n  "respond": "auto_reply_or_escalate"\n}',
    fullImplementation: 'Workflow completo disponible después del pago',
    requirements: ['Social Media APIs', 'NLP tools', 'Customer service system'],
    isPremium: true
  },

  // === INTELIGENCIA ARTIFICIAL Y NLP ===
  {
    id: 'wf-017',
    name: 'Chatbot Inteligente con OpenAI',
    description: 'Chatbot avanzado integrado con OpenAI para atención al cliente 24/7 con escalación humana.',
    category: 'Soporte',
    industry: ['E-commerce', 'SaaS', 'Servicios', 'Tecnología'],
    businessSize: 'mediana',
    complexity: 'avanzado',
    estimatedROI: 400,
    implementationTime: '4-6 semanas',
    price: 2500,
    features: ['IA conversacional', 'Escalación inteligente', 'Aprendizaje continuo', 'Multi-idioma'],
    tags: ['chatbot', 'openai', 'ai', 'atención-cliente'],
    codePreview: '// Nodos: 32\n// Chatbot inteligente\n{\n  "input": "receive_user_message",\n  "ai": "openai_response_generation",\n  "decision": "escalate_or_respond"\n}',
    fullImplementation: 'Workflow completo disponible después del pago',
    requirements: ['OpenAI API', 'Chat platform', 'Knowledge base', 'CRM integration'],
    isPremium: true
  },
  {
    id: 'wf-018',
    name: 'Análisis de Sentimientos en Tiempo Real',
    description: 'Analiza automáticamente el sentimiento de comentarios, reviews y menciones usando IA.',
    category: 'Marketing',
    industry: ['E-commerce', 'Servicios', 'Marcas', 'Hospitality'],
    businessSize: 'mediana',
    complexity: 'intermedio',
    estimatedROI: 240,
    implementationTime: '2-4 semanas',
    price: 1400,
    features: ['Análisis en tiempo real', 'Dashboard de sentimientos', 'Alertas automáticas', 'Reportes detallados'],
    tags: ['sentiment', 'ai', 'analytics', 'monitoring'],
    codePreview: '// Nodos: 20\n// Análisis de sentimientos\n{\n  "collect": "gather_mentions_reviews",\n  "analyze": "ai_sentiment_analysis",\n  "alert": "notify_negative_sentiment"\n}',
    fullImplementation: 'Workflow completo disponible después del pago',
    requirements: ['NLP APIs', 'Data sources', 'Dashboard platform'],
    isPremium: true
  },
  {
    id: 'wf-019',
    name: 'Generación Automática de Contenido SEO',
    description: 'Genera automáticamente contenido optimizado para SEO usando IA basado en keywords y competencia.',
    category: 'Marketing',
    industry: ['Marketing', 'E-commerce', 'Blogs', 'Agencias'],
    businessSize: 'pequeña',
    complexity: 'avanzado',
    estimatedROI: 350,
    implementationTime: '3-5 semanas',
    price: 1950,
    features: ['Generación con IA', 'Optimización SEO', 'Análisis de competencia', 'Publicación automática'],
    tags: ['seo', 'contenido', 'ai', 'marketing'],
    codePreview: '// Nodos: 28\n// Generación SEO\n{\n  "research": "keyword_competitor_analysis",\n  "generate": "ai_content_creation",\n  "optimize": "seo_enhancement"\n}',
    fullImplementation: 'Workflow completo disponible después del pago',
    requirements: ['AI/GPT APIs', 'SEO tools', 'CMS integration'],
    isPremium: true
  },

  // === WEB SCRAPING Y EXTRACCIÓN DE DATOS ===
  {
    id: 'wf-020',
    name: 'Monitor de Precios de Competencia',
    description: 'Monitorea automáticamente los precios de la competencia y ajusta estrategias de pricing.',
    category: 'E-commerce',
    industry: ['E-commerce', 'Retail', 'Marketplace'],
    businessSize: 'mediana',
    complexity: 'intermedio',
    estimatedROI: 280,
    implementationTime: '3-4 semanas',
    price: 1600,
    features: ['Scraping automático', 'Alertas de precio', 'Análisis competitivo', 'Recomendaciones de pricing'],
    tags: ['scraping', 'precios', 'competencia', 'e-commerce'],
    codePreview: '// Nodos: 22\n// Monitor de precios\n{\n  "scrape": "extract_competitor_prices",\n  "analyze": "price_trend_analysis",\n  "alert": "pricing_recommendation"\n}',
    fullImplementation: 'Workflow completo disponible después del pago',
    requirements: ['Web scraping tools', 'Proxy services', 'Database', 'Analytics platform'],
    isPremium: true
  },
  {
    id: 'wf-021',
    name: 'Extracción de Leads desde LinkedIn',
    description: 'Extrae automáticamente información de leads potenciales desde LinkedIn con filtros avanzados.',
    category: 'Ventas',
    industry: ['B2B', 'Servicios', 'Consultoría', 'Ventas'],
    businessSize: 'pequeña',
    complexity: 'avanzado',
    estimatedROI: 320,
    implementationTime: '4-5 semanas',
    price: 2100,
    features: ['Scraping inteligente', 'Filtros avanzados', 'Validación de datos', 'CRM integration'],
    tags: ['linkedin', 'leads', 'scraping', 'ventas'],
    codePreview: '// Nodos: 30\n// Extracción LinkedIn\n{\n  "search": "linkedin_advanced_search",\n  "extract": "profile_data_extraction",\n  "validate": "contact_verification"\n}',
    fullImplementation: 'Workflow completo disponible después del pago',
    requirements: ['LinkedIn access', 'Scraping infrastructure', 'Data validation', 'CRM system'],
    isPremium: true
  },
  {
    id: 'wf-022',
    name: 'Agregador de Noticias de Industria',
    description: 'Agrega automáticamente noticias relevantes de tu industria desde múltiples fuentes.',
    category: 'Marketing',
    industry: ['Medios', 'Consultoría', 'Finanzas', 'Tecnología'],
    businessSize: 'pequeña',
    complexity: 'básico',
    estimatedROI: 150,
    implementationTime: '1-2 semanas',
    price: 650,
    features: ['Múltiples fuentes', 'Filtros por relevancia', 'Categorización automática', 'Newsletter automático'],
    tags: ['noticias', 'scraping', 'industria', 'contenido'],
    codePreview: '// Nodos: 14\n// Agregador de noticias\n{\n  "sources": "scrape_news_sources",\n  "filter": "relevance_filtering",\n  "distribute": "create_newsletter"\n}',
    fullImplementation: 'Workflow completo disponible después del pago',
    requirements: ['News APIs', 'Content filtering', 'Email service'],
    isPremium: false
  },

  // === AGENTES AUTÓNOMOS Y LÓGICA DINÁMICA ===
  {
    id: 'wf-023',
    name: 'Agente Autónomo de Trading',
    description: 'Agente de IA que ejecuta operaciones de trading automáticamente basado en análisis técnico y fundamental.',
    category: 'Finanzas',
    industry: ['Fintech', 'Trading', 'Inversiones'],
    businessSize: 'mediana',
    complexity: 'avanzado',
    estimatedROI: 400,
    implementationTime: '6-8 semanas',
    price: 3500,
    features: ['Trading automático', 'Análisis técnico', 'Gestión de riesgo', 'Reportes de performance'],
    tags: ['trading', 'ai', 'finanzas', 'autonomo'],
    codePreview: '// Nodos: 45\n// Agente de trading\n{\n  "analysis": "technical_fundamental_analysis",\n  "decision": "ai_trading_decision",\n  "execute": "automated_trade_execution"\n}',
    fullImplementation: 'Workflow completo disponible después del pago',
    requirements: ['Trading APIs', 'Market data', 'Risk management', 'Compliance tools'],
    isPremium: true
  },
  {
    id: 'wf-024',
    name: 'Sistema de Decisiones Inteligentes',
    description: 'Agente que toma decisiones comerciales automáticamente basado en datos y reglas de negocio.',
    category: 'Operaciones',
    industry: ['SaaS', 'E-commerce', 'Servicios', 'Tecnología'],
    businessSize: 'mediana',
    complexity: 'avanzado',
    estimatedROI: 350,
    implementationTime: '5-7 semanas',
    price: 2800,
    features: ['Decisiones automáticas', 'Reglas de negocio', 'Machine learning', 'Audit trail'],
    tags: ['decisiones', 'ai', 'automatización', 'business-logic'],
    codePreview: '// Nodos: 38\n// Sistema de decisiones\n{\n  "data": "collect_business_metrics",\n  "analyze": "ml_decision_engine",\n  "execute": "automated_action_execution"\n}',
    fullImplementation: 'Workflow completo disponible después del pago',
    requirements: ['ML platform', 'Business data', 'Decision engine', 'Action APIs'],
    isPremium: true
  },
  {
    id: 'wf-025',
    name: 'Agente de Atención al Cliente 24/7',
    description: 'Agente autónomo que maneja consultas de clientes 24/7 con escalación inteligente a humanos.',
    category: 'Soporte',
    industry: ['E-commerce', 'SaaS', 'Servicios', 'Tecnología'],
    businessSize: 'mediana',
    complexity: 'avanzado',
    estimatedROI: 380,
    implementationTime: '4-6 semanas',
    price: 2200,
    features: ['Atención 24/7', 'Escalación inteligente', 'Multi-canal', 'Base de conocimiento'],
    tags: ['soporte', 'ai', '24/7', 'automatización'],
    codePreview: '// Nodos: 34\n// Agente de soporte\n{\n  "receive": "multi_channel_input",\n  "process": "ai_response_generation",\n  "escalate": "human_handoff_logic"\n}',
    fullImplementation: 'Workflow completo disponible después del pago',
    requirements: ['AI platform', 'Knowledge base', 'Multi-channel APIs', 'CRM integration'],
    isPremium: true
  },

  // === OTROS / MISCELÁNEOS ===
  {
    id: 'wf-026',
    name: 'Sistema de Gestión de Inventario IoT',
    description: 'Gestiona automáticamente el inventario usando sensores IoT y reorder automático.',
    category: 'Operaciones',
    industry: ['Retail', 'Manufactura', 'E-commerce', 'Logística'],
    businessSize: 'mediana',
    complexity: 'avanzado',
    estimatedROI: 300,
    implementationTime: '6-8 semanas',
    price: 2900,
    features: ['Sensores IoT', 'Reorder automático', 'Predicción de demanda', 'Optimización de stock'],
    tags: ['iot', 'inventario', 'automatización', 'predicción'],
    codePreview: '// Nodos: 42\n// Gestión IoT inventario\n{\n  "sensors": "iot_sensor_data",\n  "analyze": "inventory_level_analysis",\n  "action": "automated_reorder"\n}',
    fullImplementation: 'Workflow completo disponible después del pago',
    requirements: ['IoT sensors', 'Inventory system', 'Supplier APIs', 'Analytics platform'],
    isPremium: true
  },
  {
    id: 'wf-027',
    name: 'Automatización de Procesos de RRHH',
    description: 'Automatiza procesos de recursos humanos desde reclutamiento hasta onboarding.',
    category: 'RRHH',
    industry: ['Servicios', 'Tecnología', 'Consultoría', 'Corporativo'],
    businessSize: 'mediana',
    complexity: 'avanzado',
    estimatedROI: 280,
    implementationTime: '5-7 semanas',
    price: 2400,
    features: ['Reclutamiento automático', 'Screening de CVs', 'Onboarding digital', 'Evaluaciones automáticas'],
    tags: ['rrhh', 'reclutamiento', 'onboarding', 'automatización'],
    codePreview: '// Nodos: 36\n// Automatización RRHH\n{\n  "recruit": "automated_job_posting",\n  "screen": "cv_screening_ai",\n  "onboard": "digital_onboarding_flow"\n}',
    fullImplementation: 'Workflow completo disponible después del pago',
    requirements: ['HR systems', 'ATS platform', 'Document management', 'Communication tools'],
    isPremium: true
  },
  {
    id: 'wf-028',
    name: 'Sistema de Compliance Automatizado',
    description: 'Monitorea y asegura el cumplimiento de regulaciones automáticamente con reportes.',
    category: 'Operaciones',
    industry: ['Finanzas', 'Salud', 'Tecnología', 'Servicios'],
    businessSize: 'enterprise',
    complexity: 'avanzado',
    estimatedROI: 250,
    implementationTime: '8-10 semanas',
    price: 3800,
    features: ['Monitoreo continuo', 'Reportes automáticos', 'Alertas de incumplimiento', 'Audit trail'],
    tags: ['compliance', 'regulaciones', 'monitoreo', 'reportes'],
    codePreview: '// Nodos: 48\n// Sistema compliance\n{\n  "monitor": "continuous_compliance_check",\n  "analyze": "regulation_compliance_analysis",\n  "report": "automated_compliance_reporting"\n}',
    fullImplementation: 'Workflow completo disponible después del pago',
    requirements: ['Compliance databases', 'Monitoring tools', 'Reporting platform', 'Legal APIs'],
    isPremium: true
  },
  {
    id: 'wf-029',
    name: 'Plataforma de Analytics Unificada',
    description: 'Centraliza datos de múltiples fuentes en un dashboard unificado con insights automáticos.',
    category: 'Operaciones',
    industry: ['SaaS', 'E-commerce', 'Marketing', 'Tecnología'],
    businessSize: 'mediana',
    complexity: 'avanzado',
    estimatedROI: 320,
    implementationTime: '6-8 semanas',
    price: 2650,
    features: ['Múltiples fuentes', 'Dashboard unificado', 'Insights automáticos', 'Reportes personalizados'],
    tags: ['analytics', 'dashboard', 'insights', 'unificación'],
    codePreview: '// Nodos: 40\n// Analytics unificada\n{\n  "collect": "multi_source_data_collection",\n  "process": "unified_data_processing",\n  "visualize": "dynamic_dashboard_generation"\n}',
    fullImplementation: 'Workflow completo disponible después del pago',
    requirements: ['Multiple APIs', 'Data warehouse', 'Visualization tools', 'Analytics platform'],
    isPremium: true
  },
  {
    id: 'wf-030',
    name: 'Sistema de Gestión de Calidad Automatizado',
    description: 'Automatiza procesos de control de calidad con inspecciones y reportes automáticos.',
    category: 'Operaciones',
    industry: ['Manufactura', 'Servicios', 'E-commerce', 'Logística'],
    businessSize: 'mediana',
    complexity: 'intermedio',
    estimatedROI: 220,
    implementationTime: '4-6 semanas',
    price: 1800,
    features: ['Inspecciones automáticas', 'Control de calidad', 'Reportes de calidad', 'Alertas de problemas'],
    tags: ['calidad', 'inspecciones', 'control', 'automatización'],
    codePreview: '// Nodos: 24\n// Gestión de calidad\n{\n  "inspect": "automated_quality_inspection",\n  "analyze": "quality_metrics_analysis",\n  "report": "quality_report_generation"\n}',
    fullImplementation: 'Workflow completo disponible después del pago',
    requirements: ['Quality systems', 'Inspection tools', 'Reporting platform', 'Alert system'],
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