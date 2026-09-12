"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: { href: string; label: string }[];
}

export function MobileMenu({ isOpen, onClose, links }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop — click to close */}
          <motion.div
            className="fixed inset-0 z-[55]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />

          {/* Menu blob — drops down from top-right */}
          <motion.div
            className="fixed right-6 top-4 z-[60] rounded-3xl border border-ink/10 bg-white/6 backdrop-blur-2xl shadow-[0_12px_40px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.08)] overflow-hidden"
            initial={{
              width: 44,
              height: 44,
              borderRadius: "9999px",
              opacity: 0.8,
            }}
            animate={{
              width: 220,
              height: "auto",
              borderRadius: 24,
              opacity: 1,
            }}
            exit={{
              width: 44,
              height: 44,
              borderRadius: "9999px",
              opacity: 0,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 25,
              mass: 0.8,
            }}
          >
            {/* Close button */}
            <div className="flex justify-end p-3">
              <button
                onClick={onClose}
                className="p-1.5 text-ink/60 hover:text-ink transition-colors"
                aria-label="Close menu"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Links */}
            <nav className="px-6 pb-6 flex flex-col gap-1">
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ delay: 0.1 + i * 0.05, duration: 0.3 }}
                >
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="block py-2 font-body text-sm font-light text-ink/70 hover:text-ink transition-colors duration-200 tracking-wide"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
