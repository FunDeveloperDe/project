import { motion } from 'framer-motion';

export default function MinimalOrbBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(191,77,42,0.1),transparent_24rem),radial-gradient(circle_at_82%_16%,rgba(37,111,104,0.1),transparent_22rem),linear-gradient(180deg,rgba(255,250,242,0.62),rgba(247,243,236,0.92))]" />
      <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(90deg,rgba(23,19,15,0.12)_1px,transparent_1px),linear-gradient(180deg,rgba(23,19,15,0.12)_1px,transparent_1px)] [background-size:88px_88px]" />

      <motion.div
        animate={{ x: [0, 18, 0], y: [0, -10, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute right-[7%] top-28 hidden h-64 w-64 rounded-full border border-[rgba(191,77,42,0.18)] lg:block"
      />
      <motion.div
        animate={{ x: [0, -14, 0], y: [0, 16, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-28 left-[6%] hidden h-48 w-48 rounded-full border border-[rgba(37,111,104,0.18)] lg:block"
      />
      <div className="absolute bottom-[-14rem] right-[-10rem] h-[30rem] w-[30rem] rotate-12 border border-[rgba(23,19,15,0.08)]" />
    </div>
  );
}
