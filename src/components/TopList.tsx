import Image from "next/image";
import { Track } from "../@types/types";
import { BsPauseCircleFill, BsPlayCircleFill } from "react-icons/bs";

interface TopListProps {
    listItems: Record<string, any> | null;
    time: string;
    handleTrack?: (value: string) => void;
    idTrack?: string | null;
    isPlay?: boolean
}

export function TopList({ listItems, time, handleTrack, idTrack, isPlay }:TopListProps ) {
    return (
        <ul className="flex flex-wrap my-10">
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
                                <span className="text-gray-400 text-sm">{track.artists[0].name}</span>
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
    )
}