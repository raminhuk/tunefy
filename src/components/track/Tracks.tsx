'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useTracksStore } from '../../store/tracksStore';
import { TimeRange } from '../../@types/types';
import { CreatePlaylist } from '../../components/CreatePaylist';
import { fetchTopTracks } from '../../libs/fetchAPI';
import { TopList } from '../TopList';
import LoadingSpinner from '../UI/Loading';
import Wrapped from '../wrapped/ImageEditor';

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
                    <div className="max-w-5xl w-11/12 mx-auto lg:mt-8 mt-4">
                        <CreatePlaylist timeRange={timeRange}/>
                        {/* <Wrapped timeRange={timeRange}/> */}
                        <div className="text-center max-w-7xl mx-auto">
                            <h1 className="font-semibold text-xl tracking-wider py-2 mb-2">Top Tracks</h1>
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
