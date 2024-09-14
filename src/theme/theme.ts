export const theme = {
  colors: {
    background: '#101116',
    stringText: '#00a2ff',
    highlight: '#240000',
    text: '#EEFFFF',
    darkText: '#b4baff',
    errorText: '#dd3270',
    darkBlue: '#044FC7',
    lightBlue: '#5988D2',
    bluePurple: '#270096',
    darkPurple: '#2A40FF',
    lightPurple: '#A12AFF',
    white: '#fff',
    black: '#000',
  },
  breakpoints: {
    xxs: '420px',
    xs: '480px',
    sm: '640px',
    md: '768px',
    xmd: '992px',
    lg: '1024px',
    xl: '1200px',
    xxl: '1440px',
    xxxl: '1600px',
  },
  layoutSpacing: {
    md: '2rem',
    lg: '3rem',
    xxl: '4rem',
    xxxl: '5rem',
  },
};

export type ThemeType = typeof theme;
