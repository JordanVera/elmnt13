import 'server-only';
import { cache } from 'react';
import { sanityFetch } from '@/sanity/lib/client';
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
  const docs = await sanityFetch<SanityProject[]>(projectsQuery);
  return docs.map(toProject).filter((project): project is Project => Boolean(project));
});

export const getFeaturedProjects = cache(async () => {
  const docs = await sanityFetch<SanityProject[]>(featuredProjectsQuery);
  return docs.map(toProject).filter((project): project is Project => Boolean(project));
});

export const getWorkProjects = cache(async () => {
  const docs = await sanityFetch<SanityProject[]>(workProjectsQuery);
  return docs.map(toProject).filter((project): project is Project => Boolean(project));
});

export const getWeddingProjects = cache(async () => {
  const docs = await sanityFetch<SanityProject[]>(weddingProjectsQuery);
  return docs.map(toProject).filter((project): project is Project => Boolean(project));
});

export const getProject = cache(async (slug: string) => {
  const doc = await sanityFetch<SanityProject | null>(projectBySlugQuery, { slug });
  return toProject(doc);
});

export const getProjectSlugs = cache(async () => {
  const docs = await sanityFetch<Array<{ slug: string | null }>>(projectSlugsQuery);
  return docs
    .map((doc) => doc.slug)
    .filter((slug): slug is string => Boolean(slug));
});

export type AdjacentProject = Pick<Project, 'slug' | 'title'>;

export const getAdjacentWorkProjects = cache(async (slug: string) => {
  const projects = await getWorkProjects();
  const index = projects.findIndex((project) => project.slug === slug);
  if (index === -1) return { prev: null, next: null };

  const toAdjacent = (project: Project): AdjacentProject => ({
    slug: project.slug,
    title: project.title,
  });

  return {
    prev: index > 0 ? toAdjacent(projects[index - 1]) : null,
    next:
      index < projects.length - 1 ? toAdjacent(projects[index + 1]) : null,
  };
});
