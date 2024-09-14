import type { AppProps } from 'next/app';
import localFont from 'next/font/local';
import { ThemeProvider } from '@emotion/react';
import styled from '@emotion/styled';
import { Header, Main, Footer, Embers } from '~/app/components';
import { theme } from '~/theme';
import '~/app/assets/styles/css-reset.css';

const Cascadia = localFont({ src: './Cascadia.ttf' });

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <Embers />
      <AppWrapper className={Cascadia.className}>
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
