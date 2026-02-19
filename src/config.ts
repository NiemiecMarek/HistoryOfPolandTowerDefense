import Phaser from 'phaser';
import { BootScene } from './scenes/boot_scene';
import { MenuScene } from './scenes/menu_scene';

export const phaserConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 1280,
  height: 720,
  backgroundColor: '#0a0a14',
  pixelArt: true,
  antialias: false,
  scene: [BootScene, MenuScene],
  parent: document.body,
};
