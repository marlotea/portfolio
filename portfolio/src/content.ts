// All editable site copy lives here.
// Inline markup in strings: **bold** renders as emphasized text, [label](url) renders as a link.

// TODO: replace with the real resume URL (e.g. a PDF in /public) once it exists.
export const RESUME_URL = '#';

export const EMAIL = 'leiahjchen@gmail.com';

export const site = {
    wordmark: 'lc.',
    name: 'Leia Chen',
    greeting: "Hi, I'm Leia!",
    copyrightYear: 2026,
};

export type Callout = {
    letter: string;
    text: string;
    /** Shorter variant used on the compact (mobile) figure. */
    short?: string;
};

export const callouts: Callout[] = [
    { letter: 'a', text: '4th-year CS @ UBC' },
    { letter: 'b', text: 'brain data & BCI software' },
    { letter: 'c', text: "SWE intern · Summer/Fall '27", short: "SWE intern · S/F '27" },
];

export const profile: string[] = [
    "I'm a 4th-year CS student at UBC looking for a **software engineering internship in Summer or Fall 2027**.",
    'I build software for brain data, from tools for neural data management, processing, and training, to embedded firmware for prosthetics that reads signals to ML pipelines. I also develop for **nwPlus** and **UBC Bionics**. I want to work on the **software side of brain-computer interfaces**.',
    `Projects and experiences below, and my resume is [here](${RESUME_URL}). Reach me at [${EMAIL}](mailto:${EMAIL}).`,
];

export type LinkIcon = 'linkedin' | 'github' | 'resume' | 'email';

export type ProfileLink = {
    label: string;
    href: string;
    icon: LinkIcon;
};

export const links: ProfileLink[] = [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/leiahjchen/', icon: 'linkedin' },
    { label: 'GitHub', href: 'https://github.com/marlotea', icon: 'github' },
    { label: 'Resume', href: RESUME_URL, icon: 'resume' },
    { label: 'Email', href: `mailto:${EMAIL}`, icon: 'email' },
];

export type ExperienceItem = {
    id: string;
    role: string;
    org: string;
    date: string;
    tags: string[];
    description: string;
    also?: string[];
};

export const experience: ExperienceItem[] = [
    {
        id: 'nc4',
        role: 'Undergraduate Researcher',
        org: 'NC4 Lab',
        date: 'Sep 2026 — Present',
        tags: ['Computational Neuroscience', 'Kernel Compute'],
        description:
            'Working with Dr. Khanh Dao Duc and Dr. Manu Madhav on exploring correlations between brain regions over time on **CEBRA latent representations** with Stratified Joint Gromov-Wasserstein Optimal Transport.',
        also: [
            'Building **EphyvisVR**: neural data playback visualization application with **Unity** and **Python**.',
        ],
    },
    {
        id: 'nwplus',
        role: 'Software Developer',
        org: 'nwPlus',
        date: 'Apr 2026 — Present',
        tags: ['TypeScript', 'CI/CD', 'Agentic Workflow'],
        description:
            "Hosting Western Canada's premier hackathons. Led **Hacker Wrapped** — a personalized review of every participant's experience at the end of the hackathon, for 600+ participants, to promote hacker–event connections.",
    },
    {
        id: 'bionics',
        role: 'Software Team Member',
        org: 'UBC Bionics',
        date: 'Jan 2026 — Present',
        tags: ['Machine Learning', 'Deep Learning'],
        description:
            'Built and launched an internal neural data management tool for preprocessing, training, and evaluation for **NERV** (brain-computer interface project), adopted from my personal project, using TypeScript and Python. Implemented a Real-Time Operating System (RTOS) for **GRASP** (arm prosthetics project), plus the pipeline and model for signal decoding and decision making.',
    },
];

export type ProjectItem = {
    id: string;
    title: string;
    description: string;
    href?: string;
    /** Optional screenshot; when omitted a generated contour placeholder is shown. */
    image?: string;
    imageAlt?: string;
    tint: 'navy' | 'violet';
};

export const projects: ProjectItem[] = [
    {
        id: 'lazarus',
        title: 'lazarus',
        description: 'Neural data management platform.',
        href: undefined, // TODO: add the lazarus project link
        tint: 'navy',
    },
    {
        id: 'agent-process-manager',
        title: 'agent process manager',
        description: 'TODO: one-line description.', // TODO: write the real one-line description
        href: undefined, // TODO: add the agent process manager project link
        tint: 'violet',
    },
];

export const sections = [
    { id: 'experience', num: '01', title: 'Experience' },
    { id: 'projects', num: '02', title: 'Projects' },
    { id: 'writing', num: '03', title: 'Writing' },
] as const;

export type SectionId = (typeof sections)[number]['id'];
