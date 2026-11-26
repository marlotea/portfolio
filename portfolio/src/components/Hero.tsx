import { FileText, Github, Linkedin, Mail, type LucideIcon } from 'lucide-react';
import { links, profile, site, type LinkIcon } from '../content.ts';
import { externalProps } from '../lib/links.ts';
import HeroFigure from './HeroFigure.tsx';
import Rich from './Rich.tsx';

const ICONS: Record<LinkIcon, LucideIcon> = {
    linkedin: Linkedin,
    github: Github,
    resume: FileText,
    email: Mail,
};

export default function Hero() {
    return (
        <section aria-labelledby="hero-title" className="hero-sticky">
            <div className="lg:hidden">
                <HeroFigure variant="compact" />
            </div>
            <div className="hidden lg:block">
                <HeroFigure variant="wide" />
            </div>

            <h1
                id="hero-title"
                className="mt-8 text-[34px] leading-tight font-medium text-ink lg:mt-10 lg:text-[48px]"
            >
                {site.greeting}
            </h1>

            <div className="mt-5 space-y-4 text-[15px] leading-[1.75] text-body lg:text-base">
                {profile.map((p, i) => (
                    <p key={i}>
                        <Rich text={p} />
                    </p>
                ))}
            </div>

            <ul className="mt-7 flex flex-wrap gap-2.5" aria-label="Links">
                {links.map((l) => {
                    const Icon = ICONS[l.icon];
                    return (
                        <li key={l.label}>
                            <a
                                href={l.href}
                                {...externalProps(l.href)}
                                className="hairline inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 font-mono text-[11px] text-ink transition-colors hover:border-violet hover:text-violet"
                            >
                                <Icon size={13} className="text-violet" aria-hidden="true" />
                                {l.label}
                            </a>
                        </li>
                    );
                })}
            </ul>
        </section>
    );
}
