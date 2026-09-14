"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/* ==================================================================== *
 *  The rotating line — spec T6, the Who it's for hero.
 *
 *  "Built for caterers." … "Built for class hosts." … ending on "you".
 *
 *  Ending on "you" is the whole device: the list is long enough that the
 *  reader starts wondering whether their own trade is in it, and then the
 *  answer arrives. So it stops there rather than looping — a list that
 *  keeps cycling past "you" throws the point away.
 *
 *  The word is inside one sentence that never changes, and the sentence
 *  is announced once with `aria-live="off"`: a live region re-reading
 *  "Built for DJs" every two seconds is the fastest way to make a page
 *  unusable with a screen reader. The full list is given as real text
 *  under it instead.
 * ==================================================================== */

export function RotatingLine({
  prefix,
  words,
  className = "",
}: {
  prefix: string;
  words: string[];
  className?: string;
}) {
  const still = useReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (still || i >= words.length - 1) return;
    const t = setTimeout(() => setI((n) => n + 1), 1400);
    return () => clearTimeout(t);
  }, [i, still, words.length]);

  /* Reduced motion gets the last word — the one the device is for. */
  const word = still ? words[words.length - 1] : words[i];

  return (
    <p className={className} aria-live="off">
      {prefix}{" "}
      <span className="hd-hl inline-block min-w-[4ch]">{word}</span>.
    </p>
  );
}
