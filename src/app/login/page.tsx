'use client';
import { useEffect } from 'react';
import { getSpotifyAccessToken } from '../../auth/spotifyToken';
import { useRouter } from 'next/navigation'
import { ImSpinner2 } from 'react-icons/im';

const LoginPage = () => {
    const router = useRouter();
    
    useEffect(() => {
        const SCOPES = [
            'user-top-read',
            'streaming',
            'user-read-email',
            'user-read-private, playlist-modify-public, playlist-modify-private',
            'user-read-recently-played'
        ];
        const params = new URLSearchParams({
            response_type: 'token',
            client_id: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID || '',
            redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI || '',
            scope: SCOPES.join(' '),
        });
        const token = getSpotifyAccessToken();

        if (token) {
            router.push('/tracks');
        } else {
            window.location.href = `https://accounts.spotify.com/authorize?${params}`;
        }
    }, [router]);

    return (
        <div className='w-full h-full'>
            <div className='flex justify-center flex-col gap-4 items-center h-full w-full left-0 top-0 absolute'>
                <span>Autenticando...</span>
                <ImSpinner2 className="animate-spin text-customBlue text-4xl" />
            </div>
        </div>
    )
};

export default LoginPage;
