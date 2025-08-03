// Test script para verificar la integración de plantillas n8n
const { templateService } = require('./src/services/templateService.ts');

// Simular un análisis de negocio
const testBusinessAnalysis = {
  industry: 'E-commerce',
  businessType: 'E-commerce',
  size: 'pequeña',
  goals: ['Automatización de procesos con n8n', 'Incrementar ventas y conversiones'],
  currentPainPoints: ['Procesos manuales y repetitivos', 'Falta de integración entre sistemas'],
  budget: 'No especificado',
  timeframe: 'No especificado',
  techStack: ['n8n']
};

console.log('🔍 Análisis de negocio de prueba:');
console.log(JSON.stringify(testBusinessAnalysis, null, 2));

console.log('\n📋 Generando recomendaciones...');

try {
  const recommendations = templateService.generateRecommendations(testBusinessAnalysis);
  
  console.log(`\n✅ Se generaron ${recommendations.length} recomendaciones:`);
  
  recommendations.forEach((rec, index) => {
    console.log(`\n${index + 1}. ${rec.template.name}`);
    console.log(`   🎯 Score: ${rec.matchScore}%`);
    console.log(`   💰 Precio: $${rec.template.price}`);
    console.log(`   📈 ROI: ${rec.template.estimatedROI}%`);
    console.log(`   ⏱️  Implementación: ${rec.template.implementationTime}`);
    console.log(`   📝 Descripción: ${rec.template.description.substring(0, 100)}...`);
    console.log(`   🔧 Características principales:`);
    rec.template.features.slice(0, 3).forEach(feature => {
      console.log(`      • ${feature}`);
    });
    console.log(`   💡 Razonamiento: ${rec.reasoning}`);
  });

  console.log('\n🎉 ¡Integración de plantillas n8n completada exitosamente!');
  
  // Verificar que tenemos plantillas n8n
  const allTemplates = templateService.getCategories();
  console.log(`\n📊 Categorías disponibles: ${allTemplates.join(', ')}`);
  
} catch (error) {
  console.error('❌ Error al generar recomendaciones:', error.message);
}