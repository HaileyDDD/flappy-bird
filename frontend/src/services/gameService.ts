import axios from 'axios';
import { ApiResponse } from '@/types';

const GAME_API_URL = '/api/game';

export interface GameRecord {
  id: number;
  userId: string;
  score: number;
  playedAt: string;
}

export const gameService = {
  async submitScore(score: number): Promise<ApiResponse<GameRecord>> {
    try {
      const response = await axios.post(`${GAME_API_URL}/score`, { score });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getLeaderboard(): Promise<ApiResponse<GameRecord[]>> {
    try {
      const response = await axios.get(`${GAME_API_URL}/leaderboard`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}; 