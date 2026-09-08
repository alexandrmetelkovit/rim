import { StrictMode } from 'react';
import { RouterProvider } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { router } from './router';
import { ErrorBoundary, ErrorFallback } from '@/shared/components';
import './styles';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary
      fallback={<ErrorFallback message='Sorry, something went wrong' />}
    >
      <RouterProvider router={router} />
    </ErrorBoundary>
  </StrictMode>
);
