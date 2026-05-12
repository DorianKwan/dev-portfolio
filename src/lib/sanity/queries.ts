import { groq } from 'next-sanity';

export const projectsQuery = groq`
  *[_type == "project"] | order(order asc) {
    _id,
    title,
    image { asset->, alt },
    description,
    type,
    viewUrl,
    githubUrl,
  }
`;
