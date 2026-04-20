import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import type { SiteNavItem } from '../siteConfig';

interface FloatingNavProps {
  items: SiteNavItem[];
}

export default function FloatingNav({ items }: FloatingNavProps) {
  const [activeSection, setActiveSection] = useState('home');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsVisible(true), 250);

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
        { threshold: 0.35 }
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
      initial={{ y: -20, opacity: 0 }}
      animate={isVisible ? { y: 0, opacity: 1 } : {}}
      className="fixed left-1/2 top-5 z-50 w-[calc(100%-1.5rem)] max-w-4xl -translate-x-1/2 rounded-2xl border border-white/10 bg-[#0e1813]/85 px-3 py-3 shadow-[0_12px_40px_rgba(0,0,0,0.28)] backdrop-blur"
    >
      <ul className="flex flex-wrap items-center justify-center gap-2">
        {items.map((item) => (
          <li key={item.id} className="relative">
            <button
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => scrollToSection(item.id)}
              className={`relative z-10 rounded-xl px-4 py-2 text-sm transition ${
                activeSection === item.id ? 'text-emerald-950' : 'text-zinc-300 hover:text-white'
              }`}
            >
              {item.label}
            </button>
            {activeSection === item.id && (
              <motion.div
                layoutId="nav-active-pill"
                className="absolute inset-0 rounded-xl bg-emerald-300"
                transition={{ type: 'spring', stiffness: 320, damping: 28 }}
              />
            )}
          </li>
        ))}
      </ul>
    </motion.nav>
  );
}
