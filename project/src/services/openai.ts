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
          content: `Eres un consultor experto de AutoBusiness AI, especializado en análisis empresarial y recomendación de soluciones de automatización.

**TU EXPERTISE:**
- Consultoría empresarial y estrategias de optimización
- Análisis de procesos y identificación de oportunidades de automatización
- Selección óptima de plantillas de una biblioteca de 3000+ soluciones
- Implementación de agentes de IA y sistemas automatizados
- Cálculo de ROI y planes de implementación detallados

**TU PROCESO DE ANÁLISIS:**
1. **Entender el negocio**: Tipo de empresa, industria, tamaño, objetivos
2. **Identificar pain points**: Procesos manuales, ineficiencias, cuellos de botella
3. **Analizar recursos**: Presupuesto, equipo técnico, tiempo disponible
4. **Recomendar soluciones**: Plantillas específicas con mayor ROI
5. **Crear roadmap**: Plan de implementación paso a paso

**CÓMO RESPONDER:**
- Haz preguntas específicas para entender mejor el negocio
- Proporciona análisis detallados con datos concretos
- Menciona plantillas específicas por nombre cuando sea relevante
- Incluye estimaciones de ROI, tiempo de implementación y costos
- Explica el "por qué" detrás de cada recomendación
- Sé específico sobre beneficios y resultados esperados

**PLANTILLAS DISPONIBLES (ejemplos):**
- E-commerce Automation Suite: Para tiendas online (ROI 350%)
- CRM Intelligence Agent: Para gestión de clientes (ROI 280%)
- Marketing Automation Hub: Para campañas automatizadas (ROI 400%)
- Financial Analytics Bot: Para análisis financiero (ROI 220%)
- HR Automation Assistant: Para recursos humanos (ROI 300%)

**OBJETIVO:** Proporcionar recomendaciones precisas y planes de implementación que generen el máximo ROI para cada cliente específico.

Responde de manera profesional, consultiva y orientada a resultados medibles.`
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
    const input = userInput.toLowerCase();
    
    // Respuestas específicas basadas en el tipo de consulta
    if (input.includes('e-commerce') || input.includes('tienda') || input.includes('venta online')) {
      return `Perfecto, veo que tienes un e-commerce. Basándome en mi análisis, he identificado oportunidades clave:

**📊 ANÁLISIS DE TU NEGOCIO:**
- Industria: E-commerce/Retail
- Oportunidades principales: Automatización de inventario, recuperación de carritos, atención al cliente

**🎯 RECOMENDACIONES PRIORITARIAS:**

**1. E-commerce Automation Suite** (Compatibilidad: 95%)
- ROI estimado: 350% en el primer año
- Reduce tiempo de gestión en 70%
- Aumenta conversiones en 25-40%
- Implementación: 8-12 semanas

**2. CRM Intelligence Agent** (Compatibilidad: 88%)
- ROI estimado: 280%
- Mejora seguimiento de clientes en 60%
- Automatiza scoring de leads
- Implementación: 4-6 semanas

**💰 INVERSIÓN ESTIMADA:**
- Total: $3,250 (incluye implementación y soporte)
- Retorno esperado: $11,375 en el primer año

**⚡ BENEFICIOS INMEDIATOS:**
✅ Gestión automática de inventario
✅ Recuperación de carritos abandonados (recupera 15-25% ventas perdidas)
✅ Chatbot 24/7 (reduce consultas manuales en 80%)
✅ Análisis predictivo de demanda

¿Te gustaría que profundice en alguna plantilla específica o prefieres ver el plan de implementación detallado?`;
    }

    if (input.includes('crm') || input.includes('clientes') || input.includes('ventas')) {
      return `Excelente, el CRM es fundamental para el crecimiento. He analizado tu perfil y estas son mis recomendaciones:

**📈 ANÁLISIS CRM:**
- Oportunidad: Automatizar gestión de leads y seguimiento
- Pain point identificado: Procesos manuales de calificación

**🚀 SOLUCIÓN RECOMENDADA:**

**CRM Intelligence Agent** (Compatibilidad: 92%)
- **ROI**: 280% anual
- **Implementación**: 4-6 semanas
- **Inversión**: $2,340

**🎯 QUÉ OBTENDRÁS:**
1. **Scoring automático de leads** - Identifica automáticamente los leads más prometedores
2. **Predicción de churn** - Detecta clientes en riesgo antes de que se vayan
3. **Personalización de comunicaciones** - Emails y seguimientos automáticos personalizados
4. **Dashboard de métricas** - Visibilidad completa del pipeline

**💡 CASO DE ÉXITO:**
Una empresa similar aumentó sus conversiones en 45% y redujo el tiempo de gestión en 60%.

**📋 PLAN DE IMPLEMENTACIÓN:**
- Semana 1-2: Análisis e integración con tu CRM actual
- Semana 3-4: Configuración de algoritmos de scoring
- Semana 5-6: Testing y capacitación del equipo

¿Quieres ver el código de ejemplo o prefieres detalles sobre la integración con tu CRM actual?`;
    }

    if (input.includes('marketing') || input.includes('campaña') || input.includes('publicidad')) {
      return `Perfecto, el marketing automatizado puede transformar tus resultados. Análisis completado:

**🎯 OPORTUNIDAD IDENTIFICADA:**
Marketing manual consume mucho tiempo y tiene ROI inconsistente

**🚀 SOLUCIÓN RECOMENDADA:**

**Marketing Automation Hub** (Compatibilidad: 89%)
- **ROI estimado**: 400% 
- **Tiempo de implementación**: 6-10 semanas
- **Inversión total**: $4,160

**⚡ AUTOMATIZACIONES INCLUIDAS:**
1. **Segmentación inteligente** - IA analiza comportamiento y segmenta automáticamente
2. **Campañas multicanal** - Email, SMS, redes sociales coordinadas
3. **A/B testing automático** - Optimiza continuamente tus campañas
4. **Attribution modeling** - Rastrea toda la customer journey

**📊 RESULTADOS ESPERADOS:**
- Incremento del 60% en engagement
- Reducción del 50% en tiempo de gestión
- Mejora del 35% en conversión de leads
- ROI de campañas aumenta 3.2x

**💰 DESGLOSE DE INVERSIÓN:**
- Plantilla base: $3,200
- Implementación personalizada: $960
- **Total: $4,160**

**🎁 INCLUYE:**
✅ Setup completo en tus plataformas
✅ 50+ templates de campaña
✅ Capacitación del equipo
✅ 30 días de soporte

¿Te interesa ver ejemplos de las campañas automatizadas o prefieres el roadmap técnico?`;
    }

    // Respuesta general para otros casos
    const generalResponses = [
      `Excelente, veo potencial significativo en tu negocio. Para darte las mejores recomendaciones, necesito entender mejor:

**🔍 ANÁLISIS INICIAL:**
He identificado que podrías beneficiarte de automatización, pero necesito más detalles:

**📋 CUÉNTAME MÁS SOBRE:**
1. **Tu industria específica** - ¿Es SaaS, servicios, retail, manufactura?
2. **Tamaño del equipo** - ¿Cuántas personas trabajan en tu empresa?
3. **Principales procesos** - ¿En qué tareas invertís más tiempo?
4. **Objetivos priorizados** - ¿Aumentar ventas, reducir costos, mejorar eficiencia?

**🎯 CON ESTA INFO PODRÉ:**
✅ Seleccionar las plantillas más rentables para tu caso
✅ Calcular ROI específico para tu industria
✅ Crear un roadmap de implementación personalizado
✅ Mostrarte casos de éxito similares

**💡 ADELANTO:**
Tengo plantillas que han generado ROIs desde 220% hasta 400% según el tipo de negocio. La clave está en elegir la combinación correcta para TU situación específica.

¿Podrías contarme más sobre tu empresa y objetivos principales?`,

      `Basándome en lo que me comentas, he analizado nuestra biblioteca de plantillas y encontré varias oportunidades:

**🔍 ANÁLISIS PRELIMINAR:**
Tu perfil indica oportunidades en automatización de procesos. He preseleccionado 3 plantillas con alto potencial:

**🥇 OPCIÓN 1: Financial Analytics Bot**
- ROI: 220% anual
- Reduce tiempo de reportes en 85%
- Inversión: $1,560

**🥈 OPCIÓN 2: HR Automation Assistant** 
- ROI: 300% anual
- Automatiza reclutamiento y evaluaciones
- Inversión: $2,600

**🥉 OPCIÓN 3: Operaciones Inteligentes**
- ROI: 260% anual  
- Optimiza workflows internos
- Inversión: $2,080

**📊 PARA AFINAR RECOMENDACIONES:**
¿Podrías decirme qué procesos te consumen más tiempo actualmente? Esto me ayudará a calcular el ROI específico y priorizar las implementaciones.

**💡 DATO CLAVE:**
Empresas similares que implementaron nuestras plantillas vieron resultados en las primeras 4-6 semanas.`,

      `He completado el análisis inicial de tu empresa. Detecté varias oportunidades de automatización con potencial de alto impacto:

**📈 OPORTUNIDADES IDENTIFICADAS:**
Basándome en tu descripción, tu empresa puede beneficiarse significativamente de automatización estratégica.

**🎯 MIS RECOMENDACIONES TOP:**

**Template #892 - Business Process Optimizer**
\`\`\`python
# Sistema de optimización de procesos
class ProcessOptimizer:
    def analyze_workflow(self, process_data):
        # Analiza eficiencia actual
        bottlenecks = self.identify_bottlenecks(process_data)
        return self.suggest_improvements(bottlenecks)
    
    def automate_routine_tasks(self):
        # Automatiza tareas repetitivas
        pass
\`\`\`

**💰 INVERSIÓN Y RETORNO:**
- Inversión inicial: $2,400
- ROI proyectado: 280% en 12 meses
- Tiempo de implementación: 6-8 semanas

**✅ RESULTADOS ESPERADOS:**
- 50% reducción en tiempo de procesos manuales
- 30% mejora en productividad general
- Eliminación de errores humanos en procesos críticos

¿Te gustaría que profundice en alguna área específica o prefieres ver otras plantillas de nuestra biblioteca?`
    ];

    return generalResponses[Math.floor(Math.random() * generalResponses.length)];
  }
}

export const openAIService = new OpenAIService();