import React, { useState } from 'react';
import { BookOpenIcon } from '../icons/BookOpenIcon';
import { EyeIcon } from '../icons/EyeIcon';
import MercadoBlueprint from './conceitos/MercadoBlueprint';
import SegmentosBlueprint from './conceitos/SegmentosBlueprint';
import NichosBlueprint from './conceitos/NichosBlueprint';
import EmpresaBlueprint from './conceitos/EmpresaBlueprint';
import FuncionarioBlueprint from './conceitos/FuncionarioBlueprint';
import AutonomoBlueprint from './conceitos/AutonomoBlueprint';

type ActiveConcept = 'mercados' | 'segmentos' | 'nichos' | 'empresa' | 'funcionario' | 'autonomo';
type ViewType = 'cards' | 'list';

const DataPage: React.FC = () => {
    const [activeConcept, setActiveConcept] = useState<ActiveConcept>('mercados');
    const [viewType, setViewType] = useState<ViewType>('cards');

    const renderContent = () => {
        switch (activeConcept) {
            case 'mercados':
                return <MercadoBlueprint />;
            case 'segmentos':
                return <SegmentosBlueprint />;
            case 'nichos':
                return <NichosBlueprint />;
            case 'empresa':
                return <EmpresaBlueprint />;
            case 'funcionario':
                return <FuncionarioBlueprint />;
            case 'autonomo':
                return <AutonomoBlueprint />;
            default:
                return <p className="text-gray-400">Selecione um conceito para visualizar.</p>;
        }
    };
    
    const ConceptButton: React.FC<{ concept: ActiveConcept; label: string }> = ({ concept, label }) => (
         <button
            onClick={() => setActiveConcept(concept)}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                activeConcept === concept
                ? 'bg-indigo-600 text-white'
                : 'text-gray-300 hover:bg-gray-800'
            }`}
        >
            {label}
        </button>
    );

    return (
        <div>
            <div className="mb-8 p-4 bg-gray-950 border border-gray-800 rounded-xl">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-gray-400">
                           <BookOpenIcon />
                           <span className="font-semibold">Conceitos</span> 
                        </div>
                        <div className="h-6 w-px bg-gray-700"></div>
                        <nav className="flex items-center gap-2 flex-wrap">
                            <ConceptButton concept="mercados" label="Mercados" />
                            <ConceptButton concept="segmentos" label="Segmentos" />
                            <ConceptButton concept="nichos" label="Nichos" />
                            <div className="h-6 w-px bg-gray-700 mx-2"></div>
                             <div className="flex items-center gap-2 p-1 bg-gray-900 rounded-lg">
                                <ConceptButton concept="empresa" label="Empresa" />
                                <ConceptButton concept="funcionario" label="Funcionário" />
                                <ConceptButton concept="autonomo" label="Autônomo" />
                            </div>
                        </nav>
                    </div>
                    
                    <div className="flex items-center gap-2 p-1 bg-gray-800 rounded-lg">
                        <button title="Visualizar Cards" onClick={() => setViewType('cards')} className={`p-2 rounded-md ${viewType === 'cards' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:bg-gray-700'}`}><EyeIcon /></button>
                        {/* Add other view types later */}
                    </div>
                </div>
            </div>
            
            <main>
                {renderContent()}
            </main>
        </div>
    );
};

export default DataPage;