interface GlassPanelProps {
  children: React.ReactNode;
  className?: string;
}

export function GlassPanel({ children, className = "" }: GlassPanelProps) {
  return (
    <div className={`rounded-2xl border border-ink/10 bg-white/6 backdrop-blur-2xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.08)] ${className}`}>
      {children}
    </div>
  );
}
