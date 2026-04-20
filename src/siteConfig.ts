export interface SiteProject {
  title: string;
  category: string;
  description: string;
  outcome: string;
  stack: string[];
  videoUrl: string;
}

export interface SiteNavItem {
  id: string;
  label: string;
}

export interface SiteConfig {
  meta: {
    title: string;
    description: string;
    image: string;
    url: string;
  };
  brand: {
    name: string;
    badge: string;
    taglinePhrases: string[];
  };
  navigation: SiteNavItem[];
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    availabilityLabel: string;
    availability: string;
  };
  about: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
    highlights: string[];
    highlightValueLabel: string;
  };
  services: {
    eyebrow: string;
    title: string;
    items: Array<{
      title: string;
      description: string;
    }>;
  };
  skills: {
    eyebrow: string;
    title: string;
    groups: Array<{
      category: string;
      items: string[];
    }>;
  };
  projects: {
    eyebrow: string;
    title: string;
    intro: string;
    previewLabel: string;
    items: SiteProject[];
  };
  terminal: {
    eyebrow: string;
    title: string;
    intro: string;
    initialMessage: string;
    commands: Record<string, string[]>;
    quickCommands: string[];
    visualCommands: string[];
    panelLabel: string;
    panelDescription: string;
    visualsEnabledLabel: string;
    feedLabel: string;
    promptLabel: string;
    processingLabel: string;
    inputPlaceholder: string;
    unknownCommandPrefix: string;
    visualResponses: Record<string, string>;
  };
  contact: {
    eyebrow: string;
    title: string;
    description: string;
    methods: Array<{
      label: string;
      value: string;
      href?: string;
    }>;
  };
  footer: {
    left: string;
    right: string;
  };
  boot: {
    label: string;
    steps: string[];
    loadingLabel: string;
    readyLabel: string;
    queuedLabel: string;
  };
}

declare global {
  interface Window {
    __SITE_CONFIG__?: SiteConfig;
  }
}

export const defaultSiteConfig: SiteConfig = {
  meta: {
    title: 'Vantyx',
    description: 'Advanced Roblox scripting systems for scalable, performant, and production-ready games.',
    image: 'https://placehold.co/1200x630/png',
    url: 'https://example.com',
  },
  brand: {
    name: 'Vantyx',
    badge: 'Roblox Development',
    taglinePhrases: [
      'High-performance game systems',
      'Scalable backend architecture',
      'Built for production environments',
    ],
  },
  navigation: [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Systems' },
    { id: 'work', label: 'Projects' },
    { id: 'skills', label: 'Tech' },
    { id: 'about', label: 'About' },
    { id: 'terminal', label: 'Console' },
    { id: 'contact', label: 'Contact' },
  ],
  hero: {
    eyebrow: 'Roblox scripting & system design',
    title: 'Production-ready Roblox systems built for performance, scalability, and clean architecture.',
    description:
      'From DataStores and MemoryStore systems to gameplay mechanics and UI frameworks, everything is designed to be efficient, maintainable, and scalable across large player bases.',
    primaryCta: 'View projects',
    secondaryCta: 'Get in touch',
    availabilityLabel: 'Currently Working On',
    availability:
      'Game systems, backend logic, optimization, and advanced mechanics for Roblox experiences.',
  },
  about: {
    eyebrow: 'About',
    title: 'Focused on building clean, scalable systems for Roblox games',
    paragraphs: [
      'Vantyx specializes in backend systems, gameplay mechanics, and structured scripting designed for long-term scalability. Every system is written with performance and maintainability in mind.',
      'Projects include DataStore pipelines, MemoryStore systems, modular frameworks, and advanced gameplay logic. Code is structured to be expandable and production-ready.',
    ],
    highlights: [
      'Modular architecture',
      'Optimized performance',
      'Scalable systems',
      'Clean code structure',
    ],
    highlightValueLabel: 'Active Systems',
  },
  services: {
    eyebrow: 'What I Build',
    title: 'Core systems and mechanics for Roblox games',
    items: [
      {
        title: 'Backend systems',
        description:
          'DataStore, MemoryStore, and server-client architecture built for reliability, scaling, and data integrity.',
      },
      {
        title: 'Gameplay mechanics',
        description:
          'Custom systems like vehicles, combat, abilities, placement systems, and interactive environments.',
      },
      {
        title: 'Optimization & structure',
        description:
          'Refactoring, performance optimization, and modular scripting to improve efficiency and maintainability.',
      },
    ],
  },
  skills: {
    eyebrow: 'Site Sections',
    title: 'Core content areas you can customize',
    groups: [
      {
        category: 'Branding',
        items: ['Brand name', 'Badge text', 'Hero copy', 'Calls to action', 'Navigation labels'],
      },
      {
        category: 'Content',
        items: ['About text', 'Services', 'Features', 'Project entries', 'Footer copy'],
      },
      {
        category: 'Links',
        items: ['YouTube URLs', 'Email links', 'Phone links', 'Social links', 'Contact actions'],
      },
    ],
  },
  projects: {
    eyebrow: 'Featured Work',
    title: 'Project cards you can add, remove, and reorder from one file',
    intro:
      'Each card reads from this config, including the embedded video URL, so updating the showcase is straightforward.',
    previewLabel: 'Video preview',
    items: [
      {
        title: 'Spring Product Launch',
        category: 'Campaign Site',
        description:
          'A customer-facing launch page focused on product positioning, feature storytelling, and stronger conversion moments.',
        outcome: 'Built to make campaign updates easy without reworking the underlying layout.',
        stack: ['React', 'TypeScript', 'Tailwind', 'Framer Motion'],
        videoUrl: 'https://www.youtube.com/watch?v=3fumBcKC6RE',
      },
      {
        title: 'Service Overview Experience',
        category: 'Marketing Website',
        description:
          'A structured service page with modular content blocks, proof sections, and a clear contact path for new visitors.',
        outcome: 'Designed so sections can be refreshed quickly as the offer evolves.',
        stack: ['Responsive UI', 'Content modeling', 'Reusable sections', 'Animation'],
        videoUrl: 'https://www.youtube.com/watch?v=3fumBcKC6RE',
      },
      {
        title: 'Consumer App Waitlist Page',
        category: 'Acquisition Funnel',
        description:
          'A simple but polished page for introducing a product, explaining benefits, and directing users into a signup flow.',
        outcome: 'The content structure supports iteration without scattering copy across multiple files.',
        stack: ['Product messaging', 'CTA flow', 'Video embed', 'Editable config'],
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      },
    ],
  },
  terminal: {
    eyebrow: 'Quick Info',
    title: 'An interactive info panel with configurable responses',
    intro:
      'This section is still editable from the same config file, including command text, labels, and helper prompts.',
    initialMessage: 'Info panel ready. Type "help" to explore.',
    commands: {
      help: [
        'Available commands:',
        '  help      Show the command list',
        '  brand     Learn what this site is set up for',
        '  services  See the main content use cases',
        '  stack     View the editable site areas',
        '  contact   Get the configured contact options',
        '  confetti  Launch a confetti burst',
        '  fireworks Launch animated fireworks',
        '  matrix    Start a matrix code rain effect',
        '  glitch    Trigger a glitch pulse overlay',
        '  blackhole Open a black hole distortion',
        '  clear     Reset the panel',
      ],
      brand: ['This starter is configured for a consumer-facing website instead of a personal portfolio.'],
      services: ['Landing pages, product marketing, proof sections, and fast content updates from one config file.'],
      stack: ['Brand copy, projects, video links, contact methods, labels, and footer text all live in site-config.js.'],
      contact: ['Use the contact section below to swap in your preferred email, phone number, or social channels.'],
    },
    quickCommands: ['help', 'brand', 'services', 'stack', 'contact', 'matrix', 'glitch', 'blackhole'],
    visualCommands: ['confetti', 'fireworks', 'matrix', 'glitch', 'blackhole'],
    panelLabel: 'Command Panel',
    panelDescription: 'Interactive shortcuts, visuals, and quick site info',
    visualsEnabledLabel: 'Visual commands enabled',
    feedLabel: 'Terminal feed',
    promptLabel: 'Type a command',
    processingLabel: 'Checking...',
    inputPlaceholder: 'Try "help", "matrix", "glitch", or "blackhole"',
    unknownCommandPrefix: 'Unknown command:',
    visualResponses: {
      confetti: 'Confetti burst launched.',
      fireworks: 'Fireworks sequence launched.',
      matrix: 'Matrix code rain engaged.',
      glitch: 'Glitch pulse engaged.',
      blackhole: 'Black hole distortion opened.',
    },
  },
  contact: {
    eyebrow: 'Contact',
    title: 'Use any contact method that fits the brand',
    description:
      'These contact rows are also managed from the same config file, so you can replace them with email, phone, social, or support links.',
    methods: [{ label: 'Discord', value: 'dokja' }],
  },
  footer: {
    left: '',
    right: '',
  },
  boot: {
    label: 'Preparing website content',
    steps: [
      'Loading brand and hero copy',
      'Linking editable project videos',
      'Preparing service and contact sections',
      'Launching the site',
    ],
    loadingLabel: 'Loading',
    readyLabel: 'Ready',
    queuedLabel: 'Queued',
  },
};

export const siteConfig: SiteConfig = window.__SITE_CONFIG__ ?? defaultSiteConfig;
