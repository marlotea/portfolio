import { useEffect, useState, type CSSProperties } from 'react';
import { experience } from '../content.ts';
import { externalProps } from '../lib/links.ts';
import Rich from './Rich.tsx';

/** `#exp-<id>` links (e.g. in the hero blurb) open and scroll to that experience. */
const ANCHOR_PREFIX = '#exp-';
const experienceAnchor = (id: string) => `exp-${id}`;

function idFromHref(href: string | null) {
    if (!href?.startsWith(ANCHOR_PREFIX)) return null;
    const id = href.slice(ANCHOR_PREFIX.length);
    return experience.some((e) => e.id === id) ? id : null;
}

/** Everything starts collapsed, except an item deep-linked by the URL hash. */
function initialOpen(): Record<string, boolean> {
    const target = typeof window !== 'undefined' ? idFromHref(window.location.hash) : null;
    return Object.fromEntries(experience.map((e) => [e.id, e.id === target]));
}

/** Height of the sticky top bar plus breathing room. */
const TOP_CLEARANCE = 96;
const BOTTOM_CLEARANCE = 24;

/**
 * Brings an experience into view without yanking it to the top of the page:
 * if the entry (as it will look expanded) already fits on screen, nothing moves;
 * otherwise it's centered, or pinned just below the top bar if it's too tall to center.
 */
function revealEntry(el: HTMLElement) {
    const rect = el.getBoundingClientRect();
    const panel = el.querySelector<HTMLElement>('.accordion-inner');
    const panelHeight = panel ? panel.scrollHeight - panel.clientHeight : 0;
    const height = rect.height + panelHeight;
    const viewport = window.innerHeight;
    const fits = rect.top >= TOP_CLEARANCE && rect.top + height <= viewport - BOTTOM_CLEARANCE;
    if (fits) return;
    const targetTop = Math.max(TOP_CLEARANCE, (viewport - height) / 2);
    window.scrollTo({ top: window.scrollY + rect.top - targetTop });
}

export default function Experience() {
    const [open, setOpen] = useState(initialOpen);
    const toggle = (id: string) => setOpen((s) => ({ ...s, [id]: !s[id] }));

    // Handled here rather than by the hash router so the page doesn't jump the
    // entry to the top; a document-level listener also catches repeat clicks.
    useEffect(() => {
        const onClick = (e: MouseEvent) => {
            if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
            const link = e.target instanceof Element ? e.target.closest('a') : null;
            const id = idFromHref(link?.getAttribute('href') ?? null);
            const el = id ? document.getElementById(experienceAnchor(id)) : null;
            if (!id || !el) return;
            // Leave the URL alone: the hash router would scroll the entry to the top.
            e.preventDefault();
            revealEntry(el);
            setOpen((s) => ({ ...s, [id]: true }));
        };
        document.addEventListener('click', onClick);
        return () => document.removeEventListener('click', onClick);
    }, []);

    return (
        <ul className="hairline border-t">
            {experience.map((item, i) => {
                const isOpen = open[item.id];
                const panelId = `exp-${item.id}-panel`;
                const buttonId = `exp-${item.id}-button`;
                return (
                    <li
                        key={item.id}
                        id={experienceAnchor(item.id)}
                        className="reveal-item hairline border-b"
                        style={{ '--i': i } as CSSProperties}
                    >
                        {/* The button's ::after stretches over the whole row so it toggles from anywhere,
                            while the org link sits above it (a link can't be nested inside a button). */}
                        <div className="relative flex items-start justify-between gap-4 py-4">
                            <div className="min-w-0">
                                <h3>
                                    <button
                                        id={buttonId}
                                        type="button"
                                        aria-expanded={isOpen}
                                        aria-controls={panelId}
                                        onClick={() => toggle(item.id)}
                                        className="block cursor-pointer text-left text-base leading-snug text-ink after:absolute after:inset-0 after:rounded focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-violet lg:text-[17px]"
                                    >
                                        {item.role}
                                        <span className="sr-only"> at {item.org}</span>
                                    </button>
                                </h3>
                                <span className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-1">
                                    <span className="serif-italic text-[17px] leading-snug text-navy">
                                        @{' '}
                                        {item.orgHref ? (
                                            <a
                                                href={item.orgHref}
                                                {...externalProps(item.orgHref)}
                                                className="org-link relative z-10"
                                            >
                                                {item.org}
                                            </a>
                                        ) : (
                                            item.org
                                        )}
                                    </span>
                                    <span className="rounded bg-violet/9 px-2 py-0.5 font-mono text-[10px] text-violet">
                                        {item.kind}
                                    </span>
                                </span>
                                <span className="mt-1.5 block truncate font-mono text-[10px] text-muted">
                                    <span className="sr-only">Tags: </span>
                                    {item.tags.join(' · ')}
                                </span>
                            </div>
                            <div className="flex shrink-0 flex-col items-end gap-2 pt-1">
                                <span className={`toggle ${isOpen ? 'is-open' : ''}`} aria-hidden="true">
                                    <span />
                                    <span />
                                </span>
                                <span className="font-mono text-[10px] whitespace-nowrap text-muted">{item.date}</span>
                            </div>
                        </div>
                        <div
                            id={panelId}
                            role="region"
                            aria-labelledby={buttonId}
                            inert={!isOpen}
                            className={`accordion ${isOpen ? 'is-open' : ''}`}
                        >
                            <div className="accordion-inner">
                                <div className="pb-5">
                                    <p className="text-[15px] leading-[1.7] text-body">
                                        <Rich text={item.description} />
                                    </p>
                                    {item.also && (
                                        <div className="mt-3">
                                            <p className="font-mono text-[10px] tracking-wider text-muted uppercase">
                                                Also
                                            </p>
                                            <ul className="mt-1 space-y-1">
                                                {item.also.map((a, j) => (
                                                    <li key={j} className="flex gap-2 text-[15px] leading-[1.7] text-body">
                                                        <span aria-hidden="true">—</span>
                                                        <span>
                                                            <Rich text={a} />
                                                        </span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </li>
                );
            })}
        </ul>
    );
}
