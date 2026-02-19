# Code Quality Review - Persistent Memory

## Project Context
- **Project**: History of Poland Tower Defense (Phaser 3 + TypeScript + Vite)
- **Stack**: Phaser 3, TypeScript (strict mode), Vite, Vitest
- **Target**: 1280x720, 60 FPS, pixel art rendering
- **Key Files**: src/scenes/, src/constants.ts, src/config.ts

## Recurring Issues to Watch

### Graphics Management Pattern
- **Issue**: Graphics objects created in `create()` but never destroyed → memory leaks on scene transitions
- **Pattern**: MenuScene creates 3 graphics objects that persist after shutdown
- **Solution**: Store as scene properties, destroy in `shutdown` event handler
- **Related**: Scene lifecycle management critical for repeated scene transitions (common in tower defense UI)

### Scene Lifecycle Gaps
- **Issue**: No explicit cleanup handlers - Graphics persist when scene reloads (wake event)
- **Fix Pattern**:
  ```typescript
  constructor() {
    super({ key: 'SceneName' });
    this.events.on('shutdown', () => this.cleanup());
    this.events.on('wake', () => this.create());
  }
  ```

### Type Safety in Config
- **Issue**: `parent: document.body` bypasses type checking, can be null
- **Fix**: Use document.getElementById('game') with type assertion OR use string selector

## Architecture Patterns (Confirmed)

### Constants Organization
- Well-structured in constants.ts: COLORS, DEPTHS, FONT_FAMILY, BATTLE_NODES
- Uses `as const` for strict TypeScript inference (good practice)
- Depth system well-designed with semantic ordering (BG→PANEL→DECORATIONS→UI→MODAL)

### Scene Naming Conventions
- Files: snake_case (menu_scene.ts, boot_scene.ts)
- Classes: PascalCase (MenuScene, BootScene)
- Keys: Match class names ('MenuScene')

### Phaser 3 Config
- `pixelArt: true` + `antialias: false` for pixel art rendering
- Standard 1280x720 resolution maintained across project

## Performance Patterns to Monitor

### Graphics Object Consolidation
- Multiple small Graphics objects → consider batching into single Graphics
- Static backgrounds → could use RenderTexture instead for complex scenes
- Frame budget consideration: Each Graphics = separate draw call

### Particle Emitter Configuration (Phase 5)
- frequency: 100ms = 10 particles/sec at quantity 2 = 20 total/sec
- lifespan: 4000-8000ms = max ~160 active particles on screen
- Performance impact: Minimal at 60 FPS target (well within budget)
- Texture generation: Properly destroyed after use (no leak)

### Magic Numbers
- Hard-coded pixel coordinates scattered (56, 80, 112, 48, 72, 200, 300, etc.)
- Should extract to MENU_LAYOUT constant for maintainability
- Affects tweaking UI layout later

## Testing Insights
- Tests focus on constant validation (good baseline)
- No runtime/integration tests for scene lifecycle yet
- Timeline component (Phase 3) will need more thorough scene transition testing

## Phase 3 Review Findings (Timeline Component - NOW VERIFIED FIXED)

### Previously Flagged Issues (RESOLVED in Phase 5)
1. **Event Listener Memory Leak**: FIXED - TimelineManager.destroy() properly removes all listeners via Map
2. **Update Loop Performance Waste**: FIXED - cachedTooltipWidth cached in showTooltip()
3. **Graphics Cleanup Chain**: FIXED - All graphics properly destroyed in onShutdown()

### Architecture Patterns (Phase 3 Confirmed)
- Event-driven: TimelineNode emits, TimelineManager consumes (clean)
- Container hierarchy: proper setDepth, setInteractive for hit detection
- Graphics per-node: 2x graphics per node acceptable for 3 battles, but watch scaling

## Phase 5 Review Findings (Polish & UX - Modal Component)

### Critical Issues Found: NONE
- All graphics objects properly managed (destroy in onShutdown)
- Modal properly registers/unregisters ESC key listener
- Particle emitter texture generation clean and efficient
- TypeScript strict mode fully compliant
- Type safety for all DOM operations

### Performance Notes (Phase 5)
- ParticleEmitter config efficient: 20 particles/sec, lifespan 4-8s = ~160 active max
- Scene lifecycle: Uses events.once(SHUTDOWN) pattern correctly
- Texture management: white-particle texture generated and destroyed same frame
- Update loop: Hussar bob animation efficient sin() calculation per frame (minimal cost)

### Architecture Decisions Confirmed
- BattleModal extends Container: proper Phaser pattern
- Scene integration: modal created on timeline node click
- ESC key cleanup: properly deregistered in destroy()
- Overlay click absorption: intentional pattern to block behind-modal clicks

## Code Review Standards Applied
- TypeScript strict mode compliance (noUncheckedIndexedAccess)
- Phaser 3 scene lifecycle best practices (SHUTDOWN event pattern)
- Memory leak prevention for graphics objects (ALL destroyed)
- Type safety for DOM integration (keyboard optional chaining)
- Update loop performance (cached tooltip width, efficient sin calculations)
- Particle efficiency (minimal active particles, proper texture cleanup)

## Next Phases Preparation
- Phase 6: Game scene implementation
- Watch: Scaled particle effects, multiple emitters
- Consider: Object pooling for bullet/tower sprites
- Monitor: Physics body cleanup on sprite destruction
