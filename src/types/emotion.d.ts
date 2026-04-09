import { ThemeType } from '~/theme';
import { Theme } from './theme';

declare module '@emotion/react' {
  export interface Theme extends ThemeType {
    colors: {
      background: string;
      stringText: string;
      highlight: string;
      text: string;
      darkText: string;
      errorText: string;
      darkBlue: string;
      lightBlue: string;
      bluePurple: string;
      darkPurple: string;
      lightPurple: string;
      white: string;
      black: string;
      availabilityBg: string;
      availabilityBorder: string;
      copyrightText: string;
      statusAvailable: string;
      statusNotAvailable: string;
      statusOpenToWork: string;
      copyText: string;
      aboutCardBg: string;
      experienceOne: string;
      experienceTwo: string;
      experienceThree: string;
      experienceFour: string;
    };
    breakpoints: {
      xxs: string;
      xs: string;
      sm: string;
      md: string;
      xmd: string;
      lg: string;
      xl: string;
      xxl: string;
      xxxl: string;
    };
    layoutSpacing: {
      md: string;
      lg: string;
      xxl: string;
      xxxl: string;
    };
  }
}
