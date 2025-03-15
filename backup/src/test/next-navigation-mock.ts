import { vi } from 'vitest'

const { useRouter, useSearchParams } = vi.hoisted(() => {
    const mockedRouterPush = vi.fn();
    return {
    useSearchParams: () => ({ get: mockedRouterPush }),
        useRouter: () => ({ push: mockedRouterPush }),
        mockedRouterPush,
    };
});

vi.mock('next/navigation', async () => {
    const actual = await vi.importActual('next/navigation');
    return {
        ...actual,
        useRouter,
        useSearchParams
    };
});
