import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import type { SiteNavItem } from '../siteConfig';

interface FloatingNavProps {
  brandName: string;
  items: SiteNavItem[];
}

export default function FloatingNav({ brandName, items }: FloatingNavProps) {
  const [activeSection, setActiveSection] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const navItems = useMemo(
    () => items.filter((item) => ['home', 'work', 'services', 'about', 'contact'].includes(item.id)),
    [items]
  );

  useEffect(() => {
    const observers = navItems.map((item) => {
      const element = document.getElementById(item.id);
      if (!element) return null;

      const observer = new IntersectionObserver(
        ([entry]) => entry.isIntersecting && setActiveSection(item.id),
        { rootMargin: '-35% 0px -58% 0px', threshold: 0.01 }
      );
      observer.observe(element);
      return observer;
    });

    return () => observers.forEach((observer) => observer?.disconnect());
  }, [navItems]);

  useEffect(() => {
    document.body.classList.toggle('menu-is-open', menuOpen);
    return () => document.body.classList.remove('menu-is-open');
  }, [menuOpen]);

  return (
    <header className="site-header">
      <a className="brand-lockup" href="#home" onClick={() => setMenuOpen(false)}>
        <span className="brand-mark">V/</span>
        <span>{brandName}<small>Systems developer</small></span>
      </a>

      <nav className="desktop-nav" aria-label="Primary navigation">
        {navItems.map((item) => (
          <a key={item.id} href={`#${item.id}`} className={activeSection === item.id ? 'active' : ''}>
            {item.label}
          </a>
        ))}
      </nav>

      <button
        className="menu-toggle"
        type="button"
        onClick={() => setMenuOpen((current) => !current)}
        aria-expanded={menuOpen}
        aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
      >
        {menuOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            className="mobile-nav"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
          >
            {navItems.map((item, index) => (
              <a key={item.id} href={`#${item.id}`} onClick={() => setMenuOpen(false)}>
                <span>0{index + 1}</span>{item.label}
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
