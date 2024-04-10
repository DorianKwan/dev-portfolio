import type { AppProps } from 'next/app';
import { Source_Code_Pro } from 'next/font/google';
import '../app/assets/styles/css-reset.css';
import { Header, Main, Footer } from '@/app/components';
import styled from '@emotion/styled';

const SourceCodePro = Source_Code_Pro({ subsets: ['greek'] });

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <AppWrapper className={SourceCodePro.className}>
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
