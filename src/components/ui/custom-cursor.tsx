"use client";

import { useEffect, useState } from "react";

export function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    const over = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [role='button']")) setHovering(true);
    };
    const out = () => setHovering(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    window.addEventListener("mouseout", out);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("mouseout", out);
    };
  }, []);

  return (
    <div
      className="fixed pointer-events-none z-[9999] rounded-full bg-ink transition-transform duration-150 ease-out"
      style={{
        left: pos.x,
        top: pos.y,
        width: hovering ? 40 : 12,
        height: hovering ? 40 : 12,
        transform: "translate(-50%, -50%)",
        opacity: hovering ? 0.3 : 0.8,
      }}
    />
  );
}
