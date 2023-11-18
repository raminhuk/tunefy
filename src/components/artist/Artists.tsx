'use client';
import { useEffect } from "react";
import { useArtistStore } from "../../store/artistStore";
import { fetchTopArtist } from "../../libs/fetchAPI";
import { TopList } from "../TopList";
import LoadingSpinner from "../UI/Loading";

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
                            <h1 className="font-semibold text-xl tracking-wider py-2 mb-2">Top Artists</h1>
                        </div>
                        <div>
                            <TopList listItems={topArtist} type="artist"/>
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
