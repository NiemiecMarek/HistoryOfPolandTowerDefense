import { describe, it, expect, vi } from 'vitest';
import { BATTLE_NODES, MENU_LAYOUT, COLORS } from '../../src/constants';

describe('TimelineManager node configuration', () => {
  it('should have 3 nodes from BATTLE_NODES', () => {
    expect(BATTLE_NODES).toHaveLength(3);
  });

  it('should order battles chronologically: 1410 -> 1655 -> 1683', () => {
    const years = BATTLE_NODES.map(n => n.year);
    expect(years).toEqual([1410, 1655, 1683]);
  });

  it('should use MENU_LAYOUT for timeline Y position', () => {
    expect(MENU_LAYOUT.TIMELINE_Y).toBe(450);
  });

  it('should use MENU_LAYOUT for horizontal padding', () => {
    expect(MENU_LAYOUT.TIMELINE_PADDING_X).toBe(120);
  });

  it('should use DARK_WOOD color for track bar', () => {
    expect(COLORS.DARK_WOOD).toBe(0x4a3520);
  });

  it('should use TOOLTIP_BG color for tooltip background', () => {
    expect(COLORS.TOOLTIP_BG).toBe(0x0d0d1a);
  });
});

describe('TimelineManager layout calculations', () => {
  it('should calculate correct t values for 3 nodes', () => {
    const total = BATTLE_NODES.length;
    const tValues = BATTLE_NODES.map((_, index) => index / (total - 1));
    expect(tValues[0]).toBe(0);
    expect(tValues[1]).toBeCloseTo(0.5);
    expect(tValues[2]).toBe(1);
  });

  it('should spread nodes across the track width', () => {
    const width = 1280;
    const xStart = MENU_LAYOUT.TIMELINE_PADDING_X;
    const xEnd = width - MENU_LAYOUT.TIMELINE_PADDING_X;
    const total = BATTLE_NODES.length;

    const positions = BATTLE_NODES.map((_, index) => {
      const t = index / (total - 1);
      return xStart + t * (xEnd - xStart);
    });

    expect(positions[0]).toBe(xStart);
    expect(positions[2]).toBe(xEnd);
    expect(positions[1]!).toBeCloseTo((xStart + xEnd) / 2);
  });

  it('should trigger callback when node clicked', () => {
    const callback = vi.fn();
    const battleData = BATTLE_NODES[0]!;
    callback(battleData);
    expect(callback).toHaveBeenCalledWith(battleData);
    expect(callback).toHaveBeenCalledTimes(1);
  });
});
