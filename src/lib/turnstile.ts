const VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

export function getTurnstileSiteKey(): string | null {
  const key = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim();
  return key || null;
}

export function isTurnstileConfigured(): boolean {
  return Boolean(
    getTurnstileSiteKey() && process.env.TURNSTILE_SECRET_KEY?.trim(),
  );
}

export async function verifyTurnstileToken(token: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY?.trim();
  if (!secret || !token.trim()) return false;

  try {
    const response = await fetch(VERIFY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret, response: token }),
    });

    const data = (await response.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}
