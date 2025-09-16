import React from 'react';
import { BuildingOfficeIcon } from '../../icons/BuildingOfficeIcon';
import { UserGroupIcon } from '../../icons/UserGroupIcon';
import { FlagIcon } from '../../icons/FlagIcon';
import { ShoppingBagIcon } from '../../icons/ShoppingBagIcon';
import { ServerStackIcon } from '../../icons/ServerStackIcon';
import { ScaleIcon } from '../../icons/ScaleIcon';
import { CurrencyDollarIcon } from '../../icons/CurrencyDollarIcon';
import { FireIcon } from '../../icons/FireIcon';
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

const FirmografiaVis: React.FC = () => (
    <div className="w-full max-w-sm bg-gray-900 border border-gray-700 rounded-lg p-4 space-y-3">
        <div className="flex items-center gap-3">
            <BuildingOfficeIcon className="w-8 h-8 text-gray-500" />
            <div>
                <p className="font-bold text-white">TechCorp Soluções S.A.</p>
                <p className="text-xs text-gray-400">ID: 99.123.456/0001-77</p>
            </div>
        </div>
        <div className="grid grid-cols-2 gap-3 text-xs">
            <div><p className="text-gray-500">Setor</p><p className="text-gray-200 font-medium">Tecnologia (SaaS B2B)</p></div>
            <div><p className="text-gray-500">Tamanho</p><p className="text-gray-200 font-medium">250-500 Funcionários</p></div>
            <div><p className="text-gray-500">Faturamento</p><p className="text-gray-200 font-medium">R$ 50M / ano</p></div>
            <div><p className="text-gray-500">Localização</p><p className="text-gray-200 font-medium">São Paulo, SP</p></div>
        </div>
    </div>
);

const PessoasChaveVis: React.FC = () => (
    <div className="space-y-3 text-center w-full max-w-md">
        <div className="bg-indigo-900/50 border border-indigo-700 p-2 rounded-lg text-sm font-bold text-white">Decisor (Ex: C-Level, Diretor)</div>
        <div className="flex justify-center items-center"><div className="h-4 w-px bg-gray-700"></div></div>
        <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-gray-800 p-2 rounded-lg"><p className="font-semibold text-gray-200">Influenciador</p><p className="text-gray-400">(Ex: Gerente de Área)</p></div>
            <div className="bg-gray-800 p-2 rounded-lg"><p className="font-semibold text-gray-200">Gatekeeper</p><p className="text-gray-400">(Ex: TI, Compras)</p></div>
        </div>
        <div className="flex justify-center items-center"><div className="h-4 w-px bg-gray-700"></div></div>
        <div className="bg-gray-900 border border-gray-700 p-2 rounded-lg text-sm text-gray-300">Usuário Final (Ex: Analista, Vendedor)</div>
    </div>
);

const DesafiosObjetivosVis: React.FC = () => (
     <div className="flex items-center justify-center w-full max-w-sm gap-4">
        <div className="flex-1 text-center p-4 bg-red-900/20 border border-red-800 rounded-lg">
            <FireIcon className="w-8 h-8 mx-auto text-red-500 mb-2" />
            <p className="font-bold text-red-300">Desafios</p>
            <ul className="text-xs text-red-400 mt-2 list-disc list-inside text-left">
                <li>Baixa eficiência</li>
                <li>Perda de clientes</li>
                <li>Custos elevados</li>
            </ul>
        </div>
        <ScaleIcon className="w-8 h-8 text-gray-600 flex-shrink-0" />
        <div className="flex-1 text-center p-4 bg-green-900/20 border border-green-800 rounded-lg">
            <FlagIcon className="w-8 h-8 mx-auto text-green-500 mb-2" />
            <p className="font-bold text-green-300">Objetivos</p>
            <ul className="text-xs text-green-400 mt-2 list-disc list-inside text-left">
                <li>Aumentar receita</li>
                <li>Expandir mercado</li>
                <li>Otimizar processos</li>
            </ul>
        </div>
    </div>
);

const ProcessoCompraVis: React.FC = () => (
    <div className="flex items-center gap-1.5 w-full max-w-md text-center">
        {['Descoberta', 'Qualificação', 'Proposta', 'Negociação', 'Fechamento'].map((step, index, arr) => (
            <React.Fragment key={step}>
                <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-gray-800 border-2 border-gray-700 rounded-full flex items-center justify-center text-indigo-400">
                        <span className="text-2xl font-light">{index + 1}</span>
                    </div>
                    <p className="text-xs mt-2 font-medium text-gray-300">{step}</p>
                </div>
                {index < arr.length - 1 && <div className="flex-1 h-px bg-gray-700"></div>}
            </React.Fragment>
        ))}
    </div>
);

const StackTecnologicoVis: React.FC = () => (
    <div className="grid grid-cols-2 gap-3 w-full max-w-sm text-sm">
        <div className="bg-gray-800 p-3 rounded-lg"><p className="font-bold text-white">CRM:</p><p className="text-gray-400 text-xs">Salesforce</p></div>
        <div className="bg-gray-800 p-3 rounded-lg"><p className="font-bold text-white">ERP:</p><p className="text-gray-400 text-xs">SAP</p></div>
        <div className="bg-gray-800 p-3 rounded-lg"><p className="font-bold text-white">Cloud:</p><p className="text-gray-400 text-xs">AWS</p></div>
        <div className="bg-gray-800 p-3 rounded-lg"><p className="font-bold text-white">Comunicação:</p><p className="text-gray-400 text-xs">Slack</p></div>
    </div>
);

const PosicionamentoVis: React.FC = () => (
     <div className="relative w-full max-w-xs h-48 border-l border-b border-gray-700">
        <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-xs text-gray-500">Preço</span>
        <span className="absolute -left-8 top-1/2 -translate-y-1/2 text-xs text-gray-500 transform -rotate-90">Qualidade</span>
        <div title="Concorrente A" className="absolute w-3 h-3 bg-red-500 rounded-full" style={{ left: '20%', bottom: '25%' }}></div>
        <div title="Concorrente B" className="absolute w-3 h-3 bg-red-500 rounded-full" style={{ left: '70%', bottom: '60%' }}></div>
        <div title="Sua Empresa" className="absolute w-4 h-4 bg-indigo-500 rounded-full ring-2 ring-offset-2 ring-offset-black/50 ring-indigo-500" style={{ left: '40%', bottom: '75%' }}></div>
    </div>
);

const SaudeCulturaVis: React.FC = () => (
    <div className="flex w-full max-w-sm gap-4">
        <div className="flex-1 p-3 bg-gray-900 border border-gray-700 rounded-lg text-center">
            <p className="text-sm font-bold text-white mb-2">Saúde Financeira</p>
            <ArrowTrendingUpIcon className="w-10 h-10 text-green-500 mx-auto" />
            <p className="text-xs text-gray-400 mt-2">Em crescimento</p>
        </div>
        <div className="flex-1 p-3 bg-gray-900 border border-gray-700 rounded-lg text-center">
            <p className="text-sm font-bold text-white mb-2">Cultura</p>
            <FireIcon className="w-10 h-10 text-amber-500 mx-auto" />
            <p className="text-xs text-gray-400 mt-2">Foco em Inovação</p>
        </div>
    </div>
);


// --- MAIN COMPONENT ---
const EmpresaBlueprint: React.FC = () => {
    return (
        <div>
            <div className="mb-10 text-center">
                <h2 className="text-3xl font-bold text-white">A Anatomia da Empresa (Cliente B2B)</h2>
                <p className="mt-2 text-lg text-gray-400">Os 7 pilares que revelam como uma organização funciona, pensa e compra.</p>
            </div>
            
            <div className="space-y-8">
                <ConceptCard 
                    icon={<BuildingOfficeIcon className="w-6 h-6"/>} 
                    title="1. Firmografia"
                    subtitle="O 'RG' da Empresa"
                    visualization={<FirmografiaVis />}
                >
                    <p>São os dados demográficos da empresa. A camada mais externa e objetiva, fundamental para qualificação inicial e para entender se a empresa sequer pode ser sua cliente.</p>
                </ConceptCard>

                <ConceptCard 
                    icon={<UserGroupIcon className="w-6 h-6"/>} 
                    title="2. Estrutura e Pessoas-Chave"
                    subtitle="O Organograma do Poder"
                    visualization={<PessoasChaveVis />}
                >
                    <p>Uma empresa não compra, pessoas compram. Este pilar mapeia os indivíduos que importam no processo de compra, definindo para quem você deve direcionar cada tipo de mensagem.</p>
                </ConceptCard>
                
                <ConceptCard 
                    icon={<FlagIcon className="w-6 h-6"/>} 
                    title="3. Desafios e Objetivos Estratégicos"
                    subtitle="A Dor e o Sonho"
                    visualization={<DesafiosObjetivosVis />}
                >
                    <p>Aqui você conecta seu produto ao ROI. O que impede a empresa de alcançar suas metas? Onde eles querem chegar? Você não vende um produto, você vende a solução para um desafio ou o catalisador para um objetivo.</p>
                </ConceptCard>

                <ConceptCard 
                    icon={<ShoppingBagIcon className="w-6 h-6"/>} 
                    title="4. Processo de Compra"
                    subtitle="O Caminho do Dinheiro"
                    visualization={<ProcessoCompraVis />}
                >
                    <p>Como, logisticamente, essa empresa adquire novas soluções? Entender isso alinha sua estratégia de vendas com a realidade burocrática do cliente, evitando surpresas.</p>
                </ConceptCard>

                <ConceptCard 
                    icon={<ServerStackIcon className="w-6 h-6"/>} 
                    title="5. Stack Tecnológico Corporativo"
                    subtitle="O Ecossistema Existente"
                    visualization={<StackTecnologicoVis />}
                >
                    <p>Quais softwares, sistemas e ferramentas a empresa já utiliza? Essencial para entender a compatibilidade, oportunidades de integração e fraquezas de concorrentes que você pode explorar.</p>
                </ConceptCard>

                <ConceptCard 
                    icon={<ScaleIcon className="w-6 h-6"/>} 
                    title="6. Posicionamento no Mercado e Concorrência"
                    subtitle="O Campo de Batalha"
                    visualization={<PosicionamentoVis />}
                >
                    <p>Como a empresa se vê e é vista no seu próprio mercado? Isso ajuda a entender a linguagem que eles valorizam e como sua solução pode ajudá-los a se destacar ainda mais.</p>
                </ConceptCard>
                
                <ConceptCard 
                    icon={<CurrencyDollarIcon />} 
                    title="7. Saúde Financeira e Cultura"
                    subtitle="O Caráter da Empresa"
                    visualization={<SaudeCulturaVis />}
                >
                    <p>A empresa está em um momento de investimento ou de contenção de despesas? São inovadores ou conservadores? Isso define o timing e o tipo de abordagem de vendas mais eficaz.</p>
                </ConceptCard>
            </div>
        </div>
    );
};

export default EmpresaBlueprint;