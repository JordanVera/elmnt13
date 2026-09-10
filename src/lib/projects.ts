import 'server-only';
import { cache } from 'react';
import { client } from '@/sanity/lib/client';
import type { Project } from '@/lib/project-types';
import {
  featuredProjectsQuery,
  projectBySlugQuery,
  projectSlugsQuery,
  projectsQuery,
  weddingProjectsQuery,
  workProjectsQuery,
} from '@/sanity/lib/queries';

export type { Project } from '@/lib/project-types';

type SanityProject = {
  slug: string | null;
  title: string | null;
  client: string | null;
  service: string | null;
  category: string | null;
  year: string | null;
  image: string | null;
  gallery: Array<string | null> | null;
  featured: boolean | null;
  description: string | null;
};

const CATEGORIES = new Set<Project['category']>([
  'experiential',
  'events',
  'weddings',
]);

function toProject(doc: SanityProject | null): Project | null {
  if (!doc?.slug || !doc.title || !doc.image) return null;
  if (!doc.category || !CATEGORIES.has(doc.category as Project['category'])) {
    return null;
  }

  return {
    slug: doc.slug,
    title: doc.title,
    client: doc.client ?? '',
    service: doc.service ?? '',
    category: doc.category as Project['category'],
    year: doc.year ?? '',
    image: doc.image,
    gallery: (doc.gallery ?? []).filter((src): src is string => Boolean(src)),
    description: doc.description ?? '',
    featured: Boolean(doc.featured),
  };
}

export const getProjects = cache(async () => {
  const docs = await client.fetch<SanityProject[]>(projectsQuery);
  return docs.map(toProject).filter((project): project is Project => Boolean(project));
});

export const getFeaturedProjects = cache(async () => {
  const docs = await client.fetch<SanityProject[]>(featuredProjectsQuery);
  return docs.map(toProject).filter((project): project is Project => Boolean(project));
});

export const getWorkProjects = cache(async () => {
  const docs = await client.fetch<SanityProject[]>(workProjectsQuery);
  return docs.map(toProject).filter((project): project is Project => Boolean(project));
});

export const getWeddingProjects = cache(async () => {
  const docs = await client.fetch<SanityProject[]>(weddingProjectsQuery);
  return docs.map(toProject).filter((project): project is Project => Boolean(project));
});

export const getProject = cache(async (slug: string) => {
  const doc = await client.fetch<SanityProject | null>(projectBySlugQuery, { slug });
  return toProject(doc);
});

export const getProjectSlugs = cache(async () => {
  const docs = await client.fetch<Array<{ slug: string | null }>>(projectSlugsQuery);
  return docs
    .map((doc) => doc.slug)
    .filter((slug): slug is string => Boolean(slug));
});
