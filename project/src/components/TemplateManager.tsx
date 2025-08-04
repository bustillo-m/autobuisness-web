import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Trash2, 
  Star, 
  Clock, 
  Download, 
  Tag,
  Grid,
  List,
  BookOpen,
  Settings
} from 'lucide-react';
import { 
  N8nWorkflowTemplate, 
  WorkflowCategory, 
  TemplateSearchParams 
} from '../types/template';
import { templateService } from '../services/templateService';

interface TemplateManagerProps {
  onTemplateSelect?: (template: N8nWorkflowTemplate) => void;
  mode?: 'view' | 'manage';
}

export const TemplateManager: React.FC<TemplateManagerProps> = ({
  onTemplateSelect,
  mode = 'view'
}) => {
  const [templates, setTemplates] = useState<N8nWorkflowTemplate[]>([]);
  const [filteredTemplates, setFilteredTemplates] = useState<N8nWorkflowTemplate[]>([]);
  const [searchParams, setSearchParams] = useState<TemplateSearchParams>({});
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTemplate, setSelectedTemplate] = useState<N8nWorkflowTemplate | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [categories, setCategories] = useState<{ category: WorkflowCategory; count: number }[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);

  useEffect(() => {
    initializeTemplates();
  }, []);

  useEffect(() => {
    filterTemplates();
  }, [templates, searchParams]);

  const initializeTemplates = async () => {
    setIsLoading(true);
    try {
      await templateService.initialize();
      const allTemplates = templateService.getAllTemplates();
      setTemplates(allTemplates);
      setCategories(templateService.getCategories());
      setAllTags(templateService.getAllTags());
    } catch (error) {
      console.error('Error loading templates:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterTemplates = () => {
    const filtered = templateService.searchTemplates(searchParams);
    setFilteredTemplates(filtered);
  };

  const handleSearchChange = (query: string) => {
    setSearchParams(prev => ({ ...prev, query }));
  };

  const handleCategoryChange = (category: WorkflowCategory | '') => {
    setSearchParams(prev => ({ 
      ...prev, 
      category: category || undefined 
    }));
  };

  const handleDifficultyChange = (difficulty: string) => {
    setSearchParams(prev => ({ 
      ...prev, 
      difficulty: difficulty || undefined 
    }));
  };

  const handleFeaturedChange = (featured: boolean) => {
    setSearchParams(prev => ({ 
      ...prev, 
      featured: featured || undefined 
    }));
  };

  const handleTemplateClick = (template: N8nWorkflowTemplate) => {
    setSelectedTemplate(template);
    if (onTemplateSelect) {
      onTemplateSelect(template);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: WorkflowCategory) => {
    // Aquí podrías mapear cada categoría a un icono específico
    return <BookOpen size={16} />;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
          <p className="text-gray-600">Cargando plantillas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Plantillas de Workflow n8n
          </h2>
          <p className="text-gray-600">
            {filteredTemplates.length} de {templates.length} plantillas
          </p>
        </div>
        
        <div className="flex gap-2">
          {mode === 'manage' && (
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2">
              <Plus size={16} />
              Nueva Plantilla
            </button>
          )}
          
          <div className="flex border border-gray-300 rounded-lg">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
            >
              <Grid size={16} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
            >
              <List size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 space-y-4">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Buscar plantillas por nombre, descripción, tags..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchParams.query || ''}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
          </div>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`px-4 py-2 border rounded-lg flex items-center gap-2 ${
              showFilters ? 'bg-blue-100 text-blue-600 border-blue-300' : 'border-gray-300 text-gray-600'
            }`}
          >
            <Filter size={16} />
            Filtros
          </button>
        </div>

        {showFilters && (
          <div className="bg-gray-50 p-4 rounded-lg space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Categoría
                </label>
                <select
                  value={searchParams.category || ''}
                  onChange={(e) => handleCategoryChange(e.target.value as WorkflowCategory)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Todas las categorías</option>
                  {Object.values(WorkflowCategory).map(category => (
                    <option key={category} value={category}>
                      {category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </option>
                  ))}
                </select>
              </div>

              {/* Difficulty Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dificultad
                </label>
                <select
                  value={searchParams.difficulty || ''}
                  onChange={(e) => handleDifficultyChange(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Todas</option>
                  <option value="beginner">Principiante</option>
                  <option value="intermediate">Intermedio</option>
                  <option value="advanced">Avanzado</option>
                </select>
              </div>

              {/* Rating Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rating mínimo
                </label>
                <select
                  value={searchParams.minRating || ''}
                  onChange={(e) => setSearchParams(prev => ({ 
                    ...prev, 
                    minRating: e.target.value ? parseFloat(e.target.value) : undefined 
                  }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Cualquier rating</option>
                  <option value="4.5">4.5+ estrellas</option>
                  <option value="4.0">4.0+ estrellas</option>
                  <option value="3.5">3.5+ estrellas</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={searchParams.featured || false}
                  onChange={(e) => handleFeaturedChange(e.target.checked)}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Solo destacadas</span>
              </label>
            </div>
          </div>
        )}
      </div>

      {/* Templates Grid/List */}
      <div className={viewMode === 'grid' 
        ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
        : 'space-y-4'
      }>
        {filteredTemplates.map(template => (
          <TemplateCard
            key={template.id}
            template={template}
            viewMode={viewMode}
            onSelect={handleTemplateClick}
            showActions={mode === 'manage'}
          />
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search size={48} className="mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">
            No se encontraron plantillas
          </h3>
          <p className="text-gray-500">
            Intenta ajustar los filtros de búsqueda
          </p>
        </div>
      )}
    </div>
  );
};

interface TemplateCardProps {
  template: N8nWorkflowTemplate;
  viewMode: 'grid' | 'list';
  onSelect: (template: N8nWorkflowTemplate) => void;
  showActions?: boolean;
}

const TemplateCard: React.FC<TemplateCardProps> = ({
  template,
  viewMode,
  onSelect,
  showActions = false
}) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (viewMode === 'list') {
    return (
      <div 
        className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer bg-white"
        onClick={() => onSelect(template)}
      >
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-semibold text-gray-800">{template.name}</h3>
              {template.featured && (
                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                  Destacada
                </span>
              )}
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(template.difficulty)}`}>
                {template.difficulty}
              </span>
            </div>
            
            <p className="text-gray-600 mb-3">{template.description}</p>
            
            <div className="flex flex-wrap gap-2 mb-3">
              {template.tags.slice(0, 4).map(tag => (
                <span key={tag} className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                  <Tag size={10} />
                  {tag}
                </span>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Star size={12} />
                {template.rating}/5
              </div>
              <div className="flex items-center gap-1">
                <Clock size={12} />
                {template.estimatedSetupTime}min
              </div>
              <div className="flex items-center gap-1">
                <Download size={12} />
                {template.downloads}
              </div>
            </div>
            
            {showActions && (
              <div className="flex gap-2">
                <button className="text-blue-600 hover:bg-blue-50 p-1 rounded">
                  <Edit size={16} />
                </button>
                <button className="text-red-600 hover:bg-red-50 p-1 rounded">
                  <Trash2 size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer bg-white"
      onClick={() => onSelect(template)}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
          {template.featured && (
            <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
              Destacada
            </span>
          )}
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(template.difficulty)}`}>
            {template.difficulty}
          </span>
        </div>
        
        {showActions && (
          <div className="flex gap-2">
            <button className="text-blue-600 hover:bg-blue-50 p-1 rounded">
              <Edit size={16} />
            </button>
            <button className="text-red-600 hover:bg-red-50 p-1 rounded">
              <Trash2 size={16} />
            </button>
          </div>
        )}
      </div>
      
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{template.name}</h3>
      <p className="text-gray-600 mb-4 line-clamp-3">{template.description}</p>
      
      <div className="flex flex-wrap gap-1 mb-4">
        {template.tags.slice(0, 3).map(tag => (
          <span key={tag} className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
            <Tag size={10} />
            {tag}
          </span>
        ))}
      </div>
      
      <div className="flex justify-between items-center text-sm text-gray-500">
        <div className="flex items-center gap-1">
          <Star size={12} />
          {template.rating}/5
        </div>
        <div className="flex items-center gap-1">
          <Clock size={12} />
          {template.estimatedSetupTime}min
        </div>
        <div className="flex items-center gap-1">
          <Download size={12} />
          {template.downloads}
        </div>
      </div>
    </div>
  );
};