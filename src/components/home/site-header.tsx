"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Wordmark } from "@/components/ui/wordmark";

/**
 * The header.
 *
 * The home page had no header at all — a wordmark floating in the middle of
 * the top edge, the word "Contact" in the opposite corner, and a hamburger.
 * gsap.com has an ordinary fixed bar: wordmark hard left, the real
 * navigation immediately beside it, one pill-shaped call to action hard
 * right, and a hairline under the whole thing. Nothing clever, and its
 * absence was most of why the page did not read as a site.
 *
 * Fixed rather than sticky, because the ground colour changes underneath it
 * as you scroll and a bar that re-enters on scroll-up would keep crossing
 * colour boundaries mid-animation.
 */

const LINKS = [
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-[100]">
      <div className="mx-auto flex max-w-[1400px] items-center gap-10 px-6 py-4">
        <Wordmark className="text-ink" />

        <nav className="hidden items-center gap-7 md:flex">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="font-body text-sm text-ink/60 transition-colors hover:text-ink"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-4">
          <Link
            href="/contact"
            className="hidden rounded-full border border-ink/70 px-5 py-2 font-body text-sm font-medium text-ink transition-colors hover:bg-ink hover:text-cream sm:block"
          >
            Start a conversation
          </Link>

          <button
            onClick={() => setOpen(!open)}
            className="flex flex-col gap-1.5 p-2 md:hidden"
            aria-label="Menu"
            aria-expanded={open}
          >
            <span className="block h-px w-6 bg-ink" />
            <span className="block h-px w-6 bg-ink" />
          </button>
        </div>
      </div>

      {/* The hairline. Sits at 12% so it reads as a division on every one of
          the six grounds rather than disappearing on the pale ones. */}
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="h-px w-full bg-ink/12" />
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="mx-auto flex max-w-[1400px] flex-col gap-1 px-6 py-4 md:hidden"
          >
            {[...LINKS, { href: "/contact", label: "Contact" }].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-1 font-body text-base text-ink/70 transition-colors hover:text-ink"
              >
                {l.label}
              </Link>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
