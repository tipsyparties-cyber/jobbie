import SHAPES from "./heyday-shapes.json";

/* ==================================================================== *
 *  The Heyday mark, in motion — design brief A11.
 *
 *  A port of `docs/heyday/assets/heyday-mark-motion.js`. The maths is Jem's
 *  and is carried across unchanged: the same eight strokes and one core,
 *  seventeen points per stroke on a 100-unit square, morphing point to
 *  point while the colours blend.
 *
 *  What changed in the port, and only this:
 *  - an ES module with types, instead of an IIFE hung off `window`;
 *  - the shape data lives in `heyday-shapes.json` rather than inline, so
 *    the engine is readable;
 *  - `var self = this` is gone, because arrow functions close over `this`
 *    properly and the alias is what tripped the linter;
 *  - a `destroy()`, because React mounts and unmounts and the original
 *    never had to.
 *
 *  Deliberately not framer-motion. The morph interpolates 8 × 17 points and
 *  rewrites a path string every frame; that is a job for one rAF loop over
 *  every mark on the page, which is what this is.
 * ==================================================================== */

export type ShapeName = keyof typeof SHAPES;

type RawShape = {
  r: number[][][];
  h: number[];
  c: number[];
  rc: string;
  cc: string;
  spin?: number;
  inf?: number;
};

const S = SHAPES as unknown as Record<string, RawShape>;

const NS = "http://www.w3.org/2000/svg";
const DEG = Math.PI / 180;
/** Arrowhead length. */
const H = 11;
/** Arrowhead angle. */
const HA = 40 * DEG;
/** Points per stroke, zero-indexed. */
const N = 16;

const easeInOut = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

const reducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

type RGB = [number, number, number];

const rgb = (h: string): RGB => [
  parseInt(h.slice(1, 3), 16),
  parseInt(h.slice(3, 5), 16),
  parseInt(h.slice(5, 7), 16),
];

const mix = (a: RGB, b: RGB, t: number): RGB => [
  a[0] + (b[0] - a[0]) * t,
  a[1] + (b[1] - a[1]) * t,
  a[2] + (b[2] - a[2]) * t,
];

const css = (c: RGB) =>
  `rgb(${Math.round(c[0])},${Math.round(c[1])},${Math.round(c[2])})`;

/** The Infinity shape is generated rather than stored: the arrows flow along
 *  a lemniscate, so its points depend on the phase. */
function infRays(phase: number): number[][][] {
  const out: number[][][] = [];
  for (let i = 0; i < 8; i++) {
    const ray: number[][] = [];
    for (let k = 0; k <= N; k++) {
      const ph = (i * Math.PI) / 4 + (0.7 * k) / N + phase;
      const sn = Math.sin(ph);
      const den = 1 + sn * sn;
      ray.push([50 + (44 * Math.cos(ph)) / den, 50 + (66 * sn * Math.cos(ph)) / den]);
    }
    out.push(ray);
  }
  return out;
}

type Geom = { r: number[][][]; h: number[]; c: number[]; rc: RGB; cc: RGB };

/** The sun is always one colour, and takes the one that suits where it sits. */
function geomOf(name: string, phase: number, sun?: string): Geom {
  const s = S[name];
  const rc = name === "sun" && sun ? sun : s.rc;
  const cc = name === "sun" && sun ? sun : s.cc;
  return { r: s.inf ? infRays(phase) : s.r, h: s.h, c: s.c, rc: rgb(rc), cc: rgb(cc) };
}

type Tween = {
  from: Record<string, number>;
  target: Record<string, number>;
  t0: number;
  dur: number;
  resolve: () => void;
};

const marks: Mark[] = [];
let last = 0;
let running = false;

function frame(now: number) {
  const dt = Math.min(0.05, (now - (last || now)) / 1000);
  last = now;
  let busy = false;

  for (const m of marks) {
    const s = m.state;
    if (!m.tweens.length && !(m.visible && (s.spin || s.flow))) continue;
    busy = true;
    s.rot += s.spin * dt;
    s.phase += s.flow * dt;
    m.tweens = m.tweens.filter((tw) => {
      const p = Math.min(1, (now - tw.t0) / tw.dur);
      const e = easeInOut(p);
      for (const k in tw.target) {
        s[k as keyof typeof s] = tw.from[k] + (tw.target[k] - tw.from[k]) * e;
      }
      if (p >= 1) {
        tw.resolve();
        return false;
      }
      return true;
    });
    m.render();
  }

  if (busy) requestAnimationFrame(frame);
  else {
    running = false;
    last = 0;
  }
}

function loop() {
  if (!running) {
    running = true;
    requestAnimationFrame(frame);
  }
}

export class Mark {
  svg: SVGSVGElement;
  wrap: HTMLElement | null;
  name: string;
  visible = true;
  tweens: Tween[] = [];
  sun?: string;
  state = { t: 1, rot: 0, spin: 0, phase: 0, flow: 0, boost: 0 };
  from: Geom;
  private paths: SVGPathElement[] = [];
  private core: SVGCircleElement;

  constructor(
    svg: SVGSVGElement,
    wrap: HTMLElement | null,
    start: string,
    opts?: { sun?: string }
  ) {
    this.svg = svg;
    this.wrap = wrap;
    this.name = start;
    this.sun = opts?.sun;
    this.from = geomOf(start, 0, this.sun);

    svg.setAttribute("viewBox", "0 0 100 100");
    for (let i = 0; i < 8; i++) {
      const p = document.createElementNS(NS, "path");
      p.setAttribute("fill", "none");
      p.setAttribute("stroke-width", "8");
      p.setAttribute("stroke-linecap", "round");
      p.setAttribute("stroke-linejoin", "round");
      svg.appendChild(p);
      this.paths.push(p);
    }
    this.core = document.createElementNS(NS, "circle");
    svg.appendChild(this.core);

    marks.push(this);
    this.render();
    loop();
  }

  /** The geometry as it stands this frame: partway between `from` and the
   *  named shape, rotated by however far the spin has got. */
  private current(): Geom {
    const s = this.state;
    const A = this.from;
    const B = geomOf(this.name, s.phase, this.sun);
    const e = s.t;
    const cs = Math.cos(s.rot * DEG);
    const sn = Math.sin(s.rot * DEG);
    const rot = (x: number, y: number): number[] => {
      const dx = x - 50;
      const dy = y - 50;
      return [50 + dx * cs - dy * sn, 50 + dx * sn + dy * cs];
    };

    const r: number[][][] = [];
    const h: number[] = [];
    for (let i = 0; i < 8; i++) {
      const ray: number[][] = [];
      for (let k = 0; k <= N; k++) {
        const a = A.r[i][k];
        const b = B.r[i][k];
        ray.push(rot(a[0] + (b[0] - a[0]) * e, a[1] + (b[1] - a[1]) * e));
      }
      r.push(ray);
      h.push(A.h[i] + (B.h[i] - A.h[i]) * e);
    }
    const c = rot(A.c[0] + (B.c[0] - A.c[0]) * e, A.c[1] + (B.c[1] - A.c[1]) * e);
    return {
      r,
      h,
      c: [c[0], c[1], A.c[2] + (B.c[2] - A.c[2]) * e],
      rc: mix(A.rc, B.rc, e),
      cc: mix(A.cc, B.cc, e),
    };
  }

  render() {
    const g = this.current();
    const col = css(g.rc);

    for (let i = 0; i < 8; i++) {
      const pts = g.r[i];
      const tip = pts[N];
      const pr = pts[N - 2];
      let dx = tip[0] - pr[0];
      let dy = tip[1] - pr[1];
      const L = Math.hypot(dx, dy) || 1;
      dx /= L;
      dy /= L;
      const hh = H * g.h[i];

      let d = "M" + pts.map((p) => `${p[0].toFixed(2)} ${p[1].toFixed(2)}`).join("L");
      // Any stroke that is still a ray keeps its arrowhead; one that has
      // tucked into the core has h near zero and loses it.
      if (hh > 0.3) {
        const arm = (sg: number) => {
          const c = Math.cos(sg * HA);
          const si = Math.sin(sg * HA);
          return `${(tip[0] - (dx * c - dy * si) * hh).toFixed(2)} ${(
            tip[1] -
            (dx * si + dy * c) * hh
          ).toFixed(2)}`;
        };
        d += `M${arm(1)}L${tip[0].toFixed(2)} ${tip[1].toFixed(2)}L${arm(-1)}`;
      }
      this.paths[i].setAttribute("d", d);
      this.paths[i].setAttribute("stroke", col);
    }

    // `boost` swells the core to radius 46 so the gaps between the arrows
    // close — that is what makes the more-info grow read as the section
    // filling with colour rather than as a spider expanding (A12).
    const b = this.state.boost;
    const r = g.c[2] + (46 - g.c[2]) * b;
    this.core.setAttribute("cx", g.c[0].toFixed(2));
    this.core.setAttribute("cy", g.c[1].toFixed(2));
    this.core.setAttribute("r", Math.max(0, r).toFixed(2));
    this.core.setAttribute("fill", css(b > 0 ? g.rc : g.cc));
  }

  to(target: Partial<typeof this.state>, dur?: number): Promise<void> {
    const from: Record<string, number> = {};
    for (const k in target) from[k] = this.state[k as keyof typeof this.state];

    if (reducedMotion() || !dur) {
      Object.assign(this.state, target);
      this.render();
      return Promise.resolve();
    }
    return new Promise<void>((resolve) => {
      this.tweens.push({
        from,
        target: target as Record<string, number>,
        t0: performance.now(),
        dur,
        resolve,
      });
      loop();
    });
  }

  /** Morph into a named shape. Spin and flow restart on arrival, for the
   *  shapes that have them (Loop spins, Infinity flows). */
  morph(name: string, dur = 900): Promise<void> {
    this.from = this.current();
    this.state.rot = 0;
    this.state.spin = 0;
    this.state.flow = 0;
    this.state.phase = 0;
    this.state.t = 0;
    this.name = name;

    return this.to({ t: 1 }, dur).then(() => {
      const sh = S[name];
      if (!reducedMotion() && sh.spin) this.state.spin = 60;
      if (!reducedMotion() && sh.inf) this.state.flow = 0.9;
      loop();
    });
  }

  stop() {
    this.tweens.forEach((t) => t.resolve());
    this.tweens = [];
    this.state.spin = 0;
    this.state.flow = 0;
  }

  /** 0.7s: hops up 12%, squashes on landing, settles (A11). */
  bounce() {
    if (reducedMotion() || !this.wrap?.animate) return;
    this.wrap.animate(
      [
        { transform: "translateY(0) scale(1,1)" },
        { transform: "translateY(-12%) scale(.95,1.05)", offset: 0.35 },
        { transform: "translateY(0) scale(1.08,.92)", offset: 0.62 },
        { transform: "translateY(-3%) scale(.98,1.02)", offset: 0.8 },
        { transform: "translateY(0) scale(1,1)" },
      ],
      { duration: 700, easing: "ease-out" }
    );
  }

  /** React unmounts; the original never had to. Without this every mark
   *  ever mounted stays in the rAF loop for the life of the page. */
  destroy() {
    this.stop();
    const i = marks.indexOf(this);
    if (i >= 0) marks.splice(i, 1);
  }
}

export const SHAPE_NAMES = Object.keys(S) as ShapeName[];
export { reducedMotion };
