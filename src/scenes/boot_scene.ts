import Phaser from 'phaser';

export class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  preload(): void {
    // Assets will be generated procedurally, nothing to preload
  }

  create(): void {
    this.scene.start('MenuScene');
  }
}
