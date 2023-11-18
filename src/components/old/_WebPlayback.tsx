// import React, { useState, useEffect } from 'react';
// import { getSpotifyAccessToken } from '../auth/spotifyToken';

// const track = {
//     name: "Alô Ex-Amor - Ao Vivo",
//     album: {
//         images: [
//             { url: "https://i.scdn.co/image/ab67616d0000b273d9a22656235459018a9914a4" }
//         ]
//     },
//     artists: [
//         { name: "João Bosco e Gabriel" }
//     ]
// }

// function WebPlayback(props: any) {

//     const [is_paused, setPaused] = useState(false);
//     const [is_active, setActive] = useState(false);
//     const [player, setPlayer]:any = useState(undefined);
//     const [current_track, setTrack] = useState(track);

//     useEffect(() => {

//         const script = document.createElement("script");
//         script.src = "https://sdk.scdn.co/spotify-player.js";
//         script.async = true;

//         document.body.appendChild(script);

//         // @ts-ignore
//         window.onSpotifyWebPlaybackSDKReady = () => {
//             // @ts-ignore
//             const player = new window.Spotify.Player({
//                 name: 'Tunefy',
//                 // @ts-ignore
//                 getOAuthToken: cb => { cb(getSpotifyAccessToken()); },
//                 volume: 0.5
//             });

//             setPlayer(player);

//             // @ts-ignore
//             player.addListener('ready', ({ device_id }) => {
//                 console.log('Ready with Device ID', device_id);
//             });

//             // @ts-ignore
//             player.addListener('not_ready', ({ device_id }) => {
//                 console.log('Device ID has gone offline', device_id);
//             });

//             // @ts-ignore
//             player.addListener('player_state_changed', ( state => {

//                 if (!state) {
//                     return;
//                 }

//                 setTrack(state.track_window.current_track);
//                 setPaused(state.paused);

//                 // @ts-ignore
//                 player.getCurrentState().then( state => { 
//                     (!state)? setActive(false) : setActive(true) 
//                 });

//             }));

//             player.connect();

//         };
//     }, []);

//     if (!is_active) { 
//         return (
//             <>
//                 <div className="container">
//                     <div className="main-wrapper">
//                         <b> Instance not active. Transfer your playback using your Spotify app </b>
//                     </div>
//                 </div>
//             </>)
//     } else {
//         return (
//             <>
//                 <div className="container">
//                     <div className="main-wrapper">

//                         <img src={current_track.album.images[0].url} className="now-playing__cover" alt="" />

//                         <div className="now-playing__side">
//                             <div className="now-playing__name">{current_track.name}</div>
//                             <div className="now-playing__artist">{current_track.artists[0].name}</div>

//                             <button className="btn-spotify" onClick={() => { player?.previousTrack() }} >
//                                 &lt;&lt;
//                             </button>

//                             <button className="btn-spotify" onClick={() => { player?.togglePlay() }} >
//                                 { is_paused ? "PLAY" : "PAUSE" }
//                             </button>

//                             <button className="btn-spotify" onClick={() => { player?.nextTrack() }} >
//                                 &gt;&gt;
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//                 <button onClick={(e) => {setTrack(track)}}>CHAMAAAAAAAAA</button>
//             </>
//         );
//     }
// }

// export default WebPlayback
