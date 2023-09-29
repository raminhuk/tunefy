import { toast } from "react-toastify";
import { TimeRange } from "../@types/types";
import { getSpotifyAccessToken } from "../auth/spotifyToken";
import api from "../libs/api";
import { useTracksStore } from "../store/tracksStore";
import { useUserStore } from "../store/userStore";
import { timeRangeName } from "../utils/timeRangeName";
import { useState } from "react";
import LoadingSpinner from "./Loading";
import { FaSpotify } from "react-icons/fa";
import { BsPlayCircleFill } from "react-icons/bs";
import { BiPlayCircle } from "react-icons/bi";
import Link from "next/link";

type PlaylistAddTracksItem = {
    uris: string[];
    position: number;
}

interface CreatePlaylistProps {
    timeRange: TimeRange
    play: (id: string) => void
}

export function CreatePlaylist({ timeRange, play }: CreatePlaylistProps) {
    const { user } = useUserStore();
    const { topTracks } = useTracksStore();
    const token = getSpotifyAccessToken();
    const [loading, setLoading] = useState<boolean>(false);
    const [playList, setPlaylist] = useState<any>(null);

    function createPlaylistItem(timeRange: string): PlaylistAddTracksItem {
        const uris = topTracks?.[timeRange]?.map((track: any) => track.uri);
        return {
            uris,
            position: 0,
        };
    }
    
    const handleCreatePlaylist = async () => {
        setLoading(true);
        if (token && user) {
            try {
                const response = await api.post(`users/${user.id}/playlists`, {
                    name: `${timeRangeName(timeRange)} Tunefy`,
                    description: `Sua playlist criada no Tunefy`,
                    public: false,
                });
                if (response.status === 201) {
                    addItemsPlaylist(response?.data.id)
                    setPlaylist({link: response.data.external_urls.spotify, uri: response.data.uri})
                }
            } catch (error: any) {
                toast.warning("Tivemos um problema para criar sua Playlist");
                setLoading(false)
            }
        }
    }

    const addItemsPlaylist = async (idPlaylist: string) => {
        const bodyPlayList = createPlaylistItem(timeRange);
        try {
            const response = await api.post(`playlists/${idPlaylist}/tracks`,
                bodyPlayList
            );
            
            if (response.status === 201) {
                setLoading(false)
                toast.success("Sua playlist foi criada com sucesso");
            }
        } catch (error: any) {
            toast.warning("Tivemos um problema para criar sua Playlist");
            setLoading(false)
        }
    }

    const playPlayList = async (idPlaylist: string) => {
        play(idPlaylist)
        console.log(idPlaylist, 'chama', playList);
    }


    return (
        <div className="mb-8 overflow-hidden relative flex px-10 py-16 justify-between items-center rounded-md border border-black">
            {loading && <LoadingSpinner/>}
            <span className="w-2/3 font-semibold tracking-wider text-2xl">
                Crie uma playlist com as mais<br /> ouvidas por você!<br />
                <span className="text-sm font-normal">
                    Período selecionado:
                    <span className="bg-gradient-to-r from-customPink to-customBlue text-xs font-normal mx-2 p-1 rounded-md">
                        {timeRangeName(timeRange)}
                    </span>
                </span>
                {playList && (
                    <div className="flex items-center gap-2 mt-6">
                        <span className="text-sm">Playlist Criada:</span>
                        <div className="text-sm flex items-center gap-2">
                            <a target="_blank" href={`${playList.link}`}>
                                <button
                                    onClick={handleCreatePlaylist}
                                    className="flex items-center gap-2 bg-green-500 text-black rounded-full px-8 py-3 border-b-4 border-b-green-700 text-md font-semibold border-em hover:bg-green-600">
                                    <FaSpotify size={16}/> Abrir no Spotify 
                                </button>
                            </a> 
                            <button
                                onClick={(e) => {playPlayList(`${playList.uri}`)}}
                                className="flex items-center gap-2 bg-green-500 text-black rounded-full px-8 py-3 border-b-4 border-b-green-700 text-md font-semibold border-em hover:bg-green-600">
                                  <BiPlayCircle size={20} />  Ouvir aqui
                            </button>
                        </div>
                    </div>
                )}
            </span>
            <button
                onClick={handleCreatePlaylist}
                className="flex items-center gap-2 bg-green-500 text-black rounded-full px-8 py-3 border-b-4 border-b-green-700 text-md font-semibold border-em hover:bg-green-600">
                Criar Playist
            </button>
            <div className="flex items-center w-full h-full absolute top-0 left-0 -z-10 bg-cover bg-center bg-[url('/music3.jpg')]">
                <span className="z-10 overflow-hidden opacity-80 absolute top-0 left-0 w-full h-full bg-gradient-to-r from-zinc-900 to-zinc-900"></span>
            </div>
        </div>
    )
}