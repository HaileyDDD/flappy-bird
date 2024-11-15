import React, { useState, useEffect } from 'react';
import { useGameStore } from '@/stores/gameStore';
import { gameService } from '@/services/gameService';
import { GameCanvas } from '@/components/GameCanvas';
import { StartScreen } from '@/components/StartScreen';
import { Leaderboard } from '@/components/Leaderboard';
import { GameOverModal } from '@/components/GameOverModal';

const GamePage: React.FC = () => {
  const { score, isPlaying, startGame, endGame } = useGameStore();
  const [leaderboard, setLeaderboard] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const result = await gameService.getLeaderboard();
      setLeaderboard(result.data);
    };
    fetchLeaderboard();
  }, []);

  const handleGameOver = async () => {
    await gameService.submitScore(score);
    endGame();
    setIsGameOver(true);
  };

  const handleRestart = () => {
    setIsGameOver(false);
    startGame();
  };

  return (
    <div className="game-container">
      {isGameOver && <GameOverModal onRestart={handleRestart} />}
      
      {!isPlaying && !isGameOver ? (
        <StartScreen onStart={startGame} />
      ) : (
        <GameCanvas onGameOver={handleGameOver} />
      )}

      <Leaderboard data={leaderboard} />
    </div>
  );
};

export default GamePage; 