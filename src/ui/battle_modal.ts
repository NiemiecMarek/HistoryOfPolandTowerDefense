import Phaser from 'phaser';
import { COLORS, DEPTHS, FONT_FAMILY, MENU_LAYOUT, BattleNodeData } from '../constants';

/**
 * Full-screen modal displaying battle details.
 * Shows a semi-transparent overlay with a centered panel containing
 * battle name, year, description, and a close button.
 * Closes on CLOSE click or ESC key press.
 */
export class BattleModal extends Phaser.GameObjects.Container {
  private overlay: Phaser.GameObjects.Rectangle;
  private panel: Phaser.GameObjects.Rectangle;
  private escKey?: Phaser.Input.Keyboard.Key;

  constructor(scene: Phaser.Scene, data: BattleNodeData) {
    const { width, height } = scene.scale;
    super(scene, 0, 0);

    // Full-screen semi-transparent overlay
    this.overlay = scene.add
      .rectangle(width / 2, height / 2, width, height, COLORS.MODAL_OVERLAY, 0.75)
      .setDepth(DEPTHS.MODAL)
      .setInteractive();

    // Block clicks from reaching elements behind the overlay
    this.overlay.on('pointerdown', () => {
      /* intentionally empty - absorb clicks */
    });

    // Central panel
    this.panel = scene.add
      .rectangle(
        width / 2,
        height / 2,
        MENU_LAYOUT.MODAL_PANEL_WIDTH,
        MENU_LAYOUT.MODAL_PANEL_HEIGHT,
        COLORS.BG_PANEL,
      )
      .setDepth(DEPTHS.MODAL_CONTENT);

    const centerX = width / 2;
    const centerY = height / 2;

    // Battle name (title)
    const titleText = scene.add
      .text(centerX, centerY + MENU_LAYOUT.MODAL_TITLE_OFFSET_Y, data.name, {
        fontFamily: FONT_FAMILY,
        fontSize: '32px',
        color: '#ffd700',
      })
      .setOrigin(0.5)
      .setDepth(DEPTHS.MODAL_CONTENT);

    // Year (subtitle)
    const yearText = scene.add
      .text(centerX, centerY + MENU_LAYOUT.MODAL_YEAR_OFFSET_Y, String(data.year), {
        fontFamily: FONT_FAMILY,
        fontSize: '20px',
        color: '#ffffff',
      })
      .setOrigin(0.5)
      .setDepth(DEPTHS.MODAL_CONTENT);

    // Description
    const descText = scene.add
      .text(centerX, centerY + MENU_LAYOUT.MODAL_DESC_OFFSET_Y, data.description, {
        fontFamily: FONT_FAMILY,
        fontSize: '16px',
        color: '#ffffff',
        wordWrap: { width: MENU_LAYOUT.MODAL_DESC_WORD_WRAP_WIDTH },
        align: 'center',
      })
      .setOrigin(0.5)
      .setDepth(DEPTHS.MODAL_CONTENT);

    // Close button
    const closeButton = scene.add
      .text(centerX, centerY + MENU_LAYOUT.MODAL_CLOSE_OFFSET_Y, '[ CLOSE ]', {
        fontFamily: FONT_FAMILY,
        fontSize: '20px',
        color: '#dc143c',
      })
      .setOrigin(0.5)
      .setDepth(DEPTHS.MODAL_CONTENT)
      .setInteractive({ useHandCursor: true });

    closeButton.on('pointerdown', () => this.destroy());

    this.add([this.overlay, this.panel, titleText, yearText, descText, closeButton]);
    this.setDepth(DEPTHS.MODAL);
    scene.add.existing(this);

    // ESC key to close
    if (scene.input.keyboard) {
      this.escKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
      this.escKey.on('down', this.onEscDown, this);
    }
  }

  private onEscDown(): void {
    this.destroy();
  }

  destroy(fromScene?: boolean): void {
    // Clean up ESC listener before destroying
    if (this.escKey) {
      this.escKey.off('down', this.onEscDown, this);
      this.escKey = undefined;
    }
    this.overlay?.destroy();
    this.panel?.destroy();
    super.destroy(fromScene);
  }
}
