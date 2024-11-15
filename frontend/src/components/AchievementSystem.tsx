export const AchievementSystem = () => {
  const achievements = [
    {
      id: 'first_flight',
      name: '首次起飞',
      description: '完成第一次游戏',
      reward: 100,
      completed: false
    },
    {
      id: 'high_score',
      name: '高分挑战',
      description: '获得超过50分',
      reward: 500,
      completed: false
    }
  ];

  const checkAchievements = (score: number) => {
    achievements.forEach(achievement => {
      switch(achievement.id) {
        case 'first_flight':
          achievement.completed = true;
          break;
        case 'high_score':
          achievement.completed = score > 50;
          break;
      }
    });
  };

  return (
    <div className="achievements">
      {achievements.map(achievement => (
        <div 
          key={achievement.id}
          className={`achievement ${achievement.completed ? 'completed' : ''}`}
        >
          {achievement.name}
        </div>
      ))}
    </div>
  );
}; 