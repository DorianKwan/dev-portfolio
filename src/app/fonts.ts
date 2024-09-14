import localFont from 'next/font/local';
import { Bebas_Neue, Open_Sans } from 'next/font/google';

export const BebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
});

export const OpenSans = Open_Sans({
  subsets: ['latin'],
});

export const Cascadia = localFont({ src: './fonts/Cascadia.ttf' });
