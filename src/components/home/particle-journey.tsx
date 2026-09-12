"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── Shape generators ──

function clusterPoints(cx: number, cy: number, s: number) {
  const pts: { x: number; y: number }[] = [];
  for (let i = 0; i < 600; i++) {
    const a = Math.random() * Math.PI * 2;
    const r = Math.pow(Math.random(), 0.5) * s * 0.22;
    pts.push({ x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r });
  }
  return pts;
}

function questionPoints(cx: number, cy: number, s: number) {
  const pts: { x: number; y: number }[] = [];
  for (let t = 0; t <= 1; t += 0.004) {
    const angle = Math.PI * 1.1 - t * Math.PI * 1.6;
    const r = s * 0.28;
    pts.push({ x: cx + Math.cos(angle) * r, y: cy - s * 0.18 + Math.sin(angle) * r * 0.85 });
  }
  for (let t = 0; t <= 1; t += 0.01) pts.push({ x: cx, y: cy + s * 0.05 + t * s * 0.14 });
  for (let t = 0; t < 20; t++) {
    const a = (t / 20) * Math.PI * 2;
    pts.push({ x: cx + Math.cos(a) * s * 0.025, y: cy + s * 0.3 + Math.sin(a) * s * 0.025 });
  }
  return pts;
}

function brainPoints(cx: number, cy: number, s: number) {
  const pts: { x: number; y: number }[] = [];
  const regions = [
    { cx: cx - s * 0.03, cy: cy - s * 0.05, rx: s * 0.33, ry: s * 0.24, w: 5 },
    { cx: cx - s * 0.2, cy: cy - s * 0.02, rx: s * 0.18, ry: s * 0.2, w: 3 },
    { cx: cx + s * 0.02, cy: cy - s * 0.18, rx: s * 0.22, ry: s * 0.14, w: 2 },
    { cx: cx + s * 0.22, cy: cy - s * 0.04, rx: s * 0.14, ry: s * 0.18, w: 2 },
    { cx: cx - s * 0.12, cy: cy + s * 0.1, rx: s * 0.2, ry: s * 0.12, w: 2 },
    { cx: cx + s * 0.22, cy: cy + s * 0.16, rx: s * 0.12, ry: s * 0.09, w: 2 },
    { cx: cx + s * 0.08, cy: cy + s * 0.26, rx: s * 0.04, ry: s * 0.07, w: 1 },
  ];
  for (const r of regions) {
    const count = r.w * 60;
    for (let i = 0; i < count; i++) {
      const a = Math.random() * Math.PI * 2;
      const d = Math.sqrt(Math.random());
      pts.push({ x: r.cx + Math.cos(a) * d * r.rx, y: r.cy + Math.sin(a) * d * r.ry });
    }
  }
  return pts;
}

function orbPoints(cx: number, cy: number, s: number) {
  const pts: { x: number; y: number }[] = [];
  const r = s * 0.2;
  // Sphere outline rings
  for (let ring = 0; ring < 8; ring++) {
    const ringR = r * Math.sin((ring / 7) * Math.PI);
    const ringY = cy - r + (ring / 7) * r * 2;
    for (let t = 0; t < 40; t++) {
      const a = (t / 40) * Math.PI * 2;
      pts.push({ x: cx + Math.cos(a) * ringR, y: ringY + Math.sin(a) * ringR * 0.15 });
    }
  }
  // Fill
  for (let i = 0; i < 200; i++) {
    const a = Math.random() * Math.PI * 2;
    const b = Math.random() * Math.PI;
    const d = Math.pow(Math.random(), 0.4) * r;
    pts.push({ x: cx + Math.cos(a) * Math.sin(b) * d, y: cy + Math.cos(b) * d });
  }
  return pts;
}

function headPoints(cx: number, cy: number, s: number) {
  const pts: { x: number; y: number }[] = [];
  const r = s * 0.25;
  // Side profile head — forehead, nose, chin, back of head
  const profilePts: [number, number][] = [
    [0.0, -0.8], [0.15, -0.85], [0.3, -0.8], [0.4, -0.65], [0.42, -0.5],
    [0.4, -0.35], [0.45, -0.25], [0.42, -0.2], [0.35, -0.22], // nose
    [0.32, -0.15], [0.3, -0.05], [0.35, 0.05], [0.3, 0.15], // lips chin
    [0.2, 0.25], [0.05, 0.3], [-0.1, 0.25], // jaw
    [-0.2, 0.15], [-0.3, 0.0], [-0.35, -0.15], [-0.35, -0.35],
    [-0.3, -0.55], [-0.2, -0.7], [-0.1, -0.8], [0.0, -0.8],
  ];
  // Outline
  for (let i = 0; i < profilePts.length - 1; i++) {
    const [x1, y1] = profilePts[i];
    const [x2, y2] = profilePts[i + 1];
    for (let t = 0; t <= 1; t += 0.02) {
      pts.push({ x: cx + (x1 + (x2 - x1) * t) * r, y: cy + (y1 + (y2 - y1) * t) * r });
    }
  }
  // Fill interior
  for (let i = 0; i < 300; i++) {
    const x = (Math.random() - 0.1) * 0.8;
    const y = (Math.random() - 0.3) * 1.1;
    // Rough bounds check
    const dist = Math.sqrt(x * x + y * y);
    if (dist < 0.55) {
      pts.push({ x: cx + x * r, y: cy + y * r });
    }
  }
  return pts;
}

function infinityPoints(cx: number, cy: number, s: number) {
  const pts: { x: number; y: number }[] = [];
  const r = s * 0.18;
  // Lemniscate of Bernoulli (infinity symbol)
  // x = a * cos(t) / (1 + sin²(t))
  // y = a * sin(t) * cos(t) / (1 + sin²(t))
  // Outline
  for (let t = 0; t <= Math.PI * 2; t += 0.008) {
    const sinT = Math.sin(t);
    const cosT = Math.cos(t);
    const denom = 1 + sinT * sinT;
    const x = cx + (r * 1.6 * cosT) / denom;
    const y = cy + (r * sinT * cosT) / denom;
    pts.push({ x, y });
  }
  // Second pass slightly offset for thickness
  for (let t = 0; t <= Math.PI * 2; t += 0.01) {
    const sinT = Math.sin(t);
    const cosT = Math.cos(t);
    const denom = 1 + sinT * sinT;
    const x = cx + (r * 1.5 * cosT) / denom;
    const y = cy + (r * 0.9 * sinT * cosT) / denom;
    pts.push({ x, y });
  }
  // Fill interior with scattered points along the path
  for (let i = 0; i < 200; i++) {
    const t = Math.random() * Math.PI * 2;
    const sinT = Math.sin(t);
    const cosT = Math.cos(t);
    const denom = 1 + sinT * sinT;
    const scatter = (Math.random() - 0.5) * r * 0.3;
    const scatterY = (Math.random() - 0.5) * r * 0.25;
    const x = cx + (r * 1.6 * cosT) / denom + scatter;
    const y = cy + (r * sinT * cosT) / denom + scatterY;
    pts.push({ x, y });
  }
  return pts;
}

const shapes = ["cluster", "question", "brain", "orb", "head", "infinity"] as const;
type Shape = (typeof shapes)[number];

function getPoints(shape: Shape, cx: number, cy: number, s: number) {
  switch (shape) {
    case "cluster": return clusterPoints(cx, cy, s);
    case "question": return questionPoints(cx, cy, s);
    case "brain": return brainPoints(cx, cy, s);
    case "orb": return orbPoints(cx, cy, s);
    case "head": return headPoints(cx, cy, s);
    case "infinity": return infinityPoints(cx, cy, s);
  }
}

// ── Section content ──

interface SectionContent {
  shape: Shape;
  heading?: string;
  headingStyle?: string;
  copy?: string;
  words?: { text: string; style: React.CSSProperties; from: { x: string; y: string } }[];
  smallHeading?: string;
}

const sections: SectionContent[] = [
  { shape: "cluster" },
  {
    shape: "question",
    words: [
      { text: "Why", style: { top: "2%", left: "3%" }, from: { x: "-60vw", y: "30vh" } },
      { text: "work", style: { top: "20%", left: "10%" }, from: { x: "-50vw", y: "25vh" } },
      { text: "with", style: { bottom: "22%", right: "10%" }, from: { x: "50vw", y: "25vh" } },
      { text: "us", style: { bottom: "2%", right: "3%" }, from: { x: "60vw", y: "30vh" } },
    ],
  },
  {
    shape: "brain",
    smallHeading: "Why work with us",
    heading: "Knowledge",
    headingStyle: "font-display",
    copy: "We\u2019re entrepreneurs \u00d7 coders. A decade of founding, scaling and automating real businesses has given us something no agency can replicate \u2014 our lived experience of every problem we solve, the knowledge to foresee them before they happen + the technical skill to solve them.",
  },
  {
    shape: "orb",
    smallHeading: "Why work with us",
    heading: "Continuity",
    headingStyle: "font-display",
    copy: "One connected system with one voice. No stack of disconnected apps talking different languages. Everything speaks to everything, instantly, one entity, unified.",
  },
  {
    shape: "head",
    smallHeading: "Why work with us",
    heading: "Bespoke",
    headingStyle: "font-display",
    copy: "No two businesses are built the same way. Your systems are designed around how you work now and where you want to go. You don\u2019t adapt to the tech, the tech adapts to you.",
  },
  {
    shape: "infinity",
    smallHeading: "Why work with us",
    heading: "Evolution",
    headingStyle: "font-display",
    copy: "We don\u2019t build and disappear. Start with what you need, add what you want when you\u2019re ready. Your automation grows as your business grows \u2014 no big bang, no rip and replace, just steady progress on your terms. Growing with you.",
  },
];

// ── Particle system ──

interface Particle {
  x: number; y: number;
  targetX: number; targetY: number;
  angle: number; speed: number;
  radius: number; orbitRadius: number;
  opacity: number; phase: number;
}

export function ParticleJourney({ onComplete }: { onComplete: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const shapeRef = useRef<Shape>("cluster");
  const [currentSection, setCurrentSection] = useState(0);

  const navigate = useCallback((dir: 1 | -1) => {
    setCurrentSection((prev) => {
      const next = prev + dir;
      if (next >= sections.length) {
        onComplete();
        return prev;
      }
      if (next < 0) return prev;
      return next;
    });
  }, [onComplete]);

  // Scroll handler
  useEffect(() => {
    let lastNav = 0;
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const now = Date.now();
      if (now - lastNav < 1200) return;
      if (Math.abs(e.deltaY) < 30) return;
      lastNav = now;
      navigate(e.deltaY > 0 ? 1 : -1);
    };
    const handleKey = (e: KeyboardEvent) => {
      const now = Date.now();
      if (now - lastNav < 1200) return;
      if (e.key === "ArrowDown" || e.key === " ") { lastNav = now; navigate(1); }
      if (e.key === "ArrowUp") { lastNav = now; navigate(-1); }
    };
    let touchY = 0;
    const handleTouchStart = (e: TouchEvent) => { touchY = e.touches[0].clientY; };
    const handleTouchEnd = (e: TouchEvent) => {
      const diff = touchY - e.changedTouches[0].clientY;
      const now = Date.now();
      if (now - lastNav < 1200 || Math.abs(diff) < 50) return;
      lastNav = now;
      navigate(diff > 0 ? 1 : -1);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKey);
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKey);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [navigate]);

  // Update particle targets when section changes
  useEffect(() => {
    const shape = sections[currentSection].shape;
    shapeRef.current = shape;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const size = 500;
    const pts = getPoints(shape, size / 2, size / 2, size);
    const particles = particlesRef.current;
    for (let i = 0; i < particles.length; i++) {
      const pt = pts[Math.floor(Math.random() * pts.length)];
      const scatter = 2 + Math.random() * 8;
      const sa = Math.random() * Math.PI * 2;
      particles[i].targetX = pt.x + Math.cos(sa) * scatter;
      particles[i].targetY = pt.y + Math.sin(sa) * scatter;
    }
  }, [currentSection]);

  // Canvas setup & animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    const size = 500;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);
    const cx = size / 2, cy = size / 2;

    const pts = getPoints("cluster", cx, cy, size);
    const count = 300;
    if (particlesRef.current.length === 0) {
      for (let i = 0; i < count; i++) {
        const pt = pts[Math.floor(Math.random() * pts.length)];
        const scatter = 2 + Math.random() * 8;
        const sa = Math.random() * Math.PI * 2;
        particlesRef.current.push({
          x: pt.x + Math.cos(sa) * scatter, y: pt.y + Math.sin(sa) * scatter,
          targetX: pt.x, targetY: pt.y,
          angle: Math.random() * Math.PI * 2,
          speed: 0.002 + Math.random() * 0.004,
          radius: Math.random() < 0.3 ? 2 + Math.random() * 3 : 0.5 + Math.random() * 1.5,
          orbitRadius: 1.5 + Math.random() * 5,
          opacity: 0.3 + Math.random() * 0.5,
          phase: Math.random() * Math.PI * 2,
        });
      }
    }

    const connDist = 50;
    let time = 0;

    function draw() {
      if (!ctx) return;
      time += 0.006;
      ctx.clearRect(0, 0, size, size);
      const particles = particlesRef.current;

      for (const p of particles) {
        const bx = p.x - Math.cos(p.angle + p.phase) * p.orbitRadius;
        const by = p.y - Math.sin(p.angle * 0.7 + p.phase) * p.orbitRadius * 0.8;
        const nx = bx + (p.targetX - bx) * 0.025;
        const ny = by + (p.targetY - by) * 0.025;
        p.angle += p.speed;
        p.x = nx + Math.cos(p.angle + p.phase) * p.orbitRadius;
        p.y = ny + Math.sin(p.angle * 0.7 + p.phase) * p.orbitRadius * 0.8;
      }

      // Connections
      for (let i = 0; i < particles.length; i++) {
        let c = 0;
        for (let j = i + 1; j < particles.length && c < 3; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < connDist) {
            ctx.strokeStyle = `rgba(242, 238, 227,${(1 - d / connDist) * 0.15})`;
            ctx.lineWidth = 0.3;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
            c++;
          }
        }
      }

      // Dots
      for (const p of particles) {
        const pulse = 0.7 + 0.3 * Math.sin(time * 2.5 + p.phase);
        ctx.fillStyle = `rgba(242, 238, 227,${p.opacity * pulse})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(draw);
    }

    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  const section = sections[currentSection];

  return (
    <div className="fixed inset-0 overflow-hidden text-ink">
      {/* Canvas — always visible */}
      <div className="absolute inset-0 flex items-center justify-center">
        <canvas
          ref={canvasRef}
          className="w-[300px] h-[300px] md:w-[420px] md:h-[420px] lg:w-[500px] lg:h-[500px]"
        />
      </div>

      {/* Small heading — top left */}
      <AnimatePresence>
        {section.smallHeading && (
          <motion.h3
            key={`small-${currentSection}`}
            className="absolute top-6 left-8 font-body text-lg md:text-2xl font-light text-ink/80 z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8 }}
          >
            {section.smallHeading}
          </motion.h3>
        )}
      </AnimatePresence>

      {/* Floating words (question mark section) */}
      <AnimatePresence>
        {section.words && (
          <>
            {section.words.map((word, i) => (
              <motion.span
                key={`word-${word.text}-${currentSection}`}
                className="absolute font-body text-5xl md:text-7xl lg:text-[6rem] font-light text-ink z-10"
                style={word.style as React.CSSProperties}
                initial={{ x: word.from.x, y: word.from.y, opacity: 0 }}
                animate={{ x: 0, y: 0, opacity: 1 }}
                exit={{ opacity: 0, y: "-50vh", transition: { duration: 0.8 } }}
                transition={{ duration: 1.5, delay: i * 0.2, ease: [0.15, 0.8, 0.3, 1] }}
              >
                {word.text}
              </motion.span>
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Heading + copy (knowledge, continuity, bespoke sections) */}
      <AnimatePresence mode="wait">
        {section.heading && (
          <motion.div
            key={`content-${currentSection}`}
            className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none px-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className={`${section.headingStyle} text-5xl md:text-7xl lg:text-[6rem] font-light text-center`}>
              {section.heading}
            </h2>
            {section.copy && (
              <motion.p
                className="font-body text-xs md:text-sm lg:text-base text-ink/60 leading-relaxed max-w-2xl text-center mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                {section.copy}
              </motion.p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Section dots */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2">
        {sections.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSection(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === currentSection ? "bg-ink scale-125" : "bg-ink/25 hover:bg-ink/50"
            }`}
          />
        ))}
      </div>

      {/* Scroll hint on first section */}
      {currentSection === 0 && (
        <motion.div
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-ink/50">
            <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      )}
    </div>
  );
}
