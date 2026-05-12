import type { SanityImageSource } from '@sanity/image-url';
import { createImageUrlBuilder } from '@sanity/image-url';

const imageBuilder = createImageUrlBuilder({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
});

export const urlForImage = (source: SanityImageSource) =>
  imageBuilder.image(source);
