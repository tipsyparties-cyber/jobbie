"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Wordmark } from "@/components/ui/wordmark";
import { Button } from "@/components/ui/button";
import { HeydayLogo } from "@/components/heyday/heyday-logo";
import { Icon } from "@/components/heyday/icon";
import { NAV, HEADER_ACTIONS, type NavItem, type NavPanel } from "@/lib/nav";
import { BLUE, CREAM, PAPER } from "@/lib/palette";
import { TBC } from "@/lib/site";

/* ==================================================================== *
 *  The header — spec part 1, A3.
 *
 *  The bar itself is unchanged from 8aebdb3: 72px, three panels shaped
 *  differently, and the grace delay when the pointer leaves. What is in it
 *  is new.
 *
 *  Left is the lockup: Jem's mark in blue, then the wordmark in ink. The
 *  mark plays Together once on first load and never again — Russell's pick
 *  of the logo spec's seven. A header that animates on every route change
 *  reads as a page that has not finished loading.
 *
 *  The grace delay is the detail most often missed: without it the panel
 *  closes while the pointer is crossing the gap between the trigger and the
 *  panel, and the menu becomes unusable at exactly the moment someone
 *  commits to it.
 * ==================================================================== */


function PanelBody({ panel }: { panel: NavPanel }) {
  if (panel.kind === "columns") {
    return (
      <div className="p-8">
        <div className="grid gap-7 lg:grid-cols-[repeat(6,minmax(0,1fr))_minmax(0,1.3fr)]">
          {panel.columns.map((col) => (
            <div key={col.head}>
              <p className="flex items-center gap-2">
                <HeydayLogo size={20} colour={col.colour} />
                <span className="font-mono text-[12px] tracking-[0.02em] text-ink/55">
                  {col.head}
                </span>
              </p>
              <ul className="mt-4 flex flex-col gap-2.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="flex items-start gap-2 font-body text-[15px] leading-snug text-ink transition-opacity hover:opacity-60"
                    >
                      {l.icon && (
                        <Icon name={l.icon} size={20} ground={PAPER} className="mt-0.5 shrink-0" />
                      )}
                      <span>{l.label}</span>
                    </Link>
                  </li>
                ))}
                {col.more && (
                  <li>
                    <Link
                      href={col.more.href}
                      className="font-body text-[14px] font-medium text-ink underline-offset-4 hover:underline"
                    >
                      {col.more.label} →
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          ))}

          <Link
            href={panel.promo.href}
            className="group hidden flex-col overflow-hidden rounded-2xl border-2 border-ink lg:flex"
            style={{
              backgroundColor: panel.promo.tint,
              boxShadow: "11px 11px 0 0 rgba(10,10,10,0.08)",
            }}
          >
            {panel.promo.image && (
              <span
                aria-hidden
                className="block h-28 w-full bg-cover bg-top"
                style={{ backgroundImage: `url(${panel.promo.image})` }}
              />
            )}
            <span className="flex flex-1 flex-col p-5">
              <span className="font-display text-base font-semibold">
                {panel.promo.label}
              </span>
              <span className="mt-1.5 font-body text-sm leading-snug text-ink/75">
                {panel.promo.desc}
              </span>
            </span>
          </Link>
        </div>

        <ul className="mt-8 flex flex-wrap gap-x-7 gap-y-3 border-t border-ink/12 pt-5">
          {panel.bottom.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="font-body text-[15px] font-medium text-ink transition-opacity hover:opacity-60"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (panel.kind === "cards") {
    return (
      <>
        <div className="grid gap-x-10 gap-y-7 px-9 pb-8 pt-9 md:grid-cols-3">
          {panel.items.map((it) => (
            <Link key={it.href} href={it.href} className="group block">
              <p className="font-display text-[15px] font-semibold">{it.label}</p>
              <p className="mt-1.5 max-w-[26ch] font-body text-sm leading-snug text-ink/55">
                {it.desc}
              </p>
            </Link>
          ))}
        </div>

        {panel.footnote && (
          <p className="px-9 pb-7 font-body text-sm text-ink/60">{panel.footnote}</p>
        )}

        <div className="grid overflow-hidden rounded-b-2xl sm:grid-cols-2">
          {panel.featured.map((f) => (
            <Link
              key={f.href}
              href={f.href}
              className="group block p-7"
              style={{ backgroundColor: f.tint }}
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.02em] text-ink/55">
                {f.desc}
              </span>
              <p className="mt-2 max-w-[24ch] font-display text-base font-semibold">
                {f.label}
              </p>
              <span className="mt-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-ink text-cream transition-transform group-hover:translate-x-1">
                <span aria-hidden className="text-sm leading-none">→</span>
              </span>
            </Link>
          ))}
        </div>
      </>
    );
  }

  return (
    <ul className="flex flex-col gap-1 px-7 py-6">
      {panel.items.map((l) => (
        <li key={l.href}>
          <Link
            href={l.href}
            className="block rounded-lg px-3 py-2 font-body text-[15px] text-ink transition-colors hover:bg-ink/5"
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

  /** The grace period. Without it the panel closes while the pointer is
   *  crossing the gap between the trigger and the panel. */
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
  const hasPhone = !TBC.phone.startsWith("[");

  return (
    <header className="fixed inset-x-0 top-0 z-[100]" onMouseLeave={scheduleClose}>
      <div className="bg-paper">
        <div className="relative mx-auto flex h-[72px] max-w-[1280px] items-center gap-3 px-6">
          <Link
            href="/"
            aria-label="Heyday, home"
            className="flex items-center"
            style={{ gap: 3 }}
          >
            {/* Mark first, 24px, 3px from the word — tight on purpose, so it
                reads as part of the word rather than an icon beside it. The
                burst's rays already reach right, so the optical gap is wider
                than the number; do not add air to make it breathe.
                Together once per page load — Russell's pick of the
                spec's seven: the arcs come in from the left and the burst
                from the lower right, meeting on the diagonal. Click round
                on hover. */}
            <HeydayLogo
              size={24}
              colour={BLUE}
              motion="together"
              hoverMotion="click"
            />
            <Wordmark height={22} asLink={false} className="text-ink" />
          </Link>

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
                    className="flex items-center gap-1.5 rounded-lg px-3.5 py-2 font-body text-[15px] text-ink transition-colors"
                    style={{ backgroundColor: isOpen ? CREAM : "transparent" }}
                  >
                    {item.label}
                    {item.panel && (
                      <motion.svg
                        aria-hidden
                        width="10"
                        height="7"
                        viewBox="0 0 10 7"
                        animate={{ rotate: isOpen ? 180 : 0 }}
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
                    )}
                  </Link>
                </div>
              );
            })}
          </nav>

          <div className="ml-auto flex items-center gap-3">
            <Link
              href={HEADER_ACTIONS.login.href}
              className="hidden font-body text-[15px] text-ink underline-offset-4 hover:underline sm:block"
            >
              {HEADER_ACTIONS.login.label}
            </Link>
            {hasPhone && (
              <a
                href={`tel:${TBC.phone}`}
                className="hidden font-body text-[15px] text-ink lg:block"
              >
                {TBC.phone}
              </a>
            )}
            <Button href={HEADER_ACTIONS.demo.href} variant="ghost" className="hidden lg:inline-flex">
              {HEADER_ACTIONS.demo.label}
            </Button>
            <Button
              href={HEADER_ACTIONS.trial.href}
              variant="primary"
              arrow
              className="hidden sm:inline-flex"
            >
              {HEADER_ACTIONS.trial.label}
            </Button>

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
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="h-px w-full bg-ink/12" />
        </div>
      </div>

      {/* One panel that swaps contents, so moving between menus slides
          rather than closing and reopening. */}
      <AnimatePresence>
        {active?.panel && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={cancelClose}
            className="mx-auto hidden w-full max-w-[1280px] px-6 lg:block"
          >
            {/* Width per panel kind, not `w-fit`: the columns grid uses
                minmax(0,1fr) tracks, which collapse to their minimum inside
                a shrink-to-fit parent and render the menu as a thin strip. */}
            <div
              className={`overflow-hidden rounded-2xl border-2 border-ink bg-paper ${
                active.panel.kind === "columns"
                  ? "w-full"
                  : active.panel.kind === "cards"
                    ? "w-[min(880px,100%)]"
                    : "w-[260px]"
              }`}
              style={{ boxShadow: "11px 11px 0 0 rgba(10,10,10,0.08)" }}
            >
              <PanelBody panel={active.panel} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phones: full screen on cream, the groups as accordions, the two
          buttons at the bottom. The three-panel layout is a pointer-and-
          width idea and does not survive a narrow column. */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 bottom-0 top-[72px] overflow-y-auto lg:hidden"
            style={{ backgroundColor: CREAM }}
          >
            <div className="px-6 pb-10 pt-4">
              {NAV.map((item) => (
                <details key={item.label} className="border-b border-ink/12 py-4">
                  <summary className="cursor-pointer list-none font-display text-lg font-semibold">
                    {item.label}
                  </summary>
                  {item.panel && (
                    <ul className="mt-3 flex flex-col gap-2 pb-2">
                      {(item.panel.kind === "columns"
                        ? item.panel.columns.flatMap((c) => c.links)
                        : item.panel.items
                      ).map((l) => (
                        <li key={l.href + l.label}>
                          <Link
                            href={l.href}
                            onClick={() => setMobileOpen(false)}
                            className="font-body text-[15px] text-ink/70"
                          >
                            {l.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </details>
              ))}

              <div className="mt-8 flex flex-col gap-3">
                <Button href={HEADER_ACTIONS.trial.href} variant="primary" arrow>
                  {HEADER_ACTIONS.trial.label}
                </Button>
                <Button href={HEADER_ACTIONS.demo.href} variant="ghost">
                  {HEADER_ACTIONS.demo.label}
                </Button>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
