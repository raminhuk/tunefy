// ImageDisplay.tsx

import Image from "next/image";

interface ImageDisplayProps {
    selectedTheme: number;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ selectedTheme }) => {  
    const handleShare = () => {
      const imageUrl = `/assets/theme${selectedTheme}.jpg`;
      const whatsappLink = `https://api.whatsapp.com/send?text=Confira essa imagem&image=${encodeURIComponent(
        imageUrl
      )}`;
      window.open(whatsappLink, '_blank');
    };
  
    return (
      <div>
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
            maxHeight: '75vh'
          }}
        />
        {/* <button className="mt-2 bg-blue-500 text-white p-2" onClick={handleShare}>
          Compartilhar no WhatsApp
        </button> */}
      </div>
    );
  };
  
  export default ImageDisplay;
  