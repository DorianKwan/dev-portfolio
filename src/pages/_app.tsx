import type { AppProps } from 'next/app';
import { css, Global } from '@emotion/react';
import {
  Header,
  Main,
  Footer,
  Embers,
  Providers,
  AppWrapper,
} from '~/app/components';
import { BebasNeue, OpenSans } from '~/app';
import '~/app/assets/styles/css-reset.css';
import { theme } from '~/theme';
import {
  faBookOpen,
  faBriefcase,
  faCode,
  faSchool,
  faArrowUpRightFromSquare,
} from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

// must use a require here or NextJS will error out
// https://github.com/vercel/next.js/issues/51949
const { library } = require('@fortawesome/fontawesome-svg-core');

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
    color: ${theme.colors.lightBlue};
    background-color: ${theme.colors.white};
  }
`;

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <Providers>
      <Global styles={globalStyles} />
      <Embers />
      <AppWrapper>
        <Header />
        <Main>
          <Component {...pageProps} />
        </Main>
        <Footer />
      </AppWrapper>
    </Providers>
  );
};

export default App;
