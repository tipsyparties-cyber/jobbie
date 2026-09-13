"use client";

import { useState } from "react";
import Link from "next/link";
import { Wordmark } from "@/components/ui/wordmark";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/features", label: "Features" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Three columns so the wordmark sits dead centre regardless of how wide
          the items either side of it are. */}
      <nav className="mx-auto grid max-w-[1280px] grid-cols-3 items-center px-6 py-4">
        <Link
          href="/contact"
          className="justify-self-start font-body text-sm font-light tracking-wide text-ink/70 transition-colors hover:text-ink"
        >
          Contact
        </Link>

        <div className="justify-self-center">
          <Wordmark className="text-ink" />
        </div>

        <div
          className="relative justify-self-end"
          onMouseEnter={() => setMenuOpen(true)}
          onMouseLeave={() => setMenuOpen(false)}
        >
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex flex-col gap-1.5 p-2"
            aria-label="Menu"
          >
            <span className="block h-px w-6 bg-ink" />
            <span className="block h-px w-6 bg-ink" />
          </button>

          <AnimatePresence>
            {menuOpen && (
              <motion.div
                className="absolute right-0 top-full mt-2"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <nav className="flex flex-col items-end gap-1 py-2">
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.04 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMenuOpen(false)}
                        className="block py-1 font-body text-sm font-light text-ink/60 hover:text-ink transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
    </header>
  );
}
