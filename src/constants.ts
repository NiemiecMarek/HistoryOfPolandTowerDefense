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
