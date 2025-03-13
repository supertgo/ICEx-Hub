import { render } from 'utils/test/test-utils'
import { Hr } from './Hr'

describe('<HorizontalRow />', () => {
  it('should render the component', () => {
    const { container } = render(
      <Hr />
    )

    expect(container.children[1]).toMatchInlineSnapshot(`
      .c0 {
        width: 100%;
        height: 0.1rem;
        background: #d6ddeb;
      }

      <div
        class="c0"
      />
    `)
  })
})
