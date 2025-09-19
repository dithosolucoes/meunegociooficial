import React from 'react';
import { MindMapIcon } from '../../icons/MindMapIcon';

const MapView: React.FC = () => {
    return (
        <div className="flex items-center justify-center py-16">
            <div className="text-center p-12 bg-gray-950 border border-gray-800 rounded-xl max-w-2xl">
                <MindMapIcon className="mx-auto h-16 w-16 text-indigo-500" />
                <h2 className="mt-4 text-3xl font-bold text-white">Visualização em Mapa Mental</h2>
                <p className="mt-3 text-lg text-gray-400">Em breve: Uma forma de explorar e conectar mercados e segmentos visualmente para descobrir oportunidades de forma intuitiva.</p>
            </div>
        </div>
    );
};

export default MapView;