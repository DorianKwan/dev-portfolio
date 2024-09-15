import { ThemeProvider } from '@emotion/react';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from '~/app/store';
import { theme } from '~/theme';

interface ProvidersProps {
  readonly children: React.ReactNode;
}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <ReduxProvider store={store}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ReduxProvider>
  );
};
