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
    name: 'About',
    to: '/about',
    key: 'about',
  },
  {
    name: 'Showcase',
    to: '/showcase',
    key: 'showcase',
  },
  {
    name: 'Experience',
    to: '/experience',
    key: 'experience',
  },
  {
    name: 'Contact',
    to: '/contact',
    key: 'contact',
  },
];
