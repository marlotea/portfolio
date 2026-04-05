import React, { useState, useEffect } from 'react';

const Footer: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            { threshold: 0.1 }
        );

        const footerElement = document.getElementById('footer');
        if (footerElement) {
            observer.observe(footerElement);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div id="footer" className="relative bg-gray-100 justify-center pt-20 sm:pt-30 pb-12 sm:pb-20 text-black kaisei-decol-regular space-y-4 overflow-hidden">
            <div
                className="absolute inset-0 transition-all duration-700 "
                style={{
                    background: 'linear-gradient(45deg, #93a5cf 0%, #e4efe9 100%)',
                    clipPath: isVisible
                        ? 'ellipse(100% 100% at 50% 100%)' // background-image: linear-gradient(45deg, #93a5cf 0%, #e4efe9 100%);
                        : 'ellipse(100% 0% at 50% 100%)',
                }}
            />

            <div className="relative z-10 flex flex-col items-center px-4">
                <p className="text-sm sm:text-base text-center">feel free to reach out vi
                    <a href="https://www.linkedin.com/in/leiahjchen/" target="_blank" rel="noopener noreferrer" className="hover:underline">
                        a LinkedIn! 🤍
                    </a>
                </p>

                {/*<p>*/}
                {/*    <a href="https://x.com/prxncssleia">*/}
                {/*        follow me on X (formerly Twitter) @prxncssleia*/}
                {/*    </a> for more frequent updates*/}
                {/*</p>*/}

                <p className="mt-6 sm:mt-8 text-sm sm:text-base">⟡•—— ・ ₊˚🕯️♱‧₊˚. ・ ——•⟡</p>
            </div>
        </div>
    );
};

export default Footer;