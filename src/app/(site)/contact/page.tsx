import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: "Ready to see what's possible? Tell us about your business.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen flex items-center text-ink px-6 md:px-12 pt-20">
      <div className="w-full max-w-[1400px] mx-auto grid md:grid-cols-[1fr_1fr] gap-12 md:gap-20 items-center">

        {/* Left — Heading */}
        <div>
          <h1 className="font-body text-5xl md:text-6xl lg:text-[5.5rem] font-light leading-[1.1]">
            Ready<br />to see<br />what&apos;s<br />possible?
          </h1>
          <p className="mt-8 font-display text-2xl md:text-3xl font-light text-ink/50">
            start here ^
          </p>
        </div>

        {/* Right — Form */}
        <ContactForm />

      </div>
    </div>
  );
}
