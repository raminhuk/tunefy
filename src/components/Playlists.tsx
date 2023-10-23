import React from 'react';

interface Playlist {
  id: number;
  name: string;
  followers: number;
  imageUrl: string;
}

const playlists: Playlist[] = [
  {
    id: 1,
    name: 'Playlist 1',
    followers: 1000,
    imageUrl: 'URL_DA_IMAGEM_1',
  },
  {
    id: 2,
    name: 'Playlist 2',
    followers: 2000,
    imageUrl: 'URL_DA_IMAGEM_2',
  },
  {
    id: 3,
    name: 'Playlist 3',
    followers: 3000,
    imageUrl: 'URL_DA_IMAGEM_3',
  },
  {
    id: 4,
    name: 'Playlist 4',
    followers: 4000,
    imageUrl: 'URL_DA_IMAGEM_4',
  },
];

interface PlaylistCardProps {
  name: string;
  followers: number;
  imageUrl: string;
}

const PlaylistCard: React.FC<PlaylistCardProps> = ({ name, followers, imageUrl }) => (
  <div className="bg-white p-4 rounded-lg shadow-md">
    {/* <img src={imageUrl} alt={name} className="w-full h-48 object-cover mb-2" /> */}
    <h2 className="text-xl font-semibold mb-1">{name}</h2>
    <p className="text-gray-500 text-sm mb-1">{followers} Seguidores</p>
    <button className="bg-green-500 text-white p-2 rounded-full">
      <i className="fas fa-play"></i> Ouvir
    </button>
  </div>
);

const PlaylistComponent: React.FC = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    {playlists.map((playlist) => (
      <PlaylistCard
        key={playlist.id}
        name={playlist.name}
        followers={playlist.followers}
        imageUrl={playlist.imageUrl}
      />
    ))}
  </div>
);

export default PlaylistComponent;
