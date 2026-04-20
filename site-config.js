window.__SITE_CONFIG__ = {
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
      'Built for highest quality',
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
    eyebrow: 'Roblox scripting',
    title: 'Production-ready Roblox systems built for performance, scalability, and exapnsion.',
    description:
      'From DataStores and MemoryStore systems to gameplay mechanics and full games, everything is designed to be efficient, maintainable, and scalable across large player bases.',
    primaryCta: 'View projects',
    secondaryCta: 'Get in touch',
    availabilityLabel: 'Currently Working On',
    availability:
      'Creating full games from scratch aswell as standalone systems and fixing bug s.',
  },
  about: {
    eyebrow: 'About',
    title: 'Focused on building clean, scalable systems for Roblox games',
    paragraphs: [
      'Vantyx specializes in backend systems, gameplay mechanics, and structured scripting designed for long-term scalability. Every system is written with performance and maintainability in mind.',
      'Projects include DataStore pipelines, MemoryStore systems, modular frameworks,full games, simulators,economy,car driving systems, fighting systems, movement systems,ability systems,npcs ai systems, building systems, inventory systems,quest systems, quests systems,queue sytems, anticheat systems,party system,frontend systems and more . Code is structured to be expandable and production-ready.',
    ],
    highlights: [
      'Modular architecture',
      'Optimized performance',
      'Scalable systems',
      'Clean code structure',
      'Easily expandabl',
    ],
    highlightValueLabel: 'ready',
  },
  services: {
    eyebrow: 'What I Build',
  title: 'Production-ready systems and mechanics for Roblox games',
  items: [
    {
      title: 'Backend & Data Systems',
      description:
        'Scalable DataStore pipelines, MemoryStore-driven systems, global economies, queue systems, and secure server-client architectures designed for reliability, persistence, and high player counts.',
    },
    {
      title: 'Gameplay Systems',
      description:
        'Advanced mechanics including vehicles, combat, abilities, movement systems, NPC AI, building systems, inventories, quests, and fully integrated gameplay loops for complete experiences.',
    },
    {
      title: 'Multiplayer & Infrastructure',
      description:
        'Party systems, matchmaking, round systems, server synchronization, and cross-server communication built for smooth multiplayer experiences and scalable game architecture.',
    },
    {
      title: 'Security & Optimization',
      description:
        'Anti-cheat systems, server validation, performance optimization, and structured scripting focused on stability, exploit prevention, and efficient execution.',
    },
    {
      title: 'Frontend & UI Systems',
      description:
        'Dynamic, modular UI frameworks, shop systems, feedback systems, and responsive interfaces that integrate seamlessly with backend logic.',
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
      'Each card reads from this config, including the outbound video link, so updating the showcase is straightforward.',
    previewLabel: 'Video link',
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
