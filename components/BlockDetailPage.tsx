import React, { useState, useMemo, useCallback } from 'react';
import { Project, ProjectBlock, ProjectPipelineStatus } from '../types';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import ProjectGridCard from './ProjectGridCard';
import ProjectListItem from './ProjectListItem';
import { KanbanIcon } from './icons/KanbanIcon';
import { ViewGridIcon } from './icons/ViewGridIcon';
import { ViewListIcon } from './icons/ViewListIcon';

type ViewMode = 'kanban' | 'grid' | 'list';
const pipelineStatuses = Object.values(ProjectPipelineStatus);

interface BlockDetailPageProps {
  block: ProjectBlock;
  onBack: () => void;
  onSelectProject: (project: Project) => void;
  onUpdateProjects: (updatedProjects: Project[]) => void;
}

const BlockDetailPage: React.FC<BlockDetailPageProps> = ({ block, onBack, onSelectProject, onUpdateProjects }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTags, setActiveTags] = useState<Set<string>>(new Set());
  const [viewMode, setViewMode] = useState<ViewMode>('kanban');
  const [selectedKanbanStatus, setSelectedKanbanStatus] = useState<ProjectPipelineStatus>(pipelineStatuses[0]);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    block.projects.forEach(p => p.tags.forEach(t => tags.add(t)));
    return Array.from(tags).sort();
  }, [block.projects]);

  const handleToggleTag = (tag: string) => {
    setActiveTags(prev => {
      const newTags = new Set(prev);
      if (newTags.has(tag)) {
        newTags.delete(tag);
      } else {
        newTags.add(tag);
      }
      return newTags;
    });
  };

  const filteredProjects = useMemo(() => {
    return block.projects.filter(p => {
      const searchMatch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.subdomain.toLowerCase().includes(searchQuery.toLowerCase());
      const tagsMatch = activeTags.size === 0 || p.tags.some(t => activeTags.has(t));
      return searchMatch && tagsMatch;
    });
  }, [block.projects, searchQuery, activeTags]);

  const handleProjectStatusChange = useCallback((projectId: string, newStatus: ProjectPipelineStatus) => {
    const updated = block.projects.map(p => 
        p.id === projectId ? { ...p, pipelineStatus: newStatus, lastUpdated: 'agora mesmo' } : p
    );
    onUpdateProjects(updated);
  }, [block.projects, onUpdateProjects]);

  return (
    <div className="min-h-screen bg-black text-gray-100 p-4 sm:p-6 lg:p-8">
      <header className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="flex items-center gap-2 p-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors">
            <ArrowLeftIcon />
          </button>
          <h1 className="text-3xl font-bold text-white">{block.name}</h1>
        </div>
      </header>
      
      <main>
        <div className="mb-8 p-4 bg-gray-950 border border-gray-800 rounded-xl">
          <div className="flex flex-col md:flex-row gap-4">
              <input 
                  type="text"
                  placeholder="Buscar neste bloco..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full md:w-1/3 px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition-all"
              />
              <div className="flex-grow flex flex-wrap items-center gap-2">
                  {allTags.map(tag => (
                      <button 
                          key={tag}
                          onClick={() => handleToggleTag(tag)}
                          className={`px-3 py-1 text-sm font-medium rounded-full transition-colors duration-200 ${activeTags.has(tag) ? 'bg-indigo-600 text-white' : 'bg-gray-700 hover:bg-gray-600 text-gray-300'}`}
                      >
                          {tag}
                      </button>
                  ))}
              </div>
              <div className="flex items-center gap-2 p-1 bg-gray-800 rounded-lg">
                  <button title="Visualizar Kanban" onClick={() => setViewMode('kanban')} className={`p-2 rounded-md ${viewMode === 'kanban' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:bg-gray-700'}`}><KanbanIcon /></button>
                  <button title="Visualizar Grade" onClick={() => setViewMode('grid')} className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:bg-gray-700'}`}><ViewGridIcon /></button>
                  <button title="Visualizar Lista" onClick={() => setViewMode('list')} className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:bg-gray-700'}`}><ViewListIcon /></button>
              </div>
          </div>
        </div>

        {viewMode === 'kanban' ? (
            <div>
                <div className="flex flex-wrap items-center gap-2 mb-6 p-2 bg-gray-900 border border-gray-800 rounded-lg">
                    {pipelineStatuses.map(status => (
                        <button
                            key={status}
                            onClick={() => setSelectedKanbanStatus(status)}
                            className={`px-4 py-2 text-sm font-semibold rounded-md transition-all duration-200 ${selectedKanbanStatus === status ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-300 hover:bg-gray-800'}`}
                        >
                            {status}
                        </button>
                    ))}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {filteredProjects
                        .filter(p => p.pipelineStatus === selectedKanbanStatus)
                        .map(project => (
                            <ProjectGridCard 
                                key={project.id} 
                                project={project} 
                                onViewDetails={() => onSelectProject(project)}
                                onStatusChange={(newStatus) => handleProjectStatusChange(project.id, newStatus)}
                            />
                        ))
                    }
                </div>
            </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredProjects.map(project => (
              <ProjectGridCard 
                key={project.id} 
                project={project} 
                onViewDetails={() => onSelectProject(project)}
                onStatusChange={(newStatus) => handleProjectStatusChange(project.id, newStatus)}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredProjects.map(project => (
                 <ProjectListItem 
                    key={project.id} 
                    project={project} 
                    onViewDetails={() => onSelectProject(project)}
                    onStatusChange={(newStatus) => handleProjectStatusChange(project.id, newStatus)}
                 />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default BlockDetailPage;
