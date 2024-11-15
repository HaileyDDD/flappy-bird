export class BackgroundManager {
  private scene: Phaser.Scene;
  private backgrounds: Record<string, Phaser.GameObjects.TileSprite> = {};

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  createParallaxBackground() {
    // 多层视差背景
    this.backgrounds.sky = this.scene.add.tileSprite(
      400, 300, 800, 600, 'sky'
    ).setScrollFactor(0.1);

    this.backgrounds.clouds = this.scene.add.tileSprite(
      400, 300, 800, 600, 'clouds'
    ).setScrollFactor(0.3);
  }

  updateBackground() {
    // 背景动态滚动
    this.backgrounds.sky.tilePositionX += 0.5;
    this.backgrounds.clouds.tilePositionX += 1;
  }
} 