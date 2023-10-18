import Image from "next/image";
import { Artist, TimeRange, Track } from "../@types/types";
import { BsPauseCircleFill, BsPlayCircleFill } from "react-icons/bs";
import { FiExternalLink } from "react-icons/fi";
import TimeRenges from "./TimeRanges";
import { TopList } from "./TopList";
import { useState } from "react";
import { time } from "console";

interface TopListProps {
    listItems: Record<string, any> | null;
    handleTrack?: (value: string) => void;
    idTrack?: string | null;
    isPlay?: boolean
    type?: string
}

export function TopList2({ listItems, handleTrack, idTrack, isPlay, type = 'track' }: TopListProps) {
    const timeRanges = ['short_term', 'medium_term', 'long_term']
    const [timeRange, setTimeRange] = useState<TimeRange>('short_term');


    const handleTime = (newTimeRange: TimeRange) => {
        console.log(newTimeRange)
        setTimeRange(newTimeRange)
    };

    return (
        <div>
            {type === 'artist' ? (
                <>
                    <TimeRenges handleTimeRangeChange={handleTime} />
                    {timeRanges.map((time) => (
                        <div key={time} className="none" style={time === timeRange ? { display: 'block' } : { display: 'none' }}>
                            {listItems?.[time]?.map((artist: Artist, index: number) => (
                                <li key={artist.id} className={`w-full items-center flex gap-3`}>
                                    <div className={`relative w-full lg:p-4 p-2 rounded-md flex space-y-1 justify-between items-center gap-4 my-1.5 bg-zinc-900`}>
                                        <span className='z-10 w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-r from-customPink to-customBlue absolute -top-2 -left-3 font-semibold text-sm tracking-wide'>{index + 1}°</span>
                                        <div className={`flex gap-5 items-center`}>
                                            <div className="relative">
                                                <Image className={`h-auto w-full rounded-sm object-cover`} style={{ maxWidth: `80px`, minWidth: '80px', maxHeight: '80px' }} alt={artist.name} src={artist.images[0].url} width={artist.images[0].width} height={artist.images[0].height} />
                                            </div>
                                            <div className="flex flex-col lg:gap-1 gap-2">
                                                <span className="text-gray-100 font-semibold text-sm tracking-wide lg:text-lg">{artist.name}</span>
                                                <div className="flex flex-wrap gap-1">
                                                    {artist.genres.map((genre, index: number) => (
                                                        <span key={index} className="text-gray-100 text-xs lg:text-sm lg:px-2 px-1 bg-gray-700 rounded-xl capitalize tracking-wide" style={{ fontSize: '10px', lineHeight: '17px' }}>{genre}</span>
                                                    ))}
                                                </div>

                                            </div>
                                        </div>
                                        <span>
                                            <a className="flex lg:p-5" href={artist?.external_urls.spotify} target="_blank">
                                                <FiExternalLink size={25} />
                                            </a>
                                        </span>
                                    </div>
                                </li>
                            ))}
                        </div>
                    ))}
                </>
            ) : (
                <ul className="flex flex-wrap">

                </ul>
            )}
        </div>
    )
}