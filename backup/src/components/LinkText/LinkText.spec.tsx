import { render, screen } from 'utils/test/test-utils';
import { LinkText, LinkTextProps } from '.';

const props: LinkTextProps = {
  text: 'link',
  href: '/home',
};

describe('<LinkText />', () => {
  it('should render the component', () => {
    render(<LinkText {...props} />);

    expect(screen.getByRole('link', { name: props.text })).toBeInTheDocument();
  });
});
