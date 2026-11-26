import { useEffect, useRef, useState } from 'react';

/** True once the element has scrolled into view (never resets). */
export function useInView<T extends Element>(rootMargin = '0px 0px -10% 0px') {
    const ref = useRef<T>(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el || inView) return;
        if (typeof IntersectionObserver === 'undefined') {
            setInView(true);
            return;
        }
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    observer.disconnect();
                }
            },
            { rootMargin },
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [inView, rootMargin]);

    return [ref, inView] as const;
}
