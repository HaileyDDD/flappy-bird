import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import { FlappyBirdGame } from '@/game/FlappyBirdGame';

interface GameCanvasProps {
  onGameOver: () => void;
}

export const GameCanvas: React.FC<GameCanvasProps> = ({ onGameOver }) => {
  const gameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gameRef.current) return;

    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      parent: gameRef.current,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 300 },
          debug: false
        }
      },
      scene: [new FlappyBirdGame(onGameOver)]
    };

    const game = new Phaser.Game(config);

    return () => {
      game.destroy(true);
    };
  }, [onGameOver]);

  return <div ref={gameRef} />;
}; 