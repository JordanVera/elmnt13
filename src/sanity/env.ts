function assertValue<T>(value: T | undefined, errorMessage: string): T {
  if (value === undefined || value === '') {
    throw new Error(errorMessage);
  }
  return value;
}

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID,
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_PROJECT_ID',
);

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET ||
    process.env.SANITY_DATASET ||
    'production',
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET',
);

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-03-01';
