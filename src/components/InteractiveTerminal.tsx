import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Command, Sparkles, TerminalSquare } from 'lucide-react';

interface TerminalEntry {
  type: 'system' | 'user' | 'output' | 'error';
  content: string;
}

interface InteractiveTerminalProps {
  initialMessage: string;
  commands: Record<string, string[]>;
  quickCommands: string[];
  visualCommands: string[];
  panelLabel: string;
  panelDescription: string;
  visualsEnabledLabel: string;
  feedLabel: string;
  promptLabel: string;
  processingLabel: string;
  inputPlaceholder: string;
  unknownCommandPrefix: string;
  visualResponses: Record<string, string>;
}

interface VisualParticle {
  id: string;
  left: number;
  size: number;
  delay: number;
  duration: number;
  color: string;
}

interface MatrixColumn {
  id: string;
  left: number;
  duration: number;
  delay: number;
  characters: string;
  fontSize: number;
  opacity: number;
  blur: number;
}

interface GlitchSlice {
  id: string;
  top: number;
  height: number;
  x: number;
  color: string;
  delay: number;
}

interface BlackholeRing {
  id: string;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
}

type VisualCommand = 'confetti' | 'fireworks' | 'matrix' | 'glitch' | 'blackhole';

function createParticles(type: 'confetti' | 'fireworks', count: number): VisualParticle[] {
  const palette =
    type === 'confetti'
      ? ['#34d399', '#a3e635', '#facc15', '#f9a8d4', '#93c5fd']
      : ['#34d399', '#facc15', '#fca5a5', '#93c5fd', '#c4b5fd'];

  return Array.from({ length: count }, (_, index) => ({
    id: `${type}-${index}-${Math.random().toString(36).slice(2, 8)}`,
    left: Math.random() * 100,
    size: type === 'confetti' ? 8 + Math.random() * 14 : 14 + Math.random() * 24,
    delay: Math.random() * 0.8,
    duration: type === 'confetti' ? 4.2 + Math.random() * 2.2 : 3.8 + Math.random() * 1.8,
    color: palette[index % palette.length],
  }));
}

function createMatrixColumns(count: number): MatrixColumn[] {
  const glyphs = '01010101010110100101001010101010101101010100101010101010';

  return Array.from({ length: count }, (_, index) => ({
    id: `matrix-${index}-${Math.random().toString(36).slice(2, 8)}`,
    left: (index / count) * 100 + Math.random() * 0.8,
    duration: 2.2 + Math.random() * 1.4,
    delay: Math.random() * 0.45,
    characters: Array.from({ length: 120 }, () => glyphs[Math.floor(Math.random() * glyphs.length)]).join(' '),
    fontSize: 12 + Math.random() * 8,
    opacity: 0.5 + Math.random() * 0.4,
    blur: Math.random() * 2.2,
  }));
}

function createGlitchSlices(count: number): GlitchSlice[] {
  const colors = ['rgba(52,211,153,0.18)', 'rgba(244,63,94,0.18)', 'rgba(96,165,250,0.18)'];

  return Array.from({ length: count }, (_, index) => ({
    id: `glitch-${index}-${Math.random().toString(36).slice(2, 8)}`,
    top: Math.random() * 100,
    height: 12 + Math.random() * 28,
    x: (Math.random() - 0.5) * 140,
    color: colors[index % colors.length],
    delay: Math.random() * 0.8,
  }));
}

function createBlackholeRings(count: number): BlackholeRing[] {
  return Array.from({ length: count }, (_, index) => ({
    id: `blackhole-${index}-${Math.random().toString(36).slice(2, 8)}`,
    size: 180 + index * 72,
    delay: index * 0.14,
    duration: 4.5 + index * 0.22,
    opacity: Math.max(0.16, 0.6 - index * 0.05),
  }));
}

export default function InteractiveTerminal({
  initialMessage,
  commands,
  quickCommands,
  visualCommands,
  panelLabel,
  panelDescription,
  visualsEnabledLabel,
  feedLabel,
  promptLabel,
  processingLabel,
  inputPlaceholder,
  unknownCommandPrefix,
  visualResponses,
}: InteractiveTerminalProps) {
  const [history, setHistory] = useState<TerminalEntry[]>([{ type: 'system', content: initialMessage }]);
  const [input, setInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [confettiBurst, setConfettiBurst] = useState<VisualParticle[]>([]);
  const [fireworkBurst, setFireworkBurst] = useState<VisualParticle[]>([]);
  const [matrixColumns, setMatrixColumns] = useState<MatrixColumn[]>([]);
  const [glitchSlices, setGlitchSlices] = useState<GlitchSlice[]>([]);
  const [blackholeRings, setBlackholeRings] = useState<BlackholeRing[]>([]);

  const terminalRef = useRef<HTMLDivElement>(null);

  const quickCommandItems = useMemo(() => quickCommands, [quickCommands]);

  useEffect(() => {
    terminalRef.current?.scrollTo({ top: terminalRef.current.scrollHeight, behavior: 'smooth' });
  }, [history, isProcessing]);

  useEffect(() => {
    if (confettiBurst.length === 0) {
      return;
    }

    const timeout = window.setTimeout(() => setConfettiBurst([]), 7000);
    return () => window.clearTimeout(timeout);
  }, [confettiBurst]);

  useEffect(() => {
    if (fireworkBurst.length === 0) {
      return;
    }

    const timeout = window.setTimeout(() => setFireworkBurst([]), 6200);
    return () => window.clearTimeout(timeout);
  }, [fireworkBurst]);

  useEffect(() => {
    if (matrixColumns.length === 0) {
      return;
    }

    const timeout = window.setTimeout(() => setMatrixColumns([]), 180000);
    return () => window.clearTimeout(timeout);
  }, [matrixColumns]);

  useEffect(() => {
    if (glitchSlices.length === 0) {
      return;
    }

    const timeout = window.setTimeout(() => setGlitchSlices([]), 3200);
    return () => window.clearTimeout(timeout);
  }, [glitchSlices]);

  useEffect(() => {
    if (blackholeRings.length === 0) {
      return;
    }

    const timeout = window.setTimeout(() => setBlackholeRings([]), 7600);
    return () => window.clearTimeout(timeout);
  }, [blackholeRings]);

  const appendOutput = (lines: string[]) => {
    setHistory((prev) => [...prev, ...lines.map((content) => ({ type: 'output' as const, content }))]);
  };

  const triggerVisualCommand = (type: VisualCommand) => {
    if (type === 'confetti') {
      setConfettiBurst(createParticles('confetti', 90));
    } else if (type === 'fireworks') {
      setFireworkBurst(createParticles('fireworks', 48));
    } else if (type === 'matrix') {
      setMatrixColumns(createMatrixColumns(160));
    } else if (type === 'glitch') {
      setGlitchSlices(createGlitchSlices(26));
    } else if (type === 'blackhole') {
      setBlackholeRings(createBlackholeRings(10));
    }

    appendOutput([visualResponses[type] ?? `${type} engaged.`]);
  };

  const handleCommand = async (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) {
      return;
    }

    setHistory((prev) => [...prev, { type: 'user', content: cmd }]);
    setCommandHistory((prev) => [...prev, cmd]);
    setInput('');
    setHistoryIndex(-1);
    setIsProcessing(true);

    await new Promise((resolve) => window.setTimeout(resolve, 180));

    if (trimmed === 'clear') {
      setHistory([{ type: 'system', content: initialMessage }]);
      setConfettiBurst([]);
      setFireworkBurst([]);
      setMatrixColumns([]);
      setGlitchSlices([]);
      setBlackholeRings([]);
    } else if (visualCommands.includes(trimmed)) {
      triggerVisualCommand(trimmed as VisualCommand);
    } else if (commands[trimmed]) {
      appendOutput(commands[trimmed]);
    } else {
      setHistory((prev) => [...prev, { type: 'error', content: `${unknownCommandPrefix} ${cmd}` }]);
    }

    setIsProcessing(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleCommand(input);
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (commandHistory.length === 0) {
        return;
      }

      const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex;
      setHistoryIndex(newIndex);
      setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-[120] overflow-hidden">
        <AnimatePresence>
          {confettiBurst.map((particle) => (
            <motion.span
              key={particle.id}
              initial={{ opacity: 0, y: -80, x: 0, rotate: 0 }}
              animate={{ opacity: [0, 1, 1, 0], y: '110vh', x: (particle.left % 2 === 0 ? -1 : 1) * 180, rotate: 760 }}
              exit={{ opacity: 0 }}
              transition={{ duration: particle.duration, delay: particle.delay, ease: 'easeOut' }}
              className="absolute top-0 rounded-sm"
              style={{
                left: `${particle.left}%`,
                width: `${particle.size}px`,
                height: `${particle.size * 1.8}px`,
                backgroundColor: particle.color,
                boxShadow: `0 0 12px ${particle.color}`,
              }}
            />
          ))}
        </AnimatePresence>

        <AnimatePresence>
          {fireworkBurst.map((particle) => (
            <motion.span
              key={particle.id}
              initial={{ opacity: 0, scale: 0.08, y: '55vh' }}
              animate={{ opacity: [0, 1, 0.85, 0], scale: [0.08, 1.2, 1.65, 1.9], y: ['55vh', '18vh', '10vh', '4vh'] }}
              exit={{ opacity: 0 }}
              transition={{ duration: particle.duration, delay: particle.delay, ease: 'easeOut' }}
              className="absolute rounded-full blur-[1px]"
              style={{
                left: `${particle.left}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                backgroundColor: particle.color,
                boxShadow: `0 0 28px ${particle.color}, 0 0 56px ${particle.color}`,
              }}
            />
          ))}
        </AnimatePresence>

        <AnimatePresence>
          {matrixColumns.map((column) => (
            <motion.div
              key={column.id}
              initial={{ opacity: 0, y: '-140vh' }}
              animate={{ opacity: [0, column.opacity, column.opacity, 0], y: '140vh' }}
              exit={{ opacity: 0 }}
              transition={{ duration: column.duration, delay: column.delay, ease: 'linear' }}
              className="absolute top-0 font-mono font-bold leading-[0.8] text-emerald-300"
              style={{
                left: `${column.left}%`,
                fontSize: `${column.fontSize}px`,
                opacity: column.opacity,
                filter: `blur(${column.blur}px)`,
                textShadow: '0 0 12px rgba(74, 222, 128, 0.72), 0 0 24px rgba(74, 222, 128, 0.34)',
                willChange: 'transform, opacity',
              }}
            >
              <div className="whitespace-pre">{column.characters}</div>
            </motion.div>
          ))}
        </AnimatePresence>

        <AnimatePresence>
          {glitchSlices.map((slice) => (
            <motion.span
              key={slice.id}
              initial={{ opacity: 0, x: 0 }}
              animate={{ opacity: [0, 1, 0.9, 0.55, 0], x: [0, slice.x, -slice.x * 0.6, slice.x * 0.25, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.4, delay: slice.delay, ease: 'easeInOut' }}
              className="absolute inset-x-0"
              style={{
                top: `${slice.top}%`,
                height: `${slice.height}px`,
                background: `linear-gradient(90deg, transparent, ${slice.color}, transparent)`,
                boxShadow: `0 0 24px ${slice.color}`,
              }}
            />
          ))}
        </AnimatePresence>

        <AnimatePresence>
          {blackholeRings.map((ring) => (
            <motion.span
              key={ring.id}
              initial={{ opacity: 0, scale: 0.2, rotate: 0 }}
              animate={{ opacity: [0, ring.opacity, ring.opacity * 0.8, 0], scale: [0.2, 1, 1.55, 1.9], rotate: 320 }}
              exit={{ opacity: 0 }}
              transition={{ duration: ring.duration, delay: ring.delay, ease: 'easeOut' }}
              className="absolute left-1/2 top-1/2 rounded-full border border-cyan-200/30"
              style={{
                width: `${ring.size}px`,
                height: `${ring.size}px`,
                marginLeft: `${-ring.size / 2}px`,
                marginTop: `${-ring.size / 2}px`,
                boxShadow: '0 0 42px rgba(96, 165, 250, 0.3), inset 0 0 34px rgba(168, 85, 247, 0.22)',
              }}
            />
          ))}
        </AnimatePresence>

        <AnimatePresence>
          {blackholeRings.length > 0 && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.14, 0.14, 0] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 6.8, ease: 'easeOut' }}
                className="absolute inset-0 bg-[radial-gradient(circle,rgba(0,0,0,0.14)_0%,rgba(2,6,23,0.22)_42%,rgba(0,0,0,0.52)_100%)]"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.2 }}
                animate={{ opacity: [0.2, 0.95, 0.4], scale: [0.2, 1, 1.28] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 5.4, ease: 'easeOut' }}
                className="absolute left-1/2 top-1/2 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(0,0,0,1)_0%,rgba(15,23,42,0.98)_28%,rgba(56,189,248,0.22)_54%,rgba(168,85,247,0.18)_70%,transparent_100%)] blur-[2px]"
              />
            </>
          )}
        </AnimatePresence>
      </div>

      <div className="relative overflow-hidden rounded-[1.75rem] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(12,19,15,0.92),rgba(8,14,11,0.96))] shadow-[0_30px_90px_rgba(0,0,0,0.3)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(52,211,153,0.12),transparent_32%)]" />

        <div className="relative z-10 border-b border-white/[0.08] px-5 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-400/[0.12] text-emerald-200">
                <TerminalSquare size={20} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">{panelLabel}</p>
                <p className="mt-1 text-sm text-zinc-300">{panelDescription}</p>
              </div>
            </div>

            <div className="hidden items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-2 text-xs uppercase tracking-[0.2em] text-emerald-200 md:flex">
              <Sparkles size={14} />
              {visualsEnabledLabel}
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {quickCommandItems.map((command) => (
              <button
                key={command}
                onClick={() => handleCommand(command)}
                className="rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 text-xs uppercase tracking-[0.18em] text-zinc-300 transition hover:border-emerald-300/30 hover:bg-emerald-300/[0.08] hover:text-white"
              >
                {command}
              </button>
            ))}
          </div>
        </div>

        <div className="relative z-10 px-5 pb-5 pt-4">
          <div className="mb-4 flex items-center justify-between text-xs uppercase tracking-[0.24em] text-zinc-500">
            <span className="inline-flex items-center gap-2">
              <Command size={14} />
              {feedLabel}
            </span>
            <span>{promptLabel}</span>
          </div>

          <div
            ref={terminalRef}
            className="max-h-[24rem] min-h-[18rem] space-y-2 overflow-y-auto rounded-2xl border border-white/[0.06] bg-black/20 p-4 font-mono text-sm shadow-inner shadow-black/20"
          >
            <AnimatePresence initial={false}>
              {history.map((entry, index) => (
                <motion.div
                  key={`${entry.type}-${index}-${entry.content}`}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.18 }}
                  className={
                    entry.type === 'system'
                      ? 'text-zinc-500'
                      : entry.type === 'user'
                        ? 'text-white'
                        : entry.type === 'error'
                          ? 'text-rose-300'
                          : 'text-emerald-200'
                  }
                >
                  {entry.type === 'user' && <span className="mr-2 text-emerald-300">$</span>}
                  {entry.content}
                </motion.div>
              ))}
            </AnimatePresence>

            {isProcessing ? (
              <div className="pt-2 text-emerald-200">{processingLabel}</div>
            ) : (
              <div className="sticky bottom-0 flex items-center gap-2 border-t border-white/[0.08] bg-[linear-gradient(180deg,rgba(8,12,10,0),rgba(8,12,10,0.88)_45%,rgba(8,12,10,0.98)_100%)] pt-4">
                <span className="text-emerald-300">$</span>
                <input
                  type="text"
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent text-white outline-none placeholder:text-zinc-600"
                  placeholder={inputPlaceholder}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
