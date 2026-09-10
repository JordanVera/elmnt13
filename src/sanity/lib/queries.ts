import { defineQuery } from 'next-sanity';

const projectFields = /* groq */ `
  "slug": slug.current,
  title,
  client,
  service,
  category,
  year,
  "image": image.asset->url,
  "gallery": gallery[].asset->url,
  featured,
  description
`;

export const projectsQuery = defineQuery(
  `*[_type == "project"] | order(sortOrder asc, year desc) {${projectFields}}`,
);

export const featuredProjectsQuery = defineQuery(
  `*[_type == "project" && featured == true] | order(sortOrder asc, year desc) {${projectFields}}`,
);

export const workProjectsQuery = defineQuery(
  `*[_type == "project" && category != "weddings"] | order(sortOrder asc, year desc) {${projectFields}}`,
);

export const weddingProjectsQuery = defineQuery(
  `*[_type == "project" && category == "weddings"] | order(sortOrder asc, year desc) {${projectFields}}`,
);

export const projectBySlugQuery = defineQuery(
  `*[_type == "project" && slug.current == $slug][0] {${projectFields}}`,
);

export const projectSlugsQuery = defineQuery(
  `*[_type == "project" && defined(slug.current)]{"slug": slug.current}`,
);
