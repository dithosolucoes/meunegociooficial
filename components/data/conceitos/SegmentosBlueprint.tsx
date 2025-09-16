
import React from 'react';
import { UsersIcon } from '../../icons/UsersIcon';
import { GlobeIcon } from '../../icons/GlobeIcon';
import { BrainCircuitIcon } from '../../icons/BrainCircuitIcon';
import { ChartBarIcon } from '../../icons/ChartBarIcon';
import { LeafIcon } from '../../icons/LeafIcon';
import { HeartIcon } from '../../icons/HeartIcon';

// --- Reusable Concept Card (Local to this file for simplicity) ---

interface ConceptCardProps {
    icon: React.ReactNode;
    title: string;
    subtitle: string;
    children: React.ReactNode;
    visualization: React.ReactNode;
}

const ConceptCard: React.FC<ConceptCardProps> = ({ icon, title, subtitle, children, visualization }) => (
    <div className="bg-gray-950 border border-gray-800 rounded-xl overflow-hidden flex flex-col lg:flex-row">
        <div className="p-6 flex-1 lg:w-1/2">
            <div className="flex items-center gap-3 mb-2">
                <div className="text-indigo-400">{icon}</div>
                <h3 className="text-xl font-bold text-white">{title}</h3>
            </div>
            <p className="font-semibold text-indigo-300 mb-4">{subtitle}</p>
            <div className="text-gray-400 text-sm space-y-3 prose prose-sm prose-invert max-w-none">
                {children}
            </div>
        </div>
        <div className="bg-black/20 p-6 flex flex-col items-center justify-center lg:w-1/2 min-h-[200px] lg:min-h-0">
            {visualization}
        </div>
    </div>
);


// --- VISUALIZATION COMPONENTS (Abstracted) ---

const DemografiaVis = () => (
    <div className="flex items-center justify-center gap-4" title="Representação de diferentes grupos demográficos">
        <div className="flex flex-col items-center gap-1">
            <div className="w-12 h-12 rounded-full bg-gray-800 border-2 border-gray-700 flex items-center justify-center"><UsersIcon /></div>
            <span className="text-xs text-gray-400">Idade</span>
        </div>
        <div className="flex flex-col items-center gap-1">
            <div className="w-12 h-12 rounded-full bg-gray-800 border-2 border-gray-700 flex items-center justify-center"><span className="font-bold text-lg text-indigo-400">$</span></div>
            <span className="text-xs text-gray-400">Renda</span>
        </div>
        <div className="flex flex-col items-center gap-1">
             <div className="w-12 h-12 rounded-full bg-gray-800 border-2 border-gray-700 flex items-center justify-center"><BookOpenIcon /></div>
            <span className="text-xs text-gray-400">Educação</span>
        </div>
    </div>
);

const BookOpenIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);


const GeografiaVis = () => (
     <div className="relative w-full max-w-xs h-32" title="Mapa estilizado com diferentes regiões">
        <svg className="w-full h-full" viewBox="0 0 100 50">
            <path d="M 5,25 C 20,5 40,5 50,20 C 60,35 80,35 95,20" stroke="#4f46e5" fill="none" strokeWidth="2" strokeDasharray="4 4" />
            <path d="M 10,45 C 25,30 45,30 55,40 C 65,50 85,50 90,40" stroke="#374151" fill="none" strokeWidth="1.5" />
            <circle cx="25" cy="15" r="3" fill="#3b82f6" />
            <circle cx="70" cy="28" r="4" fill="#10b981" />
            <circle cx="50" cy="42" r="2" fill="#f59e0b" />
        </svg>
    </div>
);

const PsicografiaVis = () => (
    <div className="flex items-center justify-center gap-4 text-center" title="Diagrama de valores, estilo de vida e personalidade">
        <div className="flex flex-col items-center gap-2">
            <BrainCircuitIcon className="w-10 h-10 text-indigo-400" />
            <span className="text-sm font-bold text-white">Psicografia</span>
        </div>
        <div className="text-3xl font-thin text-gray-600">→</div>
        <div className="flex flex-col gap-3">
             <div className="flex items-center gap-2 text-xs text-gray-300 bg-gray-800/50 px-2 py-1 rounded-md"><LeafIcon className="w-4 h-4 text-green-500" /><span>Valores (Sustentabilidade)</span></div>
             <div className="flex items-center gap-2 text-xs text-gray-300 bg-gray-800/50 px-2 py-1 rounded-md"><HeartIcon className="w-4 h-4 text-red-500" /><span>Estilo de Vida (Família)</span></div>
        </div>
    </div>
);

const ComportamentalVis = () => (
    <div className="w-full max-w-xs space-y-2" title="Funil da jornada do cliente">
        <div className="flex items-center gap-2">
            <div className="w-full h-8 bg-indigo-500 rounded-t-lg flex items-center justify-center text-xs font-bold text-white">CIENTE DO PROBLEMA</div>
        </div>
         <div className="flex items-center gap-2">
            <div className="w-10/12 mx-auto h-8 bg-indigo-600 flex items-center justify-center text-xs font-bold text-white">CONSIDERANDO SOLUÇÕES</div>
        </div>
        <div className="flex items-center gap-2">
            <div className="w-8/12 mx-auto h-8 bg-indigo-700 flex items-center justify-center text-xs font-bold text-white">PRONTO PARA COMPRAR</div>
        </div>
         <div className="flex items-center gap-2">
            <div className="w-6/12 mx-auto h-8 bg-green-500 rounded-b-lg flex items-center justify-center text-xs font-bold text-white">LEALDADE</div>
        </div>
    </div>
);


// --- MAIN COMPONENT ---

const SegmentosBlueprint: React.FC = () => {
    return (
        <div>
            <div className="mb-10 text-center">
                <h2 className="text-3xl font-bold text-white">A Arte da Segmentação de Mercado</h2>
                <p className="mt-2 text-lg text-gray-400">Além do "Público-Alvo": Como Dividir o Universo de Clientes em Grupos Conquistáveis.</p>
            </div>
            
            <div className="space-y-8">
                <ConceptCard 
                    icon={<UsersIcon />} 
                    title='Segmentação Demográfica (O "Quem")'
                    subtitle="QUEM são os seus clientes?"
                    visualization={<DemografiaVis />}
                >
                    <p>Este é o ponto de partida mais comum. Baseia-se em características estatísticas e objetivas da população para entender a "identidade" do seu cliente em termos de dados concretos.</p>
                    <p><strong>Variáveis Principais:</strong> Idade, gênero, renda, nível educacional, ocupação, estado civil.</p>
                </ConceptCard>

                <ConceptCard 
                    icon={<GlobeIcon />} 
                    title='Segmentação Geográfica (O "Onde")'
                    subtitle="ONDE eles estão localizados?"
                    visualization={<GeografiaVis />}
                >
                    <p>Agrupa clientes com base em sua localização física. Essencial para negócios locais e para estratégias globais que precisam de adaptação cultural, pois as necessidades podem variar drasticamente de um lugar para outro.</p>
                    <p><strong>Variáveis Principais:</strong> País, estado, cidade, zona climática, densidade populacional (urbano/rural), idioma.</p>
                </ConceptCard>
                
                <ConceptCard 
                    icon={<BrainCircuitIcon className="w-6 h-6" />} 
                    title='Segmentação Psicográfica (O "Porquê")'
                    subtitle="POR QUE eles tomam suas decisões?"
                    visualization={<PsicografiaVis />}
                >
                    <p>Esta é a segmentação mais profunda. Ela vai além dos dados para entender o que *move* os seus clientes, permitindo a construção de lealdade e conexão emocional com a marca.</p>
                     <p><strong>Variáveis Principais:</strong> Estilo de vida (aventureiro, caseiro), valores e crenças (sustentabilidade, status), personalidade, interesses e hobbies.</p>
                </ConceptCard>

                <ConceptCard 
                    icon={<ChartBarIcon />} 
                    title='Segmentação Comportamental (O "Como")'
                    subtitle="COMO eles interagem com seu produto ou mercado?"
                    visualization={<ComportamentalVis />}
                >
                    <p>Segmenta os clientes com base em suas ações concretas, conhecimento e uso de um produto. É altamente prático e focado em otimizar a jornada do cliente.</p>
                    <p><strong>Variáveis Principais:</strong> Ocasião de compra, benefícios procurados (economia, qualidade), status de lealdade, taxa de uso (heavy user), estágio na jornada do comprador.</p>
                </ConceptCard>
            </div>
        </div>
    );
};

export default SegmentosBlueprint;
