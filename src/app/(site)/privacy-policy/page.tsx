import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPolicyPage() {
  return (
    <div className="pt-32 pb-20">
      <div className="prose-upup mx-auto max-w-3xl px-6">
        <h1 className="font-display text-4xl font-light md:text-5xl">Privacy Policy</h1>
        <p className="mt-4 text-sm text-ink/50">Last updated: March 2026</p>
        <h2>What we collect</h2>
        <p>When you submit our contact form, we collect your name, email address, phone number (if provided), and the information you share about your business. We use this solely to respond to your enquiry.</p>
        <h2>How we use your data</h2>
        <p>Your form submissions are sent via email using Resend and are not stored in a database. We use your contact details only to respond to your enquiry and discuss our services.</p>
        <h2>Analytics</h2>
        <p>We use Vercel Analytics to understand how visitors use our site. This is privacy-friendly, first-party analytics that does not use cookies or track individuals across sites.</p>
        <h2>Cookies</h2>
        <p>This website does not use tracking cookies. Essential cookies may be used for site functionality.</p>
        <h2>Third parties</h2>
        <p>We use Vercel (hosting), Resend (email delivery), and Google Fonts (typography). These services may process data as described in their respective privacy policies.</p>
        <h2>Your rights</h2>
        <p>You can request deletion of any data we hold about you by emailing hello@heyday.app.</p>
        <h2>Contact</h2>
        <p>For any privacy-related questions, email hello@heyday.app.</p>
      </div>
    </div>
  );
}
