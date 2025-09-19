// FIX: Removed circular import of DeploymentStatus.
export enum DeploymentStatus {
  QUEUED = 'Em Fila',
  BUILDING = 'Construindo',
  LIVE = 'Ativo',
  ERROR = 'Erro',
}

export enum ClientStatus {
  ACTIVE = 'Ativo',
}

export interface ProjectContact {
  email?: string;
  phone?: string;
}

export interface Lead {
  id: string;
  name: string;
  area: string;
  dossier?: string;
  diagnosis?: string;
}

export interface Client {
  id: string;
  name: string;
  area: string;
  status: ClientStatus;
  dossier?: string;
  diagnosis?: string;
}

export interface Project {
  id: string;
  name: string;
  subdomain: string;
  deploymentStatus: DeploymentStatus;
  lastUpdated: string;
  thumbnailUrl: string;
  tags: string[];
  techStack: string;
  contacts: ProjectContact;
  dossier?: string;
  diagnosis?: string;
  leads: Lead[];
  clients: Client[];
}