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

### Magic Numbers
- Hard-coded pixel coordinates scattered (56, 80, 112, 48, 72, 200, 300, etc.)
- Should extract to MENU_LAYOUT constant for maintainability
- Affects tweaking UI layout later

## Testing Insights
- Tests focus on constant validation (good baseline)
- No runtime/integration tests for scene lifecycle yet
- Timeline component (Phase 3) will need more thorough scene transition testing

## Phase 3 Review Findings (Timeline Component)

### Critical Issues Identified
1. **Event Listener Memory Leak**: TimelineManager registers node listeners in buildTimeline() but never removes them in destroy(). Orphaned listeners persist across scene transitions.
   - Fix: Store listener refs in Map, remove before node.destroy()

2. **Update Loop Performance Waste**: Tooltip width calculated every frame (60x/sec) even when text unchanged.
   - Fix: Cache width in showTooltip(), use cached value in update()

3. **Type Safety Gap**: Optional callback not validated, silent failures possible
   - Fix: Validate callback is function or null

4. **Graphics Cleanup Chain Incomplete**: trackGfx not added to container, could leak if scene transitions before destroy()
   - Fix: Force destroy all graphics objects explicitly

### Architecture Patterns (Phase 3 Confirmed)
- Event-driven: TimelineNode emits, TimelineManager consumes (clean)
- Container hierarchy: proper setDepth, setInteractive for hit detection
- Graphics per-node: 2x graphics per node acceptable for 3 battles, but watch scaling

### Testing Gap
- No integration tests for scene lifecycle
- No runtime tests for listener cleanup
- Good constant validation baseline

## Next Phases to Prepare
- **Phase 4**: Sprite animation - RenderTexture pre-generation for Hussar (already planned)
- **Phase 5**: Modal interactions - test scene lifecycle with repeated transitions
- Watch: More battles = more Graphics objects, may need batching consolidation

## Code Review Standards Applied
- TypeScript strict mode compliance (noUncheckedIndexedAccess)
- Phaser 3 scene lifecycle best practices
- Memory leak prevention for graphics objects
- Type safety for DOM integration
- Update loop performance (eliminate redundant calculations)
