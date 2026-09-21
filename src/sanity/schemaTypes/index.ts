import type { SchemaTypeDefinition } from 'sanity';
import { projectType } from './project';
import { weddingType } from './wedding';

export const schemaTypes: SchemaTypeDefinition[] = [projectType, weddingType];
