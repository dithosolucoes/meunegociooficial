import React from 'react';
import { TableIcon } from '../../icons/TableIcon';

const TableView: React.FC = () => {
    return (
        <div className="flex items-center justify-center py-16">
            <div className="text-center p-12 bg-gray-950 border border-gray-800 rounded-xl max-w-2xl">
                <TableIcon className="mx-auto h-16 w-16 text-indigo-500" />
                <h2 className="mt-4 text-3xl font-bold text-white">Visualização em Tabela</h2>
                <p className="mt-3 text-lg text-gray-400">Em breve: Uma visualização densa e poderosa, similar a uma planilha, para analisar e gerenciar grandes volumes de dados de mercado com filtros e ordenação.</p>
            </div>
        </div>
    );
};

export default TableView;