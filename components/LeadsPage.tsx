import React, { useState, useMemo } from 'react';
import { Project, Lead } from '../types';
import ContactDetailContent from './LeadDetailPage';
import { PlusIcon } from './icons/PlusIcon';
import AddLeadModal from './AddLeadModal';

interface LeadsPageProps {
  projects: Project[];
  onAddLead: (name: string, area: string, projectId: string) => void;
  onConvertLead: (lead: Lead, project: Project) => void;
}

interface LeadWithProject extends Lead {
    project: {
        id: string;
        name: string;
    }
}

const LeadsPage: React.FC<LeadsPageProps> = ({ projects, onAddLead, onConvertLead }) => {
    const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const allLeads = useMemo((): LeadWithProject[] => {
        return projects.flatMap(p => 
            p.leads.map(l => ({
                ...l,
                project: { id: p.id, name: p.name }
            }))
        );
    }, [projects]);

    React.useEffect(() => {
        if (allLeads.length > 0 && !allLeads.some(l => l.id === selectedLeadId)) {
            setSelectedLeadId(allLeads[0]?.id || null);
        }
    }, [allLeads, selectedLeadId]);


    const selectedLeadData = useMemo(() => {
        if (!selectedLeadId) return null;
        const lead = allLeads.find(l => l.id === selectedLeadId);
        if (!lead) return null;
        const project = projects.find(p => p.id === lead.project.id);
        if (!project) return null;
        return { lead, project };
    }, [selectedLeadId, allLeads, projects]);

    const handleLeadConverted = () => {
        setSelectedLeadId(null);
    }

    return (
        <>
            <div className="flex gap-6 h-[calc(100vh-11rem)]">
                {/* Sidebar de Leads */}
                <aside className="w-full max-w-xs bg-gray-950 border border-gray-800 rounded-xl flex flex-col">
                    <div className="p-4 border-b border-gray-800 flex justify-between items-center">
                        <div>
                            <h3 className="text-lg font-bold text-white">Todos os Leads</h3>
                            <p className="text-xs text-gray-500">{allLeads.length} no total</p>
                        </div>
                        <button 
                            onClick={() => setIsModalOpen(true)}
                            className="p-2 bg-indigo-600/50 text-indigo-200 rounded-lg hover:bg-indigo-600 hover:text-white transition-colors"
                            title="Adicionar Novo Lead"
                        >
                            <PlusIcon />
                        </button>
                    </div>
                    <div className="flex-1 overflow-y-auto p-2 space-y-1">
                        {allLeads.map(lead => (
                            <button
                                key={lead.id}
                                onClick={() => setSelectedLeadId(lead.id)}
                                className={`w-full text-left p-2 rounded-md transition-colors ${selectedLeadId === lead.id ? 'bg-indigo-600 text-white' : 'hover:bg-gray-800'}`}
                            >
                                <p className="font-semibold text-sm truncate">{lead.name}</p>
                                <p className={`text-xs truncate ${selectedLeadId === lead.id ? 'text-indigo-200' : 'text-gray-400'}`}>{lead.project.name}</p>
                            </button>
                        ))}
                         {allLeads.length === 0 && (
                            <div className="text-center text-gray-500 mt-8 text-sm px-4">Nenhum lead encontrado. Adicione um novo para começar.</div>
                        )}
                    </div>
                </aside>

                {/* Conteúdo Principal */}
                <main className="flex-1 bg-gray-950 border border-gray-800 rounded-xl p-6 overflow-y-auto">
                    {selectedLeadData ? (
                        <ContactDetailContent 
                            type="lead"
                            contact={selectedLeadData.lead}
                            project={selectedLeadData.project}
                            onConvertLead={onConvertLead}
                            onContactConverted={handleLeadConverted}
                        />
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
                            <h2 className="text-xl font-semibold">Nenhum Lead Selecionado</h2>
                            <p>Clique em um lead na lista à esquerda ou adicione um novo lead para começar.</p>
                        </div>
                    )}
                </main>
            </div>
            {isModalOpen && (
                <AddLeadModal
                    onClose={() => setIsModalOpen(false)}
                    onAddLead={onAddLead}
                    projects={projects}
                />
            )}
        </>
    );
};

export default LeadsPage;