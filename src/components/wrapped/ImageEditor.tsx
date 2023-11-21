import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import { BiDownload } from 'react-icons/bi';
import { PiShareFatThin } from 'react-icons/pi';
import Image from 'next/image';
import { Track } from '../../@types/types';
import { useTracksStore } from '../../store/tracksStore';
import Modal from '../UI/Modal';
import ImageDisplay from './ImageDisplay';
import ThemeSelector from './ThemeSelector.tsx';

interface WrappedProps {
    timeRange: string
}

function Wrapped({ timeRange }: WrappedProps ) {
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedTheme, setSelectedTheme] = useState<number>(1);

  const handleThemeChange = (themeIndex: number) => {
    setSelectedTheme(themeIndex);
  };

  const generateImage = () => {
    setGeneratedImageUrl(null)
    const imageContainer = document.getElementById('image-container');

    if (imageContainer) {
      html2canvas(imageContainer).then((canvas) => {
        const generatedImage = canvas.toDataURL('image/png');
        setGeneratedImageUrl(generatedImage);
      });
    }
  };

  const onClose = () => {
    setGeneratedImageUrl(null)
    setOpenModal(false);
  }

  return (
    <div>
        <Modal open={openModal} onClose={onClose}>
            <div className="container mx-auto text-center">
                <ThemeSelector onThemeChange={handleThemeChange} />
                <ImageDisplay selectedTheme={selectedTheme} timeRange={timeRange}/>
            </div>
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

export default Wrapped;
