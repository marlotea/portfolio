import type { CSSProperties } from 'react';
import { formatDate, postHref, type Post } from '../blog.ts';

export default function PostList({ items, showSummary = false }: { items: Post[]; showSummary?: boolean }) {
    if (items.length === 0) {
        return <p className="font-mono text-xs text-muted">No posts yet.</p>;
    }
    return (
        <ul>
            {items.map((p, i) => (
                <li key={p.slug} className="reveal-item hairline border-b" style={{ '--i': i } as CSSProperties}>
                    <a href={postHref(p.slug)} className="post-row flex items-baseline gap-4 py-3.5">
                        <time dateTime={p.date} className="w-16 shrink-0 font-mono text-[10px] text-muted">
                            {formatDate(p.date)}
                        </time>
                        <span className="min-w-0">
                            <span className="post-title serif-italic block text-[19px] leading-snug text-ink">
                                {p.title}
                            </span>
                            {showSummary && p.summary && (
                                <span className="mt-1 block text-sm leading-relaxed text-body">{p.summary}</span>
                            )}
                        </span>
                    </a>
                </li>
            ))}
        </ul>
    );
}
