import { defineArrayMember, defineField, defineType } from 'sanity';

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
      type: 'url',
      description: 'External video link (Google Drive, Vidflow, etc.).',
    }),
    defineField({
      name: 'poster',
      title: 'Film Poster URL',
      type: 'url',
      description: 'Thumbnail image shown before the film loads.',
    }),
    defineField({
      name: 'previewVideo',
      title: 'Tile Preview Video URL',
      type: 'url',
      description:
        'Short looping video shown on the gallery tile. When set the tile displays a play icon.',
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
