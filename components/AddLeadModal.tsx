import React, { useState } from 'react';
import { SpinnerIcon } from './icons/SpinnerIcon';
import { Project } from '../types';

interface AddLeadModalProps {
  onClose: () => void;
  onAddLead: (name: string, area: string, projectId: string) => void;
  projects: Project[];
}

const AddLeadModal: React.FC<AddLeadModalProps> = ({ onClose, onAddLead, projects }) => {
  const [leadName, setLeadName] = useState('');
  const [leadArea, setLeadArea] = useState('');
  const [selectedProjectId, setSelectedProjectId] = useState<string>(projects[0]?.id || '');
  const [isCreating, setIsCreating] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (leadName.trim() && leadArea.trim() && selectedProjectId) {
      setIsCreating(true);
      onAddLead(leadName.trim(), leadArea.trim(), selectedProjectId);
      setTimeout(() => {
        onClose();
      }, 300);
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div 
        className="bg-gray-950 border border-gray-800 rounded-xl shadow-2xl shadow-indigo-500/10 w-full max-w-lg p-8 m-4 transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-white mb-6">Adicionar Novo Lead</h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <label htmlFor="projectId" className="block text-sm font-medium text-gray-300 mb-2">Associar ao Projeto</label>
            <select
              id="projectId"
              value={selectedProjectId}
              onChange={(e) => setSelectedProjectId(e.target.value)}
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition-all"
              required
            >
              {projects.length === 0 ? (
                <option disabled>Nenhum projeto disponível</option>
              ) : (
                projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)
              )}
            </select>
          </div>

          <div>
            <label htmlFor="leadName" className="block text-sm font-medium text-gray-300 mb-2">Nome do Lead</label>
            <input
              id="leadName"
              type="text"
              value={leadName}
              onChange={(e) => setLeadName(e.target.value)}
              placeholder="Ex: Dr. Ricardo"
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition-all"
              required
            />
          </div>
           <div>
            <label htmlFor="leadArea" className="block text-sm font-medium text-gray-300 mb-2">Área de Atuação</label>
            <input
              id="leadArea"
              type="text"
              value={leadArea}
              onChange={(e) => setLeadArea(e.target.value)}
              placeholder="Ex: Ortodontia"
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition-all"
              required
            />
          </div>

          <div className="flex justify-end gap-4 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 bg-gray-700 text-gray-200 font-semibold rounded-lg hover:bg-gray-600 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={!leadName.trim() || !leadArea.trim() || !selectedProjectId || isCreating}
              className="px-6 py-2 bg-gradient-to-br from-indigo-600 to-indigo-700 text-white font-semibold rounded-lg hover:from-indigo-500 hover:to-indigo-600 disabled:bg-gray-500 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed transition-colors flex items-center"
            >
              {isCreating && <SpinnerIcon />}
              {isCreating ? 'Adicionando...' : 'Adicionar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLeadModal;
