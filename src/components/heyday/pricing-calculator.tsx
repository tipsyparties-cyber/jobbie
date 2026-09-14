"use client";

import { useMemo, useState } from "react";
import { Panel } from "@/components/ui/surfaces";
import { Button } from "@/components/ui/button";
import { CREAM, INK } from "@/lib/palette";

/* ==================================================================== *
 *  The class and event pricing calculator — template T13.
 *
 *  Jobber's free tools have no email wall, and that is the part worth
 *  copying. This one works in full for somebody who never signs up.
 *
 *  **Nothing leaves the browser.** No network calls, no storage. Which is
 *  why the honest answer to "is my data safe?" is that there is no data.
 *
 *  The maths is shown rather than asserted. A calculator that returns a
 *  number you cannot check is worth nothing to someone deciding whether
 *  to trust it, and the working IS the advice: most people setting a
 *  price leave out their own time, the marketplace's cut, or the card
 *  fee, and seeing the line items is what makes that land.
 *
 *  Every default is an example, labelled as one. None of it is a
 *  recommendation, and the FAQ says the tool is not financial advice.
 * ==================================================================== */

type Mode = "class" | "service";

export function PricingCalculator() {
  const [mode, setMode] = useState<Mode>("class");
  const [people, setPeople] = useState(12);
  const [hours, setHours] = useState(2);
  const [setupHours, setSetupHours] = useState(1);
  const [staff, setStaff] = useState(1);
  const [payRate, setPayRate] = useState(18);
  const [materials, setMaterials] = useState(9);
  const [fixed, setFixed] = useState(120);
  const [miles, setMiles] = useState(20);
  const [perMile, setPerMile] = useState(0.7);
  const [commission, setCommission] = useState(0);
  const [cardFee, setCardFee] = useState(2.9);
  const [margin, setMargin] = useState(30);
  const [shown, setShown] = useState(false);

  const sums = useMemo(() => {
    const labourHours = (hours + setupHours) * staff;
    const labour = labourHours * payRate;
    const mats = materials * people;
    const travel = miles * perMile;
    const costs = labour + mats + fixed + travel;

    /* Margin, commission and the card fee all come off the PRICE, not the
       cost, so they have to be solved for together. Adding 30% to the cost
       and then losing 2.9% of the result is the mistake this tool exists
       to stop. */
    const takenPct = (margin + commission + cardFee) / 100;
    const price = takenPct >= 1 ? Infinity : costs / (1 - takenPct);
    const profit = price - costs - price * ((commission + cardFee) / 100);

    return {
      labour,
      labourHours,
      mats,
      travel,
      costs,
      price,
      profit,
      perPerson: people ? price / people : 0,
      impossible: takenPct >= 1,
    };
  }, [
    hours, setupHours, staff, payRate, materials, people, fixed, miles,
    perMile, margin, commission, cardFee,
  ]);

  const money = (n: number) =>
    Number.isFinite(n)
      ? `$${n.toLocaleString("en-US", { maximumFractionDigits: 0 })}`
      : "—";

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
      <form
        className="grid gap-3.5"
        onSubmit={(e) => {
          e.preventDefault();
          setShown(true);
        }}
      >
        <fieldset className="m-0 grid gap-2.5 rounded-xl border border-ink/25 px-3.5 py-3">
          <legend className="px-1.5 font-display text-sm font-semibold">
            What are you pricing?
          </legend>
          <div className="inline-flex flex-wrap overflow-hidden rounded-[10px] border border-ink">
            {(
              [
                ["class", "A class or experience (per seat)"],
                ["service", "A service at an event (per booking)"],
              ] as [Mode, string][]
            ).map(([m, label]) => (
              <button
                key={m}
                type="button"
                aria-pressed={mode === m}
                onClick={() => setMode(m)}
                className="cursor-pointer border-0 px-3.5 py-2.5 font-display text-sm font-semibold"
                style={{
                  backgroundColor: mode === m ? INK : "#FBF9F6",
                  color: mode === m ? CREAM : INK,
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </fieldset>

        <Row2>
          <Field
            label={mode === "class" ? "How many seats?" : "How many guests?"}
            value={people}
            onChange={setPeople}
            hint="example"
          />
          <Field label="How long? (hours)" value={hours} onChange={setHours} hint="example" />
        </Row2>

        <Row2>
          <Field
            label="Setup and pack-down (hours)"
            value={setupHours}
            onChange={setSetupHours}
            hint="example"
          />
          <Field label="People working" value={staff} onChange={setStaff} />
        </Row2>

        <Row2>
          <Field
            label="Hourly pay ($)"
            value={payRate}
            onChange={setPayRate}
            hint="including your own time"
          />
          <Field
            label="Materials per person ($)"
            value={materials}
            onChange={setMaterials}
            hint="ingredients, clay, flowers, drinks"
          />
        </Row2>

        <Field
          label="Fixed costs for the booking ($)"
          value={fixed}
          onChange={setFixed}
          hint="venue hire, equipment hire, kit"
        />

        <Row2>
          <Field label="Travel (miles)" value={miles} onChange={setMiles} />
          <Field
            label="Cost per mile ($)"
            value={perMile}
            onChange={setPerMile}
            step={0.05}
            hint="example rate; set your own"
          />
        </Row2>

        <Row2>
          <Field
            label="Marketplace commission (%)"
            value={commission}
            onChange={setCommission}
            hint="marketplaces often take a share. Check yours"
          />
          <Field
            label="Card fees (%)"
            value={cardFee}
            onChange={setCardFee}
            step={0.1}
            hint="example; use your provider’s rate"
          />
        </Row2>

        <Field
          label="The profit you want (% of the price)"
          value={margin}
          onChange={setMargin}
          hint="example"
        />

        <div className="mt-2 flex flex-wrap gap-2.5">
          <Button type="submit" variant="primary" arrow>
            Work out my price
          </Button>
          <Button
            variant="ghost"
            onClick={() => {
              setShown(false);
              setPeople(12); setHours(2); setSetupHours(1); setStaff(1);
              setPayRate(18); setMaterials(9); setFixed(120); setMiles(20);
              setPerMile(0.7); setCommission(0); setCardFee(2.9); setMargin(30);
            }}
          >
            Start again
          </Button>
        </div>
      </form>

      {/* The result, and the working. */}
      <Panel className="sticky top-24 h-fit !p-7" aria-live="polite">
        <p className="hd-label">your price</p>
        {sums.impossible ? (
          <p className="m-0 text-lg">
            Your margin, commission and card fee add up to 100% or more of
            the price, so there is no price that works. Lower one of them.
          </p>
        ) : (
          <>
            <p className="m-0">Charge about</p>
            <p className="my-2 font-display font-extrabold leading-none tracking-[-0.03em]" style={{ fontSize: "clamp(44px, 5vw, 68px)" }}>
              {shown ? money(sums.price) : "—"}
            </p>
            <p className="m-0 text-ink/65">
              {shown ? (
                <>
                  {money(sums.perPerson)} a head · {money(sums.profit)} profit
                </>
              ) : (
                "Fill in your costs and press the button."
              )}
            </p>

            {shown ? (
              <pre
                className="m-0 mt-4 whitespace-pre-wrap rounded-xl px-4 py-3.5 font-mono text-[13px] leading-[1.7]"
                style={{ backgroundColor: CREAM }}
              >
{`People working      ${staff} × ${sums.labourHours / staff} hrs × $${payRate}  = ${money(sums.labour)}
Materials           ${people} × $${materials}            = ${money(sums.mats)}
Fixed costs                                = ${money(fixed)}
Travel              ${miles} mi × $${perMile}          = ${money(sums.travel)}
                                             ─────────
Your costs                                 = ${money(sums.costs)}

Then the price has to cover ${margin}% profit,
${commission}% commission and ${cardFee}% card fees —
which come off the PRICE, not the costs.

Price                                      = ${money(sums.price)}`}
              </pre>
            ) : null}
          </>
        )}

        <p className="mt-4 font-mono text-xs text-ink/55">
          Nothing you type here is saved or sent. It stays on this page and
          disappears when you leave.
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
  step = 1,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
  hint?: string;
  step?: number;
}) {
  return (
    <label className="grid gap-1.5 font-display text-sm font-semibold">
      {label}
      <input
        type="number"
        inputMode="decimal"
        min={0}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value) || 0)}
        className="h-[52px] rounded-lg border border-ink bg-paper px-3.5 font-body text-base text-ink focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-ink"
      />
      {hint ? (
        <span className="font-mono text-xs font-medium text-ink/55">{hint}</span>
      ) : null}
    </label>
  );
}
