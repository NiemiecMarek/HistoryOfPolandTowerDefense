export const COLORS = {
  BG_BASE: 0x0a0a14,
  BG_PANEL: 0x1a1a2e,
  RED: 0xdc143c,
  WHITE: 0xffffff,
  GOLD: 0xffd700,
  GOLD_DIM: 0x8b6914,
  DARK_WOOD: 0x4a3520,
  TOOLTIP_BG: 0x0d0d1a,
  MODAL_OVERLAY: 0x000000,
} as const;

export const DEPTHS = {
  BG: 0,
  PANEL: 1,
  DECORATIONS: 2,
  TIMELINE: 3,
  SPRITES: 4,
  UI: 5,
  TOOLTIP: 6,
  MODAL: 7,
  MODAL_CONTENT: 8,
} as const;

export const FONT_FAMILY = '"Courier New", Courier, monospace';

export interface BattleNodeData {
  year: number;
  name: string;
  description: string;
}

export const BATTLE_NODES: BattleNodeData[] = [
  {
    year: 1410,
    name: 'Grunwald',
    description: 'Bitwa pod Grunwaldem - wielka wiktorya nad Krzyżakami',
  },
  {
    year: 1655,
    name: 'Częstochowa',
    description: 'Obrona Jasnej Góry - cud nad Wisłą',
  },
  {
    year: 1683,
    name: 'Wiedeń',
    description: 'Odsiecz Wiedeńska - Jan III Sobieski ratuje Europę',
  },
];

export const MENU_LAYOUT = {
  // Stripe dimensions (Polish flag)
  STRIPE_HEIGHT: 48,
  WHITE_STRIPE_HEIGHT: 24,

  // Panel geometry
  PANEL_MARGIN: 40,
  SEPARATOR_INSET: 56, // 40 + 16

  // Title positioning
  TITLE_Y: 140,
  SUBTITLE_Y: 220,
  DECO_LINE_Y: 248,
  DECO_LINE_HALF_WIDTH: 200,
  DECO_LINE_OUTER_HALF_WIDTH: 300,

  // Font sizes
  TITLE_FONT_SIZE: '64px',
  SUBTITLE_FONT_SIZE: '28px',

  // Vertical layout zones for Phase 3-5
  TIMELINE_Y: 450,
  TIMELINE_PADDING_X: 120,
  EAGLE_X: 1100,
  HUSSAR_X: 180,
  SPRITES_Y: 520,

  // Timeline node geometry
  TIMELINE_NODE_RADIUS: 14,
  TIMELINE_GLOW_RADIUS: 20,
  TIMELINE_YEAR_OFFSET_Y: -36,
  TIMELINE_NAME_OFFSET_Y: 28,
  TIMELINE_TRACK_HEIGHT: 4,
  TIMELINE_TOOLTIP_PADDING: 10,
  TIMELINE_TOOLTIP_OFFSET_Y: -60,

  // Selected battle text
  SELECTED_BATTLE_Y: 620,

  // Battle modal geometry
  MODAL_PANEL_WIDTH: 500,
  MODAL_PANEL_HEIGHT: 300,
  MODAL_TITLE_OFFSET_Y: -80,
  MODAL_YEAR_OFFSET_Y: -40,
  MODAL_DESC_OFFSET_Y: 10,
  MODAL_CLOSE_OFFSET_Y: 80,
  MODAL_DESC_WORD_WRAP_WIDTH: 450,
} as const;

export const TEXT_STYLES = {
  TITLE: {
    fontFamily: FONT_FAMILY,
    fontSize: MENU_LAYOUT.TITLE_FONT_SIZE,
    color: '#ffffff',
    stroke: '#dc143c',
    strokeThickness: 4,
    shadow: {
      offsetX: 3,
      offsetY: 3,
      color: '#000000',
      blur: 8,
      fill: true,
    },
  },
  SUBTITLE: {
    fontFamily: FONT_FAMILY,
    fontSize: MENU_LAYOUT.SUBTITLE_FONT_SIZE,
    color: '#dc143c',
    letterSpacing: 8,
    shadow: {
      offsetX: 2,
      offsetY: 2,
      color: '#000000',
      blur: 4,
      fill: true,
    },
  },
} as const;
