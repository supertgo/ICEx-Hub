import { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { QueryProvider } from 'providers/query-provider';
import { AppProviders } from 'providers/app-providers';

type CustomRenderProps = {
  queryProvider?: boolean;
} & Omit<RenderOptions, 'queries'>;

const customRender = (
  ui: ReactElement,
  { queryProvider = false, ...renderOptions }: CustomRenderProps = {},
) => {
  const rendered = render(
    queryProvider ? (
      <QueryProvider>
        <AppProviders>{ui}</AppProviders>
      </QueryProvider>
    ) : (
      <AppProviders>{ui}</AppProviders>
    ),
    renderOptions,
  );

  return {
    ...rendered,
  };
};

export * from '@testing-library/react';
export { customRender as render };
