import { useEffect } from "react";


// export const getSpotifyToken = () => localStorage.getItem('access_token') !== null;

export function spotifyToken() {
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('access_token');
        if (token) return token;
        
        const hashParams = new URLSearchParams(window.location.hash.substr(1));
        const newToken = hashParams.get('access_token');
        const expires = hashParams.get('expires_in') || '';
    
        if (newToken) {
            localStorage.setItem('access_token', newToken);
            localStorage.setItem('expires', expires);
            history.replaceState({}, document.title, window.location.pathname);
            return newToken;
        }
    
        const SCOPES = ['user-top-read'];
        const params = new URLSearchParams({
            response_type: 'token',
            client_id: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID || '',
            redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI || '',
            scope: SCOPES.join(' '),
        });
    
        if (!token && !newToken) {
            window.location.href = `https://accounts.spotify.com/authorize?${params}`;
        }
    }

}
