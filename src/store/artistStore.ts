import { create } from 'zustand';

interface ArtistStore {
    topArtist: Record<string, any> | null;
    setTopArtist: (newArtist: Record<string, any> ) => void;
}

export const useArtistStore = create<ArtistStore>((set) => ({
    topArtist: null,
    setTopArtist: (newArtist: Record<string, any> ) => set({ topArtist: newArtist }),
}));
