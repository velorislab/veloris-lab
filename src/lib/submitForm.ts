/**
 * Placeholder form transport.
 *
 * Both the contact and waitlist forms call this. Replace the body with a fetch
 * to your own endpoint (an API route, Formspree, Resend, ConvertKit, …) and the
 * rest of the UI — validation, loading, success and error states — keeps
 * working unchanged.
 *
 * Example:
 *
 *   const response = await fetch("/api/contact", {
 *     method: "POST",
 *     headers: { "Content-Type": "application/json" },
 *     body: JSON.stringify(values),
 *   });
 *   if (!response.ok) throw new Error("Request failed");
 *
 * Set NEXT_PUBLIC_FORM_ENDPOINT in .env.local to post to a URL without editing
 * this file at all.
 */

export type FormValues = Record<string, string>;

export interface SubmitResult {
  ok: boolean;
  message: string;
}

const ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT;

export async function submitForm(
  formName: string,
  values: FormValues,
): Promise<SubmitResult> {
  if (ENDPOINT) {
    const response = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ form: formName, ...values }),
    });
    if (!response.ok) {
      throw new Error(`Submission failed with status ${response.status}`);
    }
    return { ok: true, message: "Thanks — we’ll be in touch shortly." };
  }

  // No endpoint configured: simulate a round trip so the states are visible.
  await new Promise((resolve) => setTimeout(resolve, 700));
  if (process.env.NODE_ENV === "development") {
    console.info(`[${formName}] submitted (no endpoint configured)`, values);
  }
  return { ok: true, message: "Thanks — we’ll be in touch shortly." };
}

/** Minimal email check shared by both forms. */
export function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
}
