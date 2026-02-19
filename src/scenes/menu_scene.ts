import Phaser from 'phaser';
import { COLORS, DEPTHS, MENU_LAYOUT, TEXT_STYLES, BattleNodeData } from '../constants';
import { TimelineManager } from '../ui/timeline_manager';

export class MenuScene extends Phaser.Scene {
  private bgGraphics!: Phaser.GameObjects.Graphics;
  private decorGraphics!: Phaser.GameObjects.Graphics;
  private titleGraphics!: Phaser.GameObjects.Graphics;
  private timeline?: TimelineManager;

  constructor() {
    super({ key: 'MenuScene' });
  }

  create(): void {
    const { width, height } = this.scale;

    this.createBackground(width, height);
    this.createDecorativeStripes(width, height);
    this.createTitle(width);
    this.createTimeline();

    this.events.once(Phaser.Scenes.Events.SHUTDOWN, this.onShutdown, this);
  }

  private createBackground(width: number, height: number): void {
    this.add
      .rectangle(width / 2, height / 2, width, height, COLORS.BG_BASE)
      .setDepth(DEPTHS.BG);

    this.add
      .rectangle(
        width / 2,
        height / 2,
        width - MENU_LAYOUT.PANEL_MARGIN * 2,
        height - MENU_LAYOUT.PANEL_MARGIN * 2,
        COLORS.BG_PANEL,
      )
      .setDepth(DEPTHS.PANEL);

    this.bgGraphics = this.add.graphics().setDepth(DEPTHS.PANEL);
    this.bgGraphics.lineStyle(2, COLORS.WHITE, 0.3);
    this.bgGraphics.strokeRect(
      MENU_LAYOUT.SEPARATOR_INSET,
      MENU_LAYOUT.SEPARATOR_INSET,
      width - MENU_LAYOUT.SEPARATOR_INSET * 2,
      height - MENU_LAYOUT.SEPARATOR_INSET * 2,
    );
  }

  private createDecorativeStripes(width: number, height: number): void {
    this.decorGraphics = this.add.graphics().setDepth(DEPTHS.DECORATIONS);

    this.decorGraphics.fillStyle(COLORS.RED, 0.7);
    this.decorGraphics.fillRect(0, 0, width, MENU_LAYOUT.STRIPE_HEIGHT);
    this.decorGraphics.fillRect(0, height - MENU_LAYOUT.STRIPE_HEIGHT, width, MENU_LAYOUT.STRIPE_HEIGHT);

    this.decorGraphics.fillStyle(COLORS.WHITE, 0.15);
    this.decorGraphics.fillRect(0, MENU_LAYOUT.STRIPE_HEIGHT, width, MENU_LAYOUT.WHITE_STRIPE_HEIGHT);
    this.decorGraphics.fillRect(
      0,
      height - MENU_LAYOUT.STRIPE_HEIGHT - MENU_LAYOUT.WHITE_STRIPE_HEIGHT,
      width,
      MENU_LAYOUT.WHITE_STRIPE_HEIGHT,
    );
  }

  private createTitle(width: number): void {
    this.add
      .text(width / 2, MENU_LAYOUT.TITLE_Y, 'HISTORY OF POLAND', TEXT_STYLES.TITLE)
      .setOrigin(0.5)
      .setDepth(DEPTHS.UI);

    this.add
      .text(width / 2, MENU_LAYOUT.SUBTITLE_Y, '— TOWER DEFENSE —', TEXT_STYLES.SUBTITLE)
      .setOrigin(0.5)
      .setDepth(DEPTHS.UI);

    this.titleGraphics = this.add.graphics().setDepth(DEPTHS.UI);
    this.titleGraphics.lineStyle(2, COLORS.GOLD, 0.8);
    this.titleGraphics.lineBetween(
      width / 2 - MENU_LAYOUT.DECO_LINE_HALF_WIDTH,
      MENU_LAYOUT.DECO_LINE_Y,
      width / 2 + MENU_LAYOUT.DECO_LINE_HALF_WIDTH,
      MENU_LAYOUT.DECO_LINE_Y,
    );
    this.titleGraphics.lineStyle(1, COLORS.GOLD, 0.4);
    this.titleGraphics.lineBetween(
      width / 2 - MENU_LAYOUT.DECO_LINE_OUTER_HALF_WIDTH,
      MENU_LAYOUT.DECO_LINE_Y + 4,
      width / 2 + MENU_LAYOUT.DECO_LINE_OUTER_HALF_WIDTH,
      MENU_LAYOUT.DECO_LINE_Y + 4,
    );
  }

  update(_time: number, _delta: number): void {
    const pointer = this.input.activePointer;
    if (this.timeline && pointer) {
      this.timeline.update(pointer);
    }
  }

  private createTimeline(): void {
    this.timeline = new TimelineManager(
      this,
      (data: BattleNodeData) => {
        console.log(`Battle selected: ${data.name} (${data.year})`);
      },
    );
  }

  private onShutdown(): void {
    this.bgGraphics?.destroy();
    this.decorGraphics?.destroy();
    this.titleGraphics?.destroy();
    this.timeline?.destroy();
  }
}
