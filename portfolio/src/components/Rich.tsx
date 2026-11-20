import type { ReactNode } from 'react';
import { externalProps } from '../lib/links.ts';

const TOKEN = /\*\*(.+?)\*\*|\[(.+?)\]\((.+?)\)/g;

/** Renders a content string with **emphasis** and [label](url) links. */
export default function Rich({ text }: { text: string }) {
    const out: ReactNode[] = [];
    let last = 0;
    for (const m of text.matchAll(TOKEN)) {
        const i = m.index ?? 0;
        if (i > last) out.push(text.slice(last, i));
        if (m[1] !== undefined) {
            out.push(<strong key={i} className="em">{m[1]}</strong>);
        } else {
            out.push(
                <a key={i} href={m[3]} className="text-link" {...externalProps(m[3])}>
                    {m[2]}
                </a>,
            );
        }
        last = i + m[0].length;
    }
    if (last < text.length) out.push(text.slice(last));
    return <>{out}</>;
}
