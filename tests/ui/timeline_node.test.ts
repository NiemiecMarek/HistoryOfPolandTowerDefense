import { describe, it, expect } from 'vitest';
import { BATTLE_NODES, COLORS, DEPTHS } from '../../src/constants';

describe('TimelineNode data', () => {
  it('should have Grunwald battle data', () => {
    const data = BATTLE_NODES[0]!;
    expect(data.year).toBe(1410);
    expect(data.name).toBe('Grunwald');
    expect(data.description).toBeTruthy();
  });

  it('should have Częstochowa battle data', () => {
    const data = BATTLE_NODES[1]!;
    expect(data.year).toBe(1655);
    expect(data.name).toBe('Częstochowa');
  });

  it('should have Wiedeń battle data', () => {
    const data = BATTLE_NODES[2]!;
    expect(data.year).toBe(1683);
    expect(data.name).toBe('Wiedeń');
  });

  it('should use GOLD_DIM color for default state', () => {
    expect(COLORS.GOLD_DIM).toBe(0x8b6914);
  });

  it('should use GOLD color for hovered state', () => {
    expect(COLORS.GOLD).toBe(0xffd700);
  });

  it('should use TIMELINE depth', () => {
    expect(DEPTHS.TIMELINE).toBe(3);
  });

  it('should use TOOLTIP depth for tooltip', () => {
    expect(DEPTHS.TOOLTIP).toBe(6);
  });
});

describe('TimelineNode layout values', () => {
  it('should have all required battle fields', () => {
    BATTLE_NODES.forEach(node => {
      expect(typeof node.year).toBe('number');
      expect(typeof node.name).toBe('string');
      expect(typeof node.description).toBe('string');
      expect(node.name.length).toBeGreaterThan(0);
      expect(node.description.length).toBeGreaterThan(0);
    });
  });
});
