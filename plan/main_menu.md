# Plan: Main Menu - History of Poland Tower Defense

## Context
Tworzymy grę tower defense "History of Poland - Tower Defense" od zera. Projekt ma pustą strukturę (brak package.json, src/, itp.). Pierwszym krokiem jest zbudowanie głównego menu w stylu pixel art z osią czasu historycznych bitew polskich. Menu musi być atrakcyjne wizualnie (pixel art, symbole polskie) i skalowalne do 10 punktów na osi czasu.

**Stack**: Phaser 3 + TypeScript + Vite + Vitest
**Rozdzielczość**: 1280×720
**Styl**: Pixel Art generowany proceduralnie (Phaser Graphics API, bez zewnętrznych plików graficznych)
**Bitwy**: Grunwald 1410 / Częstochowa 1655 / Wiedeń 1683

---

## Struktura plików

```
HistoryOfPolandTowerDefense/
├── plan/
│   └── main_menu.md                  ← kopia tego planu (per CLAUDE.md)
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── vitest.config.ts
├── src/
│   ├── main.ts                       ← entry point
│   ├── config.ts                     ← phaserConfig (pixelArt: true, 1280x720)
│   ├── constants.ts                  ← COLORS, DEPTHS, FONT_FAMILY, BATTLE_NODES
│   ├── scenes/
│   │   ├── index.ts
│   │   ├── boot_scene.ts             ← preload + generateHussarTextures()
│   │   └── menu_scene.ts             ← główna scena menu
│   ├── ui/
│   │   ├── index.ts
│   │   ├── timeline_node.ts          ← jeden interaktywny węzeł
│   │   └── timeline_manager.ts       ← zarządza węzłami + track bar
│   └── sprites/
│       ├── index.ts
│       ├── polish_eagle.ts           ← proceduralny Orzeł Biały
│       └── hussar_sprite.ts          ← animowana Husaria (8 klatek)
└── tests/
    ├── scenes/menu_scene.test.ts
    ├── ui/
    │   ├── timeline_node.test.ts
    │   └── timeline_manager.test.ts
    └── sprites/
        ├── polish_eagle.test.ts
        └── hussar_sprite.test.ts
```

---

## Kluczowe decyzje architektoniczne

- **`src/constants.ts`** – wszystkie magic numbers (COLORS, DEPTHS, BATTLE_NODES array). Dodanie nowej bitwy = tylko 1 wpis w tablicy.
- **`pixelArt: true` + `antialias: false`** w phaserConfig – crisp pixel art rendering
- **`drawHussarFrame(gfx, frameIndex)`** jako czysta funkcja – testowalność bez Phaser
- **`generateHussarTextures(scene)`** wywoływana w BootScene.create()** – pre-generowanie 8 klatek jako RenderTexture (brak alokacji w game loop)
- **TimelineNode extends Container** – koło, glow, teksty jako jedna interaktywna jednostka
- **`onNodeClick` callback** w TimelineManager – decoupling UI od sceny
- **Timeline layout**: `t = index / (totalNodes - 1)` → dodanie węzłów do `BATTLE_NODES[]` automatycznie re-layoutuje wszystko
- **`noUncheckedIndexedAccess`** w tsconfig – strict mode, `BATTLE_NODES[0]!` z non-null assertion w testach

---

## Fazy implementacji

### Faza 1: Project Setup
**Cel**: `npm install`, `npm run dev` (czarne canvas 1280x720), `npm run test` zielone, `npx tsc --noEmit` czyste.

Tworzone pliki:
- `package.json` (phaser@^3.87, vite@^6.1, vitest@^3.0, typescript@^5.7)
- `tsconfig.json` (strict: true, noUncheckedIndexedAccess: true, target: ES2022)
- `vite.config.ts` (port 8080, ES2022)
- `vitest.config.ts` (globals: true, environment: node)
- `index.html` (canvas centered, czarne tło)
- `src/constants.ts` (wszystkie stałe)
- `src/config.ts` (phaserConfig: pixelArt: true)
- `src/main.ts` (new Phaser.Game)
- `src/scenes/boot_scene.ts` (stub → start MenuScene)
- `src/scenes/menu_scene.ts` (stub, dark background)
- `tests/scenes/menu_scene.test.ts` (smoke tests)

---

### Faza 2: Basic Menu Scene
**Cel**: Wizualne tło + tytuł. Testowalność: uruchomić grę i zobaczyć tło.

Elementy:
- Tło: `0x0a0a14` base, ciemny panel centralny (`0x1a1a2e`)
- Czerwone pasy na górze i dole (Polish flag, `0xdc143c`, alpha 0.7)
- Białe linie separatora (16px od krawędzi)
- Tytuł: `"HISTORY OF POLAND"` – 64px, biały, czerwony stroke
- Podtytuł: `"- TOWER DEFENSE -"` – 28px, czerwony, letter-spacing 8

---

### Faza 3: Timeline Component
**Cel**: 3 klikalne węzły na osi czasu z hover effectem. Najbardziej logicznie bogata faza.

**`src/ui/timeline_node.ts`** (extends `Phaser.GameObjects.Container`):
- Circle + glow Graphics (default: gold `0x8b6914`, hover: `0xffd700`)
- Rok powyżej, nazwa bitwy poniżej
- Emits: `node-hover-enter`, `node-hover-exit`, `node-click`
- Public API: `getData()`, `getIsHovered()`
- Cleanup: `off()` event listeners w `destroy()`

**`src/ui/timeline_manager.ts`**:
- Rysuje horizontal track bar (dark wood `0x4a3520`)
- Rozmieszcza węzły: `t = index / (totalNodes - 1)`
- Tooltip podąża za kursorem
- `onNodeClick` callback
- Public API: `getNodeCount()`, `getNodeData()`, `update(pointer)`

**Testy**:
- TimelineNode: dane, stan hover, emisja eventów
- TimelineManager: liczba węzłów, kolejność chronologiczna (1410→1655→1683), callback

---

### Faza 4: Pixel Art Eagle i Hussar
**Cel**: Proceduralny Orzeł i animowana Husaria widoczne w menu.

**`src/sprites/polish_eagle.ts`** (extends Container):
- Orzeł Biały rysowany `fillRect`/`fillCircle`:
  - Złota korona (3 zęby + baza)
  - Biała głowa i tułów
  - Stepped wings (3 tiery lewe/prawe)
  - Heraldyczna tarcza na piersi (czerwono-biała)
  - Złoty dziób, szpony
- Konfigurowalny scale, umieszczony po prawej stronie menu

**`src/sprites/hussar_sprite.ts`**:
- Czysta funkcja `drawHussarFrame(gfx, frameIndex)` – testowalna bez Phaser
- Elementy: skrzydła (5 piór, lekki sway), hełm, napierśnik, czerwony płaszcz, lanca, koń (4 nogi w galopie)
- 8 klatek animacji (`frameIndex` 0–7)
- `generateHussarTextures(scene)` – tworzy 8 RenderTexture jako `hussar-frame-{i}`, definiuje animację `hussar-gallop` (12fps, repeat: -1)
- Wywołana w `BootScene.create()` przed startem MenuScene

**Testy**:
- PolishEagle: pozycja x/y, scale
- drawHussarFrame: wywołuje `clear()`, nie rzuca dla indeksów 0–7

---

### Faza 5: Polish & UX
**Cel**: Dopracowanie, przejścia, interakcje.

Elementy:
- Camera fade-in 800ms na starcie MenuScene
- Kliknięcie węzła → modal overlay: nazwa bitwy + rok + `[ CLOSE ]`
- Hussar idle bob: `y = baseY + sin(time * 0.002) * 4`
- Particles: drobne białe pyłki dryfujące w górę (alpha 0.3, symbol śniegu/kurzu)
- Tekst "Wybrana bitwa" poniżej osi czasu
- Cleanup eventów modala przy zamknięciu

---

## Weryfikacja end-to-end

Po każdej fazie:
```bash
npm run dev          # uruchom grę, sprawdź wizualnie
npm run test         # wszystkie testy zielone
npx tsc --noEmit     # brak błędów TypeScript
```

Finalna weryfikacja Po Fazie 5:
1. Gra uruchamia się z fade-in
2. Widać tytuł, Husarię (animowana), Orła, oś czasu z 3 węzłami
3. Hover na węzeł → złoty kolor + tooltip
4. Kliknięcie → modal z nazwą bitwy, zamykany przez `[ CLOSE ]`
5. Husarz kołysze się delikatnie w pionie
