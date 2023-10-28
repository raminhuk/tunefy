'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useTracksStore } from '../../store/tracksStore';
import { TimeRange } from '../../@types/types';
import { CreatePlaylist } from '../../components/CreatePaylist';
import LoadingSpinner from '../../components/Loading';
import { fetchTopTracks } from '../../libs/fetchAPI';
import { TopList } from '../TopList';

export default function Tracks() {
    const { topTracks, setTopTracks } = useTracksStore();
    const [ timeRange, setTimeRange ] = useState<TimeRange>('short_term')

    useEffect(() => {
        async function fetchData() {
            if (!topTracks) {
                try {
                    const topTracksDataByTimeRange = await fetchTopTracks();
                    setTopTracks(topTracksDataByTimeRange);
                } catch (error: any) {
                    console.log(error)
                }
            }
        }

        fetchData()
    }, [topTracks, setTopTracks]);
    
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
                            <TopList listItems={topTracks} timeRangePlayList={handleTimeRangePlay} type="track"/>
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
