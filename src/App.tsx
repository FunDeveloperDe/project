import { useEffect, useState } from 'react';
import { siteConfig, type SiteProject } from './siteConfig';

function youtubeVideoId(videoUrl: string) {
  try {
    const url = new URL(videoUrl);
    if (url.hostname === 'youtu.be') return url.pathname.slice(1).split('/')[0];
    if (url.hostname.includes('youtube.com')) return url.searchParams.get('v') ?? url.pathname.split('/').pop() ?? '';
  } catch {
    return '';
  }
  return '';
}

function LandingVideo() {
  const [reducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const project = siteConfig.projects.items[0];
  const videoId = youtubeVideoId(project.videoUrl);
  const embedUrl = videoId
    ? `https://www.youtube-nocookie.com/embed/${videoId}?${new URLSearchParams({
      autoplay: reducedMotion ? '0' : '1',
      controls: '0',
      disablekb: '1',
      fs: '0',
      iv_load_policy: '3',
      loop: '1',
      modestbranding: '1',
      mute: '1',
      playlist: videoId,
      playsinline: '1',
      rel: '0',
      start: String(project.startAt),
    })}`
    : project.videoUrl;

  return (
    <div className="landing-video" aria-hidden="true">
      <iframe
        src={embedUrl}
        title="Realistic FPS Shooter project preview"
        allow="autoplay; encrypted-media; picture-in-picture"
        tabIndex={-1}
      />
    </div>
  );
}

function YouTubeEmbed({ project }: { project: SiteProject }) {
  const [loaded, setLoaded] = useState(false);
  const videoId = youtubeVideoId(project.videoUrl);
  const embedUrl = videoId
    ? `https://www.youtube-nocookie.com/embed/${videoId}?${new URLSearchParams({ modestbranding: '1', playsinline: '1', rel: '0', start: String(project.startAt) })}`
    : project.videoUrl;

  return (
    <div className="video-block">
      <div className="video-frame">
        <iframe
          src={embedUrl}
          title={`${project.title} demo on YouTube`}
          loading="lazy"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          onLoad={() => setLoaded(true)}
        />
        {!loaded && <span className="video-loading">Loading video...</span>}
      </div>
    </div>
  );
}

function App() {
  useEffect(() => {
    document.title = siteConfig.meta.title;
    const setMeta = (name: string, content: string) => {
      let tag = document.head.querySelector(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('name', name);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };
    setMeta('description', siteConfig.meta.description);
  }, []);

  return (
    <div className="site-shell">
      <a className="skip-link" href="#about">Skip to content</a>

      <header className="site-header page-width">
        <a className="site-name" href="#home">{siteConfig.brand.name}</a>
        <nav aria-label="Main navigation">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#systems">Systems</a>
          <a href="#projects">Projects</a>
          <a href="#availability">Availability</a>
        </nav>
      </header>

      <main className="page-width">
        <section id="home" className="landing-section" aria-labelledby="landing-title">
          <LandingVideo />
          <div className="landing-shade" aria-hidden="true" />
          <div className="landing-content page-width">
            <h1 id="landing-title">Roblox<br />Development</h1>
            <p>{siteConfig.hero.description}</p>
            <div className="landing-actions">
              <a href="#projects">View projects</a>
              <a href="#availability">Availability</a>
            </div>
            <div className="landing-stats" aria-label="Experience">
              {siteConfig.hero.stats.map((stat) => <span key={stat.label}><strong>{stat.value}</strong> {stat.label}</span>)}
            </div>
          </div>
        </section>

        <section id="availability" className="availability-section" aria-labelledby="availability-title">
          <h2 id="availability-title">Availability</h2>
          <p>{siteConfig.hero.availability}</p>
          <p><strong>{siteConfig.hero.availabilityHours}</strong></p>
        </section>

        <section id="about" className="about-section">
          <h1>About me</h1>
          <p>I build gameplay systems and server-side tools in Roblox Studio. I have been developing for 6 years and working with Roblox for 3.5 years.</p>
          <p>My work includes combat, movement, data, multiplayer systems, and the tools that support a live game.</p>
          <p>I focus on systems that stay reliable when a game gets busy: responsive client input, server-authoritative state, and data that survives a session. I work in Luau, profile performance, and keep larger features modular so they can grow without replacing the foundation.</p>
        </section>

        <section id="projects" className="projects-section" aria-labelledby="projects-title">
          <h2 id="projects-title">Projects</h2>
          <div className="project-list">
            {siteConfig.projects.items.map((project) => (
              <article className="project" key={project.title}>
                <YouTubeEmbed project={project} />
                <div className="project-info">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  {project.title === 'Web-Based Game Administration' && <p className="project-note">The website shown in this video was based on a template found online.</p>}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="systems" className="systems-section" aria-labelledby="systems-title">
          <h2 id="systems-title">Systems</h2>
          <div className="systems-list">
            {siteConfig.skills.groups.map((group) => (
              <div className="system-group" key={group.category}>
                <h3>{group.category}</h3>
                <ul>
                  {group.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
            ))}
          </div>
          <p className="systems-note">Built for live games, from the first prototype to the systems that keep running after launch.</p>
        </section>
      </main>

    </div>
  );
}

export default App;
