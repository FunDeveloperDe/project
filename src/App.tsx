import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import BootSequence from './components/BootSequence';
import FloatingNav from './components/FloatingNav';
import InteractiveTerminal from './components/InteractiveTerminal';
import MinimalOrbBackground from './components/MinimalOrbBackground';
import ProjectCard from './components/ProjectCard';
import TypingTagline from './components/TypingTagline';
import { siteConfig } from './siteConfig';

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
          transition={{ duration: 0.6 }}
          className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(52,211,153,0.14),transparent_35%),linear-gradient(180deg,#07110c_0%,#0b1510_35%,#101914_100%)] text-zinc-50"
        >
          <MinimalOrbBackground />
          <FloatingNav items={siteConfig.navigation} />

          <div className="relative z-10 mx-auto max-w-6xl px-6 pb-20 pt-28 sm:px-8 lg:px-10">
            <section id="home" className="border-b border-white/[0.08] pb-24 pt-10">
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55 }}
                className="text-sm uppercase tracking-[0.32em] text-emerald-200/70"
              >
                {siteConfig.hero.eyebrow}
              </motion.p>

              <div className="mt-8 grid gap-12 lg:grid-cols-[1.15fr_0.85fr]">
                <div>
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.04 }}
                    className="inline-flex items-center gap-2 border-b border-emerald-300/35 pb-2 text-sm text-emerald-200"
                  >
                    <span className="h-2 w-2 rounded-full bg-emerald-300" />
                    {siteConfig.brand.badge}
                  </motion.div>

                  <motion.h1
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.68, delay: 0.08 }}
                    className="mt-6 max-w-4xl text-5xl font-semibold leading-tight text-white sm:text-6xl"
                  >
                    {siteConfig.hero.title}
                  </motion.h1>

                  <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.68, delay: 0.14 }}
                    className="mt-4 text-xl"
                  >
                    <TypingTagline phrases={siteConfig.brand.taglinePhrases} />
                  </motion.div>

                  <motion.p
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.68, delay: 0.2 }}
                    className="mt-6 max-w-2xl text-base leading-8 text-zinc-300 sm:text-lg"
                  >
                    {siteConfig.hero.description}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.68, delay: 0.26 }}
                    className="mt-10 flex flex-col gap-4 sm:flex-row"
                  >
                    <a
                      href="#work"
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-400 px-5 py-3 font-medium text-emerald-950 transition hover:bg-emerald-300"
                    >
                      {siteConfig.hero.primaryCta}
                      <ArrowRight size={18} />
                    </a>
                    <a
                      href="#contact"
                      className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-5 py-3 font-medium text-white transition hover:border-emerald-300/30 hover:bg-white/10"
                    >
                      {siteConfig.hero.secondaryCta}
                    </a>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.72, delay: 0.18 }}
                  className="flex flex-col justify-between gap-8"
                >
                  <div className="border-l border-emerald-300/35 pl-6">
                    <p className="text-sm uppercase tracking-[0.24em] text-zinc-500">
                      {siteConfig.hero.availabilityLabel}
                    </p>
                    <p className="mt-4 text-2xl font-medium leading-10 text-white">{siteConfig.hero.availability}</p>
                  </div>

                  <div className="grid gap-4 border-t border-white/[0.08] pt-8 text-sm text-zinc-400">
                    {siteConfig.about.highlights.map((item) => (
                      <div key={item} className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                        <span>{item}</span>
                        <span className="text-emerald-200/80">{siteConfig.about.highlightValueLabel}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </section>

            <section id="services" className="border-b border-white/[0.08] py-24">
              <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
                <div>
                  <p className="text-sm uppercase tracking-[0.32em] text-emerald-200/70">
                    {siteConfig.services.eyebrow}
                  </p>
                  <h2 className="mt-4 text-4xl font-semibold text-white">{siteConfig.services.title}</h2>
                </div>

                <div className="space-y-8">
                  {siteConfig.services.items.map((item) => (
                    <div key={item.title} className="grid gap-3 border-b border-white/[0.08] pb-6 md:grid-cols-[0.45fr_0.55fr]">
                      <h3 className="text-2xl font-medium text-white">{item.title}</h3>
                      <p className="text-base leading-8 text-zinc-300">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section id="work" className="py-24">
              <div className="mb-12 grid gap-5 border-b border-white/[0.08] pb-8 lg:grid-cols-[0.85fr_1.15fr]">
                <div>
                  <p className="text-sm uppercase tracking-[0.32em] text-emerald-200/70">
                    {siteConfig.projects.eyebrow}
                  </p>
                  <h2 className="mt-4 text-4xl font-semibold text-white">{siteConfig.projects.title}</h2>
                </div>
                <p className="max-w-2xl text-base leading-8 text-zinc-300">{siteConfig.projects.intro}</p>
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

            <section id="skills" ref={skillsRef} className="border-y border-white/[0.08] py-24">
              <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
                <div>
                  <p className="text-sm uppercase tracking-[0.32em] text-emerald-200/70">
                    {siteConfig.skills.eyebrow}
                  </p>
                  <h2 className="mt-4 text-4xl font-semibold text-white">{siteConfig.skills.title}</h2>
                </div>

                <div className="grid gap-8 md:grid-cols-3">
                  {siteConfig.skills.groups.map((group, index) => (
                    <motion.div
                      key={group.category}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isSkillsInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.45, delay: index * 0.08 }}
                    >
                      <h3 className="border-b border-emerald-300/30 pb-3 text-xl font-medium text-white">
                        {group.category}
                      </h3>
                      <ul className="mt-5 space-y-3 text-zinc-300">
                        {group.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            <section id="about" className="py-24">
              <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
                <div>
                  <p className="text-sm uppercase tracking-[0.32em] text-emerald-200/70">
                    {siteConfig.about.eyebrow}
                  </p>
                  <h2 className="mt-4 text-4xl font-semibold text-white">{siteConfig.about.title}</h2>
                </div>

                <div className="space-y-6 text-base leading-8 text-zinc-300">
                  {siteConfig.about.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </section>

            <section id="terminal" className="border-t border-white/[0.08] py-24">
              <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
                <div>
                  <p className="text-sm uppercase tracking-[0.32em] text-emerald-200/70">
                    {siteConfig.terminal.eyebrow}
                  </p>
                  <h2 className="mt-4 text-4xl font-semibold text-white">{siteConfig.terminal.title}</h2>
                  <p className="mt-5 text-base leading-8 text-zinc-300">{siteConfig.terminal.intro}</p>
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

            <section id="contact" className="border-t border-white/[0.08] py-24">
              <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
                <div>
                  <p className="text-sm uppercase tracking-[0.32em] text-emerald-200/70">
                    {siteConfig.contact.eyebrow}
                  </p>
                  <h2 className="mt-4 text-4xl font-semibold text-white">{siteConfig.contact.title}</h2>
                  <p className="mt-5 max-w-2xl text-base leading-8 text-zinc-300">
                    {siteConfig.contact.description}
                  </p>
                </div>

                <div className="lg:justify-end">
                  <div className="grid gap-5">
                    {siteConfig.contact.methods.map((method) => {
                      const content = (
                        <>
                          <p className="text-sm uppercase tracking-[0.24em] text-zinc-500">{method.label}</p>
                          <div className="mt-3 text-2xl font-medium text-white">{method.value}</div>
                        </>
                      );

                      return (
                        <div key={`${method.label}-${method.value}`} className="border-l border-emerald-300/35 pl-6">
                          {method.href ? (
                            <a
                              href={method.href}
                              className="block transition hover:text-emerald-200"
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
              <footer className="border-t border-white/[0.08] py-8">
                <div className="flex flex-col gap-3 text-sm text-zinc-400 sm:flex-row sm:items-center sm:justify-between">
                  {siteConfig.footer.left && <p>{siteConfig.footer.left}</p>}
                  {siteConfig.footer.right && <p>{siteConfig.footer.right}</p>}
                </div>
              </footer>
            )}
          </div>
        </motion.div>
      )}
    </>
  );
}

export default App;
