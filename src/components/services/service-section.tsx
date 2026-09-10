import { NeoCard } from "@/components/ui/neo-card";
import { SectionReveal } from "@/components/ui/section-reveal";

interface ServiceSectionProps {
  title: string;
  description: string;
  features: string[];
  index: number;
}

export function ServiceSection({ title, description, features, index }: ServiceSectionProps) {
  return (
    <SectionReveal delay={index * 0.05}>
      <NeoCard className="p-8 md:p-10">
        <h3 className="font-display text-2xl font-light md:text-3xl">{title}</h3>
        <p className="mt-4 text-ink/50 leading-relaxed">{description}</p>
        <ul className="mt-6 grid gap-2 sm:grid-cols-2">
          {features.map((feature) => (
            <li key={feature} className="flex items-start gap-2 text-sm text-ink/70">
              <svg className="mt-1 h-3 w-3 shrink-0 text-accent" viewBox="0 0 12 12" fill="none">
                <path d="M6 10V2M6 2L2 6M6 2L10 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {feature}
            </li>
          ))}
        </ul>
      </NeoCard>
    </SectionReveal>
  );
}
