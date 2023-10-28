'use client';
import { useEffect } from "react";
import LoadingSpinner from "../../components/Loading";
import { useRecentlyStore } from "../../store/recentlyStore";
import { TopList } from "../TopList";
import { fetchTopRecently } from "../../libs/fetchAPI";

export default function Recently() {
    const { recently, setRecently } = useRecentlyStore();
    
    useEffect(() => {
        async function fetchData() {
            if (!recently) {
                try {
                    const topRecentlyData = await fetchTopRecently();
                    setRecently(topRecentlyData);
                } catch (error: any) {
                    console.log(error)
                }
            }
        }
        fetchData()
    }, [recently, setRecently]);

 
  return (
    <div>
        {recently ? (
                <>
                    <div className="max-w-5xl w-11/12 mx-auto mt-8">
                        <div className="text-center max-w-7xl mx-auto">
                            <h1 className="font-semibold text-xl tracking-wider py-2 mb-2">Últimas Ouvidas</h1>
                        </div>
                        <div>
                            <TopList listItems={recently} type="recently"/>
                        </div>
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
