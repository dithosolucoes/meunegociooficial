
import React, { useState, useCallback, useMemo } from 'react';
import { Project, DeploymentStatus, ProjectPipelineStatus, ProjectBlock } from '../types';
import NewProjectModal from './NewProjectModal';
import { AnalyzedData, analyzeSite } from '../services/siteAnalyzer';
import ProjectGridCard from './ProjectGridCard';
import ProjectListItem from './ProjectListItem';
import ProjectBlockCard from './ProjectBlockCard';
import { ViewGridIcon } from './icons/ViewGridIcon';
import { ViewListIcon } from './icons/ViewListIcon';
import { KanbanIcon } from './icons/KanbanIcon';
import { BlocksIcon } from './icons/BlocksIcon';
import { groupProjectsIntoBlocks } from '../utils/projectUtils';
import ProjectDetailPage from './ProjectDetailPage';
import BlockDetailPage from './BlockDetailPage';
import Header from './Header';
import DataPage from './data/DataPage';

const getDynamicSubdomain = (name: string) => {
    const sanitizedName = name.toLowerCase().replace(/\s+/g, '-');
    // Em um ambiente de desenvolvimento local, hostname pode não ser o ideal,
    // mas em um ambiente de produção/preview (como AI Studio), ele funciona perfeitamente.
    const host = typeof window !== 'undefined' ? window.location.hostname : 'preview.app';
    return `${sanitizedName}.${host}`;
};


const initialProjects: Project[] = [
  { id: '1', name: 'Clinica OdontoPlus', subdomain: getDynamicSubdomain('odontoplus'), deploymentStatus: DeploymentStatus.LIVE, pipelineStatus: ProjectPipelineStatus.CLIENTES, lastUpdated: 'há 2 dias', thumbnailUrl: 'https://picsum.photos/seed/dentist/400/200', tags: ['Saúde', 'Dentista', 'HTML/CSS'], techStack: 'HTML/CSS/JS', contacts: { email: 'contato@odontoplus.com', phone: '(11) 98765-4321' } },
  { id: '2', name: 'Advocacia Martins & Filhos', subdomain: getDynamicSubdomain('martins-adv'), deploymentStatus: DeploymentStatus.LIVE, pipelineStatus: ProjectPipelineStatus.CLIENTES, lastUpdated: 'há 5 dias', thumbnailUrl: 'https://picsum.photos/seed/law/400/200', tags: ['Jurídico', 'Advocacia', 'React'], techStack: 'React', contacts: { email: 'contato@martins-adv.com' } },
  { id: '3', name: 'Landing Page - SaaS Launch', subdomain: getDynamicSubdomain('saas-promo'), deploymentStatus: DeploymentStatus.BUILDING, pipelineStatus: ProjectPipelineStatus.ENVIAR_AO_CLIENTE, lastUpdated: 'há 10 minutos', thumbnailUrl: 'https://picsum.photos/seed/saas/400/200', tags: ['Tecnologia', 'SaaS', 'Next.js'], techStack: 'Next.js', contacts: {} },
  { id: '4', name: 'Imobiliária Sonho Meu', subdomain: getDynamicSubdomain('imob-sonho'), deploymentStatus: DeploymentStatus.ERROR, pipelineStatus: ProjectPipelineStatus.REMARKETING, lastUpdated: 'há 1 hora', thumbnailUrl: 'https://picsum.photos/seed/imob/400/200', tags: ['Imobiliário', 'Corretora', 'HTML/CSS'], techStack: 'HTML/CSS/JS', contacts: { phone: '(21) 99999-8888' } },
  { id: '5', name: 'Restaurante Sabor Divino', subdomain: getDynamicSubdomain('sabor-divino'), deploymentStatus: DeploymentStatus.QUEUED, pipelineStatus: ProjectPipelineStatus.EM_REVISAO, lastUpdated: 'agora mesmo', thumbnailUrl: 'https://picsum.photos/seed/food/400/200', tags: ['Restaurante', 'Food', 'Vue.js'], techStack: 'Vue.js', contacts: { email: 'reserva@sabordivino.com' } },
  { id: '6', name: 'Portfolio Fotografia', subdomain: getDynamicSubdomain('photo-folio'), deploymentStatus: DeploymentStatus.LIVE, pipelineStatus: ProjectPipelineStatus.AGUARDANDO_PAGAMENTO, lastUpdated: 'há 1 dia', thumbnailUrl: 'https://picsum.photos/seed/photo/400/200', tags: ['Portfolio', 'Fotografia', 'Next.js'], techStack: 'Next.js', contacts: {email: 'contact@photo.com'} },
  { id: '7', name: 'E-commerce de Roupas', subdomain: getDynamicSubdomain('style-shop'), deploymentStatus: DeploymentStatus.LIVE, pipelineStatus: ProjectPipelineStatus.AGUARDANDO_DADOS_CLIENTE, lastUpdated: 'há 3 horas', thumbnailUrl: 'https://picsum.photos/seed/fashion/400/200', tags: ['E-commerce', 'Moda', 'React'], techStack: 'React', contacts: {email: 'support@style.com'} },
];

const pipelineStatuses = Object.values(ProjectPipelineStatus);

type ViewMode = 'blocks' | 'kanban' | 'grid' | 'list';
type CurrentView = 
  | { page: 'main' }
  | { page: 'project-detail', data: Project }
  | { page: 'block-detail', data: ProjectBlock };

type ActivePage = 'painel' | 'dados';

interface DashboardPageProps {
  onLogout: () => void;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ onLogout }) => {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTags, setActiveTags] = useState<Set<string>>(new Set());
  const [viewMode, setViewMode] = useState<ViewMode>('kanban');
  const [currentView, setCurrentView] = useState<CurrentView>({ page: 'main' });
  const [selectedKanbanStatus, setSelectedKanbanStatus] = useState<ProjectPipelineStatus>(pipelineStatuses[0]);
  const [activePage, setActivePage] = useState<ActivePage>('painel');


  const allTags = useMemo(() => {
    const tags = new Set<string>();
    projects.forEach(p => p.tags.forEach(t => tags.add(t)));
    return Array.from(tags).sort();
  }, [projects]);
  
  const projectBlocks = useMemo(() => groupProjectsIntoBlocks(projects), [projects]);

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
    return projects.filter(p => {
      const searchMatch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.subdomain.toLowerCase().includes(searchQuery.toLowerCase());
      const tagsMatch = activeTags.size === 0 || p.tags.some(t => activeTags.has(t));
      return searchMatch && tagsMatch;
    });
  }, [projects, searchQuery, activeTags]);

  const handleProjectStatusChange = useCallback((projectId: string, newStatus: ProjectPipelineStatus) => {
    setProjects(prevProjects => 
        prevProjects.map(p => 
            p.id === projectId ? { ...p, pipelineStatus: newStatus, lastUpdated: 'agora mesmo' } : p
        )
    );
  }, []);

  const handleBlockProjectsUpdate = useCallback((updatedBlockProjects: Project[]) => {
      setProjects(currentProjects => {
          const updatedIds = new Set(updatedBlockProjects.map(p => p.id));
          const otherProjects = currentProjects.filter(p => !updatedIds.has(p.id));
          return [...otherProjects, ...updatedBlockProjects];
      });
  }, []);

  const handleNavigate = useCallback((page: ActivePage) => {
    if (currentView.page !== 'main') {
        setCurrentView({ page: 'main' });
    }
    setActivePage(page);
  }, [currentView.page]);

  const handleCreateProject = useCallback(async (projectName: string, files: FileList) => {
    const analyzedData: AnalyzedData = await analyzeSite(files);

    const newProject: Project = {
      id: new Date().toISOString(),
      name: projectName,
      subdomain: getDynamicSubdomain(projectName),
      deploymentStatus: DeploymentStatus.QUEUED,
      pipelineStatus: ProjectPipelineStatus.ENVIAR_AO_CLIENTE,
      lastUpdated: 'agora mesmo',
      thumbnailUrl: `https://picsum.photos/seed/${new Date().toISOString()}/400/200`,
      ...analyzedData
    };
    
    setProjects(prev => [newProject, ...prev]);
    
    setTimeout(() => {
       setProjects(prev => prev.map(p => p.id === newProject.id ? { ...p, deploymentStatus: DeploymentStatus.BUILDING } : p));
    }, 1000);

    setTimeout(() => {
       setProjects(prev => prev.map(p => p.id === newProject.id ? { ...p, deploymentStatus: DeploymentStatus.LIVE } : p));
    }, 5000);
  }, []);
  
  if (currentView.page === 'project-detail') {
    return <ProjectDetailPage project={currentView.data} onBack={() => setCurrentView({ page: 'main' })} />;
  }
  
  if (currentView.page === 'block-detail') {
      return <BlockDetailPage 
          block={currentView.data} 
          onBack={() => setCurrentView({ page: 'main' })}
          onSelectProject={(project) => setCurrentView({ page: 'project-detail', data: project })}
          onUpdateProjects={handleBlockProjectsUpdate}
      />;
  }

  return (
    <div className="min-h-screen bg-black text-gray-100">
      <Header
        onLogout={onLogout}
        onNewProjectClick={() => setIsModalOpen(true)}
        activePage={activePage}
        onNavigate={handleNavigate}
      />
      
      <div className="p-4 sm:p-6 lg:p-8">
         {activePage === 'painel' ? (
            <main>
              <div className="mb-8 p-4 bg-gray-950 border border-gray-800 rounded-xl">
                <div className="flex flex-col md:flex-row gap-4">
                    <input 
                        type="text"
                        placeholder="Buscar por nome ou subdomínio..."
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
                        <button title="Visualizar Blocos" onClick={() => setViewMode('blocks')} className={`p-2 rounded-md ${viewMode === 'blocks' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:bg-gray-700'}`}><BlocksIcon /></button>
                        <button title="Visualizar Kanban" onClick={() => setViewMode('kanban')} className={`p-2 rounded-md ${viewMode === 'kanban' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:bg-gray-700'}`}><KanbanIcon /></button>
                        <button title="Visualizar Grade" onClick={() => setViewMode('grid')} className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:bg-gray-700'}`}><ViewGridIcon /></button>
                        <button title="Visualizar Lista" onClick={() => setViewMode('list')} className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:bg-gray-700'}`}><ViewListIcon /></button>
                    </div>
                </div>
              </div>

              {viewMode === 'blocks' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {projectBlocks.map(block => (
                          <ProjectBlockCard key={block.id} block={block} onSelectBlock={() => setCurrentView({ page: 'block-detail', data: block })} />
                      ))}
                  </div>
              ) : viewMode === 'kanban' ? (
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
                                      onViewDetails={() => setCurrentView({ page: 'project-detail', data: project })}
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
                      onViewDetails={() => setCurrentView({ page: 'project-detail', data: project })}
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
                          onViewDetails={() => setCurrentView({ page: 'project-detail', data: project })} 
                          onStatusChange={(newStatus) => handleProjectStatusChange(project.id, newStatus)}
                      />
                  ))}
                </div>
              )}
            </main>
         ) : (
            <DataPage />
         )}
      </div>


      {isModalOpen && (
        <NewProjectModal
          onClose={() => setIsModalOpen(false)}
          onCreate={handleCreateProject}
        />
      )}
    </div>
  );
};

export default DashboardPage;
