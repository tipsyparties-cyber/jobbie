interface GlassPanelProps {
  children: React.ReactNode;
  className?: string;
}

export function GlassPanel({ children, className = "" }: GlassPanelProps) {
  return (
    <div className={`rounded-2xl border border-ink/10 bg-white/55 backdrop-blur-2xl p-6 shadow-[0_8px_32px_rgba(10,10,10,0.06),inset_0_1px_0_rgba(255,255,255,0.9)] ${className}`}>
      {children}
    </div>
  );
}
