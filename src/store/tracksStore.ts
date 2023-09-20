import { create } from 'zustand';
import { SpotifyUser, Track } from '../@types/types';

interface TracksStore {
    topTracks: Record<string, any> | null;
    setTopTracks: (newTracks: Record<string, any> ) => void;
}

export const useTracksStore = create<TracksStore>((set) => ({
    topTracks: null,
    setTopTracks: (newTracks: Record<string, any> ) => set({ topTracks: newTracks }),
}));
