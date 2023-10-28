import Image from "next/image";
import { Artist, GroupGenres, TimeRange, Track } from "../@types/types";
import { BsPauseCircleFill, BsPlayCircleFill } from "react-icons/bs";
import { FiExternalLink } from "react-icons/fi";
import TimeRenges from "./TimeRanges";
import { useState } from "react";
import { useTracksStore } from "../store/tracksStore";

interface TopListProps {
    listItems: Record<string, any> | null;
    timeRangePlayList?: (value: TimeRange) => void;
    type?: string
}

export function TopList({ listItems, timeRangePlayList, type = 'track' }: TopListProps) {
    const { setIdTrack, idTrack, isPlay, togglePlay, togglePause } = useTracksStore();
    const timeRanges = ['short_term', 'medium_term', 'long_term']
    const [timeRange, setTimeRange] = useState<TimeRange>('short_term');


    const handleTime = (newTimeRange: TimeRange) => {
        setTimeRange(newTimeRange)
        if (timeRangePlayList) {
            timeRangePlayList(newTimeRange)
        }
    };

    const handleTrack = (id: string) => {
        if (idTrack === id) {
            togglePause(true);
            togglePlay(!isPlay);
        }

        if (idTrack !== id){
            togglePlay(true);
            togglePause(false);
            setIdTrack(id);
        }
    };

    console.log(listItems)

    return (
        <div>
            <TimeRenges handleTimeRangeChange={handleTime} />
                {timeRanges.map((time) => (
                    <ul key={time} className="none" style={time === timeRange ? { display: 'block' } : { display: 'none' }}>
                        {type === 'artist' ? (
                            listItems?.[time]?.map((artist: Artist, index: number) => (
                                <li key={artist.id} className={`w-full items-center flex gap-3`}>
                                    <div className={`relative w-full lg:p-4 p-2 rounded-md flex space-y-1 justify-between items-center gap-4 my-1.5 bg-zinc-900`}>
                                        <span className='z-10 w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-r from-customPink to-customBlue absolute -top-2 -left-3 font-semibold text-sm tracking-wide'>{index + 1}°</span>
                                        <div className={`flex gap-5 items-center`}>
                                            {artist.images && (
                                                <div className="relative">
                                                    <Image className={`h-auto w-full rounded-sm object-cover`} style={{ maxWidth: `80px`, minWidth: '80px', maxHeight: '80px' }} alt={artist.name} src={artist.images[0].url} width={artist.images[0].width} height={artist.images[0].height} />
                                                </div>
                                            )}
                                            <div className="flex flex-col lg:gap-1 gap-2">
                                                <span className="text-gray-100 font-semibold text-sm tracking-wide lg:text-lg">{artist.name}</span>
                                                {artist.genres && (
                                                    <div className="flex flex-wrap gap-1">
                                                        {artist?.genres.map((genre, index: number) => (
                                                            <span key={index} className="text-gray-100 text-xs lg:text-sm lg:px-2 px-1 bg-gray-700 rounded-xl capitalize tracking-wide" style={{ fontSize: '10px', lineHeight: '17px' }}>{genre}</span>
                                                        ))}
                                                    </div>
                                                )}

                                            </div>
                                        </div>
                                        {artist?.external_urls && (
                                            <span>
                                                <a className="flex lg:p-5" href={artist?.external_urls.spotify} target="_blank">
                                                    <FiExternalLink size={25} />
                                                </a>
                                            </span>
                                        )}
                                    </div>
                                </li>
                            ))
                        ) : type === 'genres' ? (
                            listItems?.[time]?.map((item: GroupGenres, index: number) => (
                                <li key={index} className={`w-full items-center flex gap-3`}>
                                    <div className={`relative w-full p-5 rounded-md flex space-y-1 justify-between items-center gap-4 my-1.5 bg-zinc-900`}>
                                        <span className='z-10 w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-r from-customPink to-customBlue absolute -top-2 -left-3 font-semibold text-sm tracking-wide'>{index + 1}°</span>
                                        <div className={`flex gap-5 items-center`}>
                                            <div className="flex flex-col lg:gap-1 gap-2">
                                                <span className="text-gray-100 font-semibold text-sm tracking-wide lg:text-lg capitalize">{item.genre}</span>
                                            </div>
                                        </div>
                                        <span className="flex justify-center items-center gap-2">
                                            <span className="text-gray-300 text-xs">Qnt:</span>
                                            <span className="text-gray-100 font-semibold text-sm tracking-wide lg:text-xl">{item.frequency}</span>
                                        </span>
                                    </div>
                                </li>
                            ))
                        ) : (
                            listItems?.[time]?.map((track: Track, index: number) => (
                                <li key={track.id} className={`w-full items-center flex gap-3 flex`}>
                                    <div className={`relative w-full lg:p-4 p-2 rounded-md flex space-y-1 justify-between items-center gap-4 my-1.5 bg-zinc-900`}>
                                        <span className='z-10 w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-r from-customPink to-customBlue absolute -top-2 -left-3 font-semibold text-sm tracking-wide'>{index + 1}°</span>
                                        <div className={`flex gap-4 items-center`}>
                                            <div className={`relative`}>
                                                <Image className={`h-auto w-full rounded-sm object-cover`} style={{ maxWidth: `80px`, minWidth: '80px', maxHeight: '80px' }} alt={track.artists[0].name} src={track.album.images[0].url} width={track.album.images[0].width} height={track.album.images[0].height} />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-gray-100 font-semibold text-xs tracking-wide lg:text-base">{track.name}</span>
                                                <span className="text-gray-400 text-sm">
                                                    {track.artists.map((artist: any, index: number) => (
                                                        <span key={artist.id}>{index !== 0 && ', '}{artist.name}</span>
                                                    ))}
                                                </span>
                                            </div>
                                        </div>
                                        <button className="p-2 hover:opacity-80" onClick={() => { handleTrack(track.uri) }}>
                                            {(track.uri === idTrack) && isPlay ? (
                                                <BsPauseCircleFill size={30} />
                                            ) : (
                                                <BsPlayCircleFill size={30} />
                                            )}
                                        </button>
                                    </div>
                                </li>
                            ))
                        )}
                    </ul>
                ))}
           
        </div>
    )
}