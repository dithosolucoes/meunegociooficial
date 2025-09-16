import { ProjectPipelineStatus } from '../types';

const workflowTransitions: Record<ProjectPipelineStatus, ProjectPipelineStatus[]> = {
    [ProjectPipelineStatus.ENVIAR_AO_CLIENTE]: [
        ProjectPipelineStatus.EM_REVISAO,
        ProjectPipelineStatus.AGUARDANDO_DADOS_CLIENTE,
        ProjectPipelineStatus.REMARKETING,
    ],
    [ProjectPipelineStatus.EM_REVISAO]: [
        ProjectPipelineStatus.ENVIAR_AO_CLIENTE,
    ],
    [ProjectPipelineStatus.AGUARDANDO_DADOS_CLIENTE]: [
        ProjectPipelineStatus.AGUARDANDO_PAGAMENTO,
    ],
    [ProjectPipelineStatus.AGUARDANDO_PAGAMENTO]: [
        ProjectPipelineStatus.CLIENTES,
    ],
    [ProjectPipelineStatus.REMARKETING]: [
        ProjectPipelineStatus.ENVIAR_AO_CLIENTE, // Re-engage
    ],
    [ProjectPipelineStatus.CLIENTES]: [], // Terminal state
};

export const getValidNextStatuses = (currentStatus: ProjectPipelineStatus): ProjectPipelineStatus[] => {
    return workflowTransitions[currentStatus] || [];
};
