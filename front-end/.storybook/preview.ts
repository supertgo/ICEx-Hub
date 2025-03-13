import type { Preview } from '@storybook/react';
import { withThemeFromJSXProvider } from '@storybook/addon-themes';
import GlobalStyles from '../src/styles/global';
import { theme } from '../src/styles/theme';
import { ThemeProvider } from 'styled-components';

export const decorators = [
  withThemeFromJSXProvider({
    themes: {
      light: theme
    },
    defaultTheme: 'light',
    Provider: ThemeProvider,
    GlobalStyles,
  }),
];

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
