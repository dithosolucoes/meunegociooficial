import React, { useMemo } from 'react';
import { ProjectBlock, ProjectPipelineStatus } from '../types';

interface ProjectBlockCardProps {
    block: ProjectBlock;
    onSelectBlock: () => void;
}

const FunnelStatusIndicator: React.FC<{ projects: ProjectBlock['projects'] }> = ({ projects }) => {
    const statusCounts = useMemo(() => {
        const counts: { [key in ProjectPipelineStatus]?: number } = {
            [ProjectPipelineStatus.ENVIAR_AO_CLIENTE]: 0,
            [ProjectPipelineStatus.AGUARDANDO_DADOS_CLIENTE]: 0,
            [ProjectPipelineStatus.AGUARDANDO_PAGAMENTO]: 0,
            [ProjectPipelineStatus.CLIENTES]: 0,
            [ProjectPipelineStatus.EM_REVISAO]: 0,
            [ProjectPipelineStatus.REMARKETING]: 0,
        };
        projects.forEach(p => {
            if (p.pipelineStatus in counts) {
                counts[p.pipelineStatus]!++;
            }
        });
        return counts;
    }, [projects]);

    const total = projects.length;
    if (total === 0) return <div className="h-2 bg-gray-700 rounded-full"></div>;
    
    const segments = [
        { status: ProjectPipelineStatus.CLIENTES, color: 'bg-green-500' },
        { status: ProjectPipelineStatus.AGUARDANDO_PAGAMENTO, color: 'bg-yellow-500' },
        { status: ProjectPipelineStatus.AGUARDANDO_DADOS_CLIENTE, color: 'bg-teal-500' },
        { status: ProjectPipelineStatus.EM_REVISAO, color: 'bg-blue-500' },
        { status: ProjectPipelineStatus.ENVIAR_AO_CLIENTE, color: 'bg-sky-500' },
        { status: ProjectPipelineStatus.REMARKETING, color: 'bg-red-500' },
    ];

    return (
        <div className="flex h-2 rounded-full overflow-hidden bg-gray-800">
            {segments.map(segment => {
                const count = statusCounts[segment.status] || 0;
                const percentage = (count / total) * 100;
                return percentage > 0 && (
                    <div
                        key={segment.status}
                        className={`${segment.color}`}
                        style={{ width: `${percentage}%` }}
                        title={`${segment.status}: ${count}`}
                    ></div>
                );
            })}
        </div>
    );
};


const ProjectBlockCard: React.FC<ProjectBlockCardProps> = ({ block, onSelectBlock }) => {
    const { name, projects } = block;

    const activeProjects = useMemo(() => {
        return projects.filter(p => p.pipelineStatus === ProjectPipelineStatus.CLIENTES).length;
    }, [projects]);

    const conversionRate = useMemo(() => {
        const consideredProjects = projects.filter(p => p.pipelineStatus !== ProjectPipelineStatus.REMARKETING).length;
        if (consideredProjects === 0) return 0;
        return (activeProjects / consideredProjects) * 100;
    }, [projects, activeProjects]);

    return (
        <div
            onClick={onSelectBlock}
            className="group flex flex-col justify-between bg-gray-950 border border-gray-800 rounded-xl p-5 shadow-lg hover:shadow-[0_0_15px_rgba(79,70,229,0.4)] hover:border-indigo-700 transition-all duration-300 ease-in-out transform hover:-translate-y-1 cursor-pointer"
        >
            <div>
                <h3 className="text-2xl font-bold text-white mb-1">{name}</h3>
                <p className="text-sm text-gray-400 mb-6">{projects.length} Sites</p>

                <div className="space-y-4">
                    <div className="flex justify-between items-baseline">
                        <span className="text-gray-300">Taxa de Conversão</span>
                        <span className="text-2xl font-bold text-green-400">{conversionRate.toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between items-baseline">
                        <span className="text-gray-300">Projetos Ativos</span>
                        <span className="text-2xl font-bold text-indigo-400">{activeProjects}</span>
                    </div>
                </div>
            </div>
            <div className="mt-6">
                <span className="text-xs text-gray-500 mb-1 block">Status do Funil</span>
                <FunnelStatusIndicator projects={projects} />
            </div>
        </div>
    );
};

export default ProjectBlockCard;