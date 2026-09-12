import type { Metadata } from "next";
import { SectionReveal } from "@/components/ui/section-reveal";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Services",
  description: "Your AI team and automation tools — built specifically for your business. Customer service, sales, operations, HR, finance, marketing, compliance and reporting agents plus connected automation tools.",
};

const aiTeam = [
  {
    name: "AI Customer Service Agent",
    intro: "Every message answered. Every customer heard. Every response accurate, personal and instant \u2014 across email, WhatsApp, SMS, web chat and social \u2014 at any hour, without anyone on your team lifting a finger.",
    features: ["Responds based on your actual policies and business data", "Replies in your company voice, consistently", "Handles complaints, queries and follow-ups automatically", "Escalates to a human when genuinely needed \u2014 with full context already attached", "Works across every channel from one place", "Available around the clock, every day of the year"],
  },
  {
    name: "AI Sales Agent",
    intro: "Every lead followed up. Every quote sent on time. Every opportunity pursued to its conclusion \u2014 without a salesperson chasing it manually.",
    features: ["Responds to every inbound enquiry instantly", "Qualifies leads based on your exact criteria", "Generates and sends accurate quotes automatically", "Follows up until a decision is made", "Books calls, demos and consultations without back and forth", "Triggers upsell and cross-sell at exactly the right moment", "Keeps your CRM current without manual input"],
  },
  {
    name: "AI Receptionist",
    intro: "The first point of contact your customers never know isn\u2019t human. Answers questions, checks availability, takes bookings and handles the front line \u2014 professionally, instantly, always.",
    features: ["Answers inbound calls, messages and web enquiries", "Checks real-time availability and business data before responding", "Takes bookings and sends confirmations automatically", "Handles FAQs and routine requests without escalation", "Routes anything complex to the right person immediately", "Never misses a call, a message or an opportunity"],
  },
  {
    name: "AI Operations Manager",
    intro: "The operational brain that keeps everything running without you running it. Builds schedules, allocates resources, sends briefings, tracks jobs and coordinates everything behind the scenes.",
    features: ["Builds rotas and schedules based on demand and availability", "Allocates staff, vehicles and resources to jobs automatically", "Sends briefings and instructions to the right people before every job", "Tracks task and job completion across the whole operation", "Flags delays, gaps and conflicts before they cause problems", "Coordinates suppliers and third parties without manual emails", "Gives you a live view of everything happening right now"],
  },
  {
    name: "AI HR Agent",
    intro: "One agent for the entire employee lifecycle. From the moment someone applies to the moment they leave \u2014 recruiting, onboarding, training and managing your people without HR overhead.",
    features: ["Builds bespoke candidate assessments for your business and each specific role", "Writes and posts job adverts across all relevant platforms", "Screens, scores and shortlists every application automatically", "Books interviews and keeps candidates updated throughout", "Onboards successful candidates through your process, your policies, your standards", "Delivers ongoing training built around your business", "Monitors performance, manages absences and answers staff questions instantly"],
  },
  {
    name: "AI Finance Agent",
    intro: "Your finances running themselves. Invoices raised, payments chased, expenses tracked, reports ready \u2014 without a finance team doing it manually.",
    features: ["Raises and sends invoices automatically on completion of work", "Chases outstanding payments on schedule without anyone asking", "Tracks income, expenditure and cash flow in real time", "Reconciles transactions without manual input", "Flags anomalies and overspending instantly", "Produces financial summaries and reports on demand"],
  },
  {
    name: "AI Marketing Agent",
    intro: "Your brand showing up consistently, everywhere it needs to be \u2014 without you writing every word or managing every campaign.",
    features: ["Creates content in your brand voice across every channel", "Schedules and publishes automatically", "Runs and optimises paid campaigns based on performance", "Manages email sequences, newsletters and retention campaigns", "Tracks what is working and what is not in real time", "Recommends what to do next based on data not guesswork"],
  },
  {
    name: "AI Compliance Agent",
    intro: "Nothing missed. Nothing expired. Nothing that becomes a liability because someone forgot to check.",
    features: ["Tracks every regulatory deadline, licence renewal and certification date", "Flags upcoming issues before they become a problem", "Keeps policies and documentation current automatically", "Ensures staff training and certifications stay up to date", "Maintains complete audit trails without manual record keeping", "Escalates anything that genuinely needs a human decision immediately"],
  },
  {
    name: "AI Reporting Agent",
    intro: "Every number from every corner of your business \u2014 in one place, always current, always clear. So decisions get made on facts, not instinct.",
    features: ["Pulls data from every system across the business automatically", "Produces live dashboards showing performance right now", "Tracks KPIs and targets without anyone building a spreadsheet", "Sends the right reports to the right people at the right time", "Flags when something needs attention before it becomes a crisis", "Turns data into decisions"],
  },
];

const tools = [
  {
    name: "Unified Inbox",
    intro: "Every message your business receives from every channel \u2014 in one place, managed by AI.",
    desc: "Email, WhatsApp, SMS, phone calls, social media DMs and web chat all flow into a single intelligent inbox. AI reads every message, understands what is being asked, checks your business data and responds \u2014 accurately, instantly, in your voice.",
    features: ["Email, WhatsApp, SMS, calls, social DMs and web chat unified", "AI reads, prioritises and responds automatically", "Calls transcribed and logged against the right customer", "Urgent messages flagged and routed instantly", "Full conversation history across every channel for every customer", "Human oversight and approval controls built in"],
  },
  {
    name: "Bespoke CRM",
    intro: "Your customer relationships managed the way your business actually works \u2014 not forced into someone else\u2019s template.",
    desc: "Every customer interaction, every purchase, every enquiry, every conversation \u2014 logged automatically by your AI team without anyone touching a keyboard.",
    features: ["Built around how your business manages customers", "Every interaction logged automatically \u2014 no manual data entry", "Pipeline and follow-ups managed by your AI Sales Agent", "Alerts when a customer needs attention", "Full relationship history at a glance", "Scales with your business as you grow"],
  },
  {
    name: "Quote & Booking System",
    intro: "From first enquiry to confirmed booking \u2014 automatically.",
    desc: "Built specifically around your pricing, your services and your rules. A system that understands your business, generates accurate quotes based on real requirements, manages your availability in real time.",
    features: ["Generates accurate quotes automatically based on requirements", "Manages availability in real time across all resources", "Sends quotes, follows up and converts without manual involvement", "Booking confirmations, deposits and contracts sent automatically", "Reminders, changes and cancellations handled automatically", "Fully connected to your operations so everything stays in sync"],
  },
  {
    name: "Resource Allocation Engine",
    intro: "The right resource, in the right place, at the right time \u2014 automatically.",
    desc: "Whether you are allocating people, vehicles, equipment, rooms or any other resource, this system handles it without manual scheduling.",
    features: ["Allocates any resource type \u2014 staff, vehicles, equipment, spaces, stock", "Availability checked in real time across your entire resource pool", "Location and travel factored in automatically where relevant", "Conflict detection flags issues before they cause problems", "Automated confirmations and briefings sent before every job", "Scales from five resources to five hundred without adding admin"],
  },
  {
    name: "Candidate Assessment Platform",
    intro: "Tests built specifically for your business and each individual role \u2014 not a generic library anyone else is also using.",
    desc: "Every assessment is written around your actual processes, your standards and your expectations. Candidates are tested on real-world knowledge and situational judgement.",
    features: ["Assessments built specifically for your company and each role", "Tests real knowledge and situational judgement \u2014 not generic questions", "Automatically scored and ranked without manual review", "Reduces bad hires, short tenures and the cost of getting recruitment wrong", "Assessments evolve as your business and standards change", "Connects directly to your AI HR Agent and CRM"],
  },
  {
    name: "Stock & Inventory Management",
    intro: "Never run out. Never over-order. Never manually check a level again.",
    desc: "Real-time stock visibility across every location, warehouse or site. Automatic reorder triggers when levels drop below your threshold.",
    features: ["Real-time stock levels across every location", "Automatic reorder triggers and purchase order generation", "Supplier communications managed without manual emails", "Delivery tracking and discrepancy flagging", "Full audit trail of every movement", "Connected to operations and finance automatically"],
  },
  {
    name: "Live Operations Dashboard",
    intro: "The complete picture of your business \u2014 right now, on any device, wherever you are.",
    desc: "Every booking, every job, every staff member, every resource, every outstanding task. One screen. Real time. No spreadsheets to maintain.",
    features: ["Every part of the operation visible in one place", "Updates in real time as your AI team works", "Bookings, jobs, staff, resources and tasks all tracked", "Alerts and flags for anything that needs a decision", "Performance metrics and KPIs always current", "Accessible on any device from anywhere"],
  },
];

export default function ServicesPage() {
  return (
    <div className="pt-32 pb-20">
      <section className="px-6">
        <div className="mx-auto max-w-[1280px]">
          <SectionReveal>
            <p className="font-sans text-xs font-medium uppercase tracking-widest text-ink/70">What we build for you</p>
            <h1 className="mt-4 font-display text-5xl font-light md:text-6xl lg:text-7xl">Services</h1>
            <p className="mt-6 max-w-2xl text-ink/50 leading-relaxed">
              Every agent knows your business. Every agent works with every other. One team. One voice. Always on.
            </p>
          </SectionReveal>

          {/* AI Team */}
          <SectionReveal delay={0.1}>
            <div className="mt-24">
              <h2 className="font-display text-3xl font-light md:text-4xl lg:text-5xl">Your AI Team</h2>
              <p className="mt-4 max-w-3xl text-ink/50 leading-relaxed">
                The team that never sleeps, never calls in sick, and never needs managing. Every member of your AI team is built specifically around your business &mdash; your policies, your data, your voice. Not a generic tool anyone else is using. Yours.
              </p>
            </div>
          </SectionReveal>

          <div className="mt-12 space-y-6">
            {aiTeam.map((agent, i) => (
              <SectionReveal key={agent.name} delay={i * 0.05}>
                <div className="rounded-2xl border border-ink/10 bg-white/55 backdrop-blur-2xl p-8 md:p-10 shadow-[0_8px_32px_rgba(10,10,10,0.06),inset_0_1px_0_rgba(255,255,255,0.9)]">
                  <h3 className="font-display text-2xl font-light md:text-3xl">{agent.name}</h3>
                  <p className="mt-4 text-ink/50 leading-relaxed">{agent.intro}</p>
                  <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                    {agent.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm text-ink/70">
                        <svg className="mt-1 h-3 w-3 shrink-0 text-ink/70" viewBox="0 0 12 12" fill="none">
                          <path d="M6 10V2M6 2L2 6M6 2L10 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </SectionReveal>
            ))}
          </div>

          {/* Tools */}
          <SectionReveal delay={0.1}>
            <div className="mt-24">
              <h2 className="font-display text-3xl font-light md:text-4xl lg:text-5xl">Tools</h2>
              <p className="mt-4 max-w-3xl text-ink/50 leading-relaxed">
                The systems your AI team and your people work in. Built for your business. Connected from day one. Everything talking to everything.
              </p>
            </div>
          </SectionReveal>

          <div className="mt-12 space-y-6">
            {tools.map((tool, i) => (
              <SectionReveal key={tool.name} delay={i * 0.05}>
                <div className="rounded-2xl border border-ink/10 bg-white/55 backdrop-blur-2xl p-8 md:p-10 shadow-[0_8px_32px_rgba(10,10,10,0.06),inset_0_1px_0_rgba(255,255,255,0.9)]">
                  <h3 className="font-display text-2xl font-light md:text-3xl">{tool.name}</h3>
                  <p className="mt-4 text-ink/50 leading-relaxed">{tool.intro}</p>
                  <p className="mt-2 text-sm text-ink/50/80 leading-relaxed">{tool.desc}</p>
                  <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                    {tool.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm text-ink/70">
                        <svg className="mt-1 h-3 w-3 shrink-0 text-ink/70" viewBox="0 0 12 12" fill="none">
                          <path d="M6 10V2M6 2L2 6M6 2L10 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </SectionReveal>
            ))}
          </div>

          {/* Bottom line */}
          <SectionReveal>
            <div className="mt-20 text-center">
              <p className="font-display text-xl font-light md:text-2xl text-ink/50 italic">
                Every tool is connected to every other. Your AI team works across all of them. Add what you need now. Build what you want next. One system. One voice. Built for you.
              </p>
              <div className="mt-10">
                <Button href="/contact">Tell us what you need</Button>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>
    </div>
  );
}
