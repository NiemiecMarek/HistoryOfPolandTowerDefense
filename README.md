# History of Poland - Tower Defense

Gra tower defense osadzona w historii Polski. Pixel art generowany proceduralnie (bez zewnętrznych plików graficznych).

## Stack

- **Phaser 3** - silnik gry
- **TypeScript** - strict mode, `noUncheckedIndexedAccess`
- **Vite** - dev server (port 8080) + bundler
- **Vitest** - testy jednostkowe (74 testów)

## Uruchomienie

```bash
npm install
npm run dev        # dev server: http://localhost:8080
npm run test       # testy
npm run build      # produkcja
npx tsc --noEmit   # walidacja TypeScript
```

## Stan projektu

### Zaimplementowane (Fazy 1-5)

**Menu główne** z pełnym Polish & UX:
- Tło w stylu polskiej flagi (pasy czerwono-białe), centralny panel
- Tytuł "HISTORY OF POLAND" z polskim stylem typograficznym
- Proceduralny **Orzeł Biały** (`src/sprites/polish_eagle.ts`) - rysowany przez Phaser Graphics API
- Animowana **Husaria** (`src/sprites/hussar_sprite.ts`) - 8 klatek, galop 12fps, delikatny bob w pionie
- **Oś czasu** z 3 bitwami (`src/ui/timeline_manager.ts`): interaktywne węzły z hover glow i tooltipem
- **Modal bitwy** (`src/ui/battle_modal.ts`) - po kliknięciu węzła: overlay, panel, opis, zamykanie przez CLOSE / ESC
- **Cząsteczki** - białe pyłki dryfujące w górę (atmosfera)
- Camera fade-in 800ms przy starcie

### Bitwy na osi czasu

| Rok  | Bitwa        | Opis |
|------|--------------|------|
| 1410 | Grunwald     | Wielka wiktorya nad Krzyżakami |
| 1655 | Częstochowa  | Obrona Jasnej Góry |
| 1683 | Wiedeń       | Odsiecz Wiedeńska - Jan III Sobieski |

## Struktura projektu

```
src/
  scenes/
    boot_scene.ts       # pre-generuje tekstury, startuje MenuScene
    menu_scene.ts       # główna scena menu
  ui/
    timeline_node.ts    # interaktywny węzeł osi czasu
    timeline_manager.ts # oś czasu + tooltip
    battle_modal.ts     # modal z detalami bitwy
  sprites/
    polish_eagle.ts     # proceduralny Orzeł Biały
    hussar_sprite.ts    # animowana Husaria (8 klatek)
  constants.ts          # COLORS, DEPTHS, MENU_LAYOUT, BATTLE_NODES
  config.ts             # konfiguracja Phaser (1280x720, pixelArt: true)
tests/                  # testy Vitest (74 testów)
plan/
  main_menu.md          # plan implementacji menu
```
