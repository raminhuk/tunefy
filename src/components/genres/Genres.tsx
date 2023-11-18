'use client';

import { useEffect } from "react";
import { useArtistStore } from "../../store/artistStore";
import { fetchTopArtist } from "../../libs/fetchAPI";
import { TopList } from "../TopList";
import LoadingSpinner from "../UI/Loading";

export default function Genres() {
    const { topArtist, setTopArtist } = useArtistStore();
    const timeRanges = ['short_term', 'medium_term', 'long_term']
    const allGroupGenres: Record<string, Array<{ genre: string, frequency: number }>> = {};
    
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
    
    if (topArtist) {
        timeRanges.forEach((time: string) => {
            allGroupGenres[time] = [];
            const genres = topArtist[time].map((item: any) => item.genres);
        
            // Criar um objeto que armazena o gênero e a frequência em que ele se repete
            const genreFrequency: Record<string, number> = {};
            genres.flat().forEach((genre: string) => {
                if (genreFrequency[genre]) {
                    genreFrequency[genre] += 1;
                } else {
                    genreFrequency[genre] = 1;
                }
            });
        
            // Converter o objeto em um array de objetos com gênero e frequência
            const genreFrequencyArray = Object.keys(genreFrequency).map((genre) => ({
                genre,
                frequency: genreFrequency[genre],
            }));
        
            genreFrequencyArray.sort((a, b) => b.frequency - a.frequency);

            allGroupGenres[time] = genreFrequencyArray;
        });
    }

    return (
        <>
            {topArtist ? (
                <>
                    <div className="max-w-5xl w-11/12 mx-auto mt-8">
                        <div className="text-center max-w-7xl mx-auto">
                            <h1 className="font-semibold text-xl tracking-wider py-2 mb-2">Top Genres</h1>
                        </div>
                        <div>
                            <TopList listItems={allGroupGenres} type="genres"/>
                        </div>
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