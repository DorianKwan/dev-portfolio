import type { AppProps } from 'next/app';
import { css, Global } from '@emotion/react';
import { Analytics } from '@vercel/analytics/next';
import { Header } from '~/app/components/layout/Header/Header';
import { Main } from '~/app/components/layout/Main/Main';
import { Footer } from '~/app/components/layout/Footer/Footer';
import { Embers } from '~/app/components/special/Embers/Embers';
import { Providers } from '~/app/components/layout/Providers/Providers';
import { AppWrapper } from '~/app/components/layout/AppWrapper/AppWrapper';
import { BebasNeue, OpenSans } from '~/app/fonts';
import '~/app/assets/styles/css-reset.css';
import { theme } from '~/theme/theme';
import {
  faBookOpen,
  faBriefcase,
  faCode,
  faSchool,
  faArrowUpRightFromSquare,
} from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { config, library } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import Head from 'next/head';

// without this, SSR and CSR render different DOM structures; causing a React hydration mismatch
config.autoAddCss = false;

library.add(
  faBookOpen,
  faBriefcase,
  faSchool,
  faCode,
  faGithub,
  faArrowUpRightFromSquare,
);

const globalStyles = css`
  * {
    font-family: ${OpenSans.style.fontFamily};
  }

  body {
    background-color: ${theme.colors.background};
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: ${BebasNeue.style.fontFamily};
    letter-spacing: 0.1rem;
    line-height: 1.1;
  }

  p {
    font-size: 1.125rem;
  }

  ::selection {
    color: ${theme.colors.lightPurple};
    background-color: ${theme.colors.white};
  }
`;

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Portfolio - Bryce Sayers-Kwan</title>
      </Head>
      <Providers>
        <Global styles={globalStyles} />
        <Embers />
        <AppWrapper>
          <Header />
          <Main>
            <Component {...pageProps} />
            <Analytics />
          </Main>
          <Footer />
        </AppWrapper>
      </Providers>
    </>
  );
};

export default App;
