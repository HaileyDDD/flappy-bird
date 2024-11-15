export const shareService = {
  shareScore(score: number) {
    if (navigator.share) {
      navigator.share({
        title: 'Flappy Bird 挑战',
        text: `我在Flappy Bird中获得了${score}分，快来挑战我！`,
        url: window.location.href
      });
    } else {
      // 兼容处理
      const shareText = `我在Flappy Bird中获得了${score}分，快来挑战我！`;
      navigator.clipboard.writeText(shareText).then(() => {
        alert('分数已复制到剪贴板');
      });
    }
  },

  async challengeFriend(friendId: string, score: number) {
    try {
      await axios.post('/api/challenge', { friendId, score });
    } catch (error) {
      console.error('发起挑战失败', error);
    }
  }
}; 