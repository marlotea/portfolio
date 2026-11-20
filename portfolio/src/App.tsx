import Experience from './components/Experience.tsx';
import Footer from './components/Footer.tsx';
import Hero from './components/Hero.tsx';
import Projects from './components/Projects.tsx';
import Section from './components/Section.tsx';
import TopBar from './components/TopBar.tsx';
import { sections } from './content.ts';
import { useActiveSection } from './lib/useActiveSection.ts';

const [EXPERIENCE, PROJECTS] = sections;

function App() {
    const active = useActiveSection(sections.map((s) => s.id));

    return (
        <div className="min-h-screen bg-paper">
            <a
                href="#main"
                className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded focus:bg-ink focus:px-3 focus:py-2 focus:font-mono focus:text-xs focus:text-paper"
            >
                Skip to content
            </a>
            <TopBar active={active} />
            <main id="main" className="mx-auto max-w-[1248px] px-6 pt-8 lg:pt-14">
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
                    </div>
                </div>
                <Footer />
            </main>
        </div>
    );
}

export default App;
