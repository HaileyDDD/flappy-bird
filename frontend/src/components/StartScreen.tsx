import React from 'react';
import { useGameStore } from '@/stores/gameStore';

interface StartScreenProps {
  onStart: () => void;
}

export const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  const { setDifficulty, difficulty } = useGameStore();

  return (
    <div className="start-screen">
      <h1>Flappy Bird</h1>
      <div className="difficulty-selector">
        <label>难度选择:</label>
        <select 
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value as 'easy' | 'medium' | 'hard')}
        >
          <option value="easy">简单</option>
          <option value="medium">中等</option>
          <option value="hard">困难</option>
        </select>
      </div>
      <button onClick={onStart}>开始游戏</button>
    </div>
  );
}; 