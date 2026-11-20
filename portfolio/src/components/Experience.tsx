import { useState, type CSSProperties } from 'react';
import { experience } from '../content.ts';
import Rich from './Rich.tsx';

const DESKTOP = '(min-width: 1024px)';

function initialOpen(): Record<string, boolean> {
    const all = typeof window !== 'undefined' && window.matchMedia(DESKTOP).matches;
    return Object.fromEntries(experience.map((e, i) => [e.id, all || i === 0]));
}

export default function Experience() {
    const [open, setOpen] = useState(initialOpen);
    const toggle = (id: string) => setOpen((s) => ({ ...s, [id]: !s[id] }));

    return (
        <ul className="hairline border-t">
            {experience.map((item, i) => {
                const isOpen = open[item.id];
                const panelId = `exp-${item.id}-panel`;
                const buttonId = `exp-${item.id}-button`;
                return (
                    <li key={item.id} className="reveal-item hairline border-b" style={{ '--i': i } as CSSProperties}>
                        <h3>
                            <button
                                id={buttonId}
                                type="button"
                                aria-expanded={isOpen}
                                aria-controls={panelId}
                                onClick={() => toggle(item.id)}
                                className="flex w-full cursor-pointer items-start justify-between gap-4 py-4 text-left"
                            >
                                <span className="min-w-0">
                                    <span className="block text-base leading-snug text-ink lg:text-[17px]">
                                        {item.role}
                                    </span>
                                    <span className="serif-italic mt-0.5 block text-[17px] leading-snug text-navy">
                                        @ {item.org}
                                    </span>
                                </span>
                                <span className="flex shrink-0 flex-col items-end gap-2 pt-1">
                                    <span className={`toggle ${isOpen ? 'is-open' : ''}`} aria-hidden="true">
                                        <span />
                                        <span />
                                    </span>
                                    <span className="font-mono text-[10px] whitespace-nowrap text-muted">
                                        {item.date}
                                    </span>
                                </span>
                            </button>
                        </h3>
                        <div
                            id={panelId}
                            role="region"
                            aria-labelledby={buttonId}
                            inert={!isOpen}
                            className={`accordion ${isOpen ? 'is-open' : ''}`}
                        >
                            <div className="accordion-inner">
                                <div className="pb-5">
                                    <ul className="flex flex-wrap gap-1.5" aria-label="Tags">
                                        {item.tags.map((t) => (
                                            <li
                                                key={t}
                                                className="rounded bg-violet/9 px-2 py-0.5 font-mono text-[10px] text-violet"
                                            >
                                                {t}
                                            </li>
                                        ))}
                                    </ul>
                                    <p className="mt-3 text-[15px] leading-[1.7] text-body">
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
