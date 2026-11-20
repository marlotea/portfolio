import { useSyncExternalStore } from 'react';

export type Route =
    | { name: 'home'; anchor: string | null }
    | { name: 'writing' }
    | { name: 'post'; slug: string };

function safeDecode(s: string) {
    try {
        return decodeURIComponent(s);
    } catch {
        return s;
    }
}

/**
 * Hash routes: `#/writing` and `#/writing/<slug>`. Any other hash (e.g. `#projects`)
 * is the home page, optionally scrolled to that anchor.
 */
export function parseHash(hash: string): Route {
    const h = hash.replace(/^#/, '');
    if (!h.startsWith('/')) return { name: 'home', anchor: h || null };
    const parts = h.split('/').filter(Boolean).map(safeDecode);
    if (parts[0] === 'writing' && parts.length === 1) return { name: 'writing' };
    if (parts[0] === 'writing' && parts.length === 2) return { name: 'post', slug: parts[1] };
    return { name: 'home', anchor: null };
}

const subscribe = (cb: () => void) => {
    window.addEventListener('hashchange', cb);
    return () => window.removeEventListener('hashchange', cb);
};

export function useHash() {
    return useSyncExternalStore(subscribe, () => window.location.hash);
}
