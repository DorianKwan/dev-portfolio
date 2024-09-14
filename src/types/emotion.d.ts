import { ThemeType } from '~/theme';
import { Theme } from './theme';

declare module '@emotion/react' {
  export interface Theme extends ThemeType {}
}
