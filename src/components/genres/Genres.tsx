'use client';

import { useEffect, useMemo, useState } from "react";
import { useArtistStore } from "../../store/artistStore";
import { usePathname, useRouter } from "next/navigation";
import LoadingSpinner from "../Loading";
import api from "../../libs/api";
import { TimeRange } from "../../@types/types";
import { saveLocalStorage } from "../../utils/savelocalStorage";

export default function Genres() {
    const { topArtist, setTopArtist } = useArtistStore();
    const router = useRouter()
    const [timeRange, setTimeRange] = useState<TimeRange>('short_term');
    const timeRanges: string[] = useMemo(() => ['short_term', 'medium_term', 'long_term'], []);
    const valueCounts: Record<string, number> = {};
    const pathname = usePathname()

    useEffect(() => {
        async function fetchTopArtist() {
            if (!topArtist) {
                try {
                    const topArtistDataByTimeRange: Record<string, any> = {};
    
                    await Promise.all(
                        timeRanges.map(async (timeRange) => {
                            const response = await api(`me/top/artists?time_range=${timeRange}&limit=50`);
                            topArtistDataByTimeRange[timeRange] = response?.data.items;
                        })
                    );
    
                    setTopArtist(topArtistDataByTimeRange);
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
        fetchTopArtist()
    }, [router, topArtist, setTopArtist, timeRange, setTimeRange, timeRanges, pathname]);
    
    if (topArtist) {
        const groupGenres = topArtist[timeRange].map((item:any) => {
            return item.genres
        })

        const allValues: string[] = [].concat(...groupGenres);
        allValues.forEach(value => {
            valueCounts[value] = (valueCounts[value] || 0) + 1;
        });
    }

    const valueObjects: { value: string, frequency: number }[] | null = Object.keys(valueCounts).map(value => ({
        value,
        frequency: valueCounts[value]
      }));

      valueObjects.sort((a, b) => {
        const countDiff = b.frequency - a.frequency;
        if (countDiff === 0) {
          return a.value.localeCompare(b.value);
        }
        return countDiff;
    });

    const handleTimeRangeChange = (newTimeRange: TimeRange) => {
        setTimeRange(newTimeRange)
    };


    return (
        <>
            {valueObjects.length > 0 ? (
                <>
                <div className="max-w-5xl w-11/12 mx-auto mt-8">
                    <h1 className="text-center font-semibold text-xl tracking-wider py-2 mb-2">Top Generos</h1>
                    <div className="text-center max-w-7xl mx-auto">
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
                    {valueObjects.map((item, index) => (
                        <li key={index} className={`w-full items-center flex gap-3`}>
                            <div className={`relative w-full p-5 rounded-md flex space-y-1 justify-between items-center gap-4 my-1.5 bg-zinc-900`}>
                                <span className='z-10 w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-r from-customPink to-customBlue absolute -top-2 -left-3 font-semibold text-sm tracking-wide'>{index + 1}°</span>
                                <div className={`flex gap-5 items-center`}>
                                    <div className="flex flex-col lg:gap-1 gap-2">
                                        <span className="text-gray-100 font-semibold text-sm tracking-wide lg:text-lg capitalize">{item.value}</span>
                                    </div>
                                </div>
                                <span className="flex justify-center items-center gap-2">
                                    <span className="text-gray-300 text-xs">Qnt:</span>
                                    <span className="text-gray-100 font-semibold text-sm tracking-wide lg:text-xl">{item.frequency}</span>
                                </span>
                            </div>
                        </li>
                    ))}
                </div>
                </>
            ): (
                <div className='w-full h-full'>
                    <LoadingSpinner/>
                </div>
            )}
        </>
    )
}