# Analysis — AIRTRACK (airplanes.live globe console)

**Reference**: `dsh-edex-ui-airtrack/reference-shot.png` (web-discovered, Step 0, direction "tactical map / radar console")
**Source URL**: https://globe.airplanes.live/ · **Method**: `vision` (external vision service via `scripts/vision-call.sh`, 5-retry rule; pixel measurement only sharpened vision values — `scripts/analyze-ui.py`, `scripts/measure-accent2.py`, direct BMP sampling)

## What the reference is

A live aircraft-tracking console (tar1090-style globe UI): a full-bleed darkened tactical map on the left (~75% width) with dozens of multicolored, heading-oriented aircraft icons, and a dense control sidebar on the right (x≈1200–1600) stacked as: promo header ("Improve Coverage: Airplanes.live", FAQ / Map Help / Discord links), live counters ("Total Aircraft: 6619" / "On Screen: 80"), a Search/Filters/Columns tab row, a search + jump-to-coordinates form, and a dense aircraft data table. Square steel-blue toolbar buttons float over the map's right edge; an altitude gradient legend runs along the map bottom.

## Palette (measured, THIS reference only)

| Token | Hex | Origin |
|---|---|---|
| Panel/card surface | **#313131** | pixel-modal of the entire sidebar (17,969 samples); vision verify concurred ("neutral dark gray #2D2D2D–#313131, not navy") |
| Shell canvas (map flat-analog) | **#262626** | darker neutral tone so #313131 cards pop; derived from the measured #242424/#1A1A1A chrome tones |
| Table row / accent family | **#2A5363** | modal of 131,984 sampled px (hue ≈197°, steel cyan-blue) — `measure-accent2.py` cyan bucket |
| Header band / active fills | **#064B75** | blue-bucket modal; the table header band and toolbar button fills |
| Light border on accents | **#4388A0** | measured band on toolbar buttons |
| Link text | **#4873A8** | sampled from the "Airplanes.live" link |
| Primary accent (UI-durable lift) | **#5D9AB8** | lift of the steel-cyan family for accent text/actives |
| Text primary / secondary / muted | **#D8D8D8 / #BFBFBF / #858585** | measured modes (row text, counts line, labels/borders) |
| Semantic (legend hues) | green #00C83C · yellow #FFE500 · red #F00000 · blue #2364E8 · cyan #00C8D8 | the reference's own altitude legend + aircraft coloring |
| Map canvas itself | ocean-mode #5D747A, land-mode #858380 (under dark overlay) | contextual only — not used as UI chrome |

**Glow: none.** The reference is flat, utilitarian chrome — no box-shadow, no neon. `glow: null` throughout.

## Border language (per element)

- **frame**: partial / none-drawn — the sidebar meets the map with no drawn outer border. Shell bar cells get only a minimal 1px hairline in #3F3F3F; no radius, no glow.
- **cards**: full 1px solid #242424, square corners (radius 0, `cornerRounding.detected: false`), fill #313131, separated by 1px #242424 hairlines. Flat rectangles, no shadow.
- **dividers**: 1px #242424 hairlines; the table header is a filled #064B75 steel-blue band; rows sit on #2A5363 against #313131 gaps.
- **inputs**: fill ~#1C1C1C, 1px #858585 border, square corners.
- **activeIndicators**: filled band, not a left bar — active tab/buttons are solid #064B75 with 1px #4388A0 borders; selected table row highlighted amber #60572E (1,514-px mode).

## Widget reconciliation

| Reference widget | eDEX slot | Match | Action |
|---|---|---|---|
| AIRCRAFT TABLE | `processes` | high | Restyle as the aircraft table: #064B75 header band, 1px #242424 separators, #D8D8D8 text, amber #60572E selected row; keep live hook data |
| STATUS COUNTERS | `info` | partial | Restyle as compact labeled counters |
| TACTICAL MAP | `globe` | partial | **Featured widget** — replaces WORLD VIEW |
| MAP CONTROL TOOLBAR | — | — | No counterpart; left as reference description only |
| SEARCH/FILTER FORM | — | — | No counterpart; informs inputs styling |
| ALTITUDE LEGEND | — | — | Folded into the featured map widget |

**Featured widget**: **AIR TRACK** (slot `airtrack`) replaces the `WORLD VIEW` globe — a dark tactical map/track display: #262626 field, faint graticule lines, multicolored aircraft track markers (legend hues), altitude gradient legend strip at the bottom, square corners, 1px #242424 frame, no glow. Static/sample track content (the eDEX hooks provide no geographic data — divergence noted in review per Edge Cases).

## Granularity mapping (per Lessons Learned)

- Per-widget card treatment (1px #242424 full rectangles on #313131 fill) → `WidgetSection.module.css` sections — NOT the bar cells.
- Bar cells carry only the minimal frame-level hairline (#3F3F3F 1px).
- Center slot: `.section[data-widget='center']` transparent reset (mandatory); the center CONTAINER carries the widget chrome (1px border + title bar strip) per the KIBO/XRY lessons.
- Workspace background tokens (`--dsw-alias-*`, `--dsw-specific-*`) → #313131 panel surface so the workspace reads as the same surface as the panels.
