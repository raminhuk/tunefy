import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import Modal from './Modal';

function ImageEditor() {
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string>('');
  const [openModal, setOpenModal] = useState<boolean>(false);

  const generateImage = () => {
    const imageContainer = document.getElementById('image-container');

    if (imageContainer) {
      html2canvas(imageContainer).then((canvas) => {
        const generatedImage = canvas.toDataURL('image/png');
        setGeneratedImageUrl(generatedImage);
        setOpenModal(true);
      });
    }
  };

  const onClose = () => {
    setOpenModal(false);
  }

  return (
    <div>
        <Modal open={openModal} onClose={onClose}>
            {generatedImageUrl && <img src={generatedImageUrl} alt="Imagem Gerada" />}
        </Modal>
        <div id="image-container" className='w-80 h-80 bg-indigo-500'>
            Chama
        </div>
          
        <button onClick={generateImage}>Gerar Imagem</button>

    </div>
  );
}

export default ImageEditor;
