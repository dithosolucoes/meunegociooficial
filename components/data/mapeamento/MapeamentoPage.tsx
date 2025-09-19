import React, { useState } from 'react';
import { ColumnsIcon } from '../../icons/ColumnsIcon';
import { MindMapIcon } from '../../icons/MindMapIcon';
import { TableIcon } from '../../icons/TableIcon';
import ColumnView from './ColumnView';
import MapView from './MapView';
import TableView from './TableView';

type ViewMode = 'columns' | 'map' | 'table';

const MapeamentoPage: React.FC = () => {
    const [viewMode, setViewMode] = useState<ViewMode>('columns');

    return (
        <div>
            <div className="mb-8 p-4 bg-gray-950 border border-gray-800 rounded-xl">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                    <h2 className="text-xl font-bold text-white">Mapa de Oportunidades</h2>
                    <div className="flex items-center gap-2 p-1 bg-gray-800 rounded-lg">
                        <button 
                            title="Visualizar em Colunas" 
                            onClick={() => setViewMode('columns')} 
                            className={`p-2 rounded-md ${viewMode === 'columns' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:bg-gray-700'}`}
                        >
                            <ColumnsIcon />
                        </button>
                        <button 
                            title="Visualizar em Mapa Mental" 
                            onClick={() => setViewMode('map')} 
                            className={`p-2 rounded-md ${viewMode === 'map' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:bg-gray-700'}`}
                        >
                            <MindMapIcon />
                        </button>
                        <button 
                            title="Visualizar em Tabela" 
                            onClick={() => setViewMode('table')} 
                            className={`p-2 rounded-md ${viewMode === 'table' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:bg-gray-700'}`}
                        >
                            <TableIcon />
                        </button>
                    </div>
                </div>
            </div>

            <main>
                {viewMode === 'columns' && <ColumnView />}
                {viewMode === 'map' && <MapView />}
                {viewMode === 'table' && <TableView />}
            </main>
        </div>
    );
};

export default MapeamentoPage;