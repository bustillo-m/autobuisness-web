#!/bin/bash

# Setup Script para n8n Template Advisor
# Automatiza la configuración completa del sistema

set -e

echo "🚀 Configurando n8n Template Advisor"
echo "======================================"

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Función para mostrar mensajes
log_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Verificar si Node.js está instalado
check_node() {
    if ! command -v node &> /dev/null; then
        log_error "Node.js no está instalado. Por favor instala Node.js 18+ antes de continuar."
        exit 1
    fi
    
    NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$NODE_VERSION" -lt 18 ]; then
        log_error "Node.js versión 18+ requerida. Versión actual: $(node -v)"
        exit 1
    fi
    
    log_success "Node.js $(node -v) detectado"
}

# Instalar dependencias
install_dependencies() {
    log_info "Instalando dependencias..."
    
    if [ ! -f "package.json" ]; then
        log_error "package.json no encontrado. Asegúrate de estar en el directorio correcto."
        exit 1
    fi
    
    npm install
    log_success "Dependencias instaladas"
}

# Configurar variables de entorno
setup_env() {
    log_info "Configurando variables de entorno..."
    
    if [ ! -f ".env" ]; then
        cat > .env << EOF
# Configuración n8n Template Advisor
VITE_OPENAI_API_KEY=
VITE_GITHUB_TOKEN=

# Opcional: Configuración de base de datos
# DATABASE_URL=
# REDIS_URL=
EOF
        log_warning "Archivo .env creado. Por favor configura tu VITE_OPENAI_API_KEY"
        log_info "Puedes obtener tu API key en: https://platform.openai.com/api-keys"
    else
        log_success "Archivo .env ya existe"
    fi
}

# Crear directorios necesarios
create_directories() {
    log_info "Creando directorios necesarios..."
    
    mkdir -p public
    mkdir -p scripts
    mkdir -p logs
    
    log_success "Directorios creados"
}

# Importar plantillas desde GitHub
import_templates() {
    log_info "¿Deseas importar las 3000+ plantillas desde GitHub? (y/n)"
    read -r IMPORT_CHOICE
    
    if [[ $IMPORT_CHOICE =~ ^[Yy]$ ]]; then
        log_info "Iniciando importación de plantillas desde DragonJAR/n8n-workflows-es..."
        log_warning "Este proceso puede tardar varios minutos..."
        
        # Verificar que el script existe
        if [ ! -f "scripts/import-github-templates.js" ]; then
            log_error "Script de importación no encontrado"
            exit 1
        fi
        
        # Ejecutar importación
        node scripts/import-github-templates.js public/templates.json 2>&1 | tee logs/import.log
        
        if [ ${PIPESTATUS[0]} -eq 0 ]; then
            log_success "Plantillas importadas exitosamente"
            TEMPLATE_COUNT=$(jq length public/templates.json 2>/dev/null || echo "unknown")
            log_success "Total de plantillas: $TEMPLATE_COUNT"
        else
            log_error "Error durante la importación. Revisa logs/import.log"
            exit 1
        fi
    else
        log_info "Saltando importación de plantillas"
        log_info "Puedes importarlas más tarde ejecutando:"
        echo "  node scripts/import-github-templates.js"
    fi
}

# Verificar configuración
verify_setup() {
    log_info "Verificando configuración..."
    
    # Verificar que existe templates.json
    if [ -f "public/templates.json" ]; then
        TEMPLATE_COUNT=$(jq length public/templates.json 2>/dev/null || echo "0")
        log_success "Archivo de plantillas encontrado: $TEMPLATE_COUNT plantillas"
    else
        log_warning "No se encontró archivo de plantillas. El sistema usará plantillas de ejemplo."
    fi
    
    # Verificar .env
    if [ -f ".env" ]; then
        if grep -q "VITE_OPENAI_API_KEY=" .env && ! grep -q "VITE_OPENAI_API_KEY=$" .env; then
            log_success "API Key de OpenAI configurada"
        else
            log_warning "API Key de OpenAI no configurada. Las recomendaciones usarán modo fallback."
        fi
    fi
    
    log_success "Verificación completada"
}

# Iniciar servidor de desarrollo
start_dev_server() {
    log_info "¿Deseas iniciar el servidor de desarrollo? (y/n)"
    read -r START_CHOICE
    
    if [[ $START_CHOICE =~ ^[Yy]$ ]]; then
        log_info "Iniciando servidor de desarrollo..."
        log_info "La aplicación estará disponible en: http://localhost:5173"
        log_info "Presiona Ctrl+C para detener el servidor"
        echo ""
        
        npm run dev
    else
        log_info "Para iniciar el servidor más tarde, ejecuta: npm run dev"
    fi
}

# Mostrar información final
show_final_info() {
    echo ""
    echo "🎉 ¡Configuración completada!"
    echo "================================"
    echo ""
    echo "📋 Próximos pasos:"
    echo ""
    echo "1. 🔑 Configura tu API Key de OpenAI en .env:"
    echo "   VITE_OPENAI_API_KEY=tu_api_key_aqui"
    echo ""
    echo "2. 🚀 Inicia el servidor de desarrollo:"
    echo "   npm run dev"
    echo ""
    echo "3. 🌐 Abre tu navegador en:"
    echo "   http://localhost:5173"
    echo ""
    echo "📖 Documentación adicional:"
    echo "   - README.md: Guía completa de uso"
    echo "   - scripts/: Scripts de importación y migración"
    echo ""
    echo "🆘 Soporte:"
    echo "   - Issues: Crea un issue en el repositorio"
    echo "   - Chat: Usa el asistente IA integrado"
    echo ""
    
    if [ -f "public/templates.json" ]; then
        TEMPLATE_COUNT=$(jq length public/templates.json 2>/dev/null || echo "unknown")
        echo "📊 Tu sistema incluye $TEMPLATE_COUNT plantillas listas para usar"
    fi
    
    echo ""
    log_success "¡Sistema listo para usar!"
}

# Función principal
main() {
    echo ""
    log_info "Iniciando configuración automática..."
    echo ""
    
    # Ejecutar pasos de configuración
    check_node
    install_dependencies
    create_directories
    setup_env
    import_templates
    verify_setup
    
    echo ""
    show_final_info
    echo ""
    
    start_dev_server
}

# Manejar interrupción
trap 'echo -e "\n${YELLOW}Configuración interrumpida${NC}"; exit 1' INT

# Ejecutar script principal
main "$@"