"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface FormState {
  success: boolean;
  error: string | null;
}

export async function submitContactForm(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const honeypot = formData.get("website") as string;
  if (honeypot) {
    return { success: true, error: null };
  }

  const business = formData.get("business") as string;
  const painPoints = formData.get("painPoints") as string;
  const goals = formData.get("goals") as string;
  const timeWasters = formData.get("timeWasters") as string;
  const budget = formData.get("budget") as string;
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;

  if (!business || !painPoints || !goals || !name || !email) {
    return { success: false, error: "Please fill in all required fields." };
  }

  try {
    await resend.emails.send({
      from: "Heyday Website <noreply@heyday.app>",
      to: process.env.CONTACT_EMAIL || "hello@heyday.app",
      subject: `New enquiry from ${name} — ${business}`,
      html: `
        <h2>New Enquiry via Heyday Website</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        <hr />
        <p><strong>Business / Industry:</strong> ${business}</p>
        <p><strong>Pain Points:</strong> ${painPoints}</p>
        <p><strong>Goals (next 12 months):</strong> ${goals}</p>
        <p><strong>Time Wasters:</strong> ${timeWasters || "Not provided"}</p>
        <p><strong>Budget Range:</strong> ${budget || "Not provided"}</p>
      `,
    });
    return { success: true, error: null };
  } catch {
    return { success: false, error: "Something went wrong. Please try again or email us directly." };
  }
}
