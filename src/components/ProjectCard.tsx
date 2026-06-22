import { motion, useInView } from 'framer-motion';
import { Play, Sparkles } from 'lucide-react';
import { useRef } from 'react';
import type { SiteProject } from '../siteConfig';

interface ProjectCardProps extends SiteProject {
  index: number;
  previewLabel: string;
}

function getEmbedUrl(videoUrl: string) {
  try {
    const url = new URL(videoUrl);

    if (url.hostname.includes('youtu.be')) {
      return `https://www.youtube.com/embed/${url.pathname.replace('/', '')}`;
    }

    if (url.hostname.includes('youtube.com')) {
      if (url.pathname.startsWith('/embed/')) {
        return videoUrl;
      }

      const videoId = url.searchParams.get('v');
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }
    }
  } catch {
    return videoUrl;
  }

  return videoUrl;
}

export default function ProjectCard({
  title,
  category,
  description,
  outcome,
  stack,
  videoUrl,
  index,
  previewLabel,
}: ProjectCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const reverse = index % 2 === 1;
  const embedUrl = getEmbedUrl(videoUrl);

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      className={`grid gap-6 border-t border-[var(--line)] py-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-stretch ${
        reverse ? 'lg:[&>*:first-child]:order-2' : ''
      }`}
    >
      <div className="paper-panel overflow-hidden bg-[var(--ink)]">
        <div className="flex min-h-12 items-center justify-between gap-4 border-b border-white/10 bg-[rgba(255,250,242,0.08)] px-4 py-3 text-xs font-bold text-[rgba(255,250,242,0.76)]">
          <span className="inline-flex items-center gap-2">
            <Play size={14} />
            {previewLabel}
          </span>
          <span>{String(index + 1).padStart(2, '0')}</span>
        </div>
        <div className="aspect-video w-full">
          <iframe
            className="h-full w-full"
            src={embedUrl}
            title={`${title} preview`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>

      <div className="human-card overflow-hidden p-6 sm:p-8">
        <div className="relative z-10 flex h-full flex-col">
          <div>
            <p className="section-kicker">{category}</p>
            <h3 className="mt-3 text-3xl font-black leading-tight text-[var(--ink)] sm:text-4xl">{title}</h3>
            <p className="mt-5 section-copy">{description}</p>
          </div>

          <div className="mt-7 rounded-[12px] border border-[rgba(37,111,104,0.18)] bg-[rgba(37,111,104,0.07)] p-4">
            <div className="flex items-start gap-3">
              <Sparkles className="mt-1 shrink-0 text-[var(--accent-2)]" size={18} />
              <p className="text-sm leading-7 text-[var(--muted)]">{outcome}</p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {stack.map((item) => (
              <span key={item} className="signal-chip px-3 py-1.5 text-sm font-semibold">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
