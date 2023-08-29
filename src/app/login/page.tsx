'use client';
import React, { useEffect } from 'react';
const SCOPES = ['user-top-read'];


export default function Login() {
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
    
    useEffect(() => {
        const hashParams = new URLSearchParams(window.location.hash.substr(1));
        const token = hashParams.get('access_token');

        if (token) {
            localStorage.setItem("access_token", token);
        }
        window.location.href = 'tracks'
    }, []);

    return (
        <div>Autenticando...</div>
    );
};