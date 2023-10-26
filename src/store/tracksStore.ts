import { create } from 'zustand';

interface TracksStore {
    topTracks: Record<string, any> | null;
    setTopTracks: (newTracks: Record<string, any> ) => void;
    idTrack: string;
    isPlay: boolean;
    setIdTrack: (id: string) => void;
    togglePlay: () => void;
}

export const useTracksStore = create<TracksStore>((set) => ({
    topTracks: null,
    idTrack: '',
    isPlay: false,
    setTopTracks: (newTracks: Record<string, any> ) => set({ topTracks: newTracks }),
    setIdTrack: (id: string) => set({ idTrack: id }),
    togglePlay: () => set((state) => ({ isPlay: !state.isPlay })),
}));
