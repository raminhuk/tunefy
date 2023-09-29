'use client';
import React, { MouseEvent, useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation'
import { BsPauseCircleFill, BsPlayCircleFill } from "react-icons/bs";
import { useTracksStore } from '../../store/tracksStore';
import api from '../../libs/api';
import { TimeRange, Track } from '../../@types/types';
import { CreatePlaylist } from '../../components/CreatePaylist';
import { toast } from 'react-toastify';
import LoadingSpinner from '../../components/Loading';

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
    const timeRanges: string[] = ['short_term', 'medium_term', 'long_term'];
    const [timeRange, setTimeRange] = useState<TimeRange>('short_term');
    const [idTrack, setIdTrack] = useState<string | null>(null);
    const [isPlay, setPlay] = useState<boolean>(false);

    const router = useRouter()

    async function fetchTopTracks() {
        if (!topTracks) {
            try {
                const topTracksDataByTimeRange: Record<string, any> = {};

                await Promise.all(
                    timeRanges.map(async (timeRange) => {
                        const response = await api(`me/top/tracks?time_range=${timeRange}`);
                        topTracksDataByTimeRange[timeRange] = response?.data.items;
                    })
                );

                setTopTracks(topTracksDataByTimeRange);
                console.log(topTracksDataByTimeRange);
                localStorage.removeItem('error');

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
                uri: '',
            };
            const callback = (EmbedController: EmbedController) => {
                setEmbedController(EmbedController);
            };
            IFrameAPI.createController(element, options, callback);
        };
    }, []);

    console.log(topTracks)
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
            {topTracks ? (
                <>
                <div>
                    <div className="w-full" style={idTrack !== null ? { display: 'block' } : { display: 'none' }}>
                        <div className="w-full flex flex-col fixed -bottom-5 left-0">
                            <div className="bg-gray-800 h-20 w-full flex" id="embed-iframe"></div>
                        </div>
                    </div>
                </div>
                <div className="max-w-4xl w-11/12 mx-auto mt-8">
                    <CreatePlaylist timeRange={timeRange} play={handleTrack}/>
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
                   
                    {timeRanges.map((time) => (
                        <div key={time} className="none" style={time === timeRange ? { display: 'block' } : { display: 'none' }}>
                            <ul>
                                {topTracks?.[time]?.map((track: Track) => (
                                    <li key={track.id} className="p-3 rounded-md flex space-y-1 justify-between items-center gap-4 bg-zinc-900 my-2">
                                        <div className="flex gap-4 items-center">
                                            <Image className="h-auto rounded-sm" style={{ maxWidth: '60px' }} alt={track.artists[0].name} src={track.album.images[0].url} width={track.album.images[0].width} height={track.album.images[0].height} />
                                            <div className="flex flex-col">
                                                <span className="text-gray-100 font-semibold text-xs tracking-wider lg:text-base">{track.name}</span>
                                                <span className="text-gray-400 text-sm">{track.artists[0].name}</span>
                                            </div>
                                        </div>
                                        <button onClick={() => { handleTrack(`spotify:track:${track.id}`) }}>
                                            {idTrack === track.id && isPlay ? (
                                                <BsPauseCircleFill size={30} />
                                            ) : (
                                                <BsPlayCircleFill size={30} />
                                            )}
                                        </button>
                                    </li>
                                ))}
                            </ul>
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
