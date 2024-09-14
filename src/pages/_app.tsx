import type { AppProps } from 'next/app';
import { css, Global, ThemeProvider } from '@emotion/react';
import styled from '@emotion/styled';
import { Header, Main, Footer, Embers } from '~/app/components';
import { theme } from '~/theme';
import { OpenSans } from '~/app';
import '~/app/assets/styles/css-reset.css';

const globalStyles = css`
  * {
    font-family: ${OpenSans.style.fontFamily};
  }
`;

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <Global styles={globalStyles} />
      <Embers />
      <AppWrapper>
        <Header />
        <Main>
          <Component {...pageProps} />
        </Main>
        <Footer />
      </AppWrapper>
    </ThemeProvider>
  );
};

export default App;

const AppWrapper = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
`;
