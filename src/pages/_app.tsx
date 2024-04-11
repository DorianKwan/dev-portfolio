import type { AppProps } from 'next/app';
import localFont from 'next/font/local';
import styled from '@emotion/styled';
import { Header, Main, Footer } from '@/app/components';
import '../app/assets/styles/css-reset.css';

const Cascadia = localFont({ src: './Cascadia.ttf' });

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <AppWrapper className={Cascadia.className}>
      <Header />
      <Main>
        <Component {...pageProps} />
      </Main>
      <Footer />
    </AppWrapper>
  );
};

export default App;

const AppWrapper = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
`;
