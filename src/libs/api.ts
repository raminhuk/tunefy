import axios from 'axios';
import { getSpotifyAccessToken } from '../auth/spotifyToken';

interface Credentials {
    baseURL: string;
    headers?: {};
}

const token = getSpotifyAccessToken();

const apiCredentials: Credentials = {
    baseURL: 'https://api.spotify.com/v1/',
    headers: {
        Authorization: token ? `Bearer ${token}` : '',
    },
};

const api = axios.create(apiCredentials);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error && error.response?.data) {
            if (error.response.data.error.message) {
                localStorage.removeItem('access_token');
            } else {
                console.log(error);
            }
        } else {
            console.log(`Oops: ${error}`);
        }

        if (typeof window !== 'undefined') {
            const path = localStorage.getItem('path');
            if (path !== '/'){
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export default api;
