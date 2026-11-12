import { createBrowserRouter } from 'react-router-dom';
import { ErrorFallback } from '@/shared/ui';
import { CharacterPage, CharactersPage, NotFoundPage } from '@/pages';
import { App } from '../App';

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      errorElement: <ErrorFallback messageKey='errorBoundaryFallback.router' />,
      children: [
        {
          index: true,
          element: <CharactersPage />
        },
        {
          path: '/character/:id',
          element: <CharacterPage />
        },
        {
          path: '*',
          element: <NotFoundPage />
        }
      ]
    }
  ],
  { basename: import.meta.env.BASE_URL }
);
