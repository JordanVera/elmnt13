import { defineArrayMember, defineField, defineType } from 'sanity';

export const projectType = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
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
      name: 'client',
      title: 'Client',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'service',
      title: 'Service',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Experiential', value: 'experiential' },
          { title: 'Events', value: 'events' },
          { title: 'Weddings', value: 'weddings' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      of: [defineArrayMember({ type: 'image', options: { hotspot: true } })],
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 6,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort order',
      type: 'number',
      description: 'Lower numbers appear first on the site.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'client',
      media: 'image',
    },
  },
  orderings: [
    {
      title: 'Sort order',
      name: 'sortOrderAsc',
      by: [{ field: 'sortOrder', direction: 'asc' }],
    },
    {
      title: 'Year, newest',
      name: 'yearDesc',
      by: [{ field: 'year', direction: 'desc' }],
    },
  ],
});
