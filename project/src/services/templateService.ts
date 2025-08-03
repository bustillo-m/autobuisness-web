import { 
  N8nWorkflowTemplate, 
  TemplateSearchParams, 
  WorkflowCategory,
  TemplateRecommendation 
} from '../types/template';

class TemplateService {
  private templates: N8nWorkflowTemplate[] = [];
  private initialized = false;

  async initialize() {
    if (this.initialized) return;
    
    // En producción, esto vendría de una base de datos o API
    await this.loadTemplates();
    this.initialized = true;
  }

  private async loadTemplates() {
    // Simulamos la carga de plantillas desde un archivo JSON o API
    try {
      const response = await fetch('/templates.json');
      if (response.ok) {
        this.templates = await response.json();
      } else {
        // Si no existe el archivo, usar plantillas de ejemplo
        this.templates = this.getDefaultTemplates();
      }
    } catch (error) {
      console.warn('No se pudieron cargar las plantillas, usando plantillas por defecto');
      this.templates = this.getDefaultTemplates();
    }
  }

  getAllTemplates(): N8nWorkflowTemplate[] {
    return this.templates;
  }

  getTemplateById(id: string): N8nWorkflowTemplate | undefined {
    return this.templates.find(template => template.id === id);
  }

  searchTemplates(params: TemplateSearchParams): N8nWorkflowTemplate[] {
    let filtered = this.templates;

    // Filtrar por consulta de texto
    if (params.query) {
      const query = params.query.toLowerCase();
      filtered = filtered.filter(template =>
        template.name.toLowerCase().includes(query) ||
        template.description.toLowerCase().includes(query) ||
        template.longDescription.toLowerCase().includes(query) ||
        template.useCase.toLowerCase().includes(query) ||
        template.tags.some(tag => tag.toLowerCase().includes(query)) ||
        template.requiredServices.some(service => service.toLowerCase().includes(query))
      );
    }

    // Filtrar por categoría
    if (params.category) {
      filtered = filtered.filter(template => template.category === params.category);
    }

    // Filtrar por tags
    if (params.tags && params.tags.length > 0) {
      filtered = filtered.filter(template =>
        params.tags!.some(tag => template.tags.includes(tag))
      );
    }

    // Filtrar por dificultad
    if (params.difficulty) {
      filtered = filtered.filter(template => template.difficulty === params.difficulty);
    }

    // Filtrar por servicios requeridos
    if (params.requiredServices && params.requiredServices.length > 0) {
      filtered = filtered.filter(template =>
        params.requiredServices!.every(service =>
          template.requiredServices.includes(service)
        )
      );
    }

    // Filtrar por destacados
    if (params.featured) {
      filtered = filtered.filter(template => template.featured);
    }

    // Filtrar por rating mínimo
    if (params.minRating) {
      filtered = filtered.filter(template => template.rating >= params.minRating!);
    }

    return filtered;
  }

  getTemplatesByCategory(category: WorkflowCategory): N8nWorkflowTemplate[] {
    return this.templates.filter(template => template.category === category);
  }

  getFeaturedTemplates(): N8nWorkflowTemplate[] {
    return this.templates.filter(template => template.featured);
  }

  getPopularTemplates(limit: number = 10): N8nWorkflowTemplate[] {
    return this.templates
      .sort((a, b) => b.downloads - a.downloads)
      .slice(0, limit);
  }

  getTopRatedTemplates(limit: number = 10): N8nWorkflowTemplate[] {
    return this.templates
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit);
  }

  addTemplate(template: N8nWorkflowTemplate): void {
    this.templates.push(template);
    this.saveTemplates();
  }

  updateTemplate(id: string, updatedTemplate: Partial<N8nWorkflowTemplate>): boolean {
    const index = this.templates.findIndex(template => template.id === id);
    if (index !== -1) {
      this.templates[index] = { ...this.templates[index], ...updatedTemplate };
      this.saveTemplates();
      return true;
    }
    return false;
  }

  deleteTemplate(id: string): boolean {
    const index = this.templates.findIndex(template => template.id === id);
    if (index !== -1) {
      this.templates.splice(index, 1);
      this.saveTemplates();
      return true;
    }
    return false;
  }

  private saveTemplates(): void {
    // En una aplicación real, esto guardaría en una base de datos
    localStorage.setItem('n8n-templates', JSON.stringify(this.templates));
  }

  getCategories(): { category: WorkflowCategory; count: number }[] {
    const categoryCounts = new Map<WorkflowCategory, number>();
    
    this.templates.forEach(template => {
      const count = categoryCounts.get(template.category) || 0;
      categoryCounts.set(template.category, count + 1);
    });

    return Array.from(categoryCounts.entries()).map(([category, count]) => ({
      category,
      count
    }));
  }

  getAllTags(): string[] {
    const tags = new Set<string>();
    this.templates.forEach(template => {
      template.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  }

  getRequiredServices(): string[] {
    const services = new Set<string>();
    this.templates.forEach(template => {
      template.requiredServices.forEach(service => services.add(service));
    });
    return Array.from(services).sort();
  }

  // Método para generar plantillas de ejemplo
  private getDefaultTemplates(): N8nWorkflowTemplate[] {
    return [
      {
        id: '1',
        name: 'Automatización de Email Marketing',
        description: 'Automatiza campañas de email basadas en comportamiento del usuario',
        longDescription: 'Este workflow automatiza completamente tus campañas de email marketing, enviando correos personalizados basados en el comportamiento del usuario, segmentación automática y seguimiento de métricas de engagement.',
        category: WorkflowCategory.MARKETING,
        subcategory: 'Email Automation',
        tags: ['email', 'marketing', 'automation', 'segmentation', 'personalization'],
        difficulty: 'intermediate',
        estimatedSetupTime: 45,
        workflow: {
          name: 'Email Marketing Automation',
          nodes: [],
          connections: {},
          active: true,
          settings: {}
        },
        requiredServices: ['MailChimp', 'Google Analytics', 'CRM'],
        useCase: 'Automatizar campañas de email marketing con segmentación inteligente',
        businessValue: 'Incrementa la tasa de conversión en un 35% y reduce el tiempo de gestión en 80%',
        targetAudience: ['marketers', 'small-business', 'ecommerce'],
        prerequisites: ['Cuenta de MailChimp', 'CRM configurado', 'Google Analytics'],
        createdAt: '2024-01-15',
        updatedAt: '2024-01-20',
        author: 'Marketing Team',
        version: '1.2.0',
        rating: 4.8,
        downloads: 1250,
        featured: true
      },
      {
        id: '2',
        name: 'Sincronización CRM - ERP',
        description: 'Sincroniza automáticamente datos entre tu CRM y sistema ERP',
        longDescription: 'Mantén tus sistemas CRM y ERP sincronizados en tiempo real. Este workflow detecta cambios en cualquiera de los sistemas y actualiza automáticamente la información en ambos, eliminando duplicados y errores manuales.',
        category: WorkflowCategory.INTEGRATION,
        subcategory: 'System Integration',
        tags: ['crm', 'erp', 'sync', 'integration', 'data-management'],
        difficulty: 'advanced',
        estimatedSetupTime: 90,
        workflow: {
          name: 'CRM-ERP Sync',
          nodes: [],
          connections: {},
          active: true,
          settings: {}
        },
        requiredServices: ['Salesforce', 'SAP', 'Webhook'],
        useCase: 'Mantener sincronizados sistemas CRM y ERP en tiempo real',
        businessValue: 'Elimina errores de datos en 95% y ahorra 20 horas semanales de trabajo manual',
        targetAudience: ['enterprise', 'it-managers', 'operations'],
        prerequisites: ['Acceso API Salesforce', 'Acceso API SAP', 'Permisos de administrador'],
        createdAt: '2024-01-10',
        updatedAt: '2024-01-25',
        author: 'Integration Team',
        version: '2.1.0',
        rating: 4.9,
        downloads: 890,
        featured: true
      }
      // Aquí irían las demás plantillas...
    ];
  }
}

export const templateService = new TemplateService();