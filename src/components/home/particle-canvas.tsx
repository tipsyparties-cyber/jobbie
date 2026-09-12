"use client";

import { useEffect, useRef } from "react";

export type ParticleShape = "cluster" | "question" | "brain" | "orb" | "head" | "infinity" | "none";

interface Particle {
  x: number; y: number;
  targetX: number; targetY: number;
  angle: number; speed: number;
  radius: number; orbitRadius: number;
  opacity: number; phase: number;
}

function clusterPts(cx: number, cy: number, s: number) {
  const p: {x:number;y:number}[] = [];
  for (let i = 0; i < 500; i++) {
    const a = Math.random() * Math.PI * 2, r = Math.pow(Math.random(), 0.5) * s * 0.22;
    p.push({ x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r });
  }
  return p;
}

function questionPts(cx: number, cy: number, s: number) {
  const p: {x:number;y:number}[] = [];
  const scale = s * 0.35;

  // Angles are screen-space: +sin is DOWN. 140 degrees is lower-left, 270 is
  // the top, 40 is lower-right.
  const r = scale * 0.42;
  const topY = cy - scale * 0.28;
  const A0 = Math.PI * 0.78;   // start, lower-left
  const SWEEP = Math.PI * 1.44; // 259 degrees, leaving a 100 degree mouth

  // The hook. It used to sweep 306 degrees, leaving only a 54 degree gap —
  // which is why it closed up and read as an O rather than a question mark.
  for (let pass = 0; pass < 15; pass++) {
    const w = pass * 0.8;
    for (let t = 0; t <= 1; t += 0.0015) {
      const a = A0 + t * SWEEP;
      const rr = r + (Math.random() - 0.5) * w;
      p.push({ x: cx + Math.cos(a) * rr, y: topY + Math.sin(a) * rr });
    }
  }

  // The stem, as a curve starting exactly where the hook ends and sweeping
  // down and inward to the centre line. Previously this was a straight
  // vertical bar sitting at cx, which did not touch the hook at all — hence
  // the detached blob under the circle.
  const endA = A0 + SWEEP;
  const sx = cx + Math.cos(endA) * r;
  const sy = topY + Math.sin(endA) * r;
  const ex = cx;
  const ey = cy + scale * 0.3;
  // Control point holds the curve out to the right before it tucks in.
  const qx = cx + scale * 0.3;
  const qy = cy + scale * 0.16;

  for (let pass = 0; pass < 12; pass++) {
    const w = pass * 0.7;
    for (let t = 0; t <= 1; t += 0.002) {
      const u = 1 - t;
      const x = u * u * sx + 2 * u * t * qx + t * t * ex;
      const y = u * u * sy + 2 * u * t * qy + t * t * ey;
      p.push({ x: x + (Math.random() - 0.5) * w, y: y + (Math.random() - 0.5) * w });
    }
  }

  // The dot, clear of the stem's end so the gap reads.
  for (let i = 0; i < 260; i++) {
    const a = Math.random() * Math.PI * 2;
    const rr = Math.sqrt(Math.random()) * scale * 0.075;
    p.push({ x: cx + Math.cos(a) * rr, y: cy + scale * 0.52 + Math.sin(a) * rr });
  }

  return p;
}

function brainPts(cx: number, cy: number, s: number) {
  const p: {x:number;y:number}[] = [];
  const regions = [
    { cx: cx - s*0.03, cy: cy - s*0.05, rx: s*0.33, ry: s*0.24, w: 5 },
    { cx: cx - s*0.2, cy: cy - s*0.02, rx: s*0.18, ry: s*0.2, w: 3 },
    { cx: cx + s*0.02, cy: cy - s*0.18, rx: s*0.22, ry: s*0.14, w: 2 },
    { cx: cx + s*0.22, cy: cy - s*0.04, rx: s*0.14, ry: s*0.18, w: 2 },
    { cx: cx - s*0.12, cy: cy + s*0.1, rx: s*0.2, ry: s*0.12, w: 2 },
    { cx: cx + s*0.22, cy: cy + s*0.16, rx: s*0.12, ry: s*0.09, w: 2 },
    { cx: cx + s*0.08, cy: cy + s*0.26, rx: s*0.04, ry: s*0.07, w: 1 },
  ];
  for (const r of regions) for (let i = 0; i < r.w * 60; i++) {
    const a = Math.random() * Math.PI * 2, d = Math.sqrt(Math.random());
    p.push({ x: r.cx + Math.cos(a) * d * r.rx, y: r.cy + Math.sin(a) * d * r.ry });
  }
  return p;
}

function orbPts(cx: number, cy: number, s: number) {
  // Circle — particles on ring, slowly orbiting
  const p: {x:number;y:number}[] = [], r = s * 0.22;
  for (let t = 0; t <= Math.PI * 2; t += 0.015) {
    p.push({ x: cx + Math.cos(t) * r, y: cy + Math.sin(t) * r });
  }
  // Slight inner scatter
  for (let i = 0; i < 80; i++) {
    const a = Math.random() * Math.PI * 2;
    const d = r * (0.85 + Math.random() * 0.3);
    p.push({ x: cx + Math.cos(a) * d, y: cy + Math.sin(a) * d });
  }
  return p;
}

function headPts(cx: number, cy: number, s: number, angle = 0) {
  const p: {x:number;y:number}[] = [];
  const r = s * 0.11;
  const spread = s * 0.24;
  const cos = Math.cos(angle), sin = Math.sin(angle);
  // 3D rotation helper — rotate around Y axis then project
  const proj = (x3: number, y3: number, z3: number, ox: number, oy: number) => {
    const rx = x3 * cos - z3 * sin;
    const rz = x3 * sin + z3 * cos;
    const scale = 1 / (1 + rz * 0.003);
    return { x: ox + rx * scale, y: oy + y3 * scale };
  };

  // Pyramid (left) — filled triangle
  const px = cx - spread, py = cy;
  for (let i = 0; i < 300; i++) {
    const u = Math.random(), v = Math.random();
    const su = Math.sqrt(u);
    // Barycentric coords for triangle fill
    const x = (1-su)*0 + su*(1-v)*(-r) + su*v*r;
    const y = (1-su)*(-r*1.3) + su*(1-v)*(r*0.8) + su*v*(r*0.8);
    p.push({ x: px + x, y: py + y });
  }
  // Outline
  const tri: [number,number][] = [[0,-r*1.3],[r,r*0.8],[-r,r*0.8],[0,-r*1.3]];
  for (let i = 0; i < 3; i++) {
    for (let t = 0; t <= 1; t += 0.005) {
      p.push({ x: px+tri[i][0]+(tri[i+1][0]-tri[i][0])*t, y: py+tri[i][1]+(tri[i+1][1]-tri[i][1])*t });
    }
  }

  // Sphere (centre) — filled circle with shading
  const sx = cx, sy = cy;
  for (let i = 0; i < 400; i++) {
    const a = Math.random() * Math.PI * 2;
    const d = Math.sqrt(Math.random()) * r;
    p.push({ x: sx + Math.cos(a) * d, y: sy + Math.sin(a) * d });
  }

  // Cube (right) — filled wireframe
  const qx = cx + spread, qy = cy;
  const h = r * 0.85;
  const d2 = h * 0.45;
  const faces = [
    [[-h,-h],[h,-h],[h,h],[-h,h]], // front
    [[-h+d2,-h-d2],[h+d2,-h-d2],[h+d2,h-d2],[-h+d2,h-d2]], // back
  ];
  for (const face of faces) {
    for (let i = 0; i < 4; i++) {
      const [x1,y1] = face[i], [x2,y2] = face[(i+1)%4];
      for (let t = 0; t <= 1; t += 0.004) p.push({ x: qx+x1+(x2-x1)*t, y: qy+y1+(y2-y1)*t });
    }
  }
  // Connecting edges
  for (let i = 0; i < 4; i++) {
    for (let t = 0; t <= 1; t += 0.008) p.push({ x: qx+faces[0][i][0]+(faces[1][i][0]-faces[0][i][0])*t, y: qy+faces[0][i][1]+(faces[1][i][1]-faces[0][i][1])*t });
  }
  // Fill front face
  for (let i = 0; i < 200; i++) {
    const x = (Math.random()-0.5)*2*h, y = (Math.random()-0.5)*2*h;
    p.push({ x: qx+x, y: qy+y });
  }

  return p;
}

function infinityPts(cx: number, cy: number, s: number) {
  const p: {x:number;y:number}[] = [], r = s * 0.18;
  for (let t = 0; t <= Math.PI * 2; t += 0.008) {
    const st = Math.sin(t), ct = Math.cos(t), d = 1 + st * st;
    p.push({ x: cx + (r * 1.6 * ct) / d, y: cy + (r * st * ct) / d });
  }
  for (let t = 0; t <= Math.PI * 2; t += 0.01) {
    const st = Math.sin(t), ct = Math.cos(t), d = 1 + st * st;
    p.push({ x: cx + (r * 1.5 * ct) / d, y: cy + (r * 0.9 * st * ct) / d });
  }
  for (let i = 0; i < 200; i++) {
    const t = Math.random() * Math.PI * 2, st = Math.sin(t), ct = Math.cos(t), d = 1 + st * st;
    p.push({ x: cx + (r*1.6*ct)/d + (Math.random()-0.5)*r*0.3, y: cy + (r*st*ct)/d + (Math.random()-0.5)*r*0.25 });
  }
  return p;
}

function getPts(shape: ParticleShape, cx: number, cy: number, s: number) {
  switch (shape) {
    case "cluster": return clusterPts(cx, cy, s);
    case "question": return questionPts(cx, cy, s);
    case "brain": return brainPts(cx, cy, s);
    case "orb": return orbPts(cx, cy, s);
    case "head": return headPts(cx, cy, s);
    case "infinity": return infinityPts(cx, cy, s);
    case "none": return clusterPts(cx, cy, s);
  }
}

export function ParticleCanvas({ shape }: { shape: ParticleShape }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const shapeRef = useRef<ParticleShape>(shape);

  // Update targets when shape changes
  useEffect(() => {
    shapeRef.current = shape;
    const size = 500, cx = size / 2, cy = size / 2;
    const pts = getPts(shape, cx, cy, size);
    for (const p of particlesRef.current) {
      const pt = pts[Math.floor(Math.random() * pts.length)];
      const sc = Math.random() * 3, sa = Math.random() * Math.PI * 2;
      p.targetX = pt.x + Math.cos(sa) * sc;
      p.targetY = pt.y + Math.sin(sa) * sc;
    }
  }, [shape]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    const size = 500;
    canvas.width = size * dpr; canvas.height = size * dpr;
    ctx.scale(dpr, dpr);
    const cx = size / 2, cy = size / 2;
    const pts = getPts("cluster", cx, cy, size);

    if (particlesRef.current.length === 0) {
      for (let i = 0; i < 2000; i++) {
        const pt = pts[Math.floor(Math.random() * pts.length)];
        const sc = 2 + Math.random() * 8, sa = Math.random() * Math.PI * 2;
        particlesRef.current.push({
          x: pt.x + Math.cos(sa) * sc, y: pt.y + Math.sin(sa) * sc,
          targetX: pt.x, targetY: pt.y,
          angle: Math.random() * Math.PI * 2, speed: 0.0005 + Math.random() * 0.002,
          radius: 0.2 + Math.random() * 0.6,
          orbitRadius: 0.5 + Math.random() * 1.5, opacity: 0.3 + Math.random() * 0.5,
          phase: Math.random() * Math.PI * 2,
        });
      }
    }

    let time = 0;
    const getConnDist = () => shapeRef.current === "brain" ? 70 : 45;

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

      for (let i = 0; i < particles.length; i++) {
        const cd = getConnDist();
        const maxConn = shapeRef.current === "brain" ? 4 : 3;
        const lineAlpha = shapeRef.current === "brain" ? 0.2 : 0.15;
        let c = 0;
        for (let j = i + 1; j < particles.length && c < maxConn; j++) {
          const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < cd) {
            ctx.strokeStyle = `rgba(242, 238, 227,${(1 - d / cd) * lineAlpha})`;
            ctx.lineWidth = shapeRef.current === "brain" ? 0.5 : 0.3;
            ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y); ctx.stroke();
            c++;
          }
        }
      }

      for (const p of particles) {
        const pulse = 0.7 + 0.3 * Math.sin(time * 2.5 + p.phase);
        ctx.fillStyle = `rgba(242, 238, 227,${p.opacity * pulse})`;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2); ctx.fill();
      }

      animRef.current = requestAnimationFrame(draw);
    }

    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-[300px] h-[300px] md:w-[420px] md:h-[420px] lg:w-[500px] lg:h-[500px]"
    />
  );
}
