'use client';
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../libs/api";
import { TimeRange } from "../../@types/types";
import { useRouter } from "next/navigation";
import { useArtistStore } from "../../store/artistStore";
import LoadingSpinner from "../../components/Loading";
import { TopList } from "../../components/TopList";

export default function Artist() {
    const { topArtist, setTopArtist } = useArtistStore();
    const timeRanges: string[] = ['short_term', 'medium_term', 'long_term'];
    const [timeRange, setTimeRange] = useState<TimeRange>('short_term');
    const router = useRouter()
    
    async function fetchTopArtist() {
        if (!topArtist) {
            try {
                const topArtistDataByTimeRange: Record<string, any> = {};

                await Promise.all(
                    timeRanges.map(async (timeRange) => {
                        const response = await api(`me/top/artists?time_range=${timeRange}`);
                        topArtistDataByTimeRange[timeRange] = response?.data.items;
                    })
                );

                setTopArtist(topArtistDataByTimeRange);
                console.log(topArtistDataByTimeRange);
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

    useEffect(() => {
        fetchTopArtist()
    }, []);

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
