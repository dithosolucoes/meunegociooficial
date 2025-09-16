import React, { useState, useRef, useEffect } from 'react';
import { ProjectPipelineStatus } from '../types';
import { DotsVerticalIcon } from './icons/DotsVerticalIcon';
import { getValidNextStatuses } from '../utils/workflowUtils';

interface ProjectActionsDropdownProps {
  currentStatus: ProjectPipelineStatus;
  onStatusChange: (newStatus: ProjectPipelineStatus) => void;
}

const ProjectActionsDropdown: React.FC<ProjectActionsDropdownProps> = ({ currentStatus, onStatusChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const nextStatuses = getValidNextStatuses(currentStatus);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelectStatus = (status: ProjectPipelineStatus) => {
    onStatusChange(status);
    setIsOpen(false);
  };
  
  // Se não houver próximas ações válidas, não renderiza o botão.
  if (nextStatuses.length === 0) {
    return null;
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={(e) => { e.stopPropagation(); setIsOpen(!isOpen); }} 
        className="p-1 text-gray-400 rounded-full hover:bg-gray-700 hover:text-white focus:outline-none"
        aria-label="Mover projeto"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <DotsVerticalIcon className="w-5 h-5" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 origin-top-right bg-gray-900 border border-gray-700 rounded-md shadow-lg z-20">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <p className="px-4 py-2 text-xs text-gray-500">Mover para...</p>
            {nextStatuses.map(status => (
              <button
                key={status}
                onClick={(e) => { e.stopPropagation(); handleSelectStatus(status); }}
                className="w-full text-left block px-4 py-2 text-sm text-gray-200 hover:bg-indigo-600 hover:text-white"
                role="menuitem"
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectActionsDropdown;
