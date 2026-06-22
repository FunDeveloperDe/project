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
        }, 300 + index * 360)
      );
    });

    timeouts.push(
      window.setTimeout(() => {
        setShow(false);
        window.setTimeout(onComplete, 240);
      }, 300 + steps.length * 360 + 420)
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
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-[var(--bg)] px-5"
      >
        <div className="human-card signal-line w-full max-w-2xl overflow-hidden p-6 sm:p-8">
          <div className="relative z-10">
            <p className="section-kicker">{label}</p>
            <div className="mt-7 grid gap-3">
              {steps.map((step, index) => {
                const isDone = index < activeStep;
                const isActive = index === activeStep;

                return (
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-[auto,1fr,auto] items-center gap-4 border-b border-[var(--line)] pb-3"
                  >
                    <span
                      className={`flex h-9 w-9 items-center justify-center rounded-[8px] border text-sm font-bold ${
                        isDone || isActive
                          ? 'border-[rgba(191,77,42,0.28)] bg-[rgba(191,77,42,0.1)] text-[var(--accent)]'
                          : 'border-[var(--line)] text-[var(--soft)]'
                      }`}
                    >
                      {index + 1}
                    </span>
                    <span className={isDone || isActive ? 'font-semibold text-[var(--ink)]' : 'text-[var(--muted)]'}>
                      {step}
                    </span>
                    <span className="min-w-20 text-right text-xs font-bold text-[var(--soft)]">
                      {isDone ? readyLabel : isActive ? loadingLabel : queuedLabel}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
