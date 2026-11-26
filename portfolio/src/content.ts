// All editable site copy lives here.
// Inline markup in strings: **bold** renders as emphasized text, [label](url) renders as a link.

// The PDF lives at public/Leia_Chen_Resume.pdf. Relative (no leading slash) so it works under any base path.
export const RESUME_URL = 'Leia_Chen_Resume.pdf';

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
    'I build software for brain data, from tools for neural data management, processing, and training, to embedded firmware for prosthetics that reads signals to ML pipelines. I also develop for [nwPlus](#exp-nwplus) and [UBC Bionics](#exp-bionics). I want to work on the **software side of brain-computer interfaces**.',
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
    /** Organization website; the org name links here. */
    orgHref?: string;
    date: string;
    kind: 'Lab' | 'Club' | 'Internship';
    tags: string[];
    description: string;
    also?: string[];
};

export const experience: ExperienceItem[] = [
    {
        id: 'nc4',
        role: 'Undergraduate Researcher',
        org: 'NC4 Lab',
        orgHref: 'https://www.nc4.sbme.ubc.ca/',
        kind: 'Lab',
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
        orgHref: 'https://nwplus.io/',
        kind: 'Club',
        date: 'Apr 2026 — Present',
        tags: ['TypeScript', 'CI/CD', 'Agentic Workflow'],
        description:
            "Hosting Western Canada's premier hackathons. Led [Hacker Wrapped](#/writing/hacker-wrapped) — a personalized review of every participant's experience at the end of the hackathon, for 1000+ participants, to promote hacker–event connections.",
        also: ['Managing internal and external tools.'],
    },
    {
        id: 'bionics',
        role: 'Software Developer',
        org: 'UBC Bionics',
        orgHref: 'https://www.ubcbionics.com/',
        kind: 'Club',
        date: 'Jan 2026 — Present',
        tags: ['Machine Learning', 'Deep Learning'],
        description:
            'Built internal neural data management tool for [NERV](https://www.ubcbionics.com/projects) (brain-computer interface project).',
        also: [
            'Manage [GRASP](https://www.ubcbionics.com/projects) (arm prosthetics project) firmware and design EMG signal to motor decision model.',
        ],
    },
    {
        id: 'mountainmath',
        role: 'Software Development Intern',
        org: 'MountainMath Software',
        kind: 'Internship',
        date: 'Sep 2025 — Apr 2026',
        tags: ['TypeScript', 'FastAPI', 'PostgreSQL', 'nginx'],
        description:
            'Developed and launched **CensusMapper 2.0**, an interactive web mapping tool that visualizes Statistics Canada census data, serving 10k+ users.',
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
    /** Slug of a writing post about the project, shown as a secondary link under the card. */
    post?: string;
};

export const projects: ProjectItem[] = [
    {
        id: 'lazarus',
        title: 'lazarus',
        description: 'Neural data management platform.',
        href: 'https://github.com/marlotea/lazarus',
        tint: 'navy',
    },
    {
        id: 'seigyo',
        title: 'seigyo',
        description: 'Agent process manager with Rust',
        href: 'https://github.com/KentoBaguetti/seigyo',
        tint: 'violet',
    },
    {
        id: 'hacker-wrapped',
        title: 'Hacker Wrapped',
        description: 'Spotify Wrapped, but for hackathons',
        href: '#/writing/hacker-wrapped',
        tint: 'navy',
    },
    {
        id: 'neuro-job-notifier',
        title: 'neuro job notifier',
        description: 'Job searching, newsletter & list tool',
        href: 'https://marlotea.github.io/neuro-job-notifier/',
        image: 'writing/neuro-job-notifier.jpg',
        imageAlt: 'The Neuro Jobs site: a list of open neurotech roles beside search and role-type filters',
        tint: 'violet',
        post: 'enjoying-the-process-of-things',
    },
];

export const sections = [
    { id: 'experience', num: '01', title: 'Experience' },
    { id: 'projects', num: '02', title: 'Projects' },
    { id: 'writing', num: '03', title: 'Writing' },
] as const;
