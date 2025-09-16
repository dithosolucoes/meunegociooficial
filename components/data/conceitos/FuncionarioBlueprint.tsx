import React from 'react';
import { IdentificationCardIcon } from '../../icons/IdentificationCardIcon';
import { ClipboardDocumentListIcon } from '../../icons/ClipboardDocumentListIcon';
import { ArrowTrendingUpIcon } from '../../icons/ArrowTrendingUpIcon';
import { KeyIcon } from '../../icons/KeyIcon';
import { FireIcon } from '../../icons/FireIcon';
import { StarIcon } from '../../icons/StarIcon';
import { ComputerDesktopIcon } from '../../icons/ComputerDesktopIcon';

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

const PerfilProfissionalVis: React.FC = () => (
    <div className="w-full max-w-sm bg-gray-900 border border-gray-700 rounded-lg p-4 space-y-3">
        <div className="flex items-center gap-3">
            <IdentificationCardIcon className="w-8 h-8 text-gray-500" />
            <div>
                <p className="font-bold text-white">Ana Souza</p>
                <p className="text-xs text-gray-400">ID: 7854</p>
            </div>
        </div>
        <div className="grid grid-cols-2 gap-3 text-xs">
            <div><p className="text-gray-500">Cargo</p><p className="text-gray-200 font-medium">Analista de Marketing Sênior</p></div>
            <div><p className="text-gray-500">Departamento</p><p className="text-gray-200 font-medium">Marketing de Produto</p></div>
        </div>
    </div>
);

const RotinaVis: React.FC = () => (
    <div className="w-full max-w-xs space-y-2 text-sm">
        <div className="p-2 bg-gray-800 rounded-md">9:00 - Reunião de Sincronia</div>
        <div className="p-2 bg-gray-800 rounded-md">10:00 - Análise de Dados</div>
        <div className="relative p-2 bg-red-900/50 border border-red-700 rounded-md text-red-300">
            14:00 - Criar Relatórios (Gargalo!)
            <span className="absolute -top-2 -right-2 text-xs bg-red-600 text-white font-bold px-1.5 py-0.5 rounded-full">Dor</span>
        </div>
        <div className="p-2 bg-gray-800 rounded-md">16:00 - Planejamento</div>
    </div>
);

const KpisVis: React.FC = () => (
    <div className="grid grid-cols-2 gap-3 w-full max-w-sm text-center">
        <div className="bg-gray-800 p-3 rounded-lg"><p className="text-sm font-bold text-white">Leads Gerados</p><p className="text-2xl font-bold text-green-400 mt-1">115%</p><p className="text-xs text-gray-400">da meta</p></div>
        <div className="bg-gray-800 p-3 rounded-lg"><p className="text-sm font-bold text-white">Custo por Lead</p><p className="text-2xl font-bold text-yellow-400 mt-1">-10%</p><p className="text-xs text-gray-400">abaixo do alvo</p></div>
    </div>
);

const PoderInfluenciaVis: React.FC = () => (
    <div className="w-full max-w-xs text-center">
        <div className="w-full h-2.5 bg-gradient-to-r from-gray-600 to-indigo-500 rounded-full relative my-2">
            <div className="absolute top-1/2 -translate-y-1/2" style={{ left: '70%' }}>
                <div className="w-4 h-4 bg-white rounded-full border-2 border-gray-950 shadow-lg"></div>
            </div>
        </div>
        <div className="flex justify-between text-xs text-gray-400 mt-3 w-full">
            <span>Precisa de aprovação</span>
            <span>Pode testar/comprar</span>
        </div>
    </div>
);

const DoresAspiracoesVis: React.FC = () => (
    <div className="text-center space-y-2 w-full max-w-xs">
        <div className="p-3 bg-red-900/30 rounded-lg">
            <FireIcon className="w-6 h-6 mx-auto text-red-500 mb-1"/>
            <p className="text-sm font-semibold text-red-300">DOR</p>
            <p className="text-xs text-red-400">Sobrecarga, trabalho repetitivo</p>
        </div>
        <div className="text-gray-500 text-xl font-thin">↓</div>
        <div className="p-3 bg-green-900/30 rounded-lg ring-2 ring-green-500">
             <p className="text-sm font-bold text-green-300">SOLUÇÃO (Seu Produto)</p>
        </div>
        <div className="text-gray-500 text-xl font-thin">↓</div>
        <div className="p-3 bg-yellow-900/30 rounded-lg">
             <StarIcon className="w-6 h-6 mx-auto text-yellow-400 mb-1"/>
             <p className="text-sm font-semibold text-yellow-300">ASPIRAÇÃO</p>
             <p className="text-xs text-yellow-400">Ser promovido, ter mais tempo livre</p>
        </div>
    </div>
);

const EcossistemaInfoVis: React.FC = () => (
    <div className="flex flex-wrap justify-center items-center gap-2 w-full max-w-sm">
        {['Blogs de Marketing', 'Comunidade no Slack', 'Cursos Online', 'YouTube', 'Influenciadores do LinkedIn', 'Fóruns'].map(tag =>(
             <span key={tag} className="px-2 py-1 text-xs font-medium text-indigo-200 bg-indigo-900/60 rounded-full">{tag}</span>
        ))}
    </div>
);

// --- MAIN COMPONENT ---
const FuncionarioBlueprint: React.FC = () => {
    return (
        <div>
            <div className="mb-10 text-center">
                <h2 className="text-3xl font-bold text-white">A Anatomia do Funcionário (Cliente B2E)</h2>
                <p className="mt-2 text-lg text-gray-400">Os 6 pilares para entender o usuário final como o verdadeiro portão de entrada para a empresa.</p>
            </div>
            
            <div className="space-y-8">
                <ConceptCard 
                    icon={<IdentificationCardIcon className="w-6 h-6"/>} 
                    title="1. Perfil Profissional"
                    subtitle="O 'Crachá' do seu cliente"
                    visualization={<PerfilProfissionalVis />}
                >
                    <p>Define as responsabilidades centrais e o contexto do trabalho. As dores e necessidades de um desenvolvedor sênior no time de produto são completamente diferentes das de um analista júnior no financeiro.</p>
                </ConceptCard>

                <ConceptCard 
                    icon={<ClipboardDocumentListIcon className="w-6 h-6"/>} 
                    title="2. Rotina e Fluxo de Trabalho"
                    subtitle="O 'Dia a Dia' real"
                    visualization={<RotinaVis />}
                >
                    <p>É aqui que você encontra a <strong>dor</strong>. Seu produto deve curar uma ferida específica na rotina dele, seja automatizando uma tarefa repetitiva, eliminando um gargalo ou facilitando a colaboração com a equipe.</p>
                </ConceptCard>
                
                <ConceptCard 
                    icon={<ArrowTrendingUpIcon className="w-6 h-6"/>} 
                    title="3. Métricas de Sucesso e KPIs"
                    subtitle="O 'Boletim de Notas' corporativo"
                    visualization={<KpisVis />}
                >
                    <p>Se o seu produto ajuda o funcionário a atingir ou superar seus indicadores, a venda se torna uma questão de lógica. Você não está vendendo uma ferramenta, mas sim uma <strong>promoção de carreira</strong> ou, no mínimo, um bônus no final do ano.</p>
                </ConceptCard>

                <ConceptCard 
                    icon={<KeyIcon className="w-6 h-6"/>} 
                    title="4. Poder de Influência e Decisão"
                    subtitle="O 'Capital Político' interno"
                    visualization={<PoderInfluenciaVis />}
                >
                    <p>Qual a capacidade real que ele tem para adotar novas ferramentas? Ele pode testar algo novo ou precisa de 10 aprovações do TI? Isso define sua estratégia: capacitar um 'campeão' para vender a ideia internamente (bottom-up) ou ir direto ao gestor (top-down).</p>
                </ConceptCard>

                <ConceptCard 
                    icon={
                        <div className="flex items-center gap-2">
                           <FireIcon className="w-6 h-6 text-red-500" />
                           <StarIcon className="w-6 h-6 text-yellow-400" />
                        </div>
                    } 
                    title="5. Dores e Aspirações de Carreira"
                    subtitle="A 'Jornada Pessoal' dele"
                    visualization={<DoresAspiracoesVis />}
                >
                    <p>É o núcleo emocional. Conecta as funcionalidades do seu produto aos desejos do indivíduo. "Automatizar relatórios" se torna "Liberar 5 horas na sua semana para focar em projetos estratégicos e ser notado pelo seu chefe".</p>
                </ConceptCard>
                
                <ConceptCard 
                    icon={<ComputerDesktopIcon className="w-6 h-6"/>} 
                    title="6. Ecossistema de Informação"
                    subtitle="Onde ele 'Bebe da Fonte'"
                    visualization={<EcossistemaInfoVis />}
                >
                    <p>Onde este profissional busca soluções para seus problemas de trabalho? Em qual comunidade de Slack ele está? Qual canal do YouTube ele assiste? Isso te diz exatamente <strong>onde fazer seu marketing</strong> para que ele te encontre.</p>
                </ConceptCard>
            </div>
        </div>
    );
};

export default FuncionarioBlueprint;