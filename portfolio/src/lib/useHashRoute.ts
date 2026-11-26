import { useSyncExternalStore } from 'react';

export type Route =
    | { name: 'home'; anchor: string | null }
    | { name: 'writing' }
    | { name: 'post'; slug: string; anchor: string | null };

function safeDecode(s: string) {
    try {
        return decodeURIComponent(s);
    } catch {
        return s;
    }
}

/**
 * Hash routes: `#/writing`, `#/writing/<slug>` and `#/writing/<slug>/<heading-id>`. Any other hash (e.g. `#projects`)
 * is the home page, optionally scrolled to that anchor.
 */
export function parseHash(hash: string): Route {
    const h = hash.replace(/^#/, '');
    if (!h.startsWith('/')) return { name: 'home', anchor: h || null };
    const parts = h.split('/').filter(Boolean).map(safeDecode);
    if (parts[0] === 'writing' && parts.length === 1) return { name: 'writing' };
    if (parts[0] === 'writing' && (parts.length === 2 || parts.length === 3)) {
        return { name: 'post', slug: parts[1], anchor: parts[2] ?? null };
    }
    return { name: 'home', anchor: null };
}

const subscribe = (cb: () => void) => {
    window.addEventListener('hashchange', cb);
    return () => window.removeEventListener('hashchange', cb);
};

export function useHash() {
    return useSyncExternalStore(subscribe, () => window.location.hash);
}
