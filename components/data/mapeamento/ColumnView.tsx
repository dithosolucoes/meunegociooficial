import React, { useState, useRef, useEffect } from 'react';
import { mercados as initialMercados } from '../../../data/mercados';
import { PlusIcon } from '../../icons/PlusIcon';
import { DotsVerticalIcon } from '../../icons/DotsVerticalIcon';
import { PencilIcon } from '../../icons/PencilIcon';
import { TrashIcon } from '../../icons/TrashIcon';

interface ActionMenuProps {
  onEdit: () => void;
  onDelete: () => void;
}

const ActionMenu: React.FC<ActionMenuProps> = ({ onEdit, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button onClick={(e) => { e.stopPropagation(); setIsOpen(!isOpen); }} className="p-1 rounded-full text-gray-500 hover:bg-gray-700 hover:text-white">
        <DotsVerticalIcon className="w-5 h-5" />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-1 w-32 origin-top-right bg-gray-900 border border-gray-700 rounded-md shadow-lg z-10">
          <div className="py-1">
            <button onClick={onEdit} className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-gray-200 hover:bg-indigo-600 hover:text-white">
              <PencilIcon /> Editar
            </button>
            <button onClick={onDelete} className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-red-600 hover:text-white">
              <TrashIcon /> Excluir
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const ColumnView: React.FC = () => {
    const [mercados, setMercados] = useState(initialMercados);
    const [selectedMercadoId, setSelectedMercadoId] = useState<string | null>(null);
    const [selectedSegmentoId, setSelectedSegmentoId] = useState<string | null>(null);

    const handleSelectMercado = (mercado: string) => {
        setSelectedMercadoId(mercado);
        setSelectedSegmentoId(null); // Resetar seleção de segmento
    };

    const handleAddMercado = () => {
        const newMercadoName = prompt("Digite o nome do novo mercado:");
        if (newMercadoName && !mercados.includes(newMercadoName)) {
            setMercados([...mercados, newMercadoName]);
        } else if (newMercadoName) {
            alert("Este mercado já existe.");
        }
    };
    
    return (
        <div className="flex gap-4 h-[calc(100vh-250px)]">
            {/* Coluna de Mercados */}
            <div className="flex-1 max-w-sm bg-gray-950 border border-gray-800 rounded-xl flex flex-col">
                <div className="p-4 border-b border-gray-800">
                    <h3 className="text-lg font-bold text-white">Mercados</h3>
                    <p className="text-xs text-gray-500">{mercados.length} itens</p>
                </div>
                <div className="flex-1 overflow-y-auto p-2 space-y-1">
                    {mercados.map((mercado) => (
                        <button
                            key={mercado}
                            onClick={() => handleSelectMercado(mercado)}
                            className={`w-full text-left p-3 text-sm font-medium rounded-lg flex justify-between items-center transition-colors ${
                                selectedMercadoId === mercado ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:bg-gray-800'
                            }`}
                        >
                            <span>{mercado}</span>
                            {selectedMercadoId === mercado && (
                                <ActionMenu onEdit={() => alert('Editar')} onDelete={() => alert('Excluir')} />
                            )}
                        </button>
                    ))}
                </div>
                <div className="p-2 border-t border-gray-800">
                    <button onClick={handleAddMercado} className="w-full flex items-center justify-center gap-2 p-2 text-sm font-semibold text-indigo-300 hover:bg-indigo-900/50 rounded-lg transition-colors">
                        <PlusIcon /> Adicionar Mercado
                    </button>
                </div>
            </div>

            {/* Coluna de Segmentos */}
            {selectedMercadoId && (
                <div className="flex-1 max-w-sm bg-gray-950 border border-gray-800 rounded-xl flex flex-col">
                    <div className="p-4 border-b border-gray-800">
                        <h3 className="text-lg font-bold text-white">Segmentos</h3>
                        <p className="text-xs text-gray-500">Dentro de "{selectedMercadoId}"</p>
                    </div>
                     <div className="flex-1 overflow-y-auto p-2">
                        {/* Conteúdo dos segmentos aqui */}
                         <div className="text-center text-gray-500 mt-8 text-sm">Nenhum segmento adicionado.</div>
                    </div>
                    <div className="p-2 border-t border-gray-800">
                        <button className="w-full flex items-center justify-center gap-2 p-2 text-sm font-semibold text-indigo-300 hover:bg-indigo-900/50 rounded-lg transition-colors">
                            <PlusIcon /> Adicionar Segmento
                        </button>
                    </div>
                </div>
            )}
            
            {/* Coluna de Empresas/Profissionais */}
            {selectedSegmentoId && (
                 <div className="flex-1 max-w-sm bg-gray-950 border border-gray-800 rounded-xl flex flex-col">
                    <div className="p-4 border-b border-gray-800">
                        <h3 className="text-lg font-bold text-white">Empresas / Profissionais</h3>
                        <p className="text-xs text-gray-500">Dentro de "{selectedSegmentoId}"</p>
                    </div>
                     <div className="flex-1 overflow-y-auto p-2">
                         <div className="text-center text-gray-500 mt-8 text-sm">Nenhum item adicionado.</div>
                    </div>
                    <div className="p-2 border-t border-gray-800">
                        <button className="w-full flex items-center justify-center gap-2 p-2 text-sm font-semibold text-indigo-300 hover:bg-indigo-900/50 rounded-lg transition-colors">
                            <PlusIcon /> Adicionar Item
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ColumnView;