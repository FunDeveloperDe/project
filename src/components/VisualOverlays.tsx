export default function VisualOverlays() {
  return (
    <>
      <div
        className="fixed inset-0 z-[2] pointer-events-none opacity-[0.022]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' /%3E%3C/svg%3E")`
        }}
      />

      <div
        className="fixed inset-0 z-[2] pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.5) 2px, rgba(0,0,0,0.5) 4px)'
        }}
      />

      <div className="fixed inset-0 z-0 pointer-events-none">
        <div
          className="absolute top-0 left-0 w-[800px] h-[800px] rounded-full blur-[120px] opacity-20 animate-[breath_8s_ease-in-out_infinite]"
          style={{
            background: 'radial-gradient(circle, #00D4FF 0%, transparent 70%)',
            animationDelay: '0s'
          }}
        />
        <div
          className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full blur-[100px] opacity-15 animate-[breath_10s_ease-in-out_infinite]"
          style={{
            background: 'radial-gradient(circle, #7B61FF 0%, transparent 70%)',
            animationDelay: '2s'
          }}
        />
      </div>

      <style>{`
        @keyframes breath {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
      `}</style>
    </>
  );
}
