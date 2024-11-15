import React from 'react';
import { GameRecord } from '@/services/gameService';

interface LeaderboardProps {
  data: GameRecord[];
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ data }) => {
  return (
    <div className="leaderboard">
      <h2>排行榜</h2>
      <table>
        <thead>
          <tr>
            <th>排名</th>
            <th>分数</th>
            <th>日期</th>
          </tr>
        </thead>
        <tbody>
          {data.map((record, index) => (
            <tr key={record.id}>
              <td>{index + 1}</td>
              <td>{record.score}</td>
              <td>{new Date(record.playedAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}; 