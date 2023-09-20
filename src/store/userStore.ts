import { create } from 'zustand';
import { SpotifyUser } from '../@types/types';

interface UserStore {
  user: SpotifyUser | null;
  setUser: (newUser: SpotifyUser) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (newUser: SpotifyUser) => set({ user: newUser }),
}));
