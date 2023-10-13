'use client'
import { Nunito_Sans } from 'next/font/google';
import Image from 'next/image';
import React, { useState } from 'react';
import User from './User';
import Link from 'next/link';


const nunito = Nunito_Sans({
    weight: ['200', '400', '600', '800'],
    subsets: ['latin'],
})

interface HeaderProps {
    onLoginClick?: () => void;
}

export function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <header className="text-white relative z-20">
            <div className="py-3 max-w-7xl w-11/12 mx-auto flex justify-between lg:flex-row justify-center lg:justify-between items-center lg:items-center lg:py-0" >
                <div className="flex items-center justify-center flex-1 lg:flex-none">
                    <Link href="/" className="flex items-center gap-2">
                        <h1 className={`text-transparent bg-gradient-to-r from-customPink via-customPink2 to-customBlue bg-clip-text font-extrabold text-2xl tracking-widest ${nunito.className}`}>TUNEFY</h1>
                        <Image width={64} height={31} className="h-auto w-16" src="../tunefy-logo.svg" alt="Logo Tunefy" />
                    </Link>
                </div>

                <div className="lg:hidden -order-1 flex items-center">
                    <button onClick={toggleMobileMenu} className="flex flex-col gap-1.5 text-white p-2 focus:outline-none">
                        <span className="w-6 h-0.5 bg-white"></span>
                        <span className="w-6 h-0.5 bg-white"></span>
                        <span className="w-6 h-0.5 bg-white"></span>
                    </button>
                </div>

                <div className="flex">
                    <div className="flex">
                        <nav className={`fixed lg:flex lg:relative ${isMobileMenuOpen ? 'flex flex-col top-16 bg-gray-800 left-0 w-full' : 'hidden'}`}>
                            <Link href="/" className="lg:px-6 py-8 px-4 hover:text-gray-400">Principal</Link>
                            <Link href="/tracks" className="lg:px-6 py-8 px-4 hover:text-gray-400">Top Músicas</Link>
                            <Link href="/artists" className="lg:px-6 py-8 px-4 hover:text-gray-400">Top Artistas</Link>
                            <Link href="/genres" className="lg:px-6 py-8 px-4 hover:text-gray-400">Top Generos</Link>
                            <Link href="/recently" className="lg:px-6 py-8 px-4 hover:text-gray-400">Últimas Ouvidas</Link>
                        </nav>
                    </div>
                </div>

                <User/>
            </div>
        </header>
    );
};

export default Header;