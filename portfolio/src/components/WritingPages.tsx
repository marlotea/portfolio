import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { formatDate, getPost, posts, WRITING_HREF } from '../blog.ts';
import PostList from './PostList.tsx';

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

    return (
        <article className="mx-auto max-w-[680px]">
            <BackLink href={WRITING_HREF} label="All posts" />
            <header className="mt-8">
                <time dateTime={post.date} className="font-mono text-[11px] text-muted">
                    {formatDate(post.date)}
                </time>
                <h1 className="serif-italic mt-2 text-[38px] leading-[1.1] text-ink lg:text-[48px]">{post.title}</h1>
                {post.summary && <p className="mt-4 text-lg leading-relaxed text-body">{post.summary}</p>}
            </header>
            <div className="post-body hairline mt-8 border-t pt-8">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.body}</ReactMarkdown>
            </div>
            <div className="hairline mt-12 border-t pt-6">
                <BackLink href={WRITING_HREF} label="All posts" />
            </div>
        </article>
    );
}
