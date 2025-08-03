# n8n Template Advisor - Sistema de Recomendación de Plantillas

Sistema inteligente de recomendación de plantillas n8n con más de 1000 workflows, potenciado por IA para ayudar a encontrar la plantilla perfecta para cualquier necesidad de automatización empresarial.

## 🚀 Características Principales

- **Asistente IA**: Chat inteligente que recomienda plantillas basándose en necesidades específicas
- **Búsqueda Avanzada**: Filtros por categoría, dificultad, rating y servicios requeridos
- **Gestión de Plantillas**: CRUD completo para administrar tu biblioteca de plantillas
- **Integración OpenAI**: Recomendaciones inteligentes y respuestas contextuales
- **Interface Moderna**: UI responsiva y amigable construida con React y Tailwind CSS

## 📋 Integración de Tus Plantillas Existentes

### Opción 1: Reemplazar el archivo JSON (Recomendado)

1. **Sustituye el archivo de plantillas**:
   ```bash
   # Reemplaza el archivo public/templates.json con tus plantillas
   cp tus-plantillas.json project/public/templates.json
   ```

2. **Formato requerido**: Asegúrate de que tus plantillas sigan esta estructura:
   ```json
   [
     {
       "id": "unique-template-id",
       "name": "Nombre de la Plantilla",
       "description": "Descripción breve",
       "longDescription": "Descripción detallada del workflow",
       "category": "marketing", // Ver categorías disponibles más abajo
       "subcategory": "Email Automation",
       "tags": ["email", "automation", "marketing"],
       "difficulty": "intermediate", // beginner, intermediate, advanced
       "estimatedSetupTime": 60, // en minutos
       "workflow": {
         "name": "Workflow Name",
         "nodes": [], // Tu workflow n8n completo
         "connections": {},
         "active": true,
         "settings": {}
       },
       "requiredServices": ["MailChimp", "HubSpot"],
       "useCase": "Descripción del caso de uso",
       "businessValue": "Valor de negocio que proporciona",
       "targetAudience": ["marketers", "small-business"],
       "prerequisites": ["Lista de prerequisitos"],
       "createdAt": "2024-01-15",
       "updatedAt": "2024-01-25",
       "author": "Nombre del autor",
       "version": "1.0.0",
       "rating": 4.8,
       "downloads": 1250,
       "featured": true
     }
   ]
   ```

### Opción 2: Conectar a tu Base de Datos

Modifica el servicio de plantillas para conectar a tu base de datos:

```typescript
// src/services/templateService.ts
private async loadTemplates() {
  try {
    // Conecta a tu API o base de datos
    const response = await fetch('https://tu-api.com/templates');
    // O conecta a tu base de datos directamente
    this.templates = await response.json();
  } catch (error) {
    console.error('Error loading templates:', error);
    this.templates = [];
  }
}
```

### Opción 3: Importación Masiva

Utiliza el método `addTemplate` para importar tus plantillas programáticamente:

```typescript
import { templateService } from './services/templateService';

// Importar todas tus plantillas
const importTemplates = async (templates: N8nWorkflowTemplate[]) => {
  await templateService.initialize();
  
  templates.forEach(template => {
    templateService.addTemplate(template);
  });
};
```

## 📂 Categorías Disponibles

```typescript
enum WorkflowCategory {
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
```

## ⚙️ Configuración

### Variables de Entorno

Crea un archivo `.env` en el directorio `project/`:

```env
VITE_OPENAI_API_KEY=tu_api_key_de_openai
```

### Instalación

```bash
cd project
npm install
npm run dev
```

## 🎯 Optimización del Sistema de Recomendaciones

### 1. Mejora las Descripciones

Para obtener mejores recomendaciones de IA, asegúrate de que tus plantillas tengan:

- **Descripciones detalladas**: Explica claramente qué hace el workflow
- **Tags relevantes**: Usa palabras clave que los usuarios buscarían
- **Casos de uso específicos**: Describe escenarios reales de implementación
- **Valor de negocio claro**: Especifica los beneficios cuantificables

### 2. Personaliza el Prompt de IA

Modifica el prompt en `src/services/openaiService.ts` para adaptarlo a tu dominio:

```typescript
const systemPrompt = `Eres un experto en automatización de procesos con n8n específico para [TU INDUSTRIA].
Conoces profundamente los workflows de [TU ESPECIALIDAD] y puedes recomendar las mejores plantillas
basándote en las necesidades específicas del cliente...`;
```

### 3. Algoritmo de Scoring Personalizado

Ajusta el algoritmo de puntuación en `calculateFallbackScore` para priorizar ciertos criterios:

```typescript
// Ejemplo: Dar más peso a plantillas de tu especialidad
if (template.category === 'tu-categoria-principal') score += 20;
if (template.author === 'tu-equipo') score += 15;
```

## 🔧 Funcionalidades Avanzadas

### Gestión de Versiones de Plantillas

```typescript
// Implementa versionado de plantillas
interface TemplateVersion {
  version: string;
  changelog: string[];
  compatibility: string[];
  deprecated?: boolean;
}
```

### Analytics y Métricas

```typescript
// Trackea el uso de plantillas
const trackTemplateUsage = (templateId: string, action: string) => {
  // Envía métricas a tu sistema de analytics
  analytics.track('template_action', {
    templateId,
    action,
    timestamp: new Date().toISOString()
  });
};
```

### Validación de Plantillas

```typescript
// Valida que las plantillas sean válidas antes de guardar
const validateTemplate = (template: N8nWorkflowTemplate): boolean => {
  // Valida estructura del workflow
  // Verifica servicios requeridos
  // Comprueba metadatos obligatorios
  return true;
};
```

## 🚀 Escalabilidad para 1000+ Plantillas

### 1. Paginación

```typescript
interface PaginatedTemplates {
  templates: N8nWorkflowTemplate[];
  totalCount: number;
  currentPage: number;
  pageSize: number;
  hasNextPage: boolean;
}
```

### 2. Búsqueda con Elasticsearch

Para grandes volúmenes, considera integrar Elasticsearch:

```typescript
// Búsqueda avanzada con Elasticsearch
const searchTemplatesElastic = async (query: string) => {
  const response = await elasticClient.search({
    index: 'n8n_templates',
    body: {
      query: {
        multi_match: {
          query,
          fields: ['name^3', 'description^2', 'tags', 'useCase']
        }
      }
    }
  });
  return response.body.hits.hits;
};
```

### 3. Cache de Recomendaciones

```typescript
// Cache de recomendaciones para mejorar rendimiento
const recommendationCache = new Map<string, TemplateRecommendation[]>();

const getCachedRecommendations = (query: string) => {
  const cacheKey = query.toLowerCase().trim();
  return recommendationCache.get(cacheKey);
};
```

## 📈 Monitoreo y Métricas

### KPIs Recomendados

- **Tasa de uso de plantillas**: % de plantillas utilizadas vs total
- **Tiempo de búsqueda**: Tiempo promedio hasta encontrar plantilla
- **Satisfacción de recomendaciones**: Rating de recomendaciones IA
- **Plantillas más populares**: Top 10 por categoría
- **Patrones de búsqueda**: Términos más buscados

### Dashboard de Admin

El modo 'manage' incluye funcionalidades para:

- ✅ Ver estadísticas de uso
- ✅ Gestionar plantillas (CRUD)
- ✅ Moderar ratings y comentarios
- ✅ Analizar patrones de búsqueda
- ✅ Exportar métricas

## 🔐 Consideraciones de Seguridad

- **Validación de entrada**: Sanitiza todas las búsquedas y entradas
- **Rate limiting**: Limita las consultas a la API de OpenAI
- **Autenticación**: Implementa autenticación para funciones de gestión
- **Auditoria**: Registra todas las acciones de modificación de plantillas

## 📞 Soporte

Para soporte técnico o preguntas sobre la implementación:

1. **Documentación**: Revisa este README completo
2. **Issues**: Crea un issue en el repositorio
3. **Chat**: Usa el asistente IA integrado para preguntas sobre uso

---

**¡Tu sistema está listo para manejar 1000+ plantillas con recomendaciones inteligentes!** 🎉