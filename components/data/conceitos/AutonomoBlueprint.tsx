import React from 'react';
import { IdentificationCardIcon } from '../../icons/IdentificationCardIcon';
import { CogIcon } from '../../icons/CogIcon';
import { FireIcon } from '../../icons/FireIcon';
import { StarIcon } from '../../icons/StarIcon';
import { WifiIcon } from '../../icons/WifiIcon';
import { CurrencyDollarIcon } from '../../icons/CurrencyDollarIcon';
import { ArrowTrendingUpIcon } from '../../icons/ArrowTrendingUpIcon';

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
        <div className="bg-black/20 p-6 flex flex-col items-center justify-center lg:w-1/2 min-h-[250px] lg:min-h-0">
            {visualization}
        </div>
    </div>
);

// --- VISUALIZATION COMPONENTS ---

const IdentidadeVis: React.FC = () => (
    <div className="w-full max-w-sm bg-gray-900 border border-gray-700 rounded-lg p-4 space-y-3">
        <div className="flex items-center gap-3">
             <IdentificationCardIcon className="w-8 h-8 text-gray-500" />
            <div>
                <p className="font-bold text-white">Mariana Costa</p>
                <p className="text-xs text-gray-400">Designer de Produto (PJ)</p>
            </div>
        </div>
        <div className="grid grid-cols-2 gap-3 text-xs">
            <div><p className="text-gray-500">Área</p><p className="text-gray-200 font-medium">UI/UX Design</p></div>
            <div><p className="text-gray-500">Modelo Receita</p><p className="text-gray-200 font-medium">Por Projeto</p></div>
        </div>
    </div>
);

const OperacaoVis: React.FC = () => (
     <div className="relative flex items-center justify-center w-48 h-48">
        <div className="absolute w-full h-full border-2 border-dashed border-gray-700 rounded-full animate-spin-slow"></div>
        <div className="absolute text-center text-xs">
            <p className="font-bold text-white text-lg">FLUXO</p>
            <p className="text-gray-400">de Valor</p>
        </div>
        <div className="absolute top-0 -translate-y-1/2 bg-gray-950 px-2 text-xs text-gray-300">Aquisição</div>
        <div className="absolute right-0 translate-x-1/2 bg-gray-950 px-2 text-xs text-gray-300">Entrega</div>
        <div className="absolute bottom-0 translate-y-1/2 bg-red-900/80 px-2 text-xs text-red-300 font-bold">Gestão (Dor!)</div>
        <div className="absolute left-0 -translate-x-1/2 bg-gray-950 px-2 text-xs text-gray-300">Cobrança</div>
    </div>
);

const DoresAspiracoesVis: React.FC = () => (
    <div className="text-center space-y-2 w-full max-w-xs">
        <div className="p-3 bg-red-900/30 rounded-lg">
            <FireIcon className="w-6 h-6 mx-auto text-red-500 mb-1"/>
            <p className="text-sm font-semibold text-red-300">DOR DO NEGÓCIO</p>
            <p className="text-xs text-red-400">Inconstância de renda, burnout</p>
        </div>
        <div className="text-gray-500 text-xl font-thin">↓</div>
        <div className="p-3 bg-green-900/30 rounded-lg ring-2 ring-green-500">
             <p className="text-sm font-bold text-green-300">SOLUÇÃO (Seu Produto)</p>
        </div>
        <div className="text-gray-500 text-xl font-thin">↓</div>
        <div className="p-3 bg-yellow-900/30 rounded-lg">
             <StarIcon className="w-6 h-6 mx-auto text-yellow-400 mb-1"/>
             <p className="text-sm font-semibold text-yellow-300">ASPIRAÇÃO PESSOAL</p>
             <p className="text-xs text-yellow-400">Liberdade, mais tempo, escalar</p>
        </div>
    </div>
);

const MarketingVis: React.FC = () => (
    <div className="w-full max-w-xs space-y-1 text-center">
        <div className="w-full h-8 bg-indigo-500 rounded-t-lg flex items-center justify-center text-xs font-bold text-white">VISITANTES (LinkedIn, Site)</div>
        <div className="w-10/12 mx-auto h-8 bg-indigo-600 flex items-center justify-center text-xs font-bold text-white">LEADS (Contato)</div>
        <div className="w-8/12 mx-auto h-8 bg-indigo-700 flex items-center justify-center text-xs font-bold text-white">CLIENTES (Proposta Aceita)</div>
    </div>
);

const FinancasVis: React.FC = () => (
    <div className="flex items-center justify-center w-full max-w-sm gap-4 p-4 bg-gray-900 rounded-lg border border-gray-700">
        <div className="flex-1 text-center">
            <p className="font-bold text-red-400">CUSTO</p>
            <p className="text-xs text-gray-400">"Mais uma despesa"</p>
        </div>
        <label htmlFor="toggle" className="flex items-center cursor-pointer">
            <div className="relative">
                <input type="checkbox" id="toggle" className="sr-only" defaultChecked />
                <div className="block bg-red-800 w-14 h-8 rounded-full"></div>
                <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform transform translate-x-full"></div>
            </div>
        </label>
        <div className="flex-1 text-center">
            <p className="font-bold text-green-400">INVESTIMENTO</p>
            <p className="text-xs text-gray-400">"Me traz retorno"</p>
        </div>
    </div>
);


const CrescimentoVis: React.FC = () => (
    <div className="flex items-center gap-1.5 w-full max-w-md text-center">
        <div className="bg-gray-800 p-2 rounded-lg text-sm font-bold text-white flex-1">Hoje: Vende Horas</div>
        <div className="flex-shrink-0 text-indigo-400 text-xl">→</div>
        <div className="bg-indigo-800 p-2 rounded-lg text-sm font-bold text-white flex-1">Amanhã: Cria Produto</div>
        <div className="flex-shrink-0 text-indigo-400 text-xl">→</div>
        <div className="bg-gray-800 p-2 rounded-lg text-sm font-bold text-white flex-1">Futuro: Escala</div>
    </div>
);


// --- MAIN COMPONENT ---
const AutonomoBlueprint: React.FC = () => {
    return (
        <div>
            <div className="mb-10 text-center">
                <h2 className="text-3xl font-bold text-white">A Anatomia do Profissional Autônomo</h2>
                <p className="mt-2 text-lg text-gray-400">Os 6 pilares para decifrar o cliente "Eu S.A.", onde negócio e vida pessoal são a mesma coisa.</p>
            </div>
            
            <div className="space-y-8">
                <ConceptCard 
                    icon={<IdentificationCardIcon className="w-6 h-6"/>} 
                    title="1. Identidade Profissional & Modelo de Negócio"
                    subtitle="O 'Cartão de Visita'"
                    visualization={<IdentidadeVis />}
                >
                    <p>Como ele se apresenta ao mundo e gera receita. Vender para alguém que cobra por hora e está sempre lotado é diferente de vender para alguém que vende um curso online e quer escalar.</p>
                </ConceptCard>

                <ConceptCard 
                    icon={<CogIcon className="w-6 h-6"/>} 
                    title="2. Operação e Fluxo de Valor"
                    subtitle="A 'Batalha Diária'"
                    visualization={<OperacaoVis />}
                >
                    <p>O mapa de como ele transforma tempo em dinheiro. Aqui estão os maiores "ladrões de tempo" e fontes de estresse. Uma ferramenta que otimiza este pilar vende <strong>horas de vida de volta</strong>.</p>
                </ConceptCard>
                
                <ConceptCard 
                    icon={
                        <div className="flex items-center gap-2">
                           <FireIcon className="w-6 h-6 text-red-500" />
                           <StarIcon className="w-6 h-6 text-yellow-400" />
                        </div>
                    } 
                    title="3. Dores do Negócio & Aspirações Pessoais"
                    subtitle="O 'Motor Duplo'"
                    visualization={<DoresAspiracoesVis />}
                >
                    <p>A conexão direta entre os desafios do negócio e seus objetivos de vida. Você precisa conectar a solução de uma dor de negócio (ex: gestão de projetos) a uma aspiração pessoal (ex: tirar 30 dias de férias com a família).</p>
                </ConceptCard>

                <ConceptCard 
                    icon={<WifiIcon className="w-6 h-6"/>} 
                    title="4. Marketing & Aquisição de Clientes"
                    subtitle="A 'Vitrine'"
                    visualization={<MarketingVis />}
                >
                    <p>Como ele se posiciona para ser encontrado e desejado pelos clientes certos. Entender isso mostra como ajudá-lo a encher o funil e a fechar mais negócios.</p>
                </ConceptCard>

                <ConceptCard 
                    icon={<CurrencyDollarIcon />} 
                    title="5. Finanças e Mentalidade de Preço"
                    subtitle="O 'Caixa'"
                    visualization={<FinancasVis />}
                >
                    <p>Como ele lida com dinheiro e valor. Um autônomo que vê sua ferramenta como um "investimento" com ROI claro irá comprar. Aquele que a vê apenas como um "custo" a mais, não.</p>
                </ConceptCard>
                
                <ConceptCard 
                    icon={<ArrowTrendingUpIcon className="w-6 h-6"/>} 
                    title="6. Ecossistema de Aprendizagem e Crescimento"
                    subtitle="A 'Evolução'"
                    visualization={<CrescimentoVis />}
                >
                    <p>Como ele se mantém atualizado e planeja o futuro. Vender uma solução que se alinha ao próximo passo da jornada dele (ex: criar um produto digital) cria um parceiro de longo prazo, não apenas um cliente.</p>
                </ConceptCard>
            </div>
        </div>
    );
};

export default AutonomoBlueprint;