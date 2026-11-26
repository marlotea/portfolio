import { useEffect, useState } from 'react';

/** Offset below the sticky top bar at which a heading counts as "reached". */
const OFFSET = 120;

/** Id of the last heading scrolled past the top of the viewport (the first one before any). */
export function useActiveHeading(ids: readonly string[]) {
    const [active, setActive] = useState<string | null>(null);
    const key = ids.join(',');

    useEffect(() => {
        const list = key ? key.split(',') : [];
        if (list.length === 0) return;
        let frame = 0;
        const update = () => {
            frame = 0;
            let current = list[0];
            for (const id of list) {
                const el = document.getElementById(id);
                if (el && el.getBoundingClientRect().top <= OFFSET) current = id;
            }
            // At the very bottom, the last heading may never reach the offset.
            if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
                current = list[list.length - 1];
            }
            setActive(current);
        };
        const onScroll = () => {
            if (!frame) frame = requestAnimationFrame(update);
        };
        update();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
        };
    }, [key]);

    return active;
}
