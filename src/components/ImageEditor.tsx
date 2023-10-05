import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import Modal from './Modal';
import { useTracksStore } from '../store/tracksStore';
import { Track } from '../@types/types';
import { BiDownload } from 'react-icons/bi';
import { PiShareFatThin } from 'react-icons/pi';

import Image from 'next/image';

interface ImageEditorProps {
    timeRange: string
}

function ImageEditor({ timeRange }: ImageEditorProps ) {
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string>('');
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { topTracks, setTopTracks } = useTracksStore();


  const generateImage = () => {
    const imageContainer = document.getElementById('image-container');

    if (imageContainer) {
      html2canvas(imageContainer).then((canvas) => {
        const generatedImage = canvas.toDataURL('image/png');
        setGeneratedImageUrl(generatedImage);
      });
    }
  };

  const onClose = () => {
    setOpenModal(false);
  }

  return (
    <div>

        <Modal open={openModal} onClose={onClose}>
            {/* {generatedImageUrl && <img src={generatedImageUrl} alt="Imagem Gerada" />} */}
            <div 
                id="image-container" 
                className='relative aspect-[9/16] flex flex-col gap-2'
                style={{
                    background: '#3c00e3',
                    maxHeight: '80vh'
                }}
            >
                <span className="p-4 flex justify-center">
                <Image 
                    className="h-auto w-full" 
                    alt={topTracks?.[timeRange][0].album.images[0].url} 
                    src={topTracks?.[timeRange][0].album.images[0].url} 
                    width={topTracks?.[timeRange][0].album.images[0].width} 
                    height={topTracks?.[timeRange][0].album.images[0].height}
                    style={{
                        maxWidth: '100px',
                        
                    }}
                />

                </span>
                <div 
                    className="flex flex-col p-5 gap-3"
                >
                    <span className="text-lg">Top Songs</span>
                    <ul 
                        className="flex flex-col gap-2"
                    >
                    {topTracks?.[timeRange].slice(0, 5).map((track: Track, index: number) => (
                            <li key={track.id} className={`w-full items-center flex gap-2`}>
                                <span className="text-lg">#{index +1}</span>
                                <div className="flex flex-col">
                                    <span className="text-xs">{track.name}</span>
                                    {/* <span className="text-xs text-slate-200">{track.artists[0].name}</span>  */}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <button 
                className="my-2 border-0 text-xs lg:text-base w-full flex justify-center items-center gap-2 bg-gradient-to-r from-customPink to-customBlue border border-zinc-800 hover:bg-gradient-to-r from-customPink to-customBlue text-white px-1 py-3 rounded" 
                
                onClick={generateImage}
            >
                Baixar imagem
                <span>
                    <BiDownload size={20} color="#fff"/>
                </span>
            </button>
            {generatedImageUrl && (
                <a 
                    href={generatedImageUrl} 
                    download="captured_image.png" 
                    style={{ display: 'none' }} 
                    ref={(link) => link?.click()}
                >
                    Baixar Imagem
                </a>
            )}
        </Modal>
          
        <button
            className="my-2 border-0 text-xs lg:text-base w-full flex justify-center items-center gap-2 bg-gradient-to-r from-customPink to-customBlue border border-zinc-800 hover:bg-gradient-to-r from-customPink to-customBlue text-white px-1 py-3 rounded"
            onClick={() => {setOpenModal(true)}}
        >
            Compartilhe em suas redes sociais
            <span>
                <PiShareFatThin size={20} color="#fff"/>
            </span>
        </button>

    </div>
  );
}

export default ImageEditor;
