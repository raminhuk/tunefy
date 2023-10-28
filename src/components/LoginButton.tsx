'use client';

import React from 'react';
import { FaSpotify } from 'react-icons/fa';
import { useUserStore } from '../store/userStore';
import Link from 'next/link';
import Image from 'next/image';

const handleLogin = () => {
    window.location.href = '/tracks'
};

const LoginButton = () => {
    const { user } = useUserStore();

    return (
        <>
            {user ? (
                <span>
                <Link href="/tracks">
                <button
                    className="flex items-center gap-2 bg-green-500 text-black rounded-full px-6 py-3 border-b-4 border-b-green-700 border-em hover:bg-green-600">
                    <div className="lg:w-6 lg:h-6 w-5 h-5 rounded-full overflow-hidden">
                        <Image
                            src={user.images[0].url}
                            alt={user.display_name}
                            width={20}
                            height={20}
                            className="w-full h-full object-cover cursor-pointer"
                        />
                    </div>
                    Top Músicas
                </button>
                </Link>
                
                </span>
            ) : (
                <button
                    onClick={handleLogin}
                    className="flex items-center gap-2 bg-green-500 text-black rounded-full px-6 py-3 border-b-4 border-b-green-700 border-em hover:bg-green-600">
                    <FaSpotify size="1.2em"/>
                    Login Spotify
                </button>
            )}
        </>
    );
};

export default LoginButton;

