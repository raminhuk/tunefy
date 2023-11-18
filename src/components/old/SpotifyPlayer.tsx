// import React, { useState, useEffect } from 'react';
// import { getSpotifyAccessToken } from '../auth/spotifyToken';

// interface SpotifyPlayer {
//     // Propriedades de informações da música atualmente tocando
//     trackName: string;
//     artistName: string;
//     albumName: string;
//     albumImageURL: string;
  
//     // Controles de reprodução
//     play: () => Promise<void>;
//     pause: () => Promise<void>;
//     resume: () => Promise<void>;
//     seek: (positionMs: number) => Promise<void>;
  
//     // Outras propriedades e métodos relevantes
//     // ...
  
//     // Eventos
//     onPlay: (callback: () => void) => void;
//     onPause: (callback: () => void) => void;
//   }

// const SpotifyPlayer: React.FC = () => {
//   const [player, setPlayer] = useState<SpotifyPlayer>({}); // Estado para armazenar o objeto do player
//   const [isPlaying, setIsPlaying] = useState<boolean>(false); // Estado para controlar play/pause

//   useEffect(() => {
//     // Carrega o SDK do Spotify

//     //ts-ignore
//     window.onSpotifyWebPlaybackSDKReady = () => {
//       const newPlayer = new window.Spotify.Player({
//         name: 'Meu Spotify Player',
//         getOAuthToken: (cb: (token: string) => void) => {
//           cb(getSpotifyAccessToken() || '');
//         },
//       });

//       // Configura os eventos do player
//       newPlayer.addListener('ready', ({ device_id }:any) => {
//         console.log('Player pronto com o ID do dispositivo', device_id);
//       });

//       newPlayer.addListener('player_state_changed', (state: any) => {
//         console.log('Estado do player alterado', state);
//         setIsPlaying(state.paused === false);
//       });

//       // Conecta o player ao Spotify
//       newPlayer.connect().then((success: boolean) => {
//         if (success) {
//           console.log('Conectado ao Spotify');
//           setPlayer(newPlayer);
//         }
//       });
//     };

//     // Carrega o SDK do Spotify
//     const script = document.createElement('script');
//     script.src = 'https://sdk.scdn.co/spotify-player.js';
//     script.async = true;
//     document.body.appendChild(script);

//     return () => {
//       // Limpa o script quando o componente é desmontado
//       document.body.removeChild(script);
//     };
//   }, []);

//   const handlePlayPause = () => {
//     if (player) {
//       if (isPlaying) {
//         player.pause().then(() => setIsPlaying(false));
//       } else {
//         player.resume().then(() => setIsPlaying(true));
//       }
//     }
//   };

//   return (
//     <div>
//       {/* Seus botões personalizados */}
//       <button onClick={handlePlayPause}>
//         {isPlaying ? 'Pause' : 'Play'}
//       </button>
//     </div>
//   );
// };

// export default SpotifyPlayer;
