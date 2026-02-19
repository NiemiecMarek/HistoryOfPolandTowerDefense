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
    this.scene.start('MenuScene');
  }
}
