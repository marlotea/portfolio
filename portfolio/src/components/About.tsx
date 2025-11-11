import React, { useState, useEffect, useRef } from 'react';

// NOTE: The style block for the blinking cursor is included here for completeness,
// but should ideally remain in your global setup or a separate CSS file.

// Add blinking cursor animation (for demonstration, assume this is in your global setup)
const style = document.createElement('style');
style.textContent = `
  @keyframes blink {
    0%, 49% { opacity: 1; }
    50%, 100% { opacity: 0; }
  }
  .animate-blink {
    animation: blink 1s step-end infinite;
  }

  /* Custom Staggered Animation CSS (from Step 1) */
  @keyframes fadeInUp {
      0% {
          opacity: 0;
          transform: translateY(10px);
      }
      100% {
          opacity: 1;
          transform: translateY(0);
      }
  }

  .animated-item {
      opacity: 0;
      animation-name: fadeInUp;
      animation-duration: 0.6s;
      animation-timing-function: ease-out;
      animation-fill-mode: forwards;
  }

  /* Staggered delay classes */
  .animate-delay-100 { animation-delay: 100ms; }
  .animate-delay-200 { animation-delay: 200ms; }
  .animate-delay-300 { animation-delay: 300ms; }
  .animate-delay-400 { animation-delay: 400ms; }
  .animate-delay-500 { animation-delay: 500ms; }
  .animate-delay-600 { animation-delay: 600ms; }
  .animate-delay-700 { animation-delay: 700ms; }
  .animate-delay-800 { animation-delay: 800ms; }

`;
if (!document.head.querySelector('style[data-custom-animations]')) {
    style.setAttribute('data-custom-animations', 'true');
    document.head.appendChild(style);
}

const About: React.FC = () => {
    const [displayText, setDisplayText] = useState('');
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [hasAnimated, setHasAnimated] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    const texts = [
        { line1: "Hi,", line2: " I'm Leia!" },
        { line1: "你好，", line2: "我是 Leia！" }
    ];

    // Intersection Observer to trigger the animations
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated) {
                    setHasAnimated(true);
                }
            },
            { threshold: 0.5 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, [hasAnimated]);

    // Typing animation logic (remains unchanged)
    useEffect(() => {
        if (!hasAnimated) return;

        const currentText = texts[currentTextIndex];
        const fullText = currentText.line1 + currentText.line2;

        // SPEED CONTROLS:
        const typingSpeed = isDeleting ? 100 : 100;
        const deletingSpeed = 80;
        const pauseBeforeDelete = 2000;
        const pauseBeforeType = 500;

        const speed = isDeleting ? deletingSpeed : typingSpeed;

        const timeout = setTimeout(() => {
            if (!isDeleting) {
                if (displayText.length < fullText.length) {
                    setDisplayText(fullText.slice(0, displayText.length + 1));
                } else {
                    setTimeout(() => setIsDeleting(true), pauseBeforeDelete);
                }
            } else {
                if (displayText.length > 0) {
                    setDisplayText(fullText.slice(0, displayText.length - 1));
                } else {
                    setIsDeleting(false);
                    setCurrentTextIndex((prev) => (prev + 1) % texts.length);
                    setTimeout(() => {}, pauseBeforeType);
                }
            }
        }, speed);

        return () => clearTimeout(timeout);
    }, [displayText, isDeleting, currentTextIndex, hasAnimated]);


    // Helper function to build the class string conditionally
    const getAnimatedClass = (delayClass: string) =>
        `${hasAnimated ? 'animated-item ' : ''}${delayClass}`;

    return (
        <section id="about" ref={sectionRef}>
            <div className="w-screen h-screen bg-gray-100 flex items-center justify-center text-black kaisei-decol-regular">
                <div className="flex flex-row items-center justify-center space-x-8 w-full">
                    {/* LEFT SECTION (Typing Animation) - No changes needed here, as the typing itself acts as a focus */}
                    <div className="text-[3rem] text-right w-1/5 h-[9rem]">
                        <div className="flex flex-col items-end">
                            <span className="whitespace-nowrap">
                                {displayText.slice(0, texts[currentTextIndex].line1.length)}
                                {displayText.length < texts[currentTextIndex].line1.length && (
                                    <span className="inline-block w-[3px] h-[2.5rem] bg-black animate-blink ml-1"></span>
                                )}
                            </span>
                            <span className="whitespace-nowrap">
                                {displayText.slice(texts[currentTextIndex].line1.length)}
                                {displayText.length >= texts[currentTextIndex].line1.length && (
                                    <span className="inline-block w-[3px] h-[2.5rem] bg-black animate-blink ml-1"></span>
                                )}
                            </span>
                        </div>
                    </div>

                    {/* RIGHT SECTION (Staggered Fade-in) */}
                    <div className="space-y-8">
                        {/* Group 1: I am currently a... */}
                        <div className={`space-y-4 ${getAnimatedClass('animate-delay-100')}`}>
                            {/*  kaisei-decol-bold text-[#648194]  */}
                            <p className="text-md space-grotesk-normal bg-gradient-to-r from-[#647FBC] to-[#AED6CF] inline-block text-transparent bg-clip-text">I am currently a...</p>
                            <div>
                                <div className={`flex flex-row space-x-1 ${getAnimatedClass('animate-delay-200')}`}>
                                    <p>B. Sc. Computer Science</p><p className="text-[#919191]"> @ UBC</p>
                                </div>
                                <div className={`flex flex-row space-x-1 ${getAnimatedClass('animate-delay-300')}`}>
                                    <p>Software Engineering</p><p className="text-[#919191]">@ MountainMath Software</p>
                                </div>
                                <div className={`flex flex-row space-x-1 ${getAnimatedClass('animate-delay-400')}`}>
                                    <p>Firmware Developer</p><p className="text-[#919191]"> @ UBC iGEM</p>
                                </div>
                            </div>
                        </div>

                        {/* Group 2: Talk to me about... */}
                        <div className={`space-y-4 ${getAnimatedClass('animate-delay-400')}`}>
                            {/* background-image: linear-gradient(to top, #bdc2e8 0%, #bdc2e8 1%, #e6dee9 100%); */}
                            <p className="text-md space-grotesk-normal bg-gradient-to-r from-[#647FBC] to-[#AED6CF] inline-block text-transparent bg-clip-text">
                                Talk to me about...
                            </p>
                            <div>
                                <p className={getAnimatedClass('animate-delay-600')}>📊 ML Engineering</p>
                                <p className={getAnimatedClass('animate-delay-700')}>🧬 Biotechnology</p>
                                <p className={getAnimatedClass('animate-delay-800')}>🧠 Development of AI</p>
                            </div>
                        </div>

                        {/* Group 3: I also like... */}
                        <div className={`space-y-4 ${getAnimatedClass('animate-delay-700')}`}>
                            <p className="text-md space-grotesk-normal bg-gradient-to-r from-[#647FBC] to-[#AED6CF] inline-block text-transparent bg-clip-text">I also like...</p>
                            <div>
                                <p className={getAnimatedClass('animate-delay-1000')}>🥘 cooking when I don't have to</p>
                                <p className={getAnimatedClass('animate-delay-1100')}>🎨 splashing colours</p>
                                <p className={getAnimatedClass('animate-delay-1200')}>🖋️ temporarily tattooing my friends</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;