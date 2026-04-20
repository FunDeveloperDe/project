import { motion, useInView } from 'framer-motion';
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
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.08 }}
      className={`grid gap-8 border-t border-white/[0.08] py-10 lg:grid-cols-2 lg:items-start ${reverse ? 'lg:[&>*:first-child]:order-2' : ''}`}
    >
      <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/20 shadow-[0_20px_60px_rgba(0,0,0,0.28)]">
        <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.04] px-4 py-3 text-xs uppercase tracking-[0.24em] text-zinc-400">
          <span>{category}</span>
          <span>{previewLabel}</span>
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

      <div className="pt-2">
        <p className="text-sm uppercase tracking-[0.24em] text-emerald-200/70">{category}</p>
        <h3 className="mt-3 text-3xl font-semibold text-white">{title}</h3>
        <p className="mt-5 max-w-xl text-base leading-8 text-zinc-300">{description}</p>
        <p className="mt-4 max-w-xl text-sm leading-7 text-zinc-400">{outcome}</p>

        <div className="mt-6 flex flex-wrap gap-3">
          {stack.map((item) => (
            <span
              key={item}
              className="border-b border-emerald-300/30 pb-1 text-sm text-emerald-100/90"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}
