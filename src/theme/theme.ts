export const theme = {
  colors: {
    background: '#101116',
    background2: '#060608',
    stringText: '#00a2ff',
    highlight: '#240000',
    text: '#EEFFFF',
    darkText: '#b4baff',
    errorText: '#dd3270',
    babyBlue: '#00b0ff',
    greyBlue: '#76c1ff',
    pink: '#ee6dff',
    lavender: '#d56bff',
    white: '#fff',
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

