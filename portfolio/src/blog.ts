export type Post = {
    slug: string;
    title: string;
    /** YYYY-MM-DD */
    date: string;
    summary: string;
    body: string;
};

const files = import.meta.glob('./posts/*.md', {
    query: '?raw',
    import: 'default',
    eager: true,
}) as Record<string, string>;

const FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;

/** Minimal `key: value` frontmatter parser (no nesting, optional quotes). */
export function parseFrontmatter(raw: string) {
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

export const posts: Post[] = Object.entries(files)
    .map(([path, raw]) => {
        const slug = path.replace(/^.*\//, '').replace(/\.md$/, '');
        const { data, body } = parseFrontmatter(raw);
        return {
            slug,
            title: data.title ?? slug,
            date: data.date ?? '',
            summary: data.summary ?? '',
            body,
        };
    })
    .sort((a, b) => b.date.localeCompare(a.date));

export function getPost(slug: string) {
    return posts.find((p) => p.slug === slug);
}

/** 2026-11-20 -> 2026.11.20 */
export function formatDate(date: string) {
    return date.replaceAll('-', '.');
}

export const postHref = (slug: string) => `#/writing/${slug}`;
export const WRITING_HREF = '#/writing';
