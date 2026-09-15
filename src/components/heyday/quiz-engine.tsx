"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { HeydayLogo } from "@/components/heyday/heyday-logo";
import { Icon } from "@/components/heyday/icon";
import { Button } from "@/components/ui/button";
import { QUESTIONS, MAX_PER_ANSWER, band } from "@/lib/leak-check";
import { GROUPS, groupById } from "@/lib/groups";
import { featuresInGroup, featureHref } from "@/lib/heyday-features";
import { CTA } from "@/lib/site";
import { PAPER, ORANGE, INK, CREAM, LAVENDER } from "@/lib/palette";

/* ==================================================================== *
 *  QuizEngine — the leak check, template T14.
 *
 *  Three screens: the intro, one question at a time, then a score per
 *  group with the features that close each gap.
 *
 *  **Nothing leaves the browser.** No storage, no network, no email wall.
 *  That is the whole reason a free tool is worth building: a quiz that
 *  holds your result hostage for an address is an ad, and people can tell.
 *  The page says so twice, because saying it once is easy to miss.
 *
 *  The Heyday line across the top is the progress bar (A8) — sixteen
 *  segments, filling orange. Order matters here, so the line belongs.
 *
 *  Keyboard: the answers are a real radio group, the question heading
 *  takes focus on each step so a screen reader announces the new question
 *  rather than leaving the user at the top of the page, and Back does not
 *  lose an answer.
 * ==================================================================== */

type Phase = "intro" | "quiz" | "results";

export function QuizEngine() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [i, setI] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const headingRef = useRef<HTMLHeadingElement | null>(null);

  const q = QUESTIONS[i];
  const answered = answers[q?.id] !== undefined;

  /** One score per group, as a plain percentage of what was available. */
  const scores = useMemo(() => {
    return GROUPS.map((g) => {
      const qs = QUESTIONS.filter((x) => x.group === g.id);
      const got = qs.reduce((n, x) => n + (answers[x.id] ?? 0), 0);
      const max = qs.length * MAX_PER_ANSWER;
      const pct = max ? Math.round((got / max) * 100) : 0;
      return { group: g, pct, ...band(pct) };
    }).sort((a, b) => a.pct - b.pct);
  }, [answers]);

  function focusHeading() {
    requestAnimationFrame(() => headingRef.current?.focus());
  }

  function next() {
    if (i === QUESTIONS.length - 1) {
      setPhase("results");
      return;
    }
    setI(i + 1);
    focusHeading();
  }

  function back() {
    if (i === 0) {
      setPhase("intro");
      return;
    }
    setI(i - 1);
    focusHeading();
  }

  /* ---- Intro ---- */
  if (phase === "intro") {
    return (
      <div className="text-center">
        <div className="relative mx-auto my-7 flex max-w-[560px] items-center justify-center">
          <span
            aria-hidden
            className="absolute left-[6%] right-[6%] top-1/2 h-0.5 bg-ink/25"
          />
          {GROUPS.map((g) => (
            <span key={g.id} className="relative flex-1">
              <HeydayLogo size={56} colour={g.markColour} />
            </span>
          ))}
        </div>
        <Button
          onClick={() => {
            setPhase("quiz");
            focusHeading();
          }}
          variant="primary"
          arrow
        >
          Start the check
        </Button>
      </div>
    );
  }

  /* ---- Results ---- */
  if (phase === "results") {
    const worst = scores[0];
    return (
      <div>
        <p className="hd-label">your results</p>
        <h2 className="hd-h2">
          Here&rsquo;s where it&rsquo;s <span className="hd-hl">slipping</span>.
        </h2>
        <p className="hd-sub">
          Your weakest area is <b>{worst.group.name}</b>. {worst.line} Each
          card below links to the features that close that gap — all of them
          coming soon.
        </p>

        <div className="grid gap-[22px] lg:grid-cols-3">
          {scores.map((s) => {
            const dark = s.group.colour === INK;
            return (
              <div
                key={s.group.id}
                className="rounded-2xl border-2 border-ink p-[22px]"
                style={{
                  backgroundColor: s.group.ground,
                  color: dark ? CREAM : INK,
                  boxShadow: "11px 11px 0 0 rgba(10,10,10,0.08)",
                }}
              >
                <HeydayLogo size={52} colour={s.group.markColour} />
                <p className="mt-2.5 font-display text-[44px] font-extrabold leading-none tracking-[-0.03em]">
                  {s.pct}%
                </p>
                <b className="block font-display text-[19px] font-bold">
                  {s.group.name} · {s.label}
                </b>
                <p className="mt-1.5 text-[15px] opacity-75">{s.line}</p>
                <ul className="m-0 mt-2.5 list-none p-0">
                  {featuresInGroup(s.group.id)
                    .slice(0, 3)
                    .map((f) => (
                      <li key={f.slug} className="my-1.5">
                        <Link
                          href={featureHref(f.slug)}
                          className="flex items-center gap-2 font-display text-sm font-semibold"
                          style={{ color: "inherit" }}
                        >
                          <Icon
                            name={f.icon}
                            size={22}
                            ground={s.group.ground}
                          />
                          {f.name}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="mt-9 flex flex-wrap gap-2.5">
          <Button onClick={() => window.print()} variant="ghost">
            Print my results
          </Button>
          <Button
            onClick={() => {
              setAnswers({});
              setI(0);
              setPhase("intro");
            }}
            variant="ghost"
          >
            Start again
          </Button>
          <Button href={CTA.comingSoon.href} variant="primary" arrow>
            {CTA.comingSoon.label}
          </Button>
        </div>

        <p className="mt-8 font-mono text-xs text-ink/55">
          Nothing you answered was saved or sent. Closing this page loses it.
        </p>
      </div>
    );
  }

  /* ---- One question ---- */
  const group = groupById(q.group)!;
  return (
    <div>
      {/* The Heyday line as progress. */}
      <div className="mb-[26px] flex gap-1" aria-hidden>
        {QUESTIONS.map((x, n) => (
          <i
            key={x.id}
            className="h-[5px] flex-1 rounded-[5px]"
            style={{
              backgroundColor: n <= i ? ORANGE : "rgba(10,10,10,0.15)",
            }}
          />
        ))}
      </div>

      <div className="flex items-center gap-3.5">
        <HeydayLogo size={64} colour={group.markColour} />
        <p className="hd-label !mb-0">{group.name.toLowerCase()}</p>
      </div>

      <h2
        ref={headingRef}
        tabIndex={-1}
        className="mt-[18px] font-display font-bold leading-tight tracking-[-0.02em] outline-none"
        style={{ fontSize: "clamp(28px, 3.4vw, 42px)" }}
      >
        <span className="sr-only">
          Question {i + 1} of {QUESTIONS.length}.{" "}
        </span>
        {q.q}
      </h2>

      <div className="my-[22px] grid gap-3" role="radiogroup" aria-label={q.q}>
        {q.answers.map((a, n) => {
          const on = answers[q.id] === n;
          return (
            <label
              key={a}
              className="flex cursor-pointer items-center gap-3 rounded-2xl border-2 border-ink px-[18px] py-4 font-display text-[17px] font-semibold transition-[border-radius] duration-200 hover:rounded-[28px]"
              style={{
                backgroundColor: on ? LAVENDER : PAPER,
                boxShadow: "6px 6px 0 0 rgba(10,10,10,0.08)",
              }}
            >
              <input
                type="radio"
                name={q.id}
                checked={on}
                onChange={() => setAnswers({ ...answers, [q.id]: n })}
                className="h-5 w-5 flex-none accent-ink"
              />
              {a}
            </label>
          );
        })}
      </div>

      <div className="flex gap-2.5">
        <Button onClick={back} variant="ghost">
          Back
        </Button>
        <Button onClick={next} variant="primary" disabled={!answered} arrow>
          {i === QUESTIONS.length - 1 ? "See my results" : "Next"}
        </Button>
      </div>

      <p className="mt-6 font-mono text-xs text-ink/55">
        Question {i + 1} of {QUESTIONS.length}. Nothing is saved or sent.
      </p>
    </div>
  );
}
