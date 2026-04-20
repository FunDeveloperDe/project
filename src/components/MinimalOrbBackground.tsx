import { motion } from 'framer-motion';

export default function MinimalOrbBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(52,211,153,0.14),transparent_24%),radial-gradient(circle_at_82%_20%,rgba(163,230,53,0.08),transparent_24%),radial-gradient(circle_at_50%_55%,rgba(52,211,153,0.06),transparent_32%)]" />

      <div className="absolute inset-0 hidden items-center justify-center lg:flex">
        <div className="relative h-[42rem] w-[42rem] [perspective:1600px]">
          <motion.div
            animate={{ rotateX: [66, 66], rotateY: [0, 360] }}
            transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}
            className="absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 [transform-style:preserve-3d]"
          >
            <div className="absolute inset-0 rounded-full border border-emerald-300/25 shadow-[0_0_120px_rgba(52,211,153,0.12)]" />
            <div className="absolute inset-10 rounded-full border border-white/12" />
            <div className="absolute inset-[5.5rem] rounded-full border border-emerald-200/12" />
            <div className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-300/[0.12] blur-3xl" />
          </motion.div>

          <motion.div
            animate={{ rotateX: [72, 72], rotateY: [360, 0] }}
            transition={{ duration: 34, repeat: Infinity, ease: 'linear' }}
            className="absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 [transform-style:preserve-3d]"
          >
            <div className="absolute inset-0 rounded-full border border-white/8" />
            <div className="absolute inset-16 rounded-full border border-emerald-300/10" />
          </motion.div>

          <motion.div
            animate={{ rotateZ: [0, 360] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
            className="absolute left-1/2 top-1/2 h-[18rem] w-[18rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-300/15"
          />
        </div>
      </div>

      <div className="absolute left-[-5rem] top-40 hidden h-56 w-56 rounded-full border border-emerald-300/10 lg:block" />
      <div className="absolute right-[-3rem] bottom-24 hidden h-40 w-40 rounded-full border border-white/10 lg:block" />
    </div>
  );
}
