import { render, screen } from 'utils/test/test-utils';
import { Label } from '.';

describe('<Label />', () => {
	it('should render the component', () => {
		render(<Label htmlFor="test-input" labelText="Test Label" />);

		expect(screen.getByText('Test Label')).toBeInTheDocument();
	});
	it('should render the component with correct htmlFor attribute', () => {
		render(<Label htmlFor="test-input" labelText="Test Label" />);

		const labelElement = screen.getByText('Test Label');
		expect(labelElement).toBeInTheDocument();
		expect(labelElement).toHaveAttribute('for', 'test-input');
	});
});
