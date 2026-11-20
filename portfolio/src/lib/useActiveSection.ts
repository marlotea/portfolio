import { useEffect, useState } from 'react';

/** Id of the section currently crossing the upper-middle band of the viewport. */
export function useActiveSection(ids: readonly string[], enabled = true) {
    const [active, setActive] = useState<string | null>(null);
    const key = ids.join(',');

    useEffect(() => {
        if (!enabled || typeof IntersectionObserver === 'undefined') return;
        const els = key
            .split(',')
            .map((id) => document.getElementById(id))
            .filter((el): el is HTMLElement => el !== null);
        const visible = new Map<string, boolean>();
        const observer = new IntersectionObserver(
            (entries) => {
                for (const e of entries) visible.set(e.target.id, e.isIntersecting);
                const first = els.find((el) => visible.get(el.id));
                setActive(first ? first.id : null);
            },
            { rootMargin: '-35% 0px -55% 0px' },
        );
        els.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, [key, enabled]);

    return enabled ? active : null;
}
