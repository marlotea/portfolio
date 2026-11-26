/** Off-site links and PDFs open in a new tab. */
export function externalProps(href: string) {
    return /^https?:\/\//.test(href) || /\.pdf$/i.test(href) ? { target: '_blank', rel: 'noopener noreferrer' } : {};
}
