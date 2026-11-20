/**
 * Closed, wobbly contour around (cx, cy), like a gyrus or a topographic line.
 * k is the ring index; phase shifts the wobble so different figures look different.
 */
export function contourPath(cx: number, cy: number, r: number, k: number, phase = 0, points = 72) {
    let d = '';
    for (let i = 0; i < points; i++) {
        const a = (i / points) * Math.PI * 2;
        const rr =
            r *
            (1 +
                0.09 * Math.sin(3 * a + 0.7 * k + phase) +
                0.05 * Math.sin(7 * a + 1.3 * k + phase * 1.7) +
                0.03 * Math.sin(11 * a + phase * 0.5));
        const x = cx + Math.cos(a) * rr * 1.12;
        const y = cy + Math.sin(a) * rr * 0.88;
        d += `${i ? 'L' : 'M'}${x.toFixed(2)} ${y.toFixed(2)}`;
    }
    return `${d}Z`;
}
