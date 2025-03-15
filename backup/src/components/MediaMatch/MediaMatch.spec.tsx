import { render } from 'utils/test/test-utils'
import { MediaMatch } from './MediaMatch'

describe('<MediaMatch />', () => {
  it('should render the component', () => {
    const { container } = render(
      <MediaMatch />
    )

    expect(container).toMatchInlineSnapshot(`
      .c0 {
        display: none;
      }

      <div>
        <div
          class="Toastify"
        />
        <div
          class="c0"
        />
      </div>
    `)
  })
})
