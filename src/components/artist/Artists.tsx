'use client';
import { useEffect, useMemo, useState } from "react";
import api from "../../libs/api";
import { TimeRange } from "../../@types/types";
import { usePathname, useRouter } from "next/navigation";
import { useArtistStore } from "../../store/artistStore";
import LoadingSpinner from "../../components/Loading";
import { TopList } from "../../components/TopList";
import { saveLocalStorage } from "../../utils/savelocalStorage";

export default function Artists() {
    const { topArtist, setTopArtist } = useArtistStore();
    const [timeRange, setTimeRange] = useState<TimeRange>('short_term');
    const timeRanges: string[] = useMemo(() => ['short_term', 'medium_term', 'long_term'], []);
    const router = useRouter()
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

    const handleTimeRangeChange = (newTimeRange: TimeRange) => {
        setTimeRange(newTimeRange)
    };
  return (
    <div>
        {topArtist ? (
                <>
                <div className="max-w-5xl w-11/12 mx-auto mt-8">
                    <div className="text-center max-w-7xl mx-auto">
                        <h1 className="font-semibold text-xl tracking-wider py-2 mb-2">Top Artistas</h1>
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
                            <TopList key={time} listItems={topArtist} time={time} type="artist"/>
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
  )
}
