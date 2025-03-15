import type { Meta, StoryObj } from '@storybook/react';

import { Pill, PillProps } from '.';

export default {
	title: 'Components/Pill',
	component: Pill,
	tags: ['autodocs'],
} as Meta<PillProps>;

export const Success: StoryObj<PillProps> = {
	args: {
		text: 'Pill',
		variant: 'success',
	},
};

export const Error: StoryObj<PillProps> = {
	args: {
		text: 'Pill',
		variant: 'error',
	},
};

export const Info: StoryObj<PillProps> = {
	args: {
		text: 'Pill',
		variant: 'info',
	},
};

export const Warning: StoryObj<PillProps> = {
	args: {
		text: 'Pill',
		variant: 'warning',
	},
};
