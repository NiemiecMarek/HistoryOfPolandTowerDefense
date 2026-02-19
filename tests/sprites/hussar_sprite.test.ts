import { describe, it, expect, vi, beforeEach } from 'vitest';
import { drawHussarFrame, FRAME_WIDTH, FRAME_HEIGHT, FRAMES, ANIM_KEY } from '../../src/sprites/hussar_sprite';

describe('drawHussarFrame', () => {
  let mockGfx: {
    clear: ReturnType<typeof vi.fn>;
    fillStyle: ReturnType<typeof vi.fn>;
    fillRect: ReturnType<typeof vi.fn>;
    fillEllipse: ReturnType<typeof vi.fn>;
    fillCircle: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    mockGfx = {
      clear: vi.fn(),
      fillStyle: vi.fn(),
      fillRect: vi.fn(),
      fillEllipse: vi.fn(),
      fillCircle: vi.fn(),
    };
  });

  it('should call clear() on every frame', () => {
    for (let i = 0; i < FRAMES; i++) {
      drawHussarFrame(mockGfx as unknown as Phaser.GameObjects.Graphics, i);
      expect(mockGfx.clear).toHaveBeenCalled();
      mockGfx.clear.mockClear();
    }
  });

  it('should not throw for frameIndex 0', () => {
    expect(() => drawHussarFrame(mockGfx as unknown as Phaser.GameObjects.Graphics, 0)).not.toThrow();
  });

  it('should not throw for frameIndex 7 (last frame)', () => {
    expect(() => drawHussarFrame(mockGfx as unknown as Phaser.GameObjects.Graphics, 7)).not.toThrow();
  });

  it('should not throw for all 8 frame indices', () => {
    for (let i = 0; i < FRAMES; i++) {
      expect(() => drawHussarFrame(mockGfx as unknown as Phaser.GameObjects.Graphics, i)).not.toThrow();
    }
  });

  it('should call fillRect at least once per frame (legs, body)', () => {
    drawHussarFrame(mockGfx as unknown as Phaser.GameObjects.Graphics, 0);
    expect(mockGfx.fillRect).toHaveBeenCalled();
  });

  it('should call fillStyle at least once per frame', () => {
    drawHussarFrame(mockGfx as unknown as Phaser.GameObjects.Graphics, 0);
    expect(mockGfx.fillStyle).toHaveBeenCalled();
  });
});

describe('Hussar sprite constants', () => {
  it('should have FRAME_WIDTH of 120', () => {
    expect(FRAME_WIDTH).toBe(120);
  });

  it('should have FRAME_HEIGHT of 140', () => {
    expect(FRAME_HEIGHT).toBe(140);
  });

  it('should have 8 frames', () => {
    expect(FRAMES).toBe(8);
  });

  it('should have correct animation key', () => {
    expect(ANIM_KEY).toBe('hussar-gallop');
  });
});
