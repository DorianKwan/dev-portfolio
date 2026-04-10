import React from 'react';
import { Html, Head, Main, NextScript } from 'next/document';

const Document: React.FC = () => {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico?v=3" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
