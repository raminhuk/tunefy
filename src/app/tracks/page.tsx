'use client';
import React, { MouseEvent, useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation'
import { BsPlayCircle, BsPlayCircleFill } from "react-icons/bs";
import { useTracksStore } from '../../store/tracksStore';
import api from '../../libs/api';
import { Track } from '../../@types/types';
import WebPlayback from '../../components/WebPlayback';
import { getSpotifyAccessToken } from '../../auth/spotifyToken';

interface IFrameAPI {
    createController(
        element: HTMLElement | null,
        options: {
            width: string;
            height: string;
            uri: string;
        },
        callback: (EmbedController: EmbedController) => void
    ): void;
}

interface EmbedController {
    loadUri(uri: string): void;
    play(): void;
}

declare global {
    interface Window {
        onSpotifyIframeApiReady: (IFrameAPI: IFrameAPI) => void;
    }
}

export default function Tracks() {
    const { topTracks, setTopTracks } = useTracksStore();
    const timeRanges: string[] = ['short_term', 'medium_term', 'long_term'];
    const [timeRange, setTimeRange] = useState<string>('short_term');
    const [idTrack, setIdTrack] = useState<string | null>(null);


    const router = useRouter()

    async function fetchTopTracks() {
        if (!topTracks) {
            try {
                const requests = timeRanges.map(timeRange => api(`me/top/tracks?time_range=${timeRange}`));

                const responses = await Promise.all(requests);
                // const topTracksData2: any = responses.map((response, key) => ({ [`teste${key}`]: response?.data.items }));
                // console.log(topTracksData2);

                const topTracksData: Record<string, any> = {};
                responses.forEach((response, index) => {
                    topTracksData[timeRanges[index]] = response.data.items;
                });

                setTopTracks(topTracksData);

            } catch (error: any) {
                const contError = localStorage.getItem('error') || 0;
                localStorage.setItem('error', String((Number(contError) + 1)));

                if (Number(contError) < 3) {
                    localStorage.removeItem('access_token');
                    router.push('/login');
                }
                if (error.response) {
                    console.log(error.response.data);
                }
            }
        }
    }

    const [embedController, setEmbedController] = useState<EmbedController | null>(null);

    useEffect(() => {
        fetchTopTracks()

        const script = document.createElement("script");
        script.src = "https://open.spotify.com/embed-podcast/iframe-api/v1";
        script.async = true;

        document.body.appendChild(script);

        window.onSpotifyIframeApiReady = (IFrameAPI) => {
            const element = document.getElementById('embed-iframe');
            const options = {
                width: '100%',
                height: '100',
                uri: 'spotify:episode:7makk4oTQel546B0PZlDM5',
            };
            const callback = (EmbedController: EmbedController) => {
                setEmbedController(EmbedController);
            };
            IFrameAPI.createController(element, options, callback);
        };
    }, []);

    console.log(topTracks)
    const handleTimeRangeChange = (newTimeRange: string) => {
        setTimeRange(newTimeRange)
    };

    const handleTrack = (id: string) => {
        setIdTrack(id)
        if (embedController) {
            embedController.loadUri(`spotify:track:${id}`);
            embedController.play();
        }
    };

    return (
        <div>
            <div>
                <div>
                    {/* <iframe width="100%" height="152" title="Spotify Embed: My Path to Spotify: Women in Engineering" frameborder="0" allowfullscreen allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" src="https://open.spotify.com/embed/track/0wokCRaKD0zPNhMRXAgVsr?utm_source=oembed"></iframe> */}
                </div>
                <div className="fixed bottom-0 w-full h-20" style={idTrack !== null ? { display: 'block' } : { display: 'none' }}>
                    <div id="embed-iframe"></div>
                </div>
            </div>
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
                {timeRanges.map((time) => (
                    <div key={time} className="none" style={time === timeRange ? { display: 'block' } : { display: 'none' }}>
                        <ul>
                            {topTracks?.[time]?.map((track: Track) => (
                                <li key={track.id} className="bg-black bg-opacity-25 shadow-md p-4 rounded-md flex space-y-1 justify-between items-center gap-4">
                                    <div className="flex gap-4 items-center">
                                        <Image className="h-auto" style={{ maxWidth: '60px' }} alt={track.artists[0].name} src={track.album.images[0].url} width={track.album.images[0].width} height={track.album.images[0].height} />
                                        <div className="flex flex-col">
                                            <span className="text-gray-100 font-semibold">{track.name}</span>
                                            <span className="text-gray-300 text-sm">{track.artists[0].name}</span>
                                        </div>
                                    </div>
                                    <button onClick={() => { handleTrack(track.id) }}>
                                        <BsPlayCircle size={28} />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
                {/* <div>
                  <WebPlayback token={getSpotifyAccessToken() || ''}/>
                </div> */}

            </div>
        </div>

    );
}
