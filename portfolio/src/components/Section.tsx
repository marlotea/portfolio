import type { ReactNode } from 'react';
import { useInView } from '../lib/useInView.ts';

type Props = {
    id: string;
    num: string;
    title: string;
    children: ReactNode;
};

/** Numbered section with a heading row whose hairline rule fills the rest of the row. */
export default function Section({ id, num, title, children }: Props) {
    const [ref, inView] = useInView<HTMLElement>();
    const headingId = `${id}-title`;

    return (
        <section
            id={id}
            ref={ref}
            aria-labelledby={headingId}
            className={`reveal ${inView ? 'is-in' : ''}`}
        >
            <div className="flex items-baseline gap-3">
                <span className="serif-italic text-[22px] leading-none text-violet" aria-hidden="true">
                    {num}
                </span>
                <h2 id={headingId} className="text-2xl leading-none font-medium text-ink">
                    {title}
                </h2>
                <span className="section-rule hairline ml-2 flex-1 self-center border-t" aria-hidden="true" />
            </div>
            <div className="mt-6">{children}</div>
        </section>
    );
}
