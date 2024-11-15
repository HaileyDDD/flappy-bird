interface Skin {
  id: string;
  name: string;
  price: number;
  rarity: 'common' | 'rare' | 'legendary';
  imageUrl: string;
}

export const useSkinStore = create((set) => ({
  currentSkin: 'default',
  unlockedSkins: ['default'],
  availableSkins: [
    { 
      id: 'default', 
      name: '经典小鸟', 
      price: 0, 
      rarity: 'common',
      imageUrl: '/assets/bird_default.png'
    },
    { 
      id: 'ninja', 
      name: '忍者小鸟', 
      price: 500, 
      rarity: 'rare',
      imageUrl: '/assets/bird_ninja.png'
    }
  ],
  
  unlockSkin: (skinId: string) => set((state) => ({
    unlockedSkins: [...state.unlockedSkins, skinId]
  })),

  selectSkin: (skinId: string) => set({ currentSkin: skinId })
})); 