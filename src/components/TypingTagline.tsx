import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface TypingTaglineProps {
  phrases: string[];
}

export default function TypingTagline({ phrases }: TypingTaglineProps) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (phrases.length === 0) {
      return;
    }

    const currentPhrase = phrases[phraseIndex];

    const timeout = window.setTimeout(() => {
      if (!isDeleting) {
        if (text.length < currentPhrase.length) {
          setText(currentPhrase.slice(0, text.length + 1));
        } else {
          window.setTimeout(() => setIsDeleting(true), 1600);
        }
      } else if (text.length > 0) {
        setText(text.slice(0, -1));
      } else {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
      }
    }, isDeleting ? 30 : 50);

    return () => window.clearTimeout(timeout);
  }, [isDeleting, phraseIndex, phrases, text]);

  return (
    <div className="flex items-center gap-2">
      <span className="text-emerald-100/[0.92]">{text}</span>
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="inline-block h-6 w-0.5 bg-emerald-300"
      />
    </div>
  );
}
