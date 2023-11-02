import { Nunito_Sans } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const nunito = Nunito_Sans({
    weight: ['200', '400', '600', '800'],
    subsets: ['latin'],
})

export function Footer() {
    return (
        
    <footer className="bg-zinc-950 shadow mt-10">
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
            <div className="sm:flex sm:items-center sm:justify-between">
                <Link href="/" className="flex items-center gap-2">
                    <h1 className={`text-transparent bg-gradient-to-r from-customPink via-customPink2 to-customBlue bg-clip-text font-extrabold text-2xl tracking-widest ${nunito.className}`}>TUNEFY</h1>
                    <Image width={64} height={31} className="h-auto w-16" src="../tunefy-logo.svg" alt="Logo Tunefy" />
                </Link>
                <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                    <li>
                        <Link href="/" className="lg:px-6 py-8 px-4 hover:text-gray-400">Quem Somos</Link>
                    </li>
                    <li>
                        <Link href="/" className="lg:px-6 py-8 px-4 hover:text-gray-400">Política e privacidade</Link>
                    </li>
                    <li>
                        <Link href="/" className="lg:px-6 py-8 px-4 hover:text-gray-400">Faq</Link>
                    </li>
                    <li>
                        <Link href="/" className="lg:px-6 py-8 px-4 hover:text-gray-400">Contato</Link>
                    </li>
                </ul>
            </div>
            <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-800 lg:my-8" />
            <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <Link href="/" className="hover:underline">TuneFy</Link>. All Rights Reserved.</span>
        </div>
    </footer>


    );
};

export default Footer;
