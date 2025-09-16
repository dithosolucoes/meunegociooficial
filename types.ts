export enum DeploymentStatus {
  QUEUED = 'Em Fila',
  BUILDING = 'Construindo',
  LIVE = 'Ativo',
  ERROR = 'Erro',
}

export enum ProjectPipelineStatus {
  ENVIAR_AO_CLIENTE = 'Enviar ao Cliente',
  AGUARDANDO_DADOS_CLIENTE = 'Aguardando Dados do Cliente',
  AGUARDANDO_PAGAMENTO = 'Aguardando Pagamento',
  CLIENTES = 'Clientes',
  EM_REVISAO = 'Em Revisão',
  REMARKETING = 'Remarketing',
}

export interface ProjectContact {
  email?: string;
  phone?: string;
}

export interface Project {
  id: string;
  name: string;
  subdomain: string;
  deploymentStatus: DeploymentStatus;
  pipelineStatus: ProjectPipelineStatus;
  lastUpdated: string;
  thumbnailUrl: string;
  tags: string[];
  techStack: string;
  contacts: ProjectContact;
}

export interface ProjectBlock {
  id: string;
  name: string;
  projects: Project[];
}
