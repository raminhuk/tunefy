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
        <ul className="flex flex-wrap">
            {listItems?.[time]?.map((track: Track, index: number) => (
                <li key={track.id} className={`w-full items-center flex gap-3 ${index < 3 ? 'flex-1 bg-inherit flex-col' : 'flex'} ${index === 1 ? 'order-1 mt-10' : 'order-5'} ${index === 2 ? 'mt-20' : ''}`}>
                    <span className='font-semibold text-2xl tracking-wider'>{index + 1}°</span>
                    <div className={`w-full p-3 rounded-md flex space-y-1 justify-between items-center gap-4 my-1 ${index < 3 ? 'bg-inherit flex-col' : 'bg-zinc-900'}`}>
                        <div className={`flex gap-4 items-center ${index < 3 && 'flex-col text-center'}`}>
                            <Image className={`h-auto ${index < 3 ? 'rounded-full' : 'rounded-sm'}`} style={{ maxWidth: `${index < 3 ? '160px' : '80px'}` }} alt={track.artists[0].name} src={track.album.images[0].url} width={track.album.images[0].width} height={track.album.images[0].height} />
                            <div className="flex flex-col">
                                <span className="text-gray-100 font-semibold text-xs tracking-wider lg:text-base">{track.name}</span>
                                <span className="text-gray-400 text-sm">{track.artists[0].name}</span>
                            </div>
                        </div>
                        <button onClick={() => { handleTrack && handleTrack(`spotify:track:${track.id}`) }}>
                            {idTrack === `spotify:track:${track.id}` && isPlay ? (
                                <BsPauseCircleFill size={30} />
                            ) : (
                                <BsPlayCircleFill size={30} />
                            )}
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    )
}