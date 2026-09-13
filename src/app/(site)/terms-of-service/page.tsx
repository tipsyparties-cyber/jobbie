import type { Metadata } from "next";

export const metadata: Metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <div className="pt-32 pb-20">
      <div className="prose-upup mx-auto max-w-3xl px-6">
        <h1 className="font-display text-4xl font-light md:text-5xl">Terms of Service</h1>
        <p className="mt-4 text-sm text-ink/50">Last updated: March 2026</p>
        <h2>Use of this website</h2>
        <p>This website is operated by Heyday. By accessing and using this site, you agree to these terms. The content is for informational purposes and does not constitute a contract or guarantee of services.</p>
        <h2>Intellectual property</h2>
        <p>All content, design, and code on this website are the property of Heyday unless otherwise stated. You may not reproduce, distribute, or modify any content without written permission.</p>
        <h2>Enquiries and proposals</h2>
        <p>Submitting an enquiry via our contact form does not create a binding agreement. Any project engagement will be subject to a separate agreement between Heyday and the client.</p>
        <h2>Limitation of liability</h2>
        <p>Heyday provides this website &ldquo;as is&rdquo; and makes no warranties about the accuracy or completeness of its content. We are not liable for any loss arising from your use of this site.</p>
        <h2>Changes to these terms</h2>
        <p>We may update these terms from time to time. Continued use of the site constitutes acceptance of any changes.</p>
        <h2>Contact</h2>
        <p>For questions about these terms, email hello@heyday.app.</p>
      </div>
    </div>
  );
}
