import React, { useState, useCallback } from 'react';
import Header from './Header';
import MapeamentoPage from './data/mapeamento/MapeamentoPage';
import DataPage from './data/DataPage';
import NewProjectModal from './NewProjectModal';
import LeadsPage from './LeadsPage';
import ClientesPage from './ClientesPage';
import { Project, Lead, Client, DeploymentStatus, ClientStatus } from '../types';
import { analyzeSite } from '../services/siteAnalyzer';
import { v4 as uuidv4 } from 'uuid'; // Precisamos de um gerador de ID

type ActivePage = 'mapeamento' | 'conceitos' | 'prospeccao' | 'clientes';

interface DashboardPageProps {
  onLogout: () => void;
}

const initialProjects: Project[] = [
    // Dados de exemplo para iniciar a aplicação
    {
      id: 'proj-1',
      name: 'Site Clínica OdontoPlus',
      subdomain: 'odontoplus.mysite.app',
      deploymentStatus: DeploymentStatus.LIVE,
      lastUpdated: '2024-07-28',
      thumbnailUrl: 'https://picsum.photos/seed/odontoplus/400/300',
      tags: ['Saúde', 'React'],
      techStack: 'React',
      contacts: { email: 'contato@odontoplus.com' },
      dossier: 'Dossiê detalhado sobre a Clínica OdontoPlus...',
      diagnosis: 'Diagnóstico: Baixa presença online, oportunidade em SEO local.',
      leads: [
        { id: 'lead-1', name: 'Dr. Ricardo Mendes', area: 'Ortodontia', dossier: 'Dossiê do Dr. Ricardo...', diagnosis: 'Diagnóstico: Perfil profissional forte, mas sem site.' },
      ],
      clients: [
         { id: 'client-1', name: 'Laboratório Exame Certo', area: 'Análises Clínicas', status: ClientStatus.ACTIVE, dossier: 'Dossiê do Laboratório...', diagnosis: 'Diagnóstico: Site antigo, precisa de modernização.' }
      ],
    },
];


const DashboardPage: React.FC<DashboardPageProps> = ({ onLogout }) => {
  const [activePage, setActivePage] = useState<ActivePage>('mapeamento');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projects, setProjects] = useState<Project[]>(initialProjects);

  const handleCreateProject = useCallback(async (projectName: string, files: FileList) => {
    const analyzedData = await analyzeSite(files);
    const newProject: Project = {
      id: uuidv4(),
      name: projectName,
      subdomain: `${projectName.toLowerCase().replace(/\s+/g, '-')}.mysite.app`,
      deploymentStatus: DeploymentStatus.LIVE,
      lastUpdated: new Date().toISOString().split('T')[0],
      thumbnailUrl: `https://picsum.photos/seed/${uuidv4()}/400/300`,
      ...analyzedData,
      leads: [],
      clients: [],
    };
    setProjects(prev => [...prev, newProject]);
    setIsModalOpen(false);
  }, []);

  const handleAddLead = useCallback((name: string, area: string, projectId: string) => {
    const newLead: Lead = { id: uuidv4(), name, area };
    setProjects(prevProjects => prevProjects.map(p => {
        if (p.id === projectId) {
            // Se o projeto já tiver dossiê/diagnóstico, podemos herdá-lo para o lead
            newLead.dossier = p.dossier || `Dossiê inicial para ${name}`;
            newLead.diagnosis = p.diagnosis || `Diagnóstico inicial para ${name}`;
            return { ...p, leads: [...p.leads, newLead] };
        }
        return p;
    }));
  }, []);

  const handleConvertLead = useCallback((leadToConvert: Lead, project: Project) => {
     const newClient: Client = {
        id: leadToConvert.id, // Manter o mesmo ID para consistência
        name: leadToConvert.name,
        area: leadToConvert.area,
        status: ClientStatus.ACTIVE,
        dossier: leadToConvert.dossier,
        diagnosis: leadToConvert.diagnosis,
    };

    setProjects(prevProjects => prevProjects.map(p => {
        if (p.id === project.id) {
            const updatedLeads = p.leads.filter(l => l.id !== leadToConvert.id);
            const updatedClients = [...p.clients, newClient];
            return { ...p, leads: updatedLeads, clients: updatedClients };
        }
        return p;
    }));
  }, []);


  return (
    <div className="min-h-screen bg-black text-gray-100">
      <Header
        onLogout={onLogout}
        onNewProjectClick={() => setIsModalOpen(true)}
        activePage={activePage}
        setActivePage={setActivePage}
      />
      
      <main className="p-4 sm:p-6 lg:p-8">
        {activePage === 'mapeamento' && <MapeamentoPage />}
        {activePage === 'conceitos' && <DataPage />}
        {activePage === 'prospeccao' && <LeadsPage projects={projects} onAddLead={handleAddLead} onConvertLead={handleConvertLead} />}
        {activePage === 'clientes' && <ClientesPage projects={projects} />}
      </main>

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