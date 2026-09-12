import type { Metadata } from "next";
import Link from "next/link";
import { SectionReveal } from "@/components/ui/section-reveal";

export const metadata: Metadata = {
  title: "Projects",
  description: "See how up+up has transformed businesses with AI & automation — real case studies and project examples.",
};

const projects = [
  {
    slug: "hospitality",
    industry: "Hospitality",
    initials: "HO",
    description: "A fully autonomous cocktail events operation \u2014 from instant quoting to staff allocation, inventory management, AI customer service, and automated recruitment. The entire business runs itself.",
  },
  {
    slug: "construction",
    industry: "Construction",
    initials: "CO",
    description: "Real-time project visibility, automated supplier ordering, subcontractor coordination, and client progress reporting \u2014 replacing spreadsheets and phone calls with systems that run themselves.",
  },
  {
    slug: "franchising",
    industry: "Franchising",
    initials: "FR",
    description: "Standardised operations across every location, unified reporting, consistent customer communications, and network-wide performance monitoring \u2014 one system, every site.",
  },
  {
    slug: "events",
    industry: "Events",
    initials: "EV",
    description: "Enquiry management, quote generation, supplier coordination, client communications, staff briefings, logistics tracking and post-event follow-up \u2014 all handled automatically.",
  },
  {
    slug: "aesthetics",
    industry: "Aesthetics",
    initials: "AE",
    description: "Automated appointment booking, treatment reminders, patient reactivation campaigns, waitlist management, and multi-clinic coordination \u2014 the entire patient journey, automated.",
  },
  {
    slug: "recruitment",
    industry: "Recruitment",
    initials: "RE",
    description: "AI-powered candidate screening, bespoke assessments, automated interview scheduling, client reporting, and placement tracking \u2014 filling roles faster with less overhead.",
  },
  {
    slug: "event-planning",
    industry: "Event Planning",
    initials: "EP",
    description: "Client onboarding, vendor coordination, timeline management, budget tracking, and post-event feedback \u2014 every moving part connected and automated.",
  },
  {
    slug: "interior-design",
    industry: "Interior Design",
    initials: "ID",
    description: "Project scheduling, supplier management, client approvals, invoicing, and procurement \u2014 creative businesses running on smart systems instead of scattered admin.",
  },
];

export default function ProjectsPage() {
  return (
    <div className="pt-32 pb-20 text-ink">
      <section className="px-6">
        <div className="mx-auto max-w-[1280px]">
          <SectionReveal>
            <p className="font-sans text-xs font-medium uppercase tracking-widest text-ink/50">Our work</p>
            <h1 className="mt-4 font-display text-5xl font-light md:text-6xl lg:text-7xl">Projects</h1>
            <p className="mt-6 max-w-2xl text-ink/50 leading-relaxed">
              Every project is different because every business is different. Here&apos;s a look at how we&apos;ve helped real businesses transform their operations.
            </p>
          </SectionReveal>

          {/* All projects — same layout */}
          <div className="mt-16 space-y-8">
            {projects.map((project, i) => (
              <SectionReveal key={project.slug} delay={i * 0.08}>
                <Link href={project.slug === "hospitality" ? "/projects/tipsy-parties" : "#"} className="block">
                  <div className="overflow-hidden rounded-2xl border border-ink/10 bg-white/6 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.08)] hover:bg-white/7 transition-all duration-300 md:flex">
                    <div className="flex aspect-[4/3] items-center justify-center bg-white/4 md:aspect-auto md:w-2/5 min-h-[200px]">
                      <p className="font-display text-7xl font-light text-ink/10">{project.initials}</p>
                    </div>
                    <div className="p-8 md:w-3/5 md:p-10">
                      <p className="font-sans text-xs font-medium uppercase tracking-widest text-ink/40">Case Study</p>
                      <h2 className="mt-2 font-display text-3xl font-light md:text-4xl">{project.industry}</h2>
                      <p className="mt-4 text-ink/50 leading-relaxed">{project.description}</p>
                      <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-ink/60">
                        Read more
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M8 14V2M8 2L3 7M8 2L13 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
