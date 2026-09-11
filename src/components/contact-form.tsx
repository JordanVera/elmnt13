'use client';

import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile';
import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react';
import { inquiryServices } from '@/lib/services';

const CONTACT_API = '/api/contact';
const TURNSTILE_SITE_KEY =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim() ?? '';
const TURNSTILE_ENABLED = TURNSTILE_SITE_KEY.length > 0;

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
  const [selectedOfferings, setSelectedOfferings] = useState<string[]>([]);
  const [turnstileToken, setTurnstileToken] = useState('');
  const [formStartedAt] = useState(() => Date.now());
  const turnstileRef = useRef<TurnstileInstance>(null);
  const offerings = useMemo(
    () => (category ? [...inquiryServices[category]] : []),
    [category],
  );

  useEffect(() => {
    setSelectedOfferings([]);
  }, [category]);

  function toggleOffering(offering: string) {
    setSelectedOfferings((current) =>
      current.includes(offering)
        ? current.filter((item) => item !== offering)
        : [...current, offering],
    );
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    if (
      String(formData.get('_honey') ?? '').trim() ||
      String(formData.get('_confirm') ?? '').trim()
    ) {
      form.reset();
      setCategory('');
      setSelectedOfferings([]);
      setTurnstileToken('');
      turnstileRef.current?.reset();
      setState({ ok: true, message: 'Thank you. We’ll be in touch.' });
      return;
    }

    if (TURNSTILE_ENABLED && !turnstileToken) {
      setState({
        ok: false,
        message: 'Please complete the security check before sending.',
      });
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
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          phone: formData.get('phone'),
          category: formData.get('category'),
          offering: selectedOfferings,
          details: formData.get('details'),
          _honey: formData.get('_honey'),
          _confirm: formData.get('_confirm'),
          _ts: formStartedAt,
          turnstileToken,
        }),
      });

      const data = (await parseJson(response)) as {
        ok?: boolean;
        message?: string;
      };

      if (!response.ok || !data.ok) {
        setTurnstileToken('');
        turnstileRef.current?.reset();
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
      setSelectedOfferings([]);
      setTurnstileToken('');
      turnstileRef.current?.reset();
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
      <label className="sr-only" aria-hidden="true">
        Company website
        <input type="text" name="_honey" tabIndex={-1} autoComplete="off" />
      </label>
      <label
        className="pointer-events-none absolute left-[-9999px] h-0 w-0 overflow-hidden opacity-0"
        aria-hidden="true"
      >
        Confirm email
        <input type="text" name="_confirm" tabIndex={-1} autoComplete="off" />
      </label>
      <input type="hidden" name="_ts" value={formStartedAt} readOnly />

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

      <fieldset className="block" disabled={!category}>
        <legend className="text-[11px] tracking-[0.28em] text-stone uppercase">
          Offerings
        </legend>
        <p className="mt-1 text-sm text-stone/80">Select all that apply.</p>
        <div className="mt-3 space-y-3 disabled:opacity-40">
          {offerings.map((item) => (
            <label
              key={item}
              className="flex cursor-pointer items-start gap-3 text-sm text-ink"
            >
              <input
                type="checkbox"
                name="offering"
                value={item}
                checked={selectedOfferings.includes(item)}
                onChange={() => toggleOffering(item)}
                className="mt-0.5 size-4 shrink-0 accent-gold"
              />
              <span>{item}</span>
            </label>
          ))}
        </div>
      </fieldset>

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

      {TURNSTILE_ENABLED ? (
        <Turnstile
          ref={turnstileRef}
          siteKey={TURNSTILE_SITE_KEY}
          onSuccess={setTurnstileToken}
          onExpire={() => setTurnstileToken('')}
          onError={() => setTurnstileToken('')}
          options={{ theme: 'light', size: 'normal' }}
        />
      ) : null}

      <button
        type="submit"
        disabled={pending || (TURNSTILE_ENABLED && !turnstileToken)}
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
