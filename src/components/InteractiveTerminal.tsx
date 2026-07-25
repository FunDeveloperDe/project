import { useEffect, useRef, useState } from 'react';
import { CornerDownLeft, Radio, TerminalSquare } from 'lucide-react';

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
  const [processing, setProcessing] = useState(false);
  const [signal, setSignal] = useState('idle');
  const feedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    feedRef.current?.scrollTo({ top: feedRef.current.scrollHeight, behavior: 'smooth' });
  }, [history, processing]);

  const runCommand = async (rawCommand: string) => {
    const command = rawCommand.trim().toLowerCase();
    if (!command || processing) return;

    setHistory((current) => [...current, { type: 'user', content: rawCommand }]);
    setInput('');
    setProcessing(true);
    await new Promise((resolve) => window.setTimeout(resolve, 160));

    if (command === 'clear') {
      setHistory([{ type: 'system', content: initialMessage }]);
      setSignal('idle');
    } else if (visualCommands.includes(command)) {
      setSignal(command);
      setHistory((current) => [
        ...current,
        { type: 'output', content: visualResponses[command] ?? `${command} signal engaged.` },
      ]);
    } else if (commands[command]) {
      setHistory((current) => [
        ...current,
        ...commands[command].map((content) => ({ type: 'output' as const, content })),
      ]);
    } else {
      setHistory((current) => [
        ...current,
        { type: 'error', content: `${unknownCommandPrefix} ${rawCommand}` },
      ]);
    }

    setProcessing(false);
  };

  return (
    <div className="console" data-signal={signal}>
      <div className="console-topbar">
        <div className="console-identity">
          <TerminalSquare size={19} />
          <div><strong>{panelLabel}</strong><span>{panelDescription}</span></div>
        </div>
        <span className="console-status"><Radio size={13} />{visualsEnabledLabel}</span>
      </div>

      <div className="console-shortcuts" aria-label="Quick commands">
        {quickCommands.map((command) => (
          <button key={command} type="button" onClick={() => runCommand(command)}>{command}</button>
        ))}
      </div>

      <div className="console-feed-heading"><span>{feedLabel}</span><span>{promptLabel}</span></div>
      <div className="console-feed" ref={feedRef} aria-live="polite">
        {history.map((entry, index) => (
          <p key={`${entry.type}-${index}`} className={`console-line ${entry.type}`}>
            <span>{entry.type === 'user' ? '>' : entry.type === 'error' ? '!' : '+'}</span>{entry.content}
          </p>
        ))}
        {processing && <p className="console-line system"><span>~</span>{processingLabel}</p>}
      </div>

      <form
        className="console-input"
        onSubmit={(event) => {
          event.preventDefault();
          runCommand(input);
        }}
      >
        <span>&gt;</span>
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          aria-label={promptLabel}
          placeholder={inputPlaceholder}
        />
        <button type="submit" aria-label="Run command" title="Run command"><CornerDownLeft size={17} /></button>
      </form>
    </div>
  );
}
