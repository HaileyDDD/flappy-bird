import React from 'react';
import { useGameStore } from '@/stores/gameStore';

interface GameOverModalProps {
  onRestart: () => void;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({ onRestart }) => {
  const { score } = useGameStore();

  return (
    <div className="game-over-modal">
      <h2>游戏结束</h2>
      <p>你的分数: {score}</p>
      <button onClick={onRestart}>重新开始</button>
    </div>
  );
}; 