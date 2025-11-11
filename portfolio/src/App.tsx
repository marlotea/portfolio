import { useState, useRef, useEffect } from 'react'
import './App.css'
import Home from "./components/Home.tsx";
import About from "./components/About.tsx";
import Project from "./components/Project.tsx";
import Experience from "./components/Experience.tsx";
import Footer from './components/Footer.tsx';

function App() {
    const [activeTab, setActiveTab] = useState('Home');
    const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
    const navRef = useRef(null);
    const tabRefs = useRef({});

    const tabs = ['Home', 'About', 'Project', 'Experience'];

    useEffect(() => {
        const updateIndicator = () => {
            // @ts-ignore
            const activeElement = tabRefs.current[activeTab];
            if (activeElement && navRef.current) {
                // @ts-ignore
                const navRect = navRef.current.getBoundingClientRect();
                const tabRect = activeElement.getBoundingClientRect();
                setIndicatorStyle({
                    left: tabRect.left - navRect.left,
                    width: tabRect.width
                });
            }
        };

        updateIndicator();
        window.addEventListener('resize', updateIndicator);
        return () => window.removeEventListener('resize', updateIndicator);
    }, [activeTab]);

    useEffect(() => {
        const handleScroll = () => {
            const sections = tabs.map(tab => ({
                id: tab,
                element: document.getElementById(tab.toLowerCase())
            }));

            const scrollPosition = window.scrollY + window.innerHeight / 3;

            for (let i = sections.length - 1; i >= 0; i--) {
                const section = sections[i];
                if (section.element) {
                    const offsetTop = section.element.offsetTop;
                    if (scrollPosition >= offsetTop) {
                        setActiveTab(section.id);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, [tabs]);

    // @ts-ignore
    const scrollToSection = (tab) => {
        setActiveTab(tab);
        const element = document.getElementById(tab.toLowerCase());
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

        // @ts-ignore
    // @ts-ignore
    return (
    <div className="kaisei-decol-regular">
        <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
            <div
                ref={navRef}
                className="relative bg-white rounded-full shadow-lg px-2 py-2 flex gap-1"
            >
                <div
                    className="absolute bg-[#91ADC8] rounded-full transition-all duration-300 ease-out pointer-events-none"
                    style={{
                        left: `${indicatorStyle.left}px`,
                        width: `${indicatorStyle.width}px`,
                        top: '8px',
                        bottom: '8px'
                    }}
                />

                {tabs.map((tab) => (
                    <button
                        key={tab}
                        ref={(el) => {
                            if (el) {
                                // @ts-ignore
                                tabRefs.current[tab] = el;
                            }
                        }}
                        onClick={() => scrollToSection(tab)}
                        className={`relative z-10 px-6 py-2 text-sm font-medium transition-colors duration-300 border-0 bg-transparent outline-none ${
                            activeTab === tab
                                ? 'text-white'
                                : 'text-gray-600 hover:text-gray-400'
                        }`}
                        style={{ WebkitAppearance: 'none', appearance: 'none' }}
                    >
                        {tab}
                    </button>
                ))}
            </div>
        </nav>


        <Home></Home>
        <About></About>
        <Project></Project>
        <Experience></Experience>
        <Footer></Footer>
    </div>
  )
}

export default App
