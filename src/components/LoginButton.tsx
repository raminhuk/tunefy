'use client';
import React from 'react';

const SCOPES = ['user-top-read'];

const handleLogin = () => {
    const token = localStorage.getItem('access_token');

    if (token) {
        window.location.href = '/tracks'
        return
    }

    const params = new URLSearchParams();
    params.set('response_type', 'token');
    params.set('client_id', process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID || '');
    params.set('redirect_uri', process.env.NEXT_PUBLIC_REDIRECT_URI || '');
    params.set('scope', SCOPES.join(' '));

    window.location.href = `https://accounts.spotify.com/authorize?${params}`;
};

const LoginButton = () => {
    return (
        <button onClick={handleLogin} className="bg-green-500 text-black rounded-full px-8 py-3 border-4 hover:bg-green-600">Login Spotify</button>
    );
};

export default LoginButton;

