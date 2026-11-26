import type { ComponentPropsWithoutRef } from 'react';
import ReactMarkdown, { type Components, type ExtraProps } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { formatDate, getPost, postHref, posts, WRITING_HREF } from '../blog.ts';
import { extractHeadings, type Heading } from '../lib/headings.ts';
import { useActiveHeading } from '../lib/useActiveHeading.ts';
import PostList from './PostList.tsx';

const VIDEO = /\.(mp4|webm)$/i;

/** `![alt](clip.mp4)` renders as a looping, muted video; anything else as a plain image. */
function Media({ src, alt, title }: ComponentPropsWithoutRef<'img'>) {
    if (typeof src !== 'string' || !VIDEO.test(src)) return <img src={src} alt={alt ?? ''} title={title} />;
    const reduceMotion =
        typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    return (
        <video
            src={src}
            poster={src.replace(VIDEO, '.jpg')}
            aria-label={alt}
            title={title}
            autoPlay={!reduceMotion}
            controls={reduceMotion}
            muted
            loop
            playsInline
            preload="metadata"
        />
    );
}

function markdownComponents(headings: Heading[]): Components {
    const byLine = new Map(headings.map((h) => [h.line, h.id]));
    const idFor = (node: ExtraProps['node']) => {
        const line = node?.position?.start.line;
        return line === undefined ? undefined : byLine.get(line);
    };
    return {
        h2: ({ node, ...props }) => <h2 id={idFor(node)} {...props} />,
        h3: ({ node, ...props }) => <h3 id={idFor(node)} {...props} />,
        img: Media,
    };
}

function PostNav({ slug, headings }: { slug: string; headings: Heading[] }) {
    const active = useActiveHeading(headings.map((h) => h.id));
    return (
        <nav aria-label="On this page" className="sticky top-28">
            <p className="font-mono text-[10px] tracking-wider text-muted uppercase">On this page</p>
            <ul className="hairline mt-3 border-l">
                {headings.map((h) => {
                    const href = `${postHref(slug)}/${encodeURIComponent(h.id)}`;
                    const isActive = active === h.id;
                    return (
                        <li key={h.id}>
                            <a
                                href={href}
                                aria-current={isActive ? 'location' : undefined}
                                onClick={() => {
                                    // Same hash twice fires no hashchange, so scroll by hand.
                                    if (window.location.hash === href) document.getElementById(h.id)?.scrollIntoView();
                                }}
                                className={`toc-link block py-1.5 pr-2 text-[13px] leading-snug ${
                                    h.depth === 3 ? 'pl-7' : 'pl-4'
                                } ${isActive ? 'is-active' : ''}`}
                            >
                                {h.text}
                            </a>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}

function BackLink({ href, label }: { href: string; label: string }) {
    return (
        <a href={href} className="font-mono text-[11px] text-navy hover:text-violet">
            ← {label}
        </a>
    );
}

export function WritingIndex() {
    return (
        <div className="mx-auto max-w-[680px]">
            <BackLink href="#/" label="Home" />
            <h1 className="mt-8 flex items-baseline gap-3 text-[34px] leading-tight font-medium text-ink lg:text-[40px]">
                <span className="serif-italic text-[26px] text-violet" aria-hidden="true">
                    03
                </span>
                Writing
            </h1>
            <div className="reveal is-in hairline mt-8 border-t">
                <PostList items={posts} showSummary />
            </div>
        </div>
    );
}

export function PostPage({ slug }: { slug: string }) {
    const post = getPost(slug);

    if (!post) {
        return (
            <div className="mx-auto max-w-[680px]">
                <BackLink href={WRITING_HREF} label="All posts" />
                <h1 className="mt-8 text-[34px] font-medium text-ink">Post not found</h1>
                <p className="mt-4">There's no post at this address.</p>
            </div>
        );
    }

    const headings = extractHeadings(post.body);

    return (
        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,680px)_minmax(0,1fr)] lg:gap-12">
            <aside className="hidden lg:block">
                {headings.length > 0 && (
                    <div className="ml-auto h-full max-w-[220px]">
                        <PostNav slug={post.slug} headings={headings} />
                    </div>
                )}
            </aside>
            <article className="mx-auto max-w-[680px] lg:mx-0 lg:max-w-none">
                <BackLink href={WRITING_HREF} label="All posts" />
                <header className="mt-8">
                    <time dateTime={post.date} className="font-mono text-[11px] text-muted">
                        {formatDate(post.date)}
                    </time>
                    <h1 className="serif-italic mt-2 text-[38px] leading-[1.1] text-ink lg:text-[48px]">{post.title}</h1>
                    {post.summary && <p className="mt-4 text-lg leading-relaxed text-body">{post.summary}</p>}
                </header>
                <div className="post-body hairline mt-8 border-t pt-8">
                    <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents(headings)}>
                        {post.body}
                    </ReactMarkdown>
                </div>
                <div className="hairline mt-12 border-t pt-6">
                    <BackLink href={WRITING_HREF} label="All posts" />
                </div>
            </article>
        </div>
    );
}
