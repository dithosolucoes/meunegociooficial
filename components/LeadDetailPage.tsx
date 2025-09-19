import React, { useState } from 'react';
import { Project, Lead, Client, DeploymentStatus, ClientStatus } from '../types';
import { GlobeIcon } from './icons/GlobeIcon';

interface ContactDetailContentProps {
    type: 'lead' | 'client';
    contact: Lead | Client;
    project: Project;
    onConvertLead?: (lead: Lead, project: Project) => void;
    onContactConverted?: () => void;
}

type ActiveTab = 'dossie' | 'diagnostico' | 'produtos';

const DeploymentStatusIndicator: React.FC<{ status: DeploymentStatus }> = ({ status }) => {
    const statusMap = {
        [DeploymentStatus.LIVE]: { text: 'Ativo', color: 'bg-green-500' },
        [DeploymentStatus.BUILDING]: { text: 'Construindo', color: 'bg-yellow-500' },
        [DeploymentStatus.QUEUED]: { text: 'Em Fila', color: 'bg-blue-500' },
        [DeploymentStatus.ERROR]: { text: 'Erro', color: 'bg-red-500' },
    };
    const { text, color } = statusMap[status] || statusMap[DeploymentStatus.QUEUED];

    return (
        <div className="flex items-center gap-2">
            <span className={`h-2.5 w-2.5 rounded-full ${color} animate-pulse`}></span>
            <span className="text-sm font-medium text-gray-300">{text}</span>
        </div>
    );
};

const ClientStatusIndicator: React.FC<{ status: ClientStatus }> = ({ status }) => {
    const statusMap = {
        [ClientStatus.ACTIVE]: { text: 'Ativo', color: 'bg-green-400/20 text-green-300 ring-green-400/30' },
    };
    const { text, color } = statusMap[status];

    return (
        <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ring-1 ring-inset ${color}`}>
            {text}
        </div>
    );
};

const ContactDetailContent: React.FC<ContactDetailContentProps> = ({ type, contact, project, onConvertLead, onContactConverted }) => {
    const [activeTab, setActiveTab] = useState<ActiveTab>('dossie');

    const handleConvertToClient = () => {
        if (type === 'lead' && onConvertLead && onContactConverted) {
            onConvertLead(contact as Lead, project);
            onContactConverted();
        }
    };
    
    const TabButton: React.FC<{ tabName: ActiveTab; label: string; }> = ({ tabName, label }) => (
        <button
            onClick={() => setActiveTab(tabName)}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === tabName ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-700/50'}`}
        >
            {label}
        </button>
    );

    return (
        <div className="min-h-full flex flex-col">
            <header className="flex justify-between items-start mb-6 pb-4 border-b border-gray-800">
                <div>
                    <h1 className="text-3xl font-bold text-white">{contact.name}</h1>
                    <p className="text-md text-indigo-400">{contact.area}</p>
                </div>
                {type === 'lead' ? (
                     <button onClick={handleConvertToClient} className="px-5 py-2 bg-gradient-to-br from-green-600 to-green-700 text-white font-bold rounded-lg hover:from-green-500 hover:to-green-600 transition-colors">
                        Converter em Cliente
                    </button>
                ) : (
                    <ClientStatusIndicator status={(contact as Client).status} />
                )}
            </header>

            <nav className="flex items-center gap-2 mb-6">
                <TabButton tabName="dossie" label="Dossiê" />
                <TabButton tabName="diagnostico" label="Diagnóstico" />
                <TabButton tabName="produtos" label="Produtos" />
            </nav>

            <main className="flex-1">
                {activeTab === 'dossie' && (
                    <div className="bg-gray-950 p-6 rounded-lg border border-gray-800">
                        <h3 className="text-xl font-semibold text-white mb-4">Dossiê do Contato</h3>
                        {contact.dossier ? (
                            <div className="text-gray-300 whitespace-pre-wrap font-mono text-sm prose prose-sm prose-invert max-w-none">
                                {contact.dossier}
                            </div>
                        ) : (
                            <p className="text-gray-500">Nenhum dossiê foi encontrado para este projeto.</p>
                        )}
                    </div>
                )}
                 {activeTab === 'diagnostico' && (
                    <div className="bg-gray-950 p-6 rounded-lg border border-gray-800">
                        <h3 className="text-xl font-semibold text-white mb-4">Diagnóstico</h3>
                        {contact.diagnosis ? (
                             <div className="text-gray-300 whitespace-pre-wrap font-mono text-sm prose prose-sm prose-invert max-w-none">
                                {contact.diagnosis}
                            </div>
                        ) : (
                            <p className="text-gray-500">Nenhum diagnóstico foi encontrado para este projeto.</p>
                        )}
                    </div>
                )}
                 {activeTab === 'produtos' && (
                     <div className="bg-gray-950 p-6 rounded-lg border border-gray-800">
                        <h3 className="text-xl font-semibold text-white mb-4">Produto Associado: Site</h3>
                        <div className="space-y-4">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Nome do Projeto</p>
                                <p className="text-lg font-semibold text-white">{project.name}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">Status</p>
                                <DeploymentStatusIndicator status={project.deploymentStatus} />
                            </div>
                             <div>
                                <p className="text-sm font-medium text-gray-500">Link</p>
                                <a href={`http://${project.subdomain}`} target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 flex items-center gap-2 transition-colors">
                                    <GlobeIcon />
                                    <span>{project.subdomain}</span>
                                </a>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default ContactDetailContent;