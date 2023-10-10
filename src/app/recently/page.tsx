'use client';
import { useEffect } from "react";
import api from "../../libs/api";
import { useRouter } from "next/navigation";
import LoadingSpinner from "../../components/Loading";
import Image from "next/image";
import { useRecentlyStore } from "../../store/recentlyStore";

export default function Recently() {
    const { recently, setRecently } = useRecentlyStore();
    const router = useRouter()
    
    async function fetchRecently() {
        if (!recently) {
            try {
                const response = await api(`me/player/recently-played`);
                setRecently(response.data.items);
                console.log(response);
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
        fetchRecently()
    }, []);

 
  return (
    <div>
        {recently ? (
                <>
                <div className="max-w-5xl w-11/12 mx-auto mt-8">
                <h1 className="text-center font-semibold text-xl tracking-wider py-2 mb-2">Últimas Ouvidas</h1>
                {recently.map((item: any, index: number) => (
                        <li key={index+item.track.id} className={`w-full items-center flex gap-3`}>
                            <div className={`relative w-full lg:p-4 p-2 rounded-md flex space-y-1 justify-between items-center gap-4 my-1.5 bg-zinc-900`}>
                                <span className='z-10 w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-r from-customPink to-customBlue absolute lg:top-2 lg:left-2 -top-2 -left-2 font-semibold text-sm tracking-wider'>{index + 1}°</span>
                                <div className={`flex gap-5 items-center`}>
                                    <div className="relative">
                                        <Image
                                            className={`h-auto w-full`} 
                                            style={{ maxWidth: `80px`, minWidth: '80px' }} 
                                            alt={item.track.album.name} 
                                            src={item.track.album.images[0].url} 
                                            width={item.track.album.images[0].width} 
                                            height={item.track.album.images[0].height} 
                                        />
                                    </div>
                                    <div className="flex flex-col lg:gap-1 gap-2">
                                        <span className="text-gray-100 font-semibold text-sm tracking-wider lg:text-lg">{item.track.name}</span>
                                        <span className="text-gray-400 text-sm capitalize">
                                        {item.track.artists.map((artist: any, index: number) => (
                                            <span key={artist.id}>{index !== 0 && ', '}{artist.name}</span>
                                        ))}
                                        </span>

                                    </div>
                                </div>
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
    </div>
  )
}
