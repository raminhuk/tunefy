import { create } from 'zustand';

interface RecentlyStore {
    recently: any | null;
    setRecently: (newArtist: Record<string, any> ) => void;
}

export const useRecentlyStore = create<RecentlyStore>((set) => ({
    recently: null,
    setRecently: (newRecently: any ) => set({ recently: newRecently }),
}));
