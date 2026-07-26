window.__SITE_CONFIG__ = {
  meta: {
    title: 'Vantyx | Roblox Systems Developer',
    description: 'Portfolio of Vantyx, a Roblox programmer focused on gameplay systems, server code, persistent data, tools, and performance.',
    image: 'https://i.ytimg.com/vi/PsKBOt1Od14/maxresdefault.jpg',
    url: 'https://fundeveloperde.github.io/project/',
  },
  brand: {
    name: 'Vantyx',
    badge: 'Roblox systems developer',
    taglinePhrases: [
      'Roblox gameplay programming',
      'Backend and data systems',
      'Tools built in Luau',
    ],
  },
  navigation: [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'work', label: 'Projects' },
    { id: 'skills', label: 'Stack' },
    { id: 'about', label: 'About' },
    { id: 'terminal', label: 'Console' },
    { id: 'contact', label: 'Contact' },
  ],
  hero: {
    eyebrow: 'Roblox programmer',
    headline: ['Roblox', 'Development'],
    videoId: 'bzXzGMbdQfY',
    title: 'Gameplay systems, backend code, and tools.',
    description:
      'Movement, combat, persistent data, server architecture, admin tooling, UI, and performance - built and tested in Roblox Studio.',
    primaryCta: 'View projects',
    secondaryCta: 'Discord',
    stats: [
      { value: '3.5 yrs', label: 'Experience' },
      { value: '$25', label: 'Minimum project' },
      { value: '100+', label: 'Clients' },
    ],
    availabilityLabel: 'Commissions',
    availability:
      'Open for commissions across full games, standalone systems, bug fixes, and optimization work.',
  },
  about: {
    eyebrow: 'Approach',
    title: 'Gameplay feel and server reliability, treated as one problem',
    paragraphs: [
      'Work spans both sides of a Roblox experience: movement, combat, vehicles, NPCs, inventories, quests, procedural generation, and UI on the player side; DataStore, MemoryStore, cross-server messaging, and web integrations on the server side.',
      'Important state remains server-authoritative. Remote input is validated, performance is profiled, and large features are divided into focused modules that can be extended without rewriting the entire game.',
    ],
    highlights: [
      'Important logic stays on the server',
      'Remote input gets checked',
      'Code is split into useful modules',
      'Slow code gets profiled',
      'Systems can be changed later',
    ],
    highlightValueLabel: 'Ready',
  },
  services: {
    eyebrow: 'Development scope',
    title: 'Roblox development across gameplay and backend',
    items: [
      {
        title: 'Backend and data',
        description:
          'Persistent player data, inventories, currencies, MemoryStore queues, cross-server messaging, and web APIs. Important state remains server-controlled.',
      },
      {
        title: 'Gameplay systems',
        description:
          'Movement, combat, abilities, vehicles, building, quests, NPCs, and complete gameplay loops, with attention to input response and readable feedback.',
      },
      {
        title: 'Multiplayer and servers',
        description:
          'Parties, matchmaking, round flow, server synchronization, and admin tooling, with authoritative state shared cleanly across clients.',
      },
      {
        title: 'Security and optimization',
        description:
          'Remote validation, exploit-resistant game logic, performance profiling, and refactoring for systems that have become difficult to maintain.',
      },
      {
        title: 'Frontend and UI',
        description:
          'Shops, inventories, HUDs, dashboards, and player feedback connected directly to server-backed game state.',
      },
    ],
  },
  skills: {
    eyebrow: 'Core stack',
    title: 'Tools and specialties',
    groups: [
      {
        category: 'Systems',
        items: [
          'Server and data code',
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
          'Reusable ModuleScripts',
        ],
      },
    ],
  },
  projects: {
    eyebrow: 'Selected projects',
    title: 'Five working Roblox systems',
    intro:
      'Traversal, first-person combat, live administration, procedural terrain, and raycast rendering. Every project includes a video of the system running in Roblox Studio.',
    previewLabel: 'Video',
    items: [
      {
        title: 'Spider-Man Movement System',
        category: 'Traversal system',
        description:
          'Physics-based traversal controller combining web swinging, wall running, surface climbing, camera tilt, and movement feedback.',
        outcome:
          'Momentum carries between swinging, sprinting, climbing, and wall running without abrupt state changes.',
        stack: ['Roblox Luau', 'Physics', 'Raycasting', 'Camera systems', 'Input handling'],
        videoUrl: 'https://youtu.be/PsKBOt1Od14',
      },
      {
        title: 'FPS Pistol System',
        category: 'First-person combat',
        description:
          'Viewmodel-based pistol system with synchronized animation, camera motion, responsive firing, and raycast hit detection.',
        outcome:
          'Input, animation, camera feedback, and hit logic remain synchronized through each shot.',
        stack: ['Roblox Luau', 'Viewmodels', 'Raycasting', 'Camera control', 'Input handling'],
        videoUrl: 'https://youtu.be/V3xgPGcSTic',
      },
      {
        title: 'Web-Based Game Administration',
        category: 'Live operations',
        description:
          'External administration interface connected to active Roblox servers through authenticated web requests.',
        outcome:
          'Authorized commands route to the correct servers and synchronize across the live game.',
        stack: ['Roblox Luau', 'HTTPService', 'Web API', 'Cross-server messaging', 'Authentication'],
        videoUrl: 'https://youtu.be/zKCMLSKQytY',
      },
      {
        title: 'Procedural Terrain Generation',
        category: 'World generation',
        description:
          'Chunk-based world generator for biome terrain, trees, structures, and environmental detail.',
        outcome:
          'Chunks generate on demand to limit unnecessary work while preserving biome variation.',
        stack: ['Roblox Luau', 'Procedural generation', 'Noise', 'Chunk loading', 'Asset spawning'],
        videoUrl: 'https://youtu.be/rTRbfrchyrE',
      },
      {
        title: 'Raycast Rendering System',
        category: 'Rendering experiment',
        description:
          'Custom renderer that samples Roblox scenes with raycasts and draws the result inside the game.',
        outcome:
          'Geometry, surface data, and lighting influence the image in real time.',
        stack: ['Roblox Luau', 'Raycasting', 'Rendering logic', 'Lighting simulation', 'Optimization'],
        videoUrl: 'https://youtu.be/JkfpLhObRBQ',
      },
    ],
  },
  terminal: {
    eyebrow: 'Project console',
    title: 'Technical overview',
    intro:
      'Use the commands below for a compact summary of development scope, backend work, gameplay systems, tools, and contact details.',
    initialMessage: 'Console ready. Type "help" to see the commands.',
    commands: {
      help: [
        'Available commands:',
        '  help      Show the command list',
        '  systems   List development scope',
        '  backend   Show backend capabilities',
        '  gameplay  Show gameplay capabilities',
        '  stack     Show tools and APIs',
        '  contact   Show Discord',
        '  confetti  Launch a confetti burst',
        '  fireworks Launch animated fireworks',
        '  matrix    Start a code rain effect',
        '  glitch    Trigger a glitch pulse overlay',
        '  blackhole Open a distortion effect',
        '  clear     Reset the panel',
      ],
      systems: [
        'Movement, weapons, procedural worlds, vehicles, AI, inventories, quests, combat, UI, and administration tools.',
      ],
      backend: [
        'DataStore, MemoryStore, cross-server messaging, HTTPService, authenticated web commands, and server-side remote validation.',
      ],
      gameplay: [
        'Responsive controls and readable feedback on the client, with important game state controlled by the server.',
      ],
      stack: [
        'Roblox Luau, DataStore, MemoryStore, HTTPService, raycasting, physics, procedural generation, camera systems, and reusable modules.',
      ],
      contact: [
        'Discord: vantyx_999',
      ],
    },
    quickCommands: ['help', 'systems', 'backend', 'gameplay', 'stack', 'contact', 'matrix', 'glitch', 'blackhole'],
    visualCommands: ['confetti', 'fireworks', 'matrix', 'glitch', 'blackhole'],
    panelLabel: 'Vantyx console',
    panelDescription: 'Development scope and project notes',
    visualsEnabledLabel: 'Effects on',
    feedLabel: 'Output',
    promptLabel: 'Type a command',
    processingLabel: 'Running...',
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
    eyebrow: 'Commissions',
    title: 'Discuss a Roblox project',
    description:
      'Send the game concept, current build state, required system, and expected scope on Discord.',
    methods: [{ label: 'Discord', value: 'vantyx_999' }],
  },
  footer: {
    left: 'Vantyx',
    right: 'Roblox programmer. Gameplay, backend, and tools.',
  },
  boot: {
    label: 'Opening the portfolio',
    steps: [
      'Loading project videos',
      'Loading system notes',
      'Checking page assets',
      'Ready to view',
    ],
    loadingLabel: 'Loading',
    readyLabel: 'Ready',
    queuedLabel: 'Queued',
  },
};
