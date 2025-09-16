
import React from 'react';
import { SparklesIcon } from '../../icons/SparklesIcon';
import { PuzzlePieceIcon } from '../../icons/PuzzlePieceIcon';
import { HeartIcon } from '../../icons/HeartIcon';
import { CubeTransparentIcon } from '../../icons/CubeTransparentIcon';
import { UsersIcon } from '../../icons/UsersIcon';

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

const FunilOportunidadeVis = () => (
    <div className="w-full max-w-xs space-y-1 text-center" title="Funil da Oportunidade: Mercado > Segmento > Nicho">
        <div className="w-full h-10 bg-gray-700/50 rounded-t-lg flex items-center justify-center text-sm font-bold text-gray-300">MERCADO</div>
        <div className="w-10/12 mx-auto h-10 bg-gray-800 flex items-center justify-center text-sm font-bold text-gray-200">SEGMENTO</div>
        <div className="w-8/12 mx-auto h-10 bg-indigo-800 rounded-b-lg flex items-center justify-center text-sm font-bold text-white">NICHO</div>
    </div>
);

const PosicionamentoVis = () => (
    <div className="w-full max-w-xs text-center" title="Espectro de Preço/Qualidade">
        <div className="w-full h-2.5 bg-gradient-to-r from-blue-400 to-amber-400 rounded-full relative my-2">
            <div className="absolute top-1/2 -translate-y-1/2" style={{ left: '90%' }}>
                <div className="w-5 h-5 bg-white rounded-full border-2 border-gray-950 shadow-lg flex items-center justify-center">
                    <SparklesIcon className="w-3 h-3 text-amber-500" />
                </div>
            </div>
        </div>
        <div className="flex justify-between text-xs text-gray-400 mt-3 w-full">
            <span>Custo-Benefício</span>
            <span>Ultra-Luxo</span>
        </div>
    </div>
);

const EspecialistaVis = () => (
    <div className="relative flex items-center justify-center w-40 h-40" title="Diagrama de Foco no Especialista">
        <div className="absolute rounded-full border-2 border-dashed border-gray-700 w-full h-full flex items-center justify-center">
            <span className="absolute -top-3 text-xs text-gray-400 bg-gray-950 px-1">Segmento</span>
        </div>
        <div className="absolute rounded-full bg-indigo-500/10 border-2 border-indigo-700 w-1/2 h-1/2 flex items-center justify-center">
             <PuzzlePieceIcon />
        </div>
    </div>
);

const TriboVis = () => (
    <div className="relative w-32 h-32 flex items-center justify-center" title="Diagrama de Tribo/Comunidade">
        <HeartIcon className="w-12 h-12 text-red-500" />
        <div className="absolute top-0 left-0 animate-pulse-slow"><UsersIcon className="w-5 h-5 text-gray-500" /></div>
        <div className="absolute top-1/2 -translate-y-1/2 -right-4"><UsersIcon className="w-5 h-5 text-gray-500" /></div>
        <div className="absolute bottom-0 right-0 animate-pulse-slow-delay"><UsersIcon className="w-5 h-5 text-gray-500" /></div>
        <div className="absolute bottom-1/4 -translate-y-1/2 -left-3 animate-pulse-slow"><UsersIcon className="w-5 h-5 text-gray-500" /></div>
    </div>
);

const InovadorVis = () => (
    <div className="text-center text-gray-400 text-xs w-full max-w-sm" title="Comparação de modelos de negócio">
        <p className="font-bold mb-1 text-gray-300">Tradicional</p>
        <p className="mb-4">Loja → Cliente</p>
        <p className="font-bold mb-1 text-indigo-300">Inovador (Assinatura)</p>
        <p>Assinatura → Entrega → Cliente → Feedback ↻</p>
    </div>
);


// --- MAIN COMPONENT ---

const NichosBlueprint: React.FC = () => {
    return (
        <div>
            <div className="mb-10 text-center">
                <h2 className="text-3xl font-bold text-white">Explorando Nichos de Mercado</h2>
                <p className="mt-2 text-lg text-gray-400">O Poder da Especialização: Como Encontrar e Dominar seu Próprio Território.</p>
            </div>
            
            <div className="bg-gray-950 border border-gray-800 rounded-xl p-6 mb-8 flex flex-col md:flex-row items-center gap-6">
                <div className="md:w-1/2">
                    <h3 className="text-xl font-bold text-white mb-2">Do Macro ao Micro: O Funil da Oportunidade</h3>
                    <p className="text-gray-400 text-sm">
                        Um nicho não é um mercado pequeno, mas sim uma porção <strong>hiperfocada</strong> de um segmento, com necessidades tão específicas que os grandes players não conseguem atender de forma eficaz. A estratégia é ser "o peixe grande no lago pequeno".
                    </p>
                </div>
                <div className="md:w-1/2 flex justify-center">
                    <FunilOportunidadeVis />
                </div>
            </div>

            <div className="space-y-8">
                <ConceptCard 
                    icon={<SparklesIcon className="w-6 h-6"/>} 
                    title='Nicho por Nível de Preço/Qualidade (O "Posicionamento")'
                    subtitle="Como seu preço e sua qualidade te diferenciam radicalmente?"
                    visualization={<PosicionamentoVis />}
                >
                    <p>Foca em um ponto específico do espectro de valor. Você não tenta ser tudo para todos, mas a melhor opção para um público que valoriza ou o <strong>luxo extremo</strong> ou a <strong>eficiência máxima de custo</strong>.</p>
                    <p>A competição é evitada não pelo "o quê" você vende, mas pelo "como" e "por quanto".</p>
                </ConceptCard>

                 <ConceptCard 
                    icon={<PuzzlePieceIcon />} 
                    title='Nicho por Necessidade Específica (O "Especialista")'
                    subtitle="Qual problema *único* você resolve melhor do que ninguém?"
                    visualization={<EspecialistaVis />}
                >
                    <p>Este é o nicho do "resolve-dor de problemas", nascido de uma dor muito particular de um subgrupo. O foco é total na funcionalidade e na solução, com uma comunicação direta.</p>
                    <p><strong>Exemplo:</strong> Software de gestão para clínicas de fisioterapia (não para qualquer clínica).</p>
                </ConceptCard>

                <ConceptCard 
                    icon={<HeartIcon className="w-6 h-6" />} 
                    title='Nicho por Identidade ou Causa (A "Tribo")'
                    subtitle="Para quem sua marca é uma bandeira a ser defendida?"
                    visualization={<TriboVis />}
                >
                    <p>Este nicho transcende o produto, conectando-se a valores, paixões e causas. Os clientes não compram apenas um produto, eles compram uma afiliação, uma forma de expressar quem são. A lealdade aqui é feroz.</p>
                     <p><strong>Exemplo:</strong> Marcas de maquiagem vegana e cruelty-free.</p>
                </ConceptCard>

                 <ConceptCard 
                    icon={<CubeTransparentIcon className="w-6 h-6" />} 
                    title='Nicho por Modelo de Negócio (O "Inovador")'
                    subtitle="Qual é a sua forma inovadora de empacotar e entregar valor?"
                    visualization={<InovadorVis />}
                >
                    <p>O nicho não está no produto, mas na forma como ele é entregue. Esse modelo pode criar uma conveniência ou experiência tão única que se torna uma categoria própria, quebrando o padrão do mercado.</p>
                    <p><strong>Exemplo:</strong> Clubes de assinatura de café ou lâminas de barbear.</p>
                </ConceptCard>
            </div>
        </div>
    );
};

export default NichosBlueprint;
