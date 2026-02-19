import Phaser from 'phaser';
import { phaserConfig } from './config';

window.addEventListener('DOMContentLoaded', () => {
  const game = new Phaser.Game(phaserConfig);
  (window as unknown as Record<string, unknown>)['game'] = game;
});
