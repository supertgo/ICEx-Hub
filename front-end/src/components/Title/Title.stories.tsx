import type { Meta, StoryObj } from '@storybook/react';

import { Title, TitleProps } from './Title';

export default {
  title: 'Components/Title',
  component: Title,
  tags: ['autodocs'],
} as Meta<TitleProps>;

export const Default: StoryObj<TitleProps> = {
  args: {
    title: 'Título'
  }
};
