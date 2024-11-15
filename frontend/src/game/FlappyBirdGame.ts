import Phaser from 'phaser';
import { useGameStore } from '@/stores/gameStore';

export class FlappyBirdGame extends Phaser.Scene {
  private bird!: Phaser.Physics.Arcade.Sprite;
  private pipes!: Phaser.Physics.Arcade.StaticGroup;
  private scoreText!: Phaser.GameObjects.Text;
  private onGameOver: () => void;
  private powerUps!: Phaser.Physics.Arcade.Group;

  constructor(onGameOver: () => void) {
    super({ key: 'FlappyBirdScene' });
    this.onGameOver = onGameOver;
  }

  preload() {
    this.load.image('bird', '/assets/bird.png');
    this.load.image('pipe', '/assets/pipe.png');
  }

  create() {
    const { incrementScore } = useGameStore.getState();

    // 创建小鸟
    this.bird = this.physics.add.sprite(100, 245, 'bird');
    this.bird.setCollideWorldBounds(true);

    // 创建管道组
    this.pipes = this.physics.add.staticGroup();
    this.createPipes();

    // 碰撞检测
    this.physics.add.collider(
      this.bird, 
      this.pipes, 
      this.handleCollision, 
      undefined, 
      this
    );

    // 键盘控制
    this.input.keyboard.on('keydown-SPACE', this.jump, this);

    // 分数显示
    this.scoreText = this.add.text(16, 16, 'Score: 0', { 
      fontSize: '32px', 
      color: '#000' 
    });

    this.createPowerUps();
  }

  update() {
    // 生成新管道
    if (this.pipes.getChildren().length < 5) {
      this.createPipes();
    }

    // 移除屏幕外的管道
    this.pipes.getChildren().forEach((pipe: any) => {
      if (pipe.x < -50) {
        pipe.destroy();
      }
    });
  }

  private createPipes() {
    const { difficulty } = useGameStore.getState();
    const gap = difficulty === 'easy' ? 250 : difficulty === 'medium' ? 200 : 150;
    const holePosition = Phaser.Math.Between(50, this.game.config.height as number - gap - 50);

    const topPipe = this.pipes.create(
      this.game.config.width as number, 
      holePosition, 
      'pipe'
    );
    const bottomPipe = this.pipes.create(
      this.game.config.width as number, 
      holePosition + gap, 
      'pipe'
    );

    topPipe.setFlipY(true);
    topPipe.body.velocity.x = -200;
    bottomPipe.body.velocity.x = -200;
  }

  private jump() {
    this.bird.setVelocityY(-300);
  }

  private handleCollision() {
    this.onGameOver();
    this.scene.restart();
  }

  private createPowerUps() {
    this.powerUps = this.physics.add.group({
      key: 'powerup',
      repeat: 1,
      setXY: { x: 800, y: Phaser.Math.Between(50, 550) }
    });

    this.powerUps.children.entries.forEach((powerup: any) => {
      powerup.body.velocity.x = -200;
    });

    // 道具碰撞检测
    this.physics.add.overlap(
      this.bird, 
      this.powerUps, 
      this.collectPowerUp, 
      undefined, 
      this
    );
  }

  private collectPowerUp(bird: any, powerup: any) {
    powerup.disableBody(true, true);
    
    // 不同道具效果
    const effectType = Phaser.Math.Between(0, 2);
    switch(effectType) {
      case 0: // 无敌
        this.bird.setTint(0x00ff00);
        this.time.delayedCall(3000, () => {
          this.bird.clearTint();
        });
        break;
      case 1: // 加分
        const { incrementScore } = useGameStore.getState();
        incrementScore();
        break;
      case 2: // 减速
        this.pipes.getChildren().forEach((pipe: any) => {
          pipe.body.velocity.x = -100;
        });
        break;
    }
  }
}