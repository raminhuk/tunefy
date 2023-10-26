'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation'
import { useTracksStore } from '../../store/tracksStore';
import api from '../../libs/api';
import { TimeRange, TimeRanges } from '../../@types/types';
import { CreatePlaylist } from '../../components/CreatePaylist';
import LoadingSpinner from '../../components/Loading';
import { TopList } from '../../components/TopList';
import { saveLocalStorage } from '../../utils/savelocalStorage';
import { TopList2 } from '../TopList2';
import router from 'next/router';
import { PlayTrack } from '../PlayTrack';

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
    const timeRanges: string[] = useMemo(() => ['short_term', 'medium_term', 'long_term'], []);
    const [ timeRange, setTimeRange ] = useState<TimeRange>('short_term')

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
                    console.log(error)
                }
            }
        }

        fetchTopTracks()
    }, [topTracks, setTopTracks, timeRanges]);
    
    const handleTimeRangePlay = (time: TimeRange) => {
        setTimeRange(time)
    }

    return (
        <div>
            {topTracks ? (
                <>
                    <div className="max-w-5xl w-11/12 mx-auto mt-8">
                        <CreatePlaylist timeRange={timeRange}/>
                        <div className="text-center max-w-7xl mx-auto">
                            <h1 className="font-semibold text-xl tracking-wider py-2 mb-2">Top Músicas</h1>
                        </div>
                        {/* <ImageEditor timeRange={timeRange}/>  */}
                        <div>
                            <TopList2 listItems={topTracks} handleTimeRange={handleTimeRangePlay} type="track"/>
                        </div>
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
