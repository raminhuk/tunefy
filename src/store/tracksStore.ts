import { create } from 'zustand';

interface TracksStore {
    topTracks: Record<string, any> | null;
    setTopTracks: (newTracks: Record<string, any> ) => void;
    idTrack: string;
    isPlay: boolean;
    isPause: boolean;
    setIdTrack: (id: string) => void;
    togglePlay: (play?: boolean) => void;
    togglePause: (pause?: boolean) => void;
}

export const useTracksStore = create<TracksStore>((set) => ({
    topTracks: null,
    idTrack: '',
    isPlay: false,
    isPause: false,
    setTopTracks: (newTracks: Record<string, any> ) => set({ topTracks: newTracks }),
    setIdTrack: (id: string) => set({ idTrack: id }),
    togglePlay: (play?: boolean) => set((state) => ({ isPlay: play === null ? !state.isPlay : play})),
    togglePause: (pause?: boolean) => set((state) => ({ isPause: pause === null ? !state.isPause : pause})),
}));
