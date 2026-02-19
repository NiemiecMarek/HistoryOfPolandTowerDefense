import { describe, it, expect } from 'vitest';
import { COLORS, DEPTHS, MENU_LAYOUT, BattleNodeData } from '../../src/constants';

describe('BattleModal constants', () => {
  it('should have MODAL depth lower than MODAL_CONTENT', () => {
    expect(DEPTHS.MODAL).toBeLessThan(DEPTHS.MODAL_CONTENT);
  });

  it('should have MODAL depth higher than TOOLTIP', () => {
    expect(DEPTHS.MODAL).toBeGreaterThan(DEPTHS.TOOLTIP);
  });

  it('should have MODAL_OVERLAY color defined', () => {
    expect(COLORS.MODAL_OVERLAY).toBe(0x000000);
  });

  it('should have modal panel dimensions defined', () => {
    expect(MENU_LAYOUT.MODAL_PANEL_WIDTH).toBe(500);
    expect(MENU_LAYOUT.MODAL_PANEL_HEIGHT).toBe(300);
  });

  it('should have modal content offsets defined', () => {
    expect(MENU_LAYOUT.MODAL_TITLE_OFFSET_Y).toBe(-80);
    expect(MENU_LAYOUT.MODAL_YEAR_OFFSET_Y).toBe(-40);
    expect(MENU_LAYOUT.MODAL_DESC_OFFSET_Y).toBe(10);
    expect(MENU_LAYOUT.MODAL_CLOSE_OFFSET_Y).toBe(80);
  });

  it('should have title above year in modal layout', () => {
    expect(MENU_LAYOUT.MODAL_TITLE_OFFSET_Y).toBeLessThan(MENU_LAYOUT.MODAL_YEAR_OFFSET_Y);
  });

  it('should have close button below description in modal layout', () => {
    expect(MENU_LAYOUT.MODAL_CLOSE_OFFSET_Y).toBeGreaterThan(MENU_LAYOUT.MODAL_DESC_OFFSET_Y);
  });
});

describe('BattleModal data contract', () => {
  it('should accept BattleNodeData with name, year, and description', () => {
    const data: BattleNodeData = {
      name: 'Grunwald',
      year: 1410,
      description: 'Bitwa pod Grunwaldem',
    };
    expect(data.name).toBe('Grunwald');
    expect(data.year).toBe(1410);
    expect(data.description).toBe('Bitwa pod Grunwaldem');
  });

  it('should use BG_PANEL color for modal panel background', () => {
    expect(COLORS.BG_PANEL).toBe(0x1a1a2e);
  });
});
