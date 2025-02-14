import { ChakraProvider } from '@chakra-ui/react';
import { theme as defaultTheme } from '@chakra-ui/theme';
import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter as Router } from 'react-router-dom';

import { Button, Spinner } from '@/components/Elements';
import { Notifications } from '@/components/Notifications/Notifications';
import { AuthProvider } from '@/lib/auth';
import { queryClient } from '@/lib/react-query';

import { theme } from '../chakra.theme';

import { SubdomainProvider } from './subdomain';

const ErrorFallback = () => {
  return (
    <div
      className="text-red-500 w-screen h-screen flex flex-col justify-center items-center"
      role="alert"
    >
      <h2 className="text-lg font-semibold">Ooops, something went wrong :( </h2>
      <Button className="mt-4" onClick={() => window.location.assign(window.location.origin)}>
        Refresh
      </Button>
    </div>
  );
};

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <React.Suspense
      fallback={
        <div className="flex items-center justify-center w-screen h-screen">
          <Spinner size="xl" />
        </div>
      }
    >
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <SubdomainProvider>
          <HelmetProvider>
            <QueryClientProvider client={queryClient}>
              {process.env.NODE_ENV !== 'test' && <ReactQueryDevtools />}
              <Notifications />
              <AuthProvider>
                <Router>
                  <ChakraProvider theme={theme}>{children}</ChakraProvider>
                </Router>
              </AuthProvider>
            </QueryClientProvider>
          </HelmetProvider>
        </SubdomainProvider>
      </ErrorBoundary>
    </React.Suspense>
  );
};

export const StorybookProvider = ({ children }: AppProviderProps) => {
  return (
    <React.Suspense
      fallback={
        <div className="flex items-center justify-center w-screen h-screen">
          <Spinner size="xl" />
        </div>
      }
    >
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <HelmetProvider>
          <QueryClientProvider client={queryClient}>
            {process.env.NODE_ENV !== 'test' && <ReactQueryDevtools />}
            <Notifications />
            <Router>
              <ChakraProvider theme={defaultTheme}>{children}</ChakraProvider>
            </Router>
          </QueryClientProvider>
        </HelmetProvider>
      </ErrorBoundary>
    </React.Suspense>
  );
};
