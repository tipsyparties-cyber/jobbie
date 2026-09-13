import type { RisingCard } from "@/components/heyday/rising-cards";

/* ==================================================================== *
 *  The hero's eight cards — design brief B5.
 *
 *  One per step of the whole workflow, from the first enquiry to the
 *  rebooking. That is the argument the hero is making: not "look, a
 *  quoting tool", but "this is your whole year, and it runs".
 *
 *  EVERY NUMBER HERE IS AN EXAMPLE and the panel's label says so. They are
 *  the brief's own example rows, kept exactly, because they read like a
 *  real Saturday without claiming to be one. No customer is named.
 * ==================================================================== */

export const HERO_CARDS: RisingCard[] = [
  {
    step: "STEP 1",
    title: "New enquiry",
    rows: [
      ["From", "Website"],
      ["Party", "80 guests"],
      ["Date", "Sat 14 June"],
    ],
    pill: "Replied in 40s",
    icon: "hd-enquiries",
  },
  {
    step: "STEP 2",
    title: "Instant quote",
    rows: [
      ["Package", "Signature bar"],
      ["Hours", "4"],
      ["Total", "$1,450"],
    ],
    pill: "Sent in 8 seconds",
    icon: "hd-quotes",
  },
  {
    step: "STEP 3",
    title: "Booked",
    rows: [
      ["Deposit", "$450 paid"],
      ["Terms", "Signed"],
    ],
    pill: "Confirmed",
    icon: "hd-online-booking",
  },
  {
    step: "STEP 4",
    title: "Team confirmed",
    rows: [
      ["Bartenders", "2 of 2"],
      ["Kit list", "Ready"],
    ],
    pill: "Shift filled",
    icon: "hd-shift-offers",
  },
  {
    step: "STEP 5",
    title: "The day",
    rows: [
      ["Arrive", "5:30pm"],
      ["Travel", "24 min"],
    ],
    pill: "Checked in",
    icon: "hd-on-the-day",
  },
  {
    step: "STEP 6",
    title: "Paid",
    rows: [
      ["Balance", "$1,000"],
      ["Tips", "$120"],
    ],
    pill: "Paid in full",
    icon: "hd-payments",
  },
  {
    step: "STEP 7",
    title: "New review",
    rows: [
      ["Rating", "★★★★★"],
      ["Said", "“Best party we’ve had”"],
    ],
    pill: "Referral sent",
    icon: "hd-reviews",
  },
  {
    step: "STEP 8",
    title: "Rebooked",
    rows: [
      ["Next", "Birthday, March"],
      ["Client since", "2025"],
    ],
    pill: "Booked again",
    icon: "hd-loyalty",
  },
];
