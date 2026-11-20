import { useEffect } from 'react';
import { posts, WRITING_HREF } from './blog.ts';
import Experience from './components/Experience.tsx';
import Footer from './components/Footer.tsx';
import Hero from './components/Hero.tsx';
import PostList from './components/PostList.tsx';
import Projects from './components/Projects.tsx';
import Section from './components/Section.tsx';
import TopBar from './components/TopBar.tsx';
import { PostPage, WritingIndex } from './components/WritingPages.tsx';
import { sections, site } from './content.ts';
import { useActiveSection } from './lib/useActiveSection.ts';
import { parseHash, useHash } from './lib/useHashRoute.ts';

const [EXPERIENCE, PROJECTS, WRITING] = sections;

function Home() {
    return (
        <div className="lg:grid lg:grid-cols-[minmax(0,540fr)_minmax(0,560fr)] lg:gap-[clamp(40px,7vw,100px)]">
            <div>
                <Hero />
            </div>
            <div className="mt-16 space-y-16 lg:mt-0">
                <Section {...EXPERIENCE}>
                    <Experience />
                </Section>
                <Section {...PROJECTS}>
                    <Projects />
                </Section>
                <Section {...WRITING}>
                    <div className="hairline border-t">
                        <PostList items={posts.slice(0, 3)} />
                    </div>
                    <a href={WRITING_HREF} className="mt-4 inline-block font-mono text-[11px] text-navy hover:text-violet">
                        All posts →
                    </a>
                </Section>
            </div>
        </div>
    );
}

function App() {
    const hash = useHash();
    const route = parseHash(hash);
    const isHome = route.name === 'home';
    const anchor = route.name === 'home' ? route.anchor : null;
    const active = useActiveSection(
        sections.map((s) => s.id),
        isHome,
    );

    // Hash routing replaces the browser's own anchor scrolling when the target
    // only exists after the route renders (e.g. Post -> #projects).
    useEffect(() => {
        const el = anchor ? document.getElementById(anchor) : null;
        if (el) el.scrollIntoView();
        else window.scrollTo(0, 0);
    }, [hash, anchor]);

    useEffect(() => {
        document.title =
            route.name === 'post'
                ? `${posts.find((p) => p.slug === route.slug)?.title ?? 'Post'} · ${site.name}`
                : route.name === 'writing'
                  ? `Writing · ${site.name}`
                  : site.name;
    });

    return (
        <div className="min-h-screen bg-paper">
            <a
                href="#main"
                onClick={(e) => {
                    // Plain #main would be treated as a home-page anchor by the hash router.
                    e.preventDefault();
                    document.getElementById('main')?.focus();
                }}
                className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded focus:bg-ink focus:px-3 focus:py-2 focus:font-mono focus:text-xs focus:text-paper"
            >
                Skip to content
            </a>
            <TopBar active={active} />
            <main id="main" tabIndex={-1} className="mx-auto outline-none max-w-[1248px] px-6 pt-8 lg:pt-14">
                {route.name === 'home' && <Home />}
                {route.name === 'writing' && <WritingIndex />}
                {route.name === 'post' && <PostPage slug={route.slug} />}
                <Footer />
            </main>
        </div>
    );
}

export default App;
