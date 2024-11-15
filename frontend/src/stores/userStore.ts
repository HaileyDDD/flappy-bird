import create from 'zustand';
import { User } from '@/types';

interface UserState {
  currentUser: User | null;
  login: (user: User) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  currentUser: null,
  login: (user) => set({ currentUser: user }),
  logout: () => set({ currentUser: null })
})); 