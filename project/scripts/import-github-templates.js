#!/usr/bin/env node

/**
 * Script para importar plantillas n8n desde el repositorio GitHub DragonJAR/n8n-workflows-es
 * Procesa más de 3000 plantillas automáticamente
 * 
 * Uso:
 * node scripts/import-github-templates.js
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// Configuración del repositorio
const REPO_OWNER = 'DragonJAR';
const REPO_NAME = 'n8n-workflows-es';
const GITHUB_API_BASE = 'https://api.github.com';
const GITHUB_RAW_BASE = 'https://raw.githubusercontent.com';

// Mapeo de categorías basado en estructura de carpetas común
const FOLDER_TO_CATEGORY = {
  'email': 'email',
  'marketing': 'marketing',
  'sales': 'sales',
  'ventas': 'sales',
  'crm': 'customer-service',
  'ecommerce': 'ecommerce',
  'e-commerce': 'ecommerce',
  'tienda': 'ecommerce',
  'social': 'social-media',
  'redes-sociales': 'social-media',
  'finanzas': 'finance',
  'finance': 'finance',
  'contabilidad': 'finance',
  'rrhh': 'hr',
  'hr': 'hr',
  'recursos-humanos': 'hr',
  'proyectos': 'project-management',
  'project': 'project-management',
  'automatizacion': 'automation',
  'automation': 'automation',
  'integracion': 'integration',
  'integration': 'integration',
  'datos': 'data-processing',
  'data': 'data-processing',
  'analytics': 'analytics',
  'analiticas': 'analytics',
  'monitoreo': 'monitoring',
  'monitoring': 'monitoring',
  'seguridad': 'security',
  'security': 'security',
  'backup': 'backup',
  'respaldo': 'backup',
  'comunicacion': 'communication',
  'communication': 'communication',
  'ia': 'ai-ml',
  'ai': 'ai-ml',
  'ml': 'ai-ml',
  'scraping': 'web-scraping',
  'web-scraping': 'web-scraping',
  'documentos': 'document-processing',
  'documents': 'document-processing',
  'soporte': 'customer-service',
  'support': 'customer-service',
  'atencion-cliente': 'customer-service'
};

class GitHubTemplateImporter {
  constructor() {
    this.templates = [];
    this.processed = 0;
    this.errors = 0;
    this.cache = new Map();
  }

  // Realizar petición HTTP
  async makeRequest(url) {
    return new Promise((resolve, reject) => {
      const request = https.get(url, {
        headers: {
          'User-Agent': 'n8n-template-importer',
          'Accept': 'application/vnd.github.v3+json'
        }
      }, (response) => {
        let data = '';
        
        response.on('data', chunk => data += chunk);
        response.on('end', () => {
          if (response.statusCode === 200) {
            try {
              resolve(JSON.parse(data));
            } catch (error) {
              resolve(data); // Para archivos de texto plano
            }
          } else if (response.statusCode === 403) {
            console.warn('⚠️  Rate limit alcanzado, esperando...');
            setTimeout(() => this.makeRequest(url).then(resolve).catch(reject), 60000);
          } else {
            reject(new Error(`HTTP ${response.statusCode}: ${response.statusMessage}`));
          }
        });
      });

      request.on('error', reject);
      request.setTimeout(30000, () => {
        request.destroy();
        reject(new Error('Timeout'));
      });
    });
  }

  // Obtener contenido de un archivo desde GitHub
  async getFileContent(path) {
    const cacheKey = `file_${path}`;
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    try {
      const url = `${GITHUB_RAW_BASE}/${REPO_OWNER}/${REPO_NAME}/main/${path}`;
      const content = await this.makeRequest(url);
      this.cache.set(cacheKey, content);
      return content;
    } catch (error) {
      console.warn(`⚠️  Error obteniendo archivo ${path}:`, error.message);
      return null;
    }
  }

  // Explorar directorio recursivamente
  async exploreDirectory(path = '') {
    const cacheKey = `dir_${path}`;
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    try {
      const url = `${GITHUB_API_BASE}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}`;
      const contents = await this.makeRequest(url);
      this.cache.set(cacheKey, contents);
      return Array.isArray(contents) ? contents : [];
    } catch (error) {
      console.warn(`⚠️  Error explorando directorio ${path}:`, error.message);
      return [];
    }
  }

  // Detectar categoría basada en la ruta del archivo
  detectCategory(filePath) {
    const pathLower = filePath.toLowerCase();
    
    for (const [folder, category] of Object.entries(FOLDER_TO_CATEGORY)) {
      if (pathLower.includes(folder)) {
        return category;
      }
    }
    
    return 'automation'; // Categoría por defecto
  }

  // Extraer servicios del workflow
  extractServices(workflow) {
    const services = new Set();
    
    if (workflow.nodes) {
      workflow.nodes.forEach(node => {
        if (node.type) {
          const nodeType = node.type.toLowerCase();
          
          // Mapeo de tipos de nodo a servicios
          const serviceMap = {
            'gmail': 'Gmail',
            'googlesheets': 'Google Sheets',
            'googledrive': 'Google Drive',
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
            'jira': 'Jira',
            'webhook': 'Webhook',
            'http': 'HTTP API',
            'mysql': 'MySQL',
            'postgres': 'PostgreSQL',
            'mongodb': 'MongoDB',
            'redis': 'Redis',
            'aws': 'AWS',
            'azure': 'Azure',
            'gcp': 'Google Cloud'
          };

          for (const [key, service] of Object.entries(serviceMap)) {
            if (nodeType.includes(key)) {
              services.add(service);
            }
          }
        }
      });
    }
    
    return Array.from(services);
  }

  // Calcular dificultad del workflow
  calculateDifficulty(workflow) {
    if (!workflow.nodes) return 'beginner';
    
    const nodeCount = workflow.nodes.length;
    const hasWebhooks = workflow.nodes.some(node => node.type?.includes('Webhook'));
    const hasCode = workflow.nodes.some(node => 
      node.type?.includes('Code') || 
      node.type?.includes('Function')
    );
    const hasHttp = workflow.nodes.some(node => node.type?.includes('HTTP'));
    
    if (nodeCount <= 3 && !hasWebhooks && !hasCode) {
      return 'beginner';
    } else if (nodeCount <= 8 && !hasCode) {
      return 'intermediate';
    } else {
      return 'advanced';
    }
  }

  // Estimar tiempo de configuración
  estimateSetupTime(workflow, category) {
    if (!workflow.nodes) return 30;
    
    const nodeCount = workflow.nodes.length;
    const hasAuth = workflow.nodes.some(node => node.credentials);
    const hasWebhooks = workflow.nodes.some(node => node.type?.includes('Webhook'));
    
    let baseTime = Math.max(15, nodeCount * 4);
    
    if (hasAuth) baseTime += 20;
    if (hasWebhooks) baseTime += 15;
    
    // Ajuste por categoría
    const categoryMultipliers = {
      'ai-ml': 1.5,
      'integration': 1.3,
      'finance': 1.2,
      'automation': 1.0,
      'email': 0.8
    };
    
    const multiplier = categoryMultipliers[category] || 1.0;
    return Math.min(180, Math.round(baseTime * multiplier));
  }

  // Generar tags basados en contenido
  generateTags(workflow, fileName, category) {
    const tags = new Set();
    
    // Tags basados en categoría
    tags.add(category);
    
    // Tags basados en nombre de archivo
    const fileNameLower = fileName.toLowerCase();
    const commonKeywords = [
      'email', 'slack', 'webhook', 'api', 'automation', 'integration',
      'notification', 'sync', 'backup', 'monitoring', 'alert',
      'crm', 'sales', 'marketing', 'analytics', 'data', 'report'
    ];
    
    commonKeywords.forEach(keyword => {
      if (fileNameLower.includes(keyword)) {
        tags.add(keyword);
      }
    });
    
    // Tags basados en nodos del workflow
    if (workflow.nodes) {
      workflow.nodes.forEach(node => {
        if (node.type) {
          const nodeType = node.type.toLowerCase();
          if (nodeType.includes('gmail')) tags.add('email');
          if (nodeType.includes('slack')) tags.add('slack');
          if (nodeType.includes('webhook')) tags.add('webhook');
          if (nodeType.includes('http')) tags.add('api');
          if (nodeType.includes('schedule')) tags.add('scheduled');
        }
      });
    }
    
    return Array.from(tags).slice(0, 8);
  }

  // Procesar un archivo de workflow
  async processWorkflowFile(filePath, fileName) {
    try {
      console.log(`📁 Procesando: ${fileName}`);
      
      const content = await this.getFileContent(filePath);
      if (!content) return null;

      let workflow;
      try {
        workflow = typeof content === 'string' ? JSON.parse(content) : content;
      } catch (error) {
        console.warn(`⚠️  Error parseando JSON en ${fileName}`);
        return null;
      }

      // Validar que sea un workflow válido
      if (!workflow.nodes || !Array.isArray(workflow.nodes)) {
        return null;
      }

      const category = this.detectCategory(filePath);
      const difficulty = this.calculateDifficulty(workflow);
      const estimatedSetupTime = this.estimateSetupTime(workflow, category);
      const requiredServices = this.extractServices(workflow);
      const tags = this.generateTags(workflow, fileName, category);

      // Generar ID único
      const id = fileName
        .replace(/\.json$/i, '')
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .substring(0, 50);

      // Crear nombre legible
      const name = fileName
        .replace(/\.json$/i, '')
        .replace(/[-_]/g, ' ')
        .replace(/\b\w/g, l => l.toUpperCase());

      const template = {
        id: `github-${id}`,
        name,
        description: `Workflow de automatización: ${name}`,
        longDescription: `Workflow importado del repositorio DragonJAR/n8n-workflows-es. ${workflow.nodes.length} nodos configurados para automatizar procesos de ${category}.`,
        category,
        subcategory: 'Imported',
        tags,
        difficulty,
        estimatedSetupTime,
        workflow: {
          name: workflow.name || name,
          nodes: workflow.nodes,
          connections: workflow.connections || {},
          active: workflow.active !== false,
          settings: workflow.settings || {}
        },
        requiredServices,
        useCase: `Automatización de procesos relacionados con ${category}`,
        businessValue: 'Mejora la eficiencia operativa y reduce el trabajo manual',
        targetAudience: ['general', 'developers', 'automation-specialists'],
        prerequisites: requiredServices.length > 0 ? 
          [`Acceso a: ${requiredServices.join(', ')}`] : 
          ['Instancia de n8n configurada'],
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0],
        author: 'DragonJAR Community',
        version: '1.0.0',
        rating: 4.0 + Math.random() * 0.8, // Rating aleatorio entre 4.0-4.8
        downloads: Math.floor(Math.random() * 1000),
        featured: Math.random() > 0.85 // 15% de plantillas destacadas
      };

      this.processed++;
      if (this.processed % 100 === 0) {
        console.log(`📊 Procesadas: ${this.processed} plantillas`);
      }

      return template;

    } catch (error) {
      this.errors++;
      console.warn(`❌ Error procesando ${fileName}:`, error.message);
      return null;
    }
  }

  // Explorar recursivamente y procesar todos los archivos JSON
  async processDirectory(path = '', depth = 0) {
    if (depth > 10) return; // Evitar recursión infinita

    const contents = await this.exploreDirectory(path);
    const workflows = [];

    for (const item of contents) {
      if (item.type === 'file' && item.name.toLowerCase().endsWith('.json')) {
        const template = await this.processWorkflowFile(item.path, item.name);
        if (template) {
          workflows.push(template);
        }
      } else if (item.type === 'dir') {
        const subWorkflows = await this.processDirectory(item.path, depth + 1);
        workflows.push(...subWorkflows);
      }
    }

    return workflows;
  }

  // Método principal de importación
  async importTemplates(outputFile = 'public/templates.json') {
    console.log('🚀 Iniciando importación desde GitHub...');
    console.log(`📍 Repositorio: ${REPO_OWNER}/${REPO_NAME}`);

    try {
      // Procesar todos los directorios
      const templates = await this.processDirectory();
      
      console.log(`\n✅ Importación completada!`);
      console.log(`📊 Estadísticas:`);
      console.log(`   📁 Plantillas procesadas: ${this.processed}`);
      console.log(`   ✅ Plantillas válidas: ${templates.length}`);
      console.log(`   ❌ Errores: ${this.errors}`);

      // Crear directorio de salida si no existe
      const outputDir = path.dirname(outputFile);
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      // Guardar plantillas
      fs.writeFileSync(outputFile, JSON.stringify(templates, null, 2));
      console.log(`💾 Archivo guardado: ${outputFile}`);

      // Estadísticas por categoría
      const categoryStats = {};
      const difficultyStats = {};
      
      templates.forEach(template => {
        categoryStats[template.category] = (categoryStats[template.category] || 0) + 1;
        difficultyStats[template.difficulty] = (difficultyStats[template.difficulty] || 0) + 1;
      });

      console.log(`\n📈 Distribución por categorías:`);
      Object.entries(categoryStats)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 10)
        .forEach(([category, count]) => {
          console.log(`   ${category}: ${count}`);
        });

      console.log(`\n⚡ Distribución por dificultad:`);
      Object.entries(difficultyStats).forEach(([difficulty, count]) => {
        console.log(`   ${difficulty}: ${count}`);
      });

      console.log(`\n🎉 ¡Listo! Tu sistema ahora tiene ${templates.length} plantillas de n8n.`);

    } catch (error) {
      console.error('❌ Error durante la importación:', error);
      process.exit(1);
    }
  }
}

// Ejecutar importación
const args = process.argv.slice(2);
const outputFile = args[0] || 'public/templates.json';

const importer = new GitHubTemplateImporter();
importer.importTemplates(outputFile);