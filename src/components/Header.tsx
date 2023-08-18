import React from 'react';

interface HeaderProps {
    onLoginClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLoginClick }) => {
    return (
        <header className="fixed top-0 left-0 right-0 text-white">
            <div className="max-w-7xl w-11/12 mx-auto flex justify-between items-center">
                <div className="flex items-center h-auto w-28 mr-2">
                    <a href="/">
                        <img className="h-auto w-28" src="../tunefy-logo.svg" alt="Logo" />
                    </a>
                </div>
                <nav className="flex">
                    <a href="/" className="px-6 py-8 hover:text-gray-400">Principal</a>
                    <a href="/sobre" className="px-6 py-8 hover:text-gray-400">Sobre</a>
                    <a href="/politica" className="px-6 py-8 hover:text-gray-400">Política de Privacidade</a>
                    <a href="/contato" className="px-6 py-8 hover:text-gray-400">Contato</a>
                </nav>
            </div>
        </header>
    );
};

export default Header;