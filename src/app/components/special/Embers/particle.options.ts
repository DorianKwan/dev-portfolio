import { type ISourceOptions } from '@tsparticles/engine';
import { theme } from '~/theme';

export const particleOptions: ISourceOptions = {
  fpsLimit: 40,
  particles: {
    number: {
      value: 150,
      density: {
        enable: true,
      },
    },
    color: {
      value: ['#fdcf58', '#757676', '#f27d0c', '#800909', '#f07f13'],
    },
    opacity: {
      value: { min: 0.1, max: 0.5 },
    },
    size: {
      value: { min: 1, max: 3 },
    },
    move: {
      enable: true,
      speed: {
        max: 3.5,
        min: 1,
      },
      random: true,
      direction: 'top-right',
    },
  },
  interactivity: {
    detectsOn: 'window',
    events: {
      onClick: {
        enable: true,
        mode: 'push',
      },
    },
  },
  background: {
    color: theme.colors.background,
  },
};
