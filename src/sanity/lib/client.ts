import 'server-only';
import { createClient, type QueryParams } from 'next-sanity';
import { apiVersion, dataset, projectId } from '../env';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  perspective: 'published',
});

export function sanityFetch<T>(query: string, params: QueryParams = {}) {
  return client.fetch<T>(query, params, {
    cache: 'no-store',
  });
}
