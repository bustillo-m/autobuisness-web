# 🚀 Guía Rápida - n8n Template Advisor

## Configuración Automática (Recomendado)

### Opción 1: Setup Automático

```bash
cd project
./setup.sh
```

Este script hará todo automáticamente:
- ✅ Instala dependencias
- ✅ Configura variables de entorno
- ✅ Importa las 3000+ plantillas desde GitHub
- ✅ Inicia el servidor de desarrollo

### Opción 2: Configuración Manual

Si prefieres hacerlo paso a paso:

#### 1. Instalar dependencias
```bash
cd project
npm install
```

#### 2. Configurar variables de entorno
```bash
# Crear archivo .env
cp .env.example .env

# Editar y agregar tu API key de OpenAI
VITE_OPENAI_API_KEY=tu_api_key_aqui
```

#### 3. Importar plantillas desde GitHub
```bash
# Importar las 3000+ plantillas del repositorio DragonJAR/n8n-workflows-es
node scripts/import-github-templates.js public/templates.json
```

#### 4. Iniciar aplicación
```bash
npm run dev
```

## 🎯 Funcionalidades Principales

### 1. **Asistente IA de Recomendaciones**
- Chat inteligente que entiende necesidades en español
- Recomendaciones personalizadas basadas en OpenAI
- Análisis automático de más de 3000 plantillas

### 2. **Explorador de Plantillas**
- Búsqueda avanzada con filtros
- Categorización automática
- Vista de grid y lista
- Detalles completos de cada plantilla

### 3. **Gestor de Plantillas**
- CRUD completo para administradores
- Importación masiva desde GitHub
- Estadísticas y métricas de uso

## 📊 Estadísticas del Sistema

Después de la importación tendrás:

- **3000+** plantillas de n8n
- **20+** categorías automáticas
- **Múltiples** niveles de dificultad
- **Integración** con 100+ servicios

## 🔧 Comandos Útiles

### Importación y Migración
```bash
# Importar desde GitHub (automático)
node scripts/import-github-templates.js

# Migrar plantillas propias
node scripts/migrate-templates.js mis-plantillas.json public/templates.json

# Reimportar solo nuevas plantillas
node scripts/import-github-templates.js --incremental
```

### Desarrollo
```bash
# Servidor de desarrollo
npm run dev

# Build para producción
npm run build

# Preview de producción
npm run preview

# Linting
npm run lint
```

## 🎛️ Configuración Avanzada

### Variables de Entorno Opcionales

```env
# API Keys
VITE_OPENAI_API_KEY=sk-...
VITE_GITHUB_TOKEN=ghp_... # Para evitar rate limits

# Configuración de Cache
VITE_CACHE_DURATION=3600
VITE_MAX_TEMPLATES_CACHE=1000

# Configuración de IA
VITE_OPENAI_MODEL=gpt-4-turbo-preview
VITE_MAX_RECOMMENDATIONS=5
VITE_AI_TEMPERATURE=0.3

# Base de datos (opcional)
DATABASE_URL=postgresql://...
REDIS_URL=redis://...
```

### Personalización del Sistema

#### 1. **Modificar Categorías**
Edita `src/types/template.ts` para agregar nuevas categorías:

```typescript
export enum WorkflowCategory {
  // Agregar nuevas categorías aquí
  MI_CATEGORIA = 'mi-categoria',
}
```

#### 2. **Customizar Algoritmo de Recomendación**
Modifica `src/services/openaiService.ts`:

```typescript
// Ajustar prompt para tu industria específica
const systemPrompt = `Eres un experto en [TU INDUSTRIA]...`;

// Modificar scoring algorithm
private calculateFallbackScore(query: string, template: N8nWorkflowTemplate): number {
  // Tu lógica personalizada aquí
}
```

#### 3. **Agregar Nuevos Servicios**
En `scripts/import-github-templates.js`:

```javascript
const serviceMap = {
  // Agregar nuevos servicios
  'mi-servicio': 'Mi Servicio',
};
```

## 🔍 Estructura de Plantillas

Cada plantilla importada incluye:

```json
{
  "id": "github-unique-id",
  "name": "Nombre Descriptivo",
  "description": "Descripción breve",
  "longDescription": "Descripción detallada...",
  "category": "automation",
  "subcategory": "Imported",
  "tags": ["automation", "api", "webhook"],
  "difficulty": "intermediate",
  "estimatedSetupTime": 45,
  "workflow": {
    "name": "Workflow Name",
    "nodes": [...], // Nodos n8n originales
    "connections": {...},
    "active": true,
    "settings": {}
  },
  "requiredServices": ["Gmail", "Slack"],
  "useCase": "Automatización de...",
  "businessValue": "Ahorra X horas...",
  "targetAudience": ["developers", "operations"],
  "prerequisites": ["Acceso a Gmail"],
  "author": "DragonJAR Community",
  "rating": 4.5,
  "downloads": 250,
  "featured": false
}
```

## 🚨 Solución de Problemas

### Error: Rate Limit de GitHub
```bash
# Configurar token de GitHub
export VITE_GITHUB_TOKEN=tu_github_token
```

### Error: Memoria insuficiente
```bash
# Aumentar memoria de Node.js
export NODE_OPTIONS="--max-old-space-size=4096"
```

### Error: OpenAI API
- Verificar que el API key esté correcto
- Comprobar créditos disponibles en OpenAI
- El sistema funcionará en modo fallback sin API key

### Plantillas no se cargan
```bash
# Verificar archivo de plantillas
ls -la public/templates.json

# Validar JSON
node -e "console.log('JSON válido:', JSON.parse(require('fs').readFileSync('public/templates.json', 'utf8')).length, 'plantillas')"
```

## 🎉 ¡Listo!

Tu sistema está configurado con:
- ✅ Más de 3000 plantillas de n8n
- ✅ Recomendaciones inteligentes con IA
- ✅ Búsqueda y filtrado avanzado
- ✅ Interface moderna y responsive
- ✅ Gestión completa de plantillas

### Próximos pasos:
1. Abre http://localhost:5173
2. Prueba el asistente IA con consultas como:
   - "Necesito automatizar emails de marketing"
   - "Quiero sincronizar mi CRM con hojas de cálculo"
   - "Ayúdame a crear notificaciones automáticas"

### Soporte:
- 📖 README.md completo
- 💬 Asistente IA integrado
- 🐛 Issues en GitHub