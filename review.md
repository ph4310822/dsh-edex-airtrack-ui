# Review — AIRTRACK (dsh-edex-ui-airtrack)

**Verdict: PASS** (probe + vision + granularity + workspace + animation + GIF all green)

## Probe (scripts/probe-review.mjs, port 3084)

- **Console errors: 0**; shell present; page title OK.
- **Theme vars**: `--edex-green` = **#5d9ab8** (analysis.primaryAccent), `--edex-border` = **#242424** (borderFeatures.cards.color), `--edex-panel-2` = **#1c1c1c** (inputs.fill), `--dsw-alias-label-primary` = #5d9ab8, `--dsw-alias-border-l1` = #242424.
- **bodyBackground = rgb(49,49,49) = #313131** — exactly the analysis card surface (theme.panelTone); the workspace reads as the same surface as the panels ✓ (workspace-shares-panel-background lesson).
- **workspacePresent = true** (sidebar + conversation + composer in DOM).
- **workspace.center = transparent** (`rgba(0,0,0,0)`, 0px border, 0 margin, visible) — the `.section[data-widget='center']` reset holds; no card chrome leaks onto the workspace ✓.
- **worldViewGone = true**; `widgetIds` contains **`airtrack`** (featured slot from THIS analysis) plus info/cpu/processes/network-status/traffic/files/preview/terminal/center ✓.

## Vision comparison (vision-compare.sh, 5-retry rule)

- Color family confirmed: neutral dark gray panels, darker canvas, steel-blue/cyan accents, light gray text, yellow/red semantic accents ("基本使用了同一色彩体系").
- Filled steel-blue title bands confirmed on AIR TRACK / TRAFFIC / AIRCRAFT / PREVIEW cards — matching the reference's filled header-band language.
- AIR TRACK widget confirmed: colored track markers + altitude gradient legend.
- Divergence (expected, from analysis): the featured map is an abstract graticule track field with sample tracks (hooks provide no geographic data — Edge Case: static/sample content, noted in analysis.json widgets.featured.notes), not a real geographic basemap; layout is eDEX's bar structure, not the site's map+sidebar — inherent to the shell adaptation, recorded per Assumption 5.

## Granularity checks (per element, crops + pixel scans)

- **Left column**: 3 flat card boxes, square corners, thin dark hairlines, no glow; AIRCRAFT table has the steel-blue header band (#07547c–#0a5b76 measured) over dark rows with subtle hairlines — matches borderFeatures.cards/dividers (full 1px #242424, radius 0, no glow).
- **Right column** (re-cropped at the true content offset): INTERFACE STATE / AIR TRACK / TRAFFIC cards with blue title bands; AIR TRACK shows dark field + faint grid + colored markers + gradient legend; square corners, thin dark borders, no glow; amber/olive readout band (#60572E) with DLH441 · FL340 · 462 KT — matches analysis (cards + activeIndicators.selectedRowFill).
- **Center/workspace**: working app UI visible (sidebar + workspace + composer), thin steel-blue strip across the top, workspace surface ≈ #313131 (same as cards), no occlusion. Pixel scan: #242424 border → **#064B75 strip (y=2–18, 19px)** → #313131 workspace — the center CONTAINER carries the card chrome (1px border + title band) while the inner section stays transparent ✓. The reshaped workspace is inset 20px below the strip (CENTER_TITLE_INSET) so the chrome frames it without covering it.
- Pixel cross-check: rendered band hue 203° vs reference accent family hue 197° → **delta 5.9° ≤ 20° tolerance** ✓; card bg #313233 ≈ #313131 ✓.

## Animation verification (probe-animation.mjs — Animation Verification (Generic))

- Static inventory: 1 CSS `@keyframes airtrack-drift` (translation+rotation, per-track duration/delay), no other shell animations (glow/shadows removed with the flat theme).
- Runtime: **6 track animations running** (playState running, sampled transforms changing, translation advancing along the from→to vectors), rate within declared per-track durations, **pivot OK** (constant heading rotation — the rotation is in both keyframe endpoints, so no asymmetric-bbox orbit; no rotating sweep in this variant), **extent OK** (all tracks stay inside the map field; alternate+linear loop), `prefers-reduced-motion: false`, **0 console errors**. Verdict: **pass = true** ✓.

## GIF

- `preview.gif` recorded (4s @ 12fps, 221 KB, **0 page errors during capture**).

## Divergences & notes

1. Featured map = abstract track field with sample data (no live geographic feed) — per Edge Cases, noted in analysis.
2. Reference's real map canvas (#5D747A-mode ocean tones) is contextual site content, not UI chrome — deliberately not applied to the shell (chrome tokens come from the measured UI surfaces).
3. Probe `panels.*.borderWidth` reads 0px on `.leftBar/.rightBar` cells: the bar cells are flex CONTAINERS; the visible hairlines live on the widget sections + `.centerWidget` border, i.e. at the DOM granularity the analysis assigns (cards). Panel cells carry only the #262626 canvas + faint texture per borderFeatures.frame (partial/no drawn frame).

**Verdict: PASS.**
