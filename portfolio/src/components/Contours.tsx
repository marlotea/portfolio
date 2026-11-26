import type { CSSProperties } from 'react';
import { contourPath } from '../lib/contour.ts';

type Props = {
    cx: number;
    cy: number;
    r0: number;
    step: number;
    count?: number;
    color?: string;
    phase?: number;
    strokeWidth?: number;
    /** Opacity of ring 0; each ring outward loses opacityStep. */
    opacity?: number;
    opacityStep?: number;
    /** Adds the draw-in + breathe motion classes. */
    animated?: boolean;
    className?: string;
};

export default function Contours({
    cx,
    cy,
    r0,
    step,
    count = 6,
    color = 'currentColor',
    phase = 0,
    strokeWidth = 0.9,
    opacity = 0.55,
    opacityStep = 0.06,
    animated = false,
    className,
}: Props) {
    const rings = Array.from({ length: count }, (_, k) => ({
        k,
        d: contourPath(cx, cy, r0 + k * step, k, phase),
        opacity: Math.max(0.05, opacity - opacityStep * k),
    }));

    return (
        <g
            className={className}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinejoin="round"
            aria-hidden="true"
        >
            {rings.map((ring) => (
                <path
                    key={ring.k}
                    d={ring.d}
                    strokeOpacity={ring.opacity}
                    pathLength={animated ? 1 : undefined}
                    className={animated ? 'ring' : undefined}
                    style={
                        animated
                            ? ({ '--k': ring.k, transformOrigin: `${cx}px ${cy}px` } as CSSProperties)
                            : undefined
                    }
                />
            ))}
        </g>
    );
}
