// Servicio para integración con OpenAI
export class OpenAIService {
  private apiKey: string;
  private baseURL = 'https://api.openai.com/v1';

  constructor() {
    this.apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    if (!this.apiKey) {
      console.warn('OpenAI API key not found. Using mock responses.');
    }
  }

  async generateResponse(userMessage: string, conversationHistory: any[] = []): Promise<string> {
    if (!this.apiKey) {
      return this.getMockResponse(userMessage);
    }

    try {
      const messages = [
        {
          role: 'system',
          content: `Eres un consultor experto de AutoBusiness AI especializado en:
          
          - Consultoría empresarial y estrategias de negocio
          - Implementación de agentes de IA y automatizaciones
          - Análisis de procesos empresariales y optimización
          - Selección de plantillas de automatización de una biblioteca de 3000+ opciones
          
          Tu objetivo es:
          1. Entender la empresa del cliente, sus objetivos y procesos
          2. Identificar oportunidades de automatización y agentes IA
          3. Proponer soluciones específicas con código de implementación
          4. Recomendar las plantillas más adecuadas de nuestra biblioteca
          
          Responde de manera profesional, práctica y orientada a resultados. Siempre incluye ejemplos de código cuando sea relevante.`
        },
        ...conversationHistory.map(msg => ({
          role: msg.type === 'user' ? 'user' : 'assistant',
          content: msg.content
        })),
        {
          role: 'user',
          content: userMessage
        }
      ];

      const response = await fetch(`${this.baseURL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: messages,
          max_tokens: 1000,
          temperature: 0.7
        })
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0].message.content;

    } catch (error) {
      console.error('Error calling OpenAI API:', error);
      return this.getMockResponse(userMessage);
    }
  }

  private getMockResponse(userInput: string): string {
    const responses = [
      `Basándome en lo que me comentas sobre tu empresa, he identificado varias oportunidades de automatización. Te recomiendo implementar:

🤖 **Agente de Atención al Cliente**: Para responder consultas frecuentes 24/7
⚡ **Automatización de Facturación**: Para generar y enviar facturas automáticamente
📊 **Análisis de Datos**: Para reportes automáticos de ventas

¿Te gustaría que profundice en alguna de estas soluciones? Puedo proporcionarte el código específico de implementación.`,

      `Excelente información. Para tu tipo de negocio, sugiero esta estrategia:

**Fase 1 - Automatizaciones Básicas:**
- Gestión automática de emails
- Programación de reuniones
- Generación de reportes

**Fase 2 - Agentes IA:**
- Chatbot especializado en tu sector
- Asistente de ventas virtual
- Analizador de sentiment de clientes

El ROI estimado es del 300% en los primeros 6 meses. ¿Comenzamos con la fase 1?`,

      `He analizado tu caso y tengo la solución perfecta de nuestra biblioteca de 3000+ plantillas:

**Template #1247 - E-commerce Automation Suite**
\`\`\`python
# Automatización de gestión de inventario
import requests
from datetime import datetime

class InventoryManager:
    def __init__(self, api_key):
        self.api_key = api_key
    
    def check_stock_levels(self):
        # Código para verificar niveles de stock
        pass
    
    def reorder_products(self, product_id, quantity):
        # Código para reordenar productos automáticamente
        pass
\`\`\`

**Template #892 - CRM Intelligence Agent**
\`\`\`javascript
// Agente de scoring de leads
const leadScoring = {
    analyzeLeadQuality: (leadData) => {
        let score = 0;
        // Algoritmo de scoring basado en datos
        return score;
    }
};
\`\`\`

¿Quieres que te proporcione la implementación completa de alguna de estas plantillas?`
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  }
}

export const openAIService = new OpenAIService();