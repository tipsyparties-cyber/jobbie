"use client";

import { useMemo, useState } from "react";
import { Panel } from "@/components/ui/surfaces";
import { Button } from "@/components/ui/button";
import { CREAM } from "@/lib/palette";

/* ==================================================================== *
 *  The quote template — template T13.
 *
 *  Fill in the details, get a quote you can copy straight into an email.
 *  No email wall, nothing saved, nothing sent.
 *
 *  The copy-to-clipboard is the whole point: a "template" you have to
 *  retype is a picture of a template. The fallback is that the text is
 *  in a real, selectable textarea, so it works with the clipboard API
 *  blocked or unavailable.
 *
 *  The wording of the output is where the advice lives — the deposit,
 *  the date the balance falls due, how long the price holds, and what
 *  happens on a cancellation. Those four lines are what stop the
 *  arguments, and most quotes leave all four out.
 * ==================================================================== */

export function QuoteBuilder() {
  const [business, setBusiness] = useState("");
  const [client, setClient] = useState("");
  const [what, setWhat] = useState("");
  const [date, setDate] = useState("");
  const [people, setPeople] = useState("");
  const [total, setTotal] = useState("");
  const [deposit, setDeposit] = useState("");
  const [includes, setIncludes] = useState("");
  const [excludes, setExcludes] = useState("");
  const [holds, setHolds] = useState("14 days");
  const [copied, setCopied] = useState(false);

  const quote = useMemo(() => {
    const b = business || "[your business]";
    const c = client || "[client name]";
    const inc = (includes || "[what's included]")
      .split("\n")
      .filter(Boolean)
      .map((l) => `  · ${l.trim()}`)
      .join("\n");
    const exc = (excludes || "[what isn't]")
      .split("\n")
      .filter(Boolean)
      .map((l) => `  · ${l.trim()}`)
      .join("\n");

    return `Hi ${c},

Thanks for getting in touch. Here's your quote for ${what || "[what they asked for]"} on ${date || "[date]"}${people ? ` for ${people} people` : ""}.

WHAT'S INCLUDED
${inc}

WHAT ISN'T
${exc}

THE PRICE
  Total                ${total || "[total]"}
  To book (deposit)    ${deposit || "[deposit]"}
  Balance due          7 days before ${date || "[date]"}

This price holds for ${holds}. After that I'd need to check the date is still free.

If you need to cancel, the deposit covers the date being held. Anything you've paid beyond that comes back to you.

Any questions, just reply to this.

${b}`;
  }, [business, client, what, date, people, total, deposit, includes, excludes, holds]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(quote);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      /* The clipboard can be blocked. The text is in a real textarea, so
         selecting it by hand still works — say so rather than failing
         silently. */
      setCopied(false);
    }
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="grid gap-3.5" onSubmit={(e) => e.preventDefault()}>
        <Row2>
          <Field label="Your business" value={business} onChange={setBusiness} />
          <Field label="Client's name" value={client} onChange={setClient} />
        </Row2>
        <Field
          label="What they asked for"
          value={what}
          onChange={setWhat}
          hint="“a mobile bar for a 40th”, “a pottery class for a hen party”"
        />
        <Row2>
          <Field label="Date" value={date} onChange={setDate} hint="Sat 14 June" />
          <Field label="How many people" value={people} onChange={setPeople} />
        </Row2>
        <Row2>
          <Field label="Total" value={total} onChange={setTotal} hint="$1,450" />
          <Field label="Deposit to book" value={deposit} onChange={setDeposit} hint="$450" />
        </Row2>
        <Field
          label="What's included"
          value={includes}
          onChange={setIncludes}
          rows={4}
          hint="one per line"
        />
        <Field
          label="What isn't"
          value={excludes}
          onChange={setExcludes}
          rows={3}
          hint="one per line — this is the part that stops the arguments"
        />
        <Field label="How long the price holds" value={holds} onChange={setHolds} />
      </form>

      <Panel className="h-fit !p-7">
        <p className="hd-label">your quote</p>
        <label className="sr-only" htmlFor="quote-output">
          The finished quote, ready to copy
        </label>
        <textarea
          id="quote-output"
          readOnly
          value={quote}
          rows={22}
          className="w-full resize-y rounded-xl border border-ink/20 p-3.5 font-mono text-[13px] leading-[1.7] text-ink"
          style={{ backgroundColor: CREAM }}
        />
        <div className="mt-3.5 flex flex-wrap items-center gap-3">
          <Button onClick={copy} variant="primary">
            {copied ? "Copied" : "Copy the quote"}
          </Button>
          <span className="font-mono text-xs text-ink/55">
            Or select it and copy by hand.
          </span>
        </div>
        <p className="mt-4 font-mono text-xs text-ink/55">
          Nothing you type here is saved or sent.
        </p>
      </Panel>
    </div>
  );
}

function Row2({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-3 sm:grid-cols-2">{children}</div>;
}

function Field({
  label,
  value,
  onChange,
  hint,
  rows,
}: {
  label: string;
  value: string;
  onChange: (s: string) => void;
  hint?: string;
  rows?: number;
}) {
  const cls =
    "rounded-lg border border-ink bg-paper px-3.5 font-body text-base text-ink focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-ink";
  return (
    <label className="grid gap-1.5 font-display text-sm font-semibold">
      {label}
      {rows ? (
        <textarea
          rows={rows}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${cls} py-3`}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${cls} h-[52px]`}
        />
      )}
      {hint ? (
        <span className="font-mono text-xs font-medium text-ink/55">{hint}</span>
      ) : null}
    </label>
  );
}
