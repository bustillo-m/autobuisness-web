#!/usr/bin/env node

/**
 * Script para migrar plantillas n8n existentes al formato del sistema de recomendaciones
 * 
 * Uso:
 * node scripts/migrate-templates.js [archivo-entrada] [archivo-salida]
 * 
 * Ejemplo:
 * node scripts/migrate-templates.js mis-plantillas.json public/templates.json
 */

const fs = require('fs');
const path = require('path');

// Mapeo de categorías comunes
const CATEGORY_MAPPING = {
  'email': 'email',
  'marketing': 'marketing',
  'sales': 'sales',
  'crm': 'customer-service',
  'ecommerce': 'ecommerce',
  'e-commerce': 'ecommerce',
  'social': 'social-media',
  'social-media': 'social-media',
  'finance': 'finance',
  'accounting': 'finance',
  'hr': 'hr',
  'human-resources': 'hr',
  'project': 'project-management',
  'automation': 'automation',
  'integration': 'integration',
  'data': 'data-processing',
  'analytics': 'analytics',
  'monitoring': 'monitoring',
  'security': 'security',
  'backup': 'backup',
  'communication': 'communication',
  'ai': 'ai-ml',
  'ml': 'ai-ml',
  'scraping': 'web-scraping',
  'documents': 'document-processing'
};

// Servicios comunes y sus nombres normalizados
const SERVICE_MAPPING = {
  'gmail': 'Gmail',
  'google-sheets': 'Google Sheets',
  'google-drive': 'Google Drive',
  'slack': 'Slack',
  'discord': 'Discord',
  'telegram': 'Telegram',
  'whatsapp': 'WhatsApp',
  'mailchimp': 'MailChimp',
  'hubspot': 'HubSpot',
  'salesforce': 'Salesforce',
  'stripe': 'Stripe',
  'paypal': 'PayPal',
  'shopify': 'Shopify',
  'woocommerce': 'WooCommerce',
  'airtable': 'Airtable',
  'notion': 'Notion',
  'trello': 'Trello',
  'asana': 'Asana',
  'jira': 'Jira'
};

function generateId(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .substring(0, 50);
}

function detectCategory(template) {
  const text = `${template.name || ''} ${template.description || ''} ${(template.tags || []).join(' ')}`.toLowerCase();
  
  for (const [keyword, category] of Object.entries(CATEGORY_MAPPING)) {
    if (text.includes(keyword)) {
      return category;
    }
  }
  
  return 'automation'; // Categoría por defecto
}

function detectDifficulty(template) {
  const nodeCount = template.workflow?.nodes?.length || 0;
  const hasWebhooks = template.workflow?.nodes?.some(node => node.type?.includes('webhook')) || false;
  const hasComplexNodes = template.workflow?.nodes?.some(node => 
    node.type?.includes('code') || 
    node.type?.includes('function') || 
    node.type?.includes('http')
  ) || false;

  if (nodeCount <= 3 && !hasWebhooks && !hasComplexNodes) {
    return 'beginner';
  } else if (nodeCount <= 8 && !hasComplexNodes) {
    return 'intermediate';
  } else {
    return 'advanced';
  }
}

function estimateSetupTime(template) {
  const nodeCount = template.workflow?.nodes?.length || 0;
  const hasAuthentication = template.workflow?.nodes?.some(node => node.credentials) || false;
  const hasWebhooks = template.workflow?.nodes?.some(node => node.type?.includes('webhook')) || false;
  
  let baseTime = nodeCount * 5; // 5 minutos por nodo base
  
  if (hasAuthentication) baseTime += 15;
  if (hasWebhooks) baseTime += 20;
  
  return Math.max(15, Math.min(180, baseTime)); // Entre 15 y 180 minutos
}

function extractServices(template) {
  const services = new Set();
  
  if (template.workflow?.nodes) {
    template.workflow.nodes.forEach(node => {
      if (node.type) {
        const nodeType = node.type.toLowerCase();
        
        // Buscar en el mapeo de servicios
        for (const [key, service] of Object.entries(SERVICE_MAPPING)) {
          if (nodeType.includes(key)) {
            services.add(service);
          }
        }
        
        // Servicios basados en el tipo de nodo
        if (nodeType.includes('gmail')) services.add('Gmail');
        if (nodeType.includes('sheets')) services.add('Google Sheets');
        if (nodeType.includes('slack')) services.add('Slack');
        if (nodeType.includes('webhook')) services.add('Webhook');
        if (nodeType.includes('http')) services.add('HTTP API');
      }
    });
  }
  
  return Array.from(services);
}

function generateTags(template) {
  const tags = new Set(template.tags || []);
  
  // Agregar tags basados en el nombre y descripción
  const text = `${template.name || ''} ${template.description || ''}`.toLowerCase();
  
  const commonTags = [
    'automation', 'integration', 'workflow', 'api', 'webhook',
    'email', 'notification', 'data', 'sync', 'monitoring',
    'analytics', 'reporting', 'crm', 'marketing', 'sales'
  ];
  
  commonTags.forEach(tag => {
    if (text.includes(tag)) {
      tags.add(tag);
    }
  });
  
  return Array.from(tags).slice(0, 8); // Máximo 8 tags
}

function migrateTemplate(template, index) {
  const id = template.id || generateId(template.name || `template-${index}`);
  const category = template.category || detectCategory(template);
  const difficulty = template.difficulty || detectDifficulty(template);
  const estimatedSetupTime = template.estimatedSetupTime || estimateSetupTime(template);
  const requiredServices = template.requiredServices || extractServices(template);
  const tags = generateTags(template);
  
  return {
    id,
    name: template.name || `Plantilla ${index + 1}`,
    description: template.description || 'Descripción no disponible',
    longDescription: template.longDescription || template.description || 'Descripción detallada no disponible',
    category,
    subcategory: template.subcategory || 'General',
    tags,
    difficulty,
    estimatedSetupTime,
    workflow: template.workflow || {
      name: template.name || `Workflow ${index + 1}`,
      nodes: [],
      connections: {},
      active: true,
      settings: {}
    },
    requiredServices,
    useCase: template.useCase || `Automatización usando ${template.name || 'este workflow'}`,
    businessValue: template.businessValue || 'Mejora la eficiencia y reduce el trabajo manual',
    targetAudience: template.targetAudience || ['general'],
    prerequisites: template.prerequisites || ['Acceso a los servicios requeridos'],
    createdAt: template.createdAt || new Date().toISOString().split('T')[0],
    updatedAt: template.updatedAt || new Date().toISOString().split('T')[0],
    author: template.author || 'Sistema',
    version: template.version || '1.0.0',
    rating: template.rating || 4.0,
    downloads: template.downloads || 0,
    featured: template.featured || false
  };
}

function migrateTemplates(inputFile, outputFile) {
  try {
    console.log(`🔄 Migrando plantillas de ${inputFile} a ${outputFile}...`);
    
    // Leer archivo de entrada
    const inputData = fs.readFileSync(inputFile, 'utf8');
    let templates;
    
    try {
      templates = JSON.parse(inputData);
    } catch (error) {
      console.error('❌ Error al parsear JSON:', error.message);
      process.exit(1);
    }
    
    // Asegurar que es un array
    if (!Array.isArray(templates)) {
      console.error('❌ El archivo debe contener un array de plantillas');
      process.exit(1);
    }
    
    console.log(`📊 Encontradas ${templates.length} plantillas para migrar`);
    
    // Migrar cada plantilla
    const migratedTemplates = templates.map((template, index) => {
      try {
        return migrateTemplate(template, index);
      } catch (error) {
        console.warn(`⚠️  Error migrando plantilla ${index + 1}:`, error.message);
        return null;
      }
    }).filter(Boolean);
    
    // Crear directorio de salida si no existe
    const outputDir = path.dirname(outputFile);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // Escribir archivo de salida
    fs.writeFileSync(outputFile, JSON.stringify(migratedTemplates, null, 2));
    
    console.log(`✅ Migración completada exitosamente!`);
    console.log(`📁 Archivo generado: ${outputFile}`);
    console.log(`📈 Plantillas migradas: ${migratedTemplates.length}/${templates.length}`);
    
    // Estadísticas de la migración
    const stats = {
      categories: {},
      difficulties: {},
      avgSetupTime: 0
    };
    
    migratedTemplates.forEach(template => {
      stats.categories[template.category] = (stats.categories[template.category] || 0) + 1;
      stats.difficulties[template.difficulty] = (stats.difficulties[template.difficulty] || 0) + 1;
      stats.avgSetupTime += template.estimatedSetupTime;
    });
    
    stats.avgSetupTime = Math.round(stats.avgSetupTime / migratedTemplates.length);
    
    console.log('\n📊 Estadísticas de migración:');
    console.log('📂 Categorías:', Object.entries(stats.categories).map(([k, v]) => `${k}: ${v}`).join(', '));
    console.log('⚡ Dificultades:', Object.entries(stats.difficulties).map(([k, v]) => `${k}: ${v}`).join(', '));
    console.log('⏱️  Tiempo promedio de setup:', stats.avgSetupTime, 'minutos');
    
  } catch (error) {
    console.error('❌ Error durante la migración:', error.message);
    process.exit(1);
  }
}

// Validar argumentos de línea de comandos
const args = process.argv.slice(2);

if (args.length < 2) {
  console.log(`
🔧 Script de Migración de Plantillas n8n

Uso:
  node scripts/migrate-templates.js <archivo-entrada> <archivo-salida>

Ejemplos:
  node scripts/migrate-templates.js mis-plantillas.json public/templates.json
  node scripts/migrate-templates.js workflows.json src/data/templates.json

El script convertirá automáticamente tus plantillas al formato requerido por el sistema de recomendaciones.
  `);
  process.exit(1);
}

const [inputFile, outputFile] = args;

// Verificar que el archivo de entrada existe
if (!fs.existsSync(inputFile)) {
  console.error(`❌ El archivo ${inputFile} no existe`);
  process.exit(1);
}

// Ejecutar migración
migrateTemplates(inputFile, outputFile);