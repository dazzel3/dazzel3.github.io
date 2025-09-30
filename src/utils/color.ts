import { Theme } from '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    colors: {
      defaultBg: string;
      codeBg: string;
      main: string;
      deepBlue: string;
      lightBlue: string;
      opacityBlue: string;
      gray: string;
      deepGray: string;
      lightGray: string;
      opacityGray: string;
    };
  }
}

export const LIGHT_COLOR: Theme = {
  colors: {
    defaultBg: '#fdfdfd',
    codeBg: '#aaaaaa1e',
    main: '#2186fa',
    deepBlue: '#0568d9',
    lightBlue: '#c8e1fe1e',
    opacityBlue: '#2186fa1e',
    gray: '#7f7f7f',
    deepGray: '#3d3d3d',
    lightGray: '#f1f1f1',
    opacityGray: '#aaaaaa6f',
  },
} as const;

export const DARK_COLOR: Theme = {
  colors: {
    defaultBg: '#1e1e1e',
    codeBg: '#2d2d2d',
    main: '#2186fa',
    deepBlue: '#62a8ff',
    lightBlue: '#2186fa33',
    opacityBlue: '#2186fa1e',
    gray: '#b0b0b0',
    deepGray: '#e0e0e0',
    lightGray: '#2a2a2a',
    opacityGray: '#ffffff33',
  },
} as const;
