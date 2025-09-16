import React, { useState, useCallback } from 'react';
import { UploadIcon } from './icons/UploadIcon';
import { SpinnerIcon } from './icons/SpinnerIcon';

interface NewProjectModalProps {
  onClose: () => void;
  onCreate: (projectName: string, files: FileList) => void;
}

const NewProjectModal: React.FC<NewProjectModalProps> = ({ onClose, onCreate }) => {
  const [projectName, setProjectName] = useState('');
  const [files, setFiles] = useState<FileList | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (projectName.trim() && files) {
      setIsUploading(true);
      // Simula delay de análise
      setTimeout(() => {
        onCreate(projectName.trim(), files);
        onClose();
      }, 1000);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFiles(e.target.files);
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
        <h2 className="text-2xl font-bold text-white mb-6">Implantar Novo Site</h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <label htmlFor="projectName" className="block text-sm font-medium text-gray-300 mb-2">Nome do Projeto</label>
            <input
              id="projectName"
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="Ex: Clinica OdontoPlus"
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Código do Projeto</label>
            <label htmlFor="file-upload" className="flex flex-col items-center justify-center w-full h-32 px-4 transition bg-gray-900 border-2 border-gray-700 border-dashed rounded-md appearance-none cursor-pointer hover:border-indigo-500 focus:outline-none">
              <span className="flex items-center space-x-2">
                <UploadIcon />
                <span className="font-medium text-gray-400">
                  {files ? `${files.length} arquivos selecionados` : 'Arraste ou clique para enviar uma pasta'}
                </span>
              </span>
              <input 
                id="file-upload" 
                name="file-upload" 
                type="file" 
                className="hidden" 
                onChange={handleFileChange}
                // @ts-ignore
                webkitdirectory="true"
                multiple
              />
            </label>
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
              disabled={!projectName.trim() || !files || isUploading}
              className="px-6 py-2 bg-gradient-to-br from-indigo-600 to-indigo-700 text-white font-semibold rounded-lg hover:from-indigo-500 hover:to-indigo-600 disabled:bg-gray-500 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed transition-colors flex items-center"
            >
              {isUploading && <SpinnerIcon />}
              {isUploading ? 'Analisando...' : 'Implantar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewProjectModal;