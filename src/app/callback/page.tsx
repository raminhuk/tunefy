'use client';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { ImSpinner2 } from 'react-icons/im';

export default function CallbackPage() {
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.getItem('path');
            router.push(localStorage.getItem('path') ?? '/tracks');
        }

    }, [router]);

    return (
        <div className='w-full h-full'>
            <div className='flex justify-center flex-col gap-4 items-center h-full w-full left-0 top-0 absolute'>
                <span>Autenticando...</span>
                <ImSpinner2 className="animate-spin text-customBlue text-4xl" />
            </div>
        </div>
    );
};