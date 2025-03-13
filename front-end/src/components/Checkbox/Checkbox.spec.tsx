import { render, screen } from 'utils/test/test-utils';
import { Checkbox, CheckboxProps } from '.';

const props: CheckboxProps = {
  label: 'myLabel',
};

describe('<Checkbox />', () => {
  it('should render the component', () => {
    render(<Checkbox {...props} />);

    expect(screen.getByText(props.label)).toBeInTheDocument();
  });
});
