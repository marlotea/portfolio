export type Post = {
    slug: string;
    title: string;
    /** YYYY-MM-DD */
    date: string;
    summary: string;
    body: string;
    /** `unlisted: true` in frontmatter hides the post from lists; its URL still works. */
    unlisted: boolean;
};

// posts/README.md documents how to write posts; it isn't one.
const files = import.meta.glob(['./posts/*.md', '!./posts/README.md'], {
    query: '?raw',
    import: 'default',
    eager: true,
}) as Record<string, string>;

const FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;

/** Minimal `key: value` frontmatter parser (no nesting, optional quotes). */
function parseFrontmatter(raw: string) {
    const match = raw.match(FRONTMATTER);
    const data: Record<string, string> = {};
    if (!match) return { data, body: raw };
    for (const line of match[1].split(/\r?\n/)) {
        const i = line.indexOf(':');
        if (i < 1) continue;
        const key = line.slice(0, i).trim();
        const value = line
            .slice(i + 1)
            .trim()
            .replace(/^(['"])(.*)\1$/, '$2');
        data[key] = value;
    }
    return { data, body: raw.slice(match[0].length) };
}

const allPosts: Post[] = Object.entries(files)
    .map(([path, raw]) => {
        const slug = path.replace(/^.*\//, '').replace(/\.md$/, '');
        const { data, body } = parseFrontmatter(raw);
        return {
            slug,
            title: data.title ?? slug,
            date: data.date ?? '',
            summary: data.summary ?? '',
            body,
            unlisted: data.unlisted === 'true',
        };
    })
    .sort((a, b) => b.date.localeCompare(a.date));

/** Posts shown in the writing lists. */
export const posts = allPosts.filter((p) => !p.unlisted);

/** Any post by slug, including unlisted ones reached by direct link. */
export function getPost(slug: string) {
    return allPosts.find((p) => p.slug === slug);
}

/** 2026-11-20 -> 2026.11.20 */
export function formatDate(date: string) {
    return date.replaceAll('-', '.');
}

export const postHref = (slug: string) => `#/writing/${slug}`;
export const WRITING_HREF = '#/writing';
