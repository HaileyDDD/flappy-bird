import create from 'zustand';

interface GameState {
  score: number;
  isPlaying: boolean;
  difficulty: 'easy' | 'medium' | 'hard';
  
  startGame: () => void;
  endGame: () => void;
  incrementScore: () => void;
  setDifficulty: (level: 'easy' | 'medium' | 'hard') => void;
}

export const useGameStore = create<GameState>((set) => ({
  score: 0,
  isPlaying: false,
  difficulty: 'medium',
  
  startGame: () => set({ isPlaying: true, score: 0 }),
  endGame: () => set({ isPlaying: false }),
  incrementScore: () => set(state => ({ score: state.score + 1 })),
  setDifficulty: (level) => set({ difficulty: level })
})); 