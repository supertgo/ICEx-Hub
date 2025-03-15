import { render, screen } from 'utils/test/test-utils';
import { Title } from './Title';

describe('<Title />', () => {
	it('should render the component', () => {
		render(<Title title="Title" />);

		const title = screen.getByText('Title');
		expect(title).toBeInTheDocument();
		expect(title.parentElement?.parentElement?.children.length).toBe(3);
	});
	it('should not render the border when hasBorder is false', () => {
		render(<Title title="Title" hasBorder={false} />);

		const title = screen.getByText('Title');
		expect(title).toBeInTheDocument();
		expect(title.parentElement?.parentElement?.children.length).toBe(2);
	});
});
