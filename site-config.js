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
    { id: 'work', label: 'Projects' },
    { id: 'services', label: 'Services' },
    { id: 'skills', label: 'Specializations' },
    { id: 'contact', label: 'Contact' },
  ],
  hero: {
    headline: ['Roblox', 'Development'],
    description:
      'Gameplay systems and server-side tools, from combat and movement to data, admin tooling, and performance. Built and tested in Roblox Studio.',
    primaryCta: 'View projects',
    secondaryCta: 'Discord',
    stats: [
      { value: '6 yrs', label: 'In development' },
      { value: '3.5 yrs', label: 'Roblox experience' },
    ],
    availabilityLabel: 'Availability',
    availability:
      'Available for commissions across full games, standalone systems, bug fixes, and optimization work.',
    availabilityHours: 'Monday–Saturday • 8:00 AM – 9:00 PM (GMT2)',
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
    eyebrow: 'What I build',
    title: 'Specializations',
    groups: [
      {
        category: 'Combat & Weapons',
        items: [
          'Advanced FPS & TPS systems',
          'Combat, abilities & skill systems',
          'Gun frameworks, recoil & ballistics',
          'Hitboxes, projectiles & damage systems',
        ],
      },
      {
        category: 'Movement & Characters',
        items: [
          'Parkour & custom movement',
          'Advanced character controllers',
          'Camera & animation systems',
          'Ragdoll, physics & IK systems',
        ],
      },
      {
        category: 'Multiplayer & Frameworks',
        items: [
          'Matchmaking, queues & lobbies',
          'Round-based game systems',
          'Cross-server communication',
          'Party, team & clan systems',
          'Ranking, ELO & leaderboards',
          'Data saving & modular frameworks',
        ],
      },
      {
        category: 'AI & World Generation',
        items: [
          'NPC AI & boss encounters',
          'Pathfinding & behavior trees',
          'Procedural generation',
          'Dungeon & map generation',
        ],
      },
      {
        category: 'Economy & Progression',
        items: [
          'Inventory, equipment & trading',
          'Shops, currencies & crafting',
          'Quests, achievements & rewards',
          'Leveling, skill trees & progression',
          'Monetization & gamepass systems',
        ],
      },
      {
        category: 'Backend & Optimization',
        items: [
          'Web integrations & external APIs',
          'Admin panels & moderation tools',
          'Anti-exploit & server-side validation',
          'Performance & memory optimization',
          'Codebase refactoring & optimization',
          'Custom developer tools & plugins',
        ],
      },
    ],
  },
  projects: {
    eyebrow: 'Selected projects',
    title: 'Six working Roblox systems',
    intro:
      'Realistic FPS combat, traversal, live administration, procedural terrain, and raycast rendering. Watch the demos here or open the full videos on YouTube.',
    previewLabel: 'Video',
    items: [
      {
        title: 'Realistic FPS Shooter',
        category: 'First-person shooter',
        description:
          'Realistic first-person shooter system with weapon handling, camera motion, responsive firing, raycast hit detection, and combat feedback.',
        outcome:
          'Weapon response, camera recoil, animation, and hit logic stay synchronized through every encounter.',
        stack: ['Roblox Luau', 'Viewmodels', 'Raycasting', 'Weapon systems', 'Combat feedback'],
        videoUrl: 'https://youtu.be/S3APny6lG5I',
        startAt: 7,
      },
      {
        title: 'Spider-Man Movement System',
        category: 'Traversal system',
        description:
          'Physics-based traversal controller combining web swinging, wall running, surface climbing, camera tilt, and movement feedback.',
        outcome:
          'Momentum carries between swinging, sprinting, climbing, and wall running without abrupt state changes.',
        stack: ['Roblox Luau', 'Physics', 'Raycasting', 'Camera systems', 'Input handling'],
        videoUrl: 'https://youtu.be/PsKBOt1Od14',
        startAt: 5,
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
        startAt: 9,
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
        startAt: 1,
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
        startAt: 3,
      },
      {
        title: 'Raycast Rendering System',
        category: 'Real-time rendering',
        description:
          'Custom renderer that samples Roblox scenes with raycasts and draws the result inside the game.',
        outcome:
          'Geometry, surface data, and lighting influence the image in real time.',
        stack: ['Roblox Luau', 'Raycasting', 'Rendering logic', 'Lighting simulation', 'Optimization'],
        videoUrl: 'https://youtu.be/JkfpLhObRBQ',
        startAt: 13,
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
      'Preparing project previews',
      'Loading system notes',
      'Checking page assets',
      'Ready to view',
    ],
    loadingLabel: 'Loading',
    readyLabel: 'Ready',
    queuedLabel: 'Queued',
  },
};
