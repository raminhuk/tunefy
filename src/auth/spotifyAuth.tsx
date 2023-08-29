import React, { useEffect, ReactNode } from 'react';

interface SpotifyAuthProps {
    children: ReactNode;
}

const SCOPES: string[] = ['user-top-read'];

const SpotifyAuth: React.FC<SpotifyAuthProps> = ({ children }) => {
    const token = localStorage.getItem('access_token') || false
    useEffect(() => {
        if (token) {
            return;
        }

        const hashParams = new URLSearchParams(window.location.hash.substr(1));
        const newToken = hashParams.get('access_token');

        if (newToken) {
            localStorage.setItem('access_token', newToken);
        }
    }, []);

    if (!token) {
        const params = new URLSearchParams();
        params.set('response_type', 'token');
        params.set('client_id', process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID || '');
        params.set('redirect_uri', process.env.NEXT_PUBLIC_REDIRECT_URI || '');
        params.set('scope', SCOPES.join(' '));

        window.location.href = `https://accounts.spotify.com/authorize?${params}`;
        return <div className='gap-2 flex items-center justify-center min-h-[calc(100vh_-_88px)]'>
            <p>authenticating...</p>
        </div>
    }

    return <>{children}</>

};

export default SpotifyAuth;
