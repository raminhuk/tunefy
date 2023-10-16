'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation'
import { useTracksStore } from '../../store/tracksStore';
import api from '../../libs/api';
import { TimeRange } from '../../@types/types';
import { CreatePlaylist } from '../../components/CreatePaylist';
import LoadingSpinner from '../../components/Loading';
import { TopList } from '../../components/TopList';
import { toast } from 'react-toastify';
import { logAmplitudeEvent } from '../../utils/amplitude';
import { saveLocalStorage } from '../../utils/savelocalStorage';

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
    togglePlay(): void;
}

declare global {
    interface Window {
        onSpotifyIframeApiReady: (IFrameAPI: IFrameAPI) => void;
    }
}

export default function Tracks() {
    const { topTracks, setTopTracks } = useTracksStore();
    const router = useRouter()
    const [timeRange, setTimeRange] = useState<TimeRange>('short_term');
    const [idTrack, setIdTrack] = useState<string | null>(null);
    const [isPlay, setPlay] = useState<boolean>(false);
    const [embedController, setEmbedController] = useState<EmbedController | null>(null);
    const timeRanges: string[] = useMemo(() => ['short_term', 'medium_term', 'long_term'], []);
    const pathname = usePathname()

    useEffect(() => {
        async function fetchTopTracks() {
            if (!topTracks) {
                try {
                    const topTracksDataByTimeRange: Record<string, any> = {};
    
                    await Promise.all(
                        timeRanges.map(async (timeRange) => {
                            const response = await api(`me/top/tracks?time_range=${timeRange}&limit=50`);
                            topTracksDataByTimeRange[timeRange] = response?.data.items;
                        })
                    );
                    setTopTracks(topTracksDataByTimeRange);
                    
                } catch (error: any) {
                    localStorage.removeItem('access_token');
                    saveLocalStorage('path', pathname)
                    if (error.response.data) {
                        console.log(error.response.data.error.message);
                    }
                    router.push('/login');
                }
            }
        }

        fetchTopTracks()
    }, [router, topTracks, setTopTracks, timeRanges, pathname]);

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://open.spotify.com/embed/iframe-api/v1";
        script.async = true;

        document.body.appendChild(script);

        window.onSpotifyIframeApiReady = (IFrameAPI) => {
            const element = document.getElementById('embed-iframe');
            const options = {
                width: '100%',
                height: '100',
                uri: '',
            };
            const callback = (EmbedController: EmbedController) => {
                setEmbedController(EmbedController);
            };
            IFrameAPI.createController(element, options, callback);
        };
    }, [])

    const handleTimeRangeChange = (newTimeRange: TimeRange) => {
        setTimeRange(newTimeRange)
    };

    const handleTrack = (id: string) => {
        if (idTrack === id) {
            embedController?.togglePlay();
            setPlay(!isPlay)
        } else {
            setIdTrack(id)
            embedController?.loadUri(id);
            embedController?.play();
            setPlay(true)
        }
    };

    return (
        <div>
            <div className="w-full" style={idTrack !== null ? { display: 'block' } : { display: 'none' }}>
                <div className="w-full flex flex-col fixed md:-bottom-5 -bottom-3 left-0 z-20">
                    <div className="bg-gray-800 h-20 w-full flex" id="embed-iframe"></div>
                </div>
            </div>
            {topTracks ? (
                <>
                <div className="max-w-5xl w-11/12 mx-auto mt-8">
                    <CreatePlaylist timeRange={timeRange} play={handleTrack}/>
                    <h1 className="text-center font-semibold text-xl tracking-wider py-2 mb-2">Top Músicas</h1>
                    <div className="text-center max-w-7xl mx-auto">
                        {/* <h2 className="text-2xl font-bold mb-4">Músicas mais ouvidas</h2> */}
                        <div className="flex justify-between gap-2 mb-4">
                            <button
                                onClick={() => handleTimeRangeChange('short_term')}
                                className={`text-xs lg:text-base flex-1 ${timeRange === 'short_term' ? 'bg-gradient-to-r from-customPink to-customBlue' : 'bg-zinc-900'} border border-zinc-800 hover:bg-gradient-to-r from-customPink to-customBlue text-white px-1 py-3 rounded`}
                            >
                                Último mês
                            </button>
                            <button
                                onClick={() => handleTimeRangeChange('medium_term')}
                                className={`text-xs lg:text-base flex-1 ${timeRange === 'medium_term' ? 'bg-gradient-to-r from-customPink to-customBlue' : 'bg-zinc-900'} border border-zinc-800 hover:bg-gradient-to-r from-customPink to-customBlue text-white px-1 py-3 rounded`}
                            >
                                Últimos 6 meses
                            </button>
                            <button
                                onClick={() => handleTimeRangeChange('long_term')}
                                className={`text-xs lg:text-base flex-1 ${timeRange === 'long_term' ? 'bg-gradient-to-r from-customPink to-customBlue' : 'bg-zinc-900'} border border-zinc-800 hover:bg-gradient-to-r from-customPink to-customBlue text-white px-1 py-3 rounded`}
                            >
                                Todos os tempos
                            </button>
                        </div>
                    </div>
                    {/* <ImageEditor timeRange={timeRange}/>  */}
                    {timeRanges.map((time) => (
                        <div key={time} className="none" style={time === timeRange ? { display: 'block' } : { display: 'none' }}>
                            <TopList key={time} listItems={topTracks} handleTrack={handleTrack} time={time} idTrack={idTrack} isPlay={isPlay}/>
                        </div>
                    ))}
                </div>
                </>
            ): (
                <div className='w-full h-full'>
                    <LoadingSpinner/>
                </div>
            )}
            
        </div>

    );
}
