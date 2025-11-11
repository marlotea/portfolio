import React, { useState, useEffect } from 'react';
import pfp from '../assets/pfp.png';
import linkedin from '../assets/linkedin.png';
import github from '../assets/github.png';
import twitter from '../assets/twitter.png';

const Home: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 100);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section id="home">
            <div className="w-screen h-screen relative flex items-center justify-center text-black kaisei-decol-regular animate-fade-in">

                <div className="absolute inset-0 bg-gradient-to-tr from-[#93a5cf] to-[#e4efe9] transition-all duration-500" />

                <div
                    className={`absolute inset-0 bg-gray-100 transition-all duration-700 shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.1)]`}
                    style={{
                        clipPath: isScrolled
                            ? 'ellipse(100% 100% at 50% 100%)'
                            : 'ellipse(100% 0% at 50% 100%)',
                    }}
                />

                {/* Content */}
                <div className="relative z-10 flex flex-row space-x-15 w-2/3 justify-center p-8">
                    <div className="flex items-center justify-center text-[#648194]">
                        <img src={pfp} width="200px" className="rounded-full shadow-2xl" alt="Profile" />
                    </div>
                    <div className="flex flex-col justify-center space-y-2 w-1/2">
                        <div className="text-[2.5rem]">Leia H.J. Chen</div>
                        <div className="text-[1.1rem]">Software Engineering @ MountainMath Software</div>
                        <div className="mt-2">
                            Hey! I'm a third-year computer science student interested in machine learning, biotech, and robotics! Check
                            out what I do down below :)
                        </div>
                        <div className="flex flex-row space-x-3 mt-4">
                            <a href="https://www.linkedin.com/in/leiahjchen/" target="_blank" rel="noopener noreferrer">
                                <img
                                    className="w-[22px] cursor-pointer transition-transform duration-300 hover:scale-125"
                                    src={linkedin}
                                    alt="LinkedIn"
                                />
                            </a>
                            <a href="https://x.com/prxncssleia">
                                <img
                                    className="w-[20px] cursor-pointer transition-transform duration-300 hover:scale-125"
                                    src={twitter}
                                    alt="Twitter"
                                />
                            </a>
                            <a href="https://github.com/marlotea" target="_blank" rel="noopener noreferrer">
                                <img
                                    className="w-[22px] cursor-pointer transition-transform duration-300 hover:scale-125"
                                    src={github}
                                    alt="GitHub"
                                />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Home;