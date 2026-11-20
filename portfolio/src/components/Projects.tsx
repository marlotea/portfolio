import type { CSSProperties } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { projects, type ProjectItem } from '../content.ts';
import { externalProps } from '../lib/links.ts';
import Contours from './Contours.tsx';

const TINTS = {
    navy: { bg: 'bg-tint-navy', stroke: 'var(--color-navy)', phase: 0.4 },
    violet: { bg: 'bg-tint-violet', stroke: 'var(--color-violet)', phase: 2.1 },
} as const;

function Thumbnail({ project }: { project: ProjectItem }) {
    const tint = TINTS[project.tint];
    if (project.image) {
        return (
            <img
                src={project.image}
                alt={project.imageAlt ?? ''}
                className="aspect-[16/10] w-full rounded-lg object-cover"
            />
        );
    }
    // Placeholder art until a real screenshot is added via the `image` field.
    return (
        <div className={`aspect-[16/10] w-full overflow-hidden rounded-lg ${tint.bg}`}>
            <svg viewBox="0 0 320 200" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden="true">
                <Contours
                    cx={210}
                    cy={110}
                    r0={16}
                    step={15}
                    count={8}
                    color={tint.stroke}
                    phase={tint.phase}
                    strokeWidth={1}
                    opacity={0.6}
                    opacityStep={0.06}
                />
            </svg>
        </div>
    );
}

export default function Projects() {
    return (
        <ul className="grid gap-8 lg:grid-cols-2 lg:gap-6">
            {projects.map((p, i) => {
                const isPlaceholder = p.description.startsWith('TODO');
                const body = (
                    <>
                        <Thumbnail project={p} />
                        <div className="mt-3 flex items-center gap-1.5">
                            <h3 className="text-lg leading-snug font-medium text-ink">{p.title}</h3>
                            <ArrowUpRight size={16} className="card-arrow text-violet" aria-hidden="true" />
                        </div>
                        <p
                            className={
                                isPlaceholder
                                    ? 'mt-1 font-mono text-[12px] text-muted italic'
                                    : 'mt-1 text-[15px] leading-relaxed text-body'
                            }
                        >
                            {p.description}
                        </p>
                    </>
                );
                return (
                    <li key={p.id} className="reveal-item" style={{ '--i': i } as CSSProperties}>
                        {p.href ? (
                            <a href={p.href} {...externalProps(p.href)} className="project-card block rounded-lg">
                                {body}
                            </a>
                        ) : (
                            <div className="project-card">{body}</div>
                        )}
                    </li>
                );
            })}
        </ul>
    );
}
