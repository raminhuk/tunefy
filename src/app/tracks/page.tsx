'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Tracks() {
    const [topTracks, setTopTracks] = useState<any[]>([]);
    const [timeRange, setTimeRange] = useState<string>('short_term');

    const accessToken = localStorage.getItem('access_token') ?? false;

    
    useEffect(() => {
        if (!accessToken) {
            window.location.href = '/'
            return
        }

        const getTopTracks = async () => {
            const response = await axios.get(`https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });

            setTopTracks(response.data.items);
        };

        getTopTracks();
    }, [accessToken, timeRange]);

    const handleTimeRangeChange = (newTimeRange: string) => {
        setTimeRange(newTimeRange);
    };

    return (
        <div className="max-w-7xl w-11/12 mx-auto mt-8">
            <div className="text-center max-w-7xl mx-auto space-y-2">
                <h2 className="text-2xl font-bold mb-4">Músicas mais ouvidas</h2>
                <button
                    onClick={() => handleTimeRangeChange('short_term')}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Último mês
                </button>
                <button
                    onClick={() => handleTimeRangeChange('medium_term')}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Últimos 6 meses
                </button>
                <button
                    onClick={() => handleTimeRangeChange('long_term')}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Todos os tempos
                </button>
            </div>
            <ul className="max-w-md mx-auto space-y-2">
            {topTracks.map(track => (
                <li key={track.id} className="bg-black bg-opacity-25 shadow-md p-4 rounded-md flex flex-col space-y-1">
                    <span className="text-gray-100 font-semibold">{track.name}</span>
                    <span className="text-gray-300 text-sm">{track.artists[0].name}</span>
                </li>
            ))}
        </ul>
        </div>

    );
}
