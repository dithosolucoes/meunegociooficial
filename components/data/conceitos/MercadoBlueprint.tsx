import React from 'react';
import { RulerIcon } from '../../icons/RulerIcon';
import { ChartBarIcon } from '../../icons/ChartBarIcon';
import { LightBulbIcon } from '../../icons/LightBulbIcon';
import { UsersIcon } from '../../icons/UsersIcon';
import { PuzzlePieceIcon } from '../../icons/PuzzlePieceIcon';
import { LockClosedIcon } from '../../icons/LockClosedIcon';
import { CurrencyDollarIcon } from '../../icons/CurrencyDollarIcon';

// --- Reusable Concept Card ---

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

const TamanhoMercadoVis = () => (
    <div className="relative flex items-center justify-center w-48 h-48" title="Diagrama de TAM, SAM, SOM">
        <div className="absolute rounded-full border-2 border-dashed border-gray-700 w-full h-full flex items-center justify-center">
            <span className="absolute -top-3 text-xs text-gray-400 bg-gray-950 px-1">TAM</span>
        </div>
        <div className="absolute rounded-full border-2 border-dashed border-gray-600 w-3/4 h-3/4 flex items-center justify-center">
            <span className="absolute -bottom-3 text-xs text-gray-400 bg-gray-950 px-1">SAM</span>
        </div>
        <div className="absolute rounded-full bg-indigo-500/10 border-2 border-indigo-700 w-1/2 h-1/2 flex items-center justify-center">
            <span className="font-bold text-white text-lg">SOM</span>
        </div>
    </div>
);

const CrescimentoMercadoVis = () => (
    <div className="relative w-full max-w-xs h-32" title="Ilustração de crescimento de mercado ao longo do tempo">
        <svg className="absolute w-full h-full" viewBox="0 0 100 60" preserveAspectRatio="none">
             <defs>
                <linearGradient id="growthGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.3"/>
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0"/>
                </linearGradient>
            </defs>
            <path d="M 0 55 C 20 50, 40 30, 70 20 L 100 5" stroke="#10b981" fill="url(#growthGradient)" strokeWidth="2" />
        </svg>
        <div className="flex justify-between text-xs text-gray-500 absolute -bottom-4 w-full">
            <span>Passado</span>
            <span>Futuro</span>
        </div>
    </div>
);

const NivelCompeticaoVis = () => (
    <div className="w-full max-w-xs text-center" title="Espectro de competição de mercado">
        <div className="w-full h-2.5 bg-gradient-to-r from-teal-500 via-yellow-500 to-red-600 rounded-full relative my-2">
            <div className="absolute top-1/2 -translate-y-1/2" style={{ left: '40%' }}>
                <div className="w-4 h-4 bg-white rounded-full border-2 border-gray-950 shadow-lg"></div>
            </div>
        </div>
        <div className="flex justify-between text-xs text-gray-400 mt-3 w-full">
            <span>Fragmentado</span>
            <span>Concentrado</span>
        </div>
    </div>
);

const SegmentosMercadoVis = () => (
     <div className="flex items-center justify-center gap-6" title="Divisão do mercado em segmentos">
        <svg className="w-28 h-28 transform -rotate-90" viewBox="0 0 36 36">
            <circle r="15.915" cx="18" cy="18" fill="transparent" stroke="#1f2937" strokeWidth="4"></circle>
            <circle r="15.915" cx="18" cy="18" fill="transparent" stroke="#10b981" strokeWidth="4" strokeDasharray="40 100"></circle>
            <circle r="15.915" cx="18" cy="18" fill="transparent" stroke="#3b82f6" strokeWidth="4" strokeDasharray="30 100" strokeDashoffset="-40"></circle>
            <circle r="15.915" cx="18" cy="18" fill="transparent" stroke="#f97316" strokeWidth="4" strokeDasharray="30 100" strokeDashoffset="-70"></circle>
        </svg>
        <div className="text-xs space-y-2 text-gray-300">
            <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500"></div><span>Segmento A</span></div>
            <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-500"></div><span>Segmento B</span></div>
            <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-orange-500"></div><span>Segmento C</span></div>
        </div>
    </div>
);

// --- MAIN COMPONENT ---

const MercadoBlueprint: React.FC = () => {
    return (
        <div>
            <div className="mb-10 text-center">
                <h2 className="text-3xl font-bold text-white">A Anatomia de um Mercado</h2>
                <p className="mt-2 text-lg text-gray-400">Os 7 pilares conceituais que definem a estrutura de qualquer mercado.</p>
            </div>
            
            <div className="space-y-8">
                <ConceptCard 
                    icon={<RulerIcon />} 
                    title="Tamanho do Mercado (TAM, SAM, SOM)"
                    subtitle="Qual o tamanho do universo de oportunidades?"
                    visualization={<TamanhoMercadoVis />}
                >
                    <p>Mede o potencial de receita total. É dividido em três camadas para qualificar a oportunidade de forma realista.</p>
                    <ul>
                        <li><strong>TAM (Total Addressable Market):</strong> A demanda total do mercado por um produto ou serviço. O cenário mais amplo possível.</li>
                        <li><strong>SAM (Serviceable Addressable Market):</strong> A fatia do TAM que pode ser alcançada pelos seus canais de venda, dentro de sua área geográfica e limitações.</li>
                        <li><strong>SOM (Serviceable Obtainable Market):</strong> A porção do SAM que você pode realisticamente capturar no curto a médio prazo, considerando a concorrência e seus recursos.</li>
                    </ul>
                </ConceptCard>

                <ConceptCard 
                    icon={<ChartBarIcon />} 
                    title="Crescimento do Mercado (CAGR)"
                    subtitle="O mercado está expandindo, estagnado ou encolhendo?"
                    visualization={<CrescimentoMercadoVis />}
                >
                    <p>Indica a velocidade e a direção na qual o mercado está se movendo. A Taxa de Crescimento Anual Composta (CAGR) é a métrica padrão.</p>
                    <p>Mercados de alto crescimento são atraentes, mas frequentemente atraem mais competidores. Mercados em declínio podem oferecer oportunidades para players consolidados ou de nicho.</p>
                </ConceptCard>
                
                <ConceptCard 
                    icon={<UsersIcon />} 
                    title="Nível de Competição"
                    subtitle="Quem já está neste mercado e qual o nível da disputa?"
                    visualization={<NivelCompeticaoVis />}
                >
                    <p>Analisa a estrutura competitiva. É um fator determinante para a lucratividade e estratégia.</p>
                     <ul>
                        <li><strong>Fragmentado:</strong> Muitos competidores pequenos, nenhum com poder de mercado significativo. Geralmente, as barreiras de entrada são baixas.</li>
                        <li><strong>Concentrado:</strong> Poucos players grandes (oligopólio) ou apenas um (monopólio) dominam o mercado. As barreiras de entrada costumam ser altas.</li>
                    </ul>
                </ConceptCard>

                <ConceptCard 
                    icon={<PuzzlePieceIcon />} 
                    title="Principais Segmentos"
                    subtitle="Como o mercado se divide em grupos menores e homogêneos?"
                    visualization={<SegmentosMercadoVis />}
                >
                    <p>Um mercado raramente é monolítico. A segmentação consiste em identificar subgrupos de clientes com características, necessidades ou comportamentos semelhantes.</p>
                    <p>Os critérios podem ser demográficos (idade, renda), geográficos (localização), psicográficos (estilo de vida) ou comportamentais (histórico de compra).</p>
                </ConceptCard>

                <ConceptCard 
                    icon={<LightBulbIcon />} 
                    title="Tendências e Drivers"
                    subtitle="Quais forças externas estão moldando o futuro do mercado?"
                    visualization={
                        <p className="text-gray-500 text-sm">Mudanças tecnológicas, regulatórias, sociais e econômicas que impactam a oferta e a demanda.</p>
                    }
                >
                    <p>São as forças macro que influenciam a direção do mercado.</p>
                    <ul>
                        <li><strong>Drivers:</strong> Fatores que impulsionam o crescimento, como uma nova tecnologia que cria demanda (ex: IA).</li>
                        <li><strong>Tendências:</strong> Padrões emergentes no comportamento do consumidor (ex: busca por sustentabilidade) ou na indústria.</li>
                    </ul>
                     <p>Entender essas forças permite antecipar mudanças em vez de apenas reagir a elas.</p>
                </ConceptCard>

                <ConceptCard 
                    icon={<LockClosedIcon />} 
                    title="Barreiras de Entrada"
                    subtitle="Quão difícil é para um novo concorrente entrar e competir?"
                    visualization={
                        <p className="text-gray-500 text-sm">Fatores que protegem os players existentes e dificultam a entrada de novos.</p>
                    }
                >
                    <p>Barreiras altas geralmente levam a uma menor competição e maior lucratividade para as empresas estabelecidas. Exemplos comuns incluem:</p>
                    <ul>
                        <li><strong>Alto Custo de Capital:</strong> Necessidade de grande investimento inicial.</li>
                        <li><strong>Tecnologia Proprietária:</strong> Patentes ou segredos comerciais.</li>
                        <li><strong>Força da Marca e Lealdade:</strong> Clientes já estabelecidos e fiéis.</li>
                        <li><strong>Regulação Governamental:</strong> Licenças e permissões difíceis de obter.</li>
                    </ul>
                </ConceptCard>

                 <ConceptCard 
                    icon={<CurrencyDollarIcon />} 
                    title="Economia e Margens"
                    subtitle="Qual a lógica financeira fundamental deste mercado?"
                    visualization={
                         <p className="text-gray-500 text-sm">Análise da viabilidade e lucratividade de operar no setor.</p>
                    }
                >
                    <p>Avalia a saúde financeira inerente ao setor. Conceitos-chave a serem considerados:</p>
                     <ul>
                        <li><strong>Margem de Lucro:</strong> A diferença entre o preço de venda e o custo. Mercados podem ter margens altas (software) ou baixas (varejo de alimentos).</li>
                        <li><strong>Ciclo de Vendas:</strong> O tempo que leva para fechar um negócio. Pode ser curto (B2C) ou muito longo (B2B industrial).</li>
                        <li><strong>Custo de Aquisição de Cliente (CAC):</strong> Quanto custa para atrair um novo cliente.</li>
                    </ul>
                </ConceptCard>
            </div>
        </div>
    );
};

export default MercadoBlueprint;
