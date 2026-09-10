import { NeoCard } from "@/components/ui/neo-card";
import { SectionReveal } from "@/components/ui/section-reveal";

interface ProjectCardProps {
  title: string;
  industry: string;
  description: string;
  features: string[];
  accentColor: string;
  delay?: number;
}

export function ProjectCard({ title, industry, description, features, accentColor, delay = 0 }: ProjectCardProps) {
  return (
    <SectionReveal delay={delay}>
      <NeoCard className="overflow-hidden">
        <div className={`h-2 w-full ${accentColor}`} />
        <div className="p-8">
          <p className="font-sans text-xs font-medium uppercase tracking-widest text-ink/50">{industry}</p>
          <h3 className="mt-2 font-display text-2xl font-light">{title}</h3>
          <p className="mt-4 text-sm text-ink/50 leading-relaxed">{description}</p>
          <ul className="mt-6 space-y-2">
            {features.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-ink/70">
                <span className="mt-0.5 text-accent">&#10003;</span>
                {f}
              </li>
            ))}
          </ul>
        </div>
      </NeoCard>
    </SectionReveal>
  );
}
