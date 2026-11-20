import { site } from '../content.ts';

export default function Footer() {
    return (
        <footer className="hairline mt-20 border-t py-8 font-mono text-[11px] text-muted">
            © {site.copyrightYear} {site.name}
        </footer>
    );
}
