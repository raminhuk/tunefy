import { Nunito_Sans } from 'next/font/google';
import Image from 'next/image';
import React from 'react';
import User from './User';


const nunito = Nunito_Sans({
    weight: ['200', '400', '600', '800'],
    subsets: ['latin'],
})

interface HeaderProps {
    onLoginClick?: () => void;
}

export function Header() {
    return (
        <header className="text-white">
            <div className="max-w-7xl w-11/12 mx-auto flex justify-between items-center">
                <div className="flex items-center h-auto py-3">
                    <a href="/" className="flex items-center gap-2">
                        <h1 className={`text-transparent bg-gradient-to-r from-customPink via-customPink2 to-customBlue bg-clip-text font-extrabold text-2xl tracking-widest ${nunito.className}`}>TUNEFY</h1>
                        <Image width={64} height={31} className="h-auto w-16" src="../tunefy-logo.svg" alt="Logo Tunefy" />
                    </a>
                </div>
                <nav className="flex">
                    <a href="/" className="px-6 py-8 hover:text-gray-400">Home</a>
                    <a href="/tracks" className="px-6 py-8 hover:text-gray-400">Top Tracks</a>
                    <a href="/artists" className="px-6 py-8 hover:text-gray-400">Top Artists</a>
                    <a href="/genres" className="px-6 py-8 hover:text-gray-400">Top Genres</a>
                    <a href="/recently" className="px-6 py-8 hover:text-gray-400">Recently Played</a>

                </nav>

                <User/>
            </div>
        </header>
    );
};

export default Header;