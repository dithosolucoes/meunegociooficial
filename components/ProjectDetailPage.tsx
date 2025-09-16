import React from 'react';
import { Project } from '../types';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import { GlobeIcon } from './icons/GlobeIcon';
import { PencilIcon } from './icons/PencilIcon';

interface ProjectDetailPageProps {
    project: Project;
    onBack: () => void;
}

const DetailItem: React.FC<{ label: string; value?: string | null }> = ({ label, value }) => {
    if (!value) return null;
    return (
        <div>
            <p className="text-sm text-gray-400">{label}</p>
            <p className="text-white font-medium">{value}</p>
        </div>
    );
};

const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({ project, onBack }) => {
    return (
        <div className="min-h-screen bg-black text-gray-100 p-4 sm:p-6 lg:p-8">
             <header className="flex justify-between items-center mb-8">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-gray-300 font-semibold rounded-lg hover:bg-gray-700 transition-colors duration-300"
                >
                    <ArrowLeftIcon />
                    Voltar ao Painel
                </button>
            </header>

            <main className="max-w-4xl mx-auto">
                 <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-8">
                    <div>
                        <h1 className="text-4xl font-bold text-white">{project.name}</h1>
                        <a href={`https://${project.subdomain}`} target="_blank" rel="noopener noreferrer" className="text-lg text-indigo-400 hover:text-indigo-300 transition-colors">
                           {project.subdomain}
                        </a>
                    </div>
                     <div className="flex items-center gap-4">
                        <a href={`https://${project.subdomain}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-gray-300 font-semibold rounded-lg hover:bg-gray-700 transition-colors duration-300">
                            <GlobeIcon />
                            Link de Demonstração
                        </a>
                        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-500 transition-colors duration-300">
                            <PencilIcon />
                            Atualizar Dados
                        </button>
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="p-6 bg-gray-950 border border-gray-800 rounded-xl">
                        <h3 className="text-xl font-semibold text-white mb-4">Dados Analisados</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <DetailItem label="Tecnologia" value={project.techStack} />
                            <DetailItem label="E-mail de Contato" value={project.contacts.email} />
                            <DetailItem label="Telefone de Contato" value={project.contacts.phone} />
                            <DetailItem label="Status do Deploy" value={project.deploymentStatus} />
                            <DetailItem label="Status no Funil" value={project.pipelineStatus} />
                            <DetailItem label="Última Atualização" value={project.lastUpdated} />
                        </div>
                    </div>
                    
                    <div className="p-6 bg-gray-950 border border-gray-800 rounded-xl">
                         <h3 className="text-xl font-semibold text-white mb-4">Tags Identificadas</h3>
                         <div className="flex flex-wrap gap-2">
                            {project.tags.map(tag => (
                                <span key={tag} className="px-3 py-1 text-sm font-medium text-indigo-200 bg-indigo-900/60 rounded-full">{tag}</span>
                            ))}
                        </div>
                    </div>
                     {/* Placeholder for future components */}
                    <div className="p-6 bg-gray-950 border border-gray-800 rounded-xl">
                        <h3 className="text-xl font-semibold text-white">Logs do Deploy</h3>
                        <p className="text-gray-500 mt-2">Streaming de logs em breve...</p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ProjectDetailPage;
