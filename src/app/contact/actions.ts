'use server';

export type InquiryState = {
  ok: boolean;
  message: string;
};

export async function submitInquiry(
  _prev: InquiryState,
  formData: FormData,
): Promise<InquiryState> {
  const honeypot = String(formData.get('company_website') ?? '');
  if (honeypot.trim()) {
    return { ok: true, message: 'Thank you. We’ll be in touch.' };
  }

  const name = String(formData.get('name') ?? '').trim();
  const email = String(formData.get('email') ?? '').trim();
  const phone = String(formData.get('phone') ?? '').trim();
  const category = String(formData.get('category') ?? '').trim();
  const offering = String(formData.get('offering') ?? '').trim();
  const details = String(formData.get('details') ?? '').trim();

  if (!name || !email || !category || !details) {
    return {
      ok: false,
      message: 'Please complete name, email, service, and details.',
    };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, message: 'Please enter a valid email address.' };
  }

  console.info('[ELMNT13 inquiry]', {
    name,
    email,
    phone,
    category,
    offering,
    details,
  });

  return {
    ok: true,
    message: 'Thank you. We’ll be in touch to talk through the vision.',
  };
}
