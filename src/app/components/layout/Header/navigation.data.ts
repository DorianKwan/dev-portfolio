export interface NavigationLink {
  name: string;
  to: string;
  key: string;
}

export const navigationLinks: NavigationLink[] = [
  {
    name: 'Home',
    to: '/',
    key: 'home',
  },
  {
    name: 'Experience',
    to: '/experience',
    key: 'experience',
  },
  {
    name: 'Showcase',
    to: '/showcase',
    key: 'showcase',
  },
  {
    name: 'About',
    to: '/about',
    key: 'about',
  },
  {
    name: 'Contact',
    to: '/contact',
    key: 'contact',
  },
];
