import type { Meta, StoryObj } from '@storybook/react';

import { Textarea, TextareaProps } from './Textarea';

export default {
	title: 'Components/Textarea',
	component: Textarea,
	tags: ['autodocs'],
} as Meta<TextareaProps>;

export const Default: StoryObj<TextareaProps> = {
	args: {
		error: {
			type: 'required',
			message: 'ERROR',
		},
		maxLength: 10,
	},
};

export const Error: StoryObj<TextareaProps> = {
	args: {
		error: {
			type: 'required',
			message: 'ERROR',
		},
	},
};

export const MaxLength: StoryObj<TextareaProps> = {
	args: {
		maxLength: 10,
	},
};
