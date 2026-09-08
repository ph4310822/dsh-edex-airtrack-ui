/**
 * AIR TRACK widget: the reference's signature tactical map/track display
 * (analysis.json widgets.featured) — a dark map field with a faint graticule
 * and coast contours, multicolored aircraft track markers (the reference's
 * altitude-legend hues), a selected-track readout in the amber row-highlight
 * tone, and the altitude gradient legend strip along the bottom. Track
 * content is static/sample (the eDEX hooks provide no geographic data) and
 * the tracks drift via CSS transform animations (translation only).
 */
import { useState } from 'react'
import type { CSSProperties } from 'react'
import type { RightWidgetHooks } from '../../widgets/types.ts'
import css from './AirTrackWidget.module.css'

/** One sample track: a position, a drift target, a heading, a band color. */
interface Track {
  id: string
  /** From/to positions in the 0..100 × 0..62 field, heading in degrees. */
  fx: number
  fy: number
  tx: number
  ty: number
  rot: number
  color: string
  /** Flight level and speed for the selected-track readout. */
  fl: number
  spd: number
}

/** The sample tracks: the reference's altitude-band hues (theme.semanticColors). */
const TRACKS: readonly Track[] = [
  { id: 'DLH441', fx: 18, fy: 14, tx: 46, ty: 24, rot: 24, color: '#00c8d8', fl: 340, spd: 462 },
  { id: 'BAW117', fx: 70, fy: 12, tx: 40, ty: 34, rot: 196, color: '#00c83c', fl: 380, spd: 498 },
  { id: 'UAE201', fx: 30, fy: 48, tx: 62, ty: 40, rot: 341, color: '#ffe500', fl: 300, spd: 431 },
  { id: 'AFR019', fx: 84, fy: 44, tx: 56, ty: 18, rot: 118, color: '#ff5a00', fl: 260, spd: 405 },
  { id: 'KLM602', fx: 52, fy: 54, tx: 24, ty: 34, rot: 287, color: '#f00000', fl: 220, spd: 372 },
  { id: 'SIA317', fx: 12, fy: 34, tx: 44, ty: 50, rot: 63, color: '#2364e8', fl: 400, spd: 510 },
]

/** A track marker: a small heading-oriented delta at the local origin. */
function trackPath(): string {
  return 'M 0 -2.6 L 1.9 2.2 L 0 1.2 L -1.9 2.2 Z'
}

/** The inline drift style for one track: the keyframe endpoints (CSS custom
 * properties) plus the per-track duration/delay offsets. */
function driftStyle(track: Track, index: number): CSSProperties {
  return {
    '--fx': `${track.fx}px`,
    '--fy': `${track.fy}px`,
    '--tx': `${track.tx}px`,
    '--ty': `${track.ty}px`,
    '--rot': `${track.rot}deg`,
    animationDuration: `${14 + index * 3.5}s`,
    animationDelay: `${-index * 4}s`,
  } as CSSProperties
}

/** AIR TRACK widget: map field + selected-track readout + altitude legend. */
export function AirTrackWidget(_hooks: RightWidgetHooks) {
  const [selected, setSelected] = useState(0)
  const track = TRACKS[selected]
  return (
    <div className={css.pane}>
      <div className={css.mapField} data-testid="edex-airtrack-map">
        <svg className={css.mapSvg} viewBox="0 0 100 62" preserveAspectRatio="none" aria-hidden="true">
          {/* Graticule: faint 1px lines every 12.5 × 10 units. */}
          <g stroke="#3f3f3f" strokeWidth="0.25" opacity="0.7">
            {[12.5, 25, 37.5, 50, 62.5, 75, 87.5].map(x => (
              <line key={`gx${x}`} x1={x} y1="0" x2={x} y2="62" />
            ))}
            {[10, 20, 30, 40, 50].map(y => (
              <line key={`gy${y}`} x1="0" y1={y} x2="100" y2={y} />
            ))}
          </g>
          {/* Coast contours: faint steel polylines (the darkened landmass). */}
          <g stroke="#4a7d96" strokeWidth="0.4" fill="none" opacity="0.45">
            <path d="M 0 24 C 14 20 22 28 34 26 S 52 18 60 22 S 78 30 100 26" />
            <path d="M 0 44 C 18 40 30 50 46 46 S 70 38 84 44 S 94 50 100 48" />
          </g>
          {/* The tracks: CSS-animated drift (translation only; heading is
              constant per track, so no pivot dynamics). Click to select. */}
          {TRACKS.map((t, i) => (
            <g
              key={t.id}
              className={css.track}
              style={driftStyle(t, i)}
              onClick={() => setSelected(i)}
            >
              {i === selected && <circle className={css.selectHalo} r="4" fill="#60572e" opacity="0.85" />}
              <path d={trackPath()} fill={t.color} transform={`rotate(${t.rot})`} />
            </g>
          ))}
        </svg>
        {/* The mini map-control toolbar (the reference's steel-blue square
            buttons over the map's edge). Decorative. */}
        <div className={css.miniToolbar} aria-hidden="true">
          <span className={css.miniBtn}>+</span>
          <span className={css.miniBtn}>−</span>
          <span className={css.miniBtn}>▢</span>
        </div>
      </div>
      {/* Selected-track readout: the reference's amber selected-row band. */}
      <div className={css.readout} data-testid="edex-airtrack-selected">
        <span className={css.readoutId}>{track.id}</span>
        <span className={css.readoutData}>FL{track.fl} · {track.spd} KT</span>
      </div>
      {/* Altitude legend: the reference's gradient strip (theme.semanticColors). */}
      <div className={css.legend}>
        <div className={css.legendScale} />
        <div className={css.legendLabels}>
          <span>ALTITUDE</span>
          <span>0</span>
          <span>FL450+</span>
        </div>
      </div>
    </div>
  )
}
