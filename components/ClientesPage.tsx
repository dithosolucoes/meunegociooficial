import React, { useState, useMemo } from 'react';
import { Project, Client } from '../types';
import ContactDetailContent from './LeadDetailPage';

interface ClientesPageProps {
  projects: Project[];
}

interface ClientWithProject extends Client {
    project: {
        id: string;
        name: string;
    }
}

const ClientesPage: React.FC<ClientesPageProps> = ({ projects }) => {
    const [selectedClientId, setSelectedClientId] = useState<string | null>(null);

    const allClients = useMemo((): ClientWithProject[] => {
        return projects.flatMap(p => 
            p.clients.map(c => ({
                ...c,
                project: { id: p.id, name: p.name }
            }))
        );
    }, [projects]);
    
    React.useEffect(() => {
        if (allClients.length > 0 && !allClients.some(c => c.id === selectedClientId)) {
            setSelectedClientId(allClients[0]?.id || null);
        }
    }, [allClients, selectedClientId]);

    const selectedClientData = useMemo(() => {
        if (!selectedClientId) return null;
        const client = allClients.find(c => c.id === selectedClientId);
        if (!client) return null;
        const project = projects.find(p => p.id === client.project.id);
        if (!project) return null;
        return { client, project };
    }, [selectedClientId, allClients, projects]);

    return (
        <div className="flex gap-6 h-[calc(100vh-11rem)]">
            {/* Sidebar de Clientes */}
            <aside className="w-full max-w-xs bg-gray-950 border border-gray-800 rounded-xl flex flex-col">
                <div className="p-4 border-b border-gray-800">
                    <h3 className="text-lg font-bold text-white">Todos os Clientes</h3>
                    <p className="text-xs text-gray-500">{allClients.length} no total</p>
                </div>
                <div className="flex-1 overflow-y-auto p-2 space-y-1">
                    {allClients.map(client => (
                        <button
                            key={client.id}
                            onClick={() => setSelectedClientId(client.id)}
                            className={`w-full text-left p-2 rounded-md transition-colors ${selectedClientId === client.id ? 'bg-indigo-600 text-white' : 'hover:bg-gray-800'}`}
                        >
                            <p className="font-semibold text-sm truncate">{client.name}</p>
                            <p className={`text-xs truncate ${selectedClientId === client.id ? 'text-indigo-200' : 'text-gray-400'}`}>{client.project.name}</p>
                        </button>
                    ))}
                     {allClients.length === 0 && (
                        <div className="text-center text-gray-500 mt-8 text-sm px-4">Nenhum cliente ativo. Converta um lead para começar.</div>
                    )}
                </div>
            </aside>

            {/* Conteúdo Principal */}
            <main className="flex-1 bg-gray-950 border border-gray-800 rounded-xl p-6 overflow-y-auto">
                {selectedClientData ? (
                   <ContactDetailContent 
                        type="client"
                        contact={selectedClientData.client}
                        project={selectedClientData.project}
                   />
                ) : (
                    <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
                        <h2 className="text-xl font-semibold">Nenhum Cliente Selecionado</h2>
                        <p>Clique em um cliente na lista à esquerda para ver os detalhes.</p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default ClientesPage;