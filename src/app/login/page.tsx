'use client';
import React, { useEffect } from 'react';
import { getSpotifyAccessToken } from '../../auth/spotifyToken';
import { useRouter } from 'next/navigation'

const LoginPage = () => {
    const router = useRouter();

    const SCOPES = ['user-top-read', 'streaming', 'user-read-email', 'user-read-private, playlist-modify-public, playlist-modify-private'];
    const params = new URLSearchParams({
        response_type: 'token',
        client_id: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID || '',
        redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI || '',
        scope: SCOPES.join(' '),
    });

    useEffect(() => {
        const token = getSpotifyAccessToken();

        if (token) {
            router.push('/tracks');
        } else {
            window.location.href = `https://accounts.spotify.com/authorize?${params}`;
        }
    }, []);

    return <div>Autenticando...</div>;
};

export default LoginPage;
