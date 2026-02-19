import { describe, it, expect } from 'vitest';
import {
  COLORS,
  BATTLE_NODES,
  DEPTHS,
  FONT_FAMILY,
  MENU_LAYOUT,
  TEXT_STYLES,
} from '../../src/constants';

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

describe('MenuScene visual configuration', () => {
  it('should have WHITE color for title', () => {
    expect(COLORS.WHITE).toBe(0xffffff);
  });

  it('should have GOLD color for decorative elements', () => {
    expect(COLORS.GOLD).toBe(0xffd700);
  });

  it('should have UI depth higher than background', () => {
    expect(DEPTHS.UI).toBeGreaterThan(DEPTHS.BG);
    expect(DEPTHS.UI).toBeGreaterThan(DEPTHS.PANEL);
    expect(DEPTHS.UI).toBeGreaterThan(DEPTHS.DECORATIONS);
  });

  it('should have correct depth ordering', () => {
    expect(DEPTHS.BG).toBeLessThan(DEPTHS.PANEL);
    expect(DEPTHS.PANEL).toBeLessThan(DEPTHS.DECORATIONS);
    expect(DEPTHS.DECORATIONS).toBeLessThan(DEPTHS.TIMELINE);
    expect(DEPTHS.TIMELINE).toBeLessThan(DEPTHS.SPRITES);
    expect(DEPTHS.SPRITES).toBeLessThan(DEPTHS.UI);
    expect(DEPTHS.UI).toBeLessThan(DEPTHS.TOOLTIP);
    expect(DEPTHS.TOOLTIP).toBeLessThan(DEPTHS.MODAL);
    expect(DEPTHS.MODAL).toBeLessThan(DEPTHS.MODAL_CONTENT);
  });

  it('should have 3 battles with required properties', () => {
    BATTLE_NODES.forEach(node => {
      expect(node.year).toBeGreaterThan(1000);
      expect(node.name).toBeTruthy();
      expect(node.description).toBeTruthy();
    });
  });
});

describe('MENU_LAYOUT', () => {
  it('should have positive stripe height', () => {
    expect(MENU_LAYOUT.STRIPE_HEIGHT).toBeGreaterThan(0);
  });

  it('should have white stripe smaller than main stripe', () => {
    expect(MENU_LAYOUT.WHITE_STRIPE_HEIGHT).toBeLessThan(MENU_LAYOUT.STRIPE_HEIGHT);
  });

  it('should have title above subtitle', () => {
    expect(MENU_LAYOUT.TITLE_Y).toBeLessThan(MENU_LAYOUT.SUBTITLE_Y);
  });

  it('should have subtitle above decorative line', () => {
    expect(MENU_LAYOUT.SUBTITLE_Y).toBeLessThan(MENU_LAYOUT.DECO_LINE_Y);
  });

  it('should have timeline below title area', () => {
    expect(MENU_LAYOUT.TIMELINE_Y).toBeGreaterThan(MENU_LAYOUT.DECO_LINE_Y);
  });

  it('should have eagle on the right side', () => {
    expect(MENU_LAYOUT.EAGLE_X).toBeGreaterThan(640); // right half
  });

  it('should have hussar on the left side', () => {
    expect(MENU_LAYOUT.HUSSAR_X).toBeLessThan(640); // left half
  });

  it('should have font sizes as strings', () => {
    expect(MENU_LAYOUT.TITLE_FONT_SIZE).toMatch(/^\d+px$/);
    expect(MENU_LAYOUT.SUBTITLE_FONT_SIZE).toMatch(/^\d+px$/);
  });

  it('should have title font larger than subtitle font', () => {
    const titleSize = parseInt(MENU_LAYOUT.TITLE_FONT_SIZE, 10);
    const subtitleSize = parseInt(MENU_LAYOUT.SUBTITLE_FONT_SIZE, 10);
    expect(titleSize).toBeGreaterThan(subtitleSize);
  });
});

describe('MENU_LAYOUT Phase 5 additions', () => {
  it('should have SELECTED_BATTLE_Y defined', () => {
    expect(MENU_LAYOUT.SELECTED_BATTLE_Y).toBe(620);
  });

  it('should have MODAL_PANEL_WIDTH defined', () => {
    expect(MENU_LAYOUT.MODAL_PANEL_WIDTH).toBe(500);
  });

  it('should have MODAL_PANEL_HEIGHT defined', () => {
    expect(MENU_LAYOUT.MODAL_PANEL_HEIGHT).toBe(300);
  });

  it('should have selected battle text below timeline', () => {
    expect(MENU_LAYOUT.SELECTED_BATTLE_Y).toBeGreaterThan(MENU_LAYOUT.TIMELINE_Y);
  });
});

describe('TEXT_STYLES', () => {
  it('should have TITLE style with correct font family', () => {
    expect(TEXT_STYLES.TITLE.fontFamily).toContain('Courier New');
  });

  it('should have TITLE style with white color', () => {
    expect(TEXT_STYLES.TITLE.color).toBe('#ffffff');
  });

  it('should have TITLE style with red stroke', () => {
    expect(TEXT_STYLES.TITLE.stroke).toBe('#dc143c');
  });

  it('should have SUBTITLE style with red color', () => {
    expect(TEXT_STYLES.SUBTITLE.color).toBe('#dc143c');
  });

  it('should have SUBTITLE style with letter spacing', () => {
    expect(TEXT_STYLES.SUBTITLE.letterSpacing).toBeGreaterThan(0);
  });

  it('should have both styles with shadow', () => {
    expect(TEXT_STYLES.TITLE.shadow).toBeDefined();
    expect(TEXT_STYLES.SUBTITLE.shadow).toBeDefined();
  });
});
