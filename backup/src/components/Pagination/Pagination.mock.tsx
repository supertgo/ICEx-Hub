import { vi } from 'vitest';

vi.mock('components/Pagination', () => ({
  Applicants: () => {
    return <div data-testid="Mock Pagination" />;
  },
}));
