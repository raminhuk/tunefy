// ImageDisplay.tsx

import Image from "next/image";
import { useTracksStore } from "../../store/tracksStore";
import { Track } from "../../@types/types";
import { useState } from "react";
import html2canvas from "html2canvas";
import { BiDownload } from "react-icons/bi";

interface ImageDisplayProps {
    selectedTheme: number;
    timeRange: string
}
interface TopTracksProps {
    topTracks: Record<string, any> | null;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ selectedTheme, timeRange }) => {
    const { topTracks } = useTracksStore();

    const generateImage = () => {
        const imageContainer = document.getElementById('image-container');
        console.log(imageContainer)

        if (imageContainer) {
            html2canvas(imageContainer).then((canvas) => {
                const generatedImage = canvas.toDataURL('image/png');
                console.log(generatedImage)
                const downloadLink = document.createElement('a');
                downloadLink.href = generatedImage;
                downloadLink.download = 'tunefy.png';

                downloadLink.click();
            });
        }
    };


    const handleShare = () => {
        const imageUrl = `/assets/theme${selectedTheme}.jpg`;
        const whatsappLink = `https://api.whatsapp.com/send?text=Confira essa imagem&image=${encodeURIComponent(
            imageUrl
        )}`;
        window.open(whatsappLink, '_blank');
    };

    return (
        <div>
            <div id="image-container" className="relative">
                <Image
                    src={`/assets/theme${selectedTheme}.jpg`}
                    alt={`Theme ${selectedTheme + 1}`}
                    className="mt-4"
                    width={1080}
                    height={1920}
                    style={{
                        width: 'auto',
                        height: 'auto',
                        maxWidth: '100%',
                        maxHeight: '70vh'
                    }}
                />
                <div className="absolute top-0 w-full h-full flex justify-center flex-wrap items-center">
                    <div className="flex flex-col justify-center items-center gap-8">
                        {topTracks?.[timeRange].slice(0, 1)?.map((track: Track, index: number) => (
                            <div key={index + 'img'} className="rounded-md overflow-hidden shadow-xl">
                                <Image
                                    className={`w-24 md:w-40 h-auto rounded-sm`}
                                    alt={track.artists[0].name}
                                    src={track.album.images[0].url}
                                    width={track.album.images[0].width}
                                    height={track.album.images[0].height}
                                />
                            </div>
                        ))}
                        <div className="flex flex-col gap-4 px-6">
                            {topTracks?.[timeRange].slice(0, 5)?.map((track: Track, index: number) => (
                                <>
                                    <div key={track.id} className={`w-full flex gap-4 items-center rounded`}>
                                        <span className="z-10 w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-r from-customPink to-customBlue font-semibold text-sm tracking-wide">{index + 1}º</span>
                                        <div className="text-left flex flex-col flex-1">
                                            <span className="md:text-lg text-sm font-semibold drop-shadow-[0_3px_3px_rgba(0,0,0,0.6)] truncate w-40 md:w-64">{track.name}</span>
                                            <span className="text-xs drop-shadow-[0_3px_3px_rgba(0,0,0,0.6)] truncate w-40 md:w-64 ">
                                                {track.artists.map((artist: any, index: number) => (
                                                    <span key={artist.id}>{index !== 0 && ', '}{artist.name}</span>
                                                ))}
                                            </span>
                                        </div>
                                    </div>
                                </>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <button
                className="mt-2 border-0 text-xs lg:text-base w-full flex justify-center items-center gap-2 bg-gradient-to-r from-customPink to-customBlue border border-zinc-800 hover:bg-gradient-to-r from-customPink to-customBlue text-white px-1 py-2 rounded"

                onClick={generateImage}
            >
                Baixar imagem
                <span>
                    <BiDownload size={20} color="#fff" />
                </span>
            </button>
            {/* <button className="mt-2 bg-blue-500 text-white p-2" onClick={handleShare}>
          Compartilhar no WhatsApp
        </button> */}
        </div>
    );
};

export default ImageDisplay;
