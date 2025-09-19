import React, { useState, useCallback } from 'react';
import { Project, DeploymentStatus, Lead, ClientStatus, Client } from '../types';
import NewProjectModal from './NewProjectModal';
import { AnalyzedData, analyzeSite } from '../services/siteAnalyzer';
import Header from './Header';
import LeadsPage from './LeadsPage';
import ClientesPage from './ClientesPage';

const getDynamicSubdomain = (name: string) => {
    const sanitizedName = name.toLowerCase().replace(/\s+/g, '-');
    const host = typeof window !== 'undefined' ? window.location.hostname : 'preview.app';
    return `${sanitizedName}.${host}`;
};

const initialProjects: Project[] = [
  { 
    id: '1', name: 'Clinica OdontoPlus', subdomain: getDynamicSubdomain('odontoplus'), deploymentStatus: DeploymentStatus.LIVE, lastUpdated: 'há 2 dias', thumbnailUrl: 'https://picsum.photos/seed/dentist/400/200', tags: ['Saúde', 'Dentista', 'HTML/CSS'], techStack: 'HTML/CSS/JS', contacts: { email: 'contato@odontoplus.com', phone: '(11) 98765-4321' },
    dossier: "Dossiê para Clínicas Odontológicas\n- Mercado em expansão.\n- Concorrentes: Sorrix, OdontoCompany.\n- Oportunidade: Marketing digital focado em especialidades.",
    diagnosis: "Diagnóstico para OdontoPlus\n1. **Presença Online Fraca:** Site desatualizado.\n   - Ação: Criar um novo site moderno e responsivo.\n2. **Baixo Engajamento:** Pouca interação nas redes sociais.\n   - Ação: Iniciar campanhas de conteúdo sobre saúde bucal.",
    leads: [{id: 'l1', name: 'Dr. Ricardo', area: 'Ortodontia', dossier: "Dossiê para Clínicas Odontológicas...", diagnosis: "Diagnóstico para OdontoPlus..."}], 
    clients: [] 
  },
  { 
    id: '2', name: 'Advocacia Martins & Filhos', subdomain: getDynamicSubdomain('martins-adv'), deploymentStatus: DeploymentStatus.LIVE, lastUpdated: 'há 5 dias', thumbnailUrl: 'https://picsum.photos/seed/law/400/200', tags: ['Jurídico', 'Advocacia', 'React'], techStack: 'React', contacts: { email: 'contato@martins-adv.com' },
    dossier: "Dossiê para Advocacia\n- Setor competitivo.\n- Foco em especialização é chave.",
    diagnosis: "Diagnóstico para Advocacia Martins\n1. **Falta de autoridade online:** Poucos artigos ou publicações.\n   - Ação: Criar um blog com artigos sobre direito imobiliário.",
    leads: [], 
    clients: [{id: 'c1', name: 'Construtora Silva', area: 'Direito Imobiliário', status: ClientStatus.ACTIVE, dossier: "Dossiê para Advocacia...", diagnosis: "Diagnóstico para Advocacia Martins..." }] 
  },
  { 
    id: '3', name: 'Landing Page - SaaS Launch', subdomain: getDynamicSubdomain('saas-promo'), deploymentStatus: DeploymentStatus.BUILDING, lastUpdated: 'há 10 minutos', thumbnailUrl: 'https://picsum.photos/seed/saas/400/200', tags: ['Tecnologia', 'SaaS', 'Next.js'], techStack: 'Next.js', contacts: {},
    dossier: "Dossiê para Lançamento de SaaS\n- Foco em nicho é crucial para entrada.\n- Concorrentes: Grandes players já estabelecidos.",
    diagnosis: "Diagnóstico para SaaS Launch\n1. **Página de Vendas Ineficaz:** Baixa conversão.\n   - Ação: Realizar testes A/B com diferentes chamadas para ação (CTAs).",
    leads: [{id: 'l2', name: 'Startup Inova', area: 'Fintech', dossier: "Dossiê para Lançamento de SaaS...", diagnosis: "Diagnóstico para SaaS Launch..."}, {id: 'l3', name: 'Investidora Anjo', area: 'Venture Capital', dossier: "Dossiê para Lançamento de SaaS...", diagnosis: "Diagnóstico para SaaS Launch..."}], 
    clients: [] 
  },
];

type ActivePage = 'leads' | 'clientes';

interface DashboardPageProps {
  onLogout: () => void;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ onLogout }) => {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activePage, setActivePage] = useState<ActivePage>('leads');

  const handleUpdateProject = useCallback((updatedProject: Project) => {
    setProjects(currentProjects => 
      currentProjects.map(p => p.id === updatedProject.id ? updatedProject : p)
    );
  }, []);
  
  const handleAddLeadToProject = useCallback((leadName: string, leadArea: string, projectId: string) => {
      setProjects(currentProjects => {
          const projectIndex = currentProjects.findIndex(p => p.id === projectId);
          if (projectIndex === -1) return currentProjects;

          const targetProject = currentProjects[projectIndex];
          const newLead: Lead = {
              id: `l-${new Date().getTime()}`,
              name: leadName,
              area: leadArea,
              dossier: targetProject.dossier, // Herda do projeto
              diagnosis: targetProject.diagnosis, // Herda do projeto
          };

          const updatedProject = {
              ...targetProject,
              leads: [...targetProject.leads, newLead],
          };

          const newProjects = [...currentProjects];
          newProjects[projectIndex] = updatedProject;
          return newProjects;
      });
  }, []);

  const handleCreateProject = useCallback(async (projectName: string, files: FileList) => {
    const analyzedData: AnalyzedData = await analyzeSite(files);

    const newProject: Project = {
      id: new Date().toISOString(),
      name: projectName,
      subdomain: getDynamicSubdomain(projectName),
      deploymentStatus: DeploymentStatus.QUEUED,
      lastUpdated: 'agora mesmo',
      thumbnailUrl: `https://picsum.photos/seed/${new Date().toISOString()}/400/200`,
      leads: [],
      clients: [],
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
  
  const handleConvertLeadToClient = useCallback((lead: Lead, project: Project) => {
     setProjects(currentProjects => {
       const projectIndex = currentProjects.findIndex(p => p.id === project.id);
       if (projectIndex === -1) return currentProjects;

       const newClient: Client = {
         id: lead.id,
         name: lead.name,
         area: lead.area,
         status: ClientStatus.ACTIVE,
         dossier: lead.dossier, // Preserva o dossiê
         diagnosis: lead.diagnosis, // Preserva o diagnóstico
       };

       const updatedProject = {
         ...project,
         leads: project.leads.filter(l => l.id !== lead.id),
         clients: [...project.clients, newClient]
       };
       
       const newProjects = [...currentProjects];
       newProjects[projectIndex] = updatedProject;
       return newProjects;
     });
  }, []);


  return (
    <div className="min-h-screen bg-black text-gray-100">
      <Header
        onLogout={onLogout}
        onNewProjectClick={() => setIsModalOpen(true)}
        activePage={activePage}
        setActivePage={setActivePage}
      />
      
      <div className="p-4 sm:p-6 lg:p-8">
        {activePage === 'leads' && (
          <LeadsPage 
            projects={projects}
            onAddLead={handleAddLeadToProject}
            onConvertLead={handleConvertLeadToClient}
          />
        )}
        {activePage === 'clientes' && (
          <ClientesPage 
            projects={projects} 
          />
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