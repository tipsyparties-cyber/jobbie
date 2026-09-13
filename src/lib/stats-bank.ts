/* ==================================================================== *
 *  The stats bank — the only statistics the site may use.
 *
 *  Every one shows its source, who it covers, and what kind of evidence it
 *  is. That last field is the one that matters: row 1 is a direct rival's
 *  own marketing data, and a page that quotes it without saying so is
 *  passing off a competitor's sales copy as a finding.
 *
 *  Transcribed from docs/heyday/STATS-BANK.md. A feature references a row
 *  by number, so nothing can quote a number that is not in here.
 * ==================================================================== */

export type Stat = {
  row: number;
  claim: string;
  source: string;
  url?: string;
  covers: string;
  kind: string;
};

export const STATS: Stat[] = [
  {
    row: 1,
    claim:
      "Quotes sent within four hours book 25% more often. Booking rates run 22% within four hours, 18% later the same day, and 16% the next day or later.",
    source:
      "Flashquotes, from 32,000+ quoted leads across 100+ operators over twelve months",
    url: "https://flashquotes.com/",
    covers: "Mobile bars, coffee carts, photo booths and DJs",
    kind: "Vendor data, from a direct rival",
  },
  {
    row: 2,
    claim:
      "Firms that contacted a lead within an hour were nearly seven times as likely to qualify it as those that waited even an hour longer.",
    source: "Harvard Business Review, “The Short Life of Online Sales Leads”",
    covers: "US firms responding to web-generated leads",
    kind: "Peer-reviewed research",
  },
];

export const statByRow = (row: number) => STATS.find((s) => s.row === row);
