import { vi } from 'vitest';

vi.mock('next/navigation', () => ({
	useRouter() {
		return {
			push: () => vi.fn(),
			replace: () => vi.fn(),
		};
	},
	usePathname() {
		return '/home';
	},
}));
