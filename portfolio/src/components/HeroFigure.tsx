import type { CSSProperties } from 'react';
import pfp from '../assets/pfp.png';
import { callouts } from '../content.ts';
import Contours from './Contours.tsx';

type Geometry = {
    w: number;
    h: number;
    cx: number;
    cy: number;
    /** Photo radius. */
    r: number;
    r0: number;
    step: number;
    labelX: number;
    labelYs: number[];
    fontSize: number;
    /** Angles (degrees) on the photo edge where each leader line starts. */
    angles: number[];
};

const COMPACT: Geometry = {
    w: 342,
    h: 240,
    cx: 92,
    cy: 120,
    r: 64,
    r0: 70,
    step: 8,
    labelX: 180,
    labelYs: [70, 120, 170],
    fontSize: 10,
    angles: [-38, 0, 38],
};

const WIDE: Geometry = {
    w: 540,
    h: 300,
    cx: 150,
    cy: 150,
    r: 92,
    r0: 100,
    step: 11,
    labelX: 300,
    labelYs: [80, 150, 220],
    fontSize: 11,
    angles: [-38, 0, 38],
};

export default function HeroFigure({ variant }: { variant: 'compact' | 'wide' }) {
    const g = variant === 'wide' ? WIDE : COMPACT;
    const pct = (v: number, of: number) => `${(v / of) * 100}%`;

    return (
        <div
            className={`hero-figure relative w-full ${variant === 'compact' ? 'max-w-[420px]' : ''}`}
            style={{ aspectRatio: `${g.w} / ${g.h}` }}
        >
            <svg
                viewBox={`0 0 ${g.w} ${g.h}`}
                className="absolute inset-0 h-full w-full overflow-visible"
                aria-hidden="true"
            >
                <Contours
                    cx={g.cx}
                    cy={g.cy}
                    r0={g.r0}
                    step={g.step}
                    color="var(--color-violet)"
                    animated
                    className="text-violet"
                />
                {callouts.map((c, i) => {
                    const a = (g.angles[i] * Math.PI) / 180;
                    const x0 = g.cx + Math.cos(a) * g.r;
                    const y0 = g.cy + Math.sin(a) * g.r;
                    const y = g.labelYs[i];
                    const label = variant === 'compact' ? (c.short ?? c.text) : c.text;
                    return (
                        <g key={c.letter} className="callout" style={{ '--i': i } as CSSProperties}>
                            <polyline
                                points={`${x0},${y0} ${g.labelX - 14},${y} ${g.labelX - 5},${y}`}
                                fill="none"
                                stroke="var(--color-ink)"
                                strokeOpacity={0.55}
                                strokeWidth={0.75}
                            />
                            <circle cx={x0} cy={y0} r={2} fill="var(--color-ink)" />
                            <text
                                x={g.labelX}
                                y={y}
                                dominantBaseline="middle"
                                className="callout-text"
                                style={{ fontSize: g.fontSize }}
                            >
                                <tspan className="serif-italic" fill="var(--color-violet)" style={{ fontSize: g.fontSize * 1.35 }}>
                                    {c.letter}
                                </tspan>
                                <tspan dx={g.fontSize * 0.5} fill="var(--color-ink)" className="font-mono">
                                    {label}
                                </tspan>
                            </text>
                        </g>
                    );
                })}
            </svg>
            <img
                src={pfp}
                alt="Portrait of Leia Chen"
                className="absolute rounded-full object-cover shadow-[0_0_0_3px_#fff,0_6px_18px_rgba(36,48,60,0.12)]"
                style={{
                    left: pct(g.cx - g.r, g.w),
                    top: pct(g.cy - g.r, g.h),
                    width: pct(2 * g.r, g.w),
                    height: pct(2 * g.r, g.h),
                }}
            />
        </div>
    );
}
