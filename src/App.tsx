import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Braces,
  Check,
  ChevronRight,
  Copy,
  Play,
  ShieldCheck,
  Terminal,
} from 'lucide-react';
import FloatingNav from './components/FloatingNav';
import InteractiveTerminal from './components/InteractiveTerminal';
import { siteConfig, type SiteProject } from './siteConfig';

function getYoutubeId(url: string) {
  return url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([^?&/]+)/)?.[1] ?? '';
}

function projectImage(project: SiteProject) {
  return `https://i.ytimg.com/vi/${getYoutubeId(project.videoUrl)}/maxresdefault.jpg`;
}

const serviceProjectIndexes = [2, 0, 2, 2, 1];

const reveal = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0 },
};

function TypingText({ text, disabled }: { text: string; disabled: boolean }) {
  const [typedLength, setTypedLength] = useState(disabled ? text.length : 0);

  useEffect(() => {
    if (disabled) {
      setTypedLength(text.length);
      return;
    }

    setTypedLength(0);
    let intervalId = 0;
    const startId = window.setTimeout(() => {
      let nextLength = 0;
      intervalId = window.setInterval(() => {
        nextLength += 1;
        setTypedLength(nextLength);

        if (nextLength >= text.length) window.clearInterval(intervalId);
      }, 22);
    }, 260);

    return () => {
      window.clearTimeout(startId);
      window.clearInterval(intervalId);
    };
  }, [disabled, text]);

  const isTyping = !disabled && typedLength < text.length;

  return (
    <span className="typing-text">
      <span className="visually-hidden">{text}</span>
      <span className="typing-text-reserve" aria-hidden="true">{text}</span>
      <span className="typing-text-output" aria-hidden="true">
        {text.slice(0, typedLength)}
        {isTyping && <i className="typing-caret" />}
      </span>
    </span>
  );
}

function App() {
  const [activeService, setActiveService] = useState(0);
  const [copied, setCopied] = useState('');
  const serviceRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const reduceMotion = useReducedMotion();
  const featuredProject = siteConfig.projects.items[0];
  const relatedServiceProject = siteConfig.projects.items[serviceProjectIndexes[activeService]];

  useEffect(() => {
    document.title = siteConfig.meta.title;

    const applyMeta = (attribute: 'name' | 'property', key: string, value: string) => {
      let tag = document.head.querySelector(`meta[${attribute}="${key}"]`);
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

  const activeServiceItem = siteConfig.services.items[activeService];

  return (
    <div className="site-shell">
      <a className="skip-link" href="#work">Skip to projects</a>
      <FloatingNav brandName={siteConfig.brand.name} items={siteConfig.navigation} />

      <main>
        <section id="home" className="hero-section">
          <div className="hero-media">
            <img src={projectImage(featuredProject)} alt={`Gameplay frame from ${featuredProject.title}`} />
          </div>
          <div className="hero-overlay" aria-hidden="true" />
          <div className="hero-rule" aria-hidden="true" />

          <div className="hero-content page-grid">
            <motion.div
              className="hero-copy"
              initial={reduceMotion ? false : { opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.76, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="eyebrow light"><Braces size={15} />{siteConfig.hero.eyebrow}</p>
              <h1>{siteConfig.brand.name}</h1>
              <p className="hero-title"><TypingText text={siteConfig.hero.title} disabled={Boolean(reduceMotion)} /></p>
              <p className="hero-description">{siteConfig.hero.description}</p>
              <div className="hero-actions">
                <a className="button button-primary" href="#work">
                  {siteConfig.hero.primaryCta}<ArrowDown size={18} />
                </a>
                <a className="button button-secondary" href="#contact">
                  {siteConfig.hero.secondaryCta}<ArrowRight size={18} />
                </a>
              </div>
            </motion.div>

            <motion.aside
              className="hero-project"
              initial={reduceMotion ? false : { opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.68, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
              aria-label="Featured project"
            >
              <p>Start here</p>
              <h2>{featuredProject.title}</h2>
              <span>{featuredProject.category}</span>
              <a href={featuredProject.videoUrl} target="_blank" rel="noreferrer">
                Watch the video<Play size={17} fill="currentColor" />
              </a>
            </motion.aside>

            <div className="hero-meta" aria-label="Portfolio summary">
              <span><b>{String(siteConfig.projects.items.length).padStart(2, '0')}</b>Project videos</span>
              <span><b>Luau</b>Main language</span>
              <span><b>Server</b>Important logic</span>
            </div>
          </div>
        </section>

        <div className="principle-strip" aria-label="Engineering principles">
          {siteConfig.about.highlights.map((item, index) => (
            <span key={item}><b>{String(index + 1).padStart(2, '0')}</b>{item}</span>
          ))}
        </div>

        <section id="work" className="section work-section">
          <div className="section-intro page-grid">
            <div className="section-number">01 / Projects</div>
            <div className="section-title">
              <p className="eyebrow">{siteConfig.projects.eyebrow}</p>
              <h2>Selected<br />{' '}projects.</h2>
            </div>
            <p className="section-lede">{siteConfig.projects.intro}</p>
          </div>

          <div className="project-list">
            {siteConfig.projects.items.map((project, index) => (
              <motion.article
                key={project.title}
                className="project-row page-grid"
                variants={reveal}
                initial={reduceMotion ? false : 'hidden'}
                whileInView="visible"
                viewport={{ once: true, margin: '-8%' }}
                transition={{ duration: 0.62, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="project-index">P/{String(index + 1).padStart(2, '0')}</div>
                <a
                  className="project-media"
                  href={project.videoUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Watch ${project.title} on YouTube`}
                >
                  <img src={projectImage(project)} alt={`Gameplay preview for ${project.title}`} loading="lazy" />
                  <span className="media-corner" aria-hidden="true" />
                  <span className="project-watch"><Play size={17} fill="currentColor" />Watch video</span>
                </a>
                <div className="project-copy">
                  <p className="eyebrow">{project.category}</p>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-outcome"><ShieldCheck size={18} /><span>{project.outcome}</span></div>
                  <ul className="project-stack" aria-label={`${project.title} technologies`}>
                    {project.stack.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                  <a className="text-link" href={project.videoUrl} target="_blank" rel="noreferrer">
                    View project video<ArrowUpRight size={17} />
                  </a>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="services" className="section systems-section">
          <div className="page-grid systems-heading">
            <div className="section-number light">02 / Systems</div>
            <div>
              <p className="eyebrow light">{siteConfig.services.eyebrow}</p>
              <h2>{siteConfig.services.title}</h2>
            </div>
            <p>Choose a category for scope and a relevant project example.</p>
          </div>

          <div className="systems-workbench page-grid">
            <motion.a
              key={relatedServiceProject.title}
              className="systems-media"
              href={relatedServiceProject.videoUrl}
              target="_blank"
              rel="noreferrer"
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.32 }}
              aria-label={`Watch related project: ${relatedServiceProject.title}`}
            >
              <img src={projectImage(relatedServiceProject)} alt={`Related gameplay project: ${relatedServiceProject.title}`} />
              <span className="systems-media-caption">
                <small>Example project</small>
                <strong>{relatedServiceProject.title}</strong>
                <span>Watch video<ArrowUpRight size={15} /></span>
              </span>
            </motion.a>

            <div className="systems-panel">
              <motion.div
                key={activeServiceItem.title}
                id="system-detail"
                className="system-detail"
                role="tabpanel"
                aria-labelledby={`system-tab-${activeService}`}
                initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
              >
                <span>Selected / {String(activeService + 1).padStart(2, '0')}</span>
                <h3>{activeServiceItem.title}</h3>
                <p>{activeServiceItem.description}</p>
              </motion.div>

              <div className="system-selector" role="tablist" aria-label="Development areas" aria-orientation="vertical">
                {siteConfig.services.items.map((item, index) => (
                  <button
                    key={item.title}
                    ref={(node) => { serviceRefs.current[index] = node; }}
                    id={`system-tab-${index}`}
                    role="tab"
                    type="button"
                    tabIndex={activeService === index ? 0 : -1}
                    aria-selected={activeService === index}
                    aria-controls="system-detail"
                    onClick={() => setActiveService(index)}
                    onKeyDown={(event) => handleServiceKeyDown(event, index)}
                  >
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <strong>{item.title}</strong>
                    <ChevronRight size={19} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="section stack-section">
          <div className="page-grid stack-layout">
            <div className="stack-heading">
              <div className="section-number">03 / Tools</div>
              <p className="eyebrow">{siteConfig.skills.eyebrow}</p>
              <h2>{siteConfig.skills.title}</h2>
            </div>
            <div className="stack-groups">
              {siteConfig.skills.groups.map((group, index) => (
                <div className="stack-group" key={group.category}>
                  <span>0{index + 1}</span>
                  <h3>{group.category}</h3>
                  <ul>
                    {group.items.map((item) => <li key={item}><Check size={14} />{item}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="section about-section">
          <div className="about-media">
            <img src={projectImage(siteConfig.projects.items[1])} alt="First-person combat system gameplay frame" loading="lazy" />
          </div>
          <div className="page-grid about-layout">
            <div className="about-heading">
              <div className="section-number light">04 / About</div>
              <p className="eyebrow light">{siteConfig.about.eyebrow}</p>
              <h2>{siteConfig.about.title}</h2>
            </div>
            <div className="about-copy">
              {siteConfig.about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
            <div className="principle-list" aria-label="Engineering principles">
              {siteConfig.about.highlights.map((item, index) => (
                <span key={item}><b>{String(index + 1).padStart(2, '0')}</b>{item}<i /></span>
              ))}
            </div>
          </div>
        </section>

        <section id="terminal" className="section terminal-section">
          <div className="page-grid terminal-layout">
            <div className="terminal-intro">
              <div className="section-number light">05 / Console</div>
              <p className="eyebrow light">{siteConfig.terminal.eyebrow}</p>
              <Terminal size={28} />
              <h2>{siteConfig.terminal.title}</h2>
              <p>{siteConfig.terminal.intro}</p>
            </div>
            <InteractiveTerminal {...siteConfig.terminal} />
          </div>
        </section>

        <section id="contact" className="contact-section">
          <div className="page-grid contact-layout">
            <div className="contact-heading">
              <p className="availability-label"><i />Status: Accepting commissions</p>
              <h2>{siteConfig.contact.title}</h2>
            </div>
            <div className="contact-copy">
              <p>{siteConfig.contact.description}</p>
              {siteConfig.contact.methods.map((method) => (
                method.href ? (
                  <a key={method.value} className="contact-link" href={method.href}>
                    <span>{method.label}</span><strong>{method.value}</strong><ArrowUpRight size={28} />
                  </a>
                ) : (
                  <button
                    key={method.value}
                    className="contact-link"
                    type="button"
                    onClick={() => copyContact(method.value)}
                    title={`Copy ${method.label}`}
                  >
                    <span>{method.label}</span><strong>{method.value}</strong>
                    {copied === method.value ? <Check size={27} /> : <Copy size={27} />}
                  </button>
                )
              ))}
              <p className="copy-status" aria-live="polite">{copied ? 'Discord handle copied.' : '\u00a0'}</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <span>{siteConfig.footer.left}</span>
        <span>{siteConfig.footer.right}</span>
        <a href="#home">Top<ArrowUpRight size={15} /></a>
      </footer>
    </div>
  );
}

export default App;
