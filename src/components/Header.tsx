import React from 'react';

interface HeaderProps {
  onLoginClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLoginClick }) => {
  return (
    <header className="bg-blue-950 text-white">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="flex items-center h-10 w-20 mr-2">
          <img src="../tunefy-logo.svg" alt="Logo"/>
        </div>
        <nav className="space-x-6">
          <a href="#" className="hover:text-gray-400">Principal</a>
          <a href="#" className="hover:text-gray-400">Sobre</a>
          <a href="#" className="hover:text-gray-400">Política de Privacidade</a>
          <a href="#" className="hover:text-gray-400">Contato</a>
        </nav>
        <button
          className="bg-blue-900 hover:bg-blue-800 text-white px-4 py-2 rounded"
        >
          Login
        </button>
      </div>
    </header>
  );
};

export default Header;