import { render, screen } from 'utils/test/test-utils';
import { Button } from '.';

describe('<Button />', () => {
  it('should render the component', () => {
    render(<Button>button test</Button>);

    expect(screen.getByText('button test')).toBeInTheDocument();
  });
});
