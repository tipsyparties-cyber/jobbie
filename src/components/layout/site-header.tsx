"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Wordmark } from "@/components/ui/wordmark";
import { NAV, NAV_ACTIVE_TINT, type NavItem, type NavPanel } from "@/lib/nav";

/* ==================================================================== *
 *  The header, modelled on honeybook.com.
 *
 *  Measured off the live site: a 72px white bar, logo hard left, navigation
 *  centred, "Log in" and one dark pill hard right, and an announcement
 *  strip above it. The open item takes a tinted pill and its chevron flips.
 *
 *  The three panels are deliberately different shapes — a grid of
 *  descriptions, columns of links, and a plain list — because that is what
 *  honeybook does and it is the reason their menus feel laid out rather
 *  than generated. Shapes live in lib/nav.ts.
 *
 *  Opens on hover with a short close delay, because a menu that vanishes
 *  the instant the pointer crosses the gap between the trigger and the
 *  panel is the single most common way this component is got wrong. It also
 *  opens on focus and closes on Escape, so it works from the keyboard.
 * ==================================================================== */

function Chevron({ open }: { open: boolean }) {
  return (
    <motion.svg
      aria-hidden
      width="10"
      height="7"
      viewBox="0 0 10 7"
      className="ml-1.5"
      animate={{ rotate: open ? 180 : 0 }}
      transition={{ duration: 0.2 }}
    >
      <path
        d="M1 1.5L5 5.5L9 1.5"
        stroke="currentColor"
        strokeWidth="1.4"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </motion.svg>
  );
}

/** The small circular arrow honeybook puts on its featured cards. */
function ArrowDot() {
  return (
    <span className="mt-5 inline-flex h-8 w-8 items-center justify-center rounded-full bg-ink text-cream transition-transform group-hover:translate-x-1">
      <span aria-hidden className="text-sm leading-none">
        →
      </span>
    </span>
  );
}

function PanelBody({ panel }: { panel: NavPanel }) {
  if (panel.kind === "cards") {
    return (
      <>
        <div className="grid gap-x-10 gap-y-7 px-10 pb-9 pt-9 md:grid-cols-3">
          {panel.items.map((it) => (
            <Link key={it.label} href={it.href} className="group block">
              <p className="font-body text-base font-medium text-ink">
                {it.label}
              </p>
              <p className="mt-1.5 max-w-[24ch] font-body text-sm leading-snug text-ink/55">
                {it.desc}
              </p>
            </Link>
          ))}
        </div>

        {/* The strip along the bottom — two tinted cards, full-bleed to the
            panel edge exactly as honeybook has them. */}
        <div className="grid overflow-hidden rounded-b-2xl sm:grid-cols-2">
          {panel.featured.map((f) => (
            <Link
              key={f.label}
              href={f.href}
              className="group block p-8"
              style={{ backgroundColor: f.tint }}
            >
              <p className="font-body text-base font-medium text-ink">
                {f.label}
              </p>
              <p className="mt-1.5 max-w-[30ch] font-body text-sm leading-snug text-ink/65">
                {f.desc}
              </p>
              <ArrowDot />
            </Link>
          ))}
        </div>
      </>
    );
  }

  if (panel.kind === "columns") {
    return (
      <div className="grid gap-8 px-10 py-9 lg:grid-cols-[repeat(4,minmax(0,1fr))_minmax(0,1.15fr)]">
        {panel.columns.map((col) => (
          <div key={col.head}>
            {/* Muted column heading, links in full ink — honeybook's exact
                hierarchy, and it is what stops five columns of links
                reading as one undifferentiated block. */}
            <p className="font-body text-sm text-ink/45">{col.head}</p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="font-body text-base text-ink transition-opacity hover:opacity-60"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <Link
          href={panel.promo.href}
          className="group hidden flex-col rounded-2xl p-6 lg:flex"
          style={{ backgroundColor: panel.promo.tint }}
        >
          <p className="font-body text-base font-medium text-ink">
            {panel.promo.label}
          </p>
          <p className="mt-1.5 font-body text-sm leading-snug text-ink/70">
            {panel.promo.desc}
          </p>
          <ArrowDot />
        </Link>
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-1 px-8 py-7">
      {panel.items.map((l) => (
        <li key={l.href}>
          <Link
            href={l.href}
            className="block rounded-lg px-3 py-2 font-body text-base text-ink transition-colors hover:bg-ink/5"
          >
            {l.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // A short grace period on leave. Without it the panel closes while the
  // pointer is crossing the gap between the trigger and the panel itself.
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(null), 140);
  };
  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  const active = NAV.find((n) => n.label === open);

  return (
    <header
      className="fixed inset-x-0 top-0 z-[100]"
      onMouseLeave={scheduleClose}
    >
      {/* The announcement strip. honeybook runs one above the bar; this one
          points at the feature pages rather than claiming an offer that
          does not exist. */}
      <div style={{ backgroundColor: NAV_ACTIVE_TINT }}>
        <div className="mx-auto flex max-w-[1400px] items-center justify-center gap-4 px-6 py-2.5">
          <p className="font-body text-sm text-ink/80">
            Twenty features, one system, built for service businesses.
          </p>
          <Link
            href="/features"
            className="hidden rounded-full bg-paper px-4 py-1.5 font-body text-xs font-medium text-ink transition-opacity hover:opacity-75 sm:block"
          >
            Take a look
          </Link>
        </div>
      </div>

      <div className="bg-paper">
        <div className="relative mx-auto flex h-[72px] max-w-[1400px] items-center px-6">
          <Wordmark className="text-ink" />

          {/* Centred, absolutely positioned so it stays centred on the bar
              rather than on whatever is left after the logo and buttons. */}
          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 lg:flex">
            {NAV.map((item: NavItem) => {
              const isOpen = open === item.label;
              return (
                <div
                  key={item.label}
                  onMouseEnter={() => {
                    cancelClose();
                    setOpen(item.panel ? item.label : null);
                  }}
                >
                  <Link
                    href={item.href}
                    onFocus={() => setOpen(item.panel ? item.label : null)}
                    aria-expanded={item.panel ? isOpen : undefined}
                    className="flex items-center rounded-full px-4 py-2 font-body text-[15px] text-ink transition-colors"
                    style={{
                      backgroundColor: isOpen ? NAV_ACTIVE_TINT : "transparent",
                    }}
                  >
                    {item.label}
                    {item.panel && <Chevron open={isOpen} />}
                  </Link>
                </div>
              );
            })}
          </nav>

          <div className="ml-auto flex items-center gap-5">
            <Link
              href="/contact"
              className="hidden font-body text-[15px] text-ink underline-offset-4 hover:underline sm:block"
            >
              Log in
            </Link>
            <Link
              href="/contact"
              className="rounded-full bg-ink px-5 py-2.5 font-body text-sm font-medium text-cream transition-opacity hover:opacity-85"
            >
              Get started for free
            </Link>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex flex-col gap-1.5 p-2 lg:hidden"
              aria-label="Menu"
              aria-expanded={mobileOpen}
            >
              <span className="block h-px w-6 bg-ink" />
              <span className="block h-px w-6 bg-ink" />
            </button>
          </div>
        </div>
      </div>

      {/* The panel. One element that swaps its contents, so moving between
          two open menus slides rather than closing and reopening. */}
      <AnimatePresence>
        {active?.panel && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={cancelClose}
            className="mx-auto hidden w-full max-w-[1400px] px-6 lg:block"
          >
            {/* Width is set per panel kind rather than left to `w-fit`.
                The columns panel holds a grid of `minmax(0,1fr)` tracks, and
                inside a shrink-to-fit parent those collapse to their
                minimum — the menu comes out as a thin strip of wrapped
                text. honeybook's own Product panel is 960px; these are
                sized to the same intent. */}
            <div
              className={`overflow-hidden rounded-2xl bg-paper shadow-[0_18px_40px_-12px_rgba(10,10,10,0.18)] ${
                active.panel.kind === "columns"
                  ? "w-[min(1120px,100%)]"
                  : active.panel.kind === "cards"
                    ? "w-[min(900px,100%)]"
                    : "w-[260px]"
              }`}
            >
              <PanelBody panel={active.panel} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile. The panels flatten to a single scrollable list — the
          three-shape layout above is a pointer-and-width idea and does not
          survive a phone. */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="max-h-[70vh] overflow-y-auto bg-paper px-6 pb-8 pt-2 lg:hidden"
          >
            {NAV.map((item) => (
              <div key={item.label} className="border-t border-ink/10 py-4">
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-body text-base font-medium text-ink"
                >
                  {item.label}
                </Link>
                {item.panel && (
                  <ul className="mt-3 flex flex-col gap-2">
                    {(item.panel.kind === "columns"
                      ? item.panel.columns.flatMap((c) => c.links)
                      : item.panel.items
                    ).map((l) => (
                      <li key={l.href + l.label}>
                        <Link
                          href={l.href}
                          onClick={() => setMobileOpen(false)}
                          className="font-body text-sm text-ink/65"
                        >
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
