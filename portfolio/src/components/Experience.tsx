import React, { useState, useRef, useEffect } from 'react';
import mountainmath from '../assets/mountainmath.png'
import igem from '../assets/igem.png'
import {Aperture, Briefcase, ChevronRight, ChevronDown, ChevronUp, Code, FlaskConical} from "lucide-react";

const experienceData = [
    {
        title: "Software Engineering Intern",
        company: "MountainMath Software",
        date: "May 2025 - Present",
        type: "Internship",
        details: ["Developed data visualization platform serving 4,000+ users including researchers and government officials for policy decisions and demographic analysis",
            "React, TypeScript, FastAPI, PostgreSQL, Deck.gl"],
        img: mountainmath,
        icon: Briefcase,
    },
    {
        title: "Firmware Developer",
        company: "UBC iGEM",
        date: "Aug 2025 - Present",
        type: "Club",
        details: ["Developed firmware for bioreactor drivers and bioprinter control systems working in AGILE development cycle",
            "Documented L298N motor driver firmware architecture and delivered weekly technical briefings to 80-member full team",
            "Rust"],
        img: igem,
        icon: FlaskConical,
    },
    {
        title: "VP of Marketing",
        company: "UBC AI Club",
        date: "Aug 2025 - Present",
        type: "Club",
        details: ["Plan, market, and host AI Speaker Series and Student Research Event",
            "Increased Instagram following by 40% through content creation and outreach to drive high event attendance",
            "Marketing, Team Coordination"],
        img: null,
        icon: Aperture,
    },
    {
        title: "AI Research",
        company: "Algoverse",
        date: "Nov 2024 - May 2025",
        type: "Research",
        details: ["Presented computer vision research on surgical applications at ACS Clinical Congress 2025",
            "Trained GNN to classify 6 surgical phases and 5 transition points HMR framework on OR videos",
            "PyTorch, Computer Vision, Conda"],
        img: null,
        icon: Code,
    },
    // {
    //     title: "Coding Instructor",
    //     company: "Code Ninjas",
    //     date: "Dec 2024 - May 2025",
    //     type: "Part-Time",
    //     details: ["Instructed students in JavaScript, Python, and Lua in a gamified learning environment"],
    //     img: null,
    //     icon: Clock,
    // },
    // {
    //     title: "EmpowHer Mentor",
    //     company: "UBC WiDS",
    //     date: "Oct 2024 - Apr 2025",
    //     type: "Club",
    //     details: ["Mentored first-year students on technical skills and navigating university life"],
    //     img: null,
    //     icon: BookOpen,
    // },
];

// Reusable component for the experience card (Horizontal - Desktop)
// @ts-ignore
const ExperienceCardHorizontal = ({ item, isFirst, getAnimatedClass, index }) => {
    const IconComponent = item.icon;
    const cardClass = getAnimatedClass(index);

    return (
        <div key={index} className={`flex flex-col space-y-4 h-full w-[300px] ${isFirst ? 'ml-20' : ''} ${cardClass}`}>

            {/* Timeline Dot & Icon */}
            <div className="relative w-full flex items-center justify-start pt-1">
                {/* Icon Container (positioned above the dot) */}
                <div className="absolute w-[40px] h-[40px] bg-[#91ADC8] rounded-full flex items-center justify-center -translate-x-1/2 top-1 left-5 shadow-md z-20">
                    {item.img ? (
                        <img className="w-[30px] h-[30px] rounded-full object-cover" src={item.img} alt={item.company} />
                    ) : (
                        <IconComponent className="w-[20px] h-[20px] text-white"/>
                    )}
                </div>
            </div>

            {/* Card Content */}
            <div className="flex flex-col justify-start bg-white p-6 rounded-xl w-full shadow-xl border-t-4 border-[#91ADC8] space-y-3 mt-12 transform transition duration-300 hover:shadow-2xl hover:-translate-y-1">
                <p className="text-xl font-bold text-[#475569]">{item.title}</p>
                <p className="text-lg text-[#91ADC8]">{item.company}</p>
                <p className="text-[#797979] text-sm italic">{item.date}</p>

                {/* Type Badge */}
                <span className="bg-[#EDF6FB] w-fit px-3 py-1 text-xs rounded-full font-medium text-[#475569] shadow-sm">{item.type}</span>

                {/* Details */}
                {item.details && item.details.length > 0 && (
                    <div className="flex flex-col pt-2 space-y-2 text-sm text-gray-700">
                        {item.details.map((detail: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined, detailIndex: React.Key | null | undefined) => (
                            <div key={detailIndex} className="flex flex-row items-start space-x-2">
                                <ChevronRight size={14} className="text-[#91ADC8] flex-shrink-0 mt-0.5"/>
                                <div>{detail}</div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

// Reusable component for the experience card (Vertical - Mobile)
// @ts-ignore
const ExperienceCardVertical = ({ item, getAnimatedClass, index }) => {
    const IconComponent = item.icon;
    const cardClass = getAnimatedClass(index);
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div key={index} className={`flex flex-row space-x-4 w-full ${cardClass}`}>
            {/* Timeline Line & Icon */}
            <div className="flex flex-col items-center">
                {/* Icon Container */}
                <div className="w-[40px] h-[40px] bg-[#91ADC8] rounded-full flex items-center justify-center shadow-md flex-shrink-0">
                    {item.img ? (
                        <img className="w-[30px] h-[30px] rounded-full object-cover" src={item.img} alt={item.company} />
                    ) : (
                        <IconComponent className="w-[20px] h-[20px] text-white"/>
                    )}
                </div>
                {/* Vertical Line */}
                {index < experienceData.length - 1 && (
                    <div className="w-[4px] h-full bg-[#D3DFE7] min-h-[100px]"></div>
                )}
            </div>

            {/* Card Content */}
            <div className="flex flex-col justify-start bg-white p-4 sm:p-6 rounded-xl w-full shadow-xl border-l-4 border-[#91ADC8] space-y-2 sm:space-y-3 mb-6">
                <p className="text-lg sm:text-xl font-bold text-[#475569]">{item.title}</p>
                <p className="text-base sm:text-lg text-[#91ADC8]">{item.company}</p>
                <p className="text-[#797979] text-xs sm:text-sm italic">{item.date}</p>

                {/* Type Badge */}
                <span className="bg-[#EDF6FB] w-fit px-2 sm:px-3 py-1 text-xs rounded-full font-medium text-[#475569] shadow-sm">{item.type}</span>

                {/* Details - Collapsible on Mobile */}
                {item.details && item.details.length > 0 && (
                    <>
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="flex items-center space-x-2 text-[#91ADC8] text-sm font-medium pt-2 hover:text-[#647FBC] transition-colors sm:hidden"
                        >
                            <span>{isExpanded ? 'Hide Details' : 'Show Details'}</span>
                            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>

                        {/* Mobile: Collapsible */}
                        <div className={`sm:hidden flex flex-col space-y-2 text-xs text-gray-700 overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-96 pt-2' : 'max-h-0'}`}>
                            {item.details.map((detail: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined, detailIndex: React.Key | null | undefined) => (
                                <div key={detailIndex} className="flex flex-row items-start space-x-2">
                                    <ChevronRight size={14} className="text-[#91ADC8] flex-shrink-0 mt-0.5"/>
                                    <div>{detail}</div>
                                </div>
                            ))}
                        </div>

                        {/* Desktop/Tablet: Always Visible */}
                        <div className="hidden sm:flex flex-col pt-2 space-y-2 text-sm text-gray-700">
                            {item.details.map((detail: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined, detailIndex: React.Key | null | undefined) => (
                                <div key={detailIndex} className="flex flex-row items-start space-x-2">
                                    <ChevronRight size={14} className="text-[#91ADC8] flex-shrink-0 mt-0.5"/>
                                    <div>{detail}</div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};


const Experience: React.FC = () => {
    // State and Ref for animation
    const [hasAnimated, setHasAnimated] = useState(false);
    const sectionRef = useRef(null);

    // Intersection Observer to trigger the animations once the section is visible
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated) {
                    setHasAnimated(true);
                }
            },
            { threshold: 0.2 } // Trigger when 20% of the section is visible
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

    // Helper to build the staggered animation class string
    const getAnimatedClass = (index: number) => {
        // Stagger the animation delay by 200ms per item
        const delay = (index + 1) * 200;
        // Cap the delay at 1200ms for safety, corresponding to the defined CSS classes
        const delayClass = `animate-delay-${Math.min(delay, 1200)}`;

        return hasAnimated ? `animated-item ${delayClass}` : 'opacity-0';
    };

    // Constant for timeline length (approximated based on 6 cards, spacing, and offsets)
    const TOTAL_TIMELINE_LENGTH = '2400px';

    return (
        <section id="experience" ref={sectionRef}>
            <style>
                {`
                /* Custom Keyframes for staggered slide-up fade-in animation */
                @keyframes slideUpFadeIn {
                    0% { opacity: 0; transform: translateY(20px); }
                    100% { opacity: 1; transform: translateY(0); }
                }

                .animated-item {
                    opacity: 0; /* Start invisible */
                    animation-name: slideUpFadeIn;
                    animation-duration: 0.6s;
                    animation-timing-function: ease-out;
                    animation-fill-mode: forwards;
                }

                /* Staggered delay classes (200ms interval for 6 cards) */
                .animate-delay-200 { animation-delay: 200ms; }
                .animate-delay-400 { animation-delay: 400ms; }
                .animate-delay-600 { animation-delay: 600ms; }
                .animate-delay-800 { animation-delay: 800ms; }
                .animate-delay-1000 { animation-delay: 1000ms; }
                .animate-delay-1200 { animation-delay: 1200ms; }

                /* Timeline Draw Animation */
                @keyframes drawLine {
                    from { width: 0; }
                    to { width: ${TOTAL_TIMELINE_LENGTH}; }
                }
                .timeline-bar-animate {
                    width: 0;
                    animation: drawLine 1.5s ease-out 0s forwards; /* 0s delay to start immediately */
                }
                `}
            </style>

            {/* Desktop Horizontal Timeline */}
            <div className="hidden lg:block w-full h-screen bg-gray-100 overflow-x-auto text-black kaisei-decol-regular">
                <div className="flex items-center justify-start h-full">
                    <div className="flex flex-col space-y-[-26px] items-start ml-6 lg:ml-10 h-1/2 min-w-max pr-40">
                        {/* Timeline Container (Relative positioning for the bars) */}
                        <div className="relative w-full">
                            {/* Base Timeline Bar (Gray Track) */}
                            <div className="h-[9px] bg-[#D3DFE7] w-full rounded-full"/>

                            {/* Animated Drawing Bar (Blue Track) */}
                            <div
                                className={`absolute top-0 h-[9px] bg-[#91ADC8] rounded-full transform origin-left ${hasAnimated ? 'timeline-bar-animate' : ''}`}
                                style={{ width: TOTAL_TIMELINE_LENGTH }}
                            />
                        </div>

                        {/* The main experience content row */}
                        <div className="space-x-20 flex flex-row h-full justify-start items-center relative z-10">
                            {experienceData.map((item, index) => (
                                <ExperienceCardHorizontal
                                    key={index}
                                    item={item}
                                    index={index}
                                    isFirst={index === 0}
                                    getAnimatedClass={getAnimatedClass}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Vertical Timeline */}
            <div className="lg:hidden w-full min-h-screen bg-gray-100 flex items-center justify-center text-black kaisei-decol-regular py-16 px-4">
                <div className="flex flex-col w-full max-w-2xl">
                    {experienceData.map((item, index) => (
                        <ExperienceCardVertical
                            key={index}
                            item={item}
                            index={index}
                            getAnimatedClass={getAnimatedClass}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
