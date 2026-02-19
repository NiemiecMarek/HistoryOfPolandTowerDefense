import { describe, it, expect } from 'vitest';
import { COLORS, BATTLE_NODES, DEPTHS, FONT_FAMILY } from '../../src/constants';

describe('MenuScene constants', () => {
  it('should have correct background color', () => {
    expect(COLORS.BG_BASE).toBe(0x0a0a14);
  });

  it('should have correct panel color', () => {
    expect(COLORS.BG_PANEL).toBe(0x1a1a2e);
  });

  it('should have correct red color for Polish flag', () => {
    expect(COLORS.RED).toBe(0xdc143c);
  });

  it('should have 3 battle nodes', () => {
    expect(BATTLE_NODES).toHaveLength(3);
  });

  it('should have battles in chronological order', () => {
    const years = BATTLE_NODES.map(n => n.year);
    for (let i = 1; i < years.length; i++) {
      expect(years[i]!).toBeGreaterThan(years[i - 1]!);
    }
  });

  it('should have Grunwald 1410 as first battle', () => {
    expect(BATTLE_NODES[0]!.year).toBe(1410);
    expect(BATTLE_NODES[0]!.name).toBe('Grunwald');
  });

  it('should have correct depth values', () => {
    expect(DEPTHS.BG).toBe(0);
    expect(DEPTHS.MODAL).toBe(7);
  });

  it('should have FONT_FAMILY defined', () => {
    expect(FONT_FAMILY).toContain('Courier New');
  });
});
