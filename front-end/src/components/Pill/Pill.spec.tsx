import { render, screen } from 'utils/test/test-utils';
import { Pill } from '.';
import { theme } from 'styles/theme';

describe('<Pill />', () => {
	it('should render the component', () => {
		render(<Pill text="Pill" variant={'success'} />);

		expect(screen.getByText('Pill')).toBeInTheDocument();
		expect(screen.getByText('Pill')).toHaveStyleRule(
			'color',
			`${theme.colors.lightGreen}`,
		);
	});
	it('should render the component', () => {
		render(<Pill text="Pill" variant={'error'} />);

		expect(screen.getByText('Pill')).toBeInTheDocument();
		expect(screen.getByText('Pill')).toHaveStyleRule(
			'color',
			`${theme.colors.lightRed}`,
		);
	});
	it('should render the component', () => {
		render(<Pill text="Pill" variant={'info'} />);

		expect(screen.getByText('Pill')).toBeInTheDocument();
		expect(screen.getByText('Pill')).toHaveStyleRule(
			'color',
			`${theme.colors.primary}`,
		);
	});
	it('should render the component', () => {
		render(<Pill text="Pill" variant={'warning'} />);

		expect(screen.getByText('Pill')).toBeInTheDocument();
		expect(screen.getByText('Pill')).toHaveStyleRule(
			'color',
			`${theme.colors.mustYellow}`,
		);
	});
});
