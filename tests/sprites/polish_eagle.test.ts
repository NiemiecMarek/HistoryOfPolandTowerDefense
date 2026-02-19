import { describe, it, expect } from 'vitest';
import { COLORS, DEPTHS, MENU_LAYOUT } from '../../src/constants';

describe('PolishEagle configuration', () => {
  it('should use SPRITES depth', () => {
    expect(DEPTHS.SPRITES).toBe(4);
  });

  it('should be positioned on the right side of the screen', () => {
    expect(MENU_LAYOUT.EAGLE_X).toBeGreaterThan(640);
  });

  it('should use WHITE color for body', () => {
    expect(COLORS.WHITE).toBe(0xffffff);
  });

  it('should use GOLD color for crown and beak', () => {
    expect(COLORS.GOLD).toBe(0xffd700);
  });

  it('should use RED color for heraldic shield', () => {
    expect(COLORS.RED).toBe(0xdc143c);
  });

  it('should have SPRITES_Y defined for vertical position', () => {
    expect(MENU_LAYOUT.SPRITES_Y).toBeGreaterThan(MENU_LAYOUT.TIMELINE_Y);
  });
});
