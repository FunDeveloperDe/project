import { useEffect, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Check,
  Copy,
  Play,
  ShieldCheck,
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

const reveal = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

function App() {
  const [copied, setCopied] = useState('');
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const heroImageY = useTransform(scrollYProgress, [0, 0.2], ['0%', '9%']);
  const heroImageScale = useTransform(scrollYProgress, [0, 0.2], [1.02, 1.1]);
  const featuredProject = siteConfig.projects.items[0];

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

  return (
    <div className="site-shell">
      <a className="skip-link" href="#work">Skip to selected work</a>
      <FloatingNav brandName={siteConfig.brand.name} items={siteConfig.navigation} />

      <main>
        <section id="home" className="hero-section">
          <motion.div
            className="hero-media"
            style={reduceMotion ? undefined : { y: heroImageY, scale: heroImageScale }}
          >
            <img src={projectImage(featuredProject)} alt="Frame from the Spider-Man movement system project" />
          </motion.div>
          <div className="hero-wash" />
          <div className="hero-grid" />

          <div className="hero-content page-grid">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
              className="hero-copy"
            >
              <p className="eyebrow light">Roblox systems engineer / Luau</p>
              <h1>{siteConfig.brand.name}</h1>
              <p className="hero-statement">{siteConfig.hero.title}</p>
              <p className="hero-description">{siteConfig.hero.description}</p>
              <div className="hero-actions">
                <a className="button button-signal" href="#work">
                  {siteConfig.hero.primaryCta}
                  <ArrowDownRight size={19} />
                </a>
                <a className="button button-quiet" href="#contact">
                  {siteConfig.hero.secondaryCta}
                  <ArrowRight size={18} />
                </a>
              </div>
            </motion.div>

            <motion.aside
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="hero-note"
              aria-label="Current focus"
            >
              <span className="status-dot" />
              <div>
                <span className="mono-label">{siteConfig.hero.availabilityLabel}</span>
                <p>{siteConfig.hero.availability}</p>
              </div>
            </motion.aside>
          </div>

          <div className="hero-caption">
            <span>Featured frame / 01</span>
            <span>{featuredProject.title}</span>
            <span>{featuredProject.category}</span>
          </div>
        </section>

        <div className="capability-tape" aria-label="Core capabilities">
          <div className="tape-track">
            {[...siteConfig.about.highlights, ...siteConfig.about.highlights].map((item, index) => (
              <span key={`${item}-${index}`}><i />{item}</span>
            ))}
          </div>
        </div>

        <section id="work" className="section projects-section">
          <div className="section-heading page-grid">
            <div>
              <p className="eyebrow">{siteConfig.projects.eyebrow}</p>
              <h2>{siteConfig.projects.title}</h2>
            </div>
            <p>{siteConfig.projects.intro}</p>
          </div>

          <div className="project-list">
            {siteConfig.projects.items.map((project, index) => (
              <motion.article
                key={project.title}
                variants={reveal}
                initial={reduceMotion ? false : 'hidden'}
                whileInView="visible"
                viewport={{ once: true, margin: '-10%' }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="project-row page-grid"
              >
                <a
                  className="project-media"
                  href={project.videoUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Watch ${project.title} on YouTube`}
                >
                  <img src={projectImage(project)} alt={`Video preview for ${project.title}`} loading="lazy" />
                  <span className="project-number">{String(index + 1).padStart(2, '0')}</span>
                  <span className="play-button"><Play size={20} fill="currentColor" /></span>
                  <span className="watch-label">Watch system <ArrowUpRight size={16} /></span>
                </a>

                <div className="project-copy">
                  <p className="mono-label">{project.category}</p>
                  <h3>{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  <div className="outcome-block">
                    <ShieldCheck size={18} />
                    <p>{project.outcome}</p>
                  </div>
                  <ul className="stack-list" aria-label={`${project.title} technologies`}>
                    {project.stack.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="services" className="section systems-section">
          <div className="systems-intro page-grid">
            <p className="eyebrow light">{siteConfig.services.eyebrow}</p>
            <h2>{siteConfig.services.title}</h2>
            <p className="systems-lede">Server authority is the baseline. From there, every system is shaped around player feel, clear ownership, and what happens after launch.</p>
          </div>
          <div className="system-index page-grid">
            {siteConfig.services.items.map((item, index) => (
              <motion.article
                key={item.title}
                variants={reveal}
                initial={reduceMotion ? false : 'hidden'}
                whileInView="visible"
                viewport={{ once: true, margin: '-8%' }}
                transition={{ duration: 0.55, delay: index * 0.04 }}
                className="system-row"
              >
                <span className="system-index-number">{String(index + 1).padStart(2, '0')}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <ArrowDownRight className="system-arrow" size={24} />
              </motion.article>
            ))}
          </div>
        </section>

        <section id="skills" className="section stack-section page-grid">
          <div className="stack-heading">
            <p className="eyebrow">{siteConfig.skills.eyebrow}</p>
            <h2>{siteConfig.skills.title}</h2>
          </div>
          <div className="stack-groups">
            {siteConfig.skills.groups.map((group, index) => (
              <div className="stack-group" key={group.category}>
                <span className="stack-group-number">0{index + 1}</span>
                <h3>{group.category}</h3>
                <ul>
                  {group.items.map((item) => <li key={item}><Check size={15} />{item}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section id="about" className="section about-section">
          <div className="page-grid about-grid">
            <div className="about-title">
              <p className="eyebrow">{siteConfig.about.eyebrow}</p>
              <h2>{siteConfig.about.title}</h2>
            </div>
            <div className="about-copy">
              {siteConfig.about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
            <div className="about-principles" aria-label="Engineering principles">
              {siteConfig.about.highlights.map((item, index) => (
                <span key={item}><b>{String(index + 1).padStart(2, '0')}</b>{item}</span>
              ))}
            </div>
          </div>
        </section>

        <section id="terminal" className="section terminal-section">
          <div className="page-grid terminal-grid">
            <div className="terminal-intro">
              <p className="eyebrow light">{siteConfig.terminal.eyebrow}</p>
              <h2>{siteConfig.terminal.title}</h2>
              <p>{siteConfig.terminal.intro}</p>
            </div>
            <InteractiveTerminal
              initialMessage={siteConfig.terminal.initialMessage}
              commands={siteConfig.terminal.commands}
              quickCommands={siteConfig.terminal.quickCommands}
              visualCommands={siteConfig.terminal.visualCommands}
              panelLabel={siteConfig.terminal.panelLabel}
              panelDescription={siteConfig.terminal.panelDescription}
              visualsEnabledLabel={siteConfig.terminal.visualsEnabledLabel}
              feedLabel={siteConfig.terminal.feedLabel}
              promptLabel={siteConfig.terminal.promptLabel}
              processingLabel={siteConfig.terminal.processingLabel}
              inputPlaceholder={siteConfig.terminal.inputPlaceholder}
              unknownCommandPrefix={siteConfig.terminal.unknownCommandPrefix}
              visualResponses={siteConfig.terminal.visualResponses}
            />
          </div>
        </section>

        <section id="contact" className="contact-section">
          <div className="contact-background-text" aria-hidden="true">AVAILABLE</div>
          <div className="page-grid contact-grid">
            <div>
              <p className="eyebrow light">{siteConfig.contact.eyebrow}</p>
              <h2>{siteConfig.contact.title}</h2>
            </div>
            <div className="contact-action">
              <p>{siteConfig.contact.description}</p>
              {siteConfig.contact.methods.map((method) => (
                method.href ? (
                  <a key={method.value} className="contact-link" href={method.href}>
                    <span>{method.label}</span>{method.value}<ArrowUpRight size={28} />
                  </a>
                ) : (
                  <button
                    key={method.value}
                    className="contact-link"
                    type="button"
                    onClick={() => copyContact(method.value)}
                    title={`Copy ${method.label}`}
                  >
                    <span>{method.label}</span>{method.value}
                    {copied === method.value ? <Check size={26} /> : <Copy size={26} />}
                  </button>
                )
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <span>{siteConfig.footer.left}</span>
        <span>{siteConfig.footer.right}</span>
        <a href="#home">Back to top <ArrowUpRight size={15} /></a>
      </footer>
    </div>
  );
}

export default App;
