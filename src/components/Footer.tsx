import Link from 'next/link';
import React from 'react';

export function Footer() {
    return (
        <footer className="bg-neutral-950 text-white py-8">
            <div className="container mx-auto flex flex-col items-center">
                <ul className="flex space-x-2">
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
                <div className="mt-4 flex space-x-4">
                    
                </div>
            </div>
        </footer>
    );
};

export default Footer;
