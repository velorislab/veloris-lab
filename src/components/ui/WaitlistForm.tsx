"use client";

import { useState, type FormEvent } from "react";

import { waitlistPage } from "@/data/pages";
import { isValidEmail, submitForm } from "@/lib/submitForm";

type Status = "idle" | "loading" | "success" | "error";

/** Single-field pill form used on the waitlist page. */
export function WaitlistForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const email = String(new FormData(form).get("email") ?? "");

    if (!isValidEmail(email)) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    setMessage("");
    try {
      const result = await submitForm("waitlist", { email });
      setStatus("success");
      setMessage(result.message);
      form.reset();
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="flex w-full flex-col items-center gap-3">
      <form
        onSubmit={handleSubmit}
        noValidate
        className="flex w-full max-w-[501px] items-center rounded-pill bg-surface py-2 pr-2 pl-6"
      >
        <label className="flex-1">
          <span className="sr-only">Email address</span>
          <input
            name="email"
            type="email"
            placeholder={waitlistPage.placeholder}
            aria-invalid={status === "error"}
            className="w-full bg-transparent text-[16px] leading-[20.4px] text-ink-800 outline-none placeholder:text-ink-200"
          />
        </label>
        <button
          type="submit"
          disabled={status === "loading"}
          className="flex h-[44.4px] shrink-0 items-center justify-center rounded-pill bg-accent px-[18px] py-3 text-[17px] leading-[20.4px] text-white shadow-[inset_0_0_20px_8px_rgba(51,132,255,0)] transition-all duration-200 hover:bg-accent-600 hover:shadow-[inset_0_0_8px_6px_#3384ff] disabled:opacity-70"
        >
          {status === "loading" ? "Joining…" : waitlistPage.submitLabel}
        </button>
      </form>

      <p
        role="status"
        aria-live="polite"
        className={`text-[15px] leading-[22.5px] ${
          status === "error" ? "text-red-600" : "text-ink-300"
        } ${message ? "" : "sr-only"}`}
      >
        {message}
      </p>
    </div>
  );
}
