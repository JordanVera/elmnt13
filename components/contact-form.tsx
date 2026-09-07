"use client";

import { useActionState, useMemo, useState } from "react";
import { submitInquiry, type InquiryState } from "@/app/contact/actions";
import { inquiryServices } from "@/lib/services";

const initial: InquiryState = { ok: false, message: "" };
const categories = Object.keys(inquiryServices) as Array<
  keyof typeof inquiryServices
>;

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitInquiry, initial);
  const [category, setCategory] = useState<(typeof categories)[number] | "">(
    "",
  );
  const offerings = useMemo(
    () => (category ? [...inquiryServices[category]] : []),
    [category],
  );

  return (
    <form action={formAction} className="space-y-6">
      <p className="text-[11px] tracking-[0.32em] text-gold uppercase">
        Quick question?
      </p>

      <label className="hidden">
        Company website
        <input type="text" name="company_website" tabIndex={-1} autoComplete="off" />
      </label>

      <Field label="Full name" name="name" required />
      <Field label="Email" name="email" type="email" required />
      <Field label="Phone" name="phone" type="tel" />

      <label className="block">
        <span className="text-[11px] tracking-[0.28em] text-ink/50 uppercase">
          Service of interest
        </span>
        <select
          name="category"
          required
          value={category}
          onChange={(event) =>
            setCategory(event.target.value as (typeof categories)[number] | "")
          }
          className="mt-2 w-full border-b border-ink/20 bg-transparent py-3 outline-none"
        >
          <option value="">Select a category</option>
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className="text-[11px] tracking-[0.28em] text-ink/50 uppercase">
          Offering
        </span>
        <select
          name="offering"
          disabled={!category}
          className="mt-2 w-full border-b border-ink/20 bg-transparent py-3 outline-none disabled:opacity-40"
        >
          <option value="">Select an offering</option>
          {offerings.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className="text-[11px] tracking-[0.28em] text-ink/50 uppercase">
          Tell us more
        </span>
        <textarea
          name="details"
          required
          rows={5}
          className="mt-2 w-full resize-none border-b border-ink/20 bg-transparent py-3 outline-none"
        />
      </label>

      <button
        type="submit"
        disabled={pending}
        className="bg-ink px-10 py-4 text-[11px] tracking-[0.32em] text-gold uppercase transition-colors hover:bg-gold hover:text-ink disabled:opacity-50"
      >
        {pending ? "Sending" : "Send"}
      </button>

      {state.message ? (
        <p className={state.ok ? "text-sm text-ink/70" : "text-sm text-red-700"}>
          {state.message}
        </p>
      ) : null}
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-[11px] tracking-[0.28em] text-ink/50 uppercase">
        {label}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        className="mt-2 w-full border-b border-ink/20 bg-transparent py-3 outline-none"
      />
    </label>
  );
}
