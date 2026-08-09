"use client";

import { useState, type FormEvent } from "react";

import { contactPage } from "@/data/pages";
import { isValidEmail, submitForm, type FormValues } from "@/lib/submitForm";

type Status = "idle" | "loading" | "success" | "error";

const FIELD_CLASSES =
  "w-full rounded-[10px] bg-surface px-5 py-4 text-[16px] leading-[19.2px] text-ink-800 outline-none placeholder:text-ink-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate(values: FormValues) {
    const next: Record<string, string> = {};
    if (!values.name?.trim()) next.name = "Please enter your name.";
    if (!values.email?.trim()) next.email = "Please enter your email.";
    else if (!isValidEmail(values.email)) next.email = "Please enter a valid email address.";
    if (!values.subject?.trim()) next.subject = "Please enter a subject.";
    if (!values.message?.trim()) next.message = "Please enter a message.";
    return next;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const values = Object.fromEntries(data.entries()) as FormValues;

    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setStatus("error");
      setMessage("Please fix the highlighted fields.");
      return;
    }

    setStatus("loading");
    setMessage("");
    try {
      const result = await submitForm("contact", values);
      setStatus("success");
      setMessage(result.message);
      event.currentTarget.reset();
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  }

  const [first, second, ...rest] = contactPage.fields;

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="relative flex w-full max-w-[633px] flex-col items-center gap-10 rounded-[30px] bg-surface-muted p-6 shadow-[0_17px_24px_0_rgba(178,178,178,0.04),0_0_0_5px_#ffffff] tablet:p-10"
    >
      <div className="flex w-full flex-col items-center justify-center gap-5">
        <div className="flex w-full flex-col gap-5 tablet:flex-row">
          {[first, second].map((field) => (
            <label key={field.name} className="flex flex-1 flex-col items-start gap-[10px]">
              <span className="text-[18px] leading-[27px] text-ink-600">
                {field.label}
              </span>
              <input
                name={field.name}
                type={field.type}
                placeholder={field.placeholder}
                aria-invalid={Boolean(errors[field.name])}
                aria-describedby={errors[field.name] ? `${field.name}-error` : undefined}
                className={FIELD_CLASSES}
              />
              {errors[field.name] && (
                <span id={`${field.name}-error`} role="alert" className="text-[14px] text-red-600">
                  {errors[field.name]}
                </span>
              )}
            </label>
          ))}
        </div>

        {rest.map((field) => (
          <label key={field.name} className="flex w-full flex-col items-start gap-[10px]">
            <span className="text-[18px] leading-[27px] text-ink-600">{field.label}</span>
            {field.type === "textarea" ? (
              <textarea
                name={field.name}
                rows={5}
                placeholder={field.placeholder}
                aria-invalid={Boolean(errors[field.name])}
                aria-describedby={errors[field.name] ? `${field.name}-error` : undefined}
                className={`${FIELD_CLASSES} h-[126px] resize-none`}
              />
            ) : (
              <input
                name={field.name}
                type={field.type}
                placeholder={field.placeholder}
                aria-invalid={Boolean(errors[field.name])}
                aria-describedby={errors[field.name] ? `${field.name}-error` : undefined}
                className={FIELD_CLASSES}
              />
            )}
            {errors[field.name] && (
              <span id={`${field.name}-error`} role="alert" className="text-[14px] text-red-600">
                {errors[field.name]}
              </span>
            )}
          </label>
        ))}
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="flex h-[57.5px] items-center justify-center rounded-pill bg-accent px-6 py-4 text-[17px] leading-[25.5px] font-semibold text-white shadow-[inset_0_0_20px_8px_rgba(51,132,255,0)] transition-all duration-200 hover:bg-accent-600 hover:shadow-[inset_0_0_8px_6px_#3384ff] disabled:opacity-70"
      >
        {status === "loading" ? "Sending…" : contactPage.submitLabel}
      </button>

      <p
        role="status"
        aria-live="polite"
        className={`text-[16px] leading-6 ${
          status === "error" ? "text-red-600" : "text-ink-300"
        } ${message ? "" : "sr-only"}`}
      >
        {message}
      </p>
    </form>
  );
}
