import { defineArrayMember, defineField, defineType } from 'sanity';

function validateMediaSource(value: unknown): true | string {
  if (value === undefined || value === null || value === '') return true;
  if (typeof value !== 'string') return 'Must be a URL or local path';
  if (value.startsWith('/')) return true;
  try {
    const parsed = new URL(value);
    if (parsed.protocol === 'http:' || parsed.protocol === 'https:') {
      return true;
    }
  } catch {
    // fall through
  }
  return 'Use an https URL or a local path starting with / (e.g. /weddings/film.mp4)';
}

export const weddingType = defineType({
  name: 'wedding',
  title: 'Wedding',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: "e.g. Teagan's Proposal",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'kind',
      title: 'Kind',
      type: 'string',
      options: {
        list: [
          { title: 'Proposal', value: 'Proposal' },
          { title: 'Wedding', value: 'Wedding' },
          { title: 'Engagement Shoot', value: 'Engagement Shoot' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'e.g. Houston, TX or Los Cabos, MX',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'services',
      title: 'Services',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      description:
        'Shown as a styled line under the title, e.g. Full-Service Wedding Planning.',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            { title: 'Paragraph', value: 'normal' },
            { title: 'Italic lead', value: 'lead' },
          ],
          lists: [],
          marks: {
            decorators: [
              { title: 'Italic', value: 'em' },
              { title: 'Bold', value: 'strong' },
            ],
            annotations: [],
          },
        }),
      ],
      description:
        'Story copy for the collection. Use Italic lead for section openers, and italic/bold marks for inline styling.',
    }),
    defineField({
      name: 'credits',
      title: 'Credits',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'credit',
          fields: [
            defineField({
              name: 'role',
              title: 'Role',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'name',
              title: 'Name',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { title: 'name', subtitle: 'role' },
          },
        }),
      ],
    }),
    defineField({
      name: 'cover',
      title: 'Cover Photo',
      type: 'image',
      options: { hotspot: true },
      description: 'Shown on the gallery tile.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      of: [defineArrayMember({ type: 'image', options: { hotspot: true } })],
      description: 'All photos shown inside the collection panel.',
    }),
    defineField({
      name: 'video',
      title: 'Film URL',
      type: 'string',
      description:
        'External video link (Google Drive, Vidflow, etc.) or a local /public path such as /weddings/film.mp4.',
      validation: (rule) => rule.custom(validateMediaSource),
    }),
    defineField({
      name: 'poster',
      title: 'Film Poster URL',
      type: 'string',
      description:
        'Thumbnail image URL or a local /public path. Shown before the film loads.',
      validation: (rule) => rule.custom(validateMediaSource),
    }),
    defineField({
      name: 'previewVideo',
      title: 'Tile Preview Video URL',
      type: 'string',
      description:
        'Short looping video on the gallery tile (external URL or local /public path). When set the tile displays a play icon.',
      validation: (rule) => rule.custom(validateMediaSource),
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort order',
      type: 'number',
      description: 'Lower numbers appear first.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'location',
      media: 'cover',
    },
  },
  orderings: [
    {
      title: 'Sort order',
      name: 'sortOrderAsc',
      by: [{ field: 'sortOrder', direction: 'asc' }],
    },
  ],
});
