import React from 'react';
import { Project, DeploymentStatus, ProjectPipelineStatus } from '../types';
import { SpinnerIcon } from './icons/SpinnerIcon';
import ProjectActionsDropdown from './ProjectActionsDropdown';

interface ProjectListItemProps {
  project: Project;
  onViewDetails: () => void;
  onStatusChange: (newStatus: ProjectPipelineStatus) => void;
}

const statusStyles: Record<DeploymentStatus, { dot: string; text: string; }> = {
  [DeploymentStatus.LIVE]: { dot: 'bg-green-400', text: 'text-green-400' },
  [DeploymentStatus.BUILDING]: { dot: 'bg-yellow-400', text: 'text-yellow-400' },
  [DeploymentStatus.QUEUED]: { dot: 'bg-blue-400', text: 'text-blue-400' },
  [DeploymentStatus.ERROR]: { dot: 'bg-red-400', text: 'text-red-400' },
};

const ProjectListItem: React.FC<ProjectListItemProps> = ({ project, onViewDetails, onStatusChange }) => {
  const { name, subdomain, deploymentStatus, pipelineStatus, lastUpdated, tags } = project;
  const style = statusStyles[deploymentStatus];

  return (
    <div className="group grid grid-cols-12 gap-4 items-center p-4 bg-gray-950 border border-gray-800 hover:border-indigo-700 rounded-lg transition-all duration-200">
        <div className="col-span-3">
            <p className="font-bold text-white">{name}</p>
            <a href={`https://${subdomain}`} target="_blank" rel="noopener noreferrer" className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors">
                {subdomain}
            </a>
        </div>
        <div className="col-span-2">
            <div className={`inline-flex items-center gap-2 font-medium ${style.text}`}>
                <span className={`w-2 h-2 rounded-full ${style.dot}`}></span>
                {deploymentStatus === DeploymentStatus.BUILDING ? <SpinnerIcon /> : null}
                <span>{deploymentStatus}</span>
            </div>
        </div>
        <div className="col-span-3 flex flex-wrap gap-2">
           {tags.slice(0, 3).map(tag => (
            <span key={tag} className="px-2 py-1 text-xs font-medium text-indigo-200 bg-indigo-900/60 rounded-full">{tag}</span>
          ))}
        </div>
        <div className="col-span-2 text-sm text-gray-400">
            {lastUpdated}
        </div>
        <div className="col-span-2 flex items-center justify-end gap-4">
             <button onClick={onViewDetails} className="text-sm text-gray-400 hover:text-white transition-colors">Detalhes</button>
             <div onClick={(e) => e.stopPropagation()}>
                <ProjectActionsDropdown 
                  currentStatus={pipelineStatus} 
                  onStatusChange={onStatusChange} 
                />
             </div>
        </div>
    </div>
  );
};

export default ProjectListItem;
