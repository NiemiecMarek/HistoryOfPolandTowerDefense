import Phaser from 'phaser';
import { COLORS, DEPTHS, FONT_FAMILY, BATTLE_NODES, BattleNodeData, MENU_LAYOUT } from '../constants';
import { TimelineNode } from './timeline_node';

type NodeListeners = {
  hoverEnter: (data: BattleNodeData) => void;
  hoverExit: () => void;
  click: (data: BattleNodeData) => void;
};

export class TimelineManager {
  private readonly scene: Phaser.Scene;
  private readonly nodes: TimelineNode[] = [];
  private readonly nodeListeners = new Map<TimelineNode, NodeListeners>();
  private trackGfx: Phaser.GameObjects.Graphics;
  private tooltipContainer: Phaser.GameObjects.Container;
  private tooltipBg: Phaser.GameObjects.Graphics;
  private tooltipText: Phaser.GameObjects.Text;
  private cachedTooltipWidth: number = 0;
  private onNodeClickCallback?: (data: BattleNodeData) => void;

  constructor(scene: Phaser.Scene, onNodeClick?: (data: BattleNodeData) => void) {
    this.scene = scene;
    this.onNodeClickCallback = onNodeClick;

    this.trackGfx = scene.add.graphics().setDepth(DEPTHS.TIMELINE);
    this.tooltipContainer = scene.add.container(0, 0).setDepth(DEPTHS.TOOLTIP).setVisible(false);
    this.tooltipBg = scene.add.graphics();
    this.tooltipText = scene.add.text(
      MENU_LAYOUT.TIMELINE_TOOLTIP_PADDING,
      MENU_LAYOUT.TIMELINE_TOOLTIP_PADDING,
      '',
      {
        fontFamily: FONT_FAMILY,
        fontSize: '13px',
        color: '#ffd700',
      },
    );
    this.tooltipContainer.add([this.tooltipBg, this.tooltipText]);

    this.buildTimeline();
  }

  private buildTimeline(): void {
    const { width } = this.scene.scale;
    const y = MENU_LAYOUT.TIMELINE_Y;
    const xStart = MENU_LAYOUT.TIMELINE_PADDING_X;
    const xEnd = width - MENU_LAYOUT.TIMELINE_PADDING_X;
    const trackH = MENU_LAYOUT.TIMELINE_TRACK_HEIGHT;

    // Draw track bar
    this.trackGfx.fillStyle(COLORS.DARK_WOOD, 1);
    this.trackGfx.fillRect(xStart, y - trackH / 2, xEnd - xStart, trackH);
    this.trackGfx.lineStyle(1, COLORS.GOLD, 0.4);
    this.trackGfx.strokeRect(xStart, y - trackH / 2, xEnd - xStart, trackH);

    // Place nodes evenly along the track
    const total = BATTLE_NODES.length;
    BATTLE_NODES.forEach((battle, index) => {
      const t = total > 1 ? index / (total - 1) : 0.5;
      const x = xStart + t * (xEnd - xStart);
      const node = new TimelineNode(this.scene, x, y, battle);

      const listeners: NodeListeners = {
        hoverEnter: (data: BattleNodeData) => this.showTooltip(data),
        hoverExit: () => this.hideTooltip(),
        click: (data: BattleNodeData) => this.onNodeClickCallback?.(data),
      };

      node.on('node-hover-enter', listeners.hoverEnter);
      node.on('node-hover-exit', listeners.hoverExit);
      node.on('node-click', listeners.click);

      this.nodeListeners.set(node, listeners);
      this.nodes.push(node);
    });
  }

  private showTooltip(data: BattleNodeData): void {
    this.tooltipText.setText(data.description);

    const textWidth = this.tooltipText.width;
    const textHeight = this.tooltipText.height;
    const pad = MENU_LAYOUT.TIMELINE_TOOLTIP_PADDING;
    this.cachedTooltipWidth = textWidth + pad * 2;
    const bgHeight = textHeight + pad * 2;

    this.tooltipBg.clear();
    this.tooltipBg.fillStyle(COLORS.TOOLTIP_BG, 0.92);
    this.tooltipBg.fillRoundedRect(0, 0, this.cachedTooltipWidth, bgHeight, 4);
    this.tooltipBg.lineStyle(1, COLORS.GOLD, 0.6);
    this.tooltipBg.strokeRoundedRect(0, 0, this.cachedTooltipWidth, bgHeight, 4);

    this.tooltipContainer.setVisible(true);
  }

  private hideTooltip(): void {
    this.tooltipContainer.setVisible(false);
  }

  update(pointer: Phaser.Input.Pointer): void {
    if (this.tooltipContainer.visible) {
      const { width } = this.scene.scale;
      let tx = pointer.x - this.cachedTooltipWidth / 2;
      tx = Phaser.Math.Clamp(tx, 8, width - this.cachedTooltipWidth - 8);
      this.tooltipContainer.setPosition(tx, pointer.y + MENU_LAYOUT.TIMELINE_TOOLTIP_OFFSET_Y);
    }
  }

  getNodeCount(): number {
    return this.nodes.length;
  }

  getNodeData(): BattleNodeData[] {
    return this.nodes.map(n => n.getData());
  }

  destroy(): void {
    this.nodes.forEach(node => {
      const listeners = this.nodeListeners.get(node);
      if (listeners) {
        node.off('node-hover-enter', listeners.hoverEnter);
        node.off('node-hover-exit', listeners.hoverExit);
        node.off('node-click', listeners.click);
      }
      node.destroy();
    });
    this.nodeListeners.clear();
    this.nodes.length = 0;
    this.trackGfx.destroy();
    this.tooltipContainer.destroy();
  }
}
