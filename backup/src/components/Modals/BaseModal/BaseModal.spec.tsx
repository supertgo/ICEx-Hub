import { render, screen } from 'utils/test/test-utils';
import { expect, it, describe, vi } from 'vitest';
import { BaseModal, BaseModalProps } from './BaseModal';

const props: BaseModalProps = {
	title: 'Test',
	children: <span>children</span>,
	open: true,
	setOpen: vi.fn(),
	confirmButtonText: 'confirmButtonText',
};

describe('<BaseModal />', () => {
	it('should render the modal without cancel button text', () => {
		render(<BaseModal {...props} />);

		expect(screen.getByText('children')).toBeInTheDocument();
		expect(
			screen.queryByRole('button', { name: /cancelButtonText/i }),
		).not.toBeInTheDocument();
		expect(
			screen.getByRole('button', { name: /confirmButtonText/i }),
		).toBeInTheDocument();
	});

	it('should render the modal with cancel button text', () => {
		render(<BaseModal {...props} cancelButtonText="cancelButtonText" />);

		expect(screen.getByText('children')).toBeInTheDocument();
		expect(
			screen.getByRole('button', { name: /cancelButtonText/i }),
		).toBeInTheDocument();
		expect(
			screen.getByRole('button', { name: /confirmButtonText/i }),
		).toBeInTheDocument();
	});

	it('should render the modal without confirm button text', () => {
		const propsButton = { ...props, cancelButtonText: 'cancelButtonText' };

		const { confirmButtonText, ...propsWithoutConfirmButtonText } = propsButton;

		render(<BaseModal {...propsWithoutConfirmButtonText} />);

		expect(screen.getByText('children')).toBeInTheDocument();
		expect(
			screen.queryByRole('button', { name: /cancelButtonText/i }),
		).toBeInTheDocument();
		expect(
			screen.queryByRole('button', { name: /confirmButtonText/i }),
		).not.toBeInTheDocument();
	});

	it('should not render the modal if the open attribute is false', () => {
		render(<BaseModal {...props} open={false} />);

		expect(screen.queryByText('children')).not.toBeInTheDocument();
		expect(
			screen.queryByRole('button', { name: /cancelButtonText/i }),
		).not.toBeInTheDocument();
		expect(
			screen.queryByRole('button', { name: /confirmButtonText/i }),
		).not.toBeInTheDocument();
	});
});
