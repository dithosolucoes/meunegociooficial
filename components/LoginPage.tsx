
import React, { useState, useEffect, useRef } from 'react';
import ThreeScene from './ThreeScene';

// --- ÍCONES E COMPONENTES AUXILIARES ---

const CheckIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={`w-6 h-6 ${className}`}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
);

// Ícones Refinados para a Seção 3 (Falsa Cura)
const AgencyIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg className={`w-8 h-8 ${className}`} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 12H40V20H24V12Z" stroke="currentColor" strokeOpacity="0.7" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M21 24H37V32H21V24Z" stroke="currentColor" strokeOpacity="0.7" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M28 36H44V44H28V36Z" stroke="currentColor" strokeOpacity="0.7" strokeWidth="2" strokeLinejoin="round"/>
    </svg>
);

const FreelancerIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg className={`w-8 h-8 ${className}`} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M32 8L20 24L32 56L44 24L32 8Z" stroke="currentColor" strokeOpacity="0.7" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M32 8L20 24L32 26L32 8Z" fill="currentColor" fillOpacity="0.1"/>
    </svg>
);

const DIYIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg className={`w-8 h-8 ${className}`} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 21C16 13 33 10 40 18C47 26 49 42 40 50C31 58 15 51 15 40C15 29 25 29 35 37C45 45 45 22 33 20C21 18 18 32 26 40" stroke="currentColor" strokeOpacity="0.7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

// Emblemas Personalizados para a Seção 6 (Pilares)
const OlhoCristalinoIcon: React.FC = () => (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M32 46C42 46 48 39 54 32C48 25 42 18 32 18C22 18 16 25 10 32C16 39 22 46 32 46Z" stroke="#00FF99" strokeOpacity="0.4" strokeWidth="2"/>
        <path d="M32 38C35.3137 38 38 35.3137 38 32C38 28.6863 35.3137 26 32 26C28.6863 26 26 28.6863 26 32C26 35.3137 28.6863 38 32 38Z" stroke="#00FF99" strokeWidth="2"/>
        <path d="M32 32L21 21" stroke="#00FF99" strokeWidth="2"/>
        <path d="M32 32L43 21" stroke="#00FF99" strokeWidth="2"/>
        <path d="M32 32L43 43" stroke="#00FF99" strokeWidth="2"/>
        <path d="M32 32L21 43" stroke="#00FF99" strokeWidth="2"/>
        <path d="M32 18V9" stroke="#00FF99" strokeWidth="2"/>
        <path d="M32 55V46" stroke="#00FF99" strokeWidth="2"/>
        <path d="M16 32H7" stroke="#00FF99" strokeWidth="2"/>
        <path d="M57 32H48" stroke="#00FF99" strokeWidth="2"/>
    </svg>
);

const RedeSensorialIcon: React.FC = () => (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M32 6V58" stroke="#00FF99" strokeOpacity="0.3" strokeWidth="2"/>
        <path d="M58 32L6 32" stroke="#00FF99" strokeOpacity="0.3" strokeWidth="2"/>
        <path d="M15.272 15.272L48.728 48.728" stroke="#00FF99" strokeOpacity="0.3" strokeWidth="2"/>
        <path d="M15.272 48.728L48.728 15.272" stroke="#00FF99" strokeOpacity="0.3" strokeWidth="2"/>
        <circle cx="32" cy="32" r="4" fill="#0B0B0C" stroke="#00FF99" strokeWidth="2"/>
        <circle cx="32" cy="6" r="3" fill="#00FF99"/>
        <circle cx="32" cy="58" r="3" fill="#00FF99" fillOpacity="0.5"/>
        <circle cx="6" cy="32" r="3" fill="#00FF99" fillOpacity="0.5"/>
        <circle cx="58" cy="32" r="3" fill="#00FF99"/>
        <circle cx="15.272" cy="15.272" r="3" fill="#00FF99"/>
        <circle cx="48.728" cy="48.728" r="3" fill="#00FF99" fillOpacity="0.5"/>
        <circle cx="15.272" cy="48.728" r="3" fill="#00FF99" fillOpacity="0.5"/>
        <circle cx="48.728" cy="15.272" r="3" fill="#00FF99"/>
    </svg>
);

const VetorDeImpactoIcon: React.FC = () => (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M54 10L10 54" stroke="#00FF99" strokeOpacity="0.3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M28 10H54V36" stroke="#00FF99" strokeOpacity="0.3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M54 10L26 38L22 34" fill="#00FF99"/>
        <path d="M54 10L26 38L30 42L54 10Z" fill="#00FF99" />
    </svg>
);

// Ilustração Principal para a Seção 5 (A Revelação)
const CrystalSphereIcon: React.FC = () => (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto max-w-2xl">
        <defs>
            <radialGradient id="glow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" style={{stopColor: '#00FF99', stopOpacity: 0.3}} />
                <stop offset="100%" style={{stopColor: '#00FF99', stopOpacity: 0}} />
            </radialGradient>
        </defs>
        <circle cx="100" cy="100" r="100" fill="url(#glow)" />
        <g stroke="#00FF99" strokeWidth="0.5">
            <path d="M100 0 L100 200" strokeOpacity="0.2"/>
            <path d="M0 100 L200 100" strokeOpacity="0.2"/>
            <path d="M29.29 29.29 L170.71 170.71" strokeOpacity="0.2"/>
            <path d="M29.29 170.71 L170.71 29.29" strokeOpacity="0.2"/>
            
            {/* Main crystal structure */}
            <path d="M100 20 L40 60 L40 140 L100 180 L160 140 L160 60 Z" fill="none" strokeWidth="1.5" />
            <path d="M100 20 L100 50" />
            <path d="M40 60 L70 75" />
            <path d="M40 140 L70 125" />
            <path d="M100 180 L100 150" />
            <path d="M160 140 L130 125" />
            <path d="M160 60 L130 75" />
            
            {/* Inner diamond */}
            <path d="M100 50 L70 75 L70 125 L100 150 L130 125 L130 75 Z" fill="none" strokeWidth="1" />
            <path d="M100 50 L100 150" strokeOpacity="0.5" />
            <path d="M70 75 L130 125" strokeOpacity="0.5" />
            <path d="M70 125 L130 75" strokeOpacity="0.5" />

            {/* Facets */}
            <path d="M100 20 L70 75" strokeOpacity="0.7"/>
            <path d="M100 20 L130 75" strokeOpacity="0.7"/>
            <path d="M40 60 L100 50" strokeOpacity="0.7"/>
            <path d="M160 60 L100 50" strokeOpacity="0.7"/>
            <path d="M40 140 L100 150" strokeOpacity="0.7"/>
            <path d="M160 140 L100 150" strokeOpacity="0.7"/>
            <path d="M100 180 L70 125" strokeOpacity="0.7"/>
            <path d="M100 180 L130 125" strokeOpacity="0.7"/>

            {/* Outer Circle */}
            <circle cx="100" cy="100" r="98" fill="none" strokeWidth="1" strokeOpacity="0.3"/>
        </g>
        <circle cx="100" cy="100" r="4" fill="#00FF99" />
    </svg>
);

const CrystallineGlyph: React.FC<{className?: string}> = ({ className }) => (
    <svg className={`w-16 h-16 text-[#00FF99] opacity-20 ${className}`} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M32 4L32 60" stroke="currentColor" strokeWidth="1"/>
        <path d="M22 14L42 14" stroke="currentColor" strokeWidth="1"/>
        <path d="M22 50L42 50" stroke="currentColor" strokeWidth="1"/>
        <path d="M22 14L12 32L22 50" stroke="currentColor" strokeWidth="1"/>
        <path d="M42 14L52 32L42 50" stroke="currentColor" strokeWidth="1"/>
    </svg>
);

const Section: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className = '' }) => (
    <section className={`w-full max-w-7xl mx-auto py-28 md:py-40 px-6 ${className}`}>
        {children}
    </section>
);

const FaqItem: React.FC<{ question: string, children: React.ReactNode }> = ({ question, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-gray-800">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center text-left py-6"
            >
                <span className={`text-lg font-medium ${isOpen ? 'text-[#00FF99]' : 'text-white'}`}>{question}</span>
                <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-45' : 'rotate-0'}`}>
                    <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v12m6-6H6"></path></svg>
                </span>
            </button>
            {isOpen && (
                <div className="pb-6 text-gray-400 leading-relaxed">
                    {children}
                </div>
            )}
        </div>
    );
};


// --- COMPONENTE PRINCIPAL DA LANDING PAGE ---

const LandingPage: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
    const headerRef = useRef<HTMLElement>(null);
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (headerRef.current) {
                const { top, height } = headerRef.current.getBoundingClientRect();
                const animationEnd = height * 0.8;
                const distanceScrolled = -top;
                
                const progress = Math.min(Math.max(distanceScrolled / animationEnd, 0), 1);
                setScrollProgress(progress);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial check

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const painPoints = [
        "A sensação de que seu crescimento está amarrado não à sua capacidade, mas ao seu tempo limitado para \"fazer marketing\".",
        "A frustração de ver concorrentes, muitas vezes menos qualificados, ganhando mais visibilidade porque \"jogam o jogo digital\" melhor.",
        "A paralisia de ter mil ideias (um blog, um vídeo, um novo site), mas não ter clareza de qual é a única ação que realmente trará resultado hoje.",
        "A ansiedade de saber que, enquanto você dorme, uma oportunidade de mercado pode estar surgindo, ou uma crise de reputação pode estar se formando, e você não tem como saber."
    ];
    
    const crystalPatternUrl = `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%2300FF99' stroke-width='0.5' stroke-opacity='0.07'%3E%3Cpath d='M40 0 L80 40 L40 80 L0 40 Z'/%3E%3Cpath d='M0 40 L80 40'/%3E%3Cpath d='M40 0 L40 80'/%3E%3C/g%3E%3C/svg%3E")`;


    return (
        <div className="relative w-full h-full text-[#EAEAEA] bg-[#0B0B0C] selection:bg-[#00FF99] selection:text-black">
            
            <main className="relative z-10">
                {/* SEÇÃO 1: O VEREDITO */}
                <header ref={headerRef} className="min-h-screen h-full flex flex-col justify-center items-center text-center p-6 relative">
                     <div className="absolute top-0 left-0 w-full h-full opacity-30 z-0">
                        <ThreeScene scrollProgress={scrollProgress} />
                    </div>
                    <div className="relative z-10">
                        <h1 className="text-[52px] md:text-[72px] font-bold tracking-tighter max-w-5xl leading-tight font-serif">Ser o melhor no que você faz já é o seu trabalho em tempo integral.</h1>
                        <h2 className="text-[32px] md:text-[48px] font-normal tracking-tight max-w-5xl mt-4 mb-8 font-serif text-gray-400">Fazer com que o mundo saiba disso não deveria ser o segundo.</h2>
                        <p className="text-lg md:text-xl text-gray-400 max-w-3xl mb-12 leading-relaxed" style={{ lineHeight: 1.7 }}>
                            Para cada profissional de elite – advogado, médico, arquiteto, consultor – existe um universo paralelo de tarefas que não tem nada a ver com seu talento: marketing digital, gestão de reputação, análise de concorrência, prospecção. Um universo que drena sua energia e limita seu impacto. Nós não existimos para te ajudar com esse universo. Existimos para que ele deixe de ser um problema seu.
                        </p>
                        <button
                            onClick={onLogin}
                            className="px-8 py-4 bg-[#00FF99] text-black font-bold rounded-lg text-lg transform transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(0,255,153,0.6)] active:scale-100"
                        >
                            <span className="font-mono">&gt;</span> Iniciar Diagnóstico de Posição Competitiva
                        </button>
                    </div>
                </header>

                {/* SEÇÃO 2: O SINTOMA UNIVERSAL */}
                <Section className="flex flex-col items-center text-center">
                    <h2 className="text-[48px] md:text-[56px] font-bold font-serif mb-16">O Teto de Vidro do Talento.</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl">
                        {painPoints.map((point, index) => (
                            <div key={index} className="bg-[#111112]/50 backdrop-blur-sm border border-gray-800/50 rounded-lg p-6 flex items-start text-left gap-4">
                                <CheckIcon className="w-7 h-7 text-[#00FF99] mt-1 flex-shrink-0" />
                                <p className="text-gray-300 leading-relaxed">{point}</p>
                            </div>
                        ))}
                    </div>
                </Section>
                
                {/* --- SEPARADOR --- */}
                <div className="w-full flex justify-center py-16">
                    <CrystallineGlyph className="w-24 h-24 text-[#00FF99] opacity-5" />
                </div>

                {/* SEÇÃO 3: A FALSA CURA */}
                <Section className="flex flex-col items-center text-center">
                    <h2 className="text-[48px] md:text-[56px] font-bold font-serif mb-16 max-w-4xl">Você já tentou de tudo. E a culpa não é sua.</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                        <div className="bg-gray-950/50 border border-gray-800 p-8 rounded-xl transition-all duration-300 hover:border-[#00FF99]/30 hover:bg-gray-900 hover:-translate-y-2"><AgencyIcon className="text-gray-500 mb-4 mx-auto" /><h3 className="text-2xl font-bold mb-3">Contratar uma Agência</h3><p className="text-gray-400 text-base leading-relaxed">Elas te vendem um pacote de "serviços": posts, anúncios, SEO. São executores de tarefas, não parceiros estratégicos. O resultado é genérico e desalinhado com a sofisticação do seu trabalho.</p></div>
                        <div className="bg-gray-950/50 border border-gray-800 p-8 rounded-xl transition-all duration-300 hover:border-[#00FF99]/30 hover:bg-gray-900 hover:-translate-y-2"><FreelancerIcon className="text-gray-500 mb-4 mx-auto" /><h3 className="text-2xl font-bold mb-3">Contratar um Freelancer</h3><p className="text-gray-400 text-base leading-relaxed">Você encontra um bom profissional, mas ele é um especialista em uma única área. Ele não tem a visão do todo. Você se torna o gerente de múltiplos freelancers, adicionando mais uma tarefa à sua lista.</p></div>
                        <div className="bg-gray-950/50 border border-gray-800 p-8 rounded-xl transition-all duration-300 hover:border-[#00FF99]/30 hover:bg-gray-900 hover:-translate-y-2"><DIYIcon className="text-gray-500 mb-4 mx-auto" /><h3 className="text-2xl font-bold mb-3">Fazer Sozinho</h3><p className="text-gray-400 text-base leading-relaxed">Você gasta seus fins de semana assistindo a tutoriais no YouTube. Seu foco, que deveria estar 100% no seu cliente, agora está dividido. Seu bem mais precioso – sua energia mental – está sendo desperdiçado.</p></div>
                    </div>
                </Section>

                {/* SEÇÃO 4: A CAUSA RAIZ */}
                <Section className="text-center">
                    <h2 className="text-[48px] md:text-[56px] font-bold font-serif mb-6 max-w-5xl mx-auto">O problema não são as ferramentas. É a falta de uma Célula de Inteligência dedicada a você.</h2>
                    <p className="text-2xl text-gray-400 max-w-4xl mx-auto leading-relaxed">Pense nas maiores corporações. Elas não têm "um cara de marketing". Elas têm unidades de inteligência de mercado, equipes de estratégia, analistas de dados. Elas têm um cérebro externo focado exclusivamente em navegar o campo de batalha competitivo. O profissional de alta performance, até hoje, estava sozinho. Era você contra o mundo.</p>
                </Section>
                
                {/* --- SEPARADOR --- */}
                <div className="w-full flex justify-center py-16">
                    <CrystallineGlyph className="w-24 h-24 text-[#00FF99] opacity-5" />
                </div>

                {/* SEÇÃO 5: A REVELAÇÃO */}
                <Section className="text-center flex flex-col items-center">
                    <h2 className="text-[52px] md:text-[64px] font-bold font-serif mb-12 max-w-5xl">Nós não somos uma agência. Somos a sua Célula de Inteligência Externa.</h2>
                    <div className="w-full h-auto max-h-[600px] flex items-center justify-center mb-12 px-4">
                        <CrystalSphereIcon />
                    </div>
                    <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">Uma unidade compacta, de altíssimo nível, que opera como uma extensão da sua mente. Nossa única função é processar a complexidade do seu mercado e traduzi-la em uma única coisa: <strong>a próxima ação estratégica correta</strong>. Nós fornecemos o "o quê" e o "porquê". Você mantém o controle total e o foco no seu talento.</p>
                </Section>
                
                {/* SEÇÃO 6: COMO A CÉLULA OPERA */}
                <Section>
                    <div className="text-center mb-16">
                         <h2 className="text-[48px] md:text-[56px] font-bold font-serif mb-4">Como a Célula Opera</h2>
                         <p className="text-xl text-gray-400">Nossa metodologia é dividida em três sistemas que operam em ciclos contínuos.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div className="bg-gray-950/30 p-8 rounded-xl"><div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center text-[#00FF99]"><OlhoCristalinoIcon /></div><h3 className="text-2xl font-bold mb-3 font-serif">IMERSÃO TOTAL (Diagnóstico)</h3><p className="text-gray-400 leading-relaxed">Antes de qualquer ação, realizamos um mapeamento profundo. Não apenas do seu negócio, mas de todo o seu ecossistema competitivo. Entregamos um Dossiê de Posição Estratégica que se torna a sua "verdade fundamental". Você saberá exatamente onde pisa.</p></div>
                        <div className="bg-gray-950/30 p-8 rounded-xl"><div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center text-[#00FF99]"><RedeSensorialIcon /></div><h3 className="text-2xl font-bold mb-3 font-serif">VIGILÂNCIA ESTRATÉGICA (Monitoramento)</h3><p className="text-gray-400 leading-relaxed">Com a base estabelecida, nossos sistemas entram em modo de vigilância 24/7. Monitoramos seus concorrentes, menções à sua marca, novas legislações, tendências de busca. Transformamos o ruído da internet em sinais claros de ameaça ou oportunidade.</p></div>
                        <div className="bg-gray-950/30 p-8 rounded-xl"><div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center text-[#00FF99]"><VetorDeImpactoIcon /></div><h3 className="text-2xl font-bold mb-3 font-serif">AÇÃO DE PRECISÃO (Execução)</h3><p className="text-gray-400 leading-relaxed">Com base nos sinais captados, a Célula define e propõe a "Ação de Alavancagem" do ciclo: uma única iniciativa projetada para gerar o máximo impacto com o mínimo de esforço seu.</p></div>
                    </div>
                </Section>

                {/* --- SEPARADOR --- */}
                <div className="w-full flex justify-center py-16">
                    <CrystallineGlyph className="w-24 h-24 text-[#00FF99] opacity-5" />
                </div>

                {/* SEÇÃO 7: A ANATOMIA DA AÇÃO */}
                <Section>
                    <div className="flex flex-col md:flex-row gap-12 items-center">
                        <div className="md:w-1/3">
                            <h2 className="text-[48px] font-bold font-serif leading-tight">"Ação de Precisão" não é um conceito. É um entregável.</h2>
                        </div>
                        <div className="md:w-2/3 bg-black/50 border border-gray-800 rounded-xl p-8 font-mono text-sm relative overflow-hidden">
                            <CrystallineGlyph className="absolute -top-4 -left-4" />
                            <CrystallineGlyph className="absolute -top-4 -right-4 transform rotate-90" />
                            <CrystallineGlyph className="absolute -bottom-4 -left-4 transform -rotate-90" />
                            <CrystallineGlyph className="absolute -bottom-4 -right-4 transform rotate-180" />
                            <p><span className="text-[#00FF99]">&gt; Cliente:</span> Advocacia especializada em Direito Tributário.</p>
                            <p className="mt-2"><span className="text-[#00FF99]">&gt; Sinal Detectado (Vigilância):</span> Aumento de 300% nas buscas por "reforma tributária para pequenas empresas" no último mês.</p>
                            <p className="mt-2"><span className="text-[#00FF99]">&gt; Análise da Célula:</span> Concorrentes estão produzindo conteúdo genérico. Nenhum criou uma ferramenta prática.</p>
                            <p className="mt-4 p-4 bg-gray-800/50 border border-[#00FF99]/30 rounded"><span className="text-[#00FF99] font-bold">&gt; Proposta de Ação de Precisão:</span> "Vamos criar e promover uma 'Calculadora de Impacto da Reforma Tributária'. Isso irá gerar leads ultra-qualificados e te posicionar como a maior autoridade no assunto mais quente do momento. Nós cuidamos do desenvolvimento, do design e da estratégia de divulgação."</p>
                            <p className="mt-4"><span className="text-[#00FF99]">&gt; Resultado:</span> Clareza, autoridade e novos negócios. Zero sobrecarga para o cliente.</p>
                        </div>
                    </div>
                </Section>
                
                {/* SEÇÃO 8: PROVA SOCIAL */}
                <Section>
                    <div 
                        className="bg-gradient-to-br from-[#0B0B0C] to-indigo-900/40 border border-gray-800 rounded-3xl p-10 md:p-20 text-center relative overflow-hidden"
                        style={{ backgroundImage: `${crystalPatternUrl}, linear-gradient(to bottom right, #0B0B0C, #1E1B4B)` }}
                    >
                         <p className="absolute top-10 left-10 font-serif text-[120px] text-[#00FF99]/10 leading-none">"</p>
                        <p className="font-serif text-3xl md:text-4xl text-white italic leading-relaxed md:leading-relaxed max-w-4xl mx-auto relative z-10">"Eu não contratei uma empresa, eu ganhei um sócio. A diferença é que este sócio não me pede nada, só me entrega clareza e resultados. Pela primeira vez em dez anos de carreira, eu durmo em paz sabendo que alguém está vigiando meu castelo por mim."</p>
                        <div className="mt-8 relative z-10">
                            <p className="font-bold text-lg text-white">Dra. Carolina Mendes</p>
                            <p className="text-indigo-300">Cirurgiã Plástica</p>
                        </div>
                    </div>
                </Section>
                
                {/* --- SEPARADOR --- */}
                <div className="w-full flex justify-center py-16">
                    <CrystallineGlyph className="w-24 h-24 text-[#00FF99] opacity-5" />
                </div>

                {/* SEÇÃO 9: O MANIFESTO */}
                <Section className="flex flex-col items-center text-center">
                    <h2 className="text-[48px] md:text-[56px] font-bold font-serif mb-16">Nossas Crenças Inegociáveis.</h2>
                    <div className="space-y-8 max-w-3xl">
                        {[
                            "Acreditamos que o talento não deveria ser penalizado pela complexidade.",
                            "Acreditamos que a estratégia precede a tática, sempre.",
                            "Acreditamos em fazer uma única coisa extraordinariamente bem, em vez de dez coisas de forma medíocre.",
                            "Acreditamos que a verdadeira parceria é medida em impacto, não em horas ou tarefas.",
                            "Acreditamos que a sua paz de espírito é o nosso principal KPI."
                        ].map((crenca, index) => (
                             <div key={index} className="flex items-start gap-6 text-left">
                                <p className="font-serif text-4xl text-[#00FF99] mt-[-5px]">0{index+1}</p>
                                <p className="text-2xl text-gray-300 leading-relaxed">{crenca}</p>
                            </div>
                        ))}
                    </div>
                </Section>
                
                {/* SEÇÃO 10: O FILTRO */}
                <Section className="flex flex-col items-center text-center">
                     <h2 className="text-[48px] md:text-[56px] font-bold font-serif mb-6 max-w-3xl">Não somos para todos. E isso é intencional.</h2>
                     <p className="text-lg text-gray-400 max-w-4xl mx-auto leading-relaxed">Nossa Célula exige um nível de confiança e delegação que não se encaixa em todos os perfis. Não somos a escolha certa se você:</p>
                     <ul className="text-lg text-gray-400 max-w-2xl mx-auto mt-8 space-y-2 list-disc list-inside text-left">
                         <li>Procura o <strong>"orçamento mais barato"</strong> em vez do maior valor estratégico.</li>
                         <li>Gosta de <strong>microgerenciar</strong> cada detalhe tático da operação.</li>
                         <li>Precisa de resultados <strong>"para ontem"</strong> e não entende o poder do crescimento consistente e composto.</li>
                         <li>Vê esta parceria como um <strong>"custo"</strong>, e não como o investimento mais importante na sua própria capacidade de foco e excelência.</li>
                     </ul>
                </Section>
                
                {/* --- SEPARADOR --- */}
                <div className="w-full flex justify-center py-16">
                    <CrystallineGlyph className="w-24 h-24 text-[#00FF99] opacity-5" />
                </div>

                {/* SEÇÃO 11: O PROCESSO DE ATIVAÇÃO */}
                <Section>
                    <div className="text-center mb-16">
                         <h2 className="text-[48px] md:text-[56px] font-bold font-serif mb-4">Ativar sua Célula é um processo de alinhamento, não de venda.</h2>
                    </div>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-center relative">
                        {/* Linha de conexão */}
                        <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-gray-800 -translate-y-1/2"></div>
                        
                        <div className="relative z-10 flex-1 bg-[#0B0B0C] p-4"><p className="font-serif text-8xl text-gray-800">1</p><h3 className="font-bold text-2xl mt-[-20px]">Aplicação</h3><p className="text-gray-400 mt-2 max-w-xs mx-auto">Você preenche um formulário detalhado. É a sua parte do trabalho, e nos mostra seu nível de comprometimento.</p></div>
                        <div className="relative z-10 flex-1 bg-[#0B0B0C] p-4"><p className="font-serif text-8xl text-gray-800">2</p><h3 className="font-bold text-2xl mt-[-20px]">Diagnóstico Inicial</h3><p className="text-gray-400 mt-2 max-w-xs mx-auto">Nossa equipe realiza a Imersão Total, sem custo. É o nosso "teste de aptidão" mútuo.</p></div>
                        <div className="relative z-10 flex-1 bg-[#0B0B0C] p-4"><p className="font-serif text-8xl text-gray-800">3</p><h3 className="font-bold text-2xl mt-[-20px]">Sessão de Alinhamento</h3><p className="text-gray-400 mt-2 max-w-xs mx-auto">Apresentamos o Dossiê Estratégico. Se a visão for compartilhada, a parceria é ativada.</p></div>
                    </div>
                </Section>
                
                {/* SEÇÃO 12: O INVESTIMENTO */}
                <Section className="text-center">
                    <h2 className="text-[48px] md:text-[56px] font-bold font-serif mb-6 max-w-4xl mx-auto">Uma parceria, não uma transação.</h2>
                    <p className="text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed">Não acreditamos em pacotes ou orçamentos fixos, porque o valor que geramos é contínuo e variável. Nosso modelo é simples: existe uma <strong>assinatura de base</strong> para manter a Célula de Vigilância ativa. Cada <strong>Ação de Precisão</strong> é proposta como um projeto individual, com um investimento claro e um ROI esperado. Você tem controle total sobre o ritmo e a intensidade. É um modelo de confiança total, alinhado ao seu crescimento.</p>
                </Section>
                
                {/* SEÇÃO 13: FAQ */}
                <Section className="max-w-4xl mx-auto">
                    <h2 className="text-[48px] md:text-[56px] font-bold font-serif mb-12 text-center">As Últimas Barreiras</h2>
                    <FaqItem question="Isso é consultoria?">
                        Não. Consultores entregam um plano e vão embora. Nós ficamos. Nós monitoramos e ajudamos a executar.
                    </FaqItem>
                    <FaqItem question="Quanto tempo até ver resultados?">
                        A clareza é imediata, na Sessão de Alinhamento. Os resultados de negócio são uma consequência de ações estratégicas consistentes, geralmente visíveis no primeiro trimestre.
                    </FaqItem>
                    <FaqItem question="Eu preciso aprovar cada ação?">
                        Sim. A Célula propõe. Você dá a luz verde. A autoridade final é sempre sua.
                    </FaqItem>
                </Section>
                
                {/* SEÇÃO 14: O CHAMADO FINAL */}
                <Section className="text-center flex flex-col items-center">
                     <h2 className="text-[48px] md:text-[64px] font-bold tracking-tighter max-w-4xl leading-tight font-serif">Seu talento é finito. Sua energia é preciosa. Onde você vai investi-los amanhã?</h2>
                     <p className="text-xl text-gray-400 max-w-3xl my-10 leading-relaxed">
                        Continuar fazendo tudo sozinho não é uma opção, é uma sentença de estagnação. O próximo passo não é um compromisso. É um pedido de clareza.
                    </p>
                    <button
                        onClick={onLogin}
                        className="px-10 py-5 bg-[#00FF99] text-black font-bold rounded-lg text-xl transform transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(0,255,153,0.6)] active:scale-100"
                    >
                       <span className="font-mono">&gt;</span> Solicitar meu Diagnóstico de Posição Competitiva
                    </button>
                    <p className="text-sm italic text-gray-500 mt-6">Devido à profundidade do nosso trabalho, ativamos apenas 2 novas Células por mês. As vagas para o próximo mês estão abertas.</p>
                </Section>

                {/* --- FOOTER --- */}
                <footer className="text-center py-12 border-t border-gray-900">
                    <p className="font-bold text-lg text-white mb-2">MySite</p>
                    <p className="text-gray-500">© {new Date().getFullYear()} — Uma Célula de Inteligência para sua Excelência.</p>
                </footer>
            </main>
        </div>
    );
};

export default LandingPage;
