'use client';

import { useMemo, useState, type FormEvent } from 'react';
import { inquiryServices } from '@/lib/services';

const CONTACT_API = '/api/contact';

type InquiryState = { ok: boolean; message: string };

const initial: InquiryState = { ok: false, message: '' };
const categories = Object.keys(inquiryServices) as Array<
  keyof typeof inquiryServices
>;

export function ContactForm() {
  const [pending, setPending] = useState(false);
  const [state, setState] = useState<InquiryState>(initial);
  const [category, setCategory] = useState<(typeof categories)[number] | ''>(
    '',
  );
  const offerings = useMemo(
    () => (category ? [...inquiryServices[category]] : []),
    [category],
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    if (String(formData.get('_honey') ?? '').trim()) {
      form.reset();
      setCategory('');
      setState({ ok: true, message: 'Thank you. We’ll be in touch.' });
      return;
    }

    setPending(true);
    setState(initial);

    try {
      const response = await fetch(CONTACT_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(Object.fromEntries(formData.entries())),
      });

      const data = (await parseJson(response)) as {
        ok?: boolean;
        message?: string;
      };

      if (!response.ok || !data.ok) {
        setState({
          ok: false,
          message:
            data.message ||
            'Something went wrong. Please try again or email us directly.',
        });
        return;
      }

      form.reset();
      setCategory('');
      setState({
        ok: true,
        message: 'Thank you. We’ll be in touch to talk through the vision.',
      });
    } catch {
      setState({
        ok: false,
        message: 'Something went wrong. Please try again or email us directly.',
      });
    } finally {
      setPending(false);
    }
  }

  return (
    <form
      action={CONTACT_API}
      method="POST"
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <p className="text-[11px] tracking-[0.32em] text-gold uppercase">
        Quick question?
      </p>

      <label className="hidden">
        Company website
        <input type="text" name="_honey" tabIndex={-1} autoComplete="off" />
      </label>

      <Field label="Full name" name="name" required />
      <Field label="Email" name="email" type="email" required />
      <Field label="Phone" name="phone" type="tel" />

      <label className="block">
        <span className="text-[11px] tracking-[0.28em] text-stone uppercase">
          Service of interest
        </span>
        <select
          name="category"
          required
          value={category}
          onChange={(event) =>
            setCategory(event.target.value as (typeof categories)[number] | '')
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
        <span className="text-[11px] tracking-[0.28em] text-stone uppercase">
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
        <span className="text-[11px] tracking-[0.28em] text-stone uppercase">
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
        className="cursor-pointer bg-ink px-10 py-4 text-[11px] tracking-[0.32em] text-gold uppercase transition-colors hover:bg-gold hover:text-ink disabled:opacity-50"
      >
        {pending ? 'Sending' : 'Send'}
      </button>

      {state.message ? (
        <p
          className={state.ok ? 'text-sm text-stone' : 'text-sm text-red-700'}
        >
          {state.message}
        </p>
      ) : null}
    </form>
  );
}

function Field({
  label,
  name,
  type = 'text',
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-[11px] tracking-[0.28em] text-stone uppercase">
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

async function parseJson(response: Response) {
  const text = await response.text();
  try {
    return JSON.parse(text) as unknown;
  } catch {
    throw new Error('Unexpected response');
  }
}
