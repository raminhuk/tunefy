import Image from "next/image";
import { Artist, Track } from "../@types/types";
import { BsPauseCircleFill, BsPlayCircleFill } from "react-icons/bs";
import { FiExternalLink } from "react-icons/fi";

interface TopListProps {
    listItems: Record<string, any> | null;
    time: string;
    handleTrack?: (value: string) => void;
    idTrack?: string | null;
    isPlay?: boolean
    type?: string
}

export function TopList({ listItems, time, handleTrack, idTrack, isPlay, type = 'track' }:TopListProps ) {
    return (
        <div>
            {type === 'track' ? (
                <ul className="flex flex-wrap">
                    {listItems?.[time]?.map((track: Track, index: number) => (
                        <li key={track.id} className={`w-full items-center flex gap-3 ${index < 3 ? 'flex-1 bg-inherit flex-col' : 'flex'} ${index === 1 ? 'order-1 mt-16' : 'order-5'} ${index === 2 ? 'mt-20' : ''}`}>
                            <div className={`relative w-full lg:p-4 p-2 rounded-md flex space-y-1 justify-between items-center gap-4 my-1.5 ${index < 3 ? 'bg-inherit flex-col' : 'bg-zinc-900'}`}>
                            {index > 2 && (
                                <span className='z-10 w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-r from-customPink to-customBlue absolute lg:top-2 lg:left-2 -top-2 -left-2 font-semibold text-sm tracking-wider'>{index + 1}°</span>
                            )}
                                <div className={`flex gap-4 items-center ${index < 3 && 'flex-col text-center'}`}>
                                    <div className={`${index < 3 ? "flex justify-center rounded-full relative bg-gradient-to-r from-customPink to-customBlue p-1" : "relative"}`}>
                                        {index < 3 && (
                                            <>
                                                <span className='z-10 w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-customPink to-customBlue absolute -bottom-4 font-semibold text-xl tracking-wider'>
                                                {index + 1}°
                                                </span>
                                                {index === 0 && (
                                                    <span className="rotate-45 absolute -z-10 -top-1 -right-5">
                                                        <Image width={30} height={30} className="h-auto sm:w-14 lg:w-16 w-12" src="../crown.svg" alt="Crown" />
                                                    </span>
                                                )}
                                                <button className={`${isPlay && idTrack === `spotify:track:${track.id}` ? 'bg-opacity-70 hover:opacity-100' : 'lg:opacity-0 opacity-100 hover:opacity-100'} bg-opacity-70 m-1 rounded-full bg-black absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center`} onClick={() => { handleTrack && handleTrack(`spotify:track:${track.id}`) }}>
                                                    {idTrack === `spotify:track:${track.id}` && isPlay ? (
                                                        <BsPauseCircleFill size={30} />
                                                    ) : (
                                                        <BsPlayCircleFill size={30} />
                                                    )}
                                                </button>
                                            </>
                                        )}
                                        <Image className={`h-auto w-full ${index < 3 ? 'rounded-full' : 'rounded-sm'}`} style={{ maxWidth: `${index < 3 ? '180px' : '80px'}`, minWidth: '80px' }} alt={track.artists[0].name} src={track.album.images[0].url} width={track.album.images[0].width} height={track.album.images[0].height} />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-gray-100 font-semibold text-xs tracking-wider lg:text-base">{track.name}</span>
                                        <span className="text-gray-400 text-sm">
                                            {track.artists.map((artist: any, index: number) => (
                                                <span key={artist.id}>{index !== 0 && ', '}{artist.name}</span>
                                            ))}
                                        </span>
                                    </div>
                                </div>
                                {index > 2 && (
                                    <button onClick={() => { handleTrack && handleTrack(`spotify:track:${track.id}`) }}>
                                        {idTrack === `spotify:track:${track.id}` && isPlay ? (
                                            <BsPauseCircleFill size={30} />
                                        ) : (
                                            <BsPlayCircleFill size={30} />
                                        )}
                                    </button>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <ul className="flex flex-wrap">
                    {listItems?.[time]?.map((artist: Artist, index: number) => (
                        <li key={artist.id} className={`w-full items-center flex gap-3`}>
                            <div className={`relative w-full lg:p-4 p-2 rounded-md flex space-y-1 justify-between items-center gap-4 my-1.5 bg-zinc-900`}>
                                <span className='z-10 w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-r from-customPink to-customBlue absolute lg:top-2 lg:left-2 -top-2 -left-2 font-semibold text-sm tracking-wider'>{index + 1}°</span>
                                <div className={`flex gap-5 items-center`}>
                                    <div className="relative">
                                        <Image className={`h-auto w-full`} style={{ maxWidth: `80px`, minWidth: '80px' }} alt={artist.name} src={artist.images[0].url} width={artist.images[0].width} height={artist.images[0].height} />
                                    </div>
                                    <div className="flex flex-col lg:gap-1 gap-2">
                                        <span className="text-gray-100 font-semibold text-sm tracking-wider lg:text-lg">{artist.name}</span>
                                        <div className="flex flex-wrap gap-1">
                                            {artist.genres.map((genre, index: number) => (
                                                <span key={index} className="text-gray-100 text-xs lg:text-sm lg:px-2 px-1 bg-customBlue rounded-xl capitalize tracking-wider" style={{fontSize: '10px',lineHeight: '17px'}}>{genre}</span>
                                            ))}
                                        </div>

                                    </div>
                                </div>
                                <span>
                                    <a className="flex lg:p-5" href={artist?.external_urls.spotify} target="_blank">
                                        <FiExternalLink size={25}/>
                                    </a>
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}