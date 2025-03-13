import { render, screen } from 'utils/test/test-utils'
import { Input } from '.'

describe('<Input />', () => {
  it('should render the component', () => {
    render(
      <Input onChange={() => ({})} />
    )

    expect(screen.getByPlaceholderText('Digite')).toBeInTheDocument()
  })
})
