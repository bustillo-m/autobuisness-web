import OpenAI from 'openai';
import { 
  N8nWorkflowTemplate, 
  TemplateRecommendation,
  WorkflowCategory 
} from '../types/template';
import { templateService } from './templateService';

class OpenAIService {
  private client: OpenAI | null = null;
  private initialized = false;

  async initialize(apiKey?: string) {
    if (this.initialized && this.client) return;

    const key = apiKey || import.meta.env.VITE_OPENAI_API_KEY;
    if (!key) {
      console.warn('OpenAI API key not found. Template recommendations will use fallback method.');
      return;
    }

    try {
      this.client = new OpenAI({
        apiKey: key,
        dangerouslyAllowBrowser: true // Solo para demo, en producción usar backend
      });
      this.initialized = true;
    } catch (error) {
      console.error('Error initializing OpenAI:', error);
    }
  }

  async recommendTemplates(
    userQuery: string, 
    maxRecommendations: number = 5
  ): Promise<TemplateRecommendation[]> {
    // Asegurar que el servicio de plantillas esté inicializado
    await templateService.initialize();
    const allTemplates = templateService.getAllTemplates();

    if (this.client) {
      return await this.getAIRecommendations(userQuery, allTemplates, maxRecommendations);
    } else {
      return this.getFallbackRecommendations(userQuery, allTemplates, maxRecommendations);
    }
  }

  private async getAIRecommendations(
    userQuery: string,
    templates: N8nWorkflowTemplate[],
    maxRecommendations: number
  ): Promise<TemplateRecommendation[]> {
    try {
      const prompt = this.buildRecommendationPrompt(userQuery, templates);
      
      const response = await this.client!.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: `Eres un experto en automatización de procesos de negocio y workflows de n8n. 
            Tu tarea es recomendar las mejores plantillas de workflow basándote en las necesidades del usuario.
            Considera factores como: relevancia, dificultad de implementación, valor de negocio, 
            servicios requeridos y audiencia objetivo.`
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.3,
        max_tokens: 1500
      });

      const aiResponse = response.choices[0]?.message?.content;
      if (!aiResponse) {
        throw new Error('No response from OpenAI');
      }

      return this.parseAIResponse(aiResponse, templates);
    } catch (error) {
      console.error('Error getting AI recommendations:', error);
      return this.getFallbackRecommendations(userQuery, templates, maxRecommendations);
    }
  }

  private buildRecommendationPrompt(userQuery: string, templates: N8nWorkflowTemplate[]): string {
    const templatesSummary = templates.map(t => ({
      id: t.id,
      name: t.name,
      description: t.description,
      category: t.category,
      tags: t.tags,
      difficulty: t.difficulty,
      businessValue: t.businessValue,
      targetAudience: t.targetAudience,
      requiredServices: t.requiredServices
    }));

    return `
Necesidad del usuario: "${userQuery}"

Plantillas disponibles:
${JSON.stringify(templatesSummary, null, 2)}

Por favor, recomienda las 5 mejores plantillas para esta necesidad y proporciona tu respuesta en el siguiente formato JSON:

{
  "recommendations": [
    {
      "templateId": "id_de_plantilla",
      "score": 95,
      "reasoning": "Explicación detallada de por qué esta plantilla es recomendada para esta necesidad específica",
      "matchedCriteria": ["criterio1", "criterio2", "criterio3"]
    }
  ]
}

Considera:
- Relevancia directa con la necesidad del usuario
- Facilidad de implementación vs complejidad requerida
- ROI y valor de negocio esperado
- Servicios/herramientas que el usuario probablemente ya tenga
- Audiencia objetivo compatible
`;
  }

  private parseAIResponse(aiResponse: string, templates: N8nWorkflowTemplate[]): TemplateRecommendation[] {
    try {
      const parsed = JSON.parse(aiResponse);
      const recommendations: TemplateRecommendation[] = [];

      for (const rec of parsed.recommendations || []) {
        const template = templates.find(t => t.id === rec.templateId);
        if (template) {
          recommendations.push({
            template,
            score: rec.score || 50,
            reasoning: rec.reasoning || 'Recomendado por IA',
            matchedCriteria: rec.matchedCriteria || []
          });
        }
      }

      return recommendations;
    } catch (error) {
      console.error('Error parsing AI response:', error);
      return this.getFallbackRecommendations(aiResponse, templates, 5);
    }
  }

  private getFallbackRecommendations(
    userQuery: string,
    templates: N8nWorkflowTemplate[],
    maxRecommendations: number
  ): TemplateRecommendation[] {
    const query = userQuery.toLowerCase();
    const scoredTemplates: TemplateRecommendation[] = [];

    for (const template of templates) {
      const score = this.calculateFallbackScore(query, template);
      if (score > 0) {
        scoredTemplates.push({
          template,
          score,
          reasoning: this.generateFallbackReasoning(query, template),
          matchedCriteria: this.getMatchedCriteria(query, template)
        });
      }
    }

    return scoredTemplates
      .sort((a, b) => b.score - a.score)
      .slice(0, maxRecommendations);
  }

  private calculateFallbackScore(query: string, template: N8nWorkflowTemplate): number {
    let score = 0;

    // Coincidencia en nombre (peso alto)
    if (template.name.toLowerCase().includes(query)) score += 30;

    // Coincidencia en descripción
    if (template.description.toLowerCase().includes(query)) score += 20;

    // Coincidencia en tags
    const matchingTags = template.tags.filter(tag => 
      tag.toLowerCase().includes(query) || query.includes(tag.toLowerCase())
    );
    score += matchingTags.length * 10;

    // Coincidencia en caso de uso
    if (template.useCase.toLowerCase().includes(query)) score += 15;

    // Coincidencia en servicios requeridos
    const matchingServices = template.requiredServices.filter(service =>
      service.toLowerCase().includes(query) || query.includes(service.toLowerCase())
    );
    score += matchingServices.length * 8;

    // Bonus por rating alto
    score += template.rating * 2;

    // Bonus por ser destacado
    if (template.featured) score += 5;

    // Penalty por dificultad alta si no se menciona "advanced" o "expert"
    if (template.difficulty === 'advanced' && !query.includes('advanced') && !query.includes('expert')) {
      score -= 10;
    }

    return Math.max(0, score);
  }

  private generateFallbackReasoning(query: string, template: N8nWorkflowTemplate): string {
    const reasons = [];

    if (template.name.toLowerCase().includes(query)) {
      reasons.push(`coincide directamente con "${query}" en el nombre`);
    }

    const matchingTags = template.tags.filter(tag => 
      tag.toLowerCase().includes(query) || query.includes(tag.toLowerCase())
    );
    if (matchingTags.length > 0) {
      reasons.push(`incluye tags relevantes: ${matchingTags.join(', ')}`);
    }

    if (template.featured) {
      reasons.push('es una plantilla destacada');
    }

    if (template.rating >= 4.5) {
      reasons.push(`tiene excelente rating (${template.rating}/5)`);
    }

    if (template.difficulty === 'beginner') {
      reasons.push('es fácil de implementar');
    }

    return `Esta plantilla ${reasons.join(', ')}. ${template.businessValue}`;
  }

  private getMatchedCriteria(query: string, template: N8nWorkflowTemplate): string[] {
    const criteria = [];

    if (template.name.toLowerCase().includes(query)) {
      criteria.push('nombre');
    }

    if (template.description.toLowerCase().includes(query)) {
      criteria.push('descripción');
    }

    const matchingTags = template.tags.filter(tag => 
      tag.toLowerCase().includes(query) || query.includes(tag.toLowerCase())
    );
    if (matchingTags.length > 0) {
      criteria.push('tags');
    }

    if (template.useCase.toLowerCase().includes(query)) {
      criteria.push('caso de uso');
    }

    return criteria;
  }

  async getChatResponse(
    userMessage: string,
    context?: { 
      userBusiness?: string;
      currentTools?: string[];
      specificNeeds?: string;
    }
  ): Promise<string> {
    if (!this.client) {
      return this.getFallbackChatResponse(userMessage, context);
    }

    try {
      const systemPrompt = `Eres un consultor experto en automatización de procesos de negocio.
      Ayudas a empresas a identificar oportunidades de automatización y recomiendas workflows de n8n.
      
      Cuando un usuario describe su negocio o necesidades:
      1. Haz preguntas específicas para entender mejor sus procesos
      2. Identifica oportunidades de automatización
      3. Sugiere workflows específicos que podrían ayudar
      4. Explica el valor de negocio de cada sugerencia
      
      Mantén un tono profesional pero amigable, y enfócate en soluciones prácticas.`;

      const contextInfo = context ? `
      Contexto del usuario:
      - Tipo de negocio: ${context.userBusiness || 'No especificado'}
      - Herramientas actuales: ${context.currentTools?.join(', ') || 'No especificadas'}
      - Necesidades específicas: ${context.specificNeeds || 'No especificadas'}
      ` : '';

      const response = await this.client.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `${contextInfo}\n\nMensaje del usuario: ${userMessage}` }
        ],
        temperature: 0.7,
        max_tokens: 1000
      });

      return response.choices[0]?.message?.content || 'Lo siento, no pude procesar tu consulta.';
    } catch (error) {
      console.error('Error getting chat response:', error);
      return this.getFallbackChatResponse(userMessage, context);
    }
  }

  private getFallbackChatResponse(userMessage: string, context?: any): string {
    const message = userMessage.toLowerCase();
    
    if (message.includes('email') || message.includes('correo')) {
      return 'Para automatizar emails, te recomiendo revisar nuestras plantillas de marketing automation y notificaciones automáticas. ¿Qué tipo de emails necesitas automatizar?';
    }
    
    if (message.includes('crm') || message.includes('cliente')) {
      return 'Tenemos excelentes plantillas para integración de CRM y gestión de clientes. ¿Qué CRM utilizas actualmente?';
    }
    
    if (message.includes('inventario') || message.includes('stock')) {
      return 'Para gestión de inventario, podemos ayudarte con workflows de sincronización de stock, alertas de bajo inventario y reportes automáticos. ¿Qué sistema de inventario usas?';
    }
    
    return 'Entiendo que buscas automatizar procesos en tu negocio. ¿Podrías contarme más específicamente qué tareas repetitivas te gustaría automatizar?';
  }
}

export const openaiService = new OpenAIService();