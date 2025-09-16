import React from 'react';
import { Project, DeploymentStatus, ProjectPipelineStatus } from '../types';
import { GlobeIcon } from './icons/GlobeIcon';
import { SpinnerIcon } from './icons/SpinnerIcon';
import ProjectActionsDropdown from './ProjectActionsDropdown';

interface ProjectGridCardProps {
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

const ProjectGridCard: React.FC<ProjectGridCardProps> = ({ project, onViewDetails, onStatusChange }) => {
  const { name, subdomain, deploymentStatus, pipelineStatus, tags } = project;
  const style = statusStyles[deploymentStatus];

  return (
    <div 
      onClick={onViewDetails}
      className="group cursor-pointer flex flex-col justify-between bg-gray-950 border border-gray-800 rounded-xl p-4 shadow-lg hover:shadow-[0_0_15px_rgba(79,70,229,0.2)] hover:border-indigo-700 transition-all duration-300 ease-in-out"
    >
      <div>
        <div className="flex justify-between items-start">
            <div className="flex-1 min-w-0">
                 <h3 className="text-md font-bold text-white mb-1 truncate">{name}</h3>
            </div>
            <div onClick={(e) => e.stopPropagation()} className="flex-shrink-0">
                <ProjectActionsDropdown 
                  currentStatus={pipelineStatus} 
                  onStatusChange={onStatusChange} 
                />
            </div>
        </div>
         <a href={`https://${subdomain}`} onClick={(e) => e.stopPropagation()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm text-indigo-400 hover:text-indigo-300 transition-colors mb-3">
            <GlobeIcon />
            <span className="truncate">{subdomain}</span>
        </a>

        <div className="flex flex-wrap gap-1 mb-3">
          {tags.slice(0, 2).map(tag => (
            <span key={tag} className="px-1.5 py-0.5 text-[10px] font-medium text-indigo-200 bg-indigo-900/60 rounded-full">{tag}</span>
          ))}
        </div>
      </div>
      
      <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-800">
          <div className={`inline-flex items-center gap-2 text-xs font-medium ${style.text}`}>
              <span className={`w-2 h-2 rounded-full ${style.dot}`}></span>
              {deploymentStatus === DeploymentStatus.BUILDING ? <SpinnerIcon /> : null}
              {deploymentStatus}
          </div>
           <span className="text-xs text-gray-400 group-hover:text-white transition-colors">Detalhes</span>
      </div>
    </div>
  );
};

export default ProjectGridCard;
