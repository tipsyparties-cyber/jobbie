"use client";

import { useActionState } from "react";
import { submitContactForm } from "@/app/actions/contact";

const initialState = { success: false, error: null as string | null };

const inputStyles = "w-full bg-transparent border-b border-ink/12 py-4 text-sm text-ink outline-none transition-all focus:border-ink/25 font-light uppercase tracking-wider";

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContactForm, initialState);

  if (state.success) {
    return (
      <div className="py-12">
        <h3 className="font-display text-3xl font-light">We&apos;ll be in touch soon.</h3>
        <p className="mt-4 text-ink/50 font-light">Good things incoming.</p>
      </div>
    );
  }

  return (
    <form action={formAction}>
      <input type="text" name="website" className="absolute -left-[9999px] opacity-0" tabIndex={-1} autoComplete="off" aria-hidden="true" />

      <div className="rounded-2xl border border-ink/10 bg-white/55 backdrop-blur-2xl p-8 md:p-10 shadow-[0_8px_32px_rgba(10,10,10,0.06),inset_0_1px_0_rgba(255,255,255,0.9)]">
        <div className="space-y-2">
          <input name="name" type="text" required className={inputStyles} placeholder="NAME" />
          <input name="email" type="email" required className={inputStyles} placeholder="EMAIL" />
          <input name="business" type="text" required className={inputStyles} placeholder="COMPANY" />
          <input name="painPoints" type="text" className={inputStyles} placeholder="DESCRIBE YOUR PROJECT" />
          <input name="budget" type="text" className={inputStyles} placeholder="BALLPARK BUDGET" />
        </div>

        {state.error && <p className="text-xs text-red-400 mt-4">{state.error}</p>}

        <button
          type="submit"
          disabled={pending}
          className={`mt-8 w-full rounded-full py-4 font-body text-sm tracking-wide uppercase border border-ink/12 text-ink hover:bg-white/60 transition-all duration-300 ${pending ? "opacity-50" : ""}`}
        >
          {pending ? "Sending..." : "Send ^"}
        </button>
      </div>
    </form>
  );
}
