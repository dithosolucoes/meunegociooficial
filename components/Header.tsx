import React from 'react';
import { PlusIcon } from './icons/PlusIcon';

type ActivePage = 'painel' | 'dados';

interface HeaderProps {
  onLogout: () => void;
  onNewProjectClick: () => void;
  activePage: ActivePage;
  onNavigate: (page: ActivePage) => void;
}

const Header: React.FC<HeaderProps> = ({ onLogout, onNewProjectClick, activePage, onNavigate }) => {
  const navItemClasses = "px-3 py-2 rounded-md text-sm font-medium transition-colors";
  const activeNavItemClasses = "bg-gray-800 text-white";
  const inactiveNavItemClasses = "text-gray-400 hover:bg-gray-700 hover:text-white";

  return (
    <header className="bg-black/50 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-40">
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <h1 className="text-xl font-bold text-white">MySite</h1>
            <nav className="hidden md:flex items-baseline space-x-4">
              <button 
                onClick={() => onNavigate('painel')}
                className={`${navItemClasses} ${activePage === 'painel' ? activeNavItemClasses : inactiveNavItemClasses}`}
              >
                Painel
              </button>
              <button 
                onClick={() => onNavigate('dados')}
                className={`${navItemClasses} ${activePage === 'dados' ? activeNavItemClasses : inactiveNavItemClasses}`}
              >
                Dados
              </button>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onNewProjectClick}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-br from-indigo-600 to-indigo-700 text-white font-semibold rounded-lg hover:from-indigo-500 hover:to-indigo-600 shadow-lg shadow-indigo-500/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-indigo-500 transition-all duration-300"
            >
              <PlusIcon />
              <span className="hidden sm:inline">Implantar Novo Site</span>
            </button>
            <button onClick={onLogout} className="px-4 py-2 bg-gray-800 text-gray-300 font-semibold rounded-lg hover:bg-gray-700 transition-colors duration-300">
              Sair
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
