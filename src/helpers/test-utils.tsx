import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import '@/index.css';

export type AllTheProvidersProps<P> = P & {
  children: React.ReactNode;
};

const AllTheProviders = <P extends Record<string, unknown>>({
  children,
}: AllTheProvidersProps<P>) => {
  return <>{children}</>;
};

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'queries'>
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';

export { customRender as render };
