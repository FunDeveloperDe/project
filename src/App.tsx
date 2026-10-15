import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  ChevronRight,
  Copy,
  ExternalLink,
} from 'lucide-react';
import FloatingNav from './components/FloatingNav';
import { siteConfig, type SiteProject } from './siteConfig';
import robloxWordmark from './assets/roblox-wordmark-white.svg';

const serviceProjectIndexes = [3, 0, 3, 3, 0];

function youtubeVideoId(videoUrl: string) {
  try {
    const url = new URL(videoUrl);
    if (url.hostname === 'youtu.be') return url.pathname.slice(1);
    return url.searchParams.get('v') ?? '';
  } catch {
    return '';
  }
}

function youtubeEmbedUrl(videoUrl: string, startAt: number, autoplay: boolean, shortPreview: boolean) {
  const videoId = youtubeVideoId(videoUrl);
  const params = new URLSearchParams({
    autoplay: autoplay ? '1' : '0',
    ...(autoplay ? { mute: '1', loop: '1', playlist: videoId, controls: '0' } : {}),
    modestbranding: '1',
    playsinline: '1',
    rel: '0',
    start: String(startAt),
    ...(shortPreview ? { end: String(startAt + 8) } : {}),
  });
  return `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`;
}

function YouTubeEmbed({ project, compact = false, priority = false, showCaption = true, autoplay = false, shortPreview = false }: { project: SiteProject; compact?: boolean; priority?: boolean; showCaption?: boolean; autoplay?: boolean; shortPreview?: boolean }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <figure className={`youtube-frame${compact ? ' youtube-frame-compact' : ''}${showCaption ? '' : ' youtube-frame-immersive'}`}>
      <div className="youtube-viewport">
        <iframe
          src={youtubeEmbedUrl(project.videoUrl, project.startAt, autoplay, shortPreview)}
          title={project.title + ' demo on YouTube'}
          loading={priority ? 'eager' : 'lazy'}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          onLoad={() => setLoaded(true)}
        />
        {!loaded && <div className="youtube-loading" aria-hidden="true"><span />Connecting to YouTube</div>}
      </div>
      {showCaption && <figcaption>
        <span>YouTube demo</span>
        <a href={project.videoUrl} target="_blank" rel="noreferrer">
          Open on YouTube <ExternalLink size={14} />
        </a>
      </figcaption>}
    </figure>
  );
}

const reveal = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

function App() {
  const [activeService, setActiveService] = useState(0);
  const [copied, setCopied] = useState('');
  const serviceRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const reduceMotion = useReducedMotion();
  const relatedServiceProject = siteConfig.projects.items[serviceProjectIndexes[activeService]];
  const activeServiceItem = siteConfig.services.items[activeService];

  useEffect(() => {
    document.title = siteConfig.meta.title;
    const applyMeta = (attribute: 'name' | 'property', key: string, value: string) => {
      let tag = document.head.querySelector('meta[' + attribute + '="' + key + '"]');
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attribute, key);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', value);
    };
    applyMeta('name', 'description', siteConfig.meta.description);
    applyMeta('property', 'og:title', siteConfig.meta.title);
    applyMeta('property', 'og:description', siteConfig.meta.description);
    applyMeta('property', 'og:image', siteConfig.meta.image);
    applyMeta('property', 'og:url', siteConfig.meta.url);
  }, []);

  const copyContact = async (value: string) => {
    await navigator.clipboard.writeText(value);
    setCopied(value);
    window.setTimeout(() => setCopied(''), 1800);
  };

  const handleServiceKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const finalIndex = siteConfig.services.items.length - 1;
    let nextIndex = index;
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') nextIndex = index === finalIndex ? 0 : index + 1;
    else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') nextIndex = index === 0 ? finalIndex : index - 1;
    else if (event.key === 'Home') nextIndex = 0;
    else if (event.key === 'End') nextIndex = finalIndex;
    else return;
    event.preventDefault();
    setActiveService(nextIndex);
    serviceRefs.current[nextIndex]?.focus();
  };

  return (
    <div className="site-shell">
      <a className="skip-link" href="#work">Skip to projects</a>
      <FloatingNav brandName={siteConfig.brand.name} items={siteConfig.navigation} />

      <main>
        <section id="home" className="hero-section">
          <div className="page-grid hero-layout">
            <div className="hero-copy">
              <h1>
                <span className="hero-wordmark"><img src={robloxWordmark} alt={siteConfig.hero.headline[0]} /></span>
                <strong>{siteConfig.hero.headline[1]}</strong>
              </h1>
              <p className="hero-description">{siteConfig.hero.description}</p>
              <div className="hero-actions">
                <a className="button button-primary" href="#work">{siteConfig.hero.primaryCta}<ArrowDown size={17} /></a>
                <a className="button button-quiet" href="#contact">{siteConfig.hero.secondaryCta}<ArrowUpRight size={17} /></a>
              </div>
              <div className="hero-details">
                <div className="hero-stats">
                  {siteConfig.hero.stats.map((stat, index) => <div key={stat.label} className={index === 0 ? 'stat-primary' : 'stat-secondary'}><strong>{stat.value}</strong><span>{stat.label}</span></div>)}
                </div>
                <p className="hero-availability"><strong>{siteConfig.hero.availabilityLabel}</strong><span>{siteConfig.hero.availabilityHours}</span></p>
              </div>
            </div>

            <div className="hero-video" aria-hidden="true">
              <YouTubeEmbed project={siteConfig.projects.items[0]} priority showCaption={false} autoplay={!reduceMotion} shortPreview />
            </div>
          </div>
        </section>

        <section id="work" className="section work-section">
          <div className="page-grid section-intro">
            <div className="section-title"><p className="eyebrow">{siteConfig.projects.eyebrow}</p><h2>Systems<br />in play.</h2></div>
            <p className="section-lede">Working Roblox systems with the decisions behind them. Watch each demo here, then open the full video on YouTube.</p>
          </div>

          <div className="project-list">
            {siteConfig.projects.items.map((project, index) => (
              <motion.article key={project.title} className="project-row page-grid" variants={reveal} initial={reduceMotion ? false : 'hidden'} whileInView="visible" viewport={{ once: true, margin: '-7%' }} transition={{ duration: 0.46, delay: index * 0.035, ease: [0.2, 0.8, 0.2, 1] }}>
                <div className="project-media"><YouTubeEmbed project={project} /></div>
                <div className="project-copy">
                  <p className="eyebrow">{project.category}</p>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-outcome"><i aria-hidden="true" /><span>{project.outcome}</span></div>
                  <ul className="project-stack" aria-label={project.title + ' technologies'}>{project.stack.map((item) => <li key={item}>{item}</li>)}</ul>
                  <a className="text-link" href={project.videoUrl} target="_blank" rel="noreferrer">Open the full demo <ArrowUpRight size={16} /></a>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="services" className="section systems-section">
          <div className="page-grid systems-heading">
            <div><p className="eyebrow light">{siteConfig.services.eyebrow}</p><h2>Build around<br />the constraint.</h2></div>
            <p>Choose a development area to see the kind of problem it solves. The preview updates with the related project.</p>
          </div>
          <div className="page-grid systems-workbench">
            <motion.div key={relatedServiceProject.title} className="systems-media" initial={reduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              <YouTubeEmbed project={relatedServiceProject} compact />
            </motion.div>
            <div className="systems-panel">
              <motion.div key={activeServiceItem.title} id="system-detail" className="system-detail" role="tabpanel" aria-labelledby={'system-tab-' + activeService} initial={reduceMotion ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.22 }}>
                <h3>{activeServiceItem.title}</h3><p>{activeServiceItem.description}</p>
              </motion.div>
              <div className="system-selector" role="tablist" aria-label="Development areas" aria-orientation="vertical">
                {siteConfig.services.items.map((item, index) => <button key={item.title} ref={(node) => { serviceRefs.current[index] = node; }} id={'system-tab-' + index} role="tab" type="button" tabIndex={activeService === index ? 0 : -1} aria-selected={activeService === index} aria-controls="system-detail" onClick={() => setActiveService(index)} onKeyDown={(event) => handleServiceKeyDown(event, index)}><strong>{item.title}</strong><ChevronRight size={18} /></button>)}
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="section stack-section">
          <div className="page-grid stack-layout">
              <div className="stack-heading"><p className="eyebrow">{siteConfig.skills.eyebrow}</p><h2>{siteConfig.skills.title}</h2></div>
            <div className="stack-groups">{siteConfig.skills.groups.map((group) => <div className="stack-group" key={group.category}><h3>{group.category}</h3><ul>{group.items.map((item) => <li key={item}><Check size={14} />{item}</li>)}</ul></div>)}</div>
          </div>
        </section>

        <section id="contact" className="contact-section">
          <div className="page-grid contact-layout">
              <div className="contact-heading"><p className="availability-label"><i />{siteConfig.hero.availabilityLabel}</p><h2>Bring a tricky<br />system.</h2></div>
            <div className="contact-copy"><p>{siteConfig.contact.description}</p>{siteConfig.contact.methods.map((method) => method.href ? <a key={method.value} className="contact-link" href={method.href}><span>{method.label}</span><strong>{method.value}</strong><ArrowUpRight size={24} /></a> : <button key={method.value} className="contact-link" type="button" onClick={() => copyContact(method.value)} title={'Copy ' + method.label}><span>{method.label}</span><strong>{method.value}</strong>{copied === method.value ? <Check size={24} /> : <Copy size={24} />}</button>)}<p className="copy-status" aria-live="polite">{copied ? 'Discord handle copied.' : '\u00a0'}</p></div>
          </div>
        </section>
      </main>

      <footer className="site-footer"><span>{siteConfig.footer.left}</span><span>{siteConfig.footer.right}</span><a href="#home">Back to top <ArrowUpRight size={15} /></a></footer>
    </div>
  );
}

export default App;
