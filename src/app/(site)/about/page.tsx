import type { Metadata } from "next";
import { SectionReveal } from "@/components/ui/section-reveal";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About",
  description: "Where Heyday came from, who runs it, and what we\u2019ve learned from a decade of building, scaling and automating real businesses.",
};

export default function AboutPage() {
  return (
    <div className="pt-32 pb-20 text-ink">
      <section className="px-6">
        <div className="mx-auto max-w-4xl">

          {/* Where we came from */}
          <SectionReveal>
            <p className="font-sans text-xs font-medium uppercase tracking-widest text-ink/50">About us</p>
            <h1 className="mt-4 font-display text-5xl font-light md:text-6xl lg:text-7xl">
              Where we came from
            </h1>
          </SectionReveal>

          <SectionReveal delay={0.1}>
            <div className="mt-12 rounded-2xl border border-ink/10 bg-white/55 backdrop-blur-2xl p-8 md:p-10 shadow-[0_8px_32px_rgba(10,10,10,0.06),inset_0_1px_0_rgba(255,255,255,0.9)] space-y-8 text-ink/50 leading-relaxed font-light">
              <p>
                Up&amp;Up didn&apos;t start as an agency. It started as a necessity. That turned into a passion. That turned into expertise.
              </p>
              <p>
                We were running businesses &mdash; and running them well. But like every founder who has ever scaled something from nothing, we hit the same walls. Too much admin. Too many tools that didn&apos;t talk to each other. Lost leads. Human errors. Too much time spent running the business instead of building it. We were competing against bigger companies with bigger teams and bigger budgets &mdash; and winning on talent, on ideas, on hustle &mdash; but losing hours every day to the kind of repetitive operational work that nobody got into business to do. Not us. Not our teams. So we built automation to deal with it. And then AI arrived and took everything to a completely different level.
              </p>
              <p>
                Every entrepreneur has a version of the dream. For some it&apos;s freedom &mdash; a business that runs without them, time back, peace of mind. For others it&apos;s scale &mdash; growth, impact, a brand that means something. For some it&apos;s profit, for others it&apos;s purpose, for others it&apos;s both. The dream looks different for everyone. But whatever your idea of success looks like, automation frees you to chase it. Less time on the things that drain you. More time on the things that drive you. That is what we build.
              </p>
              <p>
                We tried everything the market had to offer. Off-the-shelf software. Generic automation tools. One-size-fits-all solutions built by people who had never run a business like ours. None of it fit. All of it required us to adapt to the technology rather than the other way around. So we built our own. Systems designed around how we actually worked. Automation that understood our industry. Tools that spoke to each other. And it changed everything &mdash; how we operated, how we scaled, how we lived.
              </p>
              <p>
                We went from businesses that needed us in them every day to businesses that ran internationally, across time zones, without losing quality or control. The difference was not more staff or more hours. It was smarter systems.
              </p>
              <p className="text-ink/80 font-medium">
                That realisation became Up&amp;Up.
              </p>
            </div>
          </SectionReveal>

          {/* Who we are */}
          <SectionReveal delay={0.1}>
            <div className="mt-24">
              <h2 className="font-display text-3xl font-light md:text-4xl lg:text-5xl">Who we are</h2>
              <div className="mt-8 rounded-2xl border border-ink/10 bg-white/55 backdrop-blur-2xl p-8 md:p-10 shadow-[0_8px_32px_rgba(10,10,10,0.06),inset_0_1px_0_rgba(255,255,255,0.9)] space-y-6 text-ink/50 leading-relaxed font-light">
                <p>
                  Up&amp;Up is led by Jemima and Russell &mdash; two founders, owner-operators and entrepreneurs who between them bring together psychology, design, mathematics and technical architecture. A rare combination that shapes everything we build.
                </p>
                <p>
                  We have spent a decade in the industries we serve &mdash; hospitality, events, services and agencies. We have bootstrapped, scaled, struggled, solved and grown. We know what it feels like to be where you are because we have been there. That is exactly why we built Up&amp;Up &mdash; because the gap in the market was not another automation tool. It was a team who actually understood the businesses that needed automating.
                </p>
                <p>
                  Anyone can connect two apps together. Not everyone has run and grown businesses at scale, managed a team, handled international operations, thousands of customers and built the systems to make all of it work without burning out.
                </p>
                <p className="text-ink/80">
                  And now we build those systems for you.
                </p>
              </div>
            </div>
          </SectionReveal>

          {/* Jemima & Russell side by side */}
          <SectionReveal delay={0.1}>
            <div className="mt-16 grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-ink/10 bg-white/55 backdrop-blur-2xl p-8 shadow-[0_8px_32px_rgba(10,10,10,0.06),inset_0_1px_0_rgba(255,255,255,0.9)]">
                <h3 className="font-display text-2xl font-light md:text-3xl">Jemima</h3>
                <p className="mt-6 text-ink/50 leading-relaxed font-light text-sm">
                  Jemima approaches every problem from the human side first. With a background in psychology and design, she understands how people think, how teams behave and how businesses feel to the people inside them and the customers they serve. She brings that understanding into every system we design &mdash; because automation that doesn&apos;t account for human behaviour doesn&apos;t last.
                </p>
              </div>
              <div className="rounded-2xl border border-ink/10 bg-white/55 backdrop-blur-2xl p-8 shadow-[0_8px_32px_rgba(10,10,10,0.06),inset_0_1px_0_rgba(255,255,255,0.9)]">
                <h3 className="font-display text-2xl font-light md:text-3xl">Russell</h3>
                <p className="mt-6 text-ink/50 leading-relaxed font-light text-sm">
                  Russell thinks in systems, logic and architecture. With a mathematical and technical foundation, he sees the structure underneath every business problem and builds solutions that are precise, scalable and built to last. Where others see complexity, he sees a pattern waiting to be solved.
                </p>
              </div>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.1}>
            <div className="mt-8 rounded-2xl border border-ink/10 bg-white/55 backdrop-blur-2xl p-8 md:p-10 shadow-[0_8px_32px_rgba(10,10,10,0.06),inset_0_1px_0_rgba(255,255,255,0.9)]">
            <p className="text-ink/50 leading-relaxed font-light">
              We are both founders, entrepreneurs and agency owners who have built, led and scaled businesses across hospitality, events, services and agencies &mdash; growing them from nothing to millions in revenue, running operations internationally across multiple time zones without losing control or quality. The operational reality of these industries is not something we read about. It is something we lived.
            </p>
            </div>
          </SectionReveal>

          {/* What we've learned */}
          <SectionReveal delay={0.1}>
            <div className="mt-24">
              <h2 className="font-display text-3xl font-light md:text-4xl lg:text-5xl">Decades of experience</h2>
              <div className="mt-8 rounded-2xl border border-ink/10 bg-white/55 backdrop-blur-2xl p-8 md:p-10 shadow-[0_8px_32px_rgba(10,10,10,0.06),inset_0_1px_0_rgba(255,255,255,0.9)] space-y-6 text-ink/50 leading-relaxed font-light">
                <p>
                  A decade of building gives you a sixth sense. For where businesses leak. For your weaknesses now and the ones growth will reveal. The quiet inefficiencies, the invisible bottlenecks. We see them before they surface. We design around them before they cost anything. And we see something else too &mdash; the potential. Where your business could go, what it could become, and exactly what needs to be built to get you there.
                </p>
                <p>
                  Every system we build is designed not just for where your business is now but for where it is going. SOPs that make sense. Workflows that accommodate growth. Automation that scales with you &mdash; evolving, adapting and growing stronger the bigger you get.
                </p>
                <p>
                  We are obsessed with efficiency. Not as a business principle &mdash; as a way of life. Our own lives are built around simplicity, peace of mind and maximum performance. We believe you should not have to choose between working smart and working hard. The right systems, built by the right people around your needs and your goals, let you do both effortlessly.
                </p>
              </div>
            </div>
          </SectionReveal>

          {/* Ethos */}
          <SectionReveal delay={0.1}>
            <div className="mt-24">
              <h2 className="font-display text-3xl font-light md:text-4xl lg:text-5xl">Our ethos</h2>
              <div className="mt-8 rounded-2xl border border-ink/10 bg-white/55 backdrop-blur-2xl p-8 md:p-10 shadow-[0_8px_32px_rgba(10,10,10,0.06),inset_0_1px_0_rgba(255,255,255,0.9)] space-y-6 text-ink/50 leading-relaxed font-light">
                <p>Remove the friction.</p>
                <p>Remove the noise.</p>
                <p>Remove the ceiling.</p>
                <p>Build something that runs brilliantly so you are free to focus on what you actually built this for.</p>
              </div>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.1}>
            <div className="mt-16 text-center">
              <Button href="/contact">Start free trial</Button>
            </div>
          </SectionReveal>
        </div>
      </section>
    </div>
  );
}
