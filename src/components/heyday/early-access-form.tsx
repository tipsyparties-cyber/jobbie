"use client";

import { useState } from "react";
import Link from "next/link";
import { HeydayMark } from "@/components/heyday/heyday-mark";
import { Button } from "@/components/ui/button";
import { KINDS } from "@/lib/who-its-for";
import { TBC } from "@/lib/site";
import { BLUE } from "@/lib/palette";

/* ==================================================================== *
 *  EarlyAccessForm — spec T16.
 *
 *  **It stores nothing and sends nothing.** That is not an oversight, it
 *  is rule 8 of the brief: nothing is stored or sent until the privacy
 *  notice and consent wording are agreed. So the submit button is
 *  disabled and says so, in the open, above the button rather than in
 *  small print under it.
 *
 *  Building the form anyway is the right call: the fields, the labels,
 *  the validation and the success state are all decided and reviewable
 *  now, and the day the wording is signed off this becomes live by having
 *  a handler added. What would be wrong is a form that looks like it
 *  works, quietly drops what you typed, and thanks you for it.
 *
 *  "Start free trial" points here from everywhere on the site, because
 *  there is no trial to start.
 * ==================================================================== */

export function EarlyAccessForm() {
  /* A preview of the success state, so Jem can see it without the form
     being live. Labelled as a preview — it is not a real submission. */
  const [preview, setPreview] = useState(false);

  if (preview) {
    return (
      <div className="max-w-[520px]">
        <div className="mb-6">
          <HeydayMark size={72} sun={BLUE} bounceOnLoad />
        </div>
        <h2 className="hd-h2">
          You&rsquo;re on the <span className="hd-hl">list</span>.
        </h2>
        <p className="hd-sub">We&rsquo;ll email you when it&rsquo;s your turn.</p>
        <div className="flex flex-wrap gap-3">
          <Button href="/tools/leak-check" variant="ghost">
            Try the leak check
          </Button>
          <Button href="/" variant="ghost">
            Back to home
          </Button>
        </div>
        <p className="mt-8 font-mono text-xs text-ink/55">
          This is a preview of the success state. Nothing was submitted.{" "}
          <button
            type="button"
            onClick={() => setPreview(false)}
            className="cursor-pointer underline underline-offset-2"
          >
            Back to the form
          </button>
        </p>
      </div>
    );
  }

  return (
    <form
      className="grid max-w-[520px] gap-3.5"
      onSubmit={(e) => e.preventDefault()}
    >
      <Field label="First name" name="firstName" autoComplete="given-name" />
      <Field label="Email" name="email" type="email" autoComplete="email" />

      <label className="grid gap-1.5 font-display text-sm font-semibold">
        What kind of business is it?
        <select
          name="kind"
          defaultValue=""
          className="h-[52px] rounded-lg border border-ink bg-paper px-3.5 font-body text-base text-ink focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-ink"
        >
          <option value="" disabled>
            Choose one
          </option>
          {KINDS.map((k) => (
            <option key={k.slug} value={k.slug}>
              {k.name}
            </option>
          ))}
          <option value="other">Something else</option>
        </select>
      </label>

      <label className="grid gap-1.5 font-display text-sm font-semibold">
        What do you sell?
        <textarea
          name="sells"
          rows={3}
          placeholder="Bar hire for parties, and cocktail classes"
          className="rounded-lg border border-ink bg-paper px-3.5 py-3 font-body text-base text-ink focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-ink"
        />
      </label>

      {/* Said above the button, not under it. Somebody who fills this in
          deserves to know before they press, not after. */}
      <p className="m-0 font-mono text-xs leading-relaxed text-ink/55">
        Sign-up opens soon. Nothing is stored or sent until the privacy
        notice is agreed — not even to us. {TBC.confirm}
      </p>

      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" variant="primary" disabled arrow>
          Join early access
        </Button>
        <Link
          href="/contact"
          className="font-display text-sm font-semibold underline underline-offset-[3px]"
        >
          Talk to a person instead →
        </Link>
      </div>

      <p className="mt-6 font-mono text-xs text-ink/45">
        <button
          type="button"
          onClick={() => setPreview(true)}
          className="cursor-pointer underline underline-offset-2"
        >
          Preview the success state
        </button>{" "}
        — for review, not a real submission.
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <label className="grid gap-1.5 font-display text-sm font-semibold">
      {label}
      <input
        type={type}
        name={name}
        autoComplete={autoComplete}
        className="h-[52px] rounded-lg border border-ink bg-paper px-3.5 font-body text-base text-ink focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-ink"
      />
    </label>
  );
}
