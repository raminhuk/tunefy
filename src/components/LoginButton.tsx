'use client';
import React from 'react';
import { FaSpotify } from 'react-icons/fa';

const handleLogin = () => {
    window.location.href = '/tracks'
};

const LoginButton = () => {
    return (
        <button
            onClick={handleLogin}
            className="flex items-center gap-2 bg-green-500 text-black rounded-full px-8 py-3 border-b-4 border-b-green-700 border-em hover:bg-green-600">
            <FaSpotify size="1.2em"/>
            Login Spotify
        </button>
    );
};

export default LoginButton;

