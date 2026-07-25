window.__SITE_CONFIG__ = {
  meta: {
    title: 'Vantyx | Roblox Systems Developer',
    description: 'Roblox systems portfolio for Vantyx, focused on scalable backend logic, secure gameplay systems, movement, combat, AI, and production-ready game architecture.',
    image: 'https://i.ytimg.com/vi/PsKBOt1Od14/maxresdefault.jpg',
    url: 'https://fundeveloperde.github.io/project/',
  },
  brand: {
    name: 'Vantyx',
    badge: 'Roblox systems developer',
    taglinePhrases: [
      'Server-authoritative systems',
      'Responsive gameplay mechanics',
      'Production-minded architecture',
    ],
  },
  navigation: [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Systems' },
    { id: 'work', label: 'Projects' },
    { id: 'skills', label: 'Stack' },
    { id: 'about', label: 'About' },
    { id: 'terminal', label: 'Panel' },
    { id: 'contact', label: 'Contact' },
  ],
  hero: {
    eyebrow: 'Roblox scripting and system design',
    title: 'I build Roblox systems that feel smooth to play and sane to maintain.',
    description:
      'I focus on backend logic, gameplay mechanics, optimization, and modular frameworks for Roblox experiences that need to scale without turning into fragile scripts.',
    primaryCta: 'Watch the work',
    secondaryCta: 'Message me',
    availabilityLabel: 'Current focus',
    availability:
      'Full Roblox experiences, standalone gameplay systems, backend services, secure remotes, and performance cleanup.',
  },
  about: {
    eyebrow: 'About',
    title: 'Clean systems, sharp gameplay, fewer surprises after launch',
    paragraphs: [
      'Vantyx builds Roblox systems with a strong bias toward server authority, clear module boundaries, and code that can survive real players. The goal is simple: mechanics should feel good, data should stay safe, and future changes should not be painful.',
      'Recent work includes DataStore pipelines, MemoryStore systems, cross-server control, procedural worlds, combat, movement, vehicles, quests, inventories, NPC AI, building systems, UI flows, anti-cheat validation, and full game loops.',
    ],
    highlights: [
      'Server authority',
      'Exploit-resistant remotes',
      'Modular codebases',
      'Performance profiling',
      'Expandable systems',
    ],
    highlightValueLabel: 'Ready',
  },
  services: {
    eyebrow: 'What I build',
    title: 'Systems that hold up when players start pushing them',
    items: [
      {
        title: 'Backend and data',
        description:
          'DataStore pipelines, MemoryStore queues, economies, cross-server messaging, web integrations, and secure server-client architecture.',
      },
      {
        title: 'Gameplay systems',
        description:
          'Movement, combat, abilities, vehicles, building, inventory, quests, NPC AI, and complete gameplay loops built around responsive feel.',
      },
      {
        title: 'Multiplayer infrastructure',
        description:
          'Party systems, matchmaking, round flow, server synchronization, admin tooling, and live coordination across active servers.',
      },
      {
        title: 'Security and optimization',
        description:
          'Remote validation, anti-cheat checks, exploit prevention, performance cleanup, and refactors that make large systems easier to reason about.',
      },
      {
        title: 'Frontend and UI',
        description:
          'Modular Roblox UI systems for shops, feedback, dashboards, inventories, and player-facing flows that stay connected to backend logic.',
      },
    ],
  },
  skills: {
    eyebrow: 'Stack and specialties',
    title: 'The practical parts I reach for most',
    groups: [
      {
        category: 'Systems',
        items: [
          'Backend architecture',
          'Gameplay mechanics',
          'Procedural generation',
          'Cross-server control',
          'Optimization',
        ],
      },
      {
        category: 'Specialties',
        items: [
          'Combat and FPS systems',
          'Movement and traversal',
          'Inventory and quests',
          'NPC AI',
          'Anti-cheat validation',
        ],
      },
      {
        category: 'Tools',
        items: [
          'Roblox Luau',
          'DataStore',
          'MemoryStore',
          'HTTPService',
          'Modular frameworks',
        ],
      },
    ],
  },
  projects: {
    eyebrow: 'Featured work',
    title: 'A few systems from the lab',
    intro:
      'Each project shows a different side of the work: traversal feel, secure admin tooling, procedural content, rendering experiments, and first-person responsiveness.',
    previewLabel: 'Video',
    items: [
      {
        title: 'Spider-Man Movement System',
        category: 'Traversal system',
        description:
          'A physics-based traversal system with web swinging, wall running, surface climbing, dynamic camera tilt, and motion feedback.',
        outcome:
          'Built for responsive high-speed movement with stable transitions between swinging, sprinting, climbing, and wall running.',
        stack: ['Roblox Luau', 'Physics', 'Raycasting', 'Camera systems', 'Input handling'],
        videoUrl: 'https://youtu.be/PsKBOt1Od14',
      },
      {
        title: 'FPS Pistol System',
        category: 'First-person combat',
        description:
          'A viewmodel-based pistol system with responsive firing, synchronized animation, camera handling, and accurate raycast hit detection.',
        outcome:
          'Designed to make first-person gunplay feel fast and readable while keeping hit logic predictable.',
        stack: ['Roblox Luau', 'Viewmodels', 'Raycasting', 'Camera control', 'Input handling'],
        videoUrl: 'https://youtu.be/V3xgPGcSTic',
      },
      {
        title: 'Web-Based Game Administration',
        category: 'Live operations',
        description:
          'A web-to-game administration system that lets authorized admins manage live Roblox servers from an external interface.',
        outcome:
          'Built around centralized control, authentication, real-time command execution, and cross-server synchronization.',
        stack: ['Roblox Luau', 'HTTPService', 'Web API', 'Cross-server messaging', 'Authentication'],
        videoUrl: 'https://youtu.be/zKCMLSKQytY',
      },
      {
        title: 'Procedural Terrain Generation',
        category: 'World generation',
        description:
          'A chunk-based terrain system that generates biome-specific environments, trees, structures, and scattered objects.',
        outcome:
          'Built for scalable world generation with consistent biome distribution, dynamic variation, and performance-conscious loading.',
        stack: ['Roblox Luau', 'Procedural generation', 'Noise', 'Chunk loading', 'Asset spawning'],
        videoUrl: 'https://youtu.be/rTRbfrchyrE',
      },
      {
        title: 'Raycast Rendering System',
        category: 'Rendering experiment',
        description:
          'A custom renderer that uses raycasts to project scene information inside Roblox and react to surfaces, geometry, and lighting.',
        outcome:
          'Built as a real-time visual simulation driven by ray-based calculations and environmental lighting.',
        stack: ['Roblox Luau', 'Raycasting', 'Rendering logic', 'Lighting simulation', 'Optimization'],
        videoUrl: 'https://youtu.be/JkfpLhObRBQ',
      },
    ],
  },
  terminal: {
    eyebrow: 'Quick panel',
    title: 'A small interactive systems panel',
    intro:
      'Use the commands to skim the systems, backend approach, gameplay focus, stack, and contact details without leaving the page.',
    initialMessage: 'Panel ready. Type "help" to explore available commands.',
    commands: {
      help: [
        'Available commands:',
        '  help      Show the command list',
        '  systems   View core systems and mechanics',
        '  backend   Learn about backend and infrastructure',
        '  gameplay  Explore gameplay systems',
        '  stack     View technologies and tools',
        '  contact   Get contact information',
        '  confetti  Launch a confetti burst',
        '  fireworks Launch animated fireworks',
        '  matrix    Start a code rain effect',
        '  glitch    Trigger a glitch pulse overlay',
        '  blackhole Open a distortion effect',
        '  clear     Reset the panel',
      ],
      systems: [
        'Movement, FPS mechanics, procedural generation, vehicles, AI, inventory, quests, combat, UI flows, and admin systems.',
      ],
      backend: [
        'DataStore, MemoryStore, cross-server messaging, HTTPService, authenticated web commands, secure remotes, and validation-first design.',
      ],
      gameplay: [
        'Responsive mechanics built around player feel, server authority, readable feedback, and systems that remain expandable.',
      ],
      stack: [
        'Roblox Luau, DataStore, MemoryStore, HTTPService, raycasting, physics, procedural generation, camera systems, and modular architecture.',
      ],
      contact: [
        'Discord: vantyx_999',
      ],
    },
    quickCommands: ['help', 'systems', 'backend', 'gameplay', 'stack', 'contact', 'matrix', 'glitch', 'blackhole'],
    visualCommands: ['confetti', 'fireworks', 'matrix', 'glitch', 'blackhole'],
    panelLabel: 'Systems panel',
    panelDescription: 'Shortcuts, project notes, and visual commands',
    visualsEnabledLabel: 'Visual tests enabled',
    feedLabel: 'Feed',
    promptLabel: 'Command',
    processingLabel: 'Processing...',
    inputPlaceholder: 'Try "systems", "backend", or "matrix"',
    unknownCommandPrefix: 'Unknown command:',
    visualResponses: {
      confetti: 'Confetti burst launched.',
      fireworks: 'Fireworks sequence launched.',
      matrix: 'Code rain engaged.',
      glitch: 'Glitch pulse engaged.',
      blackhole: 'Distortion opened.',
    },
  },
  contact: {
    eyebrow: 'Contact',
    title: 'Send me the system you want built',
    description:
      'Fastest path is Discord. Share the mechanic, the current code state, and what should feel better in-game.',
    methods: [{ label: 'Discord', value: 'vantyx_999' }],
  },
  footer: {
    left: 'Vantyx',
    right: 'Roblox systems, gameplay, and backend architecture.',
  },
  boot: {
    label: 'Preparing the workspace',
    steps: [
      'Loading project notes',
      'Checking system showcases',
      'Syncing backend context',
      'Opening the portfolio',
    ],
    loadingLabel: 'Loading',
    readyLabel: 'Ready',
    queuedLabel: 'Queued',
  },
};
