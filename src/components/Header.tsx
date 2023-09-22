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
        <header className="text-white">
            <div className="max-w-7xl w-11/12 mx-auto flex justify-between lg:flex-row justify-center lg:justify-between items-center lg:items-center py-3">
                <div className="flex items-center">
                    <Link href="/" className="flex items-center gap-2">
                        <h1 className={`text-transparent bg-gradient-to-r from-customPink via-customPink2 to-customBlue bg-clip-text font-extrabold text-2xl tracking-widest ${nunito.className}`}>TUNEFY</h1>
                        <Image width={64} height={31} className="h-auto w-16" src="../tunefy-logo.svg" alt="Logo Tunefy" />
                    </Link>
                </div>

                <div className="lg:hidden flex items-center">
                    <button onClick={toggleMobileMenu} className="text-white p-2 focus:outline-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            {isMobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                <nav className={`fixed lg:flex lg:relative ${isMobileMenuOpen ? 'flex flex-col top-16 bg-gray-800 left-0 w-full' : 'hidden'}`}>
                    <Link href="/" className="lg:px-6 py-8 px-4 hover:text-gray-400">Home</Link>
                    <Link href="/tracks" className="lg:px-6 py-8 px-4 hover:text-gray-400">Top Tracks</Link>
                    <Link href="/artists" className="lg:px-6 py-8 px-4 hover:text-gray-400">Top Artists</Link>
                    <Link href="/genres" className="lg:px-6 py-8 px-4 hover:text-gray-400">Top Genres</Link>
                    <Link href="/recently" className="lg:px-6 py-8 px-4 hover:text-gray-400">Recently Played</Link>
                </nav>

                <User/>
            </div>
        </header>
    );
};

export default Header;