'use client';

import { useMemo } from "react";
import { useArtistStore } from "../../store/artistStore";

export default function Genres() {
    const { topArtist } = useArtistStore();
    const timeRanges: string[] = useMemo(() => ['short_term', 'medium_term', 'long_term'], []);
    const valueCounts: Record<string, number> = {};

    if (topArtist) {
        const groupGenres = topArtist.short_term.map((item:any) => {
            return item.genres
        })

        const allValues: string[] = [].concat(...groupGenres);
        allValues.forEach(value => {
            valueCounts[value] = (valueCounts[value] || 0) + 1;
        });

        
        console.log(groupGenres);
    }

    const valueObjects: { value: string, frequency: number }[] = Object.keys(valueCounts).map(value => ({
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


    return (
        <>
            {valueObjects.map((item, index) => (
                <span key={index} className="flex column">{item.value} - {item.frequency}</span>
            ))}
        </>
    )
}