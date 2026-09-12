"use client";

import { useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { BlobArrow } from "@/components/ui/blob-arrow";

// Unique abstract glyphs per card
const cardGlyphs: Record<string, React.ReactNode> = {
  "Customer Service Agent": (
    <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7 text-ink/40">
      <circle cx="6" cy="8" r="2.5" fill="currentColor" />
      <circle cx="18" cy="8" r="1.5" fill="currentColor" />
      <circle cx="12" cy="16" r="4" fill="currentColor" />
    </svg>
  ),
  "Sales Agent": (
    <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7 text-ink/40">
      <circle cx="8" cy="12" r="1.5" fill="currentColor" />
      <path d="M18 6C18 9.3 15.3 12 12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
      <circle cx="18" cy="18" r="3" fill="currentColor" />
    </svg>
  ),
  "Receptionist Agent": (
    <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7 text-ink/40">
      <circle cx="12" cy="6" r="3" fill="currentColor" />
      <circle cx="5" cy="14" r="1.5" fill="currentColor" />
      <path d="M12 18C15.3 18 18 15.3 18 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  ),
  "Operations Agent": (
    <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7 text-ink/40">
      <circle cx="12" cy="12" r="3.5" fill="currentColor" />
      <circle cx="12" cy="3" r="1.2" fill="currentColor" />
      <circle cx="12" cy="21" r="1.2" fill="currentColor" />
      <circle cx="3" cy="12" r="1.2" fill="currentColor" />
      <circle cx="21" cy="12" r="1.2" fill="currentColor" />
      <circle cx="5.5" cy="5.5" r="1" fill="currentColor" />
      <circle cx="18.5" cy="5.5" r="1" fill="currentColor" />
      <circle cx="5.5" cy="18.5" r="1" fill="currentColor" />
      <circle cx="18.5" cy="18.5" r="1" fill="currentColor" />
    </svg>
  ),
  "HR Agent": (
    <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7 text-ink/40">
      <circle cx="8" cy="8" r="3" fill="currentColor" />
      <circle cx="16" cy="12" r="1.5" fill="currentColor" />
      <circle cx="8" cy="18" r="2" fill="currentColor" />
    </svg>
  ),
  "Finance Agent": (
    <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7 text-ink/40">
      <path d="M6 6C6 9.3 8.7 12 12 12C15.3 12 18 9.3 18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
      <circle cx="12" cy="18" r="2" fill="currentColor" />
      <circle cx="6" cy="18" r="1" fill="currentColor" />
    </svg>
  ),
  "Marketing Agent": (
    <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7 text-ink/40">
      <circle cx="12" cy="6" r="1.5" fill="currentColor" />
      <path d="M6 12C6 15.3 8.7 18 12 18C15.3 18 18 15.3 18 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
      <circle cx="18" cy="6" r="3" fill="currentColor" />
    </svg>
  ),
  "Compliance Agent": (
    <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7 text-ink/40">
      <path d="M18 12C18 15.3 15.3 18 12 18C8.7 18 6 15.3 6 12C6 8.7 8.7 6 12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
      <circle cx="18" cy="6" r="2.5" fill="currentColor" />
    </svg>
  ),
  "Reporting Agent": (
    <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7 text-ink/40">
      <circle cx="6" cy="6" r="1" fill="currentColor" />
      <circle cx="12" cy="6" r="2" fill="currentColor" />
      <circle cx="18" cy="6" r="3.5" fill="currentColor" />
      <path d="M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  "Quotes & Bookings Tool": (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-ink/40">
      <path d="M4 4H16L20 8V20H4V4Z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
      <path d="M16 4V8H20" stroke="currentColor" strokeWidth="0.8" />
      <line x1="8" y1="12" x2="16" y2="12" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
      <line x1="8" y1="16" x2="14" y2="16" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
    </svg>
  ),
  "CRM Tool": (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-ink/40">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="0.8" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1" />
      <line x1="12" y1="3" x2="12" y2="8" stroke="currentColor" strokeWidth="0.6" />
      <line x1="12" y1="16" x2="12" y2="21" stroke="currentColor" strokeWidth="0.6" />
      <line x1="3" y1="12" x2="8" y2="12" stroke="currentColor" strokeWidth="0.6" />
      <line x1="16" y1="12" x2="21" y2="12" stroke="currentColor" strokeWidth="0.6" />
    </svg>
  ),
  "Unified Inbox Tool": (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-ink/40">
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1" />
      <path d="M3 7L12 13L21 7" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  "Resource Allocation Tool": (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-ink/40">
      <circle cx="6" cy="6" r="3" stroke="currentColor" strokeWidth="0.8" />
      <circle cx="18" cy="6" r="3" stroke="currentColor" strokeWidth="0.8" />
      <circle cx="12" cy="18" r="3" stroke="currentColor" strokeWidth="0.8" />
      <line x1="8" y1="7" x2="16" y2="7" stroke="currentColor" strokeWidth="0.6" strokeDasharray="1.5 1.5" />
      <line x1="7" y1="9" x2="10" y2="16" stroke="currentColor" strokeWidth="0.6" strokeDasharray="1.5 1.5" />
      <line x1="17" y1="9" x2="14" y2="16" stroke="currentColor" strokeWidth="0.6" strokeDasharray="1.5 1.5" />
    </svg>
  ),
  "Inventory Tool": (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-ink/40">
      <rect x="4" y="10" width="6" height="10" stroke="currentColor" strokeWidth="0.8" />
      <rect x="14" y="6" width="6" height="14" stroke="currentColor" strokeWidth="0.8" />
      <rect x="9" y="14" width="6" height="6" stroke="currentColor" strokeWidth="0.8" />
    </svg>
  ),
  "Ops Dashboard Tool": (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-ink/40">
      <rect x="2" y="3" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1" />
      <line x1="8" y1="21" x2="16" y2="21" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
      <line x1="12" y1="17" x2="12" y2="21" stroke="currentColor" strokeWidth="0.8" />
      <path d="M6 12L9 9L12 11L18 6" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  "Assessment Tool": (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-ink/40">
      <rect x="5" y="3" width="14" height="18" rx="2" stroke="currentColor" strokeWidth="1" />
      <path d="M9 8L11 10L15 6" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="9" y1="14" x2="15" y2="14" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
      <line x1="9" y1="17" x2="13" y2="17" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
    </svg>
  ),
  "Web Design Tool": (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-ink/40">
      <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="1" />
      <line x1="2" y1="8" x2="22" y2="8" stroke="currentColor" strokeWidth="0.6" />
      <circle cx="5" cy="6" r="0.8" fill="currentColor" />
      <circle cx="8" cy="6" r="0.8" fill="currentColor" />
      <circle cx="11" cy="6" r="0.8" fill="currentColor" />
      <path d="M8 13L6 15L8 17" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 13L18 15L16 17" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="13" y1="11" x2="11" y2="19" stroke="currentColor" strokeWidth="0.6" />
    </svg>
  ),
};

const allCards = [
  { label: "AGENT", name: "Customer Service Agent", desc: "Every message answered. Every customer heard. Instant, accurate, personal — across every channel, 24/7." },
  { label: "AGENT", name: "Sales Agent", desc: "Every lead followed up. Every quote sent on time. Every opportunity pursued to its conclusion — automatically." },
  { label: "AGENT", name: "Receptionist Agent", desc: "Answers calls, checks availability, takes bookings and handles the front line — professionally, instantly, always." },
  { label: "AGENT", name: "Operations Agent", desc: "Builds schedules, allocates resources, sends briefings, tracks jobs and coordinates everything behind the scenes." },
  { label: "AGENT", name: "HR Agent", desc: "Recruiting, screening, onboarding, training and managing your people — the entire employee lifecycle, automated." },
  { label: "AGENT", name: "Finance Agent", desc: "Invoices raised, payments chased, expenses tracked, reports ready — without a finance team doing it manually." },
  { label: "AGENT", name: "Marketing Agent", desc: "Content created, campaigns managed, performance tracked — your brand showing up everywhere, consistently." },
  { label: "AGENT", name: "Compliance Agent", desc: "Every deadline tracked, every licence monitored, every policy current — nothing missed, nothing expired." },
  { label: "AGENT", name: "Reporting Agent", desc: "Every number from every corner of your business — in one place, always current, always clear." },
];

const toolCards = [
  { label: "TOOL", name: "Quotes & Bookings Tool", desc: "Accurate quotes generated instantly based on your rules. Live availability. Full booking flow — no manual steps." },
  { label: "TOOL", name: "CRM Tool", desc: "Every interaction logged automatically. Pipeline managed. Follow-ups handled. Your sales process on autopilot." },
  { label: "TOOL", name: "Unified Inbox Tool", desc: "Every message from every channel in one place. AI reads, prioritises and responds automatically." },
  { label: "TOOL", name: "Resource Allocation Tool", desc: "The right resource, in the right place, at the right time — staff, vehicles, equipment, all automatic." },
  { label: "TOOL", name: "Inventory Tool", desc: "Real-time levels. Auto-reorders. Supplier comms managed. Every movement tracked and audited." },
  { label: "TOOL", name: "Ops Dashboard Tool", desc: "The complete picture of your business — right now, on any device, wherever you are." },
  { label: "TOOL", name: "Assessment Tool", desc: "Bespoke tests for every role. Automatically scored. Reduces bad hires and the cost of getting it wrong." },
  { label: "TOOL", name: "Web Design Tool", desc: "Websites with automation woven in from day one — your 24/7 digital salesperson." },
];

export function ServiceCarousel({ filter }: { filter?: "AGENT" | "TOOL" }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const mouseTrackingRef = useRef(false);

  const scroll = useCallback((direction: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = 320;
    el.scrollBy({ left: direction * cardWidth, behavior: "smooth" });

    // Loop: if at the end, jump to start; if at start, jump to end
    setTimeout(() => {
      if (!el) return;
      const maxScroll = el.scrollWidth - el.clientWidth;
      if (el.scrollLeft >= maxScroll - 10) {
        el.scrollLeft = 0;
      } else if (el.scrollLeft <= 10 && direction < 0) {
        el.scrollLeft = maxScroll;
      }
    }, 400);
  }, []);

  // Mouse position tracking — move cards based on mouse X
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let animId: number;
    let targetSpeed = 0;
    let currentSpeed = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (!mouseTrackingRef.current) return;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width; // 0 to 1
      const centre = 0.5;
      const deadZone = 0.15;
      const diff = x - centre;

      if (Math.abs(diff) < deadZone) {
        targetSpeed = 0;
      } else {
        targetSpeed = (diff > 0 ? diff - deadZone : diff + deadZone) * 8;
      }
    };

    const handleMouseEnter = () => { mouseTrackingRef.current = true; };
    const handleMouseLeave = () => { mouseTrackingRef.current = false; targetSpeed = 0; };

    function animate() {
      currentSpeed += (targetSpeed - currentSpeed) * 0.08;
      if (Math.abs(currentSpeed) > 0.1 && el) {
        el.scrollLeft += currentSpeed;
        // Loop
        const maxScroll = el.scrollWidth / 2;
        if (el.scrollLeft >= maxScroll) el.scrollLeft -= maxScroll;
        if (el.scrollLeft <= 0) el.scrollLeft += maxScroll;
      }
      animId = requestAnimationFrame(animate);
    }

    animId = requestAnimationFrame(animate);
    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseenter", handleMouseEnter);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animId);
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseenter", handleMouseEnter);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const sourceCards = filter === "TOOL" ? toolCards : filter === "AGENT" ? allCards : [...allCards, ...toolCards];

  return (
    <motion.div
      className="flex-1 flex items-center w-full px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8, duration: 0.8 }}
    >
      <div className="grid grid-cols-3 md:grid-cols-5 gap-3 w-full max-w-6xl mx-auto">
        {sourceCards.map((card, i) => (
          <motion.div
            key={card.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 + i * 0.06, duration: 0.5 }}
          >
            <div className="rounded-2xl border border-ink/10 bg-white/6 backdrop-blur-2xl p-4 md:p-5 flex flex-col justify-between h-full min-h-[200px] shadow-[0_8px_32px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.08)] hover:bg-white/7 transition-colors duration-300">
              <div>
                <div className="w-6 h-6 mb-3 flex items-center justify-center">
                  {cardGlyphs[card.name] || null}
                </div>
                <h3 className="font-body text-xs md:text-sm text-ink font-medium leading-snug">{card.name}</h3>
              </div>
              <div>
                <p className="font-body text-[9px] md:text-[10px] text-ink/40 leading-relaxed mt-3">{card.desc}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
