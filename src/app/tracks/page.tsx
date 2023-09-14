'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { spotifyToken } from '../../services/auth/spotifyToken';
import api from '../../services/api/api';

export default function Tracks() {
    const [topTracks, setTopTracks] = useState<any[]>([]);
    const [timeRange, setTimeRange] = useState<string>('short_term');
    console.log(topTracks);

    useEffect(() => {
        const accessToken = spotifyToken();
        if (accessToken) {
            const getTopTracks = async () => {
                try {
                    const response = await api(`me/top/tracks?time_range=${timeRange}`);

                    setTopTracks(response.data.items);
                } catch (error: any) {
                    localStorage.removeItem('access_token');
                    spotifyToken();
                    console.log(error)
                }
            };
            getTopTracks();
        }
    }, [timeRange]);

    const handleTimeRangeChange = (newTimeRange: string) => {
        setTimeRange(newTimeRange);
    };

    return (
        <div>
            <div className="max-w-7xl w-11/12 mx-auto mt-8">
                <div className="text-center max-w-7xl mx-auto space-y-2">
                    <h2 className="text-2xl font-bold mb-4">Músicas mais ouvidas</h2>
                    <div className="flex justify-between gap-2">
                        <button
                            onClick={() => handleTimeRangeChange('short_term')}
                            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                        >
                            Último mês
                        </button>
                        <button
                            onClick={() => handleTimeRangeChange('medium_term')}
                            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                        >
                            Últimos 6 meses
                        </button>
                        <button
                            onClick={() => handleTimeRangeChange('long_term')}
                            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                        >
                            Todos os tempos
                        </button>
                    </div>
                </div>
                <ul className="space-y-2">
                    {topTracks.map(track => (
                        <li key={track.id} className="bg-black bg-opacity-25 shadow-md p-4 rounded-md flex space-y-1 items-center gap-4">
                            <Image className="h-auto" style={{ maxWidth: '60px' }} alt={track.artists[0].name} src={track.album.images[0].url} width={track.album.images[0].width} height={track.album.images[0].height} />
                            <div className="flex flex-col">
                                <span className="text-gray-100 font-semibold">{track.name}</span>
                                <span className="text-gray-300 text-sm">{track.artists[0].name}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>

    );
}
