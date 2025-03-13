import { vi } from "vitest"

vi.mock('components/Button', () => ({
  Button: () => {
    return <div data-testid="Mock Button" />
  },
}))
