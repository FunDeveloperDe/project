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
    () => items.filter((item) => ['home', 'work', 'services', 'about', 'terminal', 'contact'].includes(item.id)),
    [items],
  );

  useEffect(() => {
    const observers = navItems.map((item) => {
      const element = document.getElementById(item.id);
      if (!element) return null;
      const observer = new IntersectionObserver(
        ([entry]) => entry.isIntersecting && setActiveSection(item.id),
        { rootMargin: '-34% 0px -58% 0px', threshold: 0.01 },
      );
      observer.observe(element);
      return observer;
    });
    return () => {
      for (const observer of observers) observer?.disconnect();
    };
  }, [navItems]);

  useEffect(() => {
    document.body.classList.toggle('menu-is-open', menuOpen);
    return () => document.body.classList.remove('menu-is-open');
  }, [menuOpen]);

  return (
    <header className="site-header">
      <a className="brand-lockup" href="#home" onClick={() => setMenuOpen(false)}>
        <span className="brand-mark" aria-hidden="true">V</span>
        <span><strong>{brandName}</strong><small>Roblox programmer / Luau</small></span>
      </a>

      <nav className="desktop-nav" aria-label="Primary navigation">
        {navItems.map((item, index) => (
          <a key={item.id} href={`#${item.id}`} className={activeSection === item.id ? 'active' : ''}>
            <span>0{index + 1}</span>{item.label}
          </a>
        ))}
      </nav>

      <span className="header-status"><i />Status: accepting commissions</span>

      <button
        className="menu-toggle"
        type="button"
        onClick={() => setMenuOpen((current) => !current)}
        aria-expanded={menuOpen}
        aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
      >
        {menuOpen ? <X size={21} /> : <Menu size={21} />}
      </button>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            className="mobile-nav"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <p className="mobile-nav-status"><i />Status: accepting commissions</p>
            {navItems.map((item, index) => (
              <a key={item.id} href={`#${item.id}`} onClick={() => setMenuOpen(false)}>
                <span>0{index + 1}</span>{item.label}<ArrowIndicator />
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

function ArrowIndicator() {
  return <span className="nav-arrow" aria-hidden="true">{"\u2197"}</span>;
}
