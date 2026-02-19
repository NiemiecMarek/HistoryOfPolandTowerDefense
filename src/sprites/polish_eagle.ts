import Phaser from 'phaser';
import { COLORS, DEPTHS } from '../constants';

export class PolishEagle extends Phaser.GameObjects.Container {
  private gfx: Phaser.GameObjects.Graphics;

  constructor(scene: Phaser.Scene, x: number, y: number, scale: number = 1) {
    super(scene, x, y);

    this.gfx = scene.add.graphics();
    this.add(this.gfx);
    this.draw();
    this.setScale(scale);
    this.setDepth(DEPTHS.SPRITES);
    scene.add.existing(this);
  }

  private draw(): void {
    const g = this.gfx;
    g.clear();

    // --- Body (white) ---
    g.fillStyle(COLORS.WHITE, 1);
    g.fillRect(-12, -20, 24, 36);

    // --- Head (white circle) ---
    g.fillStyle(COLORS.WHITE, 1);
    g.fillCircle(0, -30, 12);

    // --- Left wing (stepped, 3 tiers) ---
    g.fillStyle(COLORS.WHITE, 1);
    g.fillRect(-40, -18, 28, 12);
    g.fillRect(-34, -6, 22, 10);
    g.fillRect(-28, 4, 16, 8);

    // --- Right wing (mirrored) ---
    g.fillRect(12, -18, 28, 12);
    g.fillRect(12, -6, 22, 10);
    g.fillRect(12, 4, 16, 8);

    // --- Heraldic shield on chest (red/white) ---
    g.fillStyle(COLORS.RED, 1);
    g.fillRect(-8, -10, 16, 20);
    g.fillStyle(COLORS.WHITE, 1);
    g.fillRect(-8, -10, 16, 10);

    // --- Crown (gold, 3 teeth + base) ---
    g.fillStyle(COLORS.GOLD, 1);
    g.fillRect(-10, -46, 20, 8);
    g.fillRect(-10, -54, 4, 10);
    g.fillRect(-2, -56, 4, 12);
    g.fillRect(6, -54, 4, 10);

    // --- Beak (gold) ---
    g.fillStyle(COLORS.GOLD, 1);
    g.fillRect(8, -32, 8, 5);

    // --- Talons (gold) ---
    g.fillRect(-14, 16, 6, 4);
    g.fillRect(-16, 20, 4, 4);
    g.fillRect(-10, 20, 4, 4);
    g.fillRect(8, 16, 6, 4);
    g.fillRect(12, 20, 4, 4);
    g.fillRect(6, 20, 4, 4);

    // --- Eye (dark) ---
    g.fillStyle(COLORS.BG_BASE, 1);
    g.fillCircle(5, -32, 3);
  }

  destroy(fromScene?: boolean): void {
    this.gfx.destroy();
    super.destroy(fromScene);
  }
}
