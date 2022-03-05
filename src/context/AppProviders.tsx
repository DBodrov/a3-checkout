import React from 'react';
import {QueryClientProvider, QueryClient} from 'react-query';
import {ReactQueryDevtools} from 'react-query/devtools';
import {BrowserRouter as Router} from 'react-router-dom';
import {AppErrorBoundary} from './AppErrorBoundary';

type Props = {
  children: React.ReactNode;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: Infinity
    },
  },
});

export function AppProviders(props: Props) {
  const {children} = props;
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AppErrorBoundary>{children}</AppErrorBoundary>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
