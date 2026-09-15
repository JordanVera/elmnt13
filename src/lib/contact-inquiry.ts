export type ContactInquiryInput = {
  name: string;
  email: string;
  phone: string;
  category: string;
  offering: string;
  details: string;
  honey: string;
  honeyConfirm: string;
  formStartedAt: number;
  turnstileToken: string;
};

const MIN_FORM_DURATION_MS = 3_000;

export type ContactInquiryPayload = ContactInquiryInput & {
  first_name: string;
  last_name: string;
  notes: string;
  tags: string;
  source: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function parseContactInquiry(
  data: Record<
    string,
    FormDataEntryValue | FormDataEntryValue[] | string | string[] | undefined
  >,
): ContactInquiryInput {
  return {
    name: String(data.name ?? '').trim(),
    email: String(data.email ?? '').trim(),
    phone: String(data.phone ?? '').trim(),
    category: String(data.category ?? '').trim(),
    offering: parseOfferings(data.offering ?? data.offerings),
    details: String(data.details ?? '').trim(),
    honey: String(data._honey ?? data.honey ?? '').trim(),
    honeyConfirm: String(data._confirm ?? data.honeyConfirm ?? '').trim(),
    formStartedAt: Number(data._ts ?? data.formStartedAt ?? 0),
    turnstileToken: String(
      data.turnstileToken ?? data['cf-turnstile-response'] ?? '',
    ).trim(),
  };
}

export function isSpamSubmission(input: ContactInquiryInput): boolean {
  if (input.honey || input.honeyConfirm) return true;

  if (!input.formStartedAt || Number.isNaN(input.formStartedAt)) {
    return true;
  }

  return Date.now() - input.formStartedAt < MIN_FORM_DURATION_MS;
}

export function validateContactInquiry(input: ContactInquiryInput): string | null {
  if (isSpamSubmission(input)) return null;

  if (!input.name) return 'Full name is required.';
  if (!input.email) return 'Email is required.';
  if (!EMAIL_PATTERN.test(input.email)) return 'Enter a valid email address.';
  if (!input.category) return 'Service of interest is required.';
  if (!input.details) return 'Please tell us more about your inquiry.';

  return null;
}

export function buildContactInquiryPayload(
  input: ContactInquiryInput,
): ContactInquiryPayload {
  const { first_name, last_name } = splitName(input.name);
  const notes = [
    `Service: ${input.category}`,
    input.offering ? `Offering: ${input.offering}` : null,
    '',
    input.details,
  ]
    .filter((line) => line !== null)
    .join('\n');

  const tags = ['Website Lead', input.category].filter(Boolean).join(', ');

  return {
    ...input,
    first_name,
    last_name,
    notes,
    tags,
    source: 'ELMNT13 Website',
  };
}

function parseOfferings(
  value: FormDataEntryValue | FormDataEntryValue[] | string | string[] | undefined,
): string {
  if (Array.isArray(value)) {
    return value
      .map((item) => String(item).trim())
      .filter(Boolean)
      .join(', ');
  }

  return String(value ?? '').trim();
}

function splitName(fullName: string): { first_name: string; last_name: string } {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);

  if (parts.length === 0) {
    return { first_name: '', last_name: '' };
  }

  if (parts.length === 1) {
    return { first_name: parts[0], last_name: '' };
  }

  return {
    first_name: parts[0],
    last_name: parts.slice(1).join(' '),
  };
}

export function resolveZapierWebhookUrl(raw: string | undefined): string | null {
  if (!raw) return null;

  const trimmed = raw.trim().replace(/^['"]|['"]$/g, '');
  if (!trimmed) return null;

  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed;
  }

  if (trimmed.startsWith('hooks.zapier.com/')) {
    return `https://${trimmed}`;
  }

  return `https://hooks.zapier.com/hooks/catch/${trimmed.replace(/^\/+|\/+$/g, '')}/`;
}
