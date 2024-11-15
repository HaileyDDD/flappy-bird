export const useGameSettingsStore = create((set) => ({
  musicVolume: 0.5,
  soundEffectsVolume: 0.7,
  theme: 'default',
  
  setMusicVolume: (volume: number) => set({ musicVolume: volume }),
  setSoundEffectsVolume: (volume: number) => set({ soundEffectsVolume: volume }),
  setTheme: (theme: string) => set({ theme })
})); 