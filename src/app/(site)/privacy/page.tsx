import type { Metadata } from "next";
import { LegalPage } from "@/components/heyday/legal-page";
import { SITE, TBC } from "@/lib/site";

/* ==================================================================== *
 *  /privacy — template T16 (plain), marked for legal review.
 *
 *  This page is load-bearing for the rest of the site. Every form on
 *  Heyday.app is disabled until the privacy notice and consent wording
 *  exist, which is rule 8 of the brief — so until this document is real,
 *  the early-access form stores nothing, the contact page has no form,
 *  and the tools keep everything in the browser.
 *
 *  That is the honest order: decide what you will do with people's data,
 *  then start collecting it.
 * ==================================================================== */

export const metadata: Metadata = {
  title: `Privacy notice`,
  description: "The structure of Heyday's privacy notice, for legal review.",
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy notice"
      intro={`Nothing on ${SITE.name} collects personal data yet — the early-access form stores and sends nothing, there is no contact form, and the free tools keep everything in your browser — precisely because this document does not exist.`}
      sections={[
        {
          heading: "Who the controller is",
          body: (
            <>
              {TBC.generic} — the company name, registered address and a
              contact route for data questions. Needs to distinguish two
              roles: {SITE.name} as controller of its OWN customers&rsquo;
              data, and as processor of the data those customers hold about
              their clients.
            </>
          ),
        },
        {
          heading: "What is collected, and why",
          body: (
            <>
              For a business using {SITE.name}: account details, billing
              details, and everything it puts into the system about its own
              clients. For a visitor to this site: currently nothing beyond
              anonymous analytics. Each item needs its lawful basis stated
              beside it rather than in a list at the end.
            </>
          ),
        },
        {
          heading: "The early-access form",
          body: (
            <>
              Name, email, kind of business and what they sell. Needs the
              consent wording, how long it is kept, and how somebody gets
              taken off the list. The form on this site is disabled until
              this section exists.
            </>
          ),
        },
        {
          heading: "Messaging, and other people's data",
          body: (
            <>
              A business using {SITE.name} puts its own customers&rsquo;
              details in — names, phone numbers, email addresses, sometimes
              dietary or access requirements. Needs to set out what{" "}
              {SITE.name} may do with that, and the processing terms between{" "}
              {SITE.name} and the business as joint or separate controllers.
            </>
          ),
        },
        {
          heading: "The AI",
          body: (
            <>
              What is sent to a model provider, whether it is retained, and
              whether anything is used to train anything. This needs a plain
              answer, in plain words. If the answer is that nothing customer
              data touches is used for training, say exactly that — it is a
              genuine difference and it is worth stating.
            </>
          ),
        },
        {
          heading: "Where it is kept, who else sees it, how long it stays",
          body: (
            <>
              Hosting, the payment processor, the messaging providers, the
              analytics — every sub-processor named, with what it sees.
              Retention periods per category. {TBC.generic}
            </>
          ),
        },
        {
          heading: "Your rights, and getting your data out",
          body: (
            <>
              Access, correction, deletion, portability, and how to
              complain. The export promise on the security page belongs here
              too, in a form that can be relied on.
            </>
          ),
        },
      ]}
    />
  );
}
