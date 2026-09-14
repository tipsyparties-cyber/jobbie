import type { Metadata } from "next";
import { LegalPage } from "@/components/heyday/legal-page";
import { SITE, TBC } from "@/lib/site";

/* ==================================================================== *
 *  /terms — template T16 (plain), marked for legal review.
 *
 *  The sections say what belongs in them rather than attempting the
 *  wording. Plausible-looking terms would be the most dangerous thing on
 *  this site: unlike holding copy, terms that look finished get relied
 *  on — by customers, and eventually in an argument.
 * ==================================================================== */

export const metadata: Metadata = {
  title: `Terms of service`,
  description: "The structure of Heyday's terms of service, for legal review.",
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of service"
      intro={`${SITE.name} is not open to other businesses yet, so there is no service to set terms for.`}
      sections={[
        {
          heading: "Who the agreement is between",
          body: (
            <>
              The company behind {SITE.name} — {TBC.generic} company name,
              registration and address — and the business using it. Needs to
              distinguish the business from the individuals in it, because
              the team members who log in are not parties to the contract.
            </>
          ),
        },
        {
          heading: "What Heyday provides, and what it does not",
          body: (
            <>
              The software as described on this site. Needs to be explicit
              that {SITE.name} is not a party to the booking between a
              business and its customer, does not employ the team a business
              schedules through it, and does not hold the money — payments
              run through a payment processor to the business&rsquo;s own
              account.
            </>
          ),
        },
        {
          heading: "Plans, payment and cancellation",
          body: (
            <>
              Pricing is {TBC.price}. Needs the billing period, what happens
              at renewal, how to cancel, what happens to data after
              cancellation, and any money-back guarantee — currently{" "}
              {TBC.confirm}.
            </>
          ),
        },
        {
          heading: "Acceptable use",
          body: (
            <>
              What a business may and may not send through the messaging and
              campaign features. This one matters more than usual, because
              the AI can send on a business&rsquo;s behalf and the rules on
              automated messaging differ by channel and by country.
            </>
          ),
        },
        {
          heading: "The AI, and who is responsible for what it sends",
          body: (
            <>
              Needs to state clearly that at levels 1 and 2 a person
              approves every message, that level 3 sends only the message
              types the business has switched on and within rules it has
              set, and where responsibility sits when it gets something
              wrong. This is the section a lawyer should spend the most time
              on.
            </>
          ),
        },
        {
          heading: "Data, and who owns it",
          body: (
            <>
              The business&rsquo;s clients, bookings and messages are the
              business&rsquo;s. Needs to say what {SITE.name} may do with
              them, including whether anything is used to improve the AI —
              and if it is, how a business opts out.
            </>
          ),
        },
        {
          heading: "Liability, warranties and termination",
          body: (
            <>The usual, and none of it is mine to draft. {TBC.generic}</>
          ),
        },
      ]}
    />
  );
}
