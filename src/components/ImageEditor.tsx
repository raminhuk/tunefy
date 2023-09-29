import React, { useState } from 'react';
import html2canvas from 'html2canvas';

function ImageEditor() {
  const [text, setText] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string>('');

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        setImageUrl(event.target?.result as string);
      };

      reader.readAsDataURL(file);
    }
  };

  const generateImage = () => {
    const imageContainer = document.getElementById('image-container');

    if (imageContainer) {
      html2canvas(imageContainer).then((canvas) => {
        const generatedImage = canvas.toDataURL('image/png');
        setGeneratedImageUrl(generatedImage);
      });
    }
  };

  const shareOnWhatsApp = () => {
    if (generatedImageUrl) {
      const shareText = 'Confira esta imagem:';
      const whatsappUrl = `whatsapp://send?phone=5547996604764text=${encodeURIComponent(
        `${shareText} ${window.location.href}`
      )}&image=${encodeURIComponent(generatedImageUrl)}`;

      console.log(whatsappUrl)
      window.location.href = whatsappUrl;
    }
  };

  return (
    <div>
      <h2>Editor de Imagem</h2>
      <input type="file" onChange={handleImageUpload} />
      <br />
      <textarea
        placeholder="Insira seu texto aqui"
        value={text}
        onChange={handleTextChange}
      />
      <br />
      <button onClick={generateImage}>Gerar Imagem</button>
      <br />
      {imageUrl && (
        <div id="image-container" className='relative'>
            <span className='absolute top-0 bottom-0'>{text}</span>
            <img src={imageUrl} alt="Imagem de fundo" />
        </div>
      )}
      {generatedImageUrl && (
        <img src={generatedImageUrl} alt="Imagem gerada" style={{ marginTop: '20px' }} />
      )}

<div>
          <img src={generatedImageUrl} alt="Imagem gerada" style={{ marginTop: '20px' }} />
          <br />
          <button onClick={shareOnWhatsApp}>Compartilhar no WhatsApp</button>
        </div>
    </div>
  );
}

export default ImageEditor;
