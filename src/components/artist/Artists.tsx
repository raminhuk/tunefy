'use client';
import { useEffect, useState } from "react";
import { TimeRange } from "../../@types/types";
import { usePathname, useRouter } from "next/navigation";
import { useArtistStore } from "../../store/artistStore";
import LoadingSpinner from "../../components/Loading";
import { TopList } from "../../components/TopList";
import { fetchTopArtist } from "../../libs/fetchAPI";
import TimeRenges from "../TimeRanges";
import { TopList2 } from "../TopList2";

export default function Artists() {
    const { topArtist, setTopArtist } = useArtistStore();

    useEffect(() => {
        async function fetchData() {
            if (!topArtist) {
                try {
                    const topArtistDataByTimeRange = await fetchTopArtist();
                    setTopArtist(topArtistDataByTimeRange);
                } catch (error: any) {
                    console.log(error)
                }
            }
        }

        fetchData();
    }, [topArtist, setTopArtist]);

    return (
        <div>
            {topArtist ? (
                <>
                    <div className="max-w-5xl w-11/12 mx-auto mt-8">
                        <div className="text-center max-w-7xl mx-auto">
                            <h1 className="font-semibold text-xl tracking-wider py-2 mb-2">Top Artistas</h1>
                        </div>
                        <div>
                            <TopList2 listItems={topArtist} type="artist"/>
                        </div>
                            
                    </div>
                </>
            ) : (
                <div className='w-full h-full'>
                    <LoadingSpinner />
                </div>
            )}
        </div>
    )
}
