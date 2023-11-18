import Image from 'next/image';
import React, { useState } from 'react';

interface ThemeSelectorProps {
  onThemeChange: (themeIndex: number) => void;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ onThemeChange }) => {
  const themes = ['theme1', 'theme2', 'theme3'];
  const [selectedTheme, setSelectedTheme] = useState<number>(1);

  const handleThemeChange = (index: number) => {
    setSelectedTheme(index);
    onThemeChange(index);
  };

  return (
    <div>
        <p className="text-gray-900">Select the theme</p>
      <div className="flex gap-2">
        {themes.map((theme, index) => (
          <div
            key={index}
            className={`flex-1 cursor-pointer rounded border-2 p-0.5 ${
              selectedTheme === index+1 ? 'border-red-500' : ''
            }`}
            onClick={() => handleThemeChange(index+1)}
          >
            <Image
                src={`/assets/theme${index+1}.jpg`}
                alt={`Theme ${index + 1}`}
                className="object-cover"
                width={100}
                height={200}
                style={{
                    width: '100%',
                    maxHeight: 50
                }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThemeSelector;
