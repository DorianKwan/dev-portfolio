import React from 'react';
import { Metadata } from 'next';
import { Html, Head, Main, NextScript } from 'next/document';

export const metadata: Metadata = {
  title: "Bryce Sayers-Kwan's Portfolio",
};

const Document: React.FC = () => {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
