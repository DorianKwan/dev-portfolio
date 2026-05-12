import type { SanityImageSource } from '@sanity/image-url';
import { createImageUrlBuilder } from '@sanity/image-url';
import { sanityClient } from './client';

const imageBuilder = createImageUrlBuilder(sanityClient);

export const urlForImage = (source: SanityImageSource) =>
  imageBuilder.image(source);
