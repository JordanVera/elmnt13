import {
  buildContactInquiryPayload,
  isSpamSubmission,
  parseContactInquiry,
  resolveZapierWebhookUrl,
  validateContactInquiry,
} from '@/lib/contact-inquiry';
import { isTurnstileConfigured, verifyTurnstileToken } from '@/lib/turnstile';

const FORM_SUBMIT_URL = 'https://formsubmit.co/ajax/ashley@elmnt13.com';

export async function POST(request: Request) {
  let fields: Record<
    string,
    FormDataEntryValue | FormDataEntryValue[] | string | string[] | undefined
  >;

  const contentType = request.headers.get('content-type') ?? '';

  if (contentType.includes('application/json')) {
    fields = (await request.json()) as Record<
      string,
      string | string[] | undefined
    >;
  } else {
    const formData = await request.formData();
    fields = {
      ...Object.fromEntries(
        [...formData.entries()].filter(([key]) => key !== 'offering'),
      ),
      offering: formData.getAll('offering'),
    };
  }

  const input = parseContactInquiry(fields);

  if (isSpamSubmission(input)) {
    return Response.json({ ok: true });
  }

  const validationError = validateContactInquiry(input);
  if (validationError) {
    return Response.json({ ok: false, message: validationError }, { status: 400 });
  }

  if (isTurnstileConfigured()) {
    const verified = await verifyTurnstileToken(input.turnstileToken);
    if (!verified) {
      return Response.json(
        {
          ok: false,
          message: 'Security check failed. Please try again.',
        },
        { status: 400 },
      );
    }
  }

  const webhookUrl = resolveZapierWebhookUrl(
    process.env.ZAPIER_WEBHOOK_URL ?? process.env.NEXT_PUBLIC_ZAPIER_API_URL,
  );

  if (!webhookUrl) {
    return Response.json(
      {
        ok: false,
        message: 'Contact form is not configured. Please email us directly.',
      },
      { status: 503 },
    );
  }

  const payload = buildContactInquiryPayload(input);

  try {
    const [zapierResult] = await Promise.allSettled([
      fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }),
      notifyFormSubmit(payload),
    ]);

    if (zapierResult.status === 'rejected') {
      throw zapierResult.reason;
    }

    if (!zapierResult.value.ok) {
      return Response.json(
        {
          ok: false,
          message:
            'Something went wrong. Please try again or email us directly.',
        },
        { status: 502 },
      );
    }

    return Response.json({ ok: true });
  } catch {
    return Response.json(
      {
        ok: false,
        message: 'Something went wrong. Please try again or email us directly.',
      },
      { status: 502 },
    );
  }
}

async function notifyFormSubmit(payload: ReturnType<typeof buildContactInquiryPayload>) {
  await fetch(FORM_SUBMIT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      _subject: 'ELMNT13 website inquiry',
      _template: 'table',
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      category: payload.category,
      offering: payload.offering,
      details: payload.details,
    }),
  });
}
