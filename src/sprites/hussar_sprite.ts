import Phaser from 'phaser';

const FRAME_WIDTH = 120;
const FRAME_HEIGHT = 140;
const FRAMES = 8;
const ANIM_KEY = 'hussar-gallop';

/**
 * Pure function - draws one animation frame of the Hussar onto a Graphics object.
 * Testable without a running Phaser instance.
 * @param gfx - Phaser.GameObjects.Graphics to draw on
 * @param frameIndex - 0..7 animation frame
 */
export function drawHussarFrame(gfx: Phaser.GameObjects.Graphics, frameIndex: number): void {
  gfx.clear();

  const t = frameIndex / (FRAMES - 1); // 0..1
  const legSway = Math.sin(t * Math.PI * 2); // -1..1 cycle
  const wingY = Math.sin(t * Math.PI * 2) * 4; // wing bob

  // --- Horse body ---
  gfx.fillStyle(0x8b4513, 1); // saddle brown
  gfx.fillEllipse(60, 100, 70, 35);

  // --- Horse head ---
  gfx.fillStyle(0x8b4513, 1);
  gfx.fillRect(84, 72, 22, 18);
  gfx.fillRect(92, 62, 14, 14);

  // --- Horse legs (4 legs, sway with frameIndex) ---
  gfx.fillStyle(0x7a3b10, 1);
  const legOffset = legSway * 6;
  gfx.fillRect(35 + legOffset, 112, 8, 24);
  gfx.fillRect(48 - legOffset, 112, 8, 24);
  gfx.fillRect(65 + legOffset, 112, 8, 24);
  gfx.fillRect(78 - legOffset, 112, 8, 24);

  // --- Hussar body (red coat) ---
  gfx.fillStyle(0xdc143c, 1);
  gfx.fillRect(44, 50, 28, 40);

  // --- Breastplate (silver) ---
  gfx.fillStyle(0xc0c0c0, 1);
  gfx.fillRect(47, 52, 22, 28);

  // --- Head/helmet ---
  gfx.fillStyle(0xc0c0c0, 1);
  gfx.fillCircle(58, 40, 12);
  gfx.fillStyle(0x8b0000, 1); // dark red crest
  gfx.fillRect(54, 28, 8, 10);

  // --- Wings (feathers, 5 per side with bob) ---
  gfx.fillStyle(0xf5deb3, 1); // wheat/feather color
  for (let i = 0; i < 5; i++) {
    const wy = 45 + i * 8 + wingY;
    gfx.fillRect(24 - i * 2, wy, 4, 18);
    gfx.fillRect(88 + i * 2, wy, 4, 18);
  }

  // --- Lance ---
  gfx.fillStyle(0xdaa520, 1); // goldenrod
  gfx.fillRect(78, 20, 3, 60);

  // --- Red cape ---
  gfx.fillStyle(0xdc143c, 0.8);
  gfx.fillRect(36, 55, 10, 30);
}

/**
 * Generates 8 RenderTextures (hussar-frame-0 .. hussar-frame-7)
 * and registers the 'hussar-gallop' animation.
 * Call from BootScene.create() before starting MenuScene.
 */
export function generateHussarTextures(scene: Phaser.Scene): void {
  const gfx = scene.add.graphics();

  for (let i = 0; i < FRAMES; i++) {
    const key = `hussar-frame-${i}`;
    if (scene.textures.exists(key)) continue;

    const rt = scene.add.renderTexture(0, 0, FRAME_WIDTH, FRAME_HEIGHT);
    drawHussarFrame(gfx, i);
    rt.draw(gfx, 0, 0);
    rt.saveTexture(key);
    rt.destroy();
  }

  gfx.destroy();

  // Register animation if not already registered
  if (!scene.anims.exists(ANIM_KEY)) {
    scene.anims.create({
      key: ANIM_KEY,
      frames: Array.from({ length: FRAMES }, (_, i) => ({
        key: `hussar-frame-${i}`,
      })),
      frameRate: 12,
      repeat: -1,
    });
  }
}

export { FRAME_WIDTH, FRAME_HEIGHT, FRAMES, ANIM_KEY };
