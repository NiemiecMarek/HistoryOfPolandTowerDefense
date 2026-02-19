import Phaser from 'phaser';
import { COLORS, DEPTHS, FONT_FAMILY, MENU_LAYOUT, BattleNodeData } from '../constants';

export class TimelineNode extends Phaser.GameObjects.Container {
  private readonly nodeData: BattleNodeData;
  private nodeGfx: Phaser.GameObjects.Graphics;
  private isHovered: boolean = false;

  constructor(scene: Phaser.Scene, x: number, y: number, data: BattleNodeData) {
    super(scene, x, y);
    this.nodeData = data;

    this.nodeGfx = scene.add.graphics();
    this.add(this.nodeGfx);

    // Year text (above node)
    const yearText = scene.add
      .text(0, MENU_LAYOUT.TIMELINE_YEAR_OFFSET_Y, String(data.year), {
        fontFamily: FONT_FAMILY,
        fontSize: '16px',
        color: '#ffd700',
      })
      .setOrigin(0.5);
    this.add(yearText);

    // Battle name text (below node)
    const nameText = scene.add
      .text(0, MENU_LAYOUT.TIMELINE_NAME_OFFSET_Y, data.name, {
        fontFamily: FONT_FAMILY,
        fontSize: '14px',
        color: '#ffffff',
      })
      .setOrigin(0.5);
    this.add(nameText);

    this.drawNode(false);
    this.setDepth(DEPTHS.TIMELINE);
    scene.add.existing(this);

    this.setSize(MENU_LAYOUT.TIMELINE_GLOW_RADIUS * 2, MENU_LAYOUT.TIMELINE_GLOW_RADIUS * 2);
    this.setInteractive();

    this.on('pointerover', this.onPointerOver, this);
    this.on('pointerout', this.onPointerOut, this);
    this.on('pointerdown', this.onPointerDown, this);
  }

  private drawNode(hovered: boolean): void {
    const color = hovered ? COLORS.GOLD : COLORS.GOLD_DIM;

    this.nodeGfx.clear();

    if (hovered) {
      this.nodeGfx.fillStyle(COLORS.GOLD, 0.25);
      this.nodeGfx.fillCircle(0, 0, MENU_LAYOUT.TIMELINE_GLOW_RADIUS);
    }

    this.nodeGfx.fillStyle(color, 1);
    this.nodeGfx.fillCircle(0, 0, MENU_LAYOUT.TIMELINE_NODE_RADIUS);
    this.nodeGfx.lineStyle(2, COLORS.WHITE, 0.6);
    this.nodeGfx.strokeCircle(0, 0, MENU_LAYOUT.TIMELINE_NODE_RADIUS);
  }

  private onPointerOver(): void {
    this.isHovered = true;
    this.drawNode(true);
    this.emit('node-hover-enter', this.nodeData);
  }

  private onPointerOut(): void {
    this.isHovered = false;
    this.drawNode(false);
    this.emit('node-hover-exit', this.nodeData);
  }

  private onPointerDown(): void {
    this.emit('node-click', this.nodeData);
  }

  getData(): BattleNodeData {
    return this.nodeData;
  }

  getIsHovered(): boolean {
    return this.isHovered;
  }

  destroy(fromScene?: boolean): void {
    this.off('pointerover', this.onPointerOver, this);
    this.off('pointerout', this.onPointerOut, this);
    this.off('pointerdown', this.onPointerDown, this);
    this.nodeGfx.destroy();
    super.destroy(fromScene);
  }
}
