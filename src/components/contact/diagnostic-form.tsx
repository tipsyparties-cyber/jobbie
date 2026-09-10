"use client";

import { useActionState } from "react";
import { submitContactForm } from "@/app/actions/contact";
import { Button } from "@/components/ui/button";

const initialState = { success: false, error: null as string | null };

const inputStyles = "mt-2 w-full rounded-xl border border-light-grey bg-cream px-4 py-3 text-sm shadow-neo-inset outline-none transition-shadow focus:border-accent/30 focus:ring-1 focus:ring-accent/20";

export function DiagnosticForm() {
  const [state, formAction, pending] = useActionState(submitContactForm, initialState);

  if (state.success) {
    return (
      <div className="rounded-2xl bg-accent/5 p-8 text-center">
        <h3 className="font-display text-2xl font-light">Thanks for reaching out</h3>
        <p className="mt-4 text-ink/50">
          We&apos;ve received your details and will be in touch shortly to discuss what&apos;s possible for your business.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-6">
      <input type="text" name="website" className="absolute -left-[9999px] opacity-0" tabIndex={-1} autoComplete="off" aria-hidden="true" />

      <div>
        <label htmlFor="business" className="block text-sm font-medium text-ink">
          What&apos;s your business / industry? <span className="text-accent">*</span>
        </label>
        <input id="business" name="business" type="text" required className={inputStyles} placeholder="e.g. Mobile bar hire, aesthetics clinic, construction..." />
      </div>

      <div>
        <label htmlFor="painPoints" className="block text-sm font-medium text-ink">
          What are your biggest pain points? <span className="text-accent">*</span>
        </label>
        <textarea id="painPoints" name="painPoints" required rows={3} className={`${inputStyles} resize-none`} placeholder="What's costing you the most time, money, or stress?" />
      </div>

      <div>
        <label htmlFor="goals" className="block text-sm font-medium text-ink">
          What are your goals for the next 12 months? <span className="text-accent">*</span>
        </label>
        <textarea id="goals" name="goals" required rows={3} className={`${inputStyles} resize-none`} placeholder="Where do you want the business to be in a year?" />
      </div>

      <div>
        <label htmlFor="timeWasters" className="block text-sm font-medium text-ink">
          What do you spend most of your time doing that you don&apos;t want to do?
        </label>
        <textarea id="timeWasters" name="timeWasters" rows={3} className={`${inputStyles} resize-none`} placeholder="The tasks that drain you — admin, emails, scheduling, chasing payments..." />
      </div>

      <div>
        <label htmlFor="budget" className="block text-sm font-medium text-ink">Budget range (optional)</label>
        <select id="budget" name="budget" className={inputStyles}>
          <option value="">Prefer not to say</option>
          <option value="under-5k">Under &pound;5,000</option>
          <option value="5k-15k">&pound;5,000 - &pound;15,000</option>
          <option value="15k-30k">&pound;15,000 - &pound;30,000</option>
          <option value="30k-plus">&pound;30,000+</option>
        </select>
      </div>

      <hr className="border-light-grey" />

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-ink">Your name <span className="text-accent">*</span></label>
          <input id="name" name="name" type="text" required className={inputStyles} />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-ink">Email <span className="text-accent">*</span></label>
          <input id="email" name="email" type="email" required className={inputStyles} />
        </div>
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-ink">Phone (optional)</label>
        <input id="phone" name="phone" type="tel" className={inputStyles} />
      </div>

      {state.error && <p className="text-sm text-red-500">{state.error}</p>}

      <Button type="submit" className={pending ? "opacity-50 cursor-not-allowed" : ""}>
        {pending ? "Sending..." : "Send enquiry"}
      </Button>
    </form>
  );
}
