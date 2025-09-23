import React, { useState } from 'react';
import MercadoBlueprint from './conceitos/MercadoBlueprint';
import SegmentosBlueprint from './conceitos/SegmentosBlueprint';
import NichosBlueprint from './conceitos/NichosBlueprint';
import EmpresaBlueprint from './conceitos/EmpresaBlueprint';
import FuncionarioBlueprint from './conceitos/FuncionarioBlueprint';
import AutonomoBlueprint from './conceitos/AutonomoBlueprint';
import { PuzzlePieceIcon } from '../icons/PuzzlePieceIcon';
import { SparklesIcon } from '../icons/SparklesIcon';
import { BuildingOfficeIcon } from '../icons/BuildingOfficeIcon';
import { BriefcaseIcon } from '../icons/BriefcaseIcon';
import { IdentificationCardIcon } from '../icons/IdentificationCardIcon';

type Blueprint = 'mercado' | 'segmentos' | 'nichos' | 'empresa' | 'funcionario' | 'autonomo';

// FIX: Moved the local definition of GlobeAltIcon before its usage to fix a "used before declaration" error.
// The component was defined at the end of the file but used in the 'blueprints' array.
const GlobeAltIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18zM3.75 9h16.5M3.75 15h16.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 3.75a13.37 13.37 0 016 0M9 20.25a13.37 13.37 0 016 0" />
  </svg>
);

const blueprints: { id: Blueprint, name: string, icon: React.ReactNode }[] = [
    { id: 'mercado', name: 'Mercado', icon: <GlobeAltIcon className="w-5 h-5" /> },
    { id: 'segmentos', name: 'Segmentos', icon: <PuzzlePieceIcon /> },
    { id: 'nichos', name: 'Nichos', icon: <SparklesIcon className="w-5 h-5" /> },
    { id: 'empresa', name: 'Empresa (B2B)', icon: <BuildingOfficeIcon className="w-5 h-5" /> },
    { id: 'funcionario', name: 'Funcionário (B2E)', icon: <BriefcaseIcon className="w-5 h-5" /> },
    { id: 'autonomo', name: 'Autônomo', icon: <IdentificationCardIcon className="w-5 h-5" /> },
];

const DataPage: React.FC = () => {
    const [activeBlueprint, setActiveBlueprint] = useState<Blueprint>('mercado');

    const renderBlueprint = () => {
        switch (activeBlueprint) {
            case 'mercado': return <MercadoBlueprint />;
            case 'segmentos': return <SegmentosBlueprint />;
            case 'nichos': return <NichosBlueprint />;
            case 'empresa': return <EmpresaBlueprint />;
            case 'funcionario': return <FuncionarioBlueprint />;
            case 'autonomo': return <AutonomoBlueprint />;
            default: return <MercadoBlueprint />;
        }
    };
    
    return (
        <div className="flex flex-col lg:flex-row gap-8">
            <aside className="lg:w-64 lg:flex-shrink-0">
                <div className="p-4 bg-gray-950 border border-gray-800 rounded-xl">
                    <h2 className="text-lg font-bold text-white mb-4">Base de Conhecimento</h2>
                    <nav className="space-y-2">
                        {blueprints.map(bp => (
                             <button
                                key={bp.id}
                                onClick={() => setActiveBlueprint(bp.id)}
                                className={`w-full flex items-center gap-3 p-3 text-sm font-medium rounded-lg transition-colors text-left ${
                                    activeBlueprint === bp.id ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:bg-gray-800'
                                }`}
                            >
                                {bp.icon}
                                <span>{bp.name}</span>
                            </button>
                        ))}
                    </nav>
                </div>
            </aside>
            <main className="flex-1 min-w-0">
                {renderBlueprint()}
            </main>
        </div>
    );
};


export default DataPage;