import Phaser from 'phaser';
import { generateHussarTextures } from '../sprites/hussar_sprite';

export class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  preload(): void {
    // Assets generated procedurally in create()
  }

  create(): void {
    generateHussarTextures(this);
    this.generateParticleTextures();
    this.scene.start('MenuScene');
  }

  private generateParticleTextures(): void {
    const gfx = this.add.graphics();
    gfx.fillStyle(0xffffff, 1);
    gfx.fillRect(0, 0, 4, 4);
    gfx.generateTexture('white-particle', 4, 4);
    gfx.destroy();
  }
}
