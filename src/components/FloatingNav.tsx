import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import type { SiteNavItem } from '../siteConfig';

interface FloatingNavProps {
  brandName: string;
  items: SiteNavItem[];
}

export default function FloatingNav({ brandName, items }: FloatingNavProps) {
  const [activeSection, setActiveSection] = useState('home');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsVisible(true), 180);

    const observers = items.map((item) => {
      const element = document.getElementById(item.id);
      if (!element) {
        return null;
      }

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(item.id);
          }
        },
        { rootMargin: '-30% 0px -55% 0px', threshold: 0.01 }
      );

      observer.observe(element);
      return observer;
    });

    return () => {
      window.clearTimeout(timer);
      observers.forEach((observer) => observer?.disconnect());
    };
  }, [items]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <motion.nav
      aria-label="Primary navigation"
      initial={{ opacity: 0 }}
      animate={isVisible ? { opacity: 1 } : {}}
      className="fixed left-4 right-4 top-4 z-50 mx-auto max-w-6xl rounded-[18px] border border-[var(--line)] bg-[rgba(255,250,242,0.84)] px-3 py-3 shadow-[var(--shadow-soft)] backdrop-blur-xl"
    >
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <button
          type="button"
          onClick={() => scrollToSection('home')}
          className="flex min-h-11 items-center gap-3 rounded-[10px] px-3 text-left transition hover:bg-[rgba(23,19,15,0.05)]"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-[8px] bg-[var(--ink)] text-sm font-black text-[var(--surface)]">
            V
          </span>
          <span>
            <span className="block text-sm font-black text-[var(--ink)]">{brandName}</span>
            <span className="block text-xs text-[var(--muted)]">Roblox systems</span>
          </span>
        </button>

        <ul className="flex items-center gap-1 overflow-x-auto pb-1 md:flex-wrap md:justify-end md:overflow-visible md:pb-0">
          {items.map((item) => (
            <li key={item.id} className="relative shrink-0">
              <button
                type="button"
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => scrollToSection(item.id)}
                className={`relative z-10 min-h-10 rounded-[10px] px-3 text-sm font-semibold transition ${
                  activeSection === item.id ? 'text-[var(--surface)]' : 'text-[var(--muted)] hover:text-[var(--ink)]'
                }`}
              >
                {item.label}
              </button>
              {activeSection === item.id && (
                <motion.div
                  layoutId="nav-active-pill"
                  className="absolute inset-0 rounded-[10px] bg-[var(--accent)]"
                  transition={{ type: 'spring', stiffness: 340, damping: 30 }}
                />
              )}
            </li>
          ))}
        </ul>
      </div>
    </motion.nav>
  );
}
