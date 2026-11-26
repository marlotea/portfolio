import { useEffect, useState } from 'react';
import { RESUME_URL, sections, site } from '../content.ts';
import { externalProps } from '../lib/links.ts';

type Props = {
    /** Section currently in view on the home page, if any. */
    active: string | null;
};

export default function TopBar({ active }: Props) {
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        if (!menuOpen) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setMenuOpen(false);
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [menuOpen]);

    const close = () => setMenuOpen(false);

    return (
        <header className="hairline sticky top-0 z-40 border-b bg-paper/90 backdrop-blur-sm">
            <div className="mx-auto flex h-16 max-w-[1248px] items-center justify-between px-6">
                <a href="#/" className="text-lg font-medium text-ink" aria-label={`${site.name}, home`}>
                    {site.wordmark}
                </a>

                <nav aria-label="Primary" className="hidden lg:block">
                    <ul className="flex items-center gap-8 font-mono text-xs">
                        {sections.map((s) => (
                            <li key={s.id}>
                                <a
                                    href={`#${s.id}`}
                                    aria-current={active === s.id ? 'true' : undefined}
                                    className={`nav-link ${active === s.id ? 'is-active' : ''}`}
                                >
                                    {s.title}
                                </a>
                            </li>
                        ))}
                        <li>
                            <a href={RESUME_URL} {...externalProps(RESUME_URL)} className="nav-link">
                                Resume ↗
                            </a>
                        </li>
                    </ul>
                </nav>

                <button
                    type="button"
                    className="cursor-pointer font-mono text-xs tracking-wider text-ink lg:hidden"
                    aria-expanded={menuOpen}
                    aria-controls="mobile-menu"
                    onClick={() => setMenuOpen((o) => !o)}
                >
                    {menuOpen ? 'CLOSE' : 'MENU'}
                </button>
            </div>

            {menuOpen && (
                <nav id="mobile-menu" aria-label="Primary" className="hairline border-t bg-paper lg:hidden">
                    <ul className="mx-auto max-w-[1248px] px-6 py-2">
                        {sections.map((s) => (
                            <li key={s.id} className="hairline border-b last:border-b-0">
                                <a href={`#${s.id}`} onClick={close} className="flex items-baseline gap-3 py-3.5">
                                    <span className="serif-italic text-violet">{s.num}</span>
                                    <span className="text-ink">{s.title}</span>
                                </a>
                            </li>
                        ))}
                        <li>
                            <a
                                href={RESUME_URL}
                                {...externalProps(RESUME_URL)}
                                onClick={close}
                                className="flex items-baseline gap-3 py-3.5 font-mono text-xs text-ink"
                            >
                                Resume ↗
                            </a>
                        </li>
                    </ul>
                </nav>
            )}
        </header>
    );
}
