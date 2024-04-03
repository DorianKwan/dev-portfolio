import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './assets/styles/css-reset.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Bryce Sayers-Kwan's Portfolio",
};

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
};

export default RootLayout;
