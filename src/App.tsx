import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, CheckCircle2, Cpu, ShieldCheck, Zap } from 'lucide-react';
import BootSequence from './components/BootSequence';
import FloatingNav from './components/FloatingNav';
import InteractiveTerminal from './components/InteractiveTerminal';
import MinimalOrbBackground from './components/MinimalOrbBackground';
import ProjectCard from './components/ProjectCard';
import TypingTagline from './components/TypingTagline';
import { siteConfig } from './siteConfig';

const heroSignals = [
  { label: 'Remote validation', value: 'Server first', icon: ShieldCheck },
  { label: 'Gameplay feel', value: 'Responsive', icon: Zap },
  { label: 'Architecture', value: 'Modular', icon: Cpu },
];

function App() {
  const [booted, setBooted] = useState(false);
  const skillsRef = useRef(null);
  const isSkillsInView = useInView(skillsRef, { once: true, margin: '-80px' });

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

  useEffect(() => {
    if (!booted) {
      return;
    }

    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    window.scrollTo(0, 0);
  }, [booted]);

  return (
    <>
      <BootSequence
        onComplete={() => setBooted(true)}
        label={siteConfig.boot.label}
        steps={siteConfig.boot.steps}
        loadingLabel={siteConfig.boot.loadingLabel}
        readyLabel={siteConfig.boot.readyLabel}
        queuedLabel={siteConfig.boot.queuedLabel}
      />

      {booted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45 }}
          className="min-h-screen text-[var(--ink)]"
        >
          <MinimalOrbBackground />
          <FloatingNav brandName={siteConfig.brand.name} items={siteConfig.navigation} />

          <main className="relative z-10 mx-auto max-w-6xl px-5 pb-16 pt-32 sm:px-8 lg:px-10">
            <section id="home" className="scroll-mt-28 border-b border-[var(--line)] pb-20 pt-8 lg:min-h-[calc(100vh-8rem)]">
              <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
                <div>
                  <motion.p
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45 }}
                    className="section-kicker"
                  >
                    {siteConfig.hero.eyebrow}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.48, delay: 0.04 }}
                    className="mt-5 inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[rgba(255,250,242,0.72)] px-3 py-2 text-sm font-semibold text-[var(--muted)]"
                  >
                    <span className="h-2.5 w-2.5 rounded-full bg-[var(--accent-2)]" />
                    {siteConfig.brand.badge}
                  </motion.div>

                  <motion.h1
                    initial={{ opacity: 0, y: 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: 0.08 }}
                    className="mt-6 max-w-4xl text-[clamp(2.9rem,6.6vw,6.3rem)] font-black leading-[0.92] tracking-normal text-[var(--ink)]"
                  >
                    {siteConfig.hero.title}
                  </motion.h1>

                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.52, delay: 0.14 }}
                    className="mt-6 text-xl font-bold sm:text-2xl"
                  >
                    <TypingTagline phrases={siteConfig.brand.taglinePhrases} />
                  </motion.div>

                  <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.52, delay: 0.2 }}
                    className="mt-6 max-w-2xl section-copy sm:text-lg"
                  >
                    {siteConfig.hero.description}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.52, delay: 0.26 }}
                    className="mt-9 flex flex-col gap-3 sm:flex-row"
                  >
                    <a href="#work" className="ink-button px-5 py-3">
                      {siteConfig.hero.primaryCta}
                      <ArrowRight size={18} />
                    </a>
                    <a href="#contact" className="line-button px-5 py-3">
                      {siteConfig.hero.secondaryCta}
                    </a>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.18 }}
                  className="human-card signal-line overflow-hidden p-5 sm:p-6"
                >
                  <div className="relative z-10">
                    <div className="flex items-start justify-between gap-5">
                      <div>
                        <p className="section-kicker">{siteConfig.hero.availabilityLabel}</p>
                        <p className="mt-4 text-2xl font-black leading-tight text-[var(--ink)] sm:text-3xl">
                          {siteConfig.hero.availability}
                        </p>
                      </div>
                      <div className="hidden rounded-[12px] border border-[rgba(37,111,104,0.2)] bg-[rgba(37,111,104,0.08)] px-3 py-2 text-sm font-black text-[var(--accent-2)] sm:block">
                        Live
                      </div>
                    </div>

                    <div className="mt-8 grid gap-3">
                      {heroSignals.map(({ label, value, icon: Icon }, index) => (
                        <motion.div
                          key={label}
                          initial={{ opacity: 0, x: 16 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.42, delay: 0.3 + index * 0.08 }}
                          className="grid grid-cols-[auto,1fr,auto] items-center gap-3 rounded-[12px] border border-[var(--line)] bg-[rgba(255,250,242,0.62)] p-3"
                        >
                          <span className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-[var(--ink)] text-[var(--surface)]">
                            <Icon size={18} />
                          </span>
                          <span>
                            <span className="block text-sm font-bold text-[var(--ink)]">{label}</span>
                            <span className="block text-xs text-[var(--muted)]">{value}</span>
                          </span>
                          <CheckCircle2 size={18} className="text-[var(--accent-2)]" />
                        </motion.div>
                      ))}
                    </div>

                    <div className="mt-7 grid gap-2 text-sm font-semibold text-[var(--muted)]">
                      {siteConfig.about.highlights.map((item) => (
                        <div key={item} className="flex items-center justify-between border-t border-[var(--line)] pt-3">
                          <span>{item}</span>
                          <span className="text-[var(--accent)]">{siteConfig.about.highlightValueLabel}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </section>

            <section id="services" className="scroll-mt-28 border-b border-[var(--line)] py-20">
              <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
                <div>
                  <p className="section-kicker">{siteConfig.services.eyebrow}</p>
                  <h2 className="section-title mt-4">{siteConfig.services.title}</h2>
                </div>

                <div className="grid gap-4">
                  {siteConfig.services.items.map((item, index) => (
                    <article key={item.title} className="paper-panel grid gap-4 p-5 md:grid-cols-[auto,0.45fr,0.55fr] md:items-start">
                      <span className="text-sm font-black text-[var(--accent)]">{String(index + 1).padStart(2, '0')}</span>
                      <h3 className="text-2xl font-black leading-tight text-[var(--ink)]">{item.title}</h3>
                      <p className="section-copy text-base">{item.description}</p>
                    </article>
                  ))}
                </div>
              </div>
            </section>

            <section id="work" className="scroll-mt-28 py-20">
              <div className="mb-10 grid gap-5 border-b border-[var(--line)] pb-8 lg:grid-cols-[0.82fr_1.18fr]">
                <div>
                  <p className="section-kicker">{siteConfig.projects.eyebrow}</p>
                  <h2 className="section-title mt-4">{siteConfig.projects.title}</h2>
                </div>
                <p className="max-w-2xl section-copy">{siteConfig.projects.intro}</p>
              </div>

              <div>
                {siteConfig.projects.items.map((project, index) => (
                  <ProjectCard
                    key={project.title}
                    {...project}
                    index={index}
                    previewLabel={siteConfig.projects.previewLabel}
                  />
                ))}
              </div>
            </section>

            <section id="skills" ref={skillsRef} className="scroll-mt-28 border-y border-[var(--line)] py-20">
              <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
                <div>
                  <p className="section-kicker">{siteConfig.skills.eyebrow}</p>
                  <h2 className="section-title mt-4">{siteConfig.skills.title}</h2>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  {siteConfig.skills.groups.map((group, index) => (
                    <motion.div
                      key={group.category}
                      initial={{ opacity: 0, y: 18 }}
                      animate={isSkillsInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.38, delay: index * 0.08 }}
                      className="human-card p-5"
                    >
                      <div className="relative z-10">
                        <h3 className="text-xl font-black text-[var(--ink)]">{group.category}</h3>
                        <ul className="mt-5 space-y-3">
                          {group.items.map((item) => (
                            <li key={item} className="flex items-start gap-2 text-sm font-semibold leading-6 text-[var(--muted)]">
                              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            <section id="about" className="scroll-mt-28 py-20">
              <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
                <div>
                  <p className="section-kicker">{siteConfig.about.eyebrow}</p>
                  <h2 className="section-title mt-4">{siteConfig.about.title}</h2>
                </div>

                <div className="paper-panel p-6 sm:p-8">
                  <div className="grid gap-6 text-lg leading-9 text-[var(--muted)]">
                    {siteConfig.about.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section id="terminal" className="scroll-mt-28 border-t border-[var(--line)] py-20">
              <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
                <div>
                  <p className="section-kicker">{siteConfig.terminal.eyebrow}</p>
                  <h2 className="section-title mt-4">{siteConfig.terminal.title}</h2>
                  <p className="mt-5 section-copy">{siteConfig.terminal.intro}</p>
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

            <section id="contact" className="scroll-mt-28 border-t border-[var(--line)] py-20">
              <div className="human-card overflow-hidden p-6 sm:p-8">
                <div className="relative z-10 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
                  <div>
                    <p className="section-kicker">{siteConfig.contact.eyebrow}</p>
                    <h2 className="mt-4 max-w-3xl text-[clamp(2.25rem,5vw,5.4rem)] font-black leading-[0.93] text-[var(--ink)]">
                      {siteConfig.contact.title}
                    </h2>
                    <p className="mt-5 max-w-2xl section-copy">{siteConfig.contact.description}</p>
                  </div>

                  <div className="grid gap-4">
                    {siteConfig.contact.methods.map((method) => {
                      const content = (
                        <>
                          <p className="text-sm font-bold text-[var(--accent)]">{method.label}</p>
                          <div className="mt-2 break-words text-3xl font-black text-[var(--ink)]">{method.value}</div>
                        </>
                      );

                      return (
                        <div key={`${method.label}-${method.value}`} className="rounded-[14px] border border-[var(--line)] bg-[rgba(255,250,242,0.66)] p-5">
                          {method.href ? (
                            <a
                              href={method.href}
                              className="block transition hover:text-[var(--accent)]"
                              target={method.href.startsWith('http') ? '_blank' : undefined}
                              rel={method.href.startsWith('http') ? 'noreferrer' : undefined}
                            >
                              {content}
                            </a>
                          ) : (
                            content
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </section>

            {(siteConfig.footer.left || siteConfig.footer.right) && (
              <footer className="border-t border-[var(--line)] py-8">
                <div className="flex flex-col gap-3 text-sm font-semibold text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between">
                  {siteConfig.footer.left && <p>{siteConfig.footer.left}</p>}
                  {siteConfig.footer.right && <p>{siteConfig.footer.right}</p>}
                </div>
              </footer>
            )}
          </main>
        </motion.div>
      )}
    </>
  );
}

export default App;
