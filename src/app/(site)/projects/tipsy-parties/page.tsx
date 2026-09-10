import type { Metadata } from "next";
import { SectionReveal } from "@/components/ui/section-reveal";
import { GlassPanel } from "@/components/ui/glass-panel";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Tipsy Parties — Case Study",
  description: "How we built a fully autonomous operations system for a cocktail events company — instant quoting, automated allocation, AI customer service, and more.",
};

const automations = [
  { title: "Instant Dynamic Quoting", description: "Quotes that account for date, location, bartender availability and demand — generated instantly without any manual input." },
  { title: "Live Online Booking", description: "Customers book and pay online. The system handles confirmation, reminders, and payment chasing automatically." },
  { title: "Intelligent Staff Allocation", description: "Jobs are offered to bartenders in order of distance and rating. Accept or decline — no coordination needed from management." },
  { title: "Automated Rating System", description: "Bartender ratings are calculated automatically from customer reviews, job acceptance rate, cancellation rate, punctuality, and admin compliance." },
  { title: "Smart Shopping Lists", description: "Once cocktails and guest numbers are confirmed, the bartender receives a shopping list with exact quantities for every ingredient." },
  { title: "Equipment & Inventory Tracking", description: "The system checks what equipment each bartender has, what they need, and automatically orders anything missing — tracking it in their personal inventory." },
  { title: "Payment & Cancellation Management", description: "Payment reminders go out automatically. If a customer doesn\u2019t pay, the booking is cancelled and the bartender is notified — all hands-free." },
  { title: "Change Management", description: "If a customer changes dates, times, cocktails or guest numbers, the bartender is asked if they can accommodate. If not, the job is re-offered to the next available bartender." },
  { title: "Day-of Check-in System", description: "Bartenders must check in on the day. If they don\u2019t, the system assumes they\u2019re not coming and immediately re-offers the job to available bartenders." },
  { title: "Automated Review Collection", description: "After every event, customers are prompted for a review — feeding directly back into the bartender rating system." },
  { title: "AI Customer Service", description: "An AI agent handles all customer emails — responding accurately, in the brand voice, 24/7. Escalates to a human only when genuinely needed." },
  { title: "AI Recruitment & Onboarding", description: "AI screens all applicants, generates bespoke assessments tailored to each role, and onboards successful candidates — from application to first shift, fully automated." },
];

const flowSteps = [
  "Customer requests a quote \u2192 system generates instant price",
  "Customer books and pays online \u2192 booking confirmed automatically",
  "Job offered to nearest, highest-rated bartender \u2192 accepted or re-offered",
  "Customer selects cocktails and guest numbers \u2192 shopping list generated",
  "Equipment checked and ordered if needed \u2192 inventory updated",
  "Payment reminders sent \u2192 auto-cancel if unpaid",
  "Bartender checks in on event day \u2192 failover if no check-in",
  "Event complete \u2192 customer asked for review \u2192 rating updated",
  "New applicant applies \u2192 AI screens, tests, and onboards",
];

export default function TipsyPartiesPage() {
  return (
    <div className="pt-32 pb-20">
      <section className="px-6">
        <div className="mx-auto max-w-[1280px]">
          <SectionReveal>
            <p className="font-sans text-xs font-medium uppercase tracking-widest text-ink/70">Case Study</p>
            <h1 className="mt-4 font-display text-5xl font-light md:text-6xl lg:text-7xl">Tipsy Parties</h1>
            <p className="mt-6 max-w-2xl text-lg text-ink/50 leading-relaxed">
              A mobile cocktail events company that needed to scale without scaling headcount. We built a fully autonomous operations system that runs the entire business — from first enquiry to final review.
            </p>
          </SectionReveal>
        </div>
      </section>

      <section className="mt-24 px-6">
        <div className="mx-auto max-w-3xl">
          <SectionReveal>
            <h2 className="font-display text-3xl font-light md:text-4xl">The Problem</h2>
            <div className="mt-8 space-y-6 text-ink/50 leading-relaxed">
              <p>Tipsy Parties was growing fast — but every new booking meant more manual work. Quoting was done by hand. Bartender allocation was a spreadsheet exercise. Stock was tracked on paper. Customer emails were answered between events. Recruitment was a constant, time-consuming cycle.</p>
              <p>The business was limited by the number of hours the founder could work. Growth meant more chaos, not more freedom.</p>
            </div>
          </SectionReveal>
        </div>
      </section>

      <section className="mt-24 px-6 py-24">
        <div className="mx-auto max-w-[1280px]">
          <SectionReveal>
            <h2 className="font-display text-3xl font-light md:text-4xl">The System We Built</h2>
            <p className="mt-4 max-w-2xl text-ink/50">An end-to-end autonomous operations platform covering every stage of the business:</p>
          </SectionReveal>
          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {automations.map((auto, i) => (
              <SectionReveal key={auto.title} delay={i * 0.05}>
                <GlassPanel className="h-full">
                  <h3 className="font-display text-lg font-light">{auto.title}</h3>
                  <p className="mt-3 text-sm text-ink/50 leading-relaxed">{auto.description}</p>
                </GlassPanel>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-24 px-6">
        <div className="mx-auto max-w-3xl">
          <SectionReveal>
            <h2 className="font-display text-3xl font-light md:text-4xl">The Flow</h2>
            <div className="mt-8 space-y-4">
              {flowSteps.map((step, i) => (
                <SectionReveal key={i} delay={i * 0.05}>
                  <div className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/10 font-sans text-xs font-medium text-ink/70">{i + 1}</span>
                    <p className="pt-1 text-sm text-ink leading-relaxed">{step}</p>
                  </div>
                </SectionReveal>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>

      <section className="mt-24 px-6">
        <SectionReveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-light md:text-4xl">Want something like this for your business?</h2>
            <p className="mt-4 text-ink/50">Every system we build is bespoke. Tell us about your operations and we&apos;ll show you what&apos;s possible.</p>
            <div className="mt-8"><Button href="/contact">Start a conversation</Button></div>
          </div>
        </SectionReveal>
      </section>
    </div>
  );
}
