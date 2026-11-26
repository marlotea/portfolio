export type Heading = {
    depth: 2 | 3;
    text: string;
    id: string;
    /** 1-based source line, used to match the heading node react-markdown renders. */
    line: number;
};

function slugify(text: string) {
    return (
        text
            .toLowerCase()
            .replace(/[^\p{L}\p{N}\s-]/gu, '')
            .trim()
            .replace(/\s+/g, '-') || 'section'
    );
}

/** Strips inline markdown (links, emphasis, code) down to plain text. */
function plain(md: string) {
    return md
        .replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1')
        .replace(/[*_`~]/g, '')
        .trim();
}

/** ATX `##` / `###` headings outside code fences, with unique ids. */
export function extractHeadings(markdown: string): Heading[] {
    const out: Heading[] = [];
    const seen = new Map<string, number>();
    let fence: string | null = null;
    markdown.split(/\r?\n/).forEach((raw, i) => {
        const fenceMatch = raw.match(/^\s*(```|~~~)/);
        if (fenceMatch) {
            if (fence === null) fence = fenceMatch[1];
            else if (fenceMatch[1] === fence) fence = null;
            return;
        }
        if (fence !== null) return;
        const m = raw.match(/^(#{2,3})\s+(.+?)\s*#*\s*$/);
        if (!m) return;
        const text = plain(m[2]);
        const base = slugify(text);
        const n = seen.get(base) ?? 0;
        seen.set(base, n + 1);
        out.push({ depth: m[1].length as 2 | 3, text, id: n ? `${base}-${n}` : base, line: i + 1 });
    });
    return out;
}
