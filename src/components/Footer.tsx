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
                        <Link href="/" className="lg:px-6 py-8 px-4 hover:text-customPink2">About</Link>
                    </li>
                    <li>
                        <Link href="/" className="lg:px-6 py-8 px-4 hover:text-customPink2">Privacy Policy</Link>
                    </li>
                    <li>
                        <Link href="/" className="lg:px-6 py-8 px-4 hover:text-customPink2">Faq</Link>
                    </li>
                    <li>
                        <Link href="/" className="lg:px-6 py-8 px-4 hover:text-customPink2">Contact</Link>
                    </li>
                </ul>
            </div>
            <hr className="my-6 border-zinc-900 sm:mx-auto lg:my-8" />
            <span className="block text-sm sm:text-center text-gray-400">© 2023 <Link href="/" className="hover:underline">TuneFy</Link>. All Rights Reserved.</span>
        </div>
    </footer>


    );
};

export default Footer;
