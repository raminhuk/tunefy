'use client'
import { Nunito_Sans } from 'next/font/google';
import Image from 'next/image';
import React, { useState } from 'react';
import User from './User';
import Link from 'next/link';
import { MdClose } from "react-icons/md";
import { saveLocalStorage } from '../utils/savelocalStorage';
import { usePathname } from 'next/navigation';
import { PlayTrack } from './PlayTrack';


const nunito = Nunito_Sans({
    weight: ['200', '400', '600', '800'],
    subsets: ['latin'],
})

interface HeaderProps {
    onLoginClick?: () => void;
}

export function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    const pathname = usePathname()
    if (pathname !== '/callback' && pathname !== '/login') {
        saveLocalStorage('path', pathname);
    }


    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <header className="text-white relative z-20">
            <PlayTrack/>
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

                <div className={`${isMobileMenuOpen ? 'visible opacity-100' : 'invisible opacity-0 lg:visible lg:opacity-100'} flex z-10 lg:w-auto lg:h-auto w-full h-screen left-0 top-0 fixed lg:flex lg:relative`}>
                    <div className={`relative z-10 flex w-10/12 bg-white lg:w-auto lg:bg-transparent flex-col transition-transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
                        <div className="flex items-center justify-between lg:hidden p-3 bg-gray-50">
                            <span className="flex gap-2">
                                <h1 className={`text-transparent bg-gradient-to-r from-customPink via-customPink2 to-customBlue bg-clip-text font-extrabold text-2xl tracking-widest ${nunito.className}`}>TUNEFY</h1>
                                <Image width={64} height={31} className="h-auto w-16" src="../tunefy-logo.svg" alt="Logo Tunefy" />
                            </span>
                            <span className="p-2" onClick={toggleMobileMenu}>
                                <MdClose size={25} color="#b6b6b6"/>
                            </span>
                        </div>
                        <nav className={`lg:flex-row flex-col flex lg:relative text-sm lg:text-base text-gray-400 lg:text-gray-100`}>
                            <Link
                                onClick={toggleMobileMenu}
                                href="/"
                                className="relative lg:border-none border-b border-gray-100 border-solid px-6 py-4 lg:px-6 lg:py-8 lg:px-4 group"
                            >
                                <span className={`w-full h-1 absolute bottom-0 left-0 bg-gradient-to-r from-customPink via-customPink2 to-customBlue ${pathname === '/' ? 'lg:block hidden' : 'hidden' } group-hover:block`}></span>
                                Principal
                            </Link>
                            <Link 
                                onClick={toggleMobileMenu}
                                href="/tracks"
                                className="relative lg:border-none border-b border-gray-100 border-solid px-6 py-4 lg:px-6 lg:py-8 lg:px-4 group"
                            >
                                <span className={`w-full h-1 absolute bottom-0 left-0 bg-gradient-to-r from-customPink via-customPink2 to-customBlue ${pathname === '/tracks' ? 'lg:block hidden' : 'hidden' } group-hover:block`}></span>
                                Top Músicas
                            </Link>
                            <Link
                                onClick={toggleMobileMenu}
                                href="/artists"
                                className="relative lg:border-none border-b border-gray-100 border-solid px-6 py-4 lg:px-6 lg:py-8 lg:px-4 group"
                            >
                                <span className={`w-full h-1 absolute bottom-0 left-0 bg-gradient-to-r from-customPink via-customPink2 to-customBlue ${pathname === '/artists' ? 'lg:block hidden' : 'hidden' } group-hover:block`}></span>
                                Top Artistas
                            </Link>
                            <Link
                                onClick={toggleMobileMenu}
                                href="/genres"
                                className="relative lg:border-none border-b border-gray-100 border-solid px-6 py-4 lg:px-6 lg:py-8 lg:px-4 group"
                            >
                                <span className={`w-full h-1 absolute bottom-0 left-0 bg-gradient-to-r from-customPink via-customPink2 to-customBlue ${pathname === '/genres' ? 'lg:block hidden' : 'hidden' } group-hover:block`}></span>
                                Top Generos
                            </Link>
                            <Link
                                onClick={toggleMobileMenu}
                                href="/recently"
                                className="relative lg:border-none border-b border-gray-100 border-solid px-6 py-4 lg:px-6 lg:py-8 lg:px-4 group"
                            >
                                <span className={`w-full h-1 absolute bottom-0 left-0 bg-gradient-to-r from-customPink via-customPink2 to-customBlue ${pathname === '/recently' ? 'lg:block hidden' : 'hidden' } group-hover:block`}></span>
                                Últimas Ouvidas
                            </Link>
                        </nav>
                    </div>
                    <span onClick={toggleMobileMenu} className="lg:hidden block absolute left-0 top-0 w-full h-screen bg-black bg-opacity-60"></span>
                </div>

                <User/>
            </div>
        </header>
    );
};

export default Header;