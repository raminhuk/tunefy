import React, { useEffect, useState } from 'react';
import { useTracksStore } from '../store/tracksStore';

interface IFrameAPI {
    createController(
        element: HTMLElement | null,
        options: {
            width: string;
            height: string;
            uri: string;
        },
        callback: (EmbedController: EmbedController) => void
    ): void;
}

interface EmbedController {
    loadUri(uri: string): void;
    play(): void;
    togglePlay(): void;
}

declare global {
    interface Window {
        onSpotifyIframeApiReady: (IFrameAPI: IFrameAPI) => void;
    }
}

export function PlayTrack() {
    const [embedController, setEmbedController] = useState<EmbedController | null>(null);
    const { idTrack, togglePlay, isPlay, isPause} = useTracksStore();


    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://open.spotify.com/embed/iframe-api/v1";
        script.async = true;

        document.body.appendChild(script);

        window.onSpotifyIframeApiReady = (IFrameAPI) => {
            const element = document.getElementById('embed-iframe');
            const options = {
                width: '100%',
                height: '100',
                uri: '',
            };
            const callback = (EmbedController: EmbedController) => {
                setEmbedController(EmbedController);
            };
            IFrameAPI.createController(element, options, callback);
        };
    }, []);

    useEffect(() => {
        if (isPause) {
            embedController?.togglePlay();
        }

        if (isPlay && !isPause){
            embedController?.loadUri(idTrack);
            embedController?.play();
        }
        
    }, [idTrack, togglePlay, embedController, isPause, isPlay]);

    return (
        <>
           <div className="w-full">
                <div className="w-full flex flex-col fixed md:-bottom-5 -bottom-3 left-0 z-20">
                    <div className="bg-gray-800 h-20 w-full flex" id="embed-iframe"></div>
                </div>
            </div>
        </>
    )
};
