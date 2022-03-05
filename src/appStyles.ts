import {css} from '@emotion/react';
import LatoWoff from '@/assets/fonts/lato-v20-latin-regular.woff';
import LatoWoff2 from '@/assets/fonts/lato-v20-latin-regular.woff2';

export const appStyles = css(
  css`
    @font-face {
      font-family: 'Lato';
      font-style: normal;
      font-weight: 400;
      src: url(${LatoWoff2}) format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
      url(${LatoWoff}) format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
    }
  `,
  {
    ':root': {
      '--color-primary': '#79b5ff',
      '--color-secondary': '#FF7800',
      '--color-border': '#efefef',
      '--color-text': '#2c2e2b',
      '--color-text-secondary': '#a6aab0',
      '--color-link': '#4b8bda',
      '--color-background': '#fff',
      '--color-background-secondary': '#eaeef4',
      '--color-error': '#e00908',
      '--color-success': '#52c41a',
      '--color-inactive': '#EBF2FA',
      '--card-shadow': '0px 0px 1px rgba(12, 26, 75, 0.24), 0px 3px 8px -1px rgba(50, 50, 71, 0.05)',
    },
    '*': {boxSizing: 'border-box'},
    'html, body': {
      margin: 0,
      padding: 0,
      width: '100vw',
      height: '100vh',
      fontFamily: 'Lato, sans-serif',
      fontSize: '16px',
      color: 'var(--color-text)',
      backgroundColor: 'var(--color-background)',
    },
    '#root': {width: '100%', height: '100%', overflow: 'auto'},
  },
);
