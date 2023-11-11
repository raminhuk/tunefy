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
import { BiPlayCircle } from "react-icons/bi";
import { trackAmplitudeEvent } from "../utils/amplitude";

type PlaylistAddTracksItem = {
    uris: string[];
    position: number;
}

interface CreatePlaylistProps {
    timeRange: TimeRange
}

export function CreatePlaylist({ timeRange }: CreatePlaylistProps) {
    const { user } = useUserStore();
    const { topTracks, setIdTrack, togglePlay, togglePause } = useTracksStore();

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
                    trackAmplitudeEvent('create_playlist', {"id_playlist": response?.data.id, "name": response?.data.name,"link": response.data.external_urls.spotify})

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
                toast.success(
                    "Sua playlist foi criada com sucesso, confira no seu Spotify", {autoClose: 5000}
                );
            }
        } catch (error: any) {
            toast.warning("Tivemos um problema para criar sua Playlist");
            setLoading(false)
        }
    }

    const playPlayList = async (idPlaylist: string) => {
        setIdTrack(idPlaylist);
        togglePlay(true);
        togglePause(false);
    }

    return (
        <div className="mb-8 overflow-hidden relative flex flex-col md:flex-row md:px-10 md:py-16 p-4 justify-between items-center rounded-md border border-black">
            {loading && <LoadingSpinner/>}
            <span className="md:w-2/3 max-w-md font-semibold tracking-wide md:text-2xl text-sm text-center md:text-left mb-6">
                Assemble a playlist of your favorite tunes!!<br />
                <span className="text-xs mt-3 md:text-sm font-normal flex items-center justify-center md:justify-start">
                    Selected period:
                    <span className="bg-gradient-to-r from-customPink to-customBlue text-xs font-normal mx-2 md:p-1 rounded-md px-1">
                        {timeRangeName(timeRange)}
                    </span>
                </span>
                {playList && (
                    <div className="flex items-center flex-col md:items-start gap-2 mt-6">
                        <span className="text-sm">Playlist created:</span>
                        <div className="text-sm flex items-center gap-2">
                            <a target="_blank" href={`${playList.link}`}>
                                <button
                                    className="flex items-center gap-2 bg-green-500 text-black rounded-full md:px-8 md:py-3 px-2 py-1 border-b-4 border-b-green-700 md:text-md text-sm font-semibold border-em hover:bg-green-600">
                                    <FaSpotify size={16}/> Open on Spotify
                                </button>
                            </a> 
                            <button
                                onClick={(e) => {playPlayList(`${playList.uri}`)}}
                                className="flex items-center gap-2 bg-green-500 text-black rounded-full md:px-8 md:py-3 px-2 py-1 border-b-4 border-b-green-700 md:text-md text-sm font-semibold border-em hover:bg-green-600">
                                  <BiPlayCircle size={20} />  Listen here
                            </button>
                        </div>
                    </div>
                )}
            </span>
            <button
                onClick={handleCreatePlaylist}
                className="flex items-center gap-2 bg-green-500 text-black rounded-full md:px-8 md:py-3 px-6 py-2 border-b-4 border-b-green-700 md:text-md text-sm font-semibold border-em hover:bg-green-600">
                Create playlist
            </button>
            <div className="flex items-center w-full h-full absolute top-0 left-0 -z-10 bg-cover bg-center bg-[url('/music3.jpg')]">
                <span className="z-10 overflow-hidden opacity-80 absolute top-0 left-0 w-full h-full bg-gradient-to-r from-zinc-900 to-zinc-900"></span>
            </div>
        </div>
    )
}