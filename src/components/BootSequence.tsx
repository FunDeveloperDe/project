import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface BootSequenceProps {
  onComplete: () => void;
  label: string;
  steps: string[];
  loadingLabel: string;
  readyLabel: string;
  queuedLabel: string;
}

export default function BootSequence({
  onComplete,
  label,
  steps,
  loadingLabel,
  readyLabel,
  queuedLabel,
}: BootSequenceProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timeouts: number[] = [];

    steps.forEach((_, index) => {
      timeouts.push(
        window.setTimeout(() => {
          setActiveStep(index);
        }, 420 + index * 500)
      );
    });

    timeouts.push(
      window.setTimeout(() => {
        setShow(false);
        window.setTimeout(onComplete, 260);
      }, 420 + steps.length * 500 + 500)
    );

    return () => {
      timeouts.forEach((timeout) => window.clearTimeout(timeout));
    };
  }, [onComplete, steps]);

  if (!show) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-[radial-gradient(circle_at_top,rgba(52,211,153,0.14),transparent_35%),linear-gradient(180deg,#07110c_0%,#0b1510_100%)] px-6"
      >
        <div className="w-full max-w-2xl">
          <p className="text-sm uppercase tracking-[0.32em] text-emerald-200/70">{label}</p>
          <div className="mt-8 grid gap-5">
            {steps.map((step, index) => {
              const isDone = index < activeStep;
              const isActive = index === activeStep;

              return (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="grid grid-cols-[auto,1fr,auto] items-center gap-4 border-b border-white/[0.08] pb-4"
                >
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-full border text-sm ${
                      isDone || isActive
                        ? 'border-emerald-300/40 bg-emerald-300/10 text-emerald-200'
                        : 'border-white/10 text-zinc-500'
                    }`}
                  >
                    {index + 1}
                  </span>
                  <span className={isDone || isActive ? 'text-zinc-100' : 'text-zinc-500'}>{step}</span>
                  <span className="min-w-24 text-right text-xs uppercase tracking-[0.24em] text-zinc-500">
                    {isDone ? readyLabel : isActive ? loadingLabel : queuedLabel}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
